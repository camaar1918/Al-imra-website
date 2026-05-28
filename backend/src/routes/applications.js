import { Router } from 'express';
import { submitApplication, getApplications } from '../controllers/applicationController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();
router.post('/', submitApplication);
router.get('/', authenticate, requireRole('ADMIN', 'STAFF'), getApplications);
export default router;
