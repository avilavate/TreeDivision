//Equal division:
import { IZoomView, IZoomViewPartitions } from './types';

export let binary_seq = (value: number): Array<any> => {
    let count: number = 0;
    let outputs: Array<any> = [];
    while (value > 1) {
        let output: IZoomView = { partition: 0, zoomLevel: 0 };
        value = value / 2;
        count++;
        output.partition = value;
        output.zoomLevel = count;
        outputs.push(output);
    }
    return outputs;
}

let array: Array<any> = [];
let count = 0;
export function divide(num: number): any {
    if (num === 1 || num == 0) { return { partitions: [num, 0] } }
    else {
        if (num % 2 === 0) {
            let val = num;
            num = num / 2;
            count = count + 1;

            array.push({ level: count, value: val, parts: [num, num] });
            divide(num);
            divide(num);
        }
        else {
            let value = num;
            let num1 = Math.floor(num / 2);
            let num2 = Math.floor(num / 2) + 1;
            count = count + 1;

            array.push({ level: count, value: value, parts: [num1, num2] });
            divide(num1);
            divide(num2);
        }
    }
    // return null;
}
export let getNextPartitions = (num: number): IZoomViewPartitions => {
    if (num === 1 || num == 0) { return { partitions: [num, 0] } }
    else {
        if (num % 2 === 0) {
            let val = num;
            num = num / 2;
            return { partitions: [num, num] };
        }
        else {
            let value = num;
            let num1 = Math.floor(num / 2);
            let num2 = Math.floor(num / 2) + 1;
            return { partitions: [num1, num2] };
        }
    }
};
console.log(divide(10));
//console.log(array);