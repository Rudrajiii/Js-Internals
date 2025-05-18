
/**
* Array.prototype.filter() - Creates a new array with all elements that pass the test implemented by the provided function.
* The "filter()" method executes a provided function once for each array element and constructs a new array of elements for which the function returns 'true'. It does not execute the function for empty elements and does not modify the original array.
* @syntax :
* @array.filter(callback(currentValue, index, array), thisArg);

* @callback: A function that is called for every element of the array. It takes three arguments:
* - @index (Optional): The index of the current element being processed in the array.
* - @array (Optional): The array "filter" was called upon.

* @thisArg (Optional): Value to use as "this" when executing the "callback".
* @returns
*  A new array with the elements that pass the test. If no elements pass the test, an empty array will be returned.
**/
Array.prototype.__push = function(element) {
    this[this.length] = element;
    return this.length;
}
Array.prototype.__filter = function(callback, context) {
    const temp = [];

    for (let i = 0; i < this.length; i++) {
        if(callback.__call(context , this[i] , i , this)){
            temp.__push(this[i]);
        }
    }
    return temp;
}