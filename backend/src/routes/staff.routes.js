import { Router } from 'express';
import * as staffController from '../controllers/staff.controller.js';
import { validate } from '../middleware/validate.js';
import { staffCreateSchema, staffUpdateSchema, attendanceUpdateSchema } from '../validators/index.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router({ mergeParams: true });

const manager = ['hospital_admin', 'county_admin', 'admin'];

router.get('/', staffController.list);
router.post('/', requireAuth, requireRoles(manager), validate(staffCreateSchema), staffController.create);
router.get('/attendance', staffController.attendance);
router.patch('/attendance', requireAuth, requireRoles(manager), validate(attendanceUpdateSchema), staffController.updateAttendance);
router.get('/:staffId/clock-in', requireAuth, staffController.clockIn);
router.get('/:staffId/clock-out', requireAuth, staffController.clockOut);
router.patch('/:staffId', requireAuth, requireRoles(manager), validate(staffUpdateSchema), staffController.update);
router.delete('/:staffId', requireAuth, requireRoles(manager), staffController.remove);

export default router;
