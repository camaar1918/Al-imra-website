import { Router } from 'express';
import authRoutes from './auth.js';
import certificateRoutes from './certificates.js';
import programRoutes from './programs.js';
import applicationRoutes from './applications.js';
import mediaRoutes from './media.js';
import researchRoutes from './research.js';
import studentRoutes from './students.js';
import statsRoutes from './stats.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/certificates', certificateRoutes);
router.use('/programs', programRoutes);
router.use('/applications', applicationRoutes);
router.use('/media', mediaRoutes);
router.use('/research', researchRoutes);
router.use('/students', studentRoutes);
router.use('/stats', statsRoutes);

router.get('/health', (_req, res) => res.json({ status: 'ok', university: 'Al-Imra International University' }));

export default router;
