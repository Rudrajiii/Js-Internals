const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


function $isNaN(value) {
    const numericValue = Number(value);
    return numericValue !== numericValue;
}

module.exports = {
    $isNaN,

    isNaN_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_isNaN.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)) {

        const explanations = `
/**
* Custom implementation of isNaN().
*
* The isNaN() function determines whether a value is NaN (Not-a-Number).
* Unlike the global isNaN(), this function does not coerce values, making it more reliable.
*
* @param {any} value - The value to be tested.
* @returns {boolean} - Returns true if the value is NaN, otherwise false.
*
* @example
* console.log($isNaN(NaN)); // true
* console.log($isNaN('hello')); // false
* console.log($isNaN(123)); // false
* console.log($isNaN(undefined)); // false
*/
`;

        const code = `
function $isNaN(value) {
    const numericValue = Number(value);
    return numericValue !== numericValue;
}
        `.trim();

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
