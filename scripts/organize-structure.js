const fs = require('fs');
const path = require('path');

// Function to move files
const moveFile = (src, dest) => {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(src, dest);
};

// Create necessary directories
const directories = ['config', 'scripts'];
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

// Move config files
moveFile('tsconfig.json', 'config/tsconfig.json');

// Move script files
moveFile('fetch-structure.js', 'scripts/fetch-structure.js');
moveFile('organize-structure.js', 'scripts/organize-structure.js');

console.log('Files have been reorganized successfully.');