import { Router } from 'express';
import { getNews, getNewsBySlug, getEvents } from '../controllers/mediaController.js';

const router = Router();
router.get('/news', getNews);
router.get('/news/:slug', getNewsBySlug);
router.get('/events', getEvents);
export default router;
