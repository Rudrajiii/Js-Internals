// const { map_internals } = require('../package/index'); 
const { __map } = require('../../package/src/internal-custom-functions/Array_Object/Instance_Methods/_map')
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Modified arraysEqual function to use deep comparison for objects
function arraysEqual(a, b) {
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


const tests = [
    {
        description: 'Basic Map Operation',
        input: [1, 2, 3, 4, 5],
        callback: num => num * num,
        expected: [1, 4, 9, 16, 25],
        testNumber: 0
    },
    {
        description: 'String Transformation',
        input: ['hello', 'world', 'javascript'],
        callback: word => word.toUpperCase(),
        expected: ['HELLO', 'WORLD', 'JAVASCRIPT'],
        testNumber: 1
    },
    {
        description: 'Object Transformation',
        input: [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 35 }
        ],
        callback: obj => obj.name,
        expected: ['Alice', 'Bob', 'Charlie'],
        testNumber: 2
    },
    {
        description: 'Index Transformation',
        input: [10, 20, 30],
        callback: (num, index) => `Index ${index}: ${num}`,
        expected: ['Index 0: 10', 'Index 1: 20', 'Index 2: 30'],
        testNumber: 3
    },
    {
        description: 'Empty Array',
        input: [],
        callback: num => num * 2,
        expected: [],
        testNumber: 4
    },
    {
        description: 'Array with undefined and null',
        input: [1, undefined, null, 4],
        callback: value => (value === undefined ? 'undefined' : (value === null ? 'null' : value * 2)),
        expected: [2, 'undefined', 'null', 8],
        testNumber: 5
    },
    {
        description: 'Function with this Context',
        input: [1, 2, 3],
        callback: function(num) { return num * this; },
        context: 3,
        expected: [3, 6, 9],
        testNumber: 6
    },
    {
        description: 'Large Array',
        input: Array.from({ length: 1000 }, (_, i) => i),
        callback: num => num * 2,
        expected: Array.from({ length: 1000 }, (_, i) => i * 2),
        testNumber: 7
    },
    {
        description: 'Nested Array',
        input: [1,2,3],
        callback: num => [num, num * 2],
        expected: [[1, 2], [2, 4], [3, 6]],
        testNumber: 8
    }
];

// Run the tests
tests.forEach(test => {
    const result = test.input.__map(test.callback, test.context);
    if (arraysEqual(result, test.expected)) {
        console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
    } else {
        console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);
        console.log(`Actual: ${JSON.stringify(result)}`);
    }
});
