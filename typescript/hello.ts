// {{## BEGIN boring ##}}
console.log("Hello, world!");
// {{## END boring ##}}

// {{## BEGIN typescript-hello ##}}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
// {{## END typescript-hello ##}}
