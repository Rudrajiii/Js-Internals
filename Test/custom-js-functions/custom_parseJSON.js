
/**
* Custom implementation of JSON.parse().
*
* The $parseJSON() function takes a JSON string and converts it to a corresponding JavaScript object.
* It handles null, boolean, numbers, strings, arrays, and objects.
* Optionally, a reviver function can be provided to modify the resulting object or array before returning it.
*
* @param {string} str - A valid JSON string.
* @param {function|null} [reviver] - Optional reviver function to transform the parsed values.
* @returns {any} - Returns the parsed JavaScript object or value.
*
* @example
* console.log($parseJSON('{"name": "John", "age": 30}', (key, value) => {
*   if (key === 'age') return value + 5;
*   return value;
* })); // { name: 'John', age: 35 }
*
* console.log($parseJSON('[1, 2, 3]', (key, value) => value * 2)); // [2, 4, 6]
* console.log($parseJSON('"hello"', (key, value) => value.toUpperCase())); // 'HELLO'
* console.log($parseJSON('true', (key, value) => !value)); // false
*/
function $parseJSON(str, reviver = null) {
    if (typeof str !== 'string') {
        throw new SyntaxError('Input must be a valid JSON string');
    }

    str = str.trim();
    if (str === "undefined") {
        throw new SyntaxError('Error parsing JSON: undefined is not a valid JSON value');
    }

    if (/,\s*[\]}]/.test(str.trim())) {
        throw new Error('Error parsing JSON: Invalid trailing comma');
    }

    try {
        if (str === 'null') return applyReviver(null, reviver);
        if (str === 'true') return applyReviver(true, reviver);
        if (str === 'false') return applyReviver(false, reviver);
        if (!isNaN(Number(str)) && str !== '') return applyReviver(Number(str), reviver);

        if (str.startsWith('"') && str.endsWith('"')) {
            const parsedStr = str.slice(1, -1);
            if (parsedStr.startsWith('{') || parsedStr.startsWith('[')) {
                try {
                    return applyReviver($parseJSON(parsedStr, reviver), reviver);
                } catch {
                    return applyReviver(parsedStr, reviver);
                }
            }
            return applyReviver(parsedStr, reviver);
        }

        if (str.startsWith('[') && str.endsWith(']')) {
            const arr = str.slice(1, -1).trim();
            if (arr === '') return applyReviver([], reviver);

            const items = arr.split(',').map((item) => item.trim());
            const parsedArr = items.map((item, index) =>
                applyReviver($parseJSON(item, reviver), reviver, index, [])
            );
            return applyReviver(parsedArr, reviver);
        }

        if (str.startsWith('{') && str.endsWith('}')) {
            const objStr = str.slice(1, -1).trim();
            if (objStr === '') return applyReviver({}, reviver); 

            const obj = {};
            const items = objStr.split(',').map((item) => item.trim());

            items.forEach((item) => {
                const [key, value] = item.split(/:(.*)/).map((v) => v.trim());
                if (!key || value === undefined) {
                    throw new Error('Invalid JSON string');
                }

                const parsedKey = $parseJSON(key, reviver);
                obj[parsedKey] = applyReviver($parseJSON(value, reviver), reviver, parsedKey, obj);
            });

            return applyReviver(obj, reviver);
        }

        throw new Error('Invalid JSON string');
    } catch (error) {
        throw new Error('Error parsing JSON: ' + error.message);
    }
}