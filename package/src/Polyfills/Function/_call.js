const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

Function.prototype.__call = function(context, ...args) {
    if (typeof this !== "function") {
        throw new Error(this + " is not a function.");
    }

    if (context === undefined || context === null) {
        return this.apply(globalThis, args);
    }

    const boundContext = Object(context);

    boundContext.func = this;
    const result = boundContext.func(...args);
    delete boundContext.func;

    return result;
};


module.exports = {
    __call: Function.prototype.__call,

    call_internals: function() {
        const outputDir = path.join(process.cwd(), 'custom-js-functions');
        const outputPath = path.join(outputDir, 'custom_call.js');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));
        }

        // Check if the file already exists before overwriting
        if (!fs.existsSync(outputPath)) {

        const explanations = `
/**
* Function.prototype.call() - Calls a function with a given 'this' value and arguments provided individually.
* The "call()" method allows you to invoke a function with a specific 'this' context, along with arguments passed individually. It is useful when you want to change the context ('this') for a particular function invocation.
* @syntax :
* @function.call(thisArg, arg1, arg2, ..., argN);

* @thisArg : The value to use as 'this' when calling the function. If 'thisArg' is 'null' or 'undefined', it will default to the global object ('globalThis' in non-strict mode).
* @arg1 , arg2, ..., argN: Individual arguments to pass to the function.

* @returns:
* The result of calling the function with the provided 'this' value and arguments.
**/
`
        const code = 'Function.prototype.__call = ' + Function.prototype.__call.toString();
        fs.writeFileSync(outputPath, explanations + code, 'utf8');
        const fileName = path.basename(outputPath);
            console.log(
                chalk.green('✓ Created: ') + 
                chalk.white(fileName)
            );
        // return `File created at ${outputPath}`;
    }else{
        const fileName = path.basename(outputPath);
            console.log(
                chalk.yellow('⚠ Skipped: ') + 
                chalk.white(fileName) + 
                chalk.gray(` already exists.`)
            );
        // return `File already exists at ${outputPath}`;
    }
}
};