
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
}