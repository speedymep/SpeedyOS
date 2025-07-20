const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the node_modules/.bin directory exists
const binDir = path.join(__dirname, 'node_modules', '.bin');
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

console.log('Starting NocoBase build process...');

try {
  // Run the build command
  console.log('Running nocobase build...');
  execSync('node ./node_modules/@nocobase/cli/bin/nocobase.js build', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}