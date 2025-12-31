const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

Array.prototype.__slice = function (start, end) {
  // ===== Spec helpers =====
  function ToIntegerOrInfinity(value) {
    const n = Number(value);
    if (isNaN(n) || n === 0) return 0;
    if (!isFinite(n)) return n;
    return n > 0 ? Math.floor(n) : Math.ceil(n);
  }

  function ToLength(value) {
    const len = ToIntegerOrInfinity(value);
    return Math.min(Math.max(len, 0), Number.MAX_SAFE_INTEGER);
  }

  function ArraySpeciesCreate(original, length) {
    const C = original.constructor;
    if (typeof C !== "function") return new Array(length);

    const species = C[Symbol.species];
    if (species == null) return new Array(length);

    return new species(length);
  }

  // ===== Step 1: ToObject =====
  const O = Object(this);

  // ===== Step 2: Length =====
  const len = ToLength(O.length);

  // ===== Step 3: Start =====
  const relativeStart = ToIntegerOrInfinity(start);
  const k =
    relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);

  // ===== Step 4: End =====
  const relativeEnd = end === undefined ? len : ToIntegerOrInfinity(end);

  const final =
    relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len);

  // ===== Step 5: Create result array =====
  const count = Math.max(final - k, 0);
  const A = ArraySpeciesCreate(O, count);

  // ===== Step 6: Copy elements (preserve holes) =====
  let n = 0;
  for (let i = k; i < final; i++) {
    if (i in O) {
      A[n] = O[i];
    }
    n++;
  }

  // ===== Step 7: Set length =====
  A.length = n;

  return A;
};

module.exports = {
  __slice: Array.prototype.__slice,
  slice_internals: function () {
    const outputDir = path.join(process.cwd(), "custom-js-functions");
    const outputPath = path.join(outputDir, "custom_slice.js");
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
 * Array.prototype.__slice() - Returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included).
 * The original array will not be modified.
 * @syntax:
 * array.__slice(start, end);
 * @param {number} [start=0] - The beginning index of the specified portion of the array.
 * If start is negative, it is treated as length + start.
 * If start is omitted, __slice begins from index 0.
 * @param {number} [end=array.length] - The end index of the specified portion of the array.
 * If end is negative, it is treated as length + end.
 * If end is omitted, __slice extracts through the end of the array.
 * @returns {Array} - A new array containing the extracted elements.
 * @example:
 * const array = [1, 2, 3, 4, 5];
 * const newArray = array.__slice(1, 4);
 * console.log(newArray); // Output: [2, 3, 4]
 * console.log(array); // Original array remains unchanged: [1, 2, 3, 4, 5]
 * **/
`;

      const code =
        "Array.prototype.__slice = " + Array.prototype.__slice.toString();
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
