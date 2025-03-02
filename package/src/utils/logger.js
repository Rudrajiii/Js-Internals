// src/utils/logger.js
const chalk = require('chalk');
const path = require('path');

const logger = {
  success: (message) => console.log(chalk.green('✓ ') + chalk.green.bold(message)),
  info: (message) => console.log(chalk.blue('ℹ ') + chalk.blue(message)),
  warning: (message) => console.log(chalk.yellow('⚠ ') + chalk.yellow(message)),
  error: (message) => console.log(chalk.red('✗ ') + chalk.red.bold(message)),
  fileCreated: (filePath) => {
    const fileName = path.basename(filePath);
    console.log(
      chalk.green('✓ Created: ') + 
      chalk.white(fileName)
    );
  },
  fileExists: (filePath) => {
    const fileName = path.basename(filePath);
    console.log(
      chalk.yellow('⚠ Skipped: ') + 
      chalk.white(fileName) + 
      chalk.gray(` already exists!!`)
    );
  },
  functionInfo: (name) => {
    console.log(
      chalk.blue('➤ ') + 
      chalk.blue.bold(`${name} `) + 
      chalk.blue('internals')
    );
  }
};

module.exports = logger;