const { $isNaN } = require('../../package/src/Polyfills/Global/_isNaN');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
    {
        description: 'Check if NaN returns true',
        value: NaN,
        expected: true,
        testNumber: 0
    },
    {
        description: 'Check if a number returns false',
        value: 42,
        expected: false,
        testNumber: 1
    },
    {
        description: 'Check if a string returns true',
        value: "hello",
        expected: true,
        testNumber: 2
    },
    {
        description: 'Check if an object returns true',
        value: {},
        expected: true,
        testNumber: 3
    },
    {
        description: 'Check if an array returns true',
        value: [1, 2, 3],
        expected: true,
        testNumber: 4
    },
    {
        description: 'Check if undefined returns true',
        value: undefined,
        expected: true,
        testNumber: 5
    },
    {
        description: 'Check if null returns false',
        value: null,
        expected: false,
        testNumber: 6
    },
    {
        description: 'Check if a function returns true',
        value: function() {},
        expected: true,
        testNumber: 7
    },
    {
        description: 'Check if an empty string returns false',
        value: "",
        expected: false,
        testNumber: 8
    },
    {
        description: 'Check if a boolean (true) returns false',
        value: true,
        expected: false,
        testNumber: 9
    },
    {
        description: 'Check if a boolean (false) returns false',
        value: false,
        expected: false,
        testNumber: 10
    },
    {
        description: 'Check if a stringified NaN returns true',
        value: "NaN",
        expected: true,
        testNumber: 11
    },
    {
        description: 'Check if an object containing NaN returns true',
        value: { value: NaN },
        expected: true,
        testNumber: 12
    },
    {
        description: 'Check if a number wrapped in an object returns true',
        value: new Number(NaN),
        expected: true,
        testNumber: 13
    },
    {
        description: 'Check if an Infinity value returns false',
        value: Infinity,
        expected: false,
        testNumber: 14
    },
    {
        description: 'Check if a negative Infinity value returns false',
        value: -Infinity,
        expected: false,
        testNumber: 15
    }
];

tests.forEach(test => {
    try {
        const result = $isNaN(test.value);
        
        if (deepEqual(result, test.expected)) {
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
