Boost Up The Js Understanding ☠️

![github-header-image (2)](https://github.com/user-attachments/assets/5306de0f-8874-41cf-a71c-a72ea621a685)
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm Badge">
  <img src="https://img.shields.io/badge/version-1.1.3-green?style=for-the-badge" alt="Version Badge">
</p>

Welcome to the Custom JavaScript Functions package! This npm package provides custom implementations of built-in JavaScript functions, allowing users to understand how these functions work internally. This is especially useful for learning purposes and for those who want to see how common JavaScript functions can be replicated.

## Features 🚀

- **Custom Implementations**: Each function in this package is a custom implementation that mimics the behavior of the native JavaScript functions.
- **Educational**: The primary goal of this package is to provide an educational resource for developers to understand the inner workings of JavaScript functions.
- **Polyfill-style Functions**: These implementations can serve as polyfills, helping developers use similar functionality in environments where certain features may not be available.

## example code 🐬
```js
const { INTERNAL , GET_ALL } = require('js-internals');
//INTERNAL  is an object that contains all the custom native funcs
//map_internals() gives that implemented custom code of native js funcs in a seperate folder
//You can use this custom funcs just by providing a "$" symbol before the name eg. $map();

INTERNAL.map_internals() //You will get the custom implementation of map()

//sample example
const numbers = [1, 2, 3];
const filtered = numbers.$filter(n => n > 2);
console.log('Filtered:', filtered);
//output [3]

//Get all the custom implementations at once
GET_ALL()

```

## Project Tree 🌳

```base
📦 js-internals
│
├── 📂 src
│   ├── 📂 DataStructures
│   │   ├── 📄 Set.js
│   │
│   ├── 📂 Polyfills
│   │   ├── 📂 Array
│   │   │   ├── 📂 InstanceMethods
│   │   │   │   ├── 📄 _map.js
│   │   │   │   ├── 📄 _filter.js
│   │   │   │   ├── 📄 _reduce.js
│   │   │   │   ├── 📄 _forEach.js
│   │   │   │   ├── 📄 _some.js
│   │   │   │   ├── 📄 _every.js
│   │   │   │   ├── 📄 _find.js
│   │   │   │   ├── 📄 _indexOf.js
│   │   │   │   ├── 📄 _includes.js
│   │   │   │   ├── 📄 _sort.js
│   │   │   │   ├── 📄 _reverse.js
│   │   │   │   ├── 📄 _splice.js
│   │   │   │   ├── 📄 _slice.js
│   │   │   │   ├── 📄 _concat.js
│   │   │   │   ├── 📄 _join.js
│   │   │   ├── 📂 StaticMethods
│   │   │   │   ├── 📄 _from.js
│   │   │   │   ├── 📄 _isArray.js
│   │   │   │   ├── 📄 _of.js
│   │   │
│   │   ├── 📂 String
│   │   │   ├── 📄 _charAt.js
│   │   │   ├── 📄 _indexOf.js
│   │   │   ├── 📄 _includes.js
│   │   │   ├── 📄 _slice.js
│   │   │   ├── 📄 _substring.js
│   │   │   ├── 📄 _trim.js
│   │   │   ├── 📄 _toLowerCase.js
│   │   │   ├── 📄 _toUpperCase.js
│   │   │   ├── 📄 _split.js
│   │   │   ├── 📄 _replace.js
│   │   │
│   │   ├── 📂 Object
│   │   │   ├── 📄 _keys.js
│   │   │   ├── 📄 _values.js
│   │   │   ├── 📄 _entries.js
│   │   │   ├── 📄 _assign.js
│   │   │   ├── 📄 _freeze.js
│   │   │   ├── 📄 _seal.js
│   │   │   ├── 📄 _getOwnPropertyDescriptor.js
│   │   │   ├── 📄 _create.js
│   │   │   ├── 📄 _hasOwnProperty.js
│   │   │
│   │   ├── 📂 Function
│   │   │   ├── 📄 _call.js
│   │   │   ├── 📄 _apply.js
│   │   │   ├── 📄 _bind.js
│   │   │
│   │   ├── 📂 Math
│   │   │   ├── 📄 _max.js
│   │   │   ├── 📄 _min.js
│   │   │   ├── 📄 _floor.js
│   │   │   ├── 📄 _ceil.js
│   │   │   ├── 📄 _round.js
│   │   │   ├── 📄 _random.js
│   │   │   ├── 📄 _abs.js
│   │   │
│   │   ├── 📂 Global
│   │   │   ├── 📄 _parseInt.js
│   │   │   ├── 📄 _parseFloat.js
│   │   │   ├── 📄 _isNaN.js
│   │   │   ├── 📄 _isFinite.js
│   │   │   ├── 📄 _stringify.js
│   │   │   ├── 📄 _parse.js
│   │
│   ├── 📄 index.js
│
├── 📂 tests
│   ├── 📂 Array
│   │   ├── 📄 test_map.js
│   │   ├── 📄 test_filter.js
│   │   ├── 📄 test_reduce.js
│   │   ├── 📄 test_forEach.js
│   │   ├── 📄 ...
│   ├── 📂 String
│   │   ├── 📄 test_charAt.js
│   │   ├── 📄 test_indexOf.js
│   │   ├── 📄 ...
│   ├── 📂 Object
│   │   ├── 📄 test_keys.js
│   │   ├── 📄 test_values.js
│   │   ├── 📄 ...
│   ├── 📂 Math
│   │   ├── 📄 test_max.js
│   │   ├── 📄 test_min.js
│   │   ├── 📄 ...
│   ├── 📂 Global
│   │   ├── 📄 test_parseInt.js
│   │   ├── 📄 test_isNaN.js
│   │   ├── 📄 ...
│   ├── 📄 script.js
│
├── 📄 package.json

```
## Sample Code of custom $call(context, ...args) [Same as native call()]
```js
/**
 * Function.prototype.call() - Calls a function with a given 'this' value and arguments provided individually.
 * The "call()" method allows you to invoke a function with a specific 'this' context, along with arguments passed individually. It is useful when you want to change the context ('this') for a particular function invocation.
 * @syntax :
 * @function.call(thisArg, arg1, arg2, ..., argN);

 * @thisArg : The value to use as 'this' when calling the function. If 'thisArg' is 'null' or 'undefined', it will default to the global object ('globalThis' in non-strict mode).
 * @arg1 , arg2, ..., argN: Individual arguments to pass to the function.

 * @returns:
 * The result of calling the function with the provided 'this' value and arguments.
**/

Function.prototype.__call = function(context, ...args) {
    if (typeof this !== "function") {
        throw new Error(this + " is not a function.");
    }

    if (context === undefined || context === null) {
        return this.apply(globalThis, args);
    }

    const boundContext = Object(context);

    boundContext.func = this;
    const result = boundContext.func(...args);
    delete boundContext.func;

    return result;
};

```

## Sample Output 📦 ~
![image](https://github.com/user-attachments/assets/f50c836d-786f-4865-a7c2-d6a1dffa60a7)

## Progress ✨ ~
![image](https://github.com/user-attachments/assets/3a02bbdf-7990-40f7-8c1b-fabc8d90db19)




## Available Functions 🚀

### Array Methods

| Function                                   | Status         | Native Function               |
|--------------------------------------------|----------------|-------------------------------|
| `$Map(array, callback)`                    | Implemented ✅   | `Array.prototype.map()`       |
| `$Filter(array, callback)`                 | Implemented ✅   | `Array.prototype.filter()`    |
| `$Reduce(array, callback, initialValue)`   | Implemented ✅   | `Array.prototype.reduce()`    |
| `$Array.from(value)`                       | Implemented ✅   | `Array.from()`                |
| `$Array.isArray(array)`                    | Implemented ✅   | `Array.isArray()`             |
| `$Array.of(value)`                         | Implemented ✅   | `Array.of()`                  |
| `$ForEach(array, callback)`                | Implemented ✅          | `Array.prototype.forEach()`   |
| `$Some(array, callback)`                   | Implemented ✅          | `Array.prototype.some()`      |
| `$Every(array, callback)`                  | Implemented ✅            | `Array.prototype.every()`     |
| `$Find(array, callback)`                   | Todo           | `Array.prototype.find()`      |
| `$IndexOf(array, element)`                 | Todo           | `Array.prototype.indexOf()`   |
| `$Includes(array, element)`                | Todo           | `Array.prototype.includes()`   |
| `$Sort(array, compareFunction)`            | Todo           | `Array.prototype.sort()`      |
| `$Reverse(array)`                          | Todo           | `Array.prototype.reverse()`   |
| `$Splice(array, start, deleteCount, ...items)` | Todo       | `Array.prototype.splice()`    |
| `$Slice(array, start, end)`                | Todo           | `Array.prototype.slice()`     |
| `$Concat(array, ...arrays)`                | Todo           | `Array.prototype.concat()`    |
| `$Join(array, separator)`                   | Todo          | `Array.prototype.join()`      |

### String Methods

| Function                                     | Status         | Native Function                  |
|----------------------------------------------|----------------|----------------------------------|
| `$CharAt(string, index)`                     | Todo           | `String.prototype.charAt()`      |
| `$IndexOf(string, searchValue, fromIndex)`  | Todo           | `String.prototype.indexOf()`     |
| `$Includes(string, searchString, fromIndex)`| Todo           | `String.prototype.includes()`     |
| `$Slice(string, start, end)`                 | Todo           | `String.prototype.slice()`        |
| `$Substring(string, start, end)`             | Todo           | `String.prototype.substring()`    |
| `$Trim(string)`                              | Todo           | `String.prototype.trim()`         |
| `$ToLowerCase(string)`                       | Todo           | `String.prototype.toLowerCase()`  |
| `$ToUpperCase(string)`                       | Todo           | `String.prototype.toUpperCase()`  |
| `$Split(string, separator, limit)`           | Todo           | `String.prototype.split()`        |
| `$Replace(string, searchValue, newValue)`    | Todo           | `String.prototype.replace()`      |

### Object Methods

| Function                                   | Status         | Native Function                        |
|--------------------------------------------|----------------|----------------------------------------|
| `$Keys(object)`                            | Todo           | `Object.keys()`                        |
| `$Values(object)`                          | Todo           | `Object.values()`                      |
| `$Entries(object)`                         | Todo           | `Object.entries()`                     |
| `$Assign(target, ...sources)`              | Todo           | `Object.assign()`                      |
| `$Freeze(object)`                          | Todo           | `Object.freeze()`                      |
| `$Seal(object)`                            | Todo           | `Object.seal()`                        |
| `$GetOwnPropertyDescriptor(object, property)` | Todo        | `Object.getOwnPropertyDescriptor()`    |
| `$Create(prototype, properties)`            | Todo           | `Object.create()`                      |
| `$HasOwnProperty(object, property)`        | Todo           | `Object.prototype.hasOwnProperty()`    |

### Function Methods

| Function                                   | Status         | Native Function                     |
|--------------------------------------------|----------------|-------------------------------------|
| `$Call(func, thisArg, ...args)`           | Implemented ✅    | `Function.prototype.call()`         |
| `$Apply(func, thisArg, args)`              | Implemented ✅   | `Function.prototype.apply()`        |
| `$Bind(func, thisArg, ...args)`           | Implemented ✅           | `Function.prototype.bind()`         |

### Math Methods

| Function                                   | Status         | Native Function                   |
|--------------------------------------------|----------------|-----------------------------------|
| `$Max(...numbers)`                         | Todo           | `Math.max()`                      |
| `$Min(...numbers)`                         | Todo           | `Math.min()`                      |
| `$Floor(number)`                           | Todo           | `Math.floor()`                    |
| `$Ceil(number)`                            | Todo           | `Math.ceil()`                     |
| `$Round(number)`                           | Todo           | `Math.round()`                    |
| `$Random()`                                | Todo           | `Math.random()`                   |
| `$Abs(number)`                             | Todo           | `Math.abs()`                      |

### Other Global Functions

| Function                                   | Status         | Native Function                  |
|--------------------------------------------|----------------|----------------------------------|
| `$ParseInt(string, radix)`                 | Implemented ✅            | `parseInt()`                     |
| `$ParseFloat(string)`                      | Todo           | `parseFloat()`                   |
| `$IsNaN(value)`                           | Implemented ✅           | `isNaN()`                        |
| `$IsFinite(value)`                         | Implemented ✅           | `isFinite()`                     |
| `$parseJSON(jsonString)`                       | Implemented ✅           | `JSON.parse()`                   |
| `$Stringify(value)`                        | Todo           | `JSON.stringify()`               |

Hello Devs 👋🏻
`If you want to contribute you are always Welcome !! Come and Contribute Here > 3 💗🫠`
## Contribution Rule's
- maintain existing file naming convension (eg. _file.js)
- maintain existing code format for Contribution
- ensure you write all the import tests for that func maintaining the proper format (eg. test_funcName.js)
- demo test file for custom func `$call()`

```js
const { __call } = require('../package/src/internal-custom-functions/Array_Object/Static_Methods/_call');

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Run tests for the custom __call method
const tests = [
    {
        description: 'Basic Function Call with Context',
        func: function(greeting, punctuation) { return `${greeting}, ${this.name}${punctuation}`; },
        context: { name: 'Alice' },
        args: ['Hello', '!'],
        expected: 'Hello, Alice!',
        testNumber: 0
    },
    {
        description: 'Function with No Context',
        func: function(num1, num2) { return num1 + num2; },
        context: undefined,
        args: [5, 10],
        expected: 15,
        testNumber: 1
    }
    //Write atleast 7-8 proper test cases.
];

// Run the tests
tests.forEach(test => {
    let result;
    let errorOccurred = false;
    try {
        result = test.func.__call(test.context, ...test.args);
    } catch (error) {
        if (test.expectedError) {
            errorOccurred = true;
            console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
        } else {
            console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
            console.error('Unexpected Error:', error);
        }
    }

    if (!errorOccurred && deepEqual(result, test.expected)) {
        console.log(`Passed Test${test.testNumber} ✅: ${test.description}`);
    } else if (!errorOccurred) {
        console.log(`Failed Test${test.testNumber} ❌: ${test.description}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);
        console.log(`Actual: ${JSON.stringify(result)}`);
    }
});

```

## Project SetUp
First Clone The Repo
```bash
git clone https://github.com/Rudrajiii/Js-Internals
```
Then Move To Project Directory
```bash
cd Js-Internals
```
Now Open Your Favourite Code Editor [ Mine is Vs-Code :) So ]
```bash
code .
```

## Installation ⏬

To install this package, use npm:
```bash
npm install --save-dev js-internals
```
To Run The Tests:
`Make the test script executable:`
For (Linux):
```bash
chmod +x pkg_tester.sh
```
`Run the test script:`
```bash
./pkg_tester.sh
```
