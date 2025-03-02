const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const __call = require('../../Function/_call');

Array.prototype.__some = function(callback, context) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }

    const boundContext = (typeof context === 'string' && !isNaN(Number(context))) ? Number(context) : context;

    for (let i = 0; i < this.length; i++) {
        if (i in this && callback.call(boundContext, this[i], i, this)) {
            return true; 
        }
    }
    return false;
};


module.exports = {
    __some: Array.prototype.__some,

    some_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_some.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));
        }

        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)){

        const explanations = `
/**
* Array.prototype.some() - Tests whether at least one element in the array passes the test 
* implemented by the provided function. It stops execution once a match is foun* 
* The "some()" method checks if any array elements satisfy a given condition specified in the 
* callback function. It returns a boolean value (true or false).
* 
* @syntax:
* @array.some(callback(currentValue, index, array), thisArg);
* 
* @callback: A function that is executed for each element in the array until it returns true 
* or all elements are processed. It takes three arguments:
* - @currentValue: The current element being processed in the array.
* - @index (Optional): The index of the current element being processed.
* - @array (Optional): The array "some" was called upon.
* 
* @thisArg (Optional): Value to use as "this" when executing the "callback".
* 
* @return* - Returns true if the callback function returns true for at least one element in the array.
* - Returns false if the callback function returns false for all elements.
* 
* @description:
* - The "some()" method does not modify the original array.
* - It is a short-circuiting method, meaning it stops iterating as soon as a match is found.
* 
* @example:
* Example 1: Check if any number is greater than 10
* const numbers = [1, 5, 8, 12];
* const hasLargeNumber = numbers.some(num => num > 10);
* console.log(hasLargeNumber); // Output: true
* 
* Example 2: Check if a specific value exists
* const fruits = ['apple', 'banana', 'grape'];
* const hasApple = fruits.some(fruit => fruit === 'apple');
* console.log(hasApple); // Output: true
* 
* Example 3: Using "thisArg"
* const threshold = { limit: 10 };
* const exceedsLimit = numbers.some(function(num) {
*     return num > this.limit;
* }, threshold);
* console.log(exceedsLimit); // Output: true
**/
`;

        const code = `
Array.prototype.__some = function(callback , context){
    if (typeof callback !== 'function') {
        throw new TypeError(callback + "is not a function");
    }
    const boundContext = (typeof context === 'string' && !isNaN(Number(context))) ? Number(context) : context;
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            if (i in this && callback.__call(boundContext, this[i], i, this)) {
                return true; 
            }
        }
    }
    return false;
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