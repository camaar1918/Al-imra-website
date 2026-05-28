import prisma from '../config/prisma.js';

export const getPublications = async (req, res) => {
  try {
    const publications = await prisma.publication.findMany({
      orderBy: { year: 'desc' },
    });
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch publications' });
  }
};

export const getPublicationById = async (req, res) => {
  try {
    const pub = await prisma.publication.findUnique({ where: { id: req.params.id } });
    if (!pub) return res.status(404).json({ message: 'Publication not found' });
    res.json(pub);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch publication' });
  }
};
