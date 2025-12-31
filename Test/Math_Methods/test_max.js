const { $max } = require('../../package/src/Polyfills/Math/_max');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
    {
        description: 'Basic positive numbers',
        value: [1, 2, 3],
        expected: 3,
        testNumber: 0
    },
    {
        description: 'Negative numbers',
        value: [-1, -5, -3],
        expected: -1,
        testNumber: 1
    },
    {
        description: 'Mixed positive and negative numbers',
        value: [-10, 0, 15, -20, 7],
        expected: 15,
        testNumber: 2
    },
    {
        description: 'All zeros',
        value: [0, 0, 0],
        expected: 0,
        testNumber: 3
    },
    {
        description: 'Single value',
        value: [42],
        expected: 42,
        testNumber: 4
    },
    {
        description: 'NaN present in arguments',
        value: [1, 2, NaN],
        expected: NaN,
        testNumber: 5
    },
    {
        description: 'Infinity in values',
        value: [10, 20, Infinity, 5],
        expected: Infinity,
        testNumber: 6
    },
    {
        description: 'Negative Infinity in values',
        value: [-Infinity, -100, -200],
        expected: -100,
        testNumber: 7
    },
    {
        description: 'String numbers',
        value: ["1", "5", "3"],
        expected: 5,
        testNumber: 8
    },
    {
        description: 'Mixed string and number types',
        value: ["7", 3, "9", 2],
        expected: 9,
        testNumber: 9
    },
    {
        description: 'Empty input (no arguments)',
        value: [],
        expected: -Infinity,
        testNumber: 10
    }
];

tests.forEach(test => {
    try {
        const result = $max(...test.value);
        
        if (Number.isNaN(test.expected)) {
            if (Number.isNaN(result)) {
                console.log(`Passed Test ${test.testNumber} ✅: ${test.description}`);
            } else {
                console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
                console.log(`Expected: NaN`);
                console.log(`Actual: ${JSON.stringify(result)}`);
            }
        } else if (deepEqual(result, test.expected)) {
            console.log(`Passed Test ${test.testNumber} ✅: ${test.description}`);
        } else {
            console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
            console.log(`Expected: ${JSON.stringify(test.expected)}`);
            console.log(`Actual: ${JSON.stringify(result)}`);
        }
    } catch (error) {
        console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
        console.error(error);
    }
});
