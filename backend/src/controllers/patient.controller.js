import { asyncHandler } from '../utils/asyncHandler.js';
import * as patientService from '../services/patient.service.js';

export const list = asyncHandler(async (req, res) => {
  const patients = await patientService.listPatients(req.params.hospitalSlug);
  res.status(200).json(patients);
});

export const getOne = asyncHandler(async (req, res) => {
  const patient = await patientService.getPatient(req.params.hospitalSlug, req.params.patientId);
  res.status(200).json(patient);
});

export const register = asyncHandler(async (req, res) => {
  const patient = await patientService.registerPatient(req.params.hospitalSlug, req.body);
  res.status(201).json({ success: true, message: 'Patient registered successfully', data: patient });
});

export const update = asyncHandler(async (req, res) => {
  const patient = await patientService.updatePatient(req.params.hospitalSlug, req.params.patientId, req.body);
  res.status(200).json({ success: true, data: patient });
});

export const remove = asyncHandler(async (req, res) => {
  const result = await patientService.removePatient(req.params.hospitalSlug, req.params.patientId);
  res.status(200).json(result);
});

export const createDiagnosis = asyncHandler(async (req, res) => {
  const diagnosis = await patientService.createDiagnosis(
    req.params.hospitalSlug,
    req.params.patientId,
    req.body
  );
  res.status(201).json({ success: true, message: 'Diagnosis recorded', data: diagnosis });
});

export const getDiagnosis = asyncHandler(async (req, res) => {
  const diagnosis = await patientService.getDiagnosis(req.params.hospitalSlug, req.params.patientId);
  res.status(200).json(diagnosis);
});

export const createPrescription = asyncHandler(async (req, res) => {
  const prescription = await patientService.createPrescription(
    req.params.hospitalSlug,
    req.params.patientId,
    req.body
  );
  res.status(201).json({ success: true, message: 'Prescription recorded and stock deducted', data: prescription });
});

export const clinicalSummary = asyncHandler(async (req, res) => {
  const summary = await patientService.getPatientClinicalSummary(
    req.params.hospitalSlug,
    req.params.patientId
  );
  res.status(200).json(summary);
});
