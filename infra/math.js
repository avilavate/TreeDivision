"use strict";
exports.__esModule = true;
exports.binary_seq = function (value) {
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
var array = [];
var count = 0;
function divide(num) {
    if (num === 1 || num == 0) {
        return { partitions: [num, 0] };
    }
    else {
        if (num % 2 === 0) {
            var val = num;
            num = num / 2;
            count = count + 1;
            return { partitions: [num, num] };
            // array.push({ level: count, value:val, parts: [num, num] });
            //divide(num);
            //divide(num);
        }
        else {
            var value = num;
            var num1 = Math.floor(num / 2);
            var num2 = Math.floor(num / 2) + 1;
            count = count + 1;
            return { partitions: [num1, num2] };
            // array.push({ level: count,value:value, parts: [num1, num2] });
            //divide(num1);
            //divide(num2);
        }
    }
    // return null;
}
exports.divide = divide;
console.log(divide(10));
//console.log(array); 
