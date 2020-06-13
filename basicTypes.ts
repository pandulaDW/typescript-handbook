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

// Any 
// when we want to opt-out of type checking and let the values pass through compile-time checks
let notSure: any = 4
notSure = "maybe a string instead"
notSure = false; // okay, definitely a boolean
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure = { toFixed: () => { } }
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
let list3: any[] = [1, true, "free"]
list3[1] = 100;

// void is a little like the opposite of any: the absence of having any type at all
function warnUser(): void {
    console.log("This is my warning message")
}

// In TypeScript, both undefined and null actually have their own types named undefined
//  and null respectively. Much like void, they’re not extremely useful on their own:

// Never 
// The never type represents the type of values that never occur
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

function fail(): never {
    return error("something failed")
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {

    }
}

// Object 
// object is a type that represents the non-primitive type,
//  i.e. anything that is not number, string, boolean, bigint, symbol, null, or undefined.


// Type assertions 
// A type assertion is like a type cast in other languages, but performs no special checking or restructuring of data.

// Type assertions have two forms. One is the “angle-bracket” syntax:
let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length;

// And the other is the as-syntax:
let strLength2: number = (someValue as string).length; 