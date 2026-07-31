import Patient from '../models/Patient.js';
import Diagnosis from '../models/Diagnosis.js';
import Prescription from '../models/Prescription.js';
import { ApiError } from '../utils/ApiError.js';
import { analyzeDiagnosis, recommendTreatment, clinicalSummary } from './ai.service.js';

export function toPublicPatient(patient) {
  if (!patient) return patient;
  return {
    id: String(patient._id),
    fullName: patient.fullName,
    idNumber: patient.idNumber,
    nhifNumber: patient.nhifNumber || '',
    age: patient.age,
    gender: patient.gender,
    phone: patient.phone,
    address: patient.address || '',
    emergencyContact: patient.emergencyContact || '',
    symptoms: patient.symptoms || '',
    hospitalSlug: patient.hospitalSlug,
    registeredAt: patient.createdAt || patient.registeredAt,
  };
}

export async function listPatients(hospitalSlug) {
  const patients = await Patient.find({ hospitalSlug }).sort({ createdAt: -1 }).lean();
  return patients.map(toPublicPatient);
}

export async function getPatient(hospitalSlug, patientId) {
  const patient = await Patient.findOne({ _id: patientId, hospitalSlug }).lean();
  if (!patient) throw ApiError.notFound('Patient not found');
  return toPublicPatient(patient);
}

export async function registerPatient(hospitalSlug, payload) {
  const existing = await Patient.findOne({
    hospitalSlug,
    idNumber: payload.idNumber,
  }).lean();
  if (existing) throw ApiError.conflict('A patient with this ID number is already registered');

  const patient = await Patient.create({ ...payload, hospitalSlug });
  return toPublicPatient(patient.toObject());
}

export async function updatePatient(hospitalSlug, patientId, payload) {
  const patient = await Patient.findOneAndUpdate(
    { _id: patientId, hospitalSlug },
    { $set: payload },
    { new: true }
  ).lean();
  if (!patient) throw ApiError.notFound('Patient not found');
  return toPublicPatient(patient);
}

export async function removePatient(hospitalSlug, patientId) {
  const patient = await Patient.findOneAndDelete({ _id: patientId, hospitalSlug });
  if (!patient) throw ApiError.notFound('Patient not found');
  await Diagnosis.deleteMany({ patientId });
  await Prescription.deleteMany({ patientId });
  return { success: true };
}

export async function createDiagnosis(hospitalSlug, patientId, { symptoms, age, gender, attendingDoctor, doctorConfirmation }) {
  const patient = await Patient.findOne({ _id: patientId, hospitalSlug }).lean();
  if (!patient) throw ApiError.notFound('Patient not found');

  const analysis = await analyzeDiagnosis({
    symptoms: symptoms || patient.symptoms || '',
    age: age ?? patient.age,
    gender: gender || patient.gender,
  });

  const { default: Inventory } = await import('../models/Inventory.js');
  const inventory = await Inventory.find({ hospitalSlug }).lean();

  const withStock = await recommendTreatment({ diagnosis: analysis, inventory });

  const diagnosis = await Diagnosis.create({
    patientId,
    hospitalSlug,
    diseases: analysis.diseases,
    recommendedTests: analysis.recommendedTests,
    recommendedTreatment: withStock.map((t) => ({
      medicine: t.medicine,
      dosage: t.dosage,
      frequency: t.frequency,
      stockAvailable: t.stockAvailable,
    })),
    clinicalSummary: analysis.clinicalSummary,
    doctorConfirmation: doctorConfirmation || '',
    attendingDoctor: attendingDoctor || '',
  });

  return diagnosis.toObject();
}

export async function getDiagnosis(hospitalSlug, patientId) {
  const diagnosis = await Diagnosis.findOne({ patientId, hospitalSlug })
    .sort({ createdAt: -1 })
    .lean();
  if (!diagnosis) {
    const patient = await Patient.findOne({ _id: patientId, hospitalSlug }).lean();
    if (!patient) throw ApiError.notFound('Patient not found');
    throw ApiError.notFound('No diagnosis on record for this patient');
  }

  return {
    id: String(diagnosis._id),
    diseases: diagnosis.diseases || [],
    recommendedTests: diagnosis.recommendedTests || [],
    recommendedTreatment: (diagnosis.recommendedTreatment || []).map((t) => ({
      medicine: t.medicine,
      dosage: t.dosage,
      frequency: t.frequency,
      stockAvailable: t.stockAvailable,
    })),
    clinicalSummary: diagnosis.clinicalSummary || '',
    doctorConfirmation: diagnosis.doctorConfirmation || '',
    attendingDoctor: diagnosis.attendingDoctor || '',
    createdAt: diagnosis.createdAt,
  };
}

export async function createPrescription(hospitalSlug, patientId, payload) {
  const patient = await Patient.findOne({ _id: patientId, hospitalSlug }).lean();
  if (!patient) throw ApiError.notFound('Patient not found');

  const { default: Inventory } = await import('../models/Inventory.js');

  for (const med of payload.medicines || []) {
    const item = await Inventory.findOne({ hospitalSlug, name: med.name });
    if (item && item.currentStock >= (med.quantity || 1)) {
      item.currentStock = Math.max(0, item.currentStock - (med.quantity || 1));
      item.movements.push({
        medicineName: med.name,
        quantity: med.quantity || 1,
        type: 'deduction',
        patientName: patient.fullName,
        notes: `Prescribed by ${payload.prescribedBy || 'clinician'}`,
      });
      await item.save();
    }
  }

  const prescription = await Prescription.create({
    patientId,
    hospitalSlug,
    medicines: payload.medicines || [],
    notes: payload.notes || '',
    prescribedBy: payload.prescribedBy || '',
  });

  return prescription.toObject();
}

export async function getPatientClinicalSummary(hospitalSlug, patientId) {
  const patient = await getPatient(hospitalSlug, patientId);
  const diagnosis = await Diagnosis.findOne({ patientId, hospitalSlug })
    .sort({ createdAt: -1 })
    .lean();
  const recentVisits = await Diagnosis.find({ patientId, hospitalSlug }).lean();

  return clinicalSummary({ patient, diagnosis, recentVisits });
}

export default {
  listPatients,
  getPatient,
  registerPatient,
  updatePatient,
  removePatient,
  createDiagnosis,
  getDiagnosis,
  createPrescription,
  getPatientClinicalSummary,
};
