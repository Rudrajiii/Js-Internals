const { $parseFloat } = require('../../package/src/Polyfills/Global/_parseFloat');

// Helper to safely compare floating point numbers
function isEqual(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        if (Number.isNaN(a) && Number.isNaN(b)) return true;
        if (!isFinite(a) || !isFinite(b)) return a === b;

        const precision = 10; // Adjust this if needed
        const factor = Math.pow(10, precision);
        const roundedA = Math.round(a * factor) / factor;
        const roundedB = Math.round(b * factor) / factor;

        return Math.abs(roundedA - roundedB) < Number.EPSILON;
    }
    return Object.is(a, b);
}

function runTestCases() {
    const testCases = [
        // Basic decimal numbers
        { input: ["3.14"], expected: 3.14 },
        { input: ["   -123.45   "], expected: -123.45 },
        { input: ["+123.45"], expected: 123.45 },

        // Numbers with leading/trailing characters
        { input: ["123abc"], expected: 123 },
        { input: ["abc123"], expected: NaN },
        { input: ["12.34.56"], expected: 12.34 },
        { input: ["12.34e5xyz"], expected: 12.34e5 },
        
        // Scientific notation (positive & negative exponents)
        { input: ["1.23e5"], expected: 123000 },
        { input: ["1.23E5"], expected: 123000 },
        { input: ["1.23e-2"], expected: 0.0123 },
        { input: ["-1.23e3"], expected: -1230 },
        { input: ["-1.23e-3"], expected: -0.00123 },
        { input: ["123e"], expected: 123 }, // Stops at invalid 'e' without digits
        { input: ["123e+5"], expected: 12300000 },
        { input: ["123e-5"], expected: 0.00123 },
        
        // Negative and positive signs
        { input: ["-123.45"], expected: -123.45 },
        { input: ["+123.45"], expected: 123.45 },
        { input: ["-Infinity"], expected: NaN },
        { input: ["+Infinity"], expected: NaN },
        
        // Invalid or edge cases
        { input: [""], expected: NaN },
        { input: ["NaN"], expected: NaN },
        { input: ["Infinity"], expected: NaN },
        { input: ["NotANumber"], expected: NaN },
        { input: ["."], expected: NaN },
        { input: [".123"], expected: 0.123 },
        { input: ["-."], expected: NaN },
        { input: ["+-123"], expected: NaN },
        { input: ["123-45"], expected: 123 },
        
        // Large/small floats
        { input: ["9007199254740992.123"], expected: 9007199254740992 },
        { input: ["-9007199254740992.123"], expected: -9007199254740992 },
        { input: ["1.0e-324"], expected: 1.0e-324 },
        
        // Mixed types
        { input: [42], expected: 42 },
        { input: [[42.5]], expected: 42.5 },
        { input: [[], 42.5], expected: NaN },
        { input: [null], expected: NaN },
        { input: [undefined], expected: NaN },
    ];

    testCases.forEach(({ input, expected }, index) => {
        const result = $parseFloat(...(Array.isArray(input) ? input : [input]));
        const passed = isEqual(result, expected);
        console.log(
            `Test ${index + 1} ${passed ? "✅ Passed" : "❌ Failed"}: $parseFloat(${JSON.stringify(input)}) =>`,
            `Expected: ${expected}, Got: ${result}`
        );
    });
}

console.log("Running tests for $parseFloat()...");
runTestCases();