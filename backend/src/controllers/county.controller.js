import { asyncHandler } from '../utils/asyncHandler.js';
import * as countyService from '../services/county.service.js';

export const dashboard = asyncHandler(async (req, res) => {
  const data = await countyService.getDashboard();
  res.status(200).json(data);
});

export const hospitals = asyncHandler(async (req, res) => {
  const data = await countyService.getHospitals();
  res.status(200).json(data);
});

export const watchlist = asyncHandler(async (req, res) => {
  const data = await countyService.getWatchlist();
  res.status(200).json(data);
});

export const approveHospital = asyncHandler(async (req, res) => {
  const hospital = await countyService.approveHospital(req.params.hospitalId);
  res.status(200).json({ success: true, message: 'Hospital approved', data: hospital });
});

export const rejectHospital = asyncHandler(async (req, res) => {
  const hospital = await countyService.rejectHospital(req.params.hospitalId);
  res.status(200).json({ success: true, message: 'Hospital rejected', data: hospital });
});
