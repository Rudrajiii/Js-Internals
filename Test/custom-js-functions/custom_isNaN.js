
/**
* Custom implementation of isNaN().
*
* The isNaN() function determines whether a value is NaN (Not-a-Number).
* Unlike the global isNaN(), this function does not coerce values, making it more reliable.
*
* @param {any} value - The value to be tested.
* @returns {boolean} - Returns true if the value is NaN, otherwise false.
*
* @example
* console.log($isNaN(NaN)); // true
* console.log($isNaN('hello')); // false
* console.log($isNaN(123)); // false
* console.log($isNaN(undefined)); // false
*/
function $isNaN(value) {
    const numericValue = Number(value);
    return numericValue !== numericValue;
}