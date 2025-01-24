const { INTERNAL } = require('../package/index');

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

console.log('Map internals:', INTERNAL.map_internals());
console.log('Filter internals:', INTERNAL.filter_internals());
console.log('Reduce internals:', INTERNAL.reduce_internals());
console.log('Call internals:', INTERNAL.call_internals());
console.log('Apply internals:', INTERNAL.apply_internals());
console.log('From internals:', INTERNAL.from_internals());
console.log('IsArray internals:', INTERNAL.isArray_internals());
console.log('Of internals:', INTERNAL.of_internals());
console.log('Set DS' , INTERNAL.set_internals());
console.log('forEach internals:' , INTERNAL.forEach_internals());
console.log('some internals:' , INTERNAL.some_internals());
console.log('every internals:' , INTERNAL.every_internals());
