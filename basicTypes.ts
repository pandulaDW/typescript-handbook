// boolean 
let isDone: boolean = false;

// number 
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String 
let color: string = "blue"

// Array 
let list: number[] = [12, 23, 43]

// with generic types
let list2: Array<number> = [1, 2, 3]

// Tuples
// Tuple types allow you to express an array with a fixed number of elements whose types are known,
// but need not be the same
let x: [string, number];
// initialize it 
x = ["hello", 10] // ok
// Initialize it incorrectly
// x = [10, "hello"]; // Error

// Enum 
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
console.log(c) // 1

// By default, enums begin numbering their members starting at 0. You can change this by manually
// setting the value of one of its members. For example, we can start the previous example at 1 instead of 0:
enum Color2 { Red = 1, Green, Blue }
let c2: Color = Color.Green;
console.log(c2) // 1

enum Color3 { Red = 2, Green = 4, Blue = 5 }
let colorName: string = Color3[4] // can do lookups like this 
console.log(colorName) 