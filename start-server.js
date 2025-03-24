// This script launches the game server
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting game server...');

// Start the server using Node.js
const serverProcess = spawn('node', ['-r', 'esbuild-register', 'server/index.ts'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: { ...process.env, PORT: '5000' }
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});