import { Router } from 'express';
import * as reportController from '../controllers/report.controller.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/hospital/:hospitalSlug', requireAuth, reportController.hospitalReport);
router.get('/county', requireAuth, requireRoles(['admin', 'county_admin']), reportController.countyReport);
router.get('/patient/:patientId', requireAuth, reportController.patientReport);
router.get('/inventory/:hospitalSlug', requireAuth, reportController.inventoryReport);

export default router;
