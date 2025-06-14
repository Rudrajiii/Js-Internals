const { __indexOf } = require('../../package/src/Polyfills/Array_Object/Instance_Methods/_indexOf');
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
  {
    description: 'Find index of an existing element in array',
    value: [1, 2, 3, 4],
    args: [3],
    expected: 2,
    testNumber: 0
  },
  {
    description: 'Element not found in array',
    value: [1, 2, 3],
    args: [5],
    expected: -1,
    testNumber: 1
  },
  {
    description: 'Start index provided and element found after it',
    value: [1, 2, 3, 4],
    args: [3, 2],
    expected: 2,
    testNumber: 2
  },
  {
    description: 'Start index provided and element not found after it',
    value: [1, 2, 3, 4],
    args: [2, 3],
    expected: -1,
    testNumber: 3
  },
  {
    description: 'Negative start index',
    value: [1, 2, 3, 4],
    args: [2, -3],
    expected: 1,
    testNumber: 4
  },
  {
    description: 'Negative start index out of bounds',
    value: [1, 2, 3, 4],
    args: [1, -100],
    expected: 0,
    testNumber: 5
  },
  {
    description: 'Element is undefined',
    value: [undefined, 2, 3],
    args: [undefined],
    expected: 0,
    testNumber: 6
  },
  {
    description: 'Array has duplicate elements, returns first index',
    value: [5, 6, 7, 6, 8],
    args: [6],
    expected: 1,
    testNumber: 7
  },
  {
    description: 'Array-like object using call()',
    value: { 0: 'a', 1: 'b', 2: 'c', length: 3 },
    args: ['b'],
    expected: 1,
    useCall: true,
    testNumber: 8
  },
  {
    description: 'Search for NaN (should fail like native indexOf)',
    value: [NaN, 1, 2],
    args: [NaN],
    expected: -1,
    testNumber: 9
  },
  {
    description: 'Empty array',
    value: [],
    args: [1],
    expected: -1,
    testNumber: 10
  },
  {
    description: 'fromIndex is a string number',
    value: [10, 20, 30],
    args: [20, "1"],
    expected: 1,
    testNumber: 11
  },
  {
    description: 'fromIndex is greater than array length',
    value: [1, 2, 3],
    args: [2, 10],
    expected: -1,
    testNumber: 12
  }
];

tests.forEach(test => {
  try {
    let result;
    if (test.useCall) {
      result = __indexOf.call(test.value, ...test.args);
    } else {
      result = test.value.__indexOf(...test.args);
    }

    if (deepEqual(result, test.expected)) {
      console.log(`✅ Passed Test ${test.testNumber}: ${test.description}`);
    } else {
      console.log(`❌ Failed Test ${test.testNumber}: ${test.description}`);
      console.log(`   Expected: ${test.expected}`);
      console.log(`   Received: ${result}`);
    }
  } catch (error) {
    console.log(`❌ Failed Test ${test.testNumber} with error: ${test.description}`);
    console.error(error);
  }
});
