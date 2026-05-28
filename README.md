# Al-Imra International University (AIU)

Premium full-stack university website with React + Vite frontend, Node.js + Express API, PostgreSQL (Neon), and Prisma ORM.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion, GSAP, React Router |
| Backend | Node.js, Express 5, JWT, bcrypt |
| Database | PostgreSQL (Neon), Prisma |

## Project Structure

```
mm/
├── frontend/          # React SPA
├── backend/           # Express API + Prisma
│   └── prisma/
└── README.md
```

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env   # Add your DATABASE_URL and JWT_SECRET
npm install
npm run db:setup       # generate client, push schema, seed data
npm run dev            # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev            # http://localhost:5173
```

## Logo

Place your official logo at:

`frontend/public/aiu-logo.png`

The site currently uses `frontend/public/aiu-logo.svg` as a branded placeholder. Replace or add `aiu-logo.png` and update image `src` paths if needed.

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | student@aiu.edu | Student@123 |

## Certificate Verification Demo

Enter **one field only** — Student ID or National ID:

| Field | Value |
|-------|-------|
| Student ID | `135792` |

Auto-displays: Abdisamad Omar Mohamed, Faculty of Computer Science, Software Engineering, HEMIS 9393993, Certificate 8777, Bachelor of Computer Science, 2025, **VERIFIED**

## API Endpoints

- `GET /api/health` — Health check
- `POST /api/auth/login` — Login
- `POST /api/certificates/verify` — Verify certificate
- `GET /api/programs` — List programs
- `POST /api/applications` — Submit application
- `GET /api/media/news` — News
- `GET /api/research/publications` — Publications
- `GET /api/students/dashboard` — Student dashboard (auth required)

## Deployment

### Backend (Railway / Render / Fly.io)

1. Set environment variables: `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`, `PORT`
2. Build command: `npm install && npx prisma generate && npx prisma db push`
3. Start command: `npm start`

### Frontend (Vercel / Netlify)

1. Set `VITE_API_URL` to your production API URL
2. Build: `npm run build`
3. Publish `dist/`

### Database

Use [Neon](https://neon.tech) PostgreSQL. Never commit `.env` with real credentials.

## Security Notes

- Rotate `JWT_SECRET` in production
- Use strong passwords for database users
- Enable HTTPS in production
- Add rate limiting on `/api/certificates/verify` and `/api/auth/login`

## License

Proprietary — Al-Imra International University
"# Al-imra-website" 
