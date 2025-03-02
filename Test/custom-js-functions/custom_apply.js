
/**
* Function.prototype.apply() - Calls a function with a given 'this' value and an array of arguments.
* The "apply()" method allows you to invoke a function with a specific 'this' context, along with arguments passed as an array.
* @syntax :
* @function.apply(thisArg, [argsArray]);

* @thisArg : The value to use as 'this' when calling the function. If 'thisArg' is 'null' or 'undefined', it will default to the global object ('globalThis' in non-strict mode).
* @argsArray : An array or array-like object of arguments to pass to the function.

* @returns:
* The result of calling the function with the provided 'this' value and arguments.
**/
Function.prototype.__apply = function(context, argsArray) {
    if (typeof this !== "function") {
        throw new Error(this + " is not a function.");
    }

    if (argsArray !== undefined && !Array.isArray(argsArray)) {
            throw new TypeError("CreateListFromArrayLike called on non-object or non-array.");
    }

    if (context === undefined || context === null) {
        context = globalThis;
    }

    const boundContext = Object(context);
    boundContext.func = this;
    const result = boundContext.func(...(argsArray || []));
    delete boundContext.func;

    return result;
};