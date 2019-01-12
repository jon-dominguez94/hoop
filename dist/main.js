/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ancestors.js":
/*!**************************!*\
  !*** ./src/ancestors.js ***!
  \**************************/
/*! exports provided: Point, Entity, Multiplier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return Point; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Multiplier\", function() { return Multiplier; });\nclass Point {\n\n  constructor(x, y) {\n    this.x = x || 0;\n    this.y = y || 0;\n  }\n\n  distanceTo(p) {\n    var dx = p.x - this.x;\n    var dy = p.y - this.y;\n    return Math.sqrt(dx * dx + dy * dy);\n  }\n\n  clonePosition() {\n    return { x: this.x, y: this.y };\n  }\n\n  interpolate(x, y, amp) {\n    this.x += (x - this.x) * amp;\n    this.y += (y - this.y) * amp;\n  }\n}\n\nclass Entity extends Point{\n  constructor(x, y){\n    super(x, y);\n    this.alive = false;\n  }\n}\n\nclass Multiplier {\n  constructor(step, max){\n    this.major = 1;\n    this.minor = 0;\n\n    this.max = max;\n    this.step = step;\n  }\n\n  reset(){\n    this.major = 1;\n    this.minor = 0;\n  }\n\n  increase() {\n    this.minor += this.step;\n\n    // Do we need to increment the major value?\n    while (this.minor >= 1) {\n      if (this.major < this.max) {\n        this.major++;\n      }\n\n      this.minor = 1 - this.minor;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/ancestors.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst constants = {\n  FRAMERATE: 60,\n  DEFAULT_HEIGHT: 510,\n  DEFAULT_WIDTH: 900,\n  TOUCH_INPUT: navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i),\n\n  ENEMY_COUNT: 2,\n  ENEMY_SIZE: 10,\n  ENEMY_TYPE_NORMAL: 1,\n  ENEMY_TYPE_BOMB: 2,\n  ENEMY_TYPE_NORMAL_MOVER: 3,\n  ENEMY_TYPE_BOMB_MOVER: 4,\n  // ENEMY_MOVER_START_FRAME: this.FRAMERATE * 2,\n\n  SCORE_PER_ENEMY: 30,\n  SCORE_PER_TICK: 0.01,\n  ENERGY_PER_ENEMY_DEATH: -30,\n  ENERGY_PER_ENEMY_ENCLOSED: 1,\n  ENERGY_PER_BOMB_ENCLOSED: -30,\n  MULTIPLIER_LIMIT: 4,\n\n  HEADER_HEIGHT: 30,\n  MENU_FADE_IN_DURATION:600,\n  MENU_FADE_OUT_DURATION: 600,\n\n  STATE_WELCOME: 'start',\n  STATE_PLAYING: 'playing',\n  STATE_LOSER: 'loser',\n  STATE_WINNER: 'winner'\n};\n\nconstants.ENEMY_MOVER_START_FRAME = constants.FRAMERATE * 2;\n\n// console.log(constants);\n/* harmony default export */ __webpack_exports__[\"default\"] = (constants);\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/entities/player.js":
/*!********************************!*\
  !*** ./src/entities/player.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ancestors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ancestors.js */ \"./src/ancestors.js\");\n\n\nclass Player extends _ancestors_js__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"] {\n  constructor(){\n    super();\n    this.trail = [];\n    this.size = 8;\n    this.length = 45;\n    this.energy = 100;\n    this.animatedEnergy = 0;\n  }\n\n  adjustEnergy(offset){\n    this.energy = Math.min(Math.max(this.energy + offset, 0), 100);\n  \n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./src/entities/player.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n/* harmony import */ var _ancestors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ancestors */ \"./src/ancestors.js\");\n/* harmony import */ var _entities_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/player */ \"./src/entities/player.js\");\n\n\n\n\nclass Game {\n  constructor(){\n    this.mouse = {\n      x: 0,\n      y: 0,\n      previousX: 0,\n      previousY: 0,\n      velocityX: 0,\n      velocityY: 0,\n      down: false\n    };\n\n    this.world = {\n      width: _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DEFAULT_WIDTH,\n      height: _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DEFAULT_HEIGHT\n    };\n\n    this.sprites = {\n      bomb: null,\n      enemy: null,\n      enemyDyingA: null,\n      enemyDyingB: null\n    };\n\n    this.playing = false,\n    this.score = 0,\n    this.duration = 0,\n    this.difficulty = 1,\n    this.multiplier = new _ancestors__WEBPACK_IMPORTED_MODULE_1__[\"Multiplier\"](0.2, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MULTIPLIER_LIMIT);\n\n    this.frameScore = 0,\n    this.frameCount = 0,\n    this.timeStart = Date.now(),\n    this.timeLastFrame = Date.now(),\n    this.timeLastSecond = Date.now(),\n    this.timeGameStart = Date.now(),\n    this.timeDelta = 0,\n    this.timeFactor = 0,\n    this.fps = 0,\n    this.fpsMin = 1000,\n    this.fpsMax = 0,\n    this.framesThisSecond = 0;\n\n    this.notifications = [],\n    this.intersections = [],\n    this.particles = [],\n    this.enemies = [],\n    this.player = new _entities_player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\nconsole.log(\"webpack is working\");\n\n\n\n\n\n\nlet canvas,\n  ctx,\n  prevX,\n  currX,\n  prevY,\n  currY,\n  lineColor = '#008080',\n  lineSize = 2,\n  width,\n  height;\n\nfunction init(){\n  canvas = document.getElementById('game-canvas');\n  ctx = canvas.getContext('2d');\n  width = canvas.width;\n  height = canvas.height;\n\n  canvas.addEventListener('mousemove', e => {\n    findxy(e);\n  });\n  canvas.addEventListener('mouseout', e => {\n    currX = currY = undefined;\n  });\n}\n\nfunction draw(){\n  ctx.beginPath();\n  ctx.moveTo(prevX, prevY);\n  ctx.lineTo(currX, currY);\n  ctx.strokeStyle = lineColor;\n  ctx.lineWidth = lineSize;\n  ctx.stroke();\n  ctx.closePath();\n}\n\nfunction findxy(e) {\n  if(currX === undefined && currY === undefined){\n    currX = e.clientX - canvas.offsetLeft;\n    currY = e.clientY - canvas.offsetTop;\n  }\n  prevX = currX;\n  prevY = currY;\n  currX = e.clientX - canvas.offsetLeft;\n  currY = e.clientY - canvas.offsetTop;\n  draw();\n}\n\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nwindow.game = game;\nlet container,\n  context;\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  init();\n  initialize();\n});\n\nconst initialize = () => {\n  container = document.getElementById('game');\n  // menu = document.getElementById('menu');\n  canvas = document.getElementById('game-canvas');\n  // scorePanel = document.getElementById('score');\n  // startButton = document.getElementById('start-button');\n  if (canvas && canvas.getContext) {\n    context = canvas.getContext('2d');\n\n    // Bind event listeners\n    // startButton.addEventListener('click', onStartButtonClick, false);\n    document.addEventListener('mousedown', onDocumentMouseDownHandler, false);\n    document.addEventListener('mousemove', onDocumentMouseMoveHandler, false);\n    document.addEventListener('mouseup', onDocumentMouseUpHandler, false);\n    canvas.addEventListener('touchstart', onCanvasTouchStartHandler, false);\n    canvas.addEventListener('touchmove', onCanvasTouchMoveHandler, false);\n    canvas.addEventListener('touchend', onCanvasTouchEndHandler, false);\n    window.addEventListener('resize', onWindowResizeHandler, false);\n\n    // Force an initial layout\n    onWindowResizeHandler();\n\n    // createSprites();\n\n    // Now that everything is laid out we can show the canvas & UI\n    // container.fadeIn(MENU_FADE_IN_DURATION);\n    // menu.hide().delay(MENU_FADE_IN_DURATION).fadeIn(MENU_FADE_IN_DURATION);\n\n    // Update the game state\n    // document.body.setAttribute('class', STATE_WELCOME);\n\n    // reset();\n    // update();\n  }\n  else {\n    alert('Doesn\\'t seem like your browser supports the HTML5 canvas element :(');\n  }\n};\n\nconst onDocumentMouseDownHandler = (e) => {\n  game.mouse.down = true;\n  // console.log(game.mouse);\n};\n\nconst onDocumentMouseMoveHandler = (event) => {\n  game.mouse.previousX = game.mouse.x;\n  game.mouse.previousY = game.mouse.y;\n\n  game.mouse.x = event.clientX - (window.innerWidth - game.world.width) * 0.5;\n  game.mouse.y = event.clientY - (window.innerHeight - game.world.height) * 0.5;\n\n  game.mouse.velocityX = Math.abs(game.mouse.x - game.mouse.previousX) / game.world.width;\n  game.mouse.velocityY = Math.abs(game.mouse.y - game.mouse.previousY) / game.world.height;\n  // console.log(game.mouse);\n};\n\nconst onDocumentMouseUpHandler = (event) => {\n  game.mouse.down = false;\n  console.log(game.mouse);\n};\n\nconst onCanvasTouchStartHandler = (event) => {\n  if (event.touches.length == 1) {\n    event.preventDefault();\n\n    game.mouse.x = event.touches[0].pageX - (window.innerWidth - game.world.width) * 0.5;\n    game.mouse.y = event.touches[0].pageY - (window.innerHeight - game.world.height) * 0.5;\n\n    game.mouse.down = true;\n  }\n  // console.log(game.mouse);\n};\n\nconst onCanvasTouchMoveHandler = (event) => {\n  if (event.touches.length == 1) {\n    event.preventDefault();\n\n    game.mouse.x = event.touches[0].pageX - (window.innerWidth - game.world.width) * 0.5;\n    game.mouse.y = event.touches[0].pageY - (window.innerHeight - game.world.height) * 0.5 - 20;\n  }\n  // console.log(game.mouse);\n\n};\n\nconst onCanvasTouchEndHandler = (event) => {\n  game.mouse.down = false;\n  // console.log(game.mouse);\n\n};\n\nconst onWindowResizeHandler = () => {\n  // Update the game size\n  game.world.width = _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TOUCH_INPUT ? window.innerWidth : _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DEFAULT_WIDTH;\n  game.world.height = _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TOUCH_INPUT ? window.innerHeight : _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DEFAULT_HEIGHT;\n\n  // Resize the container\n  container.style.width = (game.world.width);\n  container.style.height = (game.world.height);\n\n  // Resize the canvas\n  canvas.width = game.world.width;\n  canvas.height = game.world.height;\n\n  // Determine the x/y position of the canvas\n  var cx = Math.max((window.innerWidth - game.world.width) * 0.5, 1);\n  var cy = Math.max((window.innerHeight - game.world.height) * 0.5, 1);\n\n  // Update the position of the canvas\n  container.style.left = cx;\n  container.style.top = cy;\n\n  // Center the menu\n  // menu.css({\n  //   left: (game.world.width - menu.width()) / 2,\n  //   top: (game.world.height - menu.height()) / 2\n  // });\n\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });