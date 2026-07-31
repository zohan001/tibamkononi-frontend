import { asyncHandler } from '../utils/asyncHandler.js';
import * as emergencyService from '../services/emergency.service.js';

export const analyze = asyncHandler(async (req, res) => {
  const analysis = await emergencyService.analyzeEmergency(req.body);
  res.status(200).json(analysis);
});

export const send = asyncHandler(async (req, res) => {
  const analysis = await emergencyService.analyzeEmergency(req.body);
  const request = await emergencyService.sendEmergency(req.body, analysis);
  res.status(201).json({ success: true, message: 'Emergency alert sent', data: request });
});

export const list = asyncHandler(async (req, res) => {
  const requests = await emergencyService.listEmergencies();
  res.status(200).json(requests);
});

export const getOne = asyncHandler(async (req, res) => {
  const request = await emergencyService.getEmergency(req.params.emergencyId);
  res.status(200).json(request);
});

export const dispatch = asyncHandler(async (req, res) => {
  const request = await emergencyService.dispatchEmergency(req.params.emergencyId, req.body);
  res.status(200).json({ success: true, message: 'Ambulance dispatched', data: request });
});
