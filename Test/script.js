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
