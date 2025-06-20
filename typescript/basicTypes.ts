// {{## BEGIN basic ##}}
let isDone: boolean = false;

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`
// {{## END basic ##}}

// {{## BEGIN nullable ##}}
// turn on --strictNullChecks
//let foo1: string = null; // Error!
let foo2: string | null = null; // OK

let strs: string[] | undefined;
//let upperCased = strs.map(s => s.toUpperCase());
  // Error! 'strs' is possibly undefined

let lowerCased = strs!.map(s => s.toLowerCase());
  // OK: 'strs' cannot be undefined
// {{## END nullable ##}}

// {{## BEGIN string-literal ##}}
type Music = "metal" | "punk" | "jazz" | "symphonic";
let m : Music = "metal"; // OK
//m = "rap"; // Error!
// {{## END string-literal ##}}
