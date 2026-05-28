import prisma from '../config/prisma.js';

export const submitApplication = async (req, res) => {
  try {
    const { programId, fullName, email, phone, nationalId, message } = req.body;
    if (!programId || !fullName || !email) {
      return res.status(400).json({ message: 'Program, full name, and email are required' });
    }
    const application = await prisma.application.create({
      data: { programId, fullName, email, phone, nationalId, message },
      include: { program: { select: { name: true, level: true } } },
    });
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit application' });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: { program: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};
