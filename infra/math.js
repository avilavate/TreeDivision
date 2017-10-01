"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binary_seq = (value) => {
    let count = 0;
    let outputs = [];
    while (value > 1) {
        let output = { partition: 0, zoomLevel: 0 };
        value = value / 2;
        count++;
        output.partition = value;
        output.zoomLevel = count;
        outputs.push(output);
    }
    return outputs;
};
console.dir(exports.binary_seq(10));
// Real number divisor:
let array = [];
let count = 0;
function divide(num) {
    if (num === 1 || num == 0)
        return num;
    else {
        if (num % 2 === 0) {
            num = num / 2;
            count = count + 1;
            array.push({ level: count, parts: [num, num] });
            divide(num);
            divide(num);
        }
        else {
            let num1 = Math.floor(num / 2);
            let num2 = Math.floor(num / 2) + 1;
            count = count + 1;
            array.push({ level: count, parts: [num1, num2] });
            divide(num1);
            divide(num2);
        }
    }
}
exports.divide = divide;
divide(10);
console.log(array);
//# sourceMappingURL=math.js.map