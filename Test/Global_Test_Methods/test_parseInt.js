const { $parseInt } = require('../../package/src/Polyfills/Global/_parseInt');

function runTestCases() {
    const testCases = [
        // Basic cases
        { input: ["42"], expected: 42 },
        { input: ["  42  "], expected: 42 },
        { input: ["-42"], expected: -42 },
        { input: ["+42"], expected: 42 },
        
        // Binary (base 2)
        { input: ["101", 2], expected: 5 },
        { input: ["-101", 2], expected: -5 },
        { input: ["0011", 2], expected: 3 },
        
        // Octal (base 8)
        { input: ["077", 8], expected: 63 }, 
        { input: ["-077", 8], expected: -63 },
        
        // Hexadecimal (base 16)
        { input: ["0xF", 16], expected: 15 },
        { input: ["0x1A", 16], expected: 26 },
        { input: ["ff", 16], expected: 255 },
        // { input: ["-0xA", 16], expected: -10 },
        
        // Decimal (base 10)
        { input: ["10"], expected: 10 },
        { input: ["-10"], expected: -10 },
        { input: ["10.9"], expected: 10 }, // Stops at decimal point
        { input: ["-10.9"], expected: -10 },
        
        // Mixed character cases
        { input: ["123abc"], expected: 123 }, // Stops at first invalid character
        { input: ["abc123"], expected: NaN }, // Invalid start should return NaN
        { input: ["12.34"], expected: 12 },   // Stops at decimal
        
        // Edge cases
        { input: ["Infinity"], expected: NaN }, 
        { input: ["NaN"], expected: NaN },
        { input: ["0xG", 16], expected: NaN }, // Stops at 'G' (invalid in hex)
        { input: ["  +42"], expected: 42 }, // Handles leading spaces and '+'
        { input: ["-42.9"], expected: -42 }, // Stops at decimal
        
        // Invalid radix cases
        { input: ["42", 37], expected: NaN }, // Invalid radix (above 36)
        { input: ["42", 1], expected: NaN },  // Invalid radix (below 2)
        { input: ["42", "abc"], expected: NaN }, // Non-numeric radix
        
        // Large numbers
        { input: ["9007199254740992"], expected: 9007199254740992 },
        { input: ["-9007199254740992"], expected: -9007199254740992 },

        // Numbers with leading zeros (shouldn't be interpreted as octal)
        { input: ["007"], expected: 7 },
        { input: ["-007"], expected: -7 },
    ];

    testCases.forEach(({ input, expected }, index) => {
        const result = $parseInt(...input);
        const passed = Object.is(result, expected);
        console.log(
            `Test ${index + 1} ${passed ? "✅ Passed" : "❌ Failed"}: $parseInt(${JSON.stringify(input)}) =>`,
            `Expected: ${expected}, Got: ${result}`
        );
    });
}

console.log("Running tests for $parseInt()...");
runTestCases();