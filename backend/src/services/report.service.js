import Hospital from '../models/Hospital.js';
import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';
import Inventory from '../models/Inventory.js';
import Staff from '../models/Staff.js';
import Diagnosis from '../models/Diagnosis.js';
import Prescription from '../models/Prescription.js';
import { ApiError } from '../utils/ApiError.js';
import { operationalSummary } from './ai.service.js';

function dateKey(d) {
  return new Date(d).toISOString().slice(0, 10);
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function bedStats(hospital) {
  const buildings = hospital?.buildings || [];
  const total = buildings.reduce(
    (s, b) => s + (b.wards || []).reduce((x, w) => x + (w.bedCount || 0), 0),
    0
  );
  const occupied = buildings.reduce(
    (s, b) => s + (b.wards || []).reduce((x, w) => x + (w.bedsOccupied || 0), 0),
    0
  );
  return { total, occupied, available: Math.max(0, total - occupied) };
}

async function getHospital(slug) {
  const hospital = await Hospital.findOne({ slug }).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');
  return hospital;
}

export async function getDailyReport(hospitalSlug) {
  const hospital = await getHospital(hospitalSlug);
  const since = startOfToday();

  const [patientsToday, appointmentsToday, attendanceToday, inventory] = await Promise.all([
    Patient.countDocuments({ hospitalSlug, createdAt: { $gte: since } }),
    Appointment.countDocuments({ hospitalSlug, createdAt: { $gte: since } }),
    Staff.find({ hospitalSlug }).lean(),
    Inventory.find({ hospitalSlug }).lean(),
  ]);

  const present = attendanceToday.filter((s) => {
    const today = dateKey(new Date());
    const rec = (s.attendance || []).find((a) => a.date === today);
    return rec && rec.status !== 'absent';
  }).length;

  const lowStock = inventory.filter(
    (i) => i.currentStock <= 0 || (i.minimumStock && i.currentStock <= i.minimumStock)
  ).length;

  return {
    date: dateKey(new Date()),
    hospital: hospital.name,
    patientsToday,
    appointmentsToday,
    staffPresent: present,
    staffTotal: attendanceToday.length,
    beds: bedStats(hospital),
    lowStock,
    criticalStock: lowStock,
    summary: `${patientsToday} patients registered today, ${appointmentsToday} appointments, ${present}/${attendanceToday.length} staff present, ${bedStats(hospital).available} beds available.`,
  };
}

export async function getMonthlyReport(hospitalSlug) {
  const hospital = await getHospital(hospitalSlug);
  const since = startOfMonth();
  const month = new Date().toLocaleDateString('en-KE', { month: 'long', year: 'numeric' });

  const [patientsMonth, appointmentsMonth, totalPatients, totalInventory] = await Promise.all([
    Patient.countDocuments({ hospitalSlug, createdAt: { $gte: since } }),
    Appointment.countDocuments({ hospitalSlug, createdAt: { $gte: since } }),
    Patient.countDocuments({ hospitalSlug }),
    Inventory.countDocuments({ hospitalSlug }),
  ]);

  const inventory = await Inventory.find({ hospitalSlug }).lean();
  const critical = inventory.filter(
    (i) => i.currentStock <= 0 || (i.minimumStock && i.currentStock <= i.minimumStock)
  ).length;

  return {
    month,
    hospital: hospital.name,
    patientsRegistered: patientsMonth,
    appointmentsBooked: appointmentsMonth,
    totalPatients,
    totalInventoryItems: totalInventory,
    criticalStockItems: critical,
    beds: bedStats(hospital),
  };
}

export async function getInventoryReport(hospitalSlug) {
  const hospital = await getHospital(hospitalSlug);
  const inventory = await Inventory.find({ hospitalSlug }).sort({ currentStock: 1 }).lean();

  return {
    hospital: hospital.name,
    totalItems: inventory.length,
    critical: inventory.filter(
      (i) => i.currentStock <= 0 || (i.minimumStock && i.currentStock <= i.minimumStock)
    ),
    warning: inventory.filter((i) => {
      const s = i.currentStock;
      const m = i.minimumStock;
      return s > 0 && s <= m * 1.5;
    }),
    healthy: inventory.filter((i) => i.currentStock > i.minimumStock * 1.5),
    expiringSoon: inventory.filter((i) => {
      if (!i.expiryDate) return false;
      const days = (new Date(i.expiryDate) - Date.now()) / 86400000;
      return days >= 0 && days <= 60;
    }),
  };
}

export async function hospitalReport(hospitalSlug) {
  const daily = await getDailyReport(hospitalSlug);
  const monthly = await getMonthlyReport(hospitalSlug);
  const inventory = await getInventoryReport(hospitalSlug);
  return { generatedAt: new Date().toISOString(), daily, monthly, inventory };
}

export async function countyReport() {
  const [hospitals, patients, appointments, inventory, emergencies] = await Promise.all([
    Hospital.find({}).lean(),
    Patient.countDocuments({}),
    Appointment.countDocuments({}),
    Inventory.find({}).lean(),
    import('../models/EmergencyRequest.js').then((m) => m.default.countDocuments({})),
  ]);

  const approved = hospitals.filter((h) => h.status === 'approved');
  const criticalStock = inventory.filter(
    (i) => i.currentStock <= 0 || (i.minimumStock && i.currentStock <= i.minimumStock)
  ).length;

  return {
    generatedAt: new Date().toISOString(),
    totalHospitals: hospitals.length,
    activeHospitals: approved.length,
    pendingApprovals: hospitals.filter((h) => h.status === 'pending').length,
    totalPatients: patients,
    totalAppointments: appointments,
    criticalStockItems: criticalStock,
    distressSignals: emergencies,
  };
}

export async function patientReport(patientId) {
  const patient = await Patient.findById(patientId).lean();
  if (!patient) throw ApiError.notFound('Patient not found');

  const [diagnoses, prescriptions, hospital] = await Promise.all([
    Diagnosis.find({ patientId }).sort({ createdAt: -1 }).lean(),
    Prescription.find({ patientId }).sort({ createdAt: -1 }).lean(),
    patient.hospitalSlug ? Hospital.findOne({ slug: patient.hospitalSlug }).lean() : null,
  ]);

  return {
    generatedAt: new Date().toISOString(),
    patient,
    hospitalName: hospital?.name || '',
    diagnoses,
    prescriptions,
  };
}

export async function getOperationalSummaryForHospital(hospitalSlug) {
  const hospital = await getHospital(hospitalSlug);
  const [inventory, staff, patients] = await Promise.all([
    Inventory.find({ hospitalSlug }).lean(),
    Staff.find({ hospitalSlug }).lean(),
    Patient.find({ hospitalSlug }).lean(),
  ]);

  return operationalSummary({ hospital, inventory, staff, patients });
}

export default {
  getDailyReport,
  getMonthlyReport,
  getInventoryReport,
  getOperationalSummaryForHospital,
  hospitalReport,
  countyReport,
  patientReport,
};
