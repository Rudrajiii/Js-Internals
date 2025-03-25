const { $parseJSON } = require('../../package/src/Polyfills/Global/_parseJSON');

function runTestCases() {
    const testCases = [
        // Basic valid JSON
        { input: ["{\"name\": \"John\", \"age\": 30}"], expected: { name: "John", age: 30 } },
        { input: ["[1, 2, 3]"], expected: [1, 2, 3] },
        { input: ["\"hello\""], expected: "hello" },
        { input: ["42"], expected: 42 },
        { input: ["true"], expected: true },
        { input: ["false"], expected: false },
        { input: ["null"], expected: null },
        { input: ["\"Infinity\""], expected: "Infinity" },

        // Edge cases (Error handling)
        { input: ["{\"person\": {\"name\": \"John\", \"age\": 30}, \"active\": true}"], expectError: true },
        { input: ["{name: 'John'}"], expectError: true },
        { input: ["[1, 2, 3,]"], expectError: true },
        { input: ["{'name': 'John'}"], expectError: true },
        { input: ["undefined"], expectError: true },
        { input: ["  null  "], expected: null },
        { input: ["{}"], expected: {} },
        { input: ["[]"], expected: [] },

        // Large number cases
        { input: ["9007199254740992"], expected: 9007199254740992 },
        { input: ["-9007199254740992"], expected: -9007199254740992 },

        // Special case with escaped JSON
        { input: ["\"{\\\"key\\\": \\\"value\\\"}\""], expected: "{\\\"key\\\": \\\"value\\\"}" },

        // Invalid cases (Error checks)
        { input: ["{  }"], expected: {} },
        { input: ["  42  "], expected: 42 },
    ];

    testCases.forEach(({ input, expected, expectError }, index) => {
        try {
            const result = $parseJSON(...input);
            if (expectError) {
                console.log(`Test ${index + 1} ❌ Failed: Expected an error but got result: ${JSON.stringify(result)}`);
            } else {
                const passed = JSON.stringify(result) === JSON.stringify(expected);
                console.log(
                    `Test ${index + 1} ${passed ? "✅ Passed" : "❌ Failed"}: $parseJSON(${JSON.stringify(input)}) =>`,
                    `Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`
                );
            }
        } catch (error) {
            if (expectError) {
                console.log(`Test ${index + 1} ✅ Passed: Expected error and got error: ${error.message}`);
            } else {
                console.log(`Test ${index + 1} ❌ Failed: Unexpected error: ${error.message}`);
            }
        }
    });
}

console.log("Running tests for $parseJSON()...");
runTestCases();
