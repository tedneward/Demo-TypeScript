import { Person } from "./exports.js";

// {{## BEGIN polymorphic-this-1 ##}}
class BasicCalculator {
  public constructor(protected value: number = 0) { }
  public currentValue(): number { return this.value; }
  public add(operand: number): this { 
      this.value += operand;
      return this;
  }
  public multiply(operand: number): this {
      this.value *= operand;
      return this;
  }
};
let v1 = new BasicCalculator(2)
          .multiply(5)
          .add(1)
          .currentValue();
// {{## END polymorphic-this-1 ##}}

// {{## BEGIN polymorphic-this-2 ##}}
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
      super(value);
  }
  public sin() {
      this.value = Math.sin(this.value);
      return this;
  }
}

let v2 = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
// {{## END polymorphic-this-2 ##}}

namespace mappedTypes {

// {{## BEGIN mapped ##}}
interface Person {    // interface PartialPerson {
  name: string;       //    name?: string;
  age: number;        //    age?: number;
  location: string;   //     location?: string;
}                     // }

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PartialPerson = Partial<Person>;
// {{## END mapped ##}}

// {{## BEGIN mapped-examples ##}}
// Keep types the same, but make each property to be read-only.
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Same property names, but make the value a promise instead of a concrete one
type Deferred<T> = {
  [P in keyof T]: Promise<T[P]>;
};

// Wrap proxies around properties of T
type Proxify<T> = {
  [P in keyof T]: { get(): T[P]; set(v: T[P]): void }
};
// {{## END mapped-examples ##}}

// {{## BEGIN mapped-library ##}}
// These are in the standard library
declare function assign<T>(obj: T, props: Partial<T>): void;
declare function freeze<T>(obj: T): Readonly<T>;

// From T pick a set of properties K
declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;

// For every properties K of type T, transform it to U
declare function mapObject<K extends string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

let person = { name: "Fred", age: 42, location: "Bedrock" };
const nameAndAgeOnly = pick(person, "name", "age");  // { name: string, age: number }
const names = { foo: "hello", bar: "world", baz: "bye" };
const lengths = mapObject(names, s => s.length);  // { foo: number, bar: number, baz: number }
// {{## END mapped-library ##}}

}


// {{## BEGIN alias-union ##}}
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}
// {{## END alias-union ##}}

// {{## BEGIN discrim-unions ##}}
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
type Shape = Square | Rectangle;

function area(s : Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size; 
    case "rectangle": return s.width * s.height;
    default: const _err : never = s;
  }
}
// {{## END discrim-unions ##}}

/*
// {{## BEGIN mixin ##}}
type LinkedList<T> = T & { next: LinkedList<T> };

interface Named {
  name: string;
}

let people: LinkedList<Named> = ... ;
let s1 = people.name;
let s2 = people.next.name;
let s3 = people.next.next.name;
let s4 = people.next.next.next.name;
// {{## END mixin ##}}
*/

// {{## BEGIN recursive ##}}
type Container<T> = { value: T };

type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
// {{## END recursive ##}}

// {{## BEGIN mixins-1 ##}}
class Loggable {
  logger : (message? : any, ...optionalParams : any[]) => void = 
    console.log;

  log() {
    if (this.logger === undefined)
      this.logger = console.log;

    this.logger("Logging:");
    for (let m of Object.getOwnPropertyNames(this)) {
        this.logger(m,"=",this[m]);
    }
    this.logger("\n");
  }
}
// {{## END mixins-1 ##}}

// {{## BEGIN mixins-2 ##}}
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(
            baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = 
                    baseCtor.prototype[name];
        });
    });
}
// {{## END mixins-2 ##}}

// {{## BEGIN mixins-3 ##}}
class Person implements Loggable {
  firstName: string;
  lastName: string;
  constructor(f, l) {
    this.firstName = f;
    this.lastName = l;
  }

  logger : () => void;
  log : () => void;
}
applyMixins(Person, [Loggable]);

let p = new Person("Ted", "Neward");
p.log();
// {{## END mixins-3 ##}}

