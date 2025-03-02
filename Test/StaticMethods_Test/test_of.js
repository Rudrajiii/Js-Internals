const { __of } = require('../../package/src/Polyfills/Array_Object/Static_Methods/_of');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Run tests for the custom Array.of method
const tests = [
    {
        description: 'Creating array with no arguments',
        value: [],
        expected: [],
        testNumber: 0
    },
    {
        description: 'Creating array with one number',
        value: [1],
        expected: [1],
        testNumber: 1
    },
    {
        description: 'Creating array with multiple numbers',
        value: [1, 2, 3],
        expected: [1, 2, 3],
        testNumber: 2
    },
    {
        description: 'Creating array with mixed types',
        value: [1, 'two', true, null],
        expected: [1, 'two', true, null],
        testNumber: 3
    },
    {
        description: 'Creating array with undefined values',
        value: [undefined, undefined],
        expected: [undefined, undefined],
        testNumber: 4
    },
    {
        description: 'Creating array with strings',
        value: ['a', 'b', 'c'],
        expected: ['a', 'b', 'c'],
        testNumber: 5
    },
    {
        description: 'Creating array with boolean values',
        value: [true, false, true],
        expected: [true, false, true],
        testNumber: 6
    },
    {
        description: 'Creating array from other arrays',
        value: [[1, 2], [3, 4]],
        expected: [[1, 2], [3, 4]],
        testNumber: 7
    },
    {
        description: 'Creating array with a function as argument',
        value: [function() {}],
        expected: [function() {}],
        testNumber: 8
    },
    {
        description: 'Creating array with object as argument',
        value: [{ key: 'value' }],
        expected: [{ key: 'value' }],
        testNumber: 9
    }
];

// Run the tests
tests.forEach(test => {
    const result = Array.__of(...test.value); // Use the custom Array.of
    if (deepEqual(result, test.expected)) {
        console.log(`Passed Test ${test.testNumber} ✅: ${test.description}`);
    } else {
        console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);
        console.log(`Actual: ${JSON.stringify(result)}`);
    }
});
