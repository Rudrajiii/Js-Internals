const { filter_internals } = require('../../package/index');

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
        description: 'Basic Filter Operation',
        input: [1, 2, 3, 4, 5],
        callback: num => num % 2 === 0,
        expected: [2, 4],
        testNumber: 0
    },
    {
        description: 'String Length Filter',
        input: ['hello', 'world', 'js', 'filter', 'example'],
        callback: word => word.length > 4,
        expected: ['hello', 'world', 'filter', 'example'],
        testNumber: 1
    },
    {
        description: 'Object Filter by Property',
        input: [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 35 }
        ],
        callback: obj => obj.age > 30,
        expected: [{ name: 'Charlie', age: 35 }],
        testNumber: 2
    },
    {
        description: 'Filter by Index',
        input: [10, 20, 30, 40],
        callback: (num, index) => index % 2 === 0,
        expected: [10, 30],
        testNumber: 3
    },
    {
        description: 'Empty Array',
        input: [],
        callback: num => num > 0,
        expected: [],
        testNumber: 4
    },
    {
        description: 'Array with undefined and null',
        input: [1, undefined, null, 4],
        callback: value => value !== undefined && value !== null,
        expected: [1, 4],
        testNumber: 5
    },
    {
        description: 'Function with this Context',
        input: [1, 2, 3, 4, 5],
        callback: function(num) { return num > this; },
        context: 2,
        expected: [3, 4, 5],
        testNumber: 6
    },
    {
        description: 'Large Array',
        input: Array.from({ length: 1000 }, (_, i) => i),
        callback: num => num % 100 === 0,
        expected: Array.from({ length: 10 }, (_, i) => i * 100),
        testNumber: 7 
    }
];

// Run the tests
tests.forEach(test => {
    const result = test.input.__filter(test.callback, test.context);
    if (arraysEqual(result, test.expected)) {
        console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
    } else {
        console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);
        console.log(`Actual: ${JSON.stringify(result)}`);
    }
});
