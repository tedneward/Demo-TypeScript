// {{## BEGIN decls ##}}
var v_hello = "Hello";
let l_hello = "Hello";
const c_hello = "Hello";
// {{## END decls ##}}

// {{## BEGIN scoping ##}}
// Function scope
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
   return sum;
}
// {{## END scoping ##}}