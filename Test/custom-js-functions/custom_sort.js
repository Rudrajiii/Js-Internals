
/**
 * Array.prototype.sort() - Sorts the elements of an array in place and returns the sorted array.
 * The default sort order is built upon converting the elements into strings,
 * then comparing their sequences of UTF-16 code unit values.
 * An optional compare function can be provided to define an alternative sort order.
 * @syntax:
 * @array.sort([compareFunction])
 * 
 * @compareFunction (Optional): A function that defines the sort order.
 * It should return a negative, zero, or positive value, depending on the arguments:
 * - negative value: sort "a" before "b"
 * - zero: leave "a" and "b" unchanged with respect to each other
 * - positive value: sort "b" before "a"
 * 
 * @example:
 * const numbers = [4, 2, 5, 1, 3];
 * numbers.sort((a, b) => a - b); // [1, 2, 3, 4, 5]
 * const fruits = ['banana', 'apple', 'cherry'];
 * fruits.sort(); // ['apple', 'banana', 'cherry']
**/
Array.prototype.__sort = function(compareFunction){
    let instance = this;
    /**
     * custom compare function
     * algorithm: Bubble Sort
     * u can use other sorting-algorithms as well
     */
    if (typeof compareFunction === 'function') {
        for(let i = 0 ; i < instance.length; i++){
            for(let j = i + 1 ; j < instance.length; j++){
                // (a , b) => a - b
                if(compareFunction(instance[i], instance[j]) > 0){
                    let temp = instance[i];
                    instance[i] = instance[j];
                    instance[j] = temp;
                }
            }
        }
        return instance;
    }

    /**
     * default Js lexicographical behavior
     */
    for(let i = 0 ; i < instance.length; i++){
        for(let j = i + 1 ; j < instance.length; j++){

            let x = instance[i];
            let y = instance[j];

            //skip undefined values
            if (x === undefined || y === undefined) continue;

            // string conversion and comparison
            if(String(x) > String(y)){
                let temp = instance[i];
                instance[i] = instance[j];
                instance[j] = temp;
            }
        }
    }

    // undefined values must move to the end
    let write = 0;
    let undefCount = 0;

    for (let i = 0; i < instance.length; i++) {
        if (instance[i] === undefined) {
            undefCount++;
        } else {
            instance[write++] = instance[i];
        }
    }

    while (undefCount-- > 0) {
        instance[write++] = undefined;
    }

    return instance;
}