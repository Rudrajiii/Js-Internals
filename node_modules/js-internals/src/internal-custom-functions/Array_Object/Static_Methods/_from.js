const fs = require('fs');
const path = require('path');

// Custom Array.from implementation
Function.prototype.__from = function(arrayLike, mapFn, thisArg) {
    // Check if arrayLike is null or undefined
    if (arrayLike == null) {
        throw new TypeError('Invalid input: Expected an array-like object');
    }

    // Handle strings as special case
    if (typeof arrayLike === 'string') {
        return Array.from(arrayLike, (char) => {
            const num = Number(char);
            return isNaN(num) ? char : num; // Convert to number if possible
        });
    }

    // Check for valid array-like object
    const len = arrayLike.length;

    if (typeof len !== 'number' || len < 0 || len % 1 !== 0) {
        return undefined; // Not an array-like object
    }

    const result = [];
    for (let i = 0; i < len; i++) {
        // Ensure the index exists in the object
        if (i in arrayLike) {
            const element = arrayLike[i];
            // Use mapFn.call instead of mapFn.__call
            result[i] = typeof mapFn === 'function' ? mapFn.call(thisArg, element, i) : element;
        }
    }
    return result;
};


// Export the __from method and a function to create documentation
module.exports = {
    __from: Function.prototype.__from,

    // Function to create a file with explanations and code for __from
    from_internals: function () {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_from.js');

        // Create the directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Explanation for the __from method
        const explanations = `
/**
 * Function.prototype.__from() - Creates a new array from an array-like or iterable object.
 * The "__from()" method takes an array-like or iterable object and creates a new array 
 * containing the elements of the input. It also supports an optional mapping function 
 * that can be applied to each element.
 * @syntax :
 * 
 * @Array.__from(arrayLike[, mapFn[, thisArg]]);
 * Array.from(arrayLike)
 * Array.from(arrayLike, mapFn)
 * Array.from(arrayLike, mapFn, thisArg)
 *
 * @arrayLike : The array-like or iterable object to convert to an array.
 * @mapFn : Optional. A mapping function to apply to each element. This function is called with
 *          the value, the index (or key), and the this value specified by thisArg.
 * @thisArg : Optional. Value to use as **this** when executing mapFn.
 *
 * @returns : A new array containing the elements from the array-like or iterable object.
 **/
        `.trim();

        const code = `
Function.prototype.__from = function(arrayLike, mapFn, thisArg) {
    // Check if arrayLike is null or undefined
    if (arrayLike == null) {
        throw new TypeError('Invalid input: Expected an array-like object');
    }

    // Handle strings as special case
    if (typeof arrayLike === 'string') {
        return Array.from(arrayLike, (char) => {
            const num = Number(char);
            return isNaN(num) ? char : num; // Convert to number if possible
        });
    }

    // Check for valid array-like object
    const len = arrayLike.length;

    if (typeof len !== 'number' || len < 0 || len % 1 !== 0) {
        return undefined; // Not an array-like object
    }

    const result = [];
    for (let i = 0; i < len; i++) {
        // Ensure the index exists in the object
        if (i in arrayLike) {
            const element = arrayLike[i];
            // Use mapFn.call instead of mapFn.__call
            result[i] = typeof mapFn === 'function' ? mapFn.call(thisArg, element, i) : element;
        }
    }
    return result;
};

        `.trim();

        // Write the explanations and code to a file
        fs.writeFileSync(outputPath, explanations + code, 'utf8');
        return `File created at ${outputPath}`;
    }
};
