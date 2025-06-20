namespace classes {

// {{## BEGIN properties ##}}
class Simple {
  constructor(public x: number, public y: number) { }

  get xy() : number { return this.x * this.y; }
  get z() : number { return this.x - this.y; }
  set z(newX: number) { this.x = newX; }
}
let s = new Simple(5,5);
let s_xy = s.xy; // returns 25
let s_z = s.z;   // returns 0
s.z = 24;
console.log(s.x);// prints 24
// {{## END properties ##}}

// {{## BEGIN class ##}}
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(other : Point) : Point {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  get distance () {
    return Math.sqrt(
      (this.x * this.x) + (this.y * this.y)); 
  }
}
let pt = new Point(5,12);
console.log(pt.distance); // 13
// {{## END class ##}}

// {{## BEGIN ctor ##}}
class Person {
  constructor (public firstName : string,
    public lastName : string,
    public age : number) {
      // No body required
    }
}
// {{## END ctor ##}}

// {{## BEGIN prototypes ##}}
let origin = new Point(0,0);
console.log(origin.toString());

console.log("Consulting origin...");
for (let member in origin) {
  // This generates an error under 'strict' but still transpiles and works
  //@ts-ignore
  console.log(member,"=",origin[member]);
}

console.log("Consulting origin prototype...");
let originP = Object.getPrototypeOf(origin);
for (let member of Object.getOwnPropertyNames(originP)) {
  console.log(member,"=",originP[member]);
}
// {{## END prototypes ##}}

// {{## BEGIN inheritance ##}}
class ThreeDPoint extends Point {
  z: number;
  constructor(x: number, y: number, z: number) {
    super(x,y);
    this.z = z;
  }
  get distance () {
    let dist = super.distance;
    return Math.sqrt(
      (dist * dist) + (this.z * this.z)); 
  }
}

let p : Point = new ThreeDPoint(1, 1, 1);
console.log(p.distance);
// {{## END inheritance ##}}
}