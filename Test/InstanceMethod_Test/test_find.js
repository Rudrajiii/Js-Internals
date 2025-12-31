const { __find } = require('../../package/src/Polyfills/Array_Object/Instance_Methods/_find');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
    {
        description: 'Find first matching element in number array',
        value: [1, 2, 3, 4],
        callback: function (value) { return value > 2; },
        expected: 3,
        testNumber: 0
    },
    {
        description: 'No element satisfies the condition (should return undefined)',
        value: [1, 2, 3],
        callback: function (value) { return value > 10; },
        expected: undefined,
        testNumber: 1
    },
    {
        description: 'Find string starting with "b"',
        value: ['apple', 'banana', 'cherry'],
        callback: function (value) { return value.startsWith('b'); },
        expected: 'banana',
        testNumber: 2
    },
    {
        description: 'Find with index-based condition',
        value: [10, 20, 30],
        callback: function (value, index) { return index === 2; },
        expected: 30,
        testNumber: 3
    },
    {
        description: 'Test context binding (thisArg provided)',
        value: [1, 2, 3],
        callback: function (value) { return value === this.match; },
        context: { match: 2 },
        expected: 2,
        testNumber: 4
    },
    {
        description: 'Test context binding with non-object context',
        value: [1, 2, 3],
        callback: function (value) { return value === this; },
        context: '2',
        expected: undefined,
        testNumber: 5
    },
    {
        description: 'Find with sparse array (skip missing index)',
        value: [1, , 3, 4], // index 1 is empty
        callback: function (value) { return value > 2; },
        expected: 3,
        testNumber: 6
    },
    {
        description: 'Error case: callback not provided',
        value: [1, 2, 3],
        callback: null,
        expectedError: true,
        testNumber: 7
    },
    {
        description: 'Edge case: empty array should return undefined',
        value: [],
        callback: function (value) { return value > 0; },
        expected: undefined,
        testNumber: 8
    },
    {
        description: 'Edge case: non-array object (Array-like)',
        value: { 0: 'a', 1: 'b', length: 2 },
        callback: function (value) { return value === 'a'; },
        expected: 'a',
        expectedError: false,
        testNumber: 9
    }
];

tests.forEach(test => {
    try {
        const arrayCopy = Array.isArray(test.value) ? [...test.value] : test.value;

        // console.log(`Running Test ${test.testNumber}: ${test.description}`);

        const result = test.context !== undefined
            ? __find.call(arrayCopy, test.callback, test.context)
            : __find.call(arrayCopy, test.callback);

        if (test.expectedError) {
            console.log(`Failed Test ${test.testNumber} ❌: Expected TypeError`);
        } else if (deepEqual(result, test.expected)) {
            console.log(`✅ Passed Test ${test.testNumber}: ${test.description}`);
        } else {
            console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
            console.log(`Expected: ${JSON.stringify(test.expected)}`);
            console.log(`Actual:   ${JSON.stringify(result)}`);
        }
    } catch (err) {
        if (test.expectedError && err instanceof TypeError) {
            console.log(`✅ Passed Test ${test.testNumber}: ${test.description} (Error correctly thrown)`);
        } else {
            console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
            console.error(err);
        }
    }
});
