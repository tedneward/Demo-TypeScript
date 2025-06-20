// {{## BEGIN basics ##}}
function add1(lhs : number, rhs : number) : number {
  return lhs + rhs;
}
let add2 = function(lhs = 0, rhs = 0) {
  return lhs + rhs; // return type inferred
}
let add3 = function(lhs: number, ...others : number[]) {
  let total = lhs;
  for (let i of others) { total += i }
  return total;
}
function add4(lhs : number, rhs? : number) : number {
  if (rhs)
    return lhs + rhs;
  return lhs;
}
// {{## END basics ##}}

// {{## BEGIN lambdas ##}}
let add5 = function(lhs: number, ...others : number[]) {
  return others.reduce( (prev,curr) => prev + curr);
}
let add6 = (lhs, rhs) => lhs + rhs;
let add7 = (lhs, ...r) => r.reduce ( (prev, curr) => prev, lhs);
// {{## END lambdas ##}}

// {{## BEGIN types ##}}
let add1t : (lhs : number, rhs : number) => number = add1;
let add2t : (l : number, r : number) => number = add2;
let add3t : (lhs : number, ...rest : number[]) => number = add3;
let add4t : (l : number, r? : number) => number = add4;
let add5t : (lhs : number, ...rest : number[]) => number = add5;
// {{## END types ##}}
