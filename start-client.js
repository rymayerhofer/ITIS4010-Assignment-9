// This script starts the client development server
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Vite development server...');

// Change directory to client
process.chdir(path.join(process.cwd(), 'client'));

// Run vite directly
const viteProcess = spawn('npx', ['vite', '--port', '3000', '--host'], {
  stdio: 'inherit',
  env: { ...process.env }
});

viteProcess.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  viteProcess.kill('SIGINT');
  process.exit(0);
});