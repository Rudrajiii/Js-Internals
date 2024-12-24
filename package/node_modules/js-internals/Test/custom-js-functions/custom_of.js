/**
 * Custom Array.of() - Creates a new Array instance with a variable number of arguments.
 * This method is useful for creating arrays from any number of arguments,
 * regardless of type.
 *
 * @param {...*} items - The items to include in the new Array.
 * @returns {Array} - A new Array instance containing the provided items.
 **/require('./_from');
Function.prototype.__of = function(...args) {
    return Array.__from(args);
};