const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

Array.prototype.__indexOf = function(searchElement, fromIndex = 0){
  if (this == null) {
    throw new TypeError('"this" is null or not defined');
  }

  const array = Object(this);
  const length = array.length >>> 0; // Convert to unsigned 32-bit integer

  if (length === 0) return -1;

  let start = Number(fromIndex) || 0;
  if (start >= length) return -1;
  if (start < 0) start = Math.max(length + start, 0);

  for (let i = start; i < length; i++) {
    if (i in array && array[i] === searchElement) {
      return i;
    }
  }

  return -1;
}

module.exports = {
  __indexOf: Array.prototype.__indexOf,

  indexOf_internals: function () {
    const outputDir = path.join(process.cwd(), 'custom-js-functions');
    const outputPath = path.join(outputDir, 'custom_indexOf.js');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));
    }

    if (!fs.existsSync(outputPath)) {
      const explanations = `
/**
 * Array.prototype.indexOf() - Returns the first index at which a given element can be found in the array, or -1 if it is not present.
 *
 * @syntax:
 * @array.indexOf(searchElement, fromIndex)
 *
 * @searchElement: Element to locate in the array.
 * @fromIndex (Optional): The index to start the search at. Defaults to 0. If negative, it's taken as length + fromIndex.
 *
 * @returns:
 * - The first index of the element in the array; -1 if not found.
 */
`;

      const code = 'Array.prototype.__indexOf = ' + Array.prototype.__indexOf.toString();

      fs.writeFileSync(outputPath, explanations + code, 'utf8');
      const fileName = path.basename(outputPath);
      console.log(
        chalk.green('✓ Created: ') +
        chalk.white(fileName)
      );
    } else {
      const fileName = path.basename(outputPath);
      console.log(
        chalk.yellow('⚠ Skipped: ') +
        chalk.white(fileName) +
        chalk.gray(' already exists.')
      );
    }
  }
};