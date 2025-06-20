namespace Generics {

namespace identity1 {
// {{ ## BEGIN identity-1 ##}}
//Simple identity function
function identity(arg: number): number {
    return arg;
}
let x = identity(5); // returns a "number" holding 5
// {{ ## END identity-1 ##}}
}

namespace identity2 {
// {{ ## BEGIN identity-2 ##}}
//Simple identity function
function identity(arg: any): any {
    return arg;
}
let x1 = identity(5); // returns a "any" holding 5
let x2 = identity("5"); // returns a "any" holding "5"
x1 = x2;   // NOOOOOOOOoooooooo.......
// {{ ## END identity-2 ##}}
}

namespace identity3 {
// {{ ## BEGIN identity-3 ##}}
//Simple identity function
function identity<T>(arg: T): T {
    return arg;
}
let x1 = identity<number>(5);   // returns a "number" holding 5
let x2 = identity<string>("5"); // returns a "string" holding "5"
let x3 = identity("5");         // returns a "string" holding "5"
//x1 = x2;  // ERROR! Yay!
x2 = x3;    // Yes! both strings
// {{ ## END identity-3 ##}}

// {{## BEGIN identity-4 ##}}
let myIdentity: <T>(arg: T) => T = identity
let x4 = myIdentity(5.0);       // returns a "number" holding 5.0
x1 = x4;   // Yes! both numbers

let myOtherIdentity: <U>(arg: U) => U = identity
let myThirdIdentity: {<T>(arg: T): T} = identity;
// {{## END identity-4 ##}}
}

namespace identityitfclass {
// {{## BEGIN interface ##}}
interface GenericIdentityFn {
    <T>(arg: T): T;
}
interface GenericIdentityFn2<T> {
    (arg: T): T;
}
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn = identity
let myOtherIdentity: GenericIdentityFn2<number> = identity
// {{## END interface ##}}

// {{## BEGIN class ##}}
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
// {{## END class ##}}
}

namespace constraints {
// {{## BEGIN constraints ##}}
//function loggingIdentity<T>(arg: T): T {
//    console.log(arg.length);  // Error: T doesn't have .length
//    return arg;
//}
interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
//loggingIdentity(5);     // Error: number doesn't have .length
loggingIdentity([1,2,3]); // Array<number> has a .length
// {{## END constraints ##}}

// {{## BEGIN constraints-2 ##}}
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
//getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'

// reqiures a constructor function that takes no arguments
function create<T>(c: {new(): T; }): T {
    return new c();
}
// {{## END constraints-2 ##}}
}

namespace parameterDefaults {
// {{## BEGIN defaults ##}}
class Names<T = string> {
    constructor(public data : Array<T>) { }
}
class Name { constructor(public segments: string[]) { } }
const simpleNames = new Names(["Sonny", "Cher", "Bomo"]);
const complexNames = new Names<Name>([new Name(["Fred", "Flintstone"])]);
// {{## END defaults ##}}
}

namespace conditionalTypes {
// {{## BEGIN conditionals ##}}
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
        "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"
// {{## END conditionals ##}}
}

}
