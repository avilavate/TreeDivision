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
      ;
  });
  define("infra/math", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      exports.binary_seq = function (value) {
          var count = 0;
          var outputs = [];
          while (value > 1) {
              var output = { partition: [0], zoomLevel: 0 };
              value = value / 2;
              count++;
              output.partition = [value];
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
                  array.push({ level: count, value: val, parts: [num, num] });
                  divide(num);
                  divide(num);
              }
              else {
                  var value = num;
                  var num1 = Math.floor(num / 2);
                  var num2 = Math.floor(num / 2) + 1;
                  count = count + 1;
                  array.push({ level: count, value: value, parts: [num1, num2] });
                  divide(num1);
                  divide(num2);
              }
          }
          // return null;
      }
      exports.divide = divide;
      exports.getNextPartitions = function (num) {
          if (num === 1 || num == 0) {
              return { partitions: [num, 0] };
          }
          else {
              if (num % 2 === 0) {
                  var val = num;
                  num = num / 2;
                  return { partitions: [num, num] };
              }
              else {
                  var value = num;
                  var num1 = Math.floor(num / 2);
                  var num2 = Math.floor(num / 2) + 1;
                  return { partitions: [num1, num2] };
              }
          }
      };
      console.log(divide(10));
  });
  //console.log(array); 
  define("playground/play", ["require", "exports", "infra/math", "d3"], function (require, exports, math_1, d3) {
      "use strict";
      exports.__esModule = true;
      var PlayGround = /** @class */ (function () {
          function PlayGround(noOfProfiles) {
              var _this = this;
              this.noOfProfiles = noOfProfiles;
              this.getParts = function (part) {
                  return math_1.getNextPartitions(part);
              };
              this.getNumberofGroups = function () {
                  d3.select("svg").remove();
                  if (_this.noOfProfiles == 0 || _this.noOfProfiles == 1) {
                      if (PlayGround.intermediateZoomedProfiles.zoomLevel === 0) {
                          PlayGround.intermediateZoomedProfiles.zoomLevel = PlayGround.intermediateZoomedProfiles.zoomLevel + 1;
                          PlayGround.intermediateZoomedProfiles.partition = [_this.noOfProfiles];
                      }
                      return PlayGround.intermediateZoomedProfiles.partition;
                  }
                  else {
                      var groupPartitions = math_1.getNextPartitions(_this.noOfProfiles);
                      PlayGround.intermediateZoomedProfiles = {
                          partition: groupPartitions.partitions,
                          zoomLevel: PlayGround.intermediateZoomedProfiles.zoomLevel + 1
                      };
                      try {
                          groupPartitions.partitions.forEach(function (partition) {
                              _this.render(partition);
                          });
                      }
                      catch (e) {
                          console.log("Can't render: " + e);
                      }
                  }
              };
              this.render = function (groupPartition) {
                  if (groupPartition === void 0) { groupPartition = 0; }
                  console.log(groupPartition);
                  var circle = d3.select("div").append("svg");
                  circle.append("circle")
                      .attr("cx", 65)
                      .attr("cy", 65)
                      .attr("r", 30)
                      .attr('fill', 'none')
                      .attr('stroke', '#008080');
                  circle.append('text')
                      .attr('x', 65)
                      .attr('y', 65)
                      .text(groupPartition.toString());
              };
          }
          PlayGround.intermediateZoomedProfiles = { partition: [0], zoomLevel: 0 };
          return PlayGround;
      }());
      exports.PlayGround = PlayGround;
  });
  define("playground/client", ["require", "exports", "playground/play", "d3"], function (require, exports, play_1, d3) {
      "use strict";
      exports.__esModule = true;
      function Reset() {
          window.location.href = window.location.href;
      }
      exports.Reset = Reset;
      function DrawProfile() {
          var parseElement = (document.getElementById("profiles"));
          var parseCheck = (document.getElementById("relative"));
          console.log(parseCheck.value);
          var profiles = !!parseElement ? parseInt(parseElement.value) : 0;
          var subsequentPartitions = [0];
          var objPlayGround = new play_1.PlayGround(profiles);
          d3.select("svg").remove();
          var myNode = document.getElementById("content");
          myNode.innerHTML = '';
          if (play_1.PlayGround.intermediateZoomedProfiles.zoomLevel === 0) {
              d3.select("svg").remove();
              var parts = objPlayGround.getParts(profiles);
              parts.partitions.forEach(function (p) {
                  if (p !== 0)
                      objPlayGround.render(p);
              });
              play_1.PlayGround.intermediateZoomedProfiles.partition = parts.partitions;
              play_1.PlayGround.intermediateZoomedProfiles.zoomLevel++;
              //subsequentPartitions = objPlayGround.getNumberofGroups();
          }
          else {
              d3.select("svg").remove();
              d3.select(".graph").selectAll("*").remove();
              var myNode = document.getElementById("content");
              myNode.innerHTML = '';
              console.log(play_1.PlayGround.intermediateZoomedProfiles);
              var zoomPartViews_1 = [];
              play_1.PlayGround.intermediateZoomedProfiles.partition.forEach(function (p) {
                  if (p !== 0)
                      zoomPartViews_1.push(objPlayGround.getParts(p));
              });
              play_1.PlayGround.intermediateZoomedProfiles.zoomLevel++;
              play_1.PlayGround.intermediateZoomedProfiles.partition = new Array();
              d3.select("svg").remove();
              zoomPartViews_1.forEach(function (z) {
                  z.partitions.forEach(function (a) {
                      if (a !== 0)
                          play_1.PlayGround.intermediateZoomedProfiles.partition.push(a);
                  });
              });
              d3.select("svg").remove();
              var myNode = document.getElementById("content");
              myNode.innerHTML = '';
              play_1.PlayGround.intermediateZoomedProfiles.partition.forEach(function (p) {
                  if (p !== 0)
                      objPlayGround.render(p);
              });
          }
      }
      exports.DrawProfile = DrawProfile;
  });
  
  return collect(); 
})();