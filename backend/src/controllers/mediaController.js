import prisma from '../config/prisma.js';

export const getNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const item = await prisma.news.findUnique({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ message: 'Article not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch article' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'desc' },
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};
