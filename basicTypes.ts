// TypeScript, supports the same types as you would expect in JavaScript,
// with an extra enumeration type thrown in to help things along.

// boolean
let isDone: boolean = false;

// Number (in JS only number and BigInt is there)
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string (same as js)
let color: string = 'blue';
color = 'red';

// supports template literals
let fullName: string = 'Bob Harp';
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}, I'll be ${age + 1} 
years old next month`;
console.log(sentence);

// Arrays (first way)
let list1: number[] = [1, 2, 3];

// Arrays (second way)
let list2: Array<number> = [1, 2, 3];

// Tuple types allow you to express an array with a fixed number of
// elements whose types are known, but need not be the same
let x: [string, number]; // declare
x = ['hello', 10]; // initialize
// x = [10, 'hello']; error

console.log(x[0].toLowerCase());
console.log(x[1]);

// Enums --------------------------------------------------------------
// Enum (A helpful addition to the standard set of data types from JS is the enum. As in languages
// like C#, an enum is a way of giving more friendly names to sets of numeric values.)
enum Color1 {
  Red,
  Green,
  Blue
}
let c: Color1 = Color1.Green;
console.log(c); // 1

// by default enum starts at 0
enum Color2 {
  Red = 1,
  Green,
  Blue
}
console.log(Color2.Green); // 2

// can also get the key name
console.log(Color2[2]); // Green

// Unknown (can take any type) -------------------------------
let notSure: unknown = 4;
notSure = 'maybe a string instead';
notSure = false;

// narrow down unknown type by doing typeof checks
let maybe: unknown;
maybe = true;

let aBoolean: boolean, aString: string;
if (typeof maybe === 'boolean') {
  aBoolean = maybe;
} else if (typeof maybe === 'string') {
  aString = maybe;
}

console.log(aBoolean);

// Any (to opt out type checking) --------------------------------------
function getValue(key: string): any {
  return;
}
// OK, return value of 'getValue' is not checked
const str: string = getValue('myString');

// Unlike unknown, variables of type any allow you to access arbitrary properties,
// even ones that don’t exist
let looselyTyped1: any = 5;
// looselyTyped1.ifItExists(); // OK, ifItExists might exist at runtime
looselyTyped1.toFixed(); // OK, toFixed exists (but the compiler doesn't check)

// The any will continue to propagate through your objects:
let looselyTyped2: any = {};
// console.log(looselyTyped2.a.b.c.d);

// Void ------------------------------------------------------------------
// void is a little like the opposite of any: the absence of having any type at all
function warnUser(): void {
  console.log('This is a warning message');
}

// Null and Undefined ------------------------------------------
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

// Never ------------------------------------------------
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// no reachable end point
function infiniteLoop(): never {
  while (true) {}
}

// Object (a type that represents the non-primitive type, i.e. anything that is not
// number, string, boolean, symbol, null, or undefined.)

// Type assertions (type casting) v1
let someValue: unknown = 'this is a string';
let strLength1: number = (someValue as string).length;

// Type assertions (type casting) v2
let strLength2: number = (<string>someValue).length;
