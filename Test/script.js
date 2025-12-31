const { INTERNAL , GET_ALL } = require('../package/index');


// Test filter
const numbers = [1, 2, 3];
const filtered = numbers.$filter(n => n > 2);
console.log('Filtered:', filtered);

// Test map
const mapped = numbers.$map(num => [num, num * 2]);
console.log('Mapped:', mapped);

// Test reduce
const total = numbers.$reduce((acc, curr) => acc + curr, 0);
console.log('Reduced:', total);

// Test call
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}
const person = { name: "Alice" };
greet.$call(person, "Hello", "!");

// Test apply
greet.$apply(person, ['Hello', '!']);

// Test apply with Math.max
const array = [1, 2, 3, 4];
const max = Math.max.$apply(null, array);
console.log('Max:', max);

// Test Array.from and custom from
console.log('Built-in Array.from:', Array.from('foo'));
console.log('Custom from:', Array.$from([1, 2, 3], x => x + x));

// Test isArray
console.log('Is array test 1:', Array.$isArray('p'));
console.log('Is array test 2:', Array.$isArray('[]'));

const mySet = new INTERNAL.$set();
mySet.add(1);
mySet.add(2);
console.log(mySet);

console.log(Array.$of('foo', 2, 'bar', true));
// Expected output: Array ["foo", 2, "bar", true]

console.log(Array.$of());
// Expected output: Array []

//* Test For $forEach(cb)
numbers.$forEach((num) => console.log(num / 2));

const number = [1,2, 4];
const hasLargeNumber = number.$some(num => num === undefined);
console.log("some : ",hasLargeNumber);


let f = number.$every(n => typeof n == 'number' );
console.log(f)

console.log("//-----checking for $isNaN() method---------//")
let r = Infinity
let d = -Infinity;
if ($isNaN(r)){
    console.log("Not a Number");
}else{
    console.log("Ya it's a Number");
}
if ($isFinite(d)){
    console.log(true);
}else{
    console.log(false);
}

console.log("------------------------------")
console.log(parseInt("123"));
console.log($parseInt("123"));
console.log("------------------------------")
// 123 (default base-10)
console.log(parseInt("123", 10));
console.log($parseInt("123", 10));
console.log("------------------------------")
// 123 (explicitly specify base-10)
console.log(parseInt("   123 "));
console.log($parseInt("   123 "));
console.log("------------------------------")
// 123 (whitespace is ignored)
console.log(parseInt("077"));
console.log($parseInt("077"));
console.log("------------------------------")
// 77 (leading zeros are ignored)
console.log(parseInt("1.9"));
console.log($parseInt("1.9"));
console.log("------------------------------")
// 1 (decimal part is truncated)
console.log(parseInt("ff", 16));
console.log("imposter ",$parseInt("ff", 16));
console.log("------------------------------")
// 255 (lower-case hexadecimal)
console.log(parseInt("0xFF", 16));
console.log($parseInt("0xFF", 16));
console.log("------------------------------")
// 255 (upper-case hexadecimal with "0x" prefix)
console.log(parseInt("xyz"));
console.log($parseInt("xyz"));
// NaN (input can't be converted to an integer)

console.log("::::::::::::::::::::::::::::")
let obj = JSON.parse('"  null  "');
console.log(obj);
let myObj = $parseJSON('"  null  "');
console.log(myObj);
console.log("::::::::::::::::::::::::::::")

console.log("------------------custom bind()------------------");
const person1 = {
    name: "Alex",
    greet: function() {
      console.log("Hello, I'm " + this.name);
    }
  };
  
  const greetFunc = person1.greet;
  greetFunc(); // ❌ 'this' is undefined or global object
  
  const boundGreet = person1.greet.bind(person1);
  boundGreet(); // ✅ "Hello, I'm Alex"
  const boundGreetCustom = person1.greet.$bind(person1);
  boundGreetCustom(); // ✅ "Hello, I'm Alex"

  function multiply(a, b) {
    return a * b;
  }
  
  const double = multiply.bind(null, 2);
  console.log(double(5)); // ✅ 10
  const doubleCustom = multiply.$bind(null, 2);
  console.log(doubleCustom(5)); // ✅ 10
    
  
