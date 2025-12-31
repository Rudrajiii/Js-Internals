const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

Array.prototype.__includes = function (searchElement, fromIndex = 0) {
  const len = this.length;
  if (len === 0) return false;

  /**
   * @param {number} fromIndex - The position in this array at which to begin searching for searchElement.
   * If fromIndex is greater than or equal to the length of the array, false is returned.
   * If fromIndex is negative, it is treated as an offset from the end of the array.
   * If the calculated index is less than 0, the search starts from index 0.
   */
  let start = Math.max(fromIndex >= 0 ? fromIndex : len + fromIndex, 0);

  for (let i = start; i < len; i++) {
    /**
     * @param {any} searchElement - The element to search for in the array.
     * The search is performed using strict equality (===).
     * If the element is NaN, it will match only with another NaN.
     * This is a special case in JavaScript, as NaN is not equal to itself.
     */
    if (this[i] === searchElement || (Number.isNaN(this[i]) && Number.isNaN(searchElement))) {
      return true;
    }
  }
  return false;
};

module.exports = {
  __includes: Array.prototype.__includes,

  includes_internals: function () {
    const outputDir = path.join(process.cwd(), "custom-js-functions");
    const outputPath = path.join(outputDir, "custom_includes.js");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(
        chalk.blue("ℹ ") + chalk.blue(`Created directory: ${outputDir}`)
      );
    }
    // Check if the file already exists before overwriting
    if (!fs.existsSync(outputPath)) {
      const explanations = `
/**
 * Array.prototype.includes() - Determines whether an array includes a certain value among its entries, returning true or false as appropriate.
 *  The "includes()" method checks if a specified element exists in an array, starting the search at a given index.
 * It returns true if the element is found, and false otherwise.
 * @syntax:
 * @array.includes(searchElement, fromIndex);
 *  @param {any} searchElement - The value to search for.
 *  @param {number} [fromIndex=0] - The index to start the search from.
 *  @returns {boolean} - Returns true if the element is found, false otherwise.
 * @example
 * const array = [1, 2, 3];
 * console.log(array.includes(2)); // true
 * console.log(array.includes(4)); // false
 * console.log(array.includes(3, 3)); // false
 * console.log(array.includes(3, -1)); // true
**/
`;
      const code =
        "Array.prototype.__includes = " + Array.prototype.__includes.toString();

      fs.writeFileSync(outputPath, explanations + code, "utf8");
      const fileName = path.basename(outputPath);
      console.log(chalk.green("✓ Created: ") + chalk.white(fileName));
    } else {
      const fileName = path.basename(outputPath);
      console.log(
        chalk.yellow("⚠ Skipped: ") +
          chalk.white(fileName) +
          chalk.gray(` already exists.`)
      );
    }
  },
};
