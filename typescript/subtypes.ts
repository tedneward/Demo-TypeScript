// {{## BEGIN structural ##}}
let x : { name: string };
let y : { name: string, age: number };
let z : any = {
  name: "Fred",
  lastName: "Flintstone", 
  age: 50000
};

x = { name: "Ted" };
y = { name: "Ted", age: 45 };
x = z; // OK
y = z; // OK
x = y; // OK
//y = x; // Error!
// {{## END structural ##}}

// {{## BEGIN type-assert ##}}
function getNameOrNumber(): string | number {
  return (Date.now() % 2) == 0 ? "String" : 27;
}
let norn = getNameOrNumber();
console.log(norn.valueOf()); // OK
if ((<string>norn).substring)
  console.log((<string>norn).substring(0, 3));
// {{## END type-assert ##}}


class FishBird implements Fish, Bird {
  fly() { console.log("Fly fly"); }
  swim() { console.log("Just keep swimmin'"); }
  layEggs() { console.log("Eggs!"); }
}

//function getSmallPet(): Fish | Bird {
//  return new FishBird();
//}

// {{## BEGIN type-guards ##}}
interface Bird {
  fly(): void;  layEggs(): void;
}
interface Fish {
  swim(): void; layEggs(): void;
}
declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs(); // okay
//pet.swim();  // error
//pet.fly();   // error
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
// {{## END type-guards ##}}

// {{## BEGIN typeof-type-guards ##}}
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
// {{## END typeof-type-guards ##}}

