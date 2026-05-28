/**
 * Frees a TCP port on Windows before starting the dev server.
 * Usage: node scripts/free-port.js [port]
 */
import { execSync } from 'child_process';

const port = process.argv[2] || process.env.PORT || '5000';

if (process.platform !== 'win32') {
  console.log(`free-port: skipped (not Windows). If port ${port} is busy, stop that process manually.`);
  process.exit(0);
}

try {
  const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
  const pids = [
    ...new Set(
      out
        .split('\n')
        .filter((line) => line.includes('LISTENING'))
        .map((line) => line.trim().split(/\s+/).pop())
        .filter((pid) => pid && pid !== '0')
    ),
  ];

  if (pids.length === 0) {
    console.log(`Port ${port} is available.`);
    process.exit(0);
  }

  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
      console.log(`Freed port ${port} (stopped PID ${pid})`);
    } catch {
      /* process may have already exited */
    }
  }
} catch {
  console.log(`Port ${port} is available.`);
}
