import { asyncHandler } from '../utils/asyncHandler.js';
import * as aiService from '../services/ai.service.js';

export const triage = asyncHandler(async (req, res) => {
  const result = await aiService.analyzeTriage(req.body);
  res.status(200).json(result);
});

export const diagnosis = asyncHandler(async (req, res) => {
  const result = await aiService.analyzeDiagnosis(req.body);
  res.status(200).json(result);
});

export const clinicalSummary = asyncHandler(async (req, res) => {
  const result = await aiService.clinicalSummary(req.body);
  res.status(200).json(result);
});

export const treatmentPlan = asyncHandler(async (req, res) => {
  const result = await aiService.recommendTreatment(req.body);
  res.status(200).json(result);
});
