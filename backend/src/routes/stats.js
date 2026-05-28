import { Router } from 'express';
import { getUniversityStats } from '../controllers/statsController.js';

const router = Router();
router.get('/', getUniversityStats);
export default router;
