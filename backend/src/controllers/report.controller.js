import { asyncHandler } from '../utils/asyncHandler.js';
import * as reportService from '../services/report.service.js';

export const hospitalReport = asyncHandler(async (req, res) => {
  const report = await reportService.hospitalReport(req.params.hospitalSlug);
  res.status(200).json(report);
});

export const countyReport = asyncHandler(async (req, res) => {
  const report = await reportService.countyReport();
  res.status(200).json(report);
});

export const patientReport = asyncHandler(async (req, res) => {
  const report = await reportService.patientReport(req.params.patientId);
  res.status(200).json(report);
});

export const inventoryReport = asyncHandler(async (req, res) => {
  const report = await reportService.inventoryReport(req.params.hospitalSlug);
  res.status(200).json(report);
});
