"use strict";
exports.__esModule = true;
var binary_seq = function (value) {
    var count = 0;
    var outputs = [];
    while (value > 1) {
        var output = { partition: 0, zoomLevel: 0 };
        value = value / 2;
        count++;
        output.partition = value;
        output.zoomLevel = count;
        outputs.push(output);
    }
    return outputs;
};
console.dir(binary_seq(10));
var array = [];
var count = 0;
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
            var num1 = Math.floor(num / 2);
            var num2 = Math.floor(num / 2) + 1;
            count = count + 1;
            array.push({ level: count, parts: [num1, num2] });
            divide(num1);
            divide(num2);
        }
    }
}
divide(10);
console.log(array);
//# sourceMappingURL=math.js.map