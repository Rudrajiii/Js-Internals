const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
require('./_from');
Function.prototype.__of = function(...args) {
    return Array.__from(args);
};

module.exports = {
    __of: Function.prototype.__of,

    of_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_of.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));
        }

        if (!fs.existsSync(outputPath)) {

        const explanations = `
/**
* Custom Array.of() - Creates a new Array instance with a variable number of arguments.
* This method is useful for creating arrays from any number of arguments,
* regardless of type.
*
* @param {...*} items - The items to include in the new Array.
* @returns {Array} - A new Array instance containing the provided items.
**/`;

        const code = 
`
require('./_from');
Function.prototype.__of = function(...args) {
    return Array.__from(args);
};
`.trim();

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
