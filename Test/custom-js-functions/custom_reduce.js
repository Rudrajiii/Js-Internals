
/**
* Array.prototype.reduce() - Applies a function against an accumulator and each element in the array to reduce it to a single value.
* The reduce() method executes a provided reducer function (callback) on each element of the array (from left to right) and returns a single accumulated result. This method does not modify the original array. The first time the callback function is executed, it can use an optional initialValue as the first argument for the accumulator.
* @syntax :
* *array.reduce(callback(accumulator, currentValue, index, array), initialValue);

* @callback(accumulator, currentValue, index, array): A function to execute on each element in the array, taking four arguments:
* - @index (optional): The index of the current element being processed in the array. Starts from 0 if initialValue is provided, otherwise starts from 1.
* - @array (optional): The array on which reduce() was called.
* - @initialValue (optional): A value to use as the first accumulator value. If initialValue is not provided, the first element of the array will be used as the accumulator, and the iteration will start from the second element.
** [accumulator]: The value accumulated so far. If initialValue is provided, this will be equal to initialValue on the first iteration; otherwise, it will be equal to the first value of the array.

* @returns:
* The single accumulated result from reducing the array, which could be any data type based on the logic in the callback (number, string, object, etc.).
**/
Array.prototype.__reduce = function(callback, initialValue, context) {
    let accumulator = initialValue;
    let startIndex = 0;

    if (accumulator === undefined) {
        if (this.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback.__call(context, accumulator, this[i], i, this);
    }

    return accumulator;
}