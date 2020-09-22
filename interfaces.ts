//  “duck typing” or “structural subtyping”. In TS, interfaces fill the role of naming these types,
// and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.

function printLabel1(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel1(myObj);

// object actually has more properties than this, but the compiler only
// checks that at least the ones required are present and match the types required

// interface declaration
interface LabeledValue {
  label: string;
}

function printLabel2(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}
printLabel2(myObj);

// If the object we pass to the function meets the requirements listed, then it’s allowed.

// Optional properties -------------------------
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  const newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  } else if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

console.log(createSquare({})); // { color: 'white', area: 100 }
console.log(createSquare({ color: 'blue' }));

// Readonly properties -------------------------
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5;  error (Cannot assign to 'x' because it is a read-only property.)

// readonly arrays (all mutating methods removed)
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[2] = 12 error

// Excess Property Checks ------------------------------
// If an object literal has any properties that the “target type” doesn’t have, you’ll get an error:
// Object literal may only specify known properties, and 'height' does not exist in type 'SquareConfig
// let mySquare = createSquare({ color: 'red', width: 40, height: 20 });

// to get around this
let mySquare = createSquare({
  color: 'red',
  width: 40,
  height: 20
} as SquareConfig);

console.log(mySquare);

// or a better approach (add a string index signature)
// SquareConfig can have any number of properties, and as long as they aren’t color or width, their types don’t matter.
interface SquareConfig2 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

// Function types -----------------------------------------
// This is like a function declaration with only the parameter list and return type given
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};

// Indexable type -------------------------------------------
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ['Bob', 'Fred'];

// This can be used to describe dictionary type
interface NumberOrStringDictionary {
  [index: number]: number | string;
  length: number;
  name: string;
}

// Class Types -------------------------------------------
// can describe properties and methods
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

// class has to implement all properties and methods
class Clock1 implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

// Error below (new is not implemented)
// class Clock2 implements ClockConstructor {
//   constructor(h: number, m: number) {}
// }

// This is because when a class implements an interface, only the instance side of the class is checked.
// Since the constructor sits in the static side, it is not included in this check.

// To get around this
interface ClockConstructor2 {
  new (hour: number, minute: number): ClockInterface2;
}

interface ClockInterface2 {
  tick(): void;
}

// A function that calls the constructor and creates a new object of type clock interface
// We can use the constructor type in here
function createClock(
  ctor: ClockConstructor2,
  hour: number,
  minute: number
): ClockInterface2 {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface2 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep');
  }
}

class AnalogClock implements ClockInterface2 {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick tick');
  }
}

// Because createClock’s first parameter is of type ClockConstructor,
// in createClock(AnalogClock, 7, 32), it checks that AnalogClock has the correct constructor signature
let digital = createClock(DigitalClock, 12, 16);
let analog = createClock(AnalogClock, 7, 32);

// Extending Interfaces --------------------------------------
// Gives you more flexibility in how you separate your interfaces into reusable components
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 12;

// Hybrid Types --------------------------------------
// An object that acts as both a function and an object, with additional properties:
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 124;
  counter.reset = () => {};
  return counter;
}

let d = getCounter();
d(10);
d.reset();
d.interval = 12;

// Interfaces Extending Classes ---------------------------------------------------------
class Control {
  private state: any;
}

// SelectableControl contains all of the members of Control, including the private state property
interface SelectableControl extends Control {
  select(): void;
}

// error if select is not implemented
class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {}
