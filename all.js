System.register("infra/types", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("infra/config", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Levels, PositionMAp, ZoomsSupported;
    return {
        setters: [],
        execute: function () {
            exports_2("Levels", Levels = 3); //zero indexedDB
            exports_2("PositionMAp", PositionMAp = [
                { NoOfProfiles: 2, Position: { level: 0, quadrant: null } },
                { NoOfProfiles: 4, Position: { level: 1, quadrant: 1 } },
                { NoOfProfiles: 4, Position: { level: 1, quadrant: 2 } },
                { NoOfProfiles: 4, Position: { level: 1, quadrant: 3 } },
                { NoOfProfiles: 4, Position: { level: 1, quadrant: 4 } }
            ]);
            exports_2("ZoomsSupported", ZoomsSupported = 5); //How many times pinch and zoom supported?
        }
    };
});
System.register("infra/math", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
    exports_3("divide", divide);
    var binary_seq, array, count;
    return {
        setters: [],
        execute: function () {
            exports_3("binary_seq", binary_seq = function (value) {
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
            });
            console.dir(binary_seq(10));
            // Real number divisor:
            array = [];
            count = 0;
            divide(10);
            console.log(array);
        }
    };
});
System.register("playground/play", ["d3"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var d3, PlayGround;
    return {
        setters: [
            function (d3_1) {
                d3 = d3_1;
            }
        ],
        execute: function () {
            PlayGround = /** @class */ (function () {
                function PlayGround(noOfProfiles) {
                    this.noOfProfiles = noOfProfiles;
                    this.render = function () {
                        var circle = d3.select("body").append("svg");
                        circle.append("circle")
                            .attr("cx", 65)
                            .attr("cy", 65)
                            .attr("r", 30)
                            .attr('fill', 'none')
                            .attr('stroke', '#008080');
                        //  .attr('class', 'ourmission')
                        circle.append('text')
                            .attr('x', 65)
                            .attr('y', 65)
                            .text('128');
                    };
                }
                return PlayGround;
            }());
        }
    };
});
