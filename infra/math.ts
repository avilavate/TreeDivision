//Equal division:
import {IZoomView} from './types';

export let binary_seq = (value: number): Array<any> => {
    let count:number=0;
    let outputs: Array<any> = [];
    while (value > 1) {
        let output: IZoomView = { partition: 0, zoomLevel: 0 };
        value = value/2;
        count++;
        output.partition = value;
        output.zoomLevel = count;
        outputs.push(output);
    }
    return outputs;
}

console.dir(binary_seq(10))

// Real number divisor:

let array:Array<any> = [];
let count = 0;
export function divide(num:number) {
    if (num === 1 || num == 0) return num;
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

divide(10);
console.log(array);