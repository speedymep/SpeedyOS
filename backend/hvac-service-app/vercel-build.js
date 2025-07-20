const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a simple index.html file for deployment
console.log('Creating simplified deployment for Vercel...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a simple index.html file
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HVAC Service Platform</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2c3e50;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
    }
    .card {
      background: #f9f9f9;
      border-left: 4px solid #3498db;
      padding: 15px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background: #3498db;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
    .button:hover {
      background: #2980b9;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HVAC Service Platform</h1>
    <div class="card">
      <h2>Deployment Status</h2>
      <p>The HVAC Service Platform is currently being set up. The full no-code platform requires a more complex hosting environment than what Vercel provides for serverless deployments.</p>
      <p>For the complete experience with database functionality and the no-code builder, please use one of the following options:</p>
    </div>
    
    <h2>Deployment Options</h2>
    <div class="card">
      <h3>1. Local Development</h3>
      <p>Clone the repository and run locally:</p>
      <pre>git clone https://github.com/speedymep/SpeedyOS.git
cd SpeedyOS/backend/hvac-service-app
npm install
npm run dev</pre>
    </div>
    
    <div class="card">
      <h3>2. Docker Deployment</h3>
      <p>Use Docker for a containerized deployment:</p>
      <pre>docker run -p 13000:13000 -d speedymep/hvac-service-app</pre>
    </div>
    
    <div class="card">
      <h3>3. Platform as a Service</h3>
      <p>Deploy to a PaaS provider that supports Node.js applications with database capabilities:</p>
      <ul>
        <li>Heroku</li>
        <li>DigitalOcean App Platform</li>
        <li>Railway</li>
      </ul>
    </div>
    
    <p>For more information and detailed deployment instructions, please visit the <a href="https://github.com/speedymep/SpeedyOS" class="button">GitHub Repository</a></p>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('Created simplified deployment files');

// Create a simple server.js file for Vercel
const serverJs = `
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  const content = fs.readFileSync(indexPath);
  res.end(content);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;

fs.writeFileSync(path.join(__dirname, 'server.js'), serverJs);
console.log('Created server.js for Vercel');

console.log('Simplified deployment preparation completed successfully!');