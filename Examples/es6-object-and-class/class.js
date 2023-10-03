// Define the class
class Thing{
    constructor(type){
      this.type = type;
    }
    sayHello(){
      console.log(`I am a ${this.constructor.name} of type=${this.type}`);
    }
  }
  
  // Create an instance of that class
  let thing = new Thing("Slimy");
  console.log(thing); // Thing {type: 'Slimy'}
  console.log(thing.sayHello()); // I am a Thing of type=Slimy

  const Thing2 = class{
    constructor(type){
      this.type = type;
    }
    sayHello(){
      console.log(`I am a ${this.constructor.name} of type=${this.type}`);
    }
  };
  
  // gives us the same thing
  let thing2 = new Thing2("Smelly");
  console.log(thing2); // Thing2 {type: 'Smelly'}
  console.log(thing2.sayHello()); // I am a Thing2 of type=Smelly

  function Thing3(type){
    this.type = type;
  }
  
  Thing3.prototype.sayHello = function(){
    console.log(`I am a ${this.constructor.name} of type=${this.type}`);
  };
  
  let thing3 = new Thing3("Stinky");
  console.log(thing3); // Thing3 {type: 'Stinky'}
  console.log(thing3.sayHello()); // I am a Thing3 of type=Stinky

  const thing4 = {
    "type" : "Slippery",
    sayHello(){
      console.log(`I am a ${this.constructor.name} of type=${this.type}`);
    }
  };
  
  console.log(thing4); // {type: 'Slippery', sayHello: ƒ}
  console.log(thing4.sayHello()); // I am a Object of type=Slippery

  console.log(thing);
console.log(thing2);
console.log(thing3);
console.log(thing4);

