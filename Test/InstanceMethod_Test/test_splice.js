const { __splice } = require('../../package/src/Polyfills/Array_Object/Instance_Methods/_splice');

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function cloneArray(arr) {
  return Array.from(arr);
}

const tests = [
  {
    description: 'Remove elements only',
    value: [1, 2, 3, 4],
    args: [1, 2],
    expectedArray: [1, 4],
    expectedReturn: [2, 3],
    testNumber: 0
  },
  {
    description: 'Insert elements only',
    value: [1, 2, 3],
    args: [1, 0, 'a', 'b'],
    expectedArray: [1, 'a', 'b', 2, 3],
    expectedReturn: [],
    testNumber: 1
  },
  {
    description: 'Replace elements',
    value: [1, 2, 3],
    args: [1, 1, 99],
    expectedArray: [1, 99, 3],
    expectedReturn: [2],
    testNumber: 2
  },
  {
    description: 'Negative start index',
    value: [1, 2, 3, 4],
    args: [-2, 1],
    expectedArray: [1, 2, 4],
    expectedReturn: [3],
    testNumber: 3
  },
  {
    description: 'Delete count omitted',
    value: [1, 2, 3, 4],
    args: [2],
    expectedArray: [1, 2],
    expectedReturn: [3, 4],
    testNumber: 4
  },
  {
    description: 'Delete count larger than available',
    value: [1, 2],
    args: [1, 99],
    expectedArray: [1],
    expectedReturn: [2],
    testNumber: 5
  },
  {
    description: 'Start beyond length',
    value: [1, 2],
    args: [99, 1, 'x'],
    expectedArray: [1, 2, 'x'],
    expectedReturn: [],
    testNumber: 6
  },
  {
    description: 'Delete count zero',
    value: [1, 2, 3],
    args: [1, 0],
    expectedArray: [1, 2, 3],
    expectedReturn: [],
    testNumber: 7
  },
  {
    description: 'Sparse array preservation',
    value: (() => {
      const a = [1, , 3];
      return a;
    })(),
    args: [1, 1],
    expectedArray: [1, 3],
    expectedReturn: [undefined],
    testNumber: 8
  },
  {
    description: 'Non-number start coercion',
    value: [1, 2, 3],
    args: ['1', 1],
    expectedArray: [1, 3],
    expectedReturn: [2],
    testNumber: 9
  },
  {
    description: 'NaN deleteCount treated as 0',
    value: [1, 2, 3],
    args: [1, NaN, 'x'],
    expectedArray: [1, 'x', 2, 3],
    expectedReturn: [],
    testNumber: 10
  },
  {
    description: 'Boolean start coercion',
    value: [10, 20, 30],
    args: [true, 1],
    expectedArray: [10, 30],
    expectedReturn: [20],
    testNumber: 11
  },
  {
    description: 'Works with call() on array-like object',
    value: { 0: 'a', 1: 'b', 2: 'c', length: 3 },
    args: [1, 1],
    expectedArray: { 0: 'a', 1: 'c', length: 2 },
    expectedReturn: ['b'],
    useCall: true,
    testNumber: 12
  },
  {
    description: 'Insert multiple items',
    value: [1, 2, 3],
    args: [1, 1, 'x', 'y', 'z'],
    expectedArray: [1, 'x', 'y', 'z', 3],
    expectedReturn: [2],
    testNumber: 13
  },
  {
    description: 'Delete entire array',
    value: [1, 2, 3],
    args: [0],
    expectedArray: [],
    expectedReturn: [1, 2, 3],
    testNumber: 14
  },
  {
    description: 'Splice on empty array',
    value: [],
    args: [0, 1, 'x'],
    expectedArray: ['x'],
    expectedReturn: [],
    testNumber: 15
  },
  {
    description: 'Infinity start index',
    value: [1, 2, 3],
    args: [Infinity, 1, 'x'],
    expectedArray: [1, 2, 3, 'x'],
    expectedReturn: [],
    testNumber: 16
  },
  {
    description: 'Negative Infinity start index',
    value: [1, 2, 3],
    args: [-Infinity, 1],
    expectedArray: [2, 3],
    expectedReturn: [1],
    testNumber: 17
  }
];

tests.forEach(test => {
  try {
    const original = test.useCall
      ? Object.assign({}, test.value)
      : cloneArray(test.value);

    let returned;

    if (test.useCall) {
      returned = __splice.call(original, ...test.args);
    } else {
      returned = original.__splice(...test.args);
    }

    const arrayPass = deepEqual(original, test.expectedArray);
    const returnPass = deepEqual(returned, test.expectedReturn);

    if (arrayPass && returnPass) {
      console.log(`✅ Passed Test ${test.testNumber}: ${test.description}`);
    } else {
      console.log(`❌ Failed Test ${test.testNumber}: ${test.description}`);
      console.log(`   Expected Array: ${JSON.stringify(test.expectedArray)}`);
      console.log(`   Received Array: ${JSON.stringify(original)}`);
      console.log(`   Expected Return: ${JSON.stringify(test.expectedReturn)}`);
      console.log(`   Received Return: ${JSON.stringify(returned)}`);
    }
  } catch (error) {
    console.log(`❌ Failed Test ${test.testNumber} with error: ${test.description}`);
    console.error(error);
  }
});