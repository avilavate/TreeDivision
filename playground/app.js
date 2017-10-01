var app = (function () {
  var main = null;
  var modules = {
      "require": {
          factory: undefined,
          dependencies: [],
          exports: function (args, callback) { return require(args, callback); },
          resolved: true
      }
  };
  function define(id, dependencies, factory) {
      return main = modules[id] = {
          dependencies: dependencies,
          factory: factory,
          exports: {},
          resolved: false
      };
  }
  function resolve(definition) {
      if (definition.resolved === true)
          return;
      definition.resolved = true;
      var dependencies = definition.dependencies.map(function (id) {
          return (id === "exports")
              ? definition.exports
              : (function () {
                  if(modules[id] !== undefined) {
                    resolve(modules[id]);
                    return modules[id].exports;
                  } else if(id === "d3") {
                    return window["d3"];
                  } else {
                    try {
                      return require(id);
                    } catch(e) {
                      throw Error("module '" + id + "' not found.");
                    }
                  }
              })();
      });
      definition.factory.apply(null, dependencies);
  }
  function collect() {
      Object.keys(modules).map(function (key) { return modules[key]; }).forEach(resolve);
      return (main !== null) 
        ? main.exports
        : undefined
  }

  define("infra/types", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      ;
  });
  define("infra/math", ["require", "exports"], function (require, exports) {
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
      console.dir(exports.binary_seq(10));
      // Real number divisor:
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
      exports.divide = divide;
      divide(10);
      console.log(array);
  });
  define("playground/play", ["require", "exports", "d3"], function (require, exports, d3) {
      "use strict";
      exports.__esModule = true;
      var PlayGround = /** @class */ (function () {
          function PlayGround(noOfProfiles) {
              var _this = this;
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
                      .text(_this.noOfProfiles.toString());
              };
          }
          return PlayGround;
      }());
      exports.PlayGround = PlayGround;
  });
  define("playground/client", ["require", "exports", "playground/play"], function (require, exports, play_1) {
      "use strict";
      exports.__esModule = true;
      function DrawProfile(noOfProfiles) {
          if (noOfProfiles === void 0) { noOfProfiles = 10; }
          var obhPlayGround = new play_1.PlayGround(noOfProfiles);
          obhPlayGround.render();
      }
      exports.DrawProfile = DrawProfile;
  });
  
  return collect(); 
})();