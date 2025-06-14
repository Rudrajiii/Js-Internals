
/**
 * Array.prototype.indexOf() - Returns the first index at which a given element can be found in the array, or -1 if it is not present.
 *
 * @syntax:
 * @array.indexOf(searchElement, fromIndex)
 *
 * @searchElement: Element to locate in the array.
 * @fromIndex (Optional): The index to start the search at. Defaults to 0. If negative, it's taken as length + fromIndex.
 *
 * @returns:
 * - The first index of the element in the array; -1 if not found.
 */
Array.prototype.__indexOf = function(searchElement, fromIndex = 0){
  if (this == null) {
    throw new TypeError('"this" is null or not defined');
  }

  const array = Object(this);
  const length = array.length >>> 0; // Convert to unsigned 32-bit integer

  if (length === 0) return -1;

  let start = Number(fromIndex) || 0;
  if (start >= length) return -1;
  if (start < 0) start = Math.max(length + start, 0);

  for (let i = start; i < length; i++) {
    if (i in array && array[i] === searchElement) {
      return i;
    }
  }

  return -1;
}