
/**
* The "min()" function returns the smallest of the given numbers.
* It can take any number of arguments and will return the minimum value.
* If no arguments are provided, it returns Infinity.
* @param {...number} args - The numbers to compare.
* @returns {number} - The smallest number among the arguments.
* @example
* console.log(min(1, 2, 3)); // 1
* console.log(min(-1, -2, -3)); // -3
* console.log(min()); // Infinity
* console.log(min(5, 10, 15, 20)); // 5
*/
function(...args) {
    if (args.length === 0) return Infinity;

    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] !== 'number' && typeof args[i] !== 'string') {
            throw new TypeError('All arguments must be valid numbers');
        }
        if (typeof args[i] === 'string') {
            const num = Number(args[i]);
            if (isNaN(num)) {
                return NaN; // If any argument is a non-numeric string, return NaN
            }
            args[i] = num;
        }
        if (Number.isNaN(args[i])) {
            return NaN;
        }
    }

    let min = args[0];
    for (let i = 1; i < args.length; i++) {
        if (args[i] < min) {
            min = args[i];
        }
    }

    return min;
}