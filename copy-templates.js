const fs = require('fs-extra');
const path = require('path');

// Source and destination paths
const sourcePath = path.join(__dirname, 'src', 'notification', 'templates');
const destinationPath = path.join(__dirname, 'dist', 'notification', 'templates');

// Copy templates
fs.copy(sourcePath, destinationPath)
  .then(() => {
    console.log('Templates copied successfully!');
  })
  .catch((error) => {
    console.error('An error occurred while copying templates:', error);
  });
