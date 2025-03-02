const { $isFinite } = require('../../package/src/Polyfills/Global/_isFinite');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
    {
        description: 'Check if a finite number returns true',
        value: 42,
        expected: true,
        testNumber: 0
    },
    {
        description: 'Check if NaN returns false',
        value: NaN,
        expected: false,
        testNumber: 1
    },
    {
        description: 'Check if Infinity returns false',
        value: Infinity,
        expected: false,
        testNumber: 2
    },
    {
        description: 'Check if -Infinity returns false',
        value: -Infinity,
        expected: false,
        testNumber: 3
    },
    {
        description: 'Check if a numeric string returns true',
        value: "123",
        expected: true,
        testNumber: 4
    },
    {
        description: 'Check if a non-numeric string returns false',
        value: "hello",
        expected: false,
        testNumber: 5
    },
    {
        description: 'Check if null returns true',
        value: null,
        expected: true,
        testNumber: 6
    },
    {
        description: 'Check if an empty string returns true',
        value: "",
        expected: true,
        testNumber: 7
    },
    {
        description: 'Check if boolean true returns true',
        value: true,
        expected: true,
        testNumber: 8
    },
    {
        description: 'Check if boolean false returns true',
        value: false,
        expected: true,
        testNumber: 9
    },
    {
        description: 'Check if undefined returns false',
        value: undefined,
        expected: false,
        testNumber: 10
    },
    {
        description: 'Check if an empty object returns false',
        value: {},
        expected: false,
        testNumber: 11
    },
    {
        description: 'Check if an array returns false',
        value: [1, 2, 3],
        expected: false,
        testNumber: 12
    },
    {
        description: 'Check if a function returns false',
        value: function() {},
        expected: false,
        testNumber: 13
    },
    {
        description: 'Check if the string "Infinity" returns false',
        value: "Infinity",
        expected: false,
        testNumber: 14
    },
    {
        description: 'Check if the string "-Infinity" returns false',
        value: "-Infinity",
        expected: false,
        testNumber: 15
    },
    {
        description: 'Check if the string "NaN" returns false',
        value: "NaN",
        expected: false,
        testNumber: 16
    },
    {
        description: 'Check if a number wrapped in an object returns false',
        value: new Number(42),
        expected: true,
        testNumber: 17
    },
    {
        description: 'Check if a number wrapped in an object (NaN) returns false',
        value: new Number(NaN),
        expected: false,
        testNumber: 18
    },
    {
        description: 'Check if a number wrapped in an object (Infinity) returns false',
        value: new Number(Infinity),
        expected: false,
        testNumber: 19
    },
    {
        description: 'Check if a number wrapped in an object (-Infinity) returns false',
        value: new Number(-Infinity),
        expected: false,
        testNumber: 20
    }
];

tests.forEach(test => {
    try {
        const result = $isFinite(test.value);
        
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