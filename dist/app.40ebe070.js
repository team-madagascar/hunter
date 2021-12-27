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
exports.FIELD_WIDTH = 10000;
exports.FIELD_HEIGHT = 10000;
exports.SCALE = 1;
exports.UPDATE_FPS = 30;
exports.BG_COLOR = 'green  ';
exports.GRID_WIDTH = 150;
exports.GRID_COUNT = exports.FIELD_WIDTH / 2 / exports.GRID_WIDTH;
exports.HUNTER_SPEED = 1000;
exports.HUNTER_RADIUS = 20;
},{}],"ZAu6":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;
/**
 * Represent point and vector
 */

var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: "negate",
    value: function negate() {
      return Point.of(-this.x, -this.y);
    }
  }, {
    key: "add",
    value: function add(p) {
      if (p instanceof Point) return Point.of(p.x + this.x, p.y + this.y);
      return Point.of(this.x + p, this.y + p);
    }
  }, {
    key: "divide",
    value: function divide(p) {
      if (p instanceof Point) return Point.of(this.x / p.x, this.y / p.y);
      return Point.of(this.x / p, this.y / p);
    }
  }, {
    key: "subtract",
    value: function subtract(p) {
      if (p instanceof Point) return Point.of(this.x - p.x, this.y - p.y);
      return Point.of(this.x - p, this.y - p);
    }
  }, {
    key: "angle",
    value: function angle(v) {
      return Math.acos(this.dot(v) / (this.length * v.length));
    }
    /**
     * Скалярное произведение
     */

  }, {
    key: "dot",
    value: function dot(point) {
      return this.x * point.x + this.y * point.y;
    }
    /**
     * Единичный вектор
     */

  }, {
    key: "unit",
    value: function unit() {
      return this.length ? this.scale(1 / this.length) : Point.of(0, 0);
    }
  }, {
    key: "scale",
    value: function scale(_scale) {
      return Point.of(this.x * _scale, this.y * _scale);
    }
  }, {
    key: "mid",
    value: function mid(point) {
      return Point.of((this.x + point.x) / 2, (this.y + point.y) / 2);
    }
  }, {
    key: "length",
    get: function get() {
      return Math.sqrt(this.dot(this));
    }
  }, {
    key: "equals",
    value: function equals(p) {
      return this.x === p.x && this.y === p.y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "(".concat(this.x, ":").concat(this.y, ")");
    }
  }], [{
    key: "of",
    value: function of(x, y) {
      return new Point(x, y);
    }
  }, {
    key: "vector",
    value: function vector(start, end) {
      return end.subtract(start);
    }
  }]);

  return Point;
}();

exports.Point = Point;
},{}],"NXhC":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hunter = void 0;

var constants_1 = require("./constants");

var Hunter = /*#__PURE__*/function () {
  function Hunter(_bulletsCount, shape, _direction, _velocity) {
    var _isAlive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    _classCallCheck(this, Hunter);

    this._bulletsCount = _bulletsCount;
    this.shape = shape;
    this._direction = _direction;
    this._velocity = _velocity;
    this._isAlive = _isAlive;
  }

  _createClass(Hunter, [{
    key: "bulletsCount",
    get: function get() {
      return this._bulletsCount;
    }
  }, {
    key: "shoot",
    value: function shoot() {
      if (!this.hasBullets()) {
        throw new Error('Hunter has no bullets to shoot');
      }

      this._bulletsCount--;
    }
  }, {
    key: "hasBullets",
    value: function hasBullets() {
      return this._bulletsCount > 0;
    }
  }, {
    key: "render",
    value: function render(context) {
      this.shape.render(context);
    }
  }, {
    key: "update",
    value: function update(secondsPassed, gameContext) {
      if (this._direction !== null) {
        this.checkBoundary();
        this.shape.center = this._direction.scale(this.velocity * secondsPassed).add(this.shape.center);
      }
    }
  }, {
    key: "checkBoundary",
    value: function checkBoundary() {
      if (this.position.x - this.shape.radius < -constants_1.FIELD_WIDTH / 2 || this.position.x + this.shape.radius > constants_1.FIELD_WIDTH / 2 || this.position.y - this.shape.radius < -constants_1.FIELD_HEIGHT / 2 || this.position.y + this.shape.radius > constants_1.FIELD_HEIGHT / 2) {
        this._isAlive = false;
      }
    }
  }, {
    key: "isAlive",
    get: function get() {
      return this._isAlive;
    }
  }, {
    key: "velocity",
    get: function get() {
      return this._velocity;
    }
  }, {
    key: "position",
    get: function get() {
      return this.shape.center;
    },
    set: function set(newPos) {
      this.shape.center = newPos;
    }
  }, {
    key: "moveDirection",
    get: function get() {
      return this._direction;
    },
    set: function set(direction) {
      this._direction = direction;
    }
  }, {
    key: "isDeleted",
    value: function isDeleted() {
      return false;
    }
  }]);

  return Hunter;
}();

exports.Hunter = Hunter;
},{"./constants":"N3T3"}],"JS1F":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle = void 0;

var Circle = /*#__PURE__*/function () {
  function Circle(center, radius, color) {
    _classCallCheck(this, Circle);

    this.center = center;
    this.radius = radius;
    this.color = color;
  }

  _createClass(Circle, [{
    key: "render",
    value: function render(context) {
      var ctx = context.ctx;
      ctx.beginPath();
      ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color;
      ctx.fill(); // context.strokeStyle = '#003300';
      // context.stroke();
      // ctx.closePath();
    }
  }, {
    key: "intersect",
    value: function intersect(circle) {
      var x1 = this.center.x;
      var y1 = this.center.y;
      var r1 = this.radius;
      var x2 = circle.center.x;
      var y2 = circle.center.y;
      var r2 = circle.radius;
      var distSq = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
      var radSumSq = (r1 + r2) * (r1 + r2);
      var result;
      if (distSq === radSumSq) result = 1;else if (distSq > radSumSq) result = -1;else result = 0;
      return result >= 0;
    }
  }, {
    key: "update",
    value: function update(secondsPassed, gameContext) {}
  }, {
    key: "isDeleted",
    value: function isDeleted() {
      return false;
    }
  }]);

  return Circle;
}();

exports.Circle = Circle;
},{}],"ZFMy":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HunterKeyboardManager = void 0;

var Point_1 = require("./Point");

var HunterKeyboardManager = /*#__PURE__*/function () {
  function HunterKeyboardManager() {
    var _this = this;

    _classCallCheck(this, HunterKeyboardManager);

    this.currentDirections = new Map();

    var onKeyDown = function onKeyDown(e) {
      if (!_this.currentDirections.has(e.keyCode)) {
        _this.currentDirections.set(e.keyCode, HunterKeyboardManager.DIRECTIONS[e.keyCode]);
      }
    };

    var onKeyUp = function onKeyUp(e) {
      _this.currentDirections.delete(e.keyCode);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }

  _createClass(HunterKeyboardManager, [{
    key: "hasDirection",
    value: function hasDirection() {
      return this.currentDirections.size !== 0;
    }
  }, {
    key: "moveDirection",
    value: function moveDirection() {
      var moveVector = Array.from(this.currentDirections.values()).reduce(function (acc, currentVector) {
        return acc.add(currentVector);
      });
      return moveVector.unit();
    }
  }]);

  return HunterKeyboardManager;
}();

exports.HunterKeyboardManager = HunterKeyboardManager;
HunterKeyboardManager.DIRECTIONS = {
  65: Point_1.Point.of(-10, 0),
  87: Point_1.Point.of(0, -10),
  68: Point_1.Point.of(10, 0),
  83: Point_1.Point.of(0, 10) // s

};
},{"./Point":"ZAu6"}],"OTQx":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = void 0;

var Circle_1 = require("./Circle");

var Bullet = /*#__PURE__*/function (_Circle_1$Circle) {
  _inherits(Bullet, _Circle_1$Circle);

  var _super = _createSuper(Bullet);

  function Bullet(pos, direction) {
    var _this;

    var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 800;
    var maxDistance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 700;

    _classCallCheck(this, Bullet);

    _this = _super.call(this, pos, 5, 'red');
    _this.direction = direction;
    _this.velocity = velocity;
    _this.maxDistance = maxDistance;
    _this._isDeleted = false;
    _this.fullDistance = 0;
    return _this;
  }

  _createClass(Bullet, [{
    key: "update",
    value: function update(secondsPassed, gameContext) {
      this.updatePosition(secondsPassed);
      this.checkKillingAnimals(gameContext);
    }
  }, {
    key: "checkKillingAnimals",
    value: function checkKillingAnimals(gameContext) {
      var _iterator = _createForOfIteratorHelper(gameContext.animals),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var animal = _step.value;

          if (this.intersect(animal)) {
            animal.kill();
            this._isDeleted = true;
            return;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(secondsPassed) {
      var distance = this.velocity * secondsPassed;
      this.fullDistance += distance;

      if (this.fullDistance >= this.maxDistance) {
        this._isDeleted = true;
        return;
      }

      this.center = this.direction.scale(distance).add(this.center);
    }
  }, {
    key: "isDeleted",
    value: function isDeleted() {
      return this._isDeleted;
    }
  }]);

  return Bullet;
}(Circle_1.Circle);

exports.Bullet = Bullet;
},{"./Circle":"JS1F"}],"gk9g":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameStateUpdater = void 0;

