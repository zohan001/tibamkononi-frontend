import { Router } from 'express';
import * as announcementController from '../controllers/announcement.controller.js';
import { validate } from '../middleware/validate.js';
import { announcementCreateSchema } from '../validators/index.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', announcementController.list);
router.post('/', requireAuth, requireRoles(['admin', 'county_admin', 'hospital_admin']), validate(announcementCreateSchema), announcementController.create);
router.delete('/:announcementId', requireAuth, requireRoles(['admin', 'county_admin', 'hospital_admin']), announcementController.remove);

export default router;
