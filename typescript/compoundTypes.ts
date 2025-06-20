// {{## BEGIN arrays ##}}
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
  // These are functionally equivalent
// {{## END arrays ##}}

// {{## BEGIN union ##}}
let a : string | number = "a"; // OK
a = 10; // OK
//a = false; // Error!
// {{## END union ##}}

// {{## BEGIN intersect ##}}
type F1 = (a: string, b: string) => void;  
type F2 = (a: number, b: number) => void;

var f: F1 & F2 = 
  (a: string | number, b: string | number) => { };
f("hello", "world");  // OK
f(1, 2);              // OK
//f(1, "test");         // Error!
// {{## END intersect ##}}

// {{## BEGIN tuples ##}}
// Declare a tuple type
let tuple: [string, number];
tuple = ["hello", 10]; // OK
//x = [10, "hello"]; // Error!
console.log(tuple[0].substr(1)); // OK
//console.log(x[1].substr(1)); // Error! 'number' does not have 'substr'
// {{## END tuples ##}}

// {{## BEGIN destruct ##}}
let [first, , third] = list1; // from earlier
console.log(first); // "1"
console.log(third); // "3"

let [str, num] = tuple; // from earlier
console.log(str); // "hello"
console.log(num); // "10"

let numbers = [1, 2, 3, 4, 5];
let [head, ...tail] = numbers;
console.log(head); // "1"
console.log(tail); // "[2, 3, 4, 5]"
// {{## END destruct ##}}

// {{## BEGIN enum ##}}
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
let dir = Direction.Down;

const enum GoodBeverages {
  DietCoke,
  VanillaShake,
  SingleMaltScotch
}
let drink = GoodBeverages.DietCoke; // 0
// {{## END enum ##}}