"use strict"
// we could use the Object() constructor to make a new object
let a = new Object();
a.job = "Ambulance Driver";
console.log(a); // {job: 'Ambulance Driver'}

// but more commonly we'll use object literal syntax
let b = {};
b.job = "Baker";
console.log(b); // {job: 'Baker'}

// we can also give the object properties when we declare it
let c = { "job" : "Criminal" };
console.log(c); // {job: 'Criminal'}

let d = {
    "name": "Danny",
    "sayHello": function(){ console.log(`Hello - my name is ${this.name}`); }
  };
  
  d.job = "Dog Walker";
  d.sayGoodbye = function(){ console.log(`Goodbye - my job is ${this.job}`); };
  
  console.log(d);
  d.sayHello();
  d.sayGoodbye();

  d.joob = "Donut Maker"; // should be .job, not .joob
  console.log(d); // {name: 'Danny', job: 'Dog Walker', joob: 'Donut Maker', sayHello: ƒ, sayGoodbye: ƒ}

  Object.seal(d);
d.naame = "Donut Maker"; // should be .name, not .naame - gives an ERROR or fails silently
console.log(d); // no .naame property was added

Object.freeze(d);
d.job = "Ditch Digger"; // cannot modify existing property
d.age = 55; // NOR add a new property
console.log(d); // no changes or new properties

const e = ["red","green","blue"];
e.push("cyan"); // WHY DOES THIS WORK?
console.log(e); // ['red', 'green', 'blue', 'cyan']

Object.seal(e);
e.push("yellow"); // fails because we can't add index `4` (which is a property key) 
e[0] = "Maroon"; // but we CAN do this
console.log(e); // ['Maroon', 'green', 'blue', 'cyan']

Object.freeze(e);
e[1] = "Emerald"; // now this will fail too
console.log(e); // ['Maroon', 'green', 'blue', 'cyan']

//{job: 'Ambulance Driver'}
//{job: 'Baker'}
//{job: 'Criminal'}

console.log(a.toString()); // '[object Object]'

// Let's add our own .toString() method
// this will override (or "shadow") the existing .toString()
a.toString = function(){ console.log(`My job is ${this.job}`); };
console.log(a.toString()); // My job is Ambulance Driver

const colorEnum = Object.create(null); // enum has no protoype
console.log(colorEnum); // {} - missing the prototype methods
//console.log(colorEnum.toString()); // ERROR

colorEnum.REDDISH_COLOR = "rgb(200,0,0)";
colorEnum.GREENISH_COLOR = "rgb(0,200,0)";
Object.freeze(colorEnum); 

console.log(colorEnum); // {REDDISH_COLOR: 'rgb(200,0,0)', GREENISH_COLOR: 'rgb(0,200,0)'}
console.log(colorEnum.REDDISH_COLOR); // rgb(200,0,0)
console.log(colorEnum.GREENISH_COLOR); // rgb(0,200,0)

console.log(d.job); // Dog Walker
console.log(d["job"]); // Dog Walker
console.log(d.jawb); // undefined because .jawb property does not exist (but this is an ERROR in most languages)

// Handling a property name with spaces requires square brackets
d["dream job"] = "Lion Tamer";
console.log(d["dream job"]); // Lion Tamer
//console.log(d.dream job); // SYNTAX ERROR

const h2 = document.querySelector("h2");
const sayHello = function(){ console.log("Hello!"); };

const obj = {
  "title" : "My Object", // String
  "rating" : 5, // Number
  "active" : true, // Boolean
  "created" : new Date(), // Object reference
  "last-edited" : undefined,
  "deleted" : null,
  "h2-ref": h2, // DOM object reference
  "info" : {}, // Object literal (also a reference)
  "stuff" : ["thing 1", "thing 2"], // Array (also an object reference)
  "sayHello" : sayHello, // Function - also an object - also a reference
};

console.log(obj.title);
console.log(obj.rating);
console.log(obj.active);
console.log(obj["last-edited"]);
console.log(obj.deleted);
console.log(obj["h2-ref"]);
console.log(obj.info);
console.log(obj.stuff);
console.log(obj.sayHello); // function reference
console.log(obj.sayHello()); // call the function

let d = {
    "name": "Danny",
    "sayHello": function(){ 
      console.log(`Hello - my name is ${this.name}`); // note that `this` is required to access the `name` property
     },
     job: "Door-to-door Salesperson"
  };
  
  console.log(d.sayHello());
  
  // Most developers prefer this newer syntax though
  let d2 = {
    "name": "Denny",
    sayHello(){ 
      console.log(`Hello - my name is ${this.name}`); 
    },
    job: "Ding-dong Ditcher"
  };
  
  console.log(d2.sayHello());

  let d3 = {
    "name": "Denny",
    sayHello: () => {
      console.log(`Hello - my name is ${this.name}`); 
    },
    job: "Ding-dong Ditcher"
  };
  
  // this.name will be undefined
  console.log(d3.sayHello()); // Hello - my name is 

  // The traditonal way to initialize object properties
let city = "Chicago";
let founded = 1837;

let obj2 = {
  "city" : city,
  "founded" : founded,
  "population" : 2697000
};

// E6 "shorthand" way to initialize object properties
let obj3 = {
  city, // "city" will be the name of the property, and the value of the city variable will be the value of the property
  founded, // ditto
  "population" : 2697000 // we can still assign properties the usual way
};

console.log(obj2); // {city: 'Chicago', founded: 1837, population: 2697000}
console.log(obj3); // {city: 'Chicago', founded: 1837, population: 2697000}