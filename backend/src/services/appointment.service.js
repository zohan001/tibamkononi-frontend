import Appointment from '../models/Appointment.js';
import Hospital from '../models/Hospital.js';
import { ApiError } from '../utils/ApiError.js';

export const DOCTORS = [
  'Dr. Wanjiku',
  'Dr. Otieno',
  'Dr. Mwangi',
  'Dr. Achieng',
  'Dr. Kamau',
  'Dr. Njeri',
];

export const TIME_SLOTS = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
];

export async function listAppointments({ hospital } = {}) {
  const filter = {};
  if (hospital) filter.hospitalSlug = hospital;
  const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 }).lean();
  return appointments.map(toPublic);
}

function toPublic(a) {
  return {
    id: String(a._id),
    patientName: a.patientName,
    patientPhone: a.patientPhone,
    nhifNumber: a.nhifNumber || undefined,
    hospitalSlug: a.hospitalSlug,
    hospitalName: a.hospitalName || '',
    department: a.department || 'General Outpatient',
    doctorName: a.doctorName || '',
    date: a.date,
    time: a.time,
    reason: a.reason || '',
    status: a.status,
    createdAt: a.createdAt,
  };
}

export async function getAvailableSlots({ hospitalSlug, date }) {
  const hospital = await Hospital.findOne({ slug: hospitalSlug }).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');

  const booked = await Appointment.find({
    hospitalSlug,
    date,
    status: { $in: ['pending', 'confirmed', 'completed'] },
  }).lean();

  const bookedKeys = new Set(booked.map((b) => `${b.doctorName}|${b.time}`));

  const slots = [];
  for (const doctor of DOCTORS) {
    for (const time of TIME_SLOTS) {
      slots.push({
        time,
        doctor,
        available: !bookedKeys.has(`${doctor}|${time}`),
        gemmaTip: time < '10:00' ? 'Shortest wait times in the morning.' : undefined,
      });
    }
  }

  return slots;
}

export async function bookAppointment(payload) {
  const hospital = await Hospital.findOne({ slug: payload.hospitalSlug }).lean();
  if (!hospital) throw ApiError.notFound('Hospital not found');

  const existing = await Appointment.findOne({
    hospitalSlug: payload.hospitalSlug,
    date: payload.date,
    time: payload.time,
    doctorName: payload.doctorName,
    status: { $in: ['pending', 'confirmed', 'completed'] },
  }).lean();

  if (existing) {
    throw ApiError.conflict('This time slot is no longer available. Please pick another slot.');
  }

  const appointment = await Appointment.create({
    patientName: payload.patientName,
    patientPhone: payload.patientPhone,
    nhifNumber: payload.nhifNumber || '',
    hospitalSlug: payload.hospitalSlug,
    hospitalName: hospital.name,
    department: payload.department || 'General Outpatient',
    doctorName: payload.doctorName || '',
    date: payload.date,
    time: payload.time,
    reason: payload.reason || '',
    status: 'confirmed',
  });

  return toPublic(appointment.toObject());
}

export async function getAppointment(appointmentId) {
  const appointment = await Appointment.findById(appointmentId).lean();
  if (!appointment) throw ApiError.notFound('Appointment not found');
  return toPublic(appointment);
}

export async function cancelAppointment(appointmentId) {
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status: 'cancelled' },
    { new: true }
  ).lean();
  if (!appointment) throw ApiError.notFound('Appointment not found');
  return toPublic(appointment);
}

export async function updateAppointment(appointmentId, payload) {
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { $set: payload },
    { new: true }
  ).lean();
  if (!appointment) throw ApiError.notFound('Appointment not found');
  return toPublic(appointment);
}

export async function removeAppointment(appointmentId) {
  const appointment = await Appointment.findByIdAndDelete(appointmentId).lean();
  if (!appointment) throw ApiError.notFound('Appointment not found');
  return { success: true };
}

export async function hospitalAppointments(hospitalSlug) {
  const appointments = await Appointment.find({ hospitalSlug }).sort({ date: 1, time: 1 }).lean();
  return appointments.map(toPublic);
}

export default {
  listAppointments,
  getAvailableSlots,
  bookAppointment,
  getAppointment,
  cancelAppointment,
  updateAppointment,
  removeAppointment,
  hospitalAppointments,
};
