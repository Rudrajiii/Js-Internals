const { __some } = require('../../package/src/internal-custom-functions/Array_Object/Instance_Methods/_some');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
    {
        description: 'At least one element matches the condition (simple array)',
        value: [1, 2, 3, 4],
        callback: function(value) { return value > 2; },
        expected: true,
        testNumber: 0
    },
    {
        description: 'No elements match the condition (simple array)',
        value: [1, 2, 3, 4],
        callback: function(value) { return value > 10; },
        expected: false,
        testNumber: 1
    },
    {
        description: 'Empty array always returns false',
        value: [],
        callback: function(value) { return value > 0; },
        expected: false,
        testNumber: 2
    },
    {
        description: 'Match with string elements',
        value: ['apple', 'banana', 'cherry'],
        callback: function(value) { return value === 'banana'; },
        expected: true,
        testNumber: 3
    },
    {
        description: 'Check index and array are passed correctly',
        value: [10, 20, 30],
        callback: function(value, index, array) { return value + index === 21; },
        expected: true,
        testNumber: 4
    },
    {
        description: 'Test context binding (custom thisArg)',
        value: [1, 2, 3],
        callback: function(value) { return value + this.increment > 5; },
        context: { increment: 3 },
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
        value: [1, 2],
        callback: function(value) { return value + this > 3; },
        context: '2',
        expected: true,
        testNumber: 7
    },
    {
        description: 'Edge case with non-array object (Array-like)',
        value: { 0: 'a', 1: 'b', length: 2 },
        callback: function(value) { return value === 'a'; },
        expectedError: true,
        testNumber: 8
    }
];

tests.forEach(test => {
    try {
        const arrayCopy = [...test.value];

        if (test.expectedError) {
            // Expect an error to be thrown
            console.log(`Running Test ${test.testNumber}: ${test.description}`);
            __some.call(arrayCopy, test.callback, test.context);
            console.log(`Failed Test ${test.testNumber} ❌: Expected TypeError`);
        } else {
            // Run the custom `__some` method
            const result = test.context
                ? arrayCopy.__some(test.callback, test.context)
                : arrayCopy.__some(test.callback);

            if (deepEqual(result, test.expected)) {
                console.log(`Passed Test ${test.testNumber} ✅: ${test.description}`);
            } else {
                console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
                console.log(`Expected: ${JSON.stringify(test.expected)}`);
                console.log(`Actual: ${JSON.stringify(result)}`);
            }
        }
    } catch (error) {
        if (test.expectedError && error instanceof TypeError) {
            console.log(`Passed Test ${test.testNumber} ✅: ${test.description}`);
        } else {
            console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
            console.error(error);
        }
    }
});