console.log("------------------custom bind()------------------");

console.log("------------------custom stringify()------------------");
const object = {
  date: new Date("2020-01-01T00:00:00.000Z"),
  customObj: {
    toJSON() {
      return "custom";
    },
  },
  nested: {
    a: 1,
    b: undefined,
    c: [3, 4],
  },
};
console.log('Native JSON.stringify:');
console.log(JSON.stringify(object, null, 2));

console.log('\nCustom $stringifyJSON:');
console.log($stringifyJSON(object, null, 2));
console.log("-------------------custom stringify()------------------");



console.log("------------------custom parseFloat()------------------");
console.log($parseFloat("3.14"));           // 3.14
console.log($parseFloat("   -123.45   "));  // -123.45
console.log($parseFloat("123abc"));         // 123
console.log($parseFloat("abc123"));
console.log($parseFloat(".123"));
console.log($parseFloat("1.0e+308"));

console.log("-------------------------------------------------------")
console.log(parseFloat("3.14"));           // 3.14
console.log(parseFloat("   -123.45   "));  // -123.45
console.log(parseFloat("123abc"));         // 123
console.log(parseFloat("abc123")); // NaN
console.log(parseFloat(".123"));
console.log(parseFloat("1.0e+308"));
console.log("------------------custom parseFloat()------------------");

let k = Array.prototype.find.call({ 0: 'a', 1: 'b', length: 2 }, v => v === 'a'); // returns 'a'
let g = $find({ 0: 'a', 1: 'b', length: 2 }, v => v === 'a'); // returns 'a'
console.log(k);
console.log("*************************");
console.log(g);

let h = [1,2,3,4];
let o = h.find(r => r > 2);
let c = h.$find(x => x > 2);
console.log(o + "|||" + c);

let arr = [5, 10, 15, 20];

// Native and custom find: first element greater than 10
let nativeResult1 = arr.find(x => x > 10);
let customResult1 = arr.$find(x => x > 10);
console.log("Test 1:", nativeResult1 === customResult1 ? "✅ Pass" : "❌ Fail", "->", nativeResult1, "||", customResult1);

// Native and custom find: no match (returns undefined)
let nativeResult2 = arr.find(x => x > 100);
let customResult2 = arr.$find(x => x > 100);
console.log("Test 2:", nativeResult2 === customResult2 ? "✅ Pass" : "❌ Fail", "->", nativeResult2, "||", customResult2);

// Native and custom find on string array
let fruits = ['apple', 'banana', 'cherry'];
let nativeResult3 = fruits.find(fruit => fruit.startsWith('b'));
let customResult3 = fruits.$find(fruit => fruit.startsWith('b'));
console.log("Test 3:", nativeResult3 === customResult3 ? "✅ Pass" : "❌ Fail", "->", nativeResult3, "||", customResult3);

// Find using array-like object
let arrayLike = { 0: 'a', 1: 'b', length: 2 };
let nativeResult4 = Array.prototype.find.call(arrayLike, val => val === 'a');
let customResult4 = $find(arrayLike, val => val === 'a');  // if needed
console.log("Test 4:", nativeResult4 === customResult4 ? "✅ Pass" : "❌ Fail", "->", nativeResult4, "||", customResult4);

// Sparse array
let sparse = [1, , 3]; // index 1 is empty
let nativeResult5 = sparse.find(x => x > 1);
let customResult5 = sparse.$find(x => x > 1);
console.log("Test 5:", nativeResult5 === customResult5 ? "✅ Pass" : "❌ Fail", "->", nativeResult5, "||", customResult5);

// With index condition
let nativeResult6 = arr.find((x, i) => i === 2);
let customResult6 = arr.$find((x, i) => i === 2);
console.log("Test 6:", nativeResult6 === customResult6 ? "✅ Pass" : "❌ Fail", "->", nativeResult6, "||", customResult6);

