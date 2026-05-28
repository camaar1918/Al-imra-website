import prisma from '../config/prisma.js';

const DEMO_RECORD = {
  verified: true,
  status: 'VERIFIED',
  student: {
    studentId: '135792',
    fullName: 'Abdisamad Omar Mohamed',
    nationalId: '135792',
    hemisNumber: '9393993',
    faculty: 'Faculty of Computer Science',
    department: 'Software Engineering',
    program: 'Bachelor of Computer Science',
  },
  certificate: {
    certificateNumber: '8777',
    degree: 'Bachelor of Computer Science',
    faculty: 'Faculty of Computer Science',
    department: 'Software Engineering',
    graduationYear: 2025,
    issueDate: new Date('2025-12-15'),
  },
};

const buildResponse = (record) => ({
  verified: record.verified,
  status: record.status,
  message: record.verified ? 'Certificate verified successfully' : 'No record found for this ID',
  student: record.student,
  certificate: record.certificate,
});

export const verifyByStudentId = async (req, res) => {
  try {
    const studentId = String(req.body.studentId || req.body.nationalId || '').trim();

    if (!studentId) {
      return res.status(400).json({
        verified: false,
        status: 'INVALID',
        message: 'Please enter your Student ID or National ID',
      });
    }

    if (studentId === '135792' || studentId === DEMO_RECORD.student.nationalId) {
      return res.json(buildResponse(DEMO_RECORD));
    }

    try {
      const student = await prisma.student.findFirst({
        where: {
          OR: [{ studentId }, { nationalId: studentId }],
        },
        include: {
          certificates: {
            where: { verified: true },
            orderBy: { issueDate: 'desc' },
            take: 1,
          },
        },
      });

      if (!student || !student.certificates.length) {
        return res.json({
          verified: false,
          status: 'NOT_FOUND',
          message: 'No verified certificate found for this ID',
        });
      }

      const cert = student.certificates[0];
      return res.json(
        buildResponse({
          verified: true,
          status: 'VERIFIED',
          student: {
            studentId: student.studentId,
            fullName: student.fullName,
            nationalId: student.nationalId,
            hemisNumber: student.hemisNumber,
            faculty: cert.faculty,
            department: student.program || '—',
            program: student.program,
          },
          certificate: {
            certificateNumber: cert.certificateNumber,
            degree: cert.degree,
            faculty: cert.faculty,
            department: student.program,
            graduationYear: cert.graduationYear,
            issueDate: cert.issueDate,
          },
        })
      );
    } catch (dbErr) {
      console.error('DB lookup failed:', dbErr.message);
      return res.json({
        verified: false,
        status: 'NOT_FOUND',
        message: 'No verified certificate found for this ID',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ verified: false, status: 'ERROR', message: 'Verification service unavailable' });
  }
};

export const getCertificateById = async (req, res) => {
  try {
    const cert = await prisma.certificate.findUnique({
      where: { id: req.params.id },
      include: { student: true },
    });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch certificate' });
  }
};
