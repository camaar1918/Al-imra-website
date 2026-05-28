import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn('Warning: Could not load .env file:', result.error.message);
} else if (result.parsed) {
  console.log(`Loaded ${Object.keys(result.parsed).length} environment variables from .env`);
}

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));

app.use('/api', routes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const server = app.listen(PORT);

server.on('listening', () => {
  const addr = server.address();
  const host = typeof addr === 'object' && addr ? addr.port : PORT;
  console.log(`AIU API running on http://localhost:${host}`);
  console.log(`Health check: http://localhost:${host}/api/health`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nPort ${PORT} is already in use.`);
    console.error('Fix: Stop the other process, or set PORT=5001 in backend/.env\n');
    console.error('Windows: netstat -ano | findstr :5000');
    console.error('Then:   taskkill /PID <pid> /F\n');
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});

const shutdown = () => {
  console.log('\nShutting down AIU API...');
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
