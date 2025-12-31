const { __every } = require('../../package/src/Polyfills/Array_Object/Instance_Methods/_every');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
    {
        description: 'All elements match the condition (simple array)',
        value: [2, 4, 6, 8],
        callback: function(value) { return value % 2 === 0; },
        expected: true,
        testNumber: 0
    },
    {
        description: 'Not all elements match the condition (simple array)',
        value: [2, 4, 5, 8],
        callback: function(value) { return value % 2 === 0; },
        expected: false,
        testNumber: 1
    },
    {
        description: 'Empty array always returns true',
        value: [],
        callback: function(value) { return value > 0; },
        expected: true,
        testNumber: 2
    },
    {
        description: 'Match with string elements',
        value: ['apple', 'banana', 'cherry'],
        callback: function(value) { return typeof value === 'string'; },
        expected: true,
        testNumber: 3
    },
    {
        description: 'Check index and array are passed correctly',
        value: [10, 20, 30],
        callback: function(value, index, array) { return value > index; },
        expected: true,
        testNumber: 4
    },
    {
        description: 'Test context binding (custom thisArg)',
        value: [10, 20, 30],
        callback: function(value) { return value > this.threshold; },
        context: { threshold: 5 },
        expected: true,
        testNumber: 5
    },
    {
        description: 'Test with no callback provided (should throw TypeError)',
        value: [1, 2, 3],
        callback: null,
        expectedError: true,
        testNumber: 6
    },
    {
        description: 'Test context binding with non-object context',
        value: [10, 20],
        callback: function(value) { return value + this > 15; },
        context: 5,
        expected: false,
        testNumber: 7
    },
    {
        description: 'Edge case with non-array object (Array-like)',
        value: { 0: 1, 1: 2, length: 2 },
        callback: function(value) { return value > 0; },
        expectedError: true,
        testNumber: 8
    }
];

tests.forEach(test => {
    try {
        const arrayCopy = Array.isArray(test.value) ? [...test.value] : test.value;

        if (test.expectedError) {
            // Expect an error to be thrown
            console.log(`Running Test ${test.testNumber}: ${test.description}`);
            __every.call(arrayCopy, test.callback, test.context);
            console.log(`Failed Test ${test.testNumber} ❌: Expected TypeError`);
        } else {
            // Run the custom `__every` method
            const result = test.context
                ? arrayCopy.__every(test.callback, test.context)
                : arrayCopy.__every(test.callback);

            if (deepEqual(result, test.expected)) {
                console.log(`✅ Passed Test ${test.testNumber}: ${test.description}`);
            } else {
                console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
                console.log(`Expected: ${JSON.stringify(test.expected)}`);
                console.log(`Actual: ${JSON.stringify(result)}`);
            }
        }
    } catch (error) {
        if (test.expectedError && error instanceof TypeError) {
            console.log(`✅ Passed Test ${test.testNumber}: ${test.description}`);
        } else {
            console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
            console.error(error);
        }
    }
});
