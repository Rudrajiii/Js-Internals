const {__apply} = require('../../package/src/Polyfills/Function/_apply') 
const assert = require('assert');

// Helper function for deep equality comparison
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Test cases for custom __apply() method
const applyTests = [
    {
        description: 'Basic Function Call with Context',
        func: function(greeting, punctuation) { return `${greeting}, ${this.name}${punctuation}`; },
        context: { name: 'Alice' },
        argsArray: ['Hello', '!'],
        expected: 'Hello, Alice!',
        testNumber: 0
    },
    {
        description: 'Function with No Context',
        func: function(num1, num2) { return num1 + num2; },
        context: undefined,
        argsArray: [5, 10],
        expected: 15,
        testNumber: 1
    },
    {
        description: 'Function with Null Context',
        func: function() { return this === globalThis; },
        context: null,
        argsArray: [],
        expected: true,
        testNumber: 2
    },
    {
        description: 'Function with Custom Context Object',
        func: function() { return this.customProperty; },
        context: { customProperty: 'Custom Value' },
        argsArray: [],
        expected: 'Custom Value',
        testNumber: 3
    },
    {
        description: 'Function without Arguments',
        func: function() { return 'No Args'; },
        context: {},
        argsArray: [],
        expected: 'No Args',
        testNumber: 4
    },
    {
        description: 'Function with Context and Multiple Arguments',
        func: function(a, b, c) { return `${this.prefix}: ${a}, ${b}, ${c}`; },
        context: { prefix: 'Values' },
        argsArray: [1, 2, 3],
        expected: 'Values: 1, 2, 3',
        testNumber: 5
    },
    {
        description: 'Function Using This Keyword',
        func: function() { return this.value * 2; },
        context: { value: 50 },
        argsArray: [],
        expected: 100,
        testNumber: 6
    },
    {
        description: 'Throw Error When Calling a Non-Function',
        func: 'notAFunction',  // Passing a non-function
        context: {},
        argsArray: [],
        expectedError: true,
        testNumber: 7
    },
    {
        description: 'Function with Large Number of Arguments',
        func: function(...args) { return args.length; },
        context: {},
        argsArray: Array.from({ length: 1000 }, (_, i) => i),
        expected: 1000,
        testNumber: 8
    },
    {
        description: 'Function with Undefined Context (Global)',
        func: function() { return this === globalThis; },
        context: undefined,
        argsArray: [],
        expected: true,
        testNumber: 9
    },
    {
        description: 'Pass string instead of array',
        func: function(a, b) { return a + b; },
        context: {},
        argsArray: 'notAnArray',  // Invalid argument type
        expectedError: true,
        testNumber: 10
    },
    {
        description: 'Pass number instead of array',
        func: function(a, b) { return a + b; },
        context: {},
        argsArray: 123,  // Invalid argument type
        expectedError: true,
        testNumber: 11
    },
    {
        description: 'Pass object instead of array',
        func: function(a, b) { return a + b; },
        context: {},
        argsArray: { 0: 'value', 1: 'value' },  // Invalid argument type (non-array object)
        expectedError: true,
        testNumber: 12
    },
    {
        description: 'Pass array with values (valid)',
        func: function(a, b) { return a + b; },
        context: {},
        argsArray: [5, 10],  // Valid array
        expected: 15,
        testNumber: 13
    }
];

// Run the tests
applyTests.forEach(test => {
    let result;
    let errorOccurred = false;

    try {
        result = test.func.__apply(test.context, test.argsArray);
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
