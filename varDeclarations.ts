function f() {
    var a = 1;
    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}

console.log(f()) // 2 

function func(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

func(true);  // returns '10'
func(false); // returns 'undefined'

// var declarations are accessible anywhere within their 
// containing function, module, namespace, or global scope 

for (var i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i)
    }, 100 * i);
} // [10, 10, 10, ....]

// A common work around is to use an IIFE - an Immediately 
// Invoked Function Expression - to capture i at each iteration:
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function (i) {
        setTimeout(() => {
            console.log(i)
        }, 100 * i);
    })(i);
}

//  Block-scoped variable capturing 
function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function () {
            return city;
        }
    }

    return getCity();
}

console.log(theCityThatAlwaysSleeps())

// with let you don't need IIFEs 
// Rather than just introducing a new environment to the loop itself, 
// these declarations sort of create a new scope per iteration
for (let i = 0; i < 10; i++) {
    setTimeout(function () { console.log(i); }, 100 * i);
}

// destructing (this is a JS feature)
let [, second, , fourth] = [1, 2, 3, 4]

// Tuple destructuring 
let tuple: [number, string, boolean] = [7, "hello", true]
let [a, b, c] = tuple

//  Default values 
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
    console.log(a, b)
}

keepWholeObject({ a: "party", b: 2 }) // party 2 
keepWholeObject({ a: "party" }) // party 1001