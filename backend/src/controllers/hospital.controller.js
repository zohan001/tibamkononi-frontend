import { asyncHandler } from '../utils/asyncHandler.js';
import * as hospitalService from '../services/hospital.service.js';
import { ApiError } from '../utils/ApiError.js';

export const list = asyncHandler(async (req, res) => {
  const hospitals = await hospitalService.listHospitals({ status: req.query.status });
  res.status(200).json(hospitals);
});

export const getBySlug = asyncHandler(async (req, res) => {
  const hospital = await hospitalService.getHospitalBySlug(req.params.slug);
  res.status(200).json(hospital);
});

export const register = asyncHandler(async (req, res) => {
  const hospital = await hospitalService.createHospital(req.body);
  res.status(201).json({ success: true, message: 'Hospital registration submitted for county approval', data: hospital });
});

export const approve = asyncHandler(async (req, res) => {
  const hospital = await hospitalService.approveHospital(req.params.hospitalId);
  res.status(200).json({ success: true, message: 'Hospital approved', data: hospital });
});

export const reject = asyncHandler(async (req, res) => {
  const hospital = await hospitalService.rejectHospital(req.params.hospitalId);
  res.status(200).json({ success: true, message: 'Hospital rejected', data: hospital });
});

export const getById = asyncHandler(async (req, res) => {
  if (!req.params.hospitalId.match(/^[0-9a-fA-F]{24}$/)) throw ApiError.notFound('Hospital not found');
  const hospital = await hospitalService.getHospitalById(req.params.hospitalId);
  res.status(200).json(hospital);
});
