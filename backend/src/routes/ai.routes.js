import { Router } from 'express';
import * as aiController from '../controllers/ai.controller.js';
import { validate } from '../middleware/validate.js';
import { aiTriageSchema, aiDiagnosisSchema, aiClinicalSummarySchema, aiTreatmentSchema } from '../validators/index.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/triage', requireAuth, validate(aiTriageSchema), aiController.triage);
router.post('/diagnosis', requireAuth, validate(aiDiagnosisSchema), aiController.diagnosis);
router.post('/clinical-summary', requireAuth, validate(aiClinicalSummarySchema), aiController.clinicalSummary);
router.post('/treatment-plan', requireAuth, validate(aiTreatmentSchema), aiController.treatmentPlan);

export default router;