var HunterKeyboardManager_1 = require("./HunterKeyboardManager");

var Point_1 = require("./Point");

var Bullet_1 = require("./Bullet");

var GameStateUpdater = /*#__PURE__*/function () {
  function GameStateUpdater(gameContext, mouseListener) {
    _classCallCheck(this, GameStateUpdater);

    this.gameContext = gameContext;
    this.mouseListener = mouseListener;
    this.hunterKeyboardManager = new HunterKeyboardManager_1.HunterKeyboardManager();
  }

  _createClass(GameStateUpdater, [{
    key: "update",
    value: function update(secondsPassed) {
      this.updateHunterMovementDirection();
      this.updateDrawables(secondsPassed);
      this.updateGun();
    }
  }, {
    key: "updateGun",
    value: function updateGun() {
      var hunter = this.gameContext.hunter;
      var lastPos = this.mouseListener.takeLastMouseClickGameFieldPosition;

      if (lastPos === null) {
        return;
      }

      if (!hunter.hasBullets()) {
        return;
      }

      hunter.shoot();
      this.createBullet(lastPos);
    }
  }, {
    key: "createBullet",
    value: function createBullet(lastPos) {
      var position = this.gameContext.hunter.position;
      var direction = Point_1.Point.vector(position, lastPos).unit();
      var bullet = new Bullet_1.Bullet(position, direction);
      this.gameContext.addDrawable(bullet);
    }
  }, {
    key: "updateDrawables",
    value: function updateDrawables(secondsPassed) {
      var _this = this;

      this.gameContext.drawables.forEach(function (d) {
        return d.update(secondsPassed, _this.gameContext);
      });
    }
  }, {
    key: "updateHunterMovementDirection",
    value: function updateHunterMovementDirection() {
      var hunter = this.gameContext.hunter;

      if (this.hunterKeyboardManager.hasDirection()) {
        hunter.moveDirection = this.hunterKeyboardManager.moveDirection();
      } else {
        hunter.moveDirection = null;
      }
    }
  }]);

  return GameStateUpdater;
}();

exports.GameStateUpdater = GameStateUpdater;
},{"./HunterKeyboardManager":"ZFMy","./Point":"ZAu6","./Bullet":"OTQx"}],"H7Nv":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animal = void 0;

var Circle_1 = require("./Circle");

var Animal = /*#__PURE__*/function (_Circle_1$Circle) {
  _inherits(Animal, _Circle_1$Circle);

  var _super = _createSuper(Animal);

  function Animal(center) {
    var _this;

    var velocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;

    var _direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15;
    var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'blue';

    _classCallCheck(this, Animal);

    _this = _super.call(this, center, radius, color);
    _this.velocity = velocity;
    _this._direction = _direction;
    _this._isAlive = true;
    return _this;
  }

  _createClass(Animal, [{
    key: "update",
    value: function update(secondsPassed, gameContext) {
      if (this._direction !== null) {
        var distance = this.velocity * secondsPassed;
        this.center = this._direction.scale(distance).add(this.center);
      }
    }
  }, {
    key: "kill",
    value: function kill() {
      this._isAlive = false;
    }
  }, {
    key: "direction",
    get: function get() {
      return this._direction;
    }
  }, {
    key: "isAlive",
    get: function get() {
      return this._isAlive;
    }
  }, {
    key: "isDeleted",
    value: function isDeleted() {
      return !this.isAlive;
    }
  }]);

  return Animal;
}(Circle_1.Circle);

exports.Animal = Animal;
},{"./Circle":"JS1F"}],"G7Mz":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameContext = void 0;

var Point_1 = require("./Point");

var Animal_1 = require("./Animal");

var Bullet_1 = require("./Bullet");

var GameContext = /*#__PURE__*/function () {
  function GameContext(hunter, _drawables, canvas) {
    _classCallCheck(this, GameContext);

    this.hunter = hunter;
    this._drawables = _drawables;
    this.canvas = canvas;
  }

  _createClass(GameContext, [{
    key: "mapCanvasPointToGameFieldPoint",
    value: function mapCanvasPointToGameFieldPoint(canvasPoint) {
      return Point_1.Point.of(canvasPoint.x + this.hunter.position.x - this.canvas.width / 2, canvasPoint.y + this.hunter.position.y - this.canvas.height / 2);
    }
  }, {
    key: "addDrawable",
    value: function addDrawable(d) {
      this._drawables.push(d);
    }
  }, {
    key: "drawables",
    get: function get() {
      this._drawables = this._drawables.filter(function (d) {
        return !d.isDeleted();
      });
      return this._drawables;
    }
  }, {
    key: "animals",
    get: function get() {
      return this.drawables.filter(function (d) {
        return d instanceof Animal_1.Animal;
      });
    }
  }, {
    key: "bullets",
    get: function get() {
      return this.drawables.filter(function (d) {
        return d instanceof Bullet_1.Bullet;
      });
    }
  }]);

  return GameContext;
}();

exports.GameContext = GameContext;
},{"./Point":"ZAu6","./Animal":"H7Nv","./Bullet":"OTQx"}],"Vifl":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameRenderingContext = void 0;

var FrameRenderingContext = function FrameRenderingContext(ctx) {
  _classCallCheck(this, FrameRenderingContext);

  this.ctx = ctx;
};

exports.FrameRenderingContext = FrameRenderingContext;
},{}],"f12G":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameRenderer = void 0;

var Point_1 = require("./Point");

var constants_1 = require("./constants");

var FrameRenderingContext_1 = require("./FrameRenderingContext");

var GameRenderer = /*#__PURE__*/function () {
  function GameRenderer(ctx, canvas, gameContext, mouseListener) {
    _classCallCheck(this, GameRenderer);

    this.ctx = ctx;
    this.canvas = canvas;
    this.gameContext = gameContext;
    this.mouseListener = mouseListener;
  }

  _createClass(GameRenderer, [{
    key: "drawLine",
    value: function drawLine(start, end) {
      var _this$ctx, _this$ctx2;

      (_this$ctx = this.ctx) === null || _this$ctx === void 0 ? void 0 : _this$ctx.moveTo(start.x, start.y);
      (_this$ctx2 = this.ctx) === null || _this$ctx2 === void 0 ? void 0 : _this$ctx2.lineTo(end.x, end.y);
    }
  }, {
    key: "draw",
    value: function draw() {
      var hunter = this.gameContext.hunter;
      this.ctx.fillStyle = constants_1.BG_COLOR;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.scale(constants_1.SCALE, constants_1.SCALE);
      this.ctx.translate(-hunter.position.x, -hunter.position.y);
      this.ctx.beginPath();

      for (var i = -constants_1.GRID_COUNT; i <= constants_1.GRID_COUNT; i++) {
        this.ctx.moveTo(i * constants_1.GRID_WIDTH, -constants_1.FIELD_WIDTH / 2);
        this.ctx.lineTo(i * constants_1.GRID_WIDTH, constants_1.FIELD_WIDTH / 2);
        this.ctx.moveTo(-constants_1.FIELD_HEIGHT / 2, i * constants_1.GRID_WIDTH);
        this.ctx.lineTo(constants_1.FIELD_HEIGHT / 2, i * constants_1.GRID_WIDTH);
      }

      this.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      this.ctx.stroke();
      this.renderDrawables();
      this.ctx.restore();
      this.ctx.font = '20px Arial';
      this.ctx.fillStyle = 'white';
      this.ctx.fillStyle = 'red';
      this.ctx.beginPath();
      this.ctx.fill();
      this.ctx.save();
      var mousePos = this.mouseListener.currentMousePosition;
      this.ctx.beginPath();
      this.ctx.translate(mousePos.x, mousePos.y);
      this.ctx.strokeStyle = 'red';
      var len = 20;
      this.drawLine(Point_1.Point.of(-len, 0), Point_1.Point.of(len, 0));
      this.drawLine(Point_1.Point.of(0, -len), Point_1.Point.of(0, len));
      this.ctx.stroke();
      this.ctx.restore();
    }
  }, {
    key: "renderDrawables",
    value: function renderDrawables() {
      var _this = this;

      this.gameContext.drawables.forEach(function (d) {
        return d.render(new FrameRenderingContext_1.FrameRenderingContext(_this.ctx));
      });
    }
  }]);

  return GameRenderer;
}();

exports.GameRenderer = GameRenderer;
},{"./Point":"ZAu6","./constants":"N3T3","./FrameRenderingContext":"Vifl"}],"pgjx":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameLoop = void 0;

var GameLoop = /*#__PURE__*/function () {
  function GameLoop(updater, drawer) {
    _classCallCheck(this, GameLoop);

    this.updater = updater;
    this.drawer = drawer;
  }

  _createClass(GameLoop, [{
    key: "run",
    value: function run() {
      var _this = this;

      requestAnimationFrame(function (timestamp) {
        return _this.gameLoop(timestamp);
      });
    }
  }, {
    key: "gameLoop",
    value: function gameLoop(timestamp) {
      var _this2 = this;

      this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000;
      this.oldTimeStamp = timestamp;
      this.updater.update(this.secondsPassed);
      this.drawer.draw();
      window.requestAnimationFrame(function (timestamp) {
        return _this2.gameLoop(timestamp);
      });
    }
  }]);

  return GameLoop;
}();

exports.GameLoop = GameLoop;
},{}],"jvau":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseListener = void 0;

var Point_1 = require("./Point");

var MouseListener = /*#__PURE__*/function () {
  function MouseListener(gameContext) {
    var _this = this;

    _classCallCheck(this, MouseListener);

    this.gameContext = gameContext;
    this._lastMouseClickPosition = null;
    this._currentMousePosition = Point_1.Point.of(0, 0);
    window.addEventListener('click', function (evt) {
      _this._lastMouseClickPosition = Point_1.Point.of(evt.x, evt.y);
    });

    var onMouseMove = function onMouseMove(evt) {
      _this._currentMousePosition = Point_1.Point.of(evt.x, evt.y);
    };

    window.addEventListener('mousemove', onMouseMove);
  }

  _createClass(MouseListener, [{
    key: "takeLastMouseClickGameFieldPosition",
    get: function get() {
      var pos = this._lastMouseClickPosition;
      this._lastMouseClickPosition = null;

      if (pos === null) {
        return null;
      }

      return this.gameContext.mapCanvasPointToGameFieldPoint(pos);
    } // get currentGameFieldMousePosition(): Point {
    //   return this.gameContext.mapCanvasPointToGameFieldPoint(
    //     this._currentMousePosition
    //   );
    // }

  }, {
    key: "currentMousePosition",
    get: function get() {
      return this._currentMousePosition;
    }
  }]);

  return MouseListener;
}();

exports.MouseListener = MouseListener;
},{"./Point":"ZAu6"}],"Ws3s":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("./constants");

var Point_1 = require("./Point");

var Hunter_1 = require("./Hunter");

var Circle_1 = require("./Circle");

var GameStateUpdater_1 = require("./GameStateUpdater");

var GameContext_1 = require("./GameContext");

var GameRenderer_1 = require("./GameRenderer");

var GameLoop_1 = require("./GameLoop");

var MouseListener_1 = require("./MouseListener");

var Animal_1 = require("./Animal");

var canvas = document.getElementById('game-field');
var ctx = canvas.getContext('2d');
var hunter = new Hunter_1.Hunter(10, new Circle_1.Circle(Point_1.Point.of(constants_1.FIELD_WIDTH / 4, constants_1.FIELD_HEIGHT / 4), 15, 'black'), null, 500);
var rabbit = new Animal_1.Animal(Point_1.Point.of(constants_1.FIELD_WIDTH / 4, constants_1.FIELD_HEIGHT / 4));
var gameContext = new GameContext_1.GameContext(hunter, [hunter, rabbit], canvas);
var mouseListener = new MouseListener_1.MouseListener(gameContext);
var updater = new GameStateUpdater_1.GameStateUpdater(gameContext, mouseListener);
var drawer = new GameRenderer_1.GameRenderer(ctx, canvas, gameContext, mouseListener);
var gameLoop = new GameLoop_1.GameLoop(updater, drawer);

var onLoad = function onLoad() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gameLoop.run();
};

window.addEventListener('load', onLoad);
},{"./constants":"N3T3","./Point":"ZAu6","./Hunter":"NXhC","./Circle":"JS1F","./GameStateUpdater":"gk9g","./GameContext":"G7Mz","./GameRenderer":"f12G","./GameLoop":"pgjx","./MouseListener":"jvau","./Animal":"H7Nv"}]},{},["Ws3s"], null)
//# sourceMappingURL=app.40ebe070.js.map