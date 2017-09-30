interface IZoomView { partition: number, level: number }

var binary_seq = (value: number): Array<any> => {
    let count:number=0;
    let outputs: Array<any> = [];
    while (value > 1) {
        let output: IZoomView = { partition: 0, level: 0 };
        value = value / 2;
        count++;
        output.partition = value;
        output.level = count;
        outputs.push(output);
    }

    return outputs;
}

console.dir(binary_seq(128))