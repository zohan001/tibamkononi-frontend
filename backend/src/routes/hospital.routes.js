import { Router } from 'express';
import * as hospitalController from '../controllers/hospital.controller.js';
import { validate } from '../middleware/validate.js';
import { hospitalRegisterSchema } from '../validators/index.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', hospitalController.list);
router.get('/:slug', hospitalController.getBySlug);
router.post('/', validate(hospitalRegisterSchema), hospitalController.register);
router.get('/id/:hospitalId', requireAuth, hospitalController.getById);
router.patch('/:hospitalId/approve', requireAuth, requireRoles(['admin', 'county_admin']), hospitalController.approve);
router.patch('/:hospitalId/reject', requireAuth, requireRoles(['admin', 'county_admin']), hospitalController.reject);

export default router;
