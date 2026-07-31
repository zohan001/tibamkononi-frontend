import { Router } from 'express';
import * as inventoryController from '../controllers/inventory.controller.js';
import { validate } from '../middleware/validate.js';
import { inventoryCreateSchema, inventoryUpdateSchema, inventoryAdjustSchema } from '../validators/index.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router({ mergeParams: true });

const staff = ['hospital_admin', 'pharmacist', 'doctor', 'nurse'];

router.get('/', inventoryController.list);
router.post('/', requireAuth, requireRoles(staff), validate(inventoryCreateSchema), inventoryController.create);
router.get('/movements', inventoryController.movements);
router.get('/forecast', inventoryController.forecast);
router.patch('/', requireAuth, requireRoles(staff), validate(inventoryAdjustSchema), inventoryController.adjust);
router.patch('/:itemId', requireAuth, requireRoles(staff), validate(inventoryUpdateSchema), inventoryController.update);
router.delete('/:itemId', requireAuth, requireRoles(['hospital_admin', 'pharmacist']), inventoryController.remove);

export default router;
