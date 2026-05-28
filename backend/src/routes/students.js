import { Router } from 'express';
import { getStudentDashboard } from '../controllers/studentController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.get('/dashboard', authenticate, getStudentDashboard);
export default router;
