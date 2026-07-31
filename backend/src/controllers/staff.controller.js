import { asyncHandler } from '../utils/asyncHandler.js';
import * as staffService from '../services/staff.service.js';

export const list = asyncHandler(async (req, res) => {
  const members = await staffService.listStaff(req.params.hospitalSlug);
  res.status(200).json(members);
});

export const create = asyncHandler(async (req, res) => {
  const member = await staffService.createStaff(req.params.hospitalSlug, req.body);
  res.status(201).json({ success: true, data: member });
});

export const update = asyncHandler(async (req, res) => {
  const member = await staffService.updateStaff(req.params.hospitalSlug, req.params.staffId, req.body);
  res.status(200).json({ success: true, data: member });
});

export const remove = asyncHandler(async (req, res) => {
  const result = await staffService.removeStaff(req.params.hospitalSlug, req.params.staffId);
  res.status(200).json(result);
});

export const attendance = asyncHandler(async (req, res) => {
  const result = await staffService.getAttendance(req.params.hospitalSlug, req.query.date);
  res.status(200).json(result);
});

export const updateAttendance = asyncHandler(async (req, res) => {
  const result = await staffService.setAttendance(req.params.hospitalSlug, req.body);
  res.status(200).json({ success: true, data: result });
});

export const clockIn = asyncHandler(async (req, res) => {
  const result = await staffService.clockIn(req.params.hospitalSlug, req.params.staffId);
  res.status(200).json(result);
});

export const clockOut = asyncHandler(async (req, res) => {
  const result = await staffService.clockOut(req.params.hospitalSlug, req.params.staffId);
  res.status(200).json(result);
});
