const { __slice } = require('../../package/src/Polyfills/Array_Object/Instance_Methods/_slice');

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const tests = [
  {
    description: 'Basic slice',
    value: [1, 2, 3, 4],
    args: [1, 3],
    expected: [2, 3],
    testNumber: 0
  },
  {
    description: 'Slice with start only',
    value: [1, 2, 3],
    args: [1],
    expected: [2, 3],
    testNumber: 1
  },
  {
    description: 'Slice full array',
    value: [1, 2, 3],
    args: [],
    expected: [1, 2, 3],
    testNumber: 2
  },
  {
    description: 'Negative start',
    value: [1, 2, 3, 4],
    args: [-2],
    expected: [3, 4],
    testNumber: 3
  },
  {
    description: 'Negative end',
    value: [1, 2, 3, 4],
    args: [1, -1],
    expected: [2, 3],
    testNumber: 4
  },
  {
    description: 'Start greater than length',
    value: [1, 2],
    args: [5],
    expected: [],
    testNumber: 5
  },
  {
    description: 'End less than start',
    value: [1, 2, 3],
    args: [2, 1],
    expected: [],
    testNumber: 6
  },
  {
    description: 'NaN start treated as 0',
    value: [1, 2, 3],
    args: [NaN, 2],
    expected: [1, 2],
    testNumber: 7
  },
  {
    description: 'Boolean coercion',
    value: [10, 20, 30],
    args: [true, 3],
    expected: [20, 30],
    testNumber: 8
  },
  {
    description: 'Slice empty array',
    value: [],
    args: [0, 1],
    expected: [],
    testNumber: 9
  },
  {
    description: 'Sparse array preservation',
    value: (() => {
      const a = [1, , 3];
      return a;
    })(),
    args: [0, 3],
    expected: [1, null, 3],
    testNumber: 10
  },
  {
    description: 'Works with call on array-like object',
    value: { 0: 'a', 1: 'b', 2: 'c', length: 3 },
    args: [1, 3],
    expected: ['b', 'c'],
    useCall: true,
    testNumber: 11
  },
  {
    description: 'Infinity end',
    value: [1, 2, 3],
    args: [1, Infinity],
    expected: [2, 3],
    testNumber: 12
  },
  {
    description: 'Negative Infinity start',
    value: [1, 2, 3],
    args: [-Infinity, 2],
    expected: [1, 2],
    testNumber: 13
  }
];
tests.forEach(test => {
  try {
    let result;

    if (test.useCall) {
      result = __slice.call(test.value, ...test.args);
    } else {
      result = test.value.__slice(...test.args);
    }

    if (deepEqual(result, test.expected)) {
      console.log(`✅ Passed Test ${test.testNumber}: ${test.description}`);
    } else {
      console.log(`❌ Failed Test ${test.testNumber}: ${test.description}`);
      console.log(`   Expected: ${JSON.stringify(test.expected)}`);
      console.log(`   Received: ${JSON.stringify(result)}`);
    }
  } catch (error) {
    console.log(`❌ Failed Test ${test.testNumber} with error: ${test.description}`);
    console.error(error);
  }
});

