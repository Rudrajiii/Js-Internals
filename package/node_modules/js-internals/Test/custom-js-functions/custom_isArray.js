
/**
 * Custom isArray() - Determines whether the passed value is an Array.
 * This method returns true if the value is an array, and false otherwise.
 * It is useful for checking the type of a variable.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is an array, false otherwise.
 **/

Function.prototype.__isArray = function(value) {
    return Object.prototype.toString.__call(value) === '[object Array]';
};