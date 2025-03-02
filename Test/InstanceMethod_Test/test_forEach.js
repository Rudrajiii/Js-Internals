const { __forEach } = require('../../package/src/Polyfills/Array_Object/Instance_Methods/_forEach');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
    {
        description: 'Execute callback on each element in a simple array',
        value: [1, 2, 3],
        callback: function(value, index, array) { array[index] = value * 2; },
        expected: [2, 4, 6],
        testNumber: 0
    },
    {
        description: 'No operation on empty array',
        value: [],
        callback: function(value) { return value * 2; },
        expected: [],
        testNumber: 1
    },
    {
        description: 'Modify array with string elements',
        value: ['a', 'b', 'c'],
        callback: function(value, index, array) { array[index] = value.toUpperCase(); },
        expected: ['A', 'B', 'C'],
        testNumber: 2
    },
    {
        description: 'Verify if index and array are passed correctly',
        value: [10, 20, 30],
        callback: function(value, index, array) { array[index] = value + index; },
        expected: [10, 21, 32],
        testNumber: 3
    },
    {
        description: 'Test context binding (custom thisArg)',
        value: [1, 2, 3],
        callback: function(value, index, array) { array[index] = value + this.increment; },
        context: { increment: 5 },
        expected: [6, 7, 8],
        testNumber: 4
    },
    {
        description: 'Check if callback is called on sparse array elements only',
        value: [1, , 3],
        callback: function(value, index, array) { array[index] = value * 2; },
        expected: [2, , 6],
        testNumber: 5
    },
    {
        description: 'Test with no callback provided (should throw TypeError)',
        value: [1, 2, 3],
        callback: null,
        expectedError: true,
        testNumber: 6
    },
    {
        description: 'Test context binding with non-object context',
        value: [1, 2],
        callback: function(value, index, array) { array[index] = value + this; },
        context: '3',
        expected: [4, 5],
        testNumber: 7
    },
    {
        description: 'Edge case with non-array object (Array-like)',
        value: { 0: 'a', 1: 'b', length: 2 },
        callback: function(value, index, array) { array[index] = value.toUpperCase(); },
        expectedError: true,
        testNumber: 8
    }
];

tests.forEach(test => {
    try {
        const arrayCopy = [...test.value];
        
        if (test.expectedError) {
            // Expect an error to be thrown
            console.log(`Running Test ${test.testNumber}: ${test.description}`);
            __forEach.call(arrayCopy, test.callback, test.context);
            console.log(`Failed Test ${test.testNumber} ❌: Expected TypeError`);
        } else {
            // Normal operation tests
            if (test.context) {
                arrayCopy.__forEach(test.callback, test.context);
            } else {
                arrayCopy.__forEach(test.callback);
            }

            if (deepEqual(arrayCopy, test.expected)) {
                console.log(`Passed Test ${test.testNumber} ✅: ${test.description}`);
            } else {
                console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
                console.log(`Expected: ${JSON.stringify(test.expected)}`);
                console.log(`Actual: ${JSON.stringify(arrayCopy)}`);
            }
        }
    } catch (error) {
        if (test.expectedError && error instanceof TypeError) {
            console.log(`Passed Test ${test.testNumber} ✅: ${test.description}`);
        } else {
            console.log(`Failed Test ${test.testNumber} ❌: ${test.description}`);
            console.error(error);
        }
    }
});
