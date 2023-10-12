class Thing{
    constructor(type){
      this.type = type;
    }
    sayHello(){
      console.log(`I am a ${this.constructor.name} of type=${this.type}`);
    }
  }
  
  // NEW
  class AlienThing extends Thing{
    constructor(type, alignment){
      super(type); // call superclass constructor in Thing
      this.alignment = alignment;
    }
    fireDeathRay(){
       console.log(`Feel the power of my ${this.alignment} ray!`);
    }
  }
  
  let alien = new AlienThing("Slinky","Evil");
  console.log(alien); // AlienThing {type: 'Slinky', alignment: 'Evil'}
  console.log(alien.sayHello()); // I am a AlienThing of type=Slinky
  console.log(alien.fireDeathRay()); // Feel the power of my Evil ray!