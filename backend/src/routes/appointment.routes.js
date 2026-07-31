import { Router } from 'express';
import * as appointmentController from '../controllers/appointment.controller.js';
import { validate } from '../middleware/validate.js';
import { appointmentBookSchema, appointmentUpdateSchema } from '../validators/index.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', appointmentController.list);
router.get('/available', appointmentController.available);
router.post('/', validate(appointmentBookSchema), appointmentController.book);
router.get('/:appointmentId', appointmentController.getOne);
router.patch('/:appointmentId', requireAuth, validate(appointmentUpdateSchema), appointmentController.update);
router.patch('/:appointmentId/cancel', appointmentController.cancel);
router.delete('/:appointmentId', requireAuth, appointmentController.remove);

export default router;
