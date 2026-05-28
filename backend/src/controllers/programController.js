import prisma from '../config/prisma.js';

export const getPrograms = async (req, res) => {
  try {
    const { level, featured } = req.query;
    const programs = await prisma.program.findMany({
      where: {
        ...(level ? { level: level.toUpperCase() } : {}),
        ...(featured === 'true' ? { featured: true } : {}),
      },
      orderBy: { name: 'asc' },
    });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch programs' });
  }
};

export const getProgramBySlug = async (req, res) => {
  try {
    const program = await prisma.program.findUnique({ where: { slug: req.params.slug } });
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch program' });
  }
};
