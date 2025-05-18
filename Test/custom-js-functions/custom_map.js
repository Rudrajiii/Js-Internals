
/**
* The "map()" method executes a provided function once for each array element and constructs a new array from the results. It does not execute the function for empty elements. This method returns a new array and does not modify the original array.
* @syntax :
* Array.prototype.map() - Creates a new array with the results of calling a provided function on every element in the calling array.
* @array.map(callback(currentValue, index, array), thisArg);

* @callback: A function that is called for every element of the array. It takes three arguments:
* @index (Optional): The index of the current element being processed in the array.
* @array (Optional): The array "map" was called upon.
* @thisArg (Optional): Value to use as "this" when executing "callback".

* @returns:
* A new array with each element being the result of the callback function.
**/
Array.prototype.__push = function(element) {
    this[this.length] = element;
    return this.length;
}
Array.prototype.__map = function(callback, context) {
    const temp = [];

    for (let i = 0; i < this.length; i++) {
        const result = callback.__call(context, this[i], i, this);
        temp.__push(result);
    }
    return temp;
}