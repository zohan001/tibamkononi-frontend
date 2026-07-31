import { Router } from 'express';
import * as triageController from '../controllers/triage.controller.js';
import { validate } from '../middleware/validate.js';
import { triageAnalyzeSchema } from '../validators/index.js';

const router = Router();

router.post('/analyze', validate(triageAnalyzeSchema), triageController.analyze);

export default router;
