// {{## BEGIN basics ##}}
interface LabelledValue {
    label: string;
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
// {{## END basics ##}}

// {{## BEGIN optional ##}}
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig) {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
// {{## END optional ##}}

// {{## BEGIN func ##}}
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch : SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  return true; // search in O(1) time
}
// {{## END func ##}}
