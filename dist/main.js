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

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst constants = {\n  DEFAULT_HEIGHT: 510,\n  DEFAULT_WIDTH: 900,\n  TOUCH_INPUT: navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (constants);\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\nclass Game {\n  constructor(){\n    this.mouse = {\n      // The current position\n      x: 0,\n      y: 0,\n\n      // The position previous to the current\n      previousX: 0,\n      previousY: 0,\n\n      // The velocity, based on the difference between\n      // the current and next positions\n      velocityX: 0,\n      velocityY: 0,\n\n      // Flags if the mouse is currently pressed down\n      down: false\n    };\n\n    this.world = {\n      width: _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DEFAULT_WIDTH,\n      height: _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DEFAULT_HEIGHT\n    };\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\nconsole.log(\"webpack is working\");\n\n\n\n\n\n\nlet canvas,\n  ctx,\n  prevX,\n  currX,\n  prevY,\n  currY,\n  lineColor = '#008080',\n  lineSize = 2,\n  width,\n  height;\n\nfunction init(){\n  canvas = document.getElementById('game-canvas');\n  ctx = canvas.getContext('2d');\n  width = canvas.width;\n  height = canvas.height;\n\n  canvas.addEventListener('mousemove', e => {\n    findxy(e);\n  });\n  canvas.addEventListener('mouseout', e => {\n    currX = currY = undefined;\n  });\n}\n\nfunction draw(){\n  ctx.beginPath();\n  ctx.moveTo(prevX, prevY);\n  ctx.lineTo(currX, currY);\n  ctx.strokeStyle = lineColor;\n  ctx.lineWidth = lineSize;\n  ctx.stroke();\n  ctx.closePath();\n}\n\nfunction findxy(e) {\n  if(currX === undefined && currY === undefined){\n    currX = e.clientX - canvas.offsetLeft;\n    currY = e.clientY - canvas.offsetTop;\n  }\n  prevX = currX;\n  prevY = currY;\n  currX = e.clientX - canvas.offsetLeft;\n  currY = e.clientY - canvas.offsetTop;\n  draw();\n}\n\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nwindow.game = game;\nlet container,\n  context;\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  init();\n  initialize();\n});\n\nconst initialize = () => {\n  container = document.getElementById('game');\n  // menu = document.getElementById('menu');\n  canvas = document.getElementById('game-canvas');\n  // scorePanel = document.getElementById('score');\n  // startButton = document.getElementById('start-button');\n  if (canvas && canvas.getContext) {\n    context = canvas.getContext('2d');\n\n    // Bind event listeners\n    // startButton.addEventListener('click', onStartButtonClick, false);\n    document.addEventListener('mousedown', onDocumentMouseDownHandler, false);\n    document.addEventListener('mousemove', onDocumentMouseMoveHandler, false);\n    document.addEventListener('mouseup', onDocumentMouseUpHandler, false);\n    canvas.addEventListener('touchstart', onCanvasTouchStartHandler, false);\n    canvas.addEventListener('touchmove', onCanvasTouchMoveHandler, false);\n    canvas.addEventListener('touchend', onCanvasTouchEndHandler, false);\n    window.addEventListener('resize', onWindowResizeHandler, false);\n\n    // Force an initial layout\n    onWindowResizeHandler();\n\n    // createSprites();\n\n    // Now that everything is laid out we can show the canvas & UI\n    // container.fadeIn(MENU_FADE_IN_DURATION);\n    // menu.hide().delay(MENU_FADE_IN_DURATION).fadeIn(MENU_FADE_IN_DURATION);\n\n    // Update the game state\n    // document.body.setAttribute('class', STATE_WELCOME);\n\n    // reset();\n    // update();\n  }\n  else {\n    alert('Doesn\\'t seem like your browser supports the HTML5 canvas element :(');\n  }\n};\n\nconst onDocumentMouseDownHandler = (e) => {\n  game.mouse.down = true;\n  console.log(game.mouse);\n};\n\nconst onDocumentMouseMoveHandler = (event) => {\n  game.mouse.previousX = game.mouse.x;\n  game.mouse.previousY = game.mouse.y;\n\n  game.mouse.x = event.clientX - (window.innerWidth - game.world.width) * 0.5;\n  game.mouse.y = event.clientY - (window.innerHeight - game.world.height) * 0.5;\n\n  game.mouse.velocityX = Math.abs(game.mouse.x - game.mouse.previousX) / game.world.width;\n  game.mouse.velocityY = Math.abs(game.mouse.y - game.mouse.previousY) / game.world.height;\n  console.log(game.mouse);\n};\n\nconst onDocumentMouseUpHandler = (event) => {\n  game.mouse.down = false;\n  console.log(game.mouse);\n};\n\nconst onCanvasTouchStartHandler = (event) => {\n  if (event.touches.length == 1) {\n    event.preventDefault();\n\n    game.mouse.x = event.touches[0].pageX - (window.innerWidth - game.world.width) * 0.5;\n    game.mouse.y = event.touches[0].pageY - (window.innerHeight - game.world.height) * 0.5;\n\n    game.mouse.down = true;\n  }\n  // console.log(game.mouse);\n};\n\nconst onCanvasTouchMoveHandler = (event) => {\n  if (event.touches.length == 1) {\n    event.preventDefault();\n\n    game.mouse.x = event.touches[0].pageX - (window.innerWidth - game.world.width) * 0.5;\n    game.mouse.y = event.touches[0].pageY - (window.innerHeight - game.world.height) * 0.5 - 20;\n  }\n  // console.log(game.mouse);\n\n};\n\nconst onCanvasTouchEndHandler = (event) => {\n  game.mouse.down = false;\n  // console.log(game.mouse);\n\n};\n\nconst onWindowResizeHandler = () => {\n  // Update the game size\n  game.world.width = _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TOUCH_INPUT ? window.innerWidth : _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DEFAULT_WIDTH;\n  game.world.height = _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TOUCH_INPUT ? window.innerHeight : _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DEFAULT_HEIGHT;\n\n  // Resize the container\n  container.style.width = (game.world.width);\n  container.style.height = (game.world.height);\n\n  // Resize the canvas\n  canvas.width = game.world.width;\n  canvas.height = game.world.height;\n\n  // Determine the x/y position of the canvas\n  var cx = Math.max((window.innerWidth - game.world.width) * 0.5, 1);\n  var cy = Math.max((window.innerHeight - game.world.height) * 0.5, 1);\n\n  // Update the position of the canvas\n  container.style.left = cx;\n  container.style.top = cy;\n\n  // Center the menu\n  // menu.css({\n  //   left: (game.world.width - menu.width()) / 2,\n  //   top: (game.world.height - menu.height()) / 2\n  // });\n\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });