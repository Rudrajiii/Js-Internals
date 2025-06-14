
/**
* Array.prototype.find() - Returns the value of the first element in the array that satisfies the provided testing function.
* The "find()" method executes the callback once for each index of the array until it finds one where callback returns a truthy value.
* If such an element is found, "find" immediately returns the element value. Otherwise, it returns undefined.
*
* @syntax:
* @array.find(callback(currentValue, index, array), thisArg)
*
* @callback: A function to execute on each value in the array, taking three arguments:
* - @currentValue: The current element being processed in the array.
* - @index (Optional): The index of the current element.
* - @array (Optional): The array "find" was called upon.
*
* @thisArg (Optional): Object to use as "this" when executing the callback.
**/
Array.prototype.__find = function(callback, context) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }

    const boundContext = (typeof context === 'string' && !isNaN(Number(context))) ? Number(context) : context;

    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            const result = callback.__call(boundContext, this[i], i, this);
            if (result) {
                return this[i];
            }
        }
    }

    return undefined; 
}