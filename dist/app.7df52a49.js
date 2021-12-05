// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"N3T3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HUNTER_RADIUS = exports.HUNTER_SPEED = exports.GRID_COUNT = exports.GRID_WIDTH = exports.BG_COLOR = exports.UPDATE_FPS = exports.SCALE = exports.FIELD_HEIGHT = exports.FIELD_WIDTH = void 0;
exports.FIELD_WIDTH = 4000;
exports.FIELD_HEIGHT = 4000;
exports.SCALE = 1;
exports.UPDATE_FPS = 30;
exports.BG_COLOR = 'green';
exports.GRID_WIDTH = 300;
exports.GRID_COUNT = exports.FIELD_WIDTH / 2 / exports.GRID_WIDTH;
exports.HUNTER_SPEED = 15;
exports.HUNTER_RADIUS = 30;
},{}],"WCFg":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec2 = void 0;

var Vec2 = /*#__PURE__*/function () {
  function Vec2(x, y) {
    _classCallCheck(this, Vec2);

    this.x = x;
    this.y = y;
  }

  _createClass(Vec2, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "move",
    value: function move(x, y) {
      this.x += x;
      this.y += y;
    }
  }, {
    key: "add",
    value: function add(v) {
      return new Vec2(this.x + v.x, this.y + v.y);
    }
  }, {
    key: "sub",
    value: function sub(v) {
      return new Vec2(this.x - v.x, this.y - v.y);
    }
  }, {
    key: "mul",
    value: function mul(s) {
      return new Vec2(this.x * s, this.y * s);
    }
  }, {
    key: "length",
    get: function get() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec2(this.x, this.y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "(".concat(this.x, ", ").concat(this.y, ")");
    }
  }, {
    key: "equal",
    value: function equal(v) {
      return this.x === v.x && this.y === v.y;
    }
  }, {
    key: "unit",
    get: function get() {
      return this.length ? this.mul(1 / this.length) : new Vec2(0, 0);
    }
  }]);

  return Vec2;
}();

exports.Vec2 = Vec2;
},{}],"ReYC":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var constants_1 = require("./constants");

var Player = /*#__PURE__*/function () {
  function Player(_ref) {
    var position = _ref.position,
        ctx = _ref.ctx;

    _classCallCheck(this, Player);

    this.id = Math.random() * 100000;
    this.color = "hsl(".concat(Math.random() * 360, ",60%,50%)");
    this.isAlive = true;
    this.speed = constants_1.HUNTER_SPEED;
    this.radius = constants_1.HUNTER_RADIUS;
    this.position = position;
    this.ctx = ctx;
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }, {
    key: "update",
    value: function update(v) {
      if (v) {
        this.position.move(v.x, v.y);
        this.checkBoundary();
      }
    }
  }, {
    key: "checkBoundary",
    value: function checkBoundary() {
      if (this.position.x - this.radius < -constants_1.FIELD_WIDTH / 2 || this.position.x + this.radius > constants_1.FIELD_WIDTH / 2 || this.position.y - this.radius < -constants_1.FIELD_HEIGHT / 2 || this.position.y + this.radius > constants_1.FIELD_HEIGHT / 2) {
        this.isAlive = false;
      }
    }
  }]);

  return Player;
}();

exports.Player = Player;
},{"./constants":"N3T3"}],"Ws3s":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("./constants");

var vector_1 = require("./vector");

var player_1 = require("./player");

var isMousePressed = false;
var KeyCodsDirectionCorrespondence = {
  65: new vector_1.Vec2(-10, 0),
  87: new vector_1.Vec2(0, -10),
  68: new vector_1.Vec2(10, 0),
  83: new vector_1.Vec2(0, 10) // s

};
var currentDirections = new Map();
var visibleWidth = window.innerWidth;
var visibleHeight = window.window.innerHeight;
var hunter = null;
var canvas = document.getElementById('game-field');
var ctx = canvas.getContext('2d');
var hunterPosition = new vector_1.Vec2(0, 0);
var mousePos = new vector_1.Vec2(0, 0);

