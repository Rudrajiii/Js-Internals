const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function $parseFloat(value) {
    if (Array.isArray(value)) {
        value = value[0];
    }

    if (typeof value !== 'string' && typeof value !== 'number') return NaN;

    let str = String(value).trim();

    if (str === '' || str === 'Infinity' || str === 'NaN') return NaN;

    let i = 0;
    let sign = 1;

    // Handle sign
    if (str[i] === '-') {
        sign = -1;
        i++;
    } else if (str[i] === '+') {
        i++;
    }

    let num = 0;
    let decimalFound = false;
    let decimalMultiplier = 0.1;
    let hasDigits = false;
    let exponentFound = false;
    let exponentSign = 1;
    let exponentValue = 0;

    while (i < str.length) {
        const char = str[i];

        if (char >= '0' && char <= '9') {
            hasDigits = true;

            if (!exponentFound) {
                if (!decimalFound) {
                    num = num * 10 + (char.charCodeAt(0) - 48);
                } else {
                    num += (char.charCodeAt(0) - 48) * decimalMultiplier;
                    decimalMultiplier *= 0.1;
                }
            } else {
                exponentValue = exponentValue * 10 + (char.charCodeAt(0) - 48);
            }
        } else if (char === '.' && !decimalFound && !exponentFound) {
            decimalFound = true;
        } else if ((char === 'e' || char === 'E') && !exponentFound && hasDigits) {
            exponentFound = true;
        } else if ((char === '-' || char === '+') && exponentFound && i === 1) {
            // Already handled sign at start
        } else if ((char === '-' || char === '+') && exponentFound && str[i - 1] === 'e') {
            exponentSign = (char === '-') ? -1 : 1;
        } else {
            break; // Invalid character
        }

        i++;
    }

    if (!hasDigits) return NaN;

    num = sign * num;

    if (exponentFound) {
        num *= Math.pow(10, exponentSign * exponentValue);
    }

    return num;
}

module.exports = {
    $parseFloat,

    parseFloat_internals: function () {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_parseFloat.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        if (!fs.existsSync(outputPath)) {
            const explanations = `
/**
 * Custom implementation of parseFloat().
 *
 * Parses a string and returns a floating-point number.
 * Mimics native JavaScript parseFloat():
 * - Skips leading whitespace
 * - Handles optional '+' or '-'
 * - Supports decimal points and scientific notation (e.g., "3.14", "1.23e5")
 * - Stops parsing on encountering invalid characters
 * - Returns NaN if no valid number found
 *
 * @param {string | number} value - The value to parse into a float.
 * @returns {number} - The parsed float, or NaN if invalid.
 *
 * @example
 * console.log($parseFloat("3.14"));           // 3.14
 * console.log($parseFloat("   -123.45   "));  // -123.45
 * console.log($parseFloat("123abc"));         // 123
 * console.log($parseFloat("abc123"));         // NaN
 * console.log($parseFloat("1.23e5"));         // 123000
 * console.log($parseFloat("1.23e-2"));        // 0.0123
 * console.log($parseFloat("Infinity"));       // NaN
 * console.log($parseFloat("-Infinity"));      // NaN
 * console.log($parseFloat(""));               // NaN
 */
`;

            const code = $parseFloat.toString();

            fs.writeFileSync(outputPath, explanations + code, 'utf-8');
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
                chalk.gray(` already exists.`)
            );
        }
    }
};




