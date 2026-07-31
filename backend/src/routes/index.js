import { Router } from 'express';
import authRoutes from './auth.routes.js';
import hospitalRoutes from './hospital.routes.js';
import inventoryRoutes from './inventory.routes.js';
import patientRoutes from './patient.routes.js';
import staffRoutes from './staff.routes.js';
import appointmentRoutes from './appointment.routes.js';
import announcementRoutes from './announcement.routes.js';
import emergencyRoutes from './emergency.routes.js';
import triageRoutes from './triage.routes.js';
import countyRoutes from './county.routes.js';
import reportRoutes from './report.routes.js';
import aiRoutes from './ai.routes.js';

const router = Router();

router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

router.use('/auth', authRoutes);
router.use('/hospitals/:hospitalSlug/inventory', inventoryRoutes);
router.use('/hospitals', hospitalRoutes);
router.use('/hospitals/:hospitalSlug/patients', patientRoutes);
router.use('/hospitals/:hospitalSlug/staff', staffRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/announcements', announcementRoutes);
router.use('/emergency', emergencyRoutes);
router.use('/triage', triageRoutes);
router.use('/county', countyRoutes);
router.use('/reports', reportRoutes);
router.use('/ai', aiRoutes);

export default router;
