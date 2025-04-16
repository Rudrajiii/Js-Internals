const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

Function.prototype.__bind = function(context, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not a function.");
  }
  
  const originalFunction = this;
  
  if (context === undefined || context === null) {
    context = globalThis;
  }
  
  return function bound(...newArgs) {
    const allArgs = [...args, ...newArgs];
    
    const boundContext = Object(context);
    boundContext.func = originalFunction;
    
    const result = boundContext.func(...allArgs);
    
    delete boundContext.func;
    return result;
  };
};

module.exports = {
  __bind: Function.prototype.__bind,
  
  bind_internals: function() {
    const outputDir = path.join(process.cwd(), 'custom-js-functions');
    const outputPath = path.join(outputDir, 'custom_bind.js');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(chalk.blue('ℹ ') + chalk.blue(`Created directory: ${outputDir}`));
    }
    
    if (!fs.existsSync(outputPath)) {
      const explanations = `
/**
 * Function.prototype.bind() - Creates a new function with a specified 'this' value and initial arguments.
 * The "bind()" method creates a new function that, when called, has its 'this' value set to the provided value,
 * with a given sequence of arguments preceding any arguments provided when the new function is called.
 * @syntax :
 * @function.bind(thisArg, arg1, arg2, ...);
 * @thisArg : The value to use as 'this' when calling the bound function. If 'thisArg' is 'null' or 'undefined', 
 *            it will default to the global object ('globalThis' in non-strict mode).
 * @arg1, arg2, ... : Arguments to prepend to arguments provided when the bound function is called.
 * @returns:
 * A new function with the same body and scope as the original function, but with 'this' bound to the specified value,
 * and with initial arguments if provided.
 */`;

      const code = `
Function.prototype.__bind = function(context, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not a function.");
  }
  
  const originalFunction = this;
  
  if (context === undefined || context === null) {
    context = globalThis;
  }
  
  return function bound(...newArgs) {
    const allArgs = [...args, ...newArgs];
    
    const boundContext = Object(context);
    boundContext.func = originalFunction;
    
    const result = boundContext.func(...allArgs);
    
    delete boundContext.func;
    return result;
  };
};`.trim();

      fs.writeFileSync(outputPath, explanations + code, 'utf8');
      const fileName = path.basename(outputPath);
      console.log(
        chalk.green('✓ Created: ') + 
        chalk.white(fileName)
      );
    } else {
      const fileName = path.basename(outputPath);
      console.log(
        chalk.yellow('⚠ Skipped: ') + 
        chalk.white(fileName) + 
        chalk.gray(` already exists.`)
      );
    }
  }
};