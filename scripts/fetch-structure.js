const fs = require('fs');
const path = require('path');

function getDirectoryStructure(dir, result = {}, exclude = ['node_modules', '.git', '.cache']) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (exclude.includes(file)) {
      return; // Skip excluded directories
    }

    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      result[file] = {};
      getDirectoryStructure(filePath, result[file], exclude);
    } else {
      result[file] = 'file';
    }
  });

  return result;
}

function formatStructure(structure, indent = 0) {
  const lines = [];
  const indentString = '  '.repeat(indent);

  for (const [key, value] of Object.entries(structure)) {
    if (value === 'file') {
      lines.push(`${indentString}- ${key}`);
    } else {
      lines.push(`${indentString}- ${key}/`);
      lines.push(formatStructure(value, indent + 1));
    }
  }

  return lines.join('\n');
}

// Change working directory to the root of the project
const rootDir = path.join(__dirname, '..');
const directoryStructure = getDirectoryStructure(rootDir);
console.log(formatStructure(directoryStructure));
