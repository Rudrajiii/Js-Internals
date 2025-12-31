const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

Math.$max = function(...args) {
    if (args.length === 0) return -Infinity;

    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] !== 'number' && typeof args[i] !== 'string') {
            throw new TypeError('All arguments must be valid numbers');
        }
        if (typeof args[i] === 'string') {
            const num = Number(args[i]);
            if (isNaN(num)) {
                return NaN; // If any argument is a non-numeric string, return NaN
            }
            args[i] = num;
        }
        if (Number.isNaN(args[i])) {
            return NaN;
        }
    }

    let max = args[0];
    for (let i = 1; i < args.length; i++) {
        if (args[i] > max) {
            max = args[i];
        }
    }

    return max;
}


module.exports = {
    $max: Math.$max,

    max_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_max.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)) {

        const explanations = `
/**
* The "max()" function returns the largest of the given numbers.
* It can take any number of arguments and will return the maximum value.
* If no arguments are provided, it returns -Infinity.
* @param {...number} args - The numbers to compare.
* @returns {number} - The largest number among the arguments.
* @example
* console.log(max(1, 2, 3)); // 3
* console.log(max(-1, -2, -3)); // -1
* console.log(max()); // -Infinity
* console.log(max(5, 10, 15, 20)); // 20
*/
`;

        const code = `Math.$max = ` + Math.$max.toString();

        fs.writeFileSync(outputPath, explanations + code, 'utf8');
         const fileName = path.basename(outputPath);
         console.log(
            chalk.green('✓ Created: ') + 
            chalk.white(fileName)
        );
        }
        else {
            const fileName = path.basename(outputPath);
            console.log(
                chalk.yellow('⚠ Skipped: ') + 
                chalk.white(fileName) + 
                chalk.gray(` already exists.`)
            );
        }
    }
};