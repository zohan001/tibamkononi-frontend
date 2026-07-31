import { Router } from 'express';
import * as countyController from '../controllers/county.controller.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', countyController.dashboard);
router.get('/hospitals', countyController.hospitals);
router.get('/watchlist', countyController.watchlist);
router.post('/hospitals/:hospitalId/approve', requireAuth, requireRoles(['admin', 'county_admin']), countyController.approveHospital);
router.post('/hospitals/:hospitalId/reject', requireAuth, requireRoles(['admin', 'county_admin']), countyController.rejectHospital);

export default router;
