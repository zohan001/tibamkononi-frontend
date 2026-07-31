import { Router } from 'express';
import * as patientController from '../controllers/patient.controller.js';
import { validate } from '../middleware/validate.js';
import {
  patientRegisterSchema,
  patientUpdateSchema,
  diagnosisCreateSchema,
  prescriptionCreateSchema,
} from '../validators/index.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router({ mergeParams: true });

router.get('/', requireAuth, patientController.list);
router.post('/', requireAuth, validate(patientRegisterSchema), patientController.register);
router.get('/:patientId/clinical-summary', requireAuth, patientController.clinicalSummary);
router.get('/:patientId', requireAuth, patientController.getOne);
router.patch('/:patientId', requireAuth, validate(patientUpdateSchema), patientController.update);
router.delete('/:patientId', requireAuth, patientController.remove);
router.post('/:patientId/diagnosis', requireAuth, validate(diagnosisCreateSchema), patientController.createDiagnosis);
router.get('/:patientId/diagnosis', requireAuth, patientController.getDiagnosis);
router.post('/:patientId/prescription', requireAuth, validate(prescriptionCreateSchema), patientController.createPrescription);

export default router;
