const { __call } = require('../../package/src/Polyfills/Array_Object/Static_Methods/_call');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Run tests for the custom __call method
const tests = [
    {
        description: 'Basic Function Call with Context',
        func: function(greeting, punctuation) { return `${greeting}, ${this.name}${punctuation}`; },
        context: { name: 'Alice' },
        args: ['Hello', '!'],
        expected: 'Hello, Alice!',
        testNumber: 0
    },
    {
        description: 'Function with No Context',
        func: function(num1, num2) { return num1 + num2; },
        context: undefined,
        args: [5, 10],
        expected: 15,
        testNumber: 1
    },
    {
        description: 'Function with Null Context',
        func: function() { return this === globalThis; },
        context: null,
        args: [],
        expected: true,
        testNumber: 2
    },
    {
        description: 'Function with Custom Context Object',
        func: function() { return this.customProperty; },
        context: { customProperty: 'Custom Value' },
        args: [],
        expected: 'Custom Value',
        testNumber: 3
    },
    {
        description: 'Function without Arguments',
        func: function() { return 'No Args'; },
        context: {},
        args: [],
        expected: 'No Args',
        testNumber: 4
    },
    {
        description: 'Function with Context and Multiple Arguments',
        func: function(a, b, c) { return `${this.prefix}: ${a}, ${b}, ${c}`; },
        context: { prefix: 'Values' },
        args: [1, 2, 3],
        expected: 'Values: 1, 2, 3',
        testNumber: 5
    },
    {
        description: 'Function Using This Keyword',
        func: function() { return this.value * 2; },
        context: { value: 50 },
        args: [],
        expected: 100,
        testNumber: 6
    },
    {
        description: 'Throw Error When Calling a Non-Function',
        func: 'notAFunction',  // Passing a non-function
        context: {},
        args: [],
        expectedError: true,
        testNumber: 7
    },
    {
        description: 'Function with Large Number of Arguments',
        func: function(...args) { return args.length; },
        context: {},
        args: Array.from({ length: 1000 }, (_, i) => i),
        expected: 1000,
        testNumber: 8
    },
    {
        description: 'Function with Undefined Context (Global)',
        func: function() { return this === globalThis; },
        context: undefined,
        args: [],
        expected: true,
        testNumber: 9
    }
];

// Run the tests
tests.forEach(test => {
    let result;
    let errorOccurred = false;
    try {
        result = test.func.__call(test.context, ...test.args);
    } catch (error) {
        if (test.expectedError) {
            errorOccurred = true;
            console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
        } else {
            console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
            console.error('Unexpected Error:', error);
        }
    }

    if (!errorOccurred && deepEqual(result, test.expected)) {
        console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
    } else if (!errorOccurred) {
        console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);
        console.log(`Actual: ${JSON.stringify(result)}`);
    }
});
