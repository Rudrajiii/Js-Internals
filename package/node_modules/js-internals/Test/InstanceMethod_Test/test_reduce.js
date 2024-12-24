const { reduce_internals } = require('../../package/index');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

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
        description: 'Basic Sum Operation',
        input: [1, 2, 3, 4, 5],
        callback: (acc, curr) => acc + curr,
        initialValue: 0,
        expected: 15,
        testNumber: 0
    },
    {
        description: 'Multiplication of Array Elements',
        input: [1, 2, 3, 4],
        callback: (acc, curr) => acc * curr,
        initialValue: 1,
        expected: 24,
        testNumber: 1
    },
    {
        description: 'Reduce without initialValue',
        input: [10, 20, 30, 40],
        callback: (acc, curr) => acc + curr,
        expected: 100, // no initialValue, so starts from the first element
        testNumber: 2
    },
    {
        description: 'Reduce on Array of Objects',
        input: [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 35 }
        ],
        callback: (acc, obj) => acc + obj.age,
        initialValue: 0,
        expected: 90, // sum of all ages
        testNumber: 3
    },
    {
        description: 'Reduce Empty Array with Initial Value',
        input: [],
        callback: (acc, curr) => acc + curr,
        initialValue: 100,
        expected: 100,
        testNumber: 4
    },
    {
        description: 'Reduce Empty Array without Initial Value (should throw error)',
        input: [],
        callback: (acc, curr) => acc + curr,
        expected: 'TypeError',
        testNumber: 5
    },
    {
        description: 'Reduce with Falsy Initial Value (0)',
        input: [5, 10, 15],
        callback: (acc, curr) => acc + curr,
        initialValue: 0,
        expected: 30,
        testNumber: 6
    },
    {
        description: 'Reduce with Context for Callback',
        input: [1, 2, 3, 4],
        callback: function (acc, curr) { return acc + curr + this.increment; },
        initialValue: 0,
        context: { increment: 1 },
        expected: 14, // 1+1 + 2+1 + 3+1 + 4+1 = 14
        testNumber: 7
    },
    {
        description: 'Reduce Large Array',
        input: Array.from({ length: 1000 }, (_, i) => i + 1),
        callback: (acc, curr) => acc + curr,
        initialValue: 0,
        expected: 500500, // sum of numbers from 1 to 1000
        testNumber: 8
    }
];

// Run the tests
tests.forEach(test => {
    try {
        const result = test.input.__reduce(test.callback, test.initialValue, test.context);
        if (result === test.expected || (test.expected === 'TypeError' && result instanceof TypeError)) {
            console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
        } else {
            console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
            console.log(`Expected: ${JSON.stringify(test.expected)}`);
            console.log(`Actual: ${JSON.stringify(result)}`);
        }
    } catch (e) {
        if (test.expected === 'TypeError' && e instanceof TypeError) {
            console.log(`Passed Test${test.testNumber} ✅: ${test.description} (Error Thrown as Expected)`);
        } else {
            console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
            console.log(`Expected: ${test.expected}`);
            console.log(`Error Thrown: ${e}`);
        }
    }
});
