import prisma from '../config/prisma.js';

export const getStudentDashboard = async (req, res) => {
  try {
    const student = await prisma.student.findFirst({
      where: { userId: req.user.id },
    });

    res.json({
      profile: student || {
        fullName: req.user.name,
        studentId: 'DEMO-001',
        program: 'Computer Science',
        year: 3,
      },
      courses: [
        { code: 'CS301', name: 'Advanced Algorithms', credits: 4, instructor: 'Dr. Hassan' },
        { code: 'CS305', name: 'Machine Learning', credits: 3, instructor: 'Dr. Amina' },
        { code: 'ENG201', name: 'Academic Writing', credits: 2, instructor: 'Prof. Lee' },
      ],
      timetable: [
        { day: 'Monday', time: '09:00', course: 'CS301', room: 'Lab A' },
        { day: 'Wednesday', time: '11:00', course: 'CS305', room: 'Hall 2' },
        { day: 'Friday', time: '14:00', course: 'ENG201', room: 'Room 104' },
      ],
      results: [
        { semester: 'Fall 2025', gpa: 3.85, courses: 6 },
        { semester: 'Spring 2025', gpa: 3.72, courses: 6 },
      ],
      notices: [
        { title: 'Exam Schedule Published', date: new Date().toISOString(), type: 'urgent' },
        { title: 'Library Extended Hours', date: new Date().toISOString(), type: 'info' },
      ],
      assignments: [
        { title: 'ML Project Proposal', due: '2026-06-01', status: 'pending' },
        { title: 'Research Paper Draft', due: '2026-06-15', status: 'in_progress' },
      ],
      attendance: { present: 92, total: 100, percentage: 92 },
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
};
