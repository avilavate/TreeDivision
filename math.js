var binary_seq = function (value) {
    var count = 0;
    var outputs = [];
    while (value > 1) {
        var output = { partition: 0, level: 0 };
        value = value / 2;
        count++;
        output.partition = value;
        output.level = count;
        outputs.push(output);
    }
    return outputs;
};
console.dir(binary_seq(128));
