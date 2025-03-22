#!/usr/bin/env node

/**
 * This script checks if all required environment variables are set.
 * It's meant to be run before building the application for production.
 * 
 * Usage:
 * node check-env.js
 */

import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Skip environment variable check in production (Netlify)
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode, skipping environment variable check.');
  process.exit(0);
}

// Load environment variables from .env file
const result = config();

if (result.error) {
  console.error('Error loading .env file:', result.error.message);
  process.exit(1);
}

// Function to check if required variables are set
function checkRequiredVars(requiredVars) {
  const missingVars = [];
  const placeholderVars = [];
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      missingVars.push(varName);
    } else if (
      value.includes('your-') || 
      value.includes('YOUR_') ||
      value === 'your-key-here'
    ) {
      placeholderVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.error('Error: The following required environment variables are missing:');
    missingVars.forEach(varName => console.error(`  - ${varName}`));
    process.exit(1);
  }
  
  if (placeholderVars.length > 0) {
    console.error('Error: The following environment variables have placeholder values:');
    placeholderVars.forEach(varName => console.error(`  - ${varName}`));
    process.exit(1);
  }
  
  return true;
}

// Main function
function main() {
  console.log('Checking environment variables...');
  
  // Try to find the .env file
  const envPath = path.resolve(process.cwd(), '.env');
  console.log(`Looking for .env file at: ${envPath}`);
  
  if (!fs.existsSync(envPath)) {
    console.error(`Error: .env file not found at ${envPath}`);
    process.exit(1);
  }
  
  console.log('Environment variables loaded from .env file');
  
  // List of required environment variables
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
  ];
  
  // Check if required variables are set
  if (checkRequiredVars(requiredVars)) {
    console.log('All required environment variables are set.');
    process.exit(0);
  }
}

main();
