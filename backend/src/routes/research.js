import { Router } from 'express';
import { getPublications, getPublicationById } from '../controllers/researchController.js';

const router = Router();
router.get('/publications', getPublications);
router.get('/publications/:id', getPublicationById);
export default router;
