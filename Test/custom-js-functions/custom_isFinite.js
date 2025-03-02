
/**
* The "isFinite()" function determines whether a given value is a finite number.
* It first converts the value to a number (if possible) and then checks if it is 
* neither "Infinity" nor "-Infinity".
*
* Unlike "isNaN()", which checks if a value is "NaN", "isFinite()" ensures the 
* value is a valid number that is within the finite range of JavaScript's 
* number system.
*
* @param {any} value - The value to be tested.
* @returns {boolean} - Returns true if the value is a finite number, otherwise false.
*
* @example
* console.log(isFinite(10)); // true
* console.log(isFinite(-5)); // true
* console.log(isFinite(3.14)); // true
* console.log(isFinite(NaN)); // false
* console.log(isFinite(Infinity)); // false
* console.log(isFinite(-Infinity)); // false
* console.log(isFinite("100")); // true (string converted to number)
* console.log(isFinite("hello")); // false (cannot be converted to number)
*/
function $isFinite(value) {
    const numericValue = Number(value);
    return  typeof numericValue === 'number' 
            && !$isNaN(numericValue) 
            && numericValue !== Infinity 
            && numericValue !== -Infinity;
    }