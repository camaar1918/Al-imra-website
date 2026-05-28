import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Student@123', 12);

  const studentUser = await prisma.user.upsert({
    where: { email: 'student@aiu.edu' },
    update: {},
    create: {
      email: 'student@aiu.edu',
      password,
      name: 'Abdisamad Omar Mohamed',
      role: 'STUDENT',
    },
  });

  const student = await prisma.student.upsert({
    where: { studentId: '135792' },
    update: {},
    create: {
      studentId: '135792',
      userId: studentUser.id,
      fullName: 'Abdisamad Omar Mohamed',
      email: 'student@aiu.edu',
      hemisNumber: '9393993',
      nationalId: '135792',
      program: 'Software Engineering',
      year: 4,
    },
  });

  await prisma.certificate.upsert({
    where: { certificateNumber: '8777' },
    update: {},
    create: {
      certificateNumber: '8777',
      studentId: student.id,
      degree: 'Bachelor of Computer Science',
      faculty: 'Faculty of Computer Science',
      graduationYear: 2025,
      issueDate: new Date('2025-12-15'),
      verified: true,
    },
  });

  const programs = [
    {
      name: 'BSc Computer Science',
      slug: 'bsc-computer-science',
      level: 'UNDERGRADUATE',
      faculty: 'Computing & Engineering',
      duration: '4 Years',
      credits: 128,
      description: 'Cutting-edge computing program with AI, cybersecurity, and software engineering tracks.',
      semesterFee: 1200,
      registrationFee: 150,
      featured: true,
    },
    {
      name: 'BBA International Business',
      slug: 'bba-international-business',
      level: 'UNDERGRADUATE',
      faculty: 'Business & Economics',
      duration: '4 Years',
      credits: 120,
      description: 'Global business leadership with finance, marketing, and entrepreneurship focus.',
      semesterFee: 1100,
      registrationFee: 150,
      featured: true,
    },
    {
      name: 'BSc Medicine & Surgery',
      slug: 'bsc-medicine',
      level: 'UNDERGRADUATE',
      faculty: 'Health Sciences',
      duration: '6 Years',
      credits: 200,
      description: 'World-class medical education with clinical rotations and research opportunities.',
      semesterFee: 2500,
      registrationFee: 200,
      featured: true,
    },
    {
      name: 'MSc Artificial Intelligence',
      slug: 'msc-artificial-intelligence',
      level: 'POSTGRADUATE',
      faculty: 'Computing & Engineering',
      duration: '2 Years',
      credits: 60,
      description: 'Advanced AI research program with industry partnerships and thesis track.',
      semesterFee: 1800,
      registrationFee: 200,
      featured: true,
    },
    {
      name: 'MBA Executive Leadership',
      slug: 'mba-executive',
      level: 'POSTGRADUATE',
      faculty: 'Business & Economics',
      duration: '18 Months',
      credits: 54,
      description: 'Executive MBA for senior professionals and emerging leaders.',
      semesterFee: 2200,
      registrationFee: 250,
      featured: false,
    },
    {
      name: 'Certificate in Data Analytics',
      slug: 'cert-data-analytics',
      level: 'SHORT_COURSE',
      faculty: 'Continuing Education',
      duration: '6 Months',
      credits: 18,
      description: 'Intensive data analytics bootcamp with Python, SQL, and visualization.',
      semesterFee: 800,
      registrationFee: 100,
      featured: false,
    },
  ];

  for (const p of programs) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  await prisma.news.upsert({
    where: { slug: 'aiu-opens-innovation-hub' },
    update: {},
    create: {
      title: 'AIU Opens State-of-the-Art Innovation Hub',
      slug: 'aiu-opens-innovation-hub',
      excerpt: 'A new era of research and entrepreneurship begins at Al-Imra International University.',
      content: 'The Innovation Hub features AI labs, maker spaces, and startup incubation facilities.',
      category: 'Campus',
      published: true,
    },
  });

  await prisma.event.upsert({
    where: { slug: 'international-research-summit-2026' },
    update: {},
    create: {
      title: 'International Research Summit 2026',
      slug: 'international-research-summit-2026',
      description: 'Leading researchers from 40+ countries gather at AIU.',
      location: 'Main Auditorium',
      startDate: new Date('2026-09-15'),
      endDate: new Date('2026-09-18'),
      category: 'Conference',
      featured: true,
    },
  });

  await prisma.publication.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Neural Architectures for Low-Resource Languages',
        authors: 'Dr. Hassan Ali, et al.',
        journal: 'AIU Journal of Computing',
        year: 2025,
        category: 'AI',
      },
      {
        title: 'Sustainable Finance in Emerging Markets',
        authors: 'Prof. Sarah Okonkwo',
        journal: 'International Business Review',
        year: 2025,
        category: 'Economics',
      },
    ],
  });

  console.log('Seed completed: demo certificate, programs, media, student account');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
