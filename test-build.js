#!/usr/bin/env node

/**
 * This script tests the build process locally before deploying.
 * It builds the application and serves it locally to verify it works.
 * 
 * Usage:
 * node test-build.js
 */

import { config } from 'dotenv';
import { execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
const result = config();

if (result.error) {
  console.log('No .env file found or error loading it. Will create one from .env.example if needed.');
}

// Function to execute a command and log the output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Function to serve the built files
function serveFiles() {
  const distPath = path.resolve(process.cwd(), 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('Error: dist directory does not exist. Build failed?');
    process.exit(1);
  }
  
  const server = http.createServer((req, res) => {
    let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);
    
    // If the path doesn't have an extension, serve index.html (for SPA routing)
    if (!path.extname(filePath)) {
      filePath = path.join(distPath, 'index.html');
    }
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        // If the file doesn't exist, serve index.html
        if (err.code === 'ENOENT') {
          fs.readFile(path.join(distPath, 'index.html'), (err, content) => {
            if (err) {
              res.writeHead(500);
              res.end('Error loading index.html');
              return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          });
          return;
        }
        
        res.writeHead(500);
        res.end(`Error loading ${filePath}: ${err.code}`);
        return;
      }
      
      // Determine the content type based on the file extension
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      
      switch (ext) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
          contentType = 'image/jpg';
          break;
        case '.svg':
          contentType = 'image/svg+xml';
          break;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  });
  
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`\nTest server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server and exit\n');
  });
}

// Main function
function main() {
  console.log('Testing build process...\n');
  
  // Check if .env file exists
  if (!fs.existsSync(path.resolve(process.cwd(), '.env'))) {
    console.log('No .env file found. Creating one from .env.example...');
    try {
      fs.copyFileSync(
        path.resolve(process.cwd(), '.env.example'),
        path.resolve(process.cwd(), '.env')
      );
      console.log('Created .env file from .env.example');
      console.log('Please update the values in .env with your actual credentials before deploying.');
    } catch (error) {
      console.error('Error creating .env file:', error.message);
      process.exit(1);
    }
  }
  
  // Run the build
  console.log('Building the application...');
  if (!runCommand('npm run build')) {
    console.error('Build failed. Please fix the errors and try again.');
    process.exit(1);
  }
  
  console.log('\nBuild successful!');
  
  // Serve the built files
  console.log('Starting test server to verify the build...');
  serveFiles();
}

main();
