// I. Explicitly typing variables
let a: number;
let b: string;
let c: boolean;
let d: Date;
let e: string[]; // an array of strings
//a = "Fred" // ERROR
e = ["Scooby"];
//e.push(99); // ERROR


// II. Implicitly (i.e. "automatically") typing variables
const meaningOfLife = 42; // will be implicitly typed as a `number`
const defaultName = "Mr. X"; // will be implicitly typed as a `string`
let temp = "utils.js temp value"; // will be implicitly typed as a `string`
//temp = 99 // ERROR
let date = new Date("01-01-2001");
//date = "01-01-2001"; // ERROR
date = new Date()
console.log("date",date) // click the Run button to see the code execute 


// III. Function parameters and return types can be typed too
// Go ahead and "fix" these 3 functions
const doubleIt = (val:number) =>  val * 2;

const doubleItToString = (val:number) =>  String(val * 2);

const formatGreeting = (greeting:string, name:string, forcefully:boolean) => {
  const recipient  = name ? name : defaultName;
  const str = `${greeting} ${recipient}`;
  return forcefully ? `${str.toUpperCase()}!` : str;
};

// IV. Interfaces
// declare the "shape" of an object
// only used at compile time
// used like any other built-in type
interface Car {
  make: string, // required
  model: string, // required
  cylinders?: number, // optional
  equipment?: string[], // optional
  [key:string]: any // and ANY other property is allowed
}

let car1: Car = {make:"Ford", model:"Bronco", cylinders:8, coolness: 11};
//let car2: Car = {make:"Chevy"}; // ERROR

// V. Enumerations
// Enumerable types can be used at runtime
enum Alignment{
  law,
  chaos,
  neutral
}

// OR
// enum Alignment{
//   law = "lawful",
//   chaos = "chaotic",
//   neutral = "neutralty"
// }

interface NPC{
  name: string,
  alignment:  Alignment
}

let arthur: NPC = {name: "Arthur", alignment: Alignment.law };
//let bob: NPC = {name: "Bob", alignment: "Nice" }; // ERROR


// VI. union type
// only used at compile time
// here is a union type of string literals
type RgbColor = "red" | "green" | "blue"; 
let color1: RgbColor = "red";
//let color2: RgbColor = "yellow"; // ERROR

// the union type also lets a value be of more than one type.
const formatScore = (val: string | number) => `Your score is ${val}`;
console.log(formatScore(100));
console.log(formatScore("100"));

// VII. Type Assertions
// Sometimes you will have information about the type of a value that TypeScript can’t know about.
// You will often see these when working with document.querySelector() and HTML elements

const mainCanvas = document.querySelector(".canvas1") as HTMLCanvasElement;

// See the next part for more examples of this!