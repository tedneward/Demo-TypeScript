// {{## BEGIN for ##}}
for (let i=0; i<10; i++) {
    console.log(i); // 0, 1, 2, 3, 4 ... 9
}

let pets = new Set(["Cat", "Dog", "Hamster"]);
// This generates an error under 'strict' but still transpiles and works
//@ts-ignore
pets["species"] = "mammals";

for (let pet in pets) {
   console.log(pet); // "species"
}
for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}
// {{## END for ##}}

// {{## BEGIN if ##}}
// {{## END if ##}}

// {{## BEGIN try-catch-finally ##}}
// {{## END try-catch-finally ##}}

