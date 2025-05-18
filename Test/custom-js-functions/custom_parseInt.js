
/**
* Custom implementation of parseInt().
*
* The parseInt() function parses a given string and returns an integer.
* It follows the same behavior as JavaScript’s native parseInt() function, 
* allowing an optional radix (base) between 2 and 36.
* 
* Key Features:
* - Trims leading/trailing whitespace.
* - Handles sign ('+' or '-') before conversion.
* - Detects radix when not explicitly provided (e.g., "0x" for hexadecimal, "0" for octal in legacy mode).
* - Stops at the first invalid character, similar to parseInt().
* - Supports bases from 2 to 36.
* - Returns NaN for invalid conversions.
*
* @param {string | number} value - The value to be parsed into an integer.* @param {number} [radix] - The base (between 2 and 36) to use for conversion. Defaults to 10 unless detected otherwise.
* @returns {number} - The parsed integer, or NaN if conversion fails.
*
* @example
* console.log($parseInt("42"));        // 42  (Default base 10)
* console.log($parseInt("   42   "));  // 42  (Ignores whitespace)
* console.log($parseInt("101", 2));    // 5   (Binary to decimal)
* console.log($parseInt("0xF", 16));   // 15  (Hexadecimal)
* console.log($parseInt("077", 8));    // 63  (Legacy Octal)
* console.log($parseInt("-10", 2));    // -2  (Negative binary)
* console.log($parseInt("123abc"));    // 123 (Stops at first invalid character)
* console.log($parseInt("abc123"));    // NaN (Invalid number start)
* console.log($parseInt("42", 37));    // NaN (Invalid radix)
* 
* @example
* All Edge Cases
* console.log($parseInt("  +42"));  // 42  (Handles leading + sign)
* console.log($parseInt("-42.9"));  // -42 (Stops at decimal point)
* console.log($parseInt("0xG", 16));// 0   (Stops at 'G', invalid in hex)
* console.log($parseInt("Infinity"));// NaN (Not a valid number)
*/
function $parseInt(value, radix = 10) {
    if (Array.isArray(value)) {
        value = value[0];
    }

    if (typeof value !== 'string' && typeof value !== 'number') return NaN;

    let str = String(value).trim();

    if (str === 'Infinity' || str === 'NaN' || str === '') return NaN;

    if (str.startsWith('0x') || str.startsWith('0X')) {
        if (radix === 10) radix = 16;
        str = str.slice(2);
    }

    if (radix < 2 || radix > 36 || !Number.isInteger(radix)) return NaN;

    let result = 0;
    let sign = 1;
    let i = 0;

    if (str[i] === '-') {
        sign = -1;
        i++;
    } else if (str[i] === '+') {
        i++;
    }

    let hasValidDigits = false;

    while (i < str.length) {
        let char = str[i].toLowerCase();
        let digit;

        if (char >= '0' && char <= '9') {
            digit = char.charCodeAt(0) - 48;
        } else if (char >= 'a' && char <= 'z') {
            digit = char.charCodeAt(0) - 87;
        } else {
            break;
        }

        if (digit >= radix) break;

        hasValidDigits = true;
        result = result * radix + digit;
        i++;
    }

    if (!hasValidDigits) return NaN;

    return sign * result;
}