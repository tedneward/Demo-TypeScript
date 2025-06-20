// {{## BEGIN simple ##}}
// this only works in --target ES2015
function* names() {
  yield "Ted";
  yield "Charlotte";
  yield "Michael";
  yield "Matthew";
}
for (let name of names()) {
  console.log(name);
}
// {{## END simple ##}}

// {{## BEGIN infinite ##}}
// this only works in --target ES2015
function* infiniteSequence() {
    var i = 0;
    while(true) {
        yield i++;
    }
}

for (let i of infiniteSequence()) {
  console.log(i);
}
// {{## END infinite ##}}