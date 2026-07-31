import { Router } from 'express';
import * as emergencyController from '../controllers/emergency.controller.js';
import { validate } from '../middleware/validate.js';
import { emergencyAnalyzeSchema, emergencySendSchema, emergencyDispatchSchema } from '../validators/index.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.post('/analyze', validate(emergencyAnalyzeSchema), emergencyController.analyze);
router.post('/send', validate(emergencySendSchema), emergencyController.send);
router.get('/', emergencyController.list);
router.get('/:emergencyId', emergencyController.getOne);
router.post('/:emergencyId/dispatch', requireAuth, requireRoles(['county_admin', 'admin']), validate(emergencyDispatchSchema), emergencyController.dispatch);

export default router;
