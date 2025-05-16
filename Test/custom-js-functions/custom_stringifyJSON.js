
/**
 * Custom implementation of JSON.stringify().
 *
 * The $stringifyJSON() function converts a JavaScript value to a JSON string.
 * It handles null, booleans, numbers, strings, arrays, and objects.
 * An optional replacer (function or array) and space argument for pretty formatting are supported.
 *
 * @param {any} value - The value to convert to a JSON string.
 * @param {function|array|null} [replacer] - A function or array that transforms the results.
 * @param {number|string} [space] - Adds indentation, white space, and line break characters.
 * @returns {string} - The JSON string representation of the value.
 *
 * @example
 * console.log($stringifyJSON({ name: "Alice", age: 25 }, null, 2));
 *  {
 *    "name": "Alice",
 *    "age": 25
 *  }
 *
 * console.log($stringifyJSON([1, "x", null, true]));
 * [1,"x",null,true]
 *
 * console.log($stringifyJSON({ a: 1, b: 2 }, ['b']));
 * {"b":2}
 */
function $stringifyJSON(value, replacer = null, space = 0) {
    const seen = new WeakSet();

    function serialize(key, value, depth = 0) {
    if (typeof replacer === 'function') {
        value = replacer(key, value);
    }

    // Handle toJSON()
    if (value !== null && typeof value === 'object' && 'toJSON' in value && typeof value.toJSON === 'function') {
        value = value.toJSON(); // Use custom serialization
    }

    // Handle Date objects
    if (value instanceof Date) {
        return `"${value.toISOString()}"`;
    }

    if (value === null) return 'null';
    if (typeof value === 'number') return isFinite(value) ? value.toString() : 'null';
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'string') return `"${value.replace(/"/g, '\\"')}"`;

    if (typeof value === 'object') {
        if (seen.has(value)) {
            throw new TypeError('Converting circular structure to JSON');
        }
        seen.add(value);

        const indent = typeof space === 'number' ? ' '.repeat(space * (depth + 1)) : '';
        const currentIndent = typeof space === 'number' ? ' '.repeat(space * depth) : '';

        if (Array.isArray(value)) {
            const arrItems = value.map((item, i) => 
                serialize(i, item, depth + 1) ?? 'null'
            );
            const joined = space ? `\n${indent}${arrItems.join(`,\n${indent}`)}\n${currentIndent}` : arrItems.join(',');
            return `[${joined}]`;
        } else {
            const entries = Object.entries(value)
                .filter(([k, v]) => {
                    if (Array.isArray(replacer)) {
                        return replacer.includes(k);
                    }
                    return true;
                })
                .map(([k, v]) => {
                    const serializedVal = serialize(k, v, depth + 1);
                    if (serializedVal !== undefined) {
                        return space
                            ? `${indent}"${k}": ${serializedVal}`
                            : `"${k}":${serializedVal}`;
                    }
                    return undefined;
                })
                .filter(Boolean);

            const joined = space ? `\n${entries.join(`,\n`)}\n${currentIndent}` : entries.join(',');
            return `{${joined}}`;
        }
    }

    return undefined;
}

    return serialize('', value, 0);
}