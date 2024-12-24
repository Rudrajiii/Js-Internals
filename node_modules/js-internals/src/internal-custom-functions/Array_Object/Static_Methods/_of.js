const fs = require('fs');
const path = require('path');
require('./_from');
Function.prototype.__of = function(...args) {
    return Array.__from(args);
};

module.exports = {
    __of: Function.prototype.__of,

    of_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_of.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const explanations = `/**
 * Custom Array.of() - Creates a new Array instance with a variable number of arguments.
 * This method is useful for creating arrays from any number of arguments,
 * regardless of type.
 *
 * @param {...*} items - The items to include in the new Array.
 * @returns {Array} - A new Array instance containing the provided items.
 **/`;

        const code = `
require('./_from');
Function.prototype.__of = function(...args) {
    return Array.__from(args);
};
        `.trim();

        fs.writeFileSync(outputPath, explanations + code, 'utf8');
        return `File created at ${outputPath}`;
    }
};
