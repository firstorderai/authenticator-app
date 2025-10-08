#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking deployment readiness...\n');

// Check if required files exist
const requiredFiles = [
  'index.html',
  'assets/css/output.css',
  'assets/images/app-icon.svg',
  'favicon.ico',
];

let allFilesExist = true;

requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check if CSS file is recent (built)
const cssPath = 'assets/css/output.css';
if (fs.existsSync(cssPath)) {
  const stats = fs.statSync(cssPath);
  const now = new Date();
  const fileTime = new Date(stats.mtime);
  const diffMinutes = (now - fileTime) / (1000 * 60);

  if (diffMinutes < 5) {
    console.log(
      `✅ CSS file is recent (${Math.round(diffMinutes)} minutes ago)`
    );
  } else {
    console.log(
      `⚠️  CSS file is ${Math.round(
        diffMinutes
      )} minutes old - consider running 'npm run build'`
    );
  }
}

// Check file sizes
console.log('\n📊 File sizes:');
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`   ${file}: ${sizeKB} KB`);
  }
});

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 Ready for deployment!');
  console.log('\nNext steps:');
  console.log('1. git add .');
  console.log('2. git commit -m "Deploy to GitHub Pages"');
  console.log('3. git push origin main');
} else {
  console.log('❌ Not ready for deployment - missing required files');
  process.exit(1);
}
