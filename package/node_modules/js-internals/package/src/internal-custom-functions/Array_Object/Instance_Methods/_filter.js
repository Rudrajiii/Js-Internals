const fs = require('fs');
const path = require('path');

const __call = require('../Static_Methods/_call');
Array.prototype.__push = function(element) {
    this[this.length] = element;
    return this.length;
};

Array.prototype.__filter = function(callback, context) {
    const temp = [];

    for (let i = 0; i < this.length; i++) {
        if(callback.__call(context , this[i] , i , this)){
            temp.__push(this[i]);
        }
    }
    return temp;
};

module.exports = {
    __filter: Array.prototype.__filter,

    filter_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_filter.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const explanations = `
/**
 * Array.prototype.filter() - Creates a new array with all elements that pass the test implemented by the provided function.
 * The "filter()" method executes a provided function once for each array element and constructs a new array of elements for which the function returns 'true'. It does not execute the function for empty elements and does not modify the original array.
 * @syntax :
 * @array.filter(callback(currentValue, index, array), thisArg);

 * @callback: A function that is called for every element of the array. It takes three arguments:
 * - @index (Optional): The index of the current element being processed in the array.
 * - @array (Optional): The array "filter" was called upon.

 * @thisArg (Optional): Value to use as "this" when executing the "callback".
 * @returns
 *  A new array with the elements that pass the test. If no elements pass the test, an empty array will be returned.
**/
`


const code = `
const __call = require('./_call');

Array.prototype.__push = function(element) {
    this[this.length] = element;
    return this.length;
};

Array.prototype.__filter = function(callback, context) {
    const temp = [];

    for (let i = 0; i < this.length; i++) {
        if(callback.__call(context , this[i] , i , this)){
            temp.__push(this[i]);
        }
    }
    return temp;
};
        `.trim();
        fs.writeFileSync(outputPath, explanations + code, 'utf8');
        return `File created at ${outputPath}`;
    }
};