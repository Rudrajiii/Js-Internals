const { __from } = require('../../package/src/internal-custom-functions/Array_Object/Static_Methods/_from')

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function arraysEqual(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false; 
    if (a.length !== b.length) return false; 
    for (let i = 0; i < a.length; i++) {
        if (typeof a[i] === 'object' && typeof b[i] === 'object') {
            if (!deepEqual(a[i], b[i])) return false;
        } else if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
// Test Case number 7 , 8 , 9 are not passing !!
const fromTests = [
    {
        description: 'Basic Array-like Object',
        arrayLike: { length: 3, 0: 'a', 1: 'b', 2: 'c' },
        mapFn: undefined,
        expected: ['a', 'b', 'c'],
        testNumber: 0
    },
    {
        description: 'Basic String',
        arrayLike: 'hello',
        mapFn: undefined,
        expected: ['h', 'e', 'l', 'l', 'o'],
        testNumber: 1
    },
    {
        description: 'With Mapping Function',
        arrayLike: { length: 3, 0: 1, 1: 2, 2: 3 },
        mapFn: function(x) { return x * 2; },
        expected: [2, 4, 6],
        testNumber: 2
    },
    {
        description: 'Empty Array-like Object',
        arrayLike: { length: 0 },
        mapFn: undefined,
        expected: [],
        testNumber: 3
    },
    {
        description: 'String as Array-like Object',
        arrayLike: '12345',
        mapFn: function(x) { return Number(x); },
        expected: [1, 2, 3, 4, 5],
        testNumber: 4
    },
    {
        description: 'Null Input',
        arrayLike: null,
        mapFn: undefined,
        expectedError: true,
        testNumber: 5
    },
    {
        description: 'Undefined Input',
        arrayLike: undefined,
        mapFn: undefined,
        expectedError: true,
        testNumber: 6
    },
    {
        description: 'With Mapping Function and thisArg',
        arrayLike: { length: 2, 0: 1, 1: 2 },
        mapFn: function(x) { return x + this.increment; },
        context: { increment: 10 },
        expected: [11, 12],
        testNumber: 7
    }
];

// Run the tests
fromTests.forEach(test => {
    let result;
    let errorOccurred = false;

    try {
        result = __from(test.arrayLike, test.mapFn, test.context);
    } catch (error) {
        if (test.expectedError) {
            errorOccurred = true;
            console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
        } else {
            console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
            console.error('Unexpected Error:', error);
        }
    }

    if (!errorOccurred && arraysEqual(result, test.expected)) {
        console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
    } else if (!errorOccurred) {
        console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);
        console.log(`Actual: ${JSON.stringify(result)}`);
    }
});
