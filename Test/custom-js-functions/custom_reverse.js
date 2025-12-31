
/**
* Array.prototype.reverse() - Reverses the elements of an array in place.
* The reverse() method changes the order of the elements in an array to the opposite order.
* @syntax :
* *array.reverse();

* @returns:
* The reversed array.
**/
Array.prototype.__reverse = function(callback , context) {
    let left = 0;
    let right = this.length - 1;
    while (left < right) {
        const temp = this[left];
        this[left] = this[right];
        this[right] = temp;
        left++;
        right--;
    }
    return this;
}