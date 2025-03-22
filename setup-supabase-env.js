#!/usr/bin/env node

/**
 * This script helps set up environment variables for Supabase Edge Functions.
 * It reads from your .env file and sets the secrets in Supabase.
 * 
 * Usage:
 * 1. Make sure you have the Supabase CLI installed: npm install -g supabase
 * 2. Make sure you're logged in: supabase login
 * 3. Make sure your project is linked: supabase link --project-ref your-project-ref
 * 4. Run this script: node setup-supabase-env.js
 */

import { config } from 'dotenv';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
const result = config();

if (result.error) {
  console.error('Error loading .env file:', result.error.message);
  process.exit(1);
}

// Function to set Supabase secrets
function setSupabaseSecrets() {
  // List of variables to set in Supabase Edge Functions
  const supabaseSecrets = [
    'OPENAI_API_KEY',
    'ANTHROPIC_API_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_PRICE_ID_PRO',
    'STRIPE_PRICE_ID_ENTERPRISE',
  ];
  
  // Filter only the variables we want to set
  const secretsToSet = supabaseSecrets
    .filter(key => process.env[key])
    .filter(key => {
      const value = process.env[key];
      return value && value !== 'your-key-here' && !value.includes('your-');
    })
    .map(key => [key, process.env[key]]);
  
  if (secretsToSet.length === 0) {
    console.log('No valid secrets found in .env file. Please update your .env file with actual values.');
    return;
  }
  
  // Build the command
  const secretsString = secretsToSet
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  
  const command = `supabase secrets set ${secretsString}`;
  
  console.log('Setting Supabase secrets...');
  try {
    execSync(command, { stdio: 'inherit' });
    console.log('Supabase secrets set successfully!');
  } catch (error) {
    console.error('Error setting Supabase secrets:', error.message);
  }
}

// Main function
function main() {
  console.log('Reading .env file...');
  
  // Check if environment variables were loaded
  const envVarsLoaded = Object.keys(process.env).some(key => 
    ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'STRIPE_SECRET_KEY'].includes(key)
  );
  
  if (!envVarsLoaded) {
    console.log('No relevant environment variables found. Please check your .env file.');
    return;
  }
  
  console.log('Environment variables loaded successfully.');
  setSupabaseSecrets();
}

main();
