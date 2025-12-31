
/**
* Array.prototype.splice() - Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
* The "splice()" method modifies the original array and returns an array containing the deleted elements.
* @syntax:
* @array.splice(start, deleteCount, item1, item2, ...);
*  @param {number} start - The index at which to start changing the array.
*  @param {number} deleteCount - The number of elements to remove from the array.
*  @param {any} item1, item2, ... (Optional) - The elements to add to the array, starting from the "start" index.
*  @returns {Array} - An array containing the deleted elements.
* @example:
* const array = [1, 2, 3, 4, 5];
* const removed = array.splice(2, 2, 'a', 'b');
* console.log(array); // Output: [1, 2, 'a', 'b', 5]
* console.log(removed); // Output: [3, 4]
**/
Array.prototype.__splice = function (start, deleteCount, ...items) {
  // === Abstract operations (spec-style helpers) ===
  function ToIntegerOrInfinity(value) {
    const n = Number(value);
    if (isNaN(n) || n === 0) return 0;
    if (!isFinite(n)) return n;
    return n > 0 ? Math.floor(n) : Math.ceil(n);
  }

  function ToLength(value) {
    const len = ToIntegerOrInfinity(value);
    return Math.min(Math.max(len, 0), Number.MAX_SAFE_INTEGER);
  }

  function ArraySpeciesCreate(original, length) {
    const C = original.constructor;
    if (typeof C !== "function") return new Array(length);
    const species = C[Symbol.species];
    if (species == null) return new Array(length);
    return new species(length);
  }

  // === Step 1: ToObject(this) ===
  const O = Object(this);

  // === Step 2: Get length ===
  const len = ToLength(O.length);

  // === Step 3: Compute actualStart ===
  const relativeStart = ToIntegerOrInfinity(start);
  const actualStart =
    relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);

  // === Step 4: Compute actualDeleteCount ===
  let actualDeleteCount;
  if (arguments.length === 1) {
    actualDeleteCount = len - actualStart;
  } else {
    const dc = ToIntegerOrInfinity(deleteCount);
    actualDeleteCount = Math.min(Math.max(dc, 0), len - actualStart);
  }

  // === Step 5: Create array of deleted elements (species-aware) ===
  const A = ArraySpeciesCreate(O, actualDeleteCount);

  for (let k = 0; k < actualDeleteCount; k++) {
    const from = actualStart + k;
    if (from in O) {
      A[k] = O[from]; // preserve holes
    }
  }

  const itemCount = items.length;

  // === Step 6: Shift elements ===
  if (itemCount < actualDeleteCount) {
    // Shift left
    for (let k = actualStart; k < len - actualDeleteCount; k++) {
      const from = k + actualDeleteCount;
      const to = k + itemCount;
      if (from in O) {
        O[to] = O[from];
      } else {
        delete O[to];
      }
    }

    // Delete excess tail elements
    for (let k = len; k > len - actualDeleteCount + itemCount; k--) {
      delete O[k - 1];
    }
  } else if (itemCount > actualDeleteCount) {
    // Shift right
    for (let k = len - actualDeleteCount; k > actualStart; k--) {
      const from = k + actualDeleteCount - 1;
      const to = k + itemCount - 1;
      if (from in O) {
        O[to] = O[from];
      } else {
        delete O[to];
      }
    }
  }

  // === Step 7: Insert new items ===
  for (let i = 0; i < itemCount; i++) {
    O[actualStart + i] = items[i];
  }

  // === Step 8: Update length ===
  O.length = len - actualDeleteCount + itemCount;

  // === Step 9: Return deleted elements ===
  return A;
}