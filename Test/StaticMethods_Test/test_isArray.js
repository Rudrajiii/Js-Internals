const { __isArray } = require('../../package/src/Polyfills/Array_Object/Static_Methods/_isArray');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Run tests for the custom isArray method
const tests = [
    {
        description: 'Check for Array',
        value: [],
        expected: true,
        testNumber: 0
    },
    {
        description: 'Check for Object',
        value: {},
        expected: false,
        testNumber: 1
    },
    {
        description: 'Check for String',
        value: 'string',
        expected: false,
        testNumber: 2
    },
    {
        description: 'Check for Number',
        value: 123,
        expected: false,
        testNumber: 3
    },
    {
        description: 'Check for Null',
        value: null,
        expected: false,
        testNumber: 4
    },
    {
        description: 'Check for Undefined',
        value: undefined,
        expected: false,
        testNumber: 5
    },
    {
        description: 'Check for Function',
        value: function() {},
        expected: false,
        testNumber: 6
    },
    {
        description: 'Check for Array with Elements',
        value: [1, 2, 3],
        expected: true,
        testNumber: 7
    },
    {
        description: 'Check for Nested Array',
        value: [[1, 2], [3, 4]],
        expected: true,
        testNumber: 8
    },
    {
        description: 'Check for Array with Mixed Types',
        value: [1, 'string', true, null],
        expected: true,
        testNumber: 9
    },
    {
        description: 'Check for Array-like Object (Not Actual Array)',
        value: { 0: 'a', 1: 'b', length: 2 },
        expected: false,
        testNumber: 10
    }
];

// Run the tests
tests.forEach(test => {
    const result = __isArray(test.value);
    if (deepEqual(result, test.expected)) {
        console.log(`Passed Test ${test.testNumber} ✅: ${test.description}`);
    } else {
        console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);
        console.log(`Actual: ${JSON.stringify(result)}`);
    }
});
