namespace Decorators {

function loggedMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = originalMethod.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}

function bound(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = context.name;
    if (context.private) {
        throw new Error(`'bound' cannot decorate private properties like ${methodName as string}.`);
    }
    context.addInitializer(function () {
        this[methodName] = this[methodName].bind(this);
    });
}



class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @bound
    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const p = new Person("Ron");
p.greet();



// {{## BEGIN simple ##}}
function example(target: any) {
    console.log("Do something with 'target'", target);
}

@example
class Example1 { }

let e1 = new Example1();
    // prints "Do something with 'target' class Example1 { }"
// {{## END simple ##}}

namespace classExample {
// {{## BEGIN class ##}}
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
@sealed     // Greeter is Object.seal()'ed on definition
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
// {{## END class ##}}
}

// {{## BEGIN overriding-constructor ##}}
function classDecorator<T extends {new(...args:any[]):{}}> (constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;

    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
// {{## END overriding-constructor ##}}

namespace methodExample {
// {{## BEGIN method ##}}
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {  // will no longer be seen when enumerating Greeter instances
        return "Hello, " + this.greeting;
    }
}
// {{## END method ##}}
}

namespace accessorExample {
// {{## BEGIN accessor ##}}
function trace(message: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let getter = descriptor.get || function() { };
        descriptor.get = function() { 
            console.log(propertyKey, ":", message);
            return getter.call(this);
        }
    };
}
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) { this._x = x; this._y = y; }

    @trace("x") get x() { return this._x; }
    @trace("y") get y() { return this._y; }
}
let pt = new Point(5, 5);
console.log(pt.x, pt.y);
console.log(pt.x, pt.y);
// {{## END accessor ##}}
}

namespace propertyExample {
// {{## BEGIN property ##}}
function trace(message: string) {
    return function(target: any, name: string) { console.log(name, message, target); }
}
class Point {
    @trace("accessed") x: number
    @trace("accessed") y: number

    constructor(xx: number, yy: number) {
        this.x = xx; this.y = yy;
    }
}
let pt = new Point(3, 5);
console.log("pt.x", pt.x, "pt.y", pt.y);
pt.x = 12; pt.y = 17;
console.log("pt.x", pt.x, "pt.y", pt.y);
// {{## END property ##}}
}

// {{## BEGIN factories ##}}
function color(value: string) {
    console.log("color factory called with", value);
    return function(target: any) {
        console.log(target, "has the color", value);
    }
}

@color("blue")
class Example2 { }
// {{## END factories ##}}

// {{## BEGIN composition ##}}
function f() {
    console.log("f(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called", propertyKey, descriptor);
    }
}
function g() {
    console.log("g(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called", propertyKey, descriptor);
    }
}
class C {
    @f() @g() method() { console.log("method called"); }
}
let c = new C();
c.method();
// {{## END composition ##}}

}
