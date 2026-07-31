import Hospital from '../models/Hospital.js';
import Inventory from '../models/Inventory.js';
import EmergencyRequest from '../models/EmergencyRequest.js';
import Staff from '../models/Staff.js';
import Patient from '../models/Patient.js';
import { ApiError } from '../utils/ApiError.js';
import { operationalSummary } from './ai.service.js';
import { computeScores } from './heuristics.js';
import { approveHospital as setApproved, rejectHospital as setRejected } from './hospital.service.js';

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

export async function getCountyDashboard() {
  const [hospitals, emergencyCount] = await Promise.all([
    Hospital.find({}).lean(),
    EmergencyRequest.countDocuments({}),
  ]);

  const approved = hospitals.filter((h) => h.status === 'approved');
  const beds = approved.reduce((sum, h) => sum + bedStats(h).available, 0);

  const inventory = await Inventory.find({ hospitalSlug: { $in: approved.map((h) => h.slug) } }).lean();
  const critical = inventory.filter(
    (i) => i.currentStock <= 0 || (i.minimumStock && i.currentStock <= i.minimumStock)
  ).length;

  return {
    hospitalsActive: approved.length,
    bedsAvailable: beds,
    criticalAlerts: critical,
    distressSignals: emergencyCount,
  };
}

export async function getCountyHospitals() {
  const hospitals = await Hospital.find({}).sort({ name: 1 }).lean();
  const slugs = hospitals.map((h) => h.slug);
  const inventory = await Inventory.find({ hospitalSlug: { $in: slugs } }).lean();

  const counts = new Map();
  for (const item of inventory) {
    const status = item.currentStock <= 0 || (item.minimumStock && item.currentStock <= item.minimumStock)
      ? 'critical'
      : item.currentStock <= item.minimumStock * 1.5
        ? 'warning'
        : 'ok';
    if (status !== 'ok') {
      counts.set(item.hospitalSlug, (counts.get(item.hospitalSlug) || 0) + 1);
    }
  }

  return hospitals.map((h) => ({
    id: String(h._id),
    name: h.name,
    slug: h.slug,
    county: h.county,
    status: h.status,
    alertCount: counts.get(h.slug) || 0,
  }));
}

export async function getCountyHospitalDetail(hospitalSlug) {
  const hospital = await Hospital.findOne({ slug: hospitalSlug }).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');

  const [inventory, staff, patients] = await Promise.all([
    Inventory.find({ hospitalSlug }).lean(),
    Staff.find({ hospitalSlug }).lean(),
    Patient.find({ hospitalSlug }).lean(),
  ]);

  return {
    hospital,
    beds: bedStats(hospital),
    inventoryCount: inventory.length,
    staffCount: staff.length,
    patientCount: patients.length,
    criticalStock: inventory.filter(
      (i) => i.currentStock <= 0 || (i.minimumStock && i.currentStock <= i.minimumStock)
    ).length,
  };
}

export async function getWeeklyWatchlist() {
  const hospitals = await Hospital.find({}).lean();
  const slugs = hospitals.map((h) => h.slug);
  const inventory = await Inventory.find({ hospitalSlug: { $in: slugs } }).lean();

  const watchlist = hospitals.map((hospital) => {
    const items = inventory.filter((i) => i.hospitalSlug === hospital.slug);
    const stockouts = items.filter(
      (i) => i.currentStock <= 0 || (i.minimumStock && i.currentStock <= i.minimumStock)
    ).length;
    const warnings = items.filter(
      (i) => i.currentStock > 0 && i.currentStock <= i.minimumStock * 1.5
    ).length;

    let score = 100;
    score -= stockouts * 12;
    score -= warnings * 5;
    if (hospital.status === 'suspended') score -= 30;
    score = Math.max(0, Math.min(100, score));

    const severity = score < 40 ? 'critical' : score < 70 ? 'warning' : 'normal';

    const summary =
      stockouts > 0
        ? `${stockouts} stock-out(s) and ${warnings} low-stock item(s). Recommend attention this week.`
        : warnings > 0
          ? `${warnings} low-stock item(s) flagged. Stock levels are watchable.`
          : 'Inventory levels are healthy. No action required this week.';

    return {
      hospitalName: hospital.name,
      hospitalSlug: hospital.slug,
      score,
      severity,
      summary,
    };
  });

  return watchlist.sort((a, b) => a.score - b.score).slice(0, 10);
}

export async function getPendingApprovals() {
  const hospitals = await Hospital.find({ status: 'pending' }).sort({ createdAt: -1 }).lean();
  return hospitals.map((h) => ({
    id: String(h._id),
    name: h.name,
    slug: h.slug,
    type: h.type,
    county: h.county,
    subCounty: h.subCounty,
    createdAt: h.createdAt,
    status: h.status,
  }));
}

export async function getCountyOperationalSummary() {
  const [hospitals, inventory, staff, patients] = await Promise.all([
    Hospital.find({}).lean(),
    Inventory.find({}).lean(),
    Staff.find({}).lean(),
    Patient.find({}).lean(),
  ]);

  return operationalSummary({
    hospital: hospitals[0] || {},
    inventory,
    staff,
    patients,
  });
}

export async function getDiseaseAnalytics() {
  const patients = await Patient.find({}).lean();
  const counts = new Map();

  for (const patient of patients) {
    const scored = computeScores(patient.symptoms || '');
    if (scored[0]) {
      counts.set(scored[0].name, (counts.get(scored[0].name) || 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, cases]) => ({ name, cases }))
    .sort((a, b) => b.cases - a.cases);
}

export async function approveHospital(hospitalId) {
  return setApproved(hospitalId);
}

export async function rejectHospital(hospitalId) {
  return setRejected(hospitalId);
}

export async function getDashboard() {
  return getCountyDashboard();
}

export async function getHospitals() {
  return getCountyHospitals();
}

export async function getWatchlist() {
  return getWeeklyWatchlist();
}

export default {
  getCountyDashboard,
  getCountyHospitals,
  getCountyHospitalDetail,
  getWeeklyWatchlist,
  getPendingApprovals,
  getCountyOperationalSummary,
  getDiseaseAnalytics,
  approveHospital,
  rejectHospital,
  getDashboard,
  getHospitals,
  getWatchlist,
};
