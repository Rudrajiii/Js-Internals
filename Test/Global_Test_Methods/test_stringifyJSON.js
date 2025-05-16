const {
  $stringifyJSON,
} = require("../../package/src/Polyfills/Global/_stringifyJSON");

function runStringifyTestCases() {
  const testCases = [
    // Basic types
    { input: [42], expected: "42" },
    { input: ["hello"], expected: '"hello"' },
    { input: [true], expected: "true" },
    { input: [false], expected: "false" },
    { input: [null], expected: "null" },

    // Arrays
    { input: [[1, 2, 3]], expected: "[1,2,3]" },
    { input: [["a", "b", "c"]], expected: '["a","b","c"]' },
    { input: [[1, null, true, "ok"]], expected: '[1,null,true,"ok"]' },

    // Objects
    {
      input: [{ name: "John", age: 30 }],
      expected: '{"name":"John","age":30}',
    },
    {
      input: [{ a: 1, b: [2, 3], c: { d: 4 } }],
      expected: '{"a":1,"b":[2,3],"c":{"d":4}}',
    },
    { input: [{}], expected: "{}" },

    // Nested
    { input: [[{ a: "x" }, { b: "y" }]], expected: '[{"a":"x"},{"b":"y"}]' },

    // Edge values
    { input: [undefined], expected: undefined },
    { input: [function () {}], expected: undefined },
    { input: [Symbol("x")], expected: undefined },
    { input: [{ key: undefined }], expected: "{}" },
    { input: [{ key: function () {} }], expected: "{}" },
    { input: [{ key: Symbol("x") }], expected: "{}" },
    { input: [[1, undefined, 3]], expected: "[1,null,3]" },

    // Special string escapes
    { input: ['He said "hello"'], expected: '"He said \\"hello\\""' },

    // Numbers
    {
      input: [Number.MAX_SAFE_INTEGER],
      expected: `${Number.MAX_SAFE_INTEGER}`,
    },
    {
      input: [Number.MIN_SAFE_INTEGER],
      expected: `${Number.MIN_SAFE_INTEGER}`,
    },
    { input: [Infinity], expected: "null" },
    { input: [NaN], expected: "null" },
    {
      input: [new Date("2020-01-01T00:00:00.000Z")],
      expected: `"2020-01-01T00:00:00.000Z"`,
    },
    {
      input: [
        {
          toJSON() {
            return "custom";
          },
        },
      ],
      expected: '"custom"',
    }
    ,
    // Reviver
    {
      input: [
        { a: 2, b: 4 },
        (key, value) => (typeof value === "number" ? value * 10 : value),
      ],
      expected: '{"a":20,"b":40}',
    },
  ];

  testCases.forEach(({ input, expected }, index) => {
    try {
      const result = $stringifyJSON(...input);
      if (expected === undefined) {
        if (result === undefined) {
          console.log(
            `Test ${index + 1} ✅ Passed: Expected and got undefined`
          );
        } else {
          console.log(
            `Test ${index + 1} ❌ Failed: Expected undefined but got ${result}`
          );
        }
      } else {
        const passed = result === expected;
        console.log(
          `Test ${index + 1} ${
            passed ? "✅ Passed" : "❌ Failed"
          }: $stringifyJSON(${JSON.stringify(input[0])}) =>`,
          `Expected: ${expected}, Got: ${result}`
        );
      }
    } catch (error) {
      console.log(`Test ${index + 1} ❌ Failed with error: ${error.message}`);
    }
  });
}

console.log("Running tests for $stringifyJSON()...");
runStringifyTestCases();
