const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const __call = require('../../Function/_call');

Array.prototype.__every = function(callback, context) {
    if (!Array.isArray(this)) {
        throw new TypeError('Object is not an array');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`Unexpected Error Occured!!`);
    }


    const boundContext = (typeof context === 'string' && !isNaN(Number(context))) ? Number(context) : context;

    for (let i = 0; i < this.length; i++) {
        if (i in this && !callback.call(boundContext, this[i], i, this)) {
            return false;
        }
    }
    return true;
};

module.exports = {
    __every: Array.prototype.__every,

    every_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_every.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));
        }
        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)) {

        const explanations = `
/**
* Array.prototype.every() - Tests whether all elements in the array pass the test 
* implemented by the provided function. It stops execution once a condition fails.
* 
* The "every()" method checks if all array elements satisfy a given condition specified in the 
* callback function. It returns a boolean value (true or false).
* 
* @syntax:
* @array.every(callback(currentValue, index, array), thisArg);
* 
* @callback: A function that is executed for each element in the array until it returns false 
* or all elements are processed. It takes three arguments:
* - @currentValue: The current element being processed in the array.
* - @index (Optional): The index of the current element being processed.
* - @array (Optional): The array "every" was called upon.
* 
* @thisArg (Optional): Value to use as "this" when executing the "callback".
* 
* @returns:
* - Returns true if the callback function returns true for all elements in the array.
* - Returns false if the callback function returns false for at least one element.
* 
* @description:
* - The "every()" method does not modify the original array.
* - It is a short-circuiting method, meaning it stops iterating as soon as a condition fails.
* 
* @example:
* Example 1: Check if all numbers are greater than 0
* const numbers = [1, 5, 8, 12];
* const allPositive = numbers.every(num => num > 0);
* console.log(allPositive); // Output: true
* 
* Example 2: Check if all strings have a length greater than 3
* const words = ['apple', 'banana', 'grape'];
* const allLong = words.every(word => word.length > 3);
* console.log(allLong); // Output: true
* 
* Example 3: Using "thisArg"
* const threshold = { limit: 10 };
* const withinLimit = numbers.every(function(num) {
*     return num < this.limit;
* }, threshold);
* console.log(withinLimit); // Output: false
**/
`;

        const code = 'Array.prototype.__every = '+ Array.prototype.__every.toString();

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
