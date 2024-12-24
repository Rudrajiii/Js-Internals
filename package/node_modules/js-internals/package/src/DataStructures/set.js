// File: package/internal-custom-functions/set.js
const fs = require('fs');
const path = require('path');

class CustomSet {
  constructor() {
    this.items = {};
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  size() {
    return Object.keys(this.items).length;
  }

  clear() {
    this.items = {};
  }

  static generateInternals() {
    const explanations = `
/**    
* Explanations and usage examples
* Constructor initializes an empty set
* @has {function} checks if the element is in the set
* @add {function} adds an element to the set if not present
* @delete {function} removes an element from the set if present
* @size {function} returns the number of elements in the set
* @clear {function} removes all elements from the set
**/
    `;
    const code = `
class CustomSet {
  constructor() {
    this.items = {};
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  size() {
    return Object.keys(this.items).length;
  }

  clear() {
    this.items = {};
  }
}
    `;


const outputDir = path.join(process.cwd(), 'custom-js-functions');
const outputPath = path.join(outputDir, 'custom_set.js');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, explanations + code);

return `File created at ${outputPath}`;
  }
}

module.exports = CustomSet;


