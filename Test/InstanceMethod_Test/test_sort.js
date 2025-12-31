const { __sort } = require('../../package/src/Polyfills/Array_Object/Instance_Methods/_sort');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const tests = [
  {
    description: 'Lexicographic default sort on strings',
    value: ["March", "Jan", "Feb", "Dec"],
    args: [],
    expected: ["Dec", "Feb", "Jan", "March"],
    testNumber: 0
  },
  {
    description: 'Lexicographic default sort on numbers (same as native JS)',
    value: [1, 30, 4, 21, 100000],
    args: [],
    expected: [1, 100000, 21, 30, 4],
    testNumber: 1
  },
  {
    description: 'Custom comparator: numeric ascending',
    value: [5, 2, 9, 1],
    args: [(a, b) => a - b],
    expected: [1, 2, 5, 9],
    testNumber: 2
  },
  {
    description: 'Custom comparator: numeric descending',
    value: [5, 2, 9, 1],
    args: [(a, b) => b - a],
    expected: [9, 5, 2, 1],
    testNumber: 3
  },
  {
    description: 'Sort with duplicate values',
    value: [4, 1, 1, 3],
    args: [(a, b) => a - b],
    expected: [1, 1, 3, 4],
    testNumber: 4
  },
  {
    description: 'Comparator returning zero keeps relative order (stable behavior)',
    value: ["aa", "ab", "ac"],
    args: [(a, b) => 0],
    expected: ["aa", "ab", "ac"],
    testNumber: 5
  },
  {
    description: 'Sorting empty array',
    value: [],
    args: [],
    expected: [],
    testNumber: 6
  },
  {
    description: 'Sorting single element array',
    value: [42],
    args: [],
    expected: [42],
    testNumber: 7
  },
  {
    description: 'Sort numbers when comparator returns string operations',
    value: [10, 2, 1],
    args: [(a, b) => String(a).localeCompare(String(b))],
    expected: [1, 10, 2],
    testNumber: 8
  }
];

tests.forEach(test => {
  try {
    let result;

    if (test.useCall) {
      result = __sort.call(test.value, ...test.args);
    } else {
      result = test.value.__sort(...test.args);
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
