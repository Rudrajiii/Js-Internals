
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