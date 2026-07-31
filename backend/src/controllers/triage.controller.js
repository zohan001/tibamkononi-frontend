import { asyncHandler } from '../utils/asyncHandler.js';
import * as triageService from '../services/triage.service.js';

export const analyze = asyncHandler(async (req, res) => {
  const result = await triageService.analyzeTriage(req.body);
  res.status(200).json(result);
});