var drawCircle = function drawCircle(vector, radius) {
  ctx === null || ctx === void 0 ? void 0 : ctx.arc(vector.x, vector.y, radius, 0, Math.PI * 2);
};

var drawLine = function drawLine(vectorStart, vectorEnd) {
  ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(vectorStart.x, vectorStart.y);
  ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(vectorEnd.x, vectorEnd.y);
};

function draw() {
  var _hunter, _hunter2;

  ctx.fillStyle = constants_1.BG_COLOR;
  ctx.fillRect(0, 0, visibleWidth, visibleHeight);
  hunterPosition = hunter.position;
  ctx.save();
  ctx.translate(visibleWidth / 2, visibleHeight / 2);
  ctx.scale(constants_1.SCALE, constants_1.SCALE);
  ctx.translate(-hunterPosition.x, -hunterPosition.y);
  ctx.beginPath();

  for (var i = -constants_1.GRID_COUNT; i <= constants_1.GRID_COUNT; i++) {
    ctx.moveTo(i * constants_1.GRID_WIDTH, -constants_1.FIELD_WIDTH / 2);
    ctx.lineTo(i * constants_1.GRID_WIDTH, constants_1.FIELD_WIDTH / 2);
    ctx.moveTo(-constants_1.FIELD_HEIGHT / 2, i * constants_1.GRID_WIDTH);
    ctx.lineTo(constants_1.FIELD_HEIGHT / 2, i * constants_1.GRID_WIDTH);
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.stroke();

  if ((_hunter = hunter) !== null && _hunter !== void 0 && _hunter.isAlive) {
    hunter.draw();
  } else {
    alert('game over');
  }

  ctx.restore();
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.fillStyle = 'red';
  ctx.beginPath();
  drawCircle(mousePos, 2);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  ctx.translate(mousePos.x, mousePos.y);
  ctx.strokeStyle = 'red';
  var len = 20;
  drawLine(new vector_1.Vec2(-len, 0), new vector_1.Vec2(len, 0));
  drawLine(new vector_1.Vec2(0, -len), new vector_1.Vec2(0, len));
  ctx.stroke();
  ctx.restore();

  if ((_hunter2 = hunter) !== null && _hunter2 !== void 0 && _hunter2.isAlive) {
    requestAnimationFrame(draw);
  }
}

var init = function init() {
  hunter = new player_1.Player({
    position: new vector_1.Vec2(constants_1.FIELD_WIDTH / 4, constants_1.FIELD_HEIGHT / 4),
    ctx: ctx
  });
};

var initCanvas = function initCanvas() {
  visibleWidth = canvas.width = window.innerWidth;
  visibleHeight = canvas.height = window.innerHeight;
};

function update() {
  var delta = null;

  if (currentDirections.size) {
    var moveVector = Array.from(currentDirections.values()).reduce(function (acc, currentVector) {
      return acc.add(currentVector);
    });
    delta = moveVector.unit.mul(hunter.speed);
  } else if (isMousePressed) {
    delta = mousePos.sub(new vector_1.Vec2(visibleWidth / 2, visibleHeight / 2)).unit.mul(hunter.speed);
  }

  if (delta) {
    hunter.update(delta);
  }
}

var onLoad = function onLoad() {
  initCanvas();
  init();
  requestAnimationFrame(draw);
  setInterval(update, 1000 / constants_1.UPDATE_FPS);
};

var onMouseMove = function onMouseMove(evt) {
  mousePos.set(evt.x, evt.y);
};

var onKeyDown = function onKeyDown(e) {
  if (!currentDirections.has(e.keyCode)) {
    currentDirections.set(e.keyCode, KeyCodsDirectionCorrespondence[e.keyCode]);
  }
};

var onKeyUp = function onKeyUp(e) {
  currentDirections.delete(e.keyCode);
};

var onMouseDown = function onMouseDown() {
  isMousePressed = true;
};

var onMouseUp = function onMouseUp() {
  isMousePressed = false;
};

window.addEventListener('load', onLoad);
window.addEventListener('resize', initCanvas);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
},{"./constants":"N3T3","./vector":"WCFg","./player":"ReYC"}]},{},["Ws3s"], null)
//# sourceMappingURL=app.7df52a49.js.map