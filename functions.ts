// Named function
function add(x: number, y: number): number {
  return x + y;
}

// Anonymous function
let myAdd = function (x: number, y: number): number {
  return x + y;
};

// Define and use interface in one line
let myAdd2: (baseVal: number, increment: number) => number = function (x, y) {
  return x + y;
};

// the number of arguments given to a function has to match the number of parameters the function expects.
// In JavaScript, every parameter is optional, and users may leave them off as they see fit.
// When they do, their value is undefined.

// Optional parameters
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + ' ' + lastName;
  else return firstName;
}

let result1 = buildName('Bob');

// can do the same thing with default parameters also

// Rest parameters
function buildName2(firstName: string, ...restOfName: string[]) {
  const capitalize = (el: string) =>
    `${el.charAt(0).toLocaleUpperCase()}${el.slice(1)}`;

  return `${capitalize(firstName)} ${restOfName
    .map((el) => capitalize(el))
    .join(' ')}`;
}

console.log(buildName2('mike', 'jen', 'smith'));

// this and arrow functions ----------------------------------------
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  }
};

let cardPicker = deck.createCardPicker();

// let pickedCard = cardPicker(); returns an error since this will now point to the window obj
cardPicker.call(deck); // need to pass deck explicity to the call function

// To fix this, we can use an arrow function as the inner function, since arrow functions
// are lexically scoped
deck.createCardPicker = function () {
  return () => {
    let pickedCard = Math.floor(Math.random() * 52);
    let pickedSuit = Math.floor(pickedCard / 13);
    return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
  };
};

cardPicker = deck.createCardPicker();
console.log(cardPicker());

// Typescript way
// To fix this, you can provide an explicit this parameter. this parameters
// are fake parameters that come first in the parameter list of a function:
interface Card {
  suit: String;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deckTs: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function (this) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  }
};

// Overloads ---------------------------------------------------
// single JavaScript function to return different types of objects
// based on the shape of the arguments passed in.
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

// TypeScript can have overloaded methods
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  if (typeof x === 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spaded', card: 10 },
  { suit: 'hearts', card: 4 }
];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log(pickedCard1);

let pickedCard2 = pickCard(15);
console.log(pickedCard2);
