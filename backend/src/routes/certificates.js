import { Router } from 'express';
import { verifyByStudentId, getCertificateById } from '../controllers/certificateController.js';

const router = Router();
router.post('/verify', verifyByStudentId);
router.get('/:id', getCertificateById);
export default router;
