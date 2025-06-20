namespace opening { // {{## BEGIN opening ##}}
function Greeter(greeting) {
  this.greeting = greeting;
}

Greeter.prototype.greet = function() {
  return "Hello, " + this.greeting;
}

var greeter = new Greeter("world");
console.log(greeter.greet());
// {{## END opening ##}}
}

namespace types { // {{## BEGIN types ##}}
function Greeter(greeting : string) { // <====
  this.greeting = greeting;
}

Greeter.prototype.greet = function() {
  return "Hello, " + this.greeting;
}

var greeter = new Greeter("world");
//var greeter2 = new Greeter({message: "world"});
/*
types.ts(12,20): error TS2082: Supplied parameters do not match any signature
  of call target:
Could not apply type 'string' to argument 1 which is of
  type '{ message: string; }'.
error TS2085: Could not select overload for 'new' expression.
 */

console.log(greeter.greet());
// {{## END types ##}}
}

namespace structTypes { // {{## BEGIN structTypes ##}}
class Pair<T1,T2> { first: T1; second: T2; }

var pair1 = new Pair<string, number>();
pair1.first = "Fred"; pair1.second = 27;

var pair2 : { first: string; second: number };
pair2 = pair1;  // legal
// {{## END structTypes ##}}
}

namespace classes { // {{## BEGIN classes ##}}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

var greeter = new Greeter("world");
console.log(greeter.greet());
// {{## END classes ##}}
}

namespace lambdas { // {{## BEGIN lambdas ##}}
class Greeter {
  constructor(public message: string) { }
  greet(out: (msg:string) => void) {
    out(this.message);
  }
}

var greeter = new Greeter("Hello, world")
console.log(greeter.message)
greeter.greet(console.log)
// {{## END lambdas ##}}
}

namespace modules {
// {{## BEGIN modules ##}}
module Sayings {
    export class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }
}
var greeter = new Sayings.Greeter("world");
// {{## END modules ##}}
/*
// {{## BEGIN modules-js ##}}
var Sayings;
(function (Sayings) {
    var Greeter = (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello, " + this.greeting;
        };
        return Greeter;
    })();
    Sayings.Greeter = Greeter;
})(Sayings || (Sayings = {}));
var greeter = new Sayings.Greeter("world");
// {{## END modules-js ##}}
*/
}

namespace inherits { // {{## BEGIN inherits ##}}
class Animal {
    constructor(public name: string) { }
    move(meters: number) {
        console.log(this.name + " moved " + meters + "m.");
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move() {
        console.log("Slithering...");
        super.move(5);
    }
}

var sam = new Snake("Sammy the Python");
sam.move();
// {{## END inherits ##}}
}

namespace generics { // {{## BEGIN generics ##}}
class Greeter<T> {
    greeting: T;
    constructor(message: T) {
        this.greeting = message;
    }
    greet() {
        return this.greeting;
    }
}

var greeter = new Greeter<string>("Hello, world");
var numGreeter = new Greeter<number>(5);
console.log(greeter.greet());   // "Hello, world"
var silly = numGreeter.greet() + 5;
console.log(silly);             // 10
// {{## END generics}}
}
