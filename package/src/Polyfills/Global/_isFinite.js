const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const { $isNaN } = require("./_isNaN");

function $isFinite(value) {
    if (value instanceof Number) {
        value = value.valueOf();
    }
    const numericValue = Number(value);
    return  typeof numericValue === 'number' 
            && !$isNaN(numericValue) 
            && numericValue !== Infinity 
            && numericValue !== -Infinity;
    }

module.exports = {
    $isFinite,

    isFinite_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_isFinite.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)) {

        const explanations = `
/**
* The "isFinite()" function determines whether a given value is a finite number.
* It first converts the value to a number (if possible) and then checks if it is 
* neither "Infinity" nor "-Infinity".
*
* Unlike "isNaN()", which checks if a value is "NaN", "isFinite()" ensures the 
* value is a valid number that is within the finite range of JavaScript's 
* number system.
*
* @param {any} value - The value to be tested.
* @returns {boolean} - Returns true if the value is a finite number, otherwise false.
*
* @example
* console.log(isFinite(10)); // true
* console.log(isFinite(-5)); // true
* console.log(isFinite(3.14)); // true
* console.log(isFinite(NaN)); // false
* console.log(isFinite(Infinity)); // false
* console.log(isFinite(-Infinity)); // false
* console.log(isFinite("100")); // true (string converted to number)
* console.log(isFinite("hello")); // false (cannot be converted to number)
*/
`;

        const code = $isFinite.toString();

        fs.writeFileSync(outputPath, explanations + code, 'utf8');
         const fileName = path.basename(outputPath);
                console.log(
                        chalk.green('✓ Created: ') + 
                        chalk.white(fileName)
                );
    }else{
         const fileName = path.basename(outputPath);
                console.log(
                    chalk.yellow('⚠ Skipped: ') + 
                    chalk.white(fileName) + 
                    chalk.gray(` already exists.`)
                );
    }
}
};
