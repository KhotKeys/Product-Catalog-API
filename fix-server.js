#!/usr/bin/env node

/**
 * Server Fix Script
 * This script helps diagnose and fix common server startup issues
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Product Catalog API - Server Fix Script');
console.log('==========================================\n');

// Check for common issues and provide fixes
const checkAndFix = async () => {
  try {
    // 1. Check if .env file exists
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) {
      console.log('❌ .env file not found');
      console.log('✅ Creating .env file...');
      
      const envContent = `# Server Configuration
PORT=3002
NODE_ENV=development

# MongoDB Configuration
# Option 1: Local MongoDB (requires MongoDB to be installed locally)
# MONGODB_URI=mongodb://localhost:27017/product_catalog_db

# Option 2: MongoDB Atlas (cloud database - recommended for demo)
# Replace with your actual MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/product_catalog_db

# Option 3: Using MongoDB Memory Server for demo (will be implemented)
MONGODB_URI=mongodb://localhost:27017/product_catalog_db
USE_MEMORY_DB=true

# API Configuration
API_VERSION=v1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;
      fs.writeFileSync(envPath, envContent);
      console.log('✅ .env file created successfully\n');
    } else {
      console.log('✅ .env file exists\n');
    }

    // 2. Check if dependencies are installed
    const nodeModulesPath = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      console.log('❌ Dependencies not installed');
      console.log('✅ Installing dependencies...');
      
      return new Promise((resolve, reject) => {
        exec('npm install', (error, stdout, stderr) => {
          if (error) {
            console.error('❌ Error installing dependencies:', error);
            reject(error);
            return;
          }
          console.log('✅ Dependencies installed successfully\n');
          checkPort();
          resolve();
        });
      });
    } else {
      console.log('✅ Dependencies already installed\n');
      checkPort();
    }

  } catch (error) {
    console.error('❌ Error during setup:', error);
  }
};

// Check if port is available
const checkPort = () => {
  const port = process.env.PORT || 3002;
  
  exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
    if (stdout) {
      console.log(`❌ Port ${port} is already in use`);
      console.log('🔧 To fix this:');
      console.log('1. Change PORT in .env file to a different port');
      console.log('2. Or run: taskkill /F /IM node.exe\n');
    } else {
      console.log(`✅ Port ${port} is available\n`);
    }
    
    console.log('🚀 Ready to start server!');
    console.log('Run: npm run dev');
    console.log(`📚 API Documentation will be at: http://localhost:${port}/api-docs`);
  });
};

// Run the check
checkAndFix();