console.log('================ Custom indexOf Tests ================');

// ✅ Test 1: Basic usage
let arr1 = [10, 20, 30, 40, 50];
console.log(arr1.indexOf(30));       // 2
console.log(arr1.$indexOf(30));      // 2

// ✅ Test 2: Element not found
console.log(arr1.indexOf(100));      // -1
console.log(arr1.$indexOf(100));     // -1

// ✅ Test 3: fromIndex positive
console.log(arr1.indexOf(30, 3));    // -1
console.log(arr1.$indexOf(30, 3));   // -1

// ✅ Test 4: fromIndex negative
console.log(arr1.indexOf(40, -2));   // 3
console.log(arr1.$indexOf(40, -2));  // 3

// ✅ Test 5: Empty array
let arr2 = [];
console.log(arr2.indexOf(1));        // -1
console.log(arr2.$indexOf(1));       // -1

// ✅ Test 6: Duplicates
let arr3 = ['a', 'b', 'a', 'c'];
console.log(arr3.indexOf('a'));      // 0
console.log(arr3.$indexOf('a'));     // 0

// ✅ Test 7: Search for undefined
let arr4 = [1, undefined, 3];
console.log(arr4.indexOf(undefined));    // 1
console.log(arr4.$indexOf(undefined));   // 1

// ✅ Test 8: Non-array object with length
let fakeArray = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
let nativeFake = Array.prototype.indexOf.call(fakeArray, 'y');  // 1
let customFake = Array.prototype.$indexOf.call(fakeArray, 'y'); // 1
console.log(nativeFake, customFake);

// ✅ Test 9: fromIndex greater than length
console.log(arr1.indexOf(10, 100));  // -1
console.log(arr1.$indexOf(10, 100)); // -1

// ✅ Test 10: fromIndex is a string number
console.log(arr1.indexOf(20, "1"));  // 1
console.log(arr1.$indexOf(20, "1")); // 1

// ✅ Test 11: Search NaN — both should fail because === is used
let arr5 = [NaN];
console.log(arr5.indexOf(NaN));       // -1
console.log(arr5.$indexOf(NaN));      // -1

console.log('=====================================================');

console.log(Math.$max(1, 2, 3)); // 3
console.log(Math.$max(-1, -2, -3)); // -1
console.log(Math.$max()); // -Infinity
console.log(Math.$max(10 , 2 , NaN))
console.log(Math.$max("NaN" , "2" , "1"))

console.log(Math.min(1, 2, 3)); // 1
console.log(Math.$min(1, 2, 3)); // 1
console.log(Math.$min(-1, -2, -3)); // -3
console.log(Math.$min()); // Infinity
console.log(Math.$min(5, 10, 15, 20)); //
console.log(Math.min(1, "2", 3)); // Na
console.log(Math.$min(NaN))


console.log("##########################################################");
const array1 = [1, 2, 3];

console.log(array1.$includes(2));
// Expected output: true

const pets = ["cat", "dog", "bat"];

console.log(pets.$includes("cat"));
// Expected output: true

console.log(pets.$includes("at"));
// Expected output: false
console.log("##########################################################");


const T = [3, undefined, 1];
console.log(arr.sort());
// Expected output: [1, 3, undefined]
console.log(arr.$sort());


const a = [1, , 3];
a.$splice(1, 1);
console.log("custom splice " , a);

// INTERNAL.map_internals();
// INTERNAL.map_internals();
// INTERNAL.filter_internals();
// INTERNAL.reduce_internals();
// INTERNAL.call_internals();
// INTERNAL.apply_internals();
// INTERNAL.from_internals();
// INTERNAL.isArray_internals();
// INTERNAL.of_internals();
// INTERNAL.set_internals();
// INTERNAL.forEach_internals();
// INTERNAL.some_internals();
// INTERNAL.every_internals();
// INTERNAL.isNaN_internals();
GET_ALL()
