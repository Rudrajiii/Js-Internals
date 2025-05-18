const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

Function.prototype.__isArray = function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
};

module.exports = {
    __isArray: Function.prototype.__isArray,

    isArray_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_isArray.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));
        }
        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)) {

        const explanations = `
/**
* Custom isArray() - Determines whether the passed value is an Array.
* This method returns true if the value is an array, and false otherwise.
* It is useful for checking the type of a variable.
*
* @param value - The value to check.
* @returns {boolean} - True if the value is an array, false otherwise.
**/
`;

        const code = 'Function.prototype.__isArray = ' + Function.prototype.__isArray.toString();

        fs.writeFileSync(outputPath, explanations + code, 'utf8');
        const fileName = path.basename(outputPath);
            console.log(
                chalk.green('✓ Created: ') + 
                chalk.white(fileName)
            );
        // return `File created at ${outputPath}`;
    }else{
        const fileName = path.basename(outputPath);
            console.log(
                chalk.yellow('⚠ Skipped: ') + 
                chalk.white(fileName) + 
                chalk.gray(` already exists.`)
            );
        // return `File already exists at ${outputPath}`;
    }
}
};