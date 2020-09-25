// A literal is a more concrete sub-type of a collective type. What this means is that "Hello World"
// is a string, but a string is not "Hello World" inside the type system.

// There are three sets of literal types available in TypeScript today: strings, numbers,
// and booleans; by using literal types you can allow an exact value which a string, number, or boolean must have.

// literal narrowing
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') console.log(easing);
    else if (easing === 'ease-out') console.log(easing);
    else if (easing === 'ease-in-out') console.log(easing);
  }
}

let button = new UIElement();
button.animate(0, 0, 'ease-in');
// button.animate(0, 0, 'uneasy');  compile error

// can also be used to create overloads
function createAnimation(animType: 'ease-in'): void;
function createAnimation(animType: 'ease-in-out'): void;
function createAnimation(animType: 'ease-out'): void;
function createAnimation(type: Easing) {
  console.log('Easing MF!!! with ', type);
}

createAnimation('ease-out');

// Numeric literal types
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result = rollDice();

// common case is to describe config values
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

function setupMap(map: MapConfig): void {
  console.log(map);
}

// Boolean literals
interface ValidationSuccess {
  isValid: true;
  reason: null;
}

interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;
