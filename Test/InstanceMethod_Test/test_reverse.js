const { __reverse } = require("../../package/src/Polyfills/Array_Object/Instance_Methods/_reverse");

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
        description: 'Reverse a basic numeric array',
        input: [1, 2, 3, 4, 5],
        expected: [5, 4, 3, 2, 1],
        testNumber: 0
    },
    {
        description: 'Reverse an array with strings',
        input: ['a', 'b', 'c'],
        expected: ['c', 'b', 'a'],
        testNumber: 1
    },
    {
        description: 'Reverse a mixed-type array',
        input: [1, 'two', { three: 3 }, [4]],
        expected: [[4], { three: 3 }, 'two', 1],
        testNumber: 2
    },
    {
        description: 'Reverse an array with nested arrays',
        input: [[1, 2], [3, 4], [5, 6]],
        expected: [[5, 6], [3, 4], [1, 2]],
        testNumber: 3
    },
    {
        description: 'Reverse an empty array',
        input: [],
        expected: [],
        testNumber: 4
    },
    {
        description: 'Reverse a single-element array',
        input: [42],
        expected: [42],
        testNumber: 5
    },
    {
        description: 'Reverse should mutate the original array',
        input: [10, 20, 30],
        expected: [30, 20, 10],
        checkMutation: true,
        testNumber: 6
    },
    {
        description: 'Reverse large array of 1000 elements',
        input: Array.from({ length: 1000 }, (_, i) => i + 1),
        expected: Array.from({ length: 1000 }, (_, i) => 1000 - i),
        testNumber: 7
    },
    {
        description: 'Reverse array containing falsy values',
        input: [0, false, '', null, undefined],
        expected: [undefined, null, '', false, 0],
        testNumber: 8
    },
    {
        description: 'Reverse array with duplicate elements',
        input: [1, 2, 2, 3, 3],
        expected: [3, 3, 2, 2, 1],
        testNumber: 9
    },
];

// 🧪 Run tests
tests.forEach(test => {
    const arrCopy = [...test.input]; // for mutation check
    const result = test.input.__reverse();

    const passed = arraysEqual(result, test.expected);

    if (passed) {
        console.log(`✅ Passed Test${test.testNumber}: ${test.description}`);
    } else {
        console.log(`❌ Failed Test${test.testNumber}: ${test.description}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);
        console.log(`Actual:   ${JSON.stringify(result)}`);
    }

    if (test.checkMutation) {
        if (test.input === result && arraysEqual(test.input, test.expected)) {
            console.log(`   ✅ Mutation confirmed (same reference)`);
        } else {
            console.log(`   ❌ Mutation failed (returned new array)`);
        }
    }

    // Verify that original array was indeed reversed in place
    if (!arraysEqual(test.input, test.expected)) {
        console.log(`   ⚠ Original array mismatch: expected in-place change`);
    }
});
