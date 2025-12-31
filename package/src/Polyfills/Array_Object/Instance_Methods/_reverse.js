const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

Array.prototype.__reverse = function(callback , context) {
    let left = 0;
    let right = this.length - 1;
    while (left < right) {
        const temp = this[left];
        this[left] = this[right];
        this[right] = temp;
        left++;
        right--;
    }
    return this;
}

module.exports = {
    __reverse: Array.prototype.__reverse,
    reverse_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_reverse.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));

        }
        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)) {

            const explanations = `
/**
* Array.prototype.reverse() - Reverses the elements of an array in place.
* The reverse() method changes the order of the elements in an array to the opposite order.
* @syntax :
* *array.reverse();

* @returns:
* The reversed array.
**/
`
            const code = 'Array.prototype.__reverse = ' + Array.prototype.__reverse.toString();
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
                chalk.gray(` already exists.`)
            );
        }
    }
};


