
/**
* Custom Array.of() - Creates a new Array instance with a variable number of arguments.
* This method is useful for creating arrays from any number of arguments,
* regardless of type.
*
* @param {...*} items - The items to include in the new Array.
* @returns {Array} - A new Array instance containing the provided items.
**/
Array.__from = function(arrayLike, mapFn, thisArg) {
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
}
Function.prototype.__of = function(...args) {
    return Array.__from(args);
}