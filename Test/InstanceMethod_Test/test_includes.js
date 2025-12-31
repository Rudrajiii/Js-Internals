const { __includes } = require('../../package/src/Polyfills/Array_Object/Instance_Methods/_includes');

function deepEqual(val1, val2) {
    return JSON.stringify(val1) === JSON.stringify(val2);
}

const tests = [
    {
        description: 'Check if array contains a number',
        value: [1, 2, 3],
        searchElement: 2,
        expected: true,
        testNumber: 0
    },
    {
        description: 'Check if array does not contain a number',
        value: [1, 2, 3],
        searchElement: 5,
        expected: false,
        testNumber: 1
    },
    {
        description: 'Check with strings in array',
        value: ['a', 'b', 'c'],
        searchElement: 'b',
        expected: true,
        testNumber: 2
    },
    {
        description: 'Check with strings (case sensitive)',
        value: ['a', 'b', 'c'],
        searchElement: 'B',
        expected: false,
        testNumber: 3
    },
    {
        description: 'Check with NaN (special case)',
        value: [NaN, 1, 2],
        searchElement: NaN,
        expected: true,
        testNumber: 4
    },
    {
        description: 'Check with fromIndex parameter (positive index)',
        value: [1, 2, 3, 4],
        searchElement: 2,
        fromIndex: 2,
        expected: false,
        testNumber: 5
    },
    {
        description: 'Check with fromIndex parameter (negative index)',
        value: [1, 2, 3, 4],
        searchElement: 2,
        fromIndex: -3,
        expected: true,
        testNumber: 6
    },
    {
        description: 'Empty array always returns false',
        value: [],
        searchElement: 1,
        expected: false,
        testNumber: 7
    },
    {
        description: 'Works with array-like objects',
        value: { 0: 'a', 1: 'b', length: 2 },
        searchElement: 'a',
        expected: true,
        testNumber: 8
    }
];

tests.forEach(test => {
    try {
        // console.log(`Running Test ${test.testNumber}: ${test.description}`);

        let result;

        // Normal usage for all tests now
        if (test.fromIndex !== undefined) {
            result = __includes.call(test.value, test.searchElement, test.fromIndex);
        } else {
            result = __includes.call(test.value, test.searchElement);
        }

        if (deepEqual(result, test.expected)) {
            console.log(`✅ Passed Test ${test.testNumber}: ${test.description}`);
        } else {
            console.log(`Failed Test ${test.testNumber} ❌`);
            console.log(`Expected: ${test.expected}, Got: ${result}`);
        }

    } catch (error) {
        console.log(`Failed Test ${test.testNumber} ❌`);
        console.error(error);
    }
});
