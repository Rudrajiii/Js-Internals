const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const __call = require('../../Function/_call');


// Custom forEach method
Array.prototype.__forEach = function(callback, context) {
    // Check if 'callback' is a function
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }
    const boundContext = (typeof context === 'string' && !isNaN(Number(context))) ? Number(context) : context;
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            callback.__call(boundContext, this[i], i, this);
        }
    }
};

// Exporting the __forEach method and function to log its internals
module.exports = {
    __forEach: Array.prototype.__forEach,

    forEach_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_forEach.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));
        }

        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)){

        const explanations = `
/**
* Array.prototype.forEach() - Executes a provided function once for each array element.
* The "forEach()" method performs the specified action for each element in an array, similar to a loop. 
* It does not return a new array, making it useful for non-returning operations like logging.
* @syntax:
* @array.forEach(callback(currentValue, index, array), thisArg);
* 
* @callback: A function called for every element of the array. Takes three arguments:
* - @currentValue: The current element being processed in the array.
* - @index (Optional): The index of the current element being processed.
* - @array (Optional): The array "forEach" was called upon.
* 
* @thisArg (Optional): Value to use as "this" when executing the "callback".
**/
`;

const code = 
`
const __call = require('./_call');
Array.prototype.__forEach = function(callback, context) {
    // Check if 'callback' is a function
    if (typeof callback !== 'function') {
        throw new TypeError( callback ,"is not a function");
    }
    const boundContext = (typeof context === 'string' && !isNaN(Number(context))) ? Number(context) : context;
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            callback.__call(boundContext, this[i], i, this);
        }
    }
};
`.trim();

        fs.writeFileSync(outputPath, explanations + code, 'utf8');
        const fileName = path.basename(outputPath);
            console.log(
                chalk.green('✓ Created: ') + 
                chalk.white(fileName)
            );
        // return `File created at ${outputPath}`;
    }
    else{
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
