const { $min } = require('../../package/src/Polyfills/Math/_min');
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
const tests = [
    { input: [5, 7, 2, 9], expected: 2, description: "Positive integers" },
    { input: [-5, -2, 0, 3], expected: -5, description: "Including negatives" },
    { input: [42], expected: 42, description: "Single value" },
    { input: [], expected: Infinity, description: "No arguments" },
    { input: [0, -0], expected: 0, description: "Zero and negative zero" },
    { input: [Number.MAX_VALUE, Number.MIN_VALUE], expected: Number.MIN_VALUE, description: "Max and min JS values" },

    // Error cases
    { input: [undefined], throws: true, description: "Undefined in arguments" },
    { input: [null], throws: true, description: "Null in arguments" },
    { input: [1, true], throws: true, description: "Boolean in arguments" },
    { input: [1, () => 5], throws: true, description: "Function in arguments" },
];

tests.forEach((t, index) => {
    try {
        const result = $min(...t.input);
        if (t.throws) {
            console.error(`Test ${index} failed: Expected error but got ${result}`);
        } else if (deepEqual(result, t.expected)) {
            console.log(`Test ${index} passed: ${t.description}`);
        } else {
            console.error(`Test ${index} failed: Expected ${t.expected} but got ${result}`);
        }
    } catch (error) {
        if (t.throws) {
            console.log(`Test ${index} passed: ${t.description}`);
        } else {
            console.error(`Test ${index} failed: Unexpected error - ${error.message}`);
        }
    }
}
);
