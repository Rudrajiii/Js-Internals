const { __bind } = require('../../package/src/Polyfills/Function/_bind');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Run tests for the custom __bind method
const tests = [
    {
        description: 'Basic Function Bind with Context',
        func: function(greeting, punctuation) { return `${greeting}, ${this.name}${punctuation}`; },
        context: { name: 'Alice' },
        bindArgs: ['Hello'],
        callArgs: ['!'],
        expected: 'Hello, Alice!',
        testNumber: 0
    },
    {
        description: 'Function with No Context',
        func: function(num1, num2) { return num1 + num2; },
        context: undefined,
        bindArgs: [5],
        callArgs: [10],
        expected: 15,
        testNumber: 1
    },
    {
        description: 'Function with Null Context',
        func: function() { return this === globalThis; },
        context: null,
        bindArgs: [],
        callArgs: [],
        expected: true,
        testNumber: 2
    },
    {
        description: 'Function with Custom Context Object',
        func: function() { return this.customProperty; },
        context: { customProperty: 'Custom Value' },
        bindArgs: [],
        callArgs: [],
        expected: 'Custom Value',
        testNumber: 3
    },
    {
        description: 'Function without Arguments',
        func: function() { return 'No Args'; },
        context: {},
        bindArgs: [],
        callArgs: [],
        expected: 'No Args',
        testNumber: 4
    },
    {
        description: 'Function with Context and Multiple Arguments',
        func: function(a, b, c, d) { return `${this.prefix}: ${a}, ${b}, ${c}, ${d}`; },
        context: { prefix: 'Values' },
        bindArgs: [1, 2],
        callArgs: [3, 4],
        expected: 'Values: 1, 2, 3, 4',
        testNumber: 5
    },
    {
        description: 'Function Using This Keyword',
        func: function(multiplier) { return this.value * multiplier; },
        context: { value: 50 },
        bindArgs: [2],
        callArgs: [],
        expected: 100,
        testNumber: 6
    },
    {
        description: 'Throw Error When Binding a Non-Function',
        func: 'notAFunction',  // Passing a non-function
        context: {},
        bindArgs: [],
        callArgs: [],
        expectedError: true,
        testNumber: 7
    },
    {
        description: 'Verify Bound Function Doesn\'t Affect Original Function',
        func: function() { return this.value; },
        context: { value: 'bound value' },
        bindArgs: [],
        callArgs: [],
        verifyOriginal: true,
        expected: 'bound value',
        testNumber: 8
    },
    {
        description: 'Bind with Large Number of Arguments',
        func: function(...args) { return args.reduce((sum, val) => sum + val, 0); },
        context: {},
        bindArgs: Array.from({ length: 500 }, (_, i) => i),
        callArgs: Array.from({ length: 500 }, (_, i) => i + 500),
        expected: 499500,  // Sum of 0-999
        testNumber: 9
    },
    {
        description: 'Nested Bind Calls',
        func: function(a, b, c) { return `${this.prefix}: ${a}, ${b}, ${c}`; },
        context: { prefix: 'Values' },
        bindArgs: [1],
        callArgs: [2, 3],
        expected: 'Values: 1, 2, 3',
        nestedBind: true,
        testNumber: 10
    },
    {
        description: 'Binding to a Primitive Value',
        func: function() { return typeof this; },
        context: 42,
        bindArgs: [],
        callArgs: [],
        expected: 'object',  // Should be boxed to Number object
        testNumber: 11
    }
];

// Run the tests
tests.forEach(test => {
    let result;
    let errorOccurred = false;
    try {
        if (test.expectedError) {
            try {
                const boundFunc = test.func.__bind(test.context, ...test.bindArgs);
                result = boundFunc(...test.callArgs);
                console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
                console.log('Expected an error but none was thrown');
            } catch (error) {
                errorOccurred = true;
                console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
            }
        } else if (test.verifyOriginal) {
            // Test that original function is not modified
            const originalContext = { value: 'original value' };
            const boundFunc = test.func.__bind(test.context, ...test.bindArgs);
            
            // Call the bound function
            const boundResult = boundFunc(...test.callArgs);
            
            // Call the original function with different context
            const originalResult = test.func.call(originalContext);
            
            if (boundResult === test.expected && originalResult === 'original value') {
                console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
            } else {
                console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
                console.log(`Expected bound: ${test.expected}, original: 'original value'`);
                console.log(`Actual bound: ${boundResult}, original: ${originalResult}`);
            }
        } else if (test.nestedBind) {
            // Test nested bind calls
            const firstBind = test.func.__bind(test.context, ...test.bindArgs);
            const secondBind = firstBind.__bind({ prefix: 'Nested' });
            result = secondBind(...test.callArgs);
            
            // For nested binds, the first bind's context should be used (not overridden)
            if (result === test.expected) {
                console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
            } else {
                console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
                console.log(`Expected: ${JSON.stringify(test.expected)}`);
                console.log(`Actual: ${JSON.stringify(result)}`);
            }
        } else {
            // Standard test
            const boundFunc = test.func.__bind(test.context, ...test.bindArgs);
            result = boundFunc(...test.callArgs);
            
            if (deepEqual(result, test.expected)) {
                console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
            } else {
                console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
                console.log(`Expected: ${JSON.stringify(test.expected)}`);
                console.log(`Actual: ${JSON.stringify(result)}`);
            }
        }
    } catch (error) {
        console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
        console.error('Unexpected Error:', error);
    }
});