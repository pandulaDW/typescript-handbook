// One of TypeScript’s core principles is that type checking focuses on the shape that
// values have. This is sometimes called “duck typing” 

function printLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label)
}

let myObj = { size: 10, label: "Size 10 Object" }

printLabel(myObj) // Size 10 Object

// duck typing means that, as long as the required functionality is there,
// doesn't matter the type of the object 

// compiler only checks that at least the ones required are present and match the types required

interface LabeledValue {
    label: string
}

function printLabel2(labeledObj: LabeledValue) {
    console.log(labeledObj.label)
}

printLabel2(myObj) // Size 10 Object

// Optional Properties ////////////////////////////////////////////////
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }

    if (config.width) {
        newSquare.area = config.width * config.width;
    }

    return newSquare;
}

let mySquare = createSquare({ color: "black" });
console.log(createSquare(mySquare))

// Readonly properties  ////////////////////////////////////////////
// Some properties should only be modifiable when an object is first created. 
// You can specify this by putting readonly before the name of the property:

interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 }
// p1.x = 10 // Not possible

// TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating methods removed
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12  // error!
// ro.length = 100  // error!
// a = ro  // error!

// The easiest way to remember whether to use readonly or const is to ask whether you’re
//  using it on a variable or a property. Variables use const whereas properties use readonly.