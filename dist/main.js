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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n/* harmony import */ var _ancestors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ancestors */ \"./src/ancestors.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _entities_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/player */ \"./src/entities/player.js\");\n/* harmony import */ var _region__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./region */ \"./src/region.js\");\n\n\n\n\n\n\nclass Game {\n  constructor(menu){\n\n    this.context;\n    this.menu = menu;\n    this.scorePanel = document.getElementById('score');\n\n    this.mouse = {\n      x: 0,\n      y: 0,\n      previousX: 0,\n      previousY: 0,\n      velocityX: 0,\n      velocityY: 0,\n      down: false\n    };\n\n    this.world = {\n      width: _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DEFAULT_WIDTH,\n      height: _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DEFAULT_HEIGHT\n    };\n\n    this.sprites = {\n      bomb: null,\n      enemy: null,\n      enemyDyingA: null,\n      enemyDyingB: null\n    };\n\n    this.dirtyRegions = [],\n\n    this.playing = false,\n    this.score = 0,\n    this.duration = 0,\n    this.difficulty = 1,\n    this.multiplier = new _ancestors__WEBPACK_IMPORTED_MODULE_1__[\"Multiplier\"](0.2, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MULTIPLIER_LIMIT);\n\n    this.frameScore = 0,\n    this.frameCount = 0,\n    this.timeStart = Date.now(),\n    this.timeLastFrame = Date.now(),\n    this.timeLastSecond = Date.now(),\n    this.timeGameStart = Date.now(),\n    this.timeDelta = 0,\n    this.timeFactor = 0,\n    this.fps = 0,\n    this.fpsMin = 1000,\n    this.fpsMax = 0,\n    this.framesThisSecond = 0;\n\n    this.notifications = [],\n    this.intersections = [],\n    this.particles = [],\n    this.enemies = [],\n    this.player = new _entities_player__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n  }\n\n  createSprites() {\n    const canvasWidth = 64,\n    canvasHeight = 64;\n    let cvs,\n    ctx;\n\n    cvs = document.createElement('canvas');\n    cvs.setAttribute('width', canvasWidth);\n    cvs.setAttribute('height', canvasHeight);\n    ctx = cvs.getContext('2d');\n    ctx.beginPath();\n    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ENEMY_SIZE, 0, Math.PI * 2, true);\n    ctx.lineWidth = 2;\n    ctx.fillStyle = 'rgba(0,200,220, 0.9)';\n    ctx.strokeStyle = 'rgba(255,255,255,0.4)'\n    ctx.shadowColor = 'rgba(0,240,255,0.9)';\n    ctx.shadowOffsetX = 0;\n    ctx.shadowOffsetY = 0;\n    ctx.shadowBlur = 20;\n    ctx.stroke();\n    ctx.fill();\n\n    this.sprites.enemy = cvs;\n\n    cvs = document.createElement('canvas');\n    cvs.setAttribute('width', canvasWidth);\n    cvs.setAttribute('height', canvasHeight);\n    ctx = cvs.getContext('2d');\n    ctx.beginPath();\n    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ENEMY_SIZE * 1.4, 0, Math.PI * 2, true);\n    ctx.lineWidth = 2;\n    ctx.fillStyle = 'rgba(190,220,90, 0.9)';\n    ctx.strokeStyle = 'rgba(255,255,255,0.4)'\n    ctx.shadowColor = 'rgba(220,240,150,0.9)';\n    ctx.shadowOffsetX = 0;\n    ctx.shadowOffsetY = 0;\n    ctx.shadowBlur = 20;\n    ctx.stroke();\n    ctx.fill();\n\n    this.sprites.enemyDyingA = cvs;\n\n    cvs = document.createElement('canvas');\n    cvs.setAttribute('width', canvasWidth);\n    cvs.setAttribute('height', canvasHeight);\n    ctx = cvs.getContext('2d');\n    ctx.beginPath();\n    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ENEMY_SIZE * 1.4, 0, Math.PI * 2, true);\n    ctx.lineWidth = 2;\n    ctx.fillStyle = 'rgba(190,220,90, 0.9)';\n    ctx.strokeStyle = 'rgba(255,255,255,0.4)'\n    ctx.shadowColor = 'rgba(220,240,150,0.9)';\n    ctx.shadowOffsetX = 0;\n    ctx.shadowOffsetY = 0;\n    ctx.shadowBlur = 10;\n    ctx.stroke();\n    ctx.fill();\n\n    this.sprites.enemyDyingB = cvs;\n\n    cvs = document.createElement('canvas');\n    cvs.setAttribute('width', canvasWidth);\n    cvs.setAttribute('height', canvasHeight);\n    ctx = cvs.getContext('2d');\n    ctx.beginPath();\n    ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ENEMY_SIZE, 0, Math.PI * 2, true);\n    ctx.lineWidth = 2;\n    ctx.fillStyle = 'rgba(220,50,50, 0.9)';\n    ctx.strokeStyle = 'rgba(255,255,255,0.4)'\n    ctx.shadowColor = \"rgba(255,100,100,0.9)\";\n    ctx.shadowOffsetX = 0;\n    ctx.shadowOffsetY = 0;\n    ctx.shadowBlur = 10;\n    ctx.stroke();\n    ctx.fill();\n\n    this.sprites.bomb = cvs;\n  }\n\n  reset() {\n    this.player = new _entities_player__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    this.player.x = this.mouse.x;\n    this.player.y = this.mouse.y;\n\n    this.notifications = [];\n    this.intersections = [];\n    this.particles = [];\n    this.enemies = [];\n\n    this.score = 0;\n    this.duration = 0;\n    this.playing = false;\n    this.difficulty = 1;\n\n    this.multiplier.reset();\n\n    this.frameCount = 0;\n    this.frameScore = 0;\n\n    this.timeStart = 0;\n    this.timeLastFrame = 0;\n  }\n\n  update(){\n    this.clear();\n\n    // There are quite the few updates and renders that only need\n    // to be carried out while the game is active\n    if (this.playing) {\n      this.context.save();\n      this.context.globalCompositeOperation = 'lighter';\n\n      this.updateMeta();\n      this.updatePlayer();\n      // updateParticles();\n\n      // findIntersections();\n      // solveIntersections();\n\n      this.renderPlayer();\n\n      // updateEnemies();\n      // renderEnemies();\n      // renderParticles();\n\n      this.context.restore();\n\n      // renderNotifications();\n    }\n\n\n    // After the user has started his first game, this will never\n    // go back to being 0\n    if (this.score !== 0) {\n      this.renderHeader();\n    }\n    // console.log('updated');\n    Object(_util__WEBPACK_IMPORTED_MODULE_2__[\"requestAnimFrame\"])(this.update.bind(this));\n  }\n\n  clear() {\n    var i = this.dirtyRegions.length;\n\n    while (i--) {\n      var r = this.dirtyRegions[i];\n      this.context.clearRect(Math.floor(r.x), Math.floor(r.y), Math.ceil(r.width), Math.ceil(r.height));\n    }\n\n    this.dirtyRegions = [];\n  }\n\n  start() {\n    this.reset();\n\n    this.timeStart = Date.now();\n    this.timeLastFrame = this.timeStart;\n\n    this.playing = true;\n\n    // this.menu.fadeOut(constants.MENU_FADE_OUT_DURATION, function () {\n      // Remove the header after the menu has appeared since\n      // it will no longer be used\n      document.getElementById('initial-header').remove();\n    // });\n\n    // Update the game state\n    document.body.setAttribute('class', _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].STATE_PLAYING);\n  }\n\n  stop() {\n    this.scorePanel.style.display = 'block';\n    document.getElementById('score-p').innerHTML = Math.floor(score);\n\n    this.playing = false;\n    // menu.fadeIn(MENU_FADE_IN_DURATION);\n  }\n\n  invalidate(x, y, width, height) {\n    this.dirtyRegions.push({\n      x: x,\n      y: y,\n      width: width,\n      height: height\n    });\n  }\n\n  updatePlayer() {\n\n    // Interpolate towards the mouse, results in smooth\n    // movement\n    this.player.interpolate(this.mouse.x, this.mouse.y, 0.4);\n\n    // Add points to the trail, if needed\n    while (this.player.trail.length < this.player.length) {\n      this.player.trail.push(new _ancestors__WEBPACK_IMPORTED_MODULE_1__[\"Point\"](this.player.x, this.player.y));\n    }\n\n    // Remove the oldest point in the trail\n    this.player.trail.shift();\n\n    // No energy – no game\n    if (this.player.energy === 0) {\n      this.stop();\n    }\n\n  }\n\n  renderPlayer() {\n    // Begin the trail path\n    this.context.beginPath();\n\n    const bounds = new _region__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n    const i = this.player.trail.length;\n\n    // Draw a curve through the tail\n    for (let i = 0, len = this.player.trail.length; i < len; i++) {\n      var p1 = this.player.trail[i];\n      var p2 = this.player.trail[i + 1];\n\n      if (i === 0) {\n        // This is the first loop, so we need to start by moving into position\n        this.context.moveTo(p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);\n      }\n      else if (p2) {\n        // Draw a curve between the current and next trail point\n        this.context.quadraticCurveTo(p1.x, p1.y, p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);\n      }\n\n      bounds.inflate(p1.x, p1.y);\n    }\n\n    // Draw the trail stroke\n    this.context.strokeStyle = '#648d93';\n    this.context.lineWidth = 2;\n    this.context.stroke();\n\n    bounds.expand(4, 4);\n\n    var boundsRect = bounds.toRectangle();\n\n    this.invalidate(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);\n  }\n\n  adjustScore(offset) {\n    let multipliedOffset = 0;\n\n    if (this.playing) {\n      multipliedOffset = offset * this.multiplier.major;\n\n      // Adjust the score, but scale the adjustment by a factor\n      // of the framerate. This is done to avoid giving people\n      // with low FPS an advantage.\n      this.score += multipliedOffset * (this.fps / _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FRAMERATE);\n    }\n\n    return multipliedOffset;\n  }\n\n  updateMeta() {\n  // Fetch the current time for this frame\n    const timeThisFrame = Date.now();\n\n    // Increase the frame count\n    this.framesThisSecond++;\n\n    // Check if a second has passed since the last time we updated the FPS\n    if (timeThisFrame > this.timeLastSecond + 1000) {\n      // Establish the current, minimum and maximum FPS\n      this.fps = Math.min(Math.round((this.framesThisSecond * 1000) / (timeThisFrame - this.timeLastSecond)), _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FRAMERATE);\n      this.fpsMin = Math.min(this.fpsMin, this.fps);\n      this.fpsMax = Math.max(this.fpsMax, this.fps);\n\n      this.timeLastSecond = timeThisFrame;\n      this.framesThisSecond = 0;\n    }\n\n    this.timeDelta = timeThisFrame - this.timeLastFrame;\n    this.timeFactor = this.timeDelta / (1000 / _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FRAMERATE);\n\n    // Increment the difficulty by a factor of the time\n    // passed since the last rendered frame to ensure that\n    // difficulty progresses at the same speed no matter what\n    // FPS the game runs at\n    this.difficulty += 0.002 * Math.max(this.timeFactor, 1);\n    this.adjustScore(1);\n\n    this.frameCount++;\n    this.frameScore++;\n\n    this.duration = timeThisFrame - this.timeStart;\n\n    this.timeLastFrame = timeThisFrame;\n\n  }\n\n  renderHeader() {\n\n    const padding = 10,\n      energyBarHeight = 4,\n      energyBarWidth = 100,\n      ENERGY_LABEL = 'ENERGY:',\n      MULTIPLIER_LABEL = 'MULTIPLIER:',\n      TIME_LABEL = 'TIME:',\n      SCORE_LABEL = 'SCORE:';\n\n    this.player.animatedEnergy += (this.player.energy - this.player.animatedEnergy) * 0.2;\n\n    this.context.fillStyle = 'rgba(0,0,0,0.5)';\n    this.context.fillRect(0, 0, this.world.width, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].HEADER_HEIGHT);\n\n    this.context.save();\n    this.context.translate(padding, padding);\n\n    // Energy label\n    this.context.font = \"10px Arial\";\n    this.context.fillStyle = \"#ffffff\";\n    this.context.fillText(ENERGY_LABEL, 0, 8);\n    this.context.translate(56, 0);\n\n    // Energy bar \n    this.context.save();\n    this.context.fillStyle = 'rgba(40,40,40,0.8)';\n    this.context.fillRect(0, 2, energyBarWidth, energyBarHeight);\n    this.context.shadowOffsetX = 0;\n    this.context.shadowOffsetY = 0;\n    this.context.shadowBlur = 14;\n    this.context.shadowColor = \"rgba(255,150,0,0.9)\";\n    this.context.fillStyle = 'rgba(251,114,0, 0.8)';\n    // this.context.shadowColor = \"rgba(0,240,255,0.9)\";\n    // this.context.fillStyle = 'rgba(0,200,220, 0.8)';\n    this.context.fillRect(0, 2, (this.player.animatedEnergy / 100) * energyBarWidth, energyBarHeight);\n    this.context.restore();\n\n    this.context.translate(122, 0);\n\n    // Time label\n    this.context.font = \"10px Arial\";\n    this.context.fillStyle = \"#ffffff\";\n    this.context.fillText(TIME_LABEL, 0, 8);\n\n    // Time\n    this.context.font = \"bold 10px Arial\";\n    this.context.fillStyle = \"rgba(251,114,0, 0.8)\";\n    this.context.fillText(Math.round(this.duration / 1000) + 's', 35, 8);\n\n    this.context.translate(70, 0);\n\n    // Score label\n    this.context.font = \"10px Arial\";\n    this.context.fillStyle = \"#ffffff\";\n    this.context.fillText(SCORE_LABEL, 0, 8);\n\n    // Score\n    this.context.font = \"bold 10px Arial\";\n    this.context.fillStyle = \"rgba(251,114,0, 0.8)\";\n    this.context.fillText(Math.floor(score), 47, 8);\n    \n    this.context.translate(90, 0);\n    \n    // Multiplier label\n    this.context.font = \"10px Arial\";\n    this.context.fillStyle = \"#ffffff\";\n    this.context.fillText(MULTIPLIER_LABEL, 0, 8);\n    this.context.translate(73, 0);\n\n    // Multiplier\n    var i = _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MULTIPLIER_LIMIT - 1;\n\n    while (i--) {\n      this.context.save();\n      this.context.beginPath();\n\n      const x = 6 + (i / _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MULTIPLIER_LIMIT) * 80;\n      const y = 5;\n      const radius = 6;\n\n      this.context.fillStyle = 'rgba(40,40,40,0.8)';\n      this.context.arc(x, y, radius, 0, Math.PI * 2, true);\n      this.context.fill();\n\n      if (i < this.multiplier.major) {\n        this.context.beginPath();\n        this.context.shadowOffsetX = 0;\n        this.context.shadowOffsetY = 0;\n        this.context.shadowBlur = 14;\n        // this.context.shadowColor = \"rgba(0,240,255,0.9)\";\n        // this.context.fillStyle = 'rgba(0,200,220,0.8)';\n        this.context.shadowColor = \"rgba(255,150,0,0.9)\";\n        this.context.fillStyle = 'rgba(251,114,0, 0.8)';\n\n        if (i < this.multiplier.major - 1) {\n          // We're drawing a major (entirely filled) step\n          this.context.arc(x, y, radius, 0, Math.PI * 2, true);\n        }\n        else {\n          // We're drawing a minor (partly filled) step\n          this.context.fillStyle = \"rgba(251,114,0,\" + 0.8 * this.multiplier.minor + \")\";\n          // this.context.fillStyle = 'rgba(0,200,220,' + (0.8 * this.multiplier.minor) + ')';\n          this.context.arc(x, y, radius * this.multiplier.minor, 0, Math.PI * 2, false);\n        }\n\n        this.context.fill();\n      }\n\n      this.context.restore();\n    }\n\n    this.context.restore();\n\n    this.invalidate(0, 0, this.world.width, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].HEADER_HEIGHT + 5);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\nconsole.log(\"webpack is working\");\n\n\n\n\n\n\nlet canvas,\n  ctx,\n  prevX,\n  currX,\n  prevY,\n  currY,\n  lineColor = '#008080',\n  lineSize = 2,\n  width,\n  height;\n\nfunction init(){\n  canvas = document.getElementById('game-canvas');\n  ctx = canvas.getContext('2d');\n  width = canvas.width;\n  height = canvas.height;\n\n  canvas.addEventListener('mousemove', e => {\n    findxy(e);\n  });\n  canvas.addEventListener('mouseout', e => {\n    currX = currY = undefined;\n  });\n}\n\nfunction draw(){\n  ctx.beginPath();\n  ctx.moveTo(prevX, prevY);\n  ctx.lineTo(currX, currY);\n  ctx.strokeStyle = lineColor;\n  ctx.lineWidth = lineSize;\n  ctx.stroke();\n  ctx.closePath();\n}\n\nfunction findxy(e) {\n  if(currX === undefined && currY === undefined){\n    currX = e.clientX - canvas.offsetLeft;\n    currY = e.clientY - canvas.offsetTop;\n  }\n  prevX = currX;\n  prevY = currY;\n  currX = e.clientX - canvas.offsetLeft;\n  currY = e.clientY - canvas.offsetTop;\n  draw();\n}\n\n\nlet container, menu, game;\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  // init();\n  initialize();\n});\n\nconst initialize = () => {\n\n\n  container = document.getElementById('game');\n  menu = document.getElementById('menu');\n  canvas = document.getElementById('game-canvas');\n  const startButton = document.getElementById('start-button');\n\n  game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](menu);\n  window.game = game;\n\n  if (canvas && canvas.getContext) {\n    game.context = canvas.getContext('2d');\n\n    // Bind event listeners\n    startButton.addEventListener('click', onStartButtonClick, false);\n    document.addEventListener('mousedown', onDocumentMouseDownHandler, false);\n    document.addEventListener('mousemove', onDocumentMouseMoveHandler, false);\n    document.addEventListener('mouseup', onDocumentMouseUpHandler, false);\n    canvas.addEventListener('touchstart', onCanvasTouchStartHandler, false);\n    canvas.addEventListener('touchmove', onCanvasTouchMoveHandler, false);\n    canvas.addEventListener('touchend', onCanvasTouchEndHandler, false);\n    window.addEventListener('resize', onWindowResizeHandler, false);\n\n    // Force an initial layout\n    onWindowResizeHandler();\n\n    game.createSprites();\n\n    // Now that everything is laid out we can show the canvas & UI\n    // container.fadeIn(MENU_FADE_IN_DURATION);\n    // menu.hide().delay(MENU_FADE_IN_DURATION).fadeIn(MENU_FADE_IN_DURATION);\n\n    // Update the game state\n    document.body.setAttribute('class', _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].STATE_WELCOME);\n\n    game.reset();\n    game.update();\n  }\n  else {\n    alert('Doesn\\'t seem like your browser supports the HTML5 canvas element :(');\n  }\n};\n\nconst onStartButtonClick = (event) => {\n  game.start();\n  event.preventDefault();\n};\n\nconst onDocumentMouseDownHandler = (e) => {\n  game.mouse.down = true;\n  // console.log(game.mouse);\n};\n\nconst onDocumentMouseMoveHandler = (event) => {\n  game.mouse.previousX = game.mouse.x;\n  game.mouse.previousY = game.mouse.y;\n\n  game.mouse.x = event.clientX - (window.innerWidth - game.world.width) * 0.5;\n  game.mouse.y = event.clientY - (window.innerHeight - game.world.height) * 0.5;\n\n  game.mouse.velocityX = Math.abs(game.mouse.x - game.mouse.previousX) / game.world.width;\n  game.mouse.velocityY = Math.abs(game.mouse.y - game.mouse.previousY) / game.world.height;\n  // console.log(game.mouse);\n};\n\nconst onDocumentMouseUpHandler = (event) => {\n  game.mouse.down = false;\n  console.log(game.mouse);\n};\n\nconst onCanvasTouchStartHandler = (event) => {\n  if (event.touches.length == 1) {\n    event.preventDefault();\n\n    game.mouse.x = event.touches[0].pageX - (window.innerWidth - game.world.width) * 0.5;\n    game.mouse.y = event.touches[0].pageY - (window.innerHeight - game.world.height) * 0.5;\n\n    game.mouse.down = true;\n  }\n  // console.log(game.mouse);\n};\n\nconst onCanvasTouchMoveHandler = (event) => {\n  if (event.touches.length == 1) {\n    event.preventDefault();\n\n    game.mouse.x = event.touches[0].pageX - (window.innerWidth - game.world.width) * 0.5;\n    game.mouse.y = event.touches[0].pageY - (window.innerHeight - game.world.height) * 0.5 - 20;\n  }\n  // console.log(game.mouse);\n\n};\n\nconst onCanvasTouchEndHandler = (event) => {\n  game.mouse.down = false;\n  // console.log(game.mouse);\n\n};\n\nconst onWindowResizeHandler = () => {\n  // Update the game size\n  game.world.width = _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TOUCH_INPUT ? window.innerWidth : _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DEFAULT_WIDTH;\n  game.world.height = _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TOUCH_INPUT ? window.innerHeight : _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DEFAULT_HEIGHT;\n\n  // Resize the container\n  container.style.width = (game.world.width);\n  container.style.height = (game.world.height);\n\n  // Resize the canvas\n  canvas.width = game.world.width;\n  canvas.height = game.world.height;\n\n  // Determine the x/y position of the canvas\n  var cx = Math.max((window.innerWidth - game.world.width) * 0.5, 1);\n  var cy = Math.max((window.innerHeight - game.world.height) * 0.5, 1);\n\n  // Update the position of the canvas\n  container.style.left = cx;\n  container.style.top = cy;\n\n  // Center the menu\n  menu.style.left = (game.world.width - menu.style.width) / 2;\n  menu.style.top = (game.world.height - menu.style.width) / 2;\n\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/region.js":
/*!***********************!*\
  !*** ./src/region.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Region {\n  constructor(){\n    this.left = 999999;\n    this.top = 999999;\n    this.right = 0;\n    this.bottom = 0;\n  }\n\n  reset(){\n    this.left = 999999;\n    this.top = 999999;\n    this.right = 0;\n    this.bottom = 0; \n  }\n\n  inflate(x, y){\n    this.left = Math.min(this.left, x);\n    this.top = Math.min(this.top, y);\n    this.right = Math.max(this.right, x);\n    this.bottom = Math.max(this.bottom, y);\n  }\n\n  expand(x, y){\n    this.left -= x;\n    this.top -= y;\n    this.right += x;\n    this.bottom += y;\n  }\n  \n  contains(x, y){\n    return x > this.left && x < this.right && y > this.top && y < this.bottom;\n  }\n\n  size(){\n    return ((this.right - this.left) + (this.bottom - this.top)) / 2;\n  }\n\n  center(){\n    return new Point(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2);\n  }\n\n  toRectangle(){\n    return { x: this.left, y: this.top, width: this.right - this.left, height: this.bottom - this.top };\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Region);\n\n//# sourceURL=webpack:///./src/region.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: requestAnimFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requestAnimFrame\", function() { return requestAnimFrame; });\n// window.requestAnimFrame = (function () {\n//   return window.requestAnimationFrame ||\n//     window.webkitRequestAnimationFrame ||\n//     window.mozRequestAnimationFrame ||\n//     window.oRequestAnimationFrame ||\n//     window.msRequestAnimationFrame ||\n//     function (/* function */ callback, /* DOMElement */ element) {\n//       window.setTimeout(callback, 1000 / 60);\n//     };\n// })();\n\nconst requestAnimFrame = (cb) => {\n  // console.log('anim');\n  return window.requestAnimationFrame(cb) ||\n    window.webkitRequestAnimationFrame(cb) ||\n    window.mozRequestAnimationFrame(cb) ||\n    window.oRequestAnimationFrame(cb) ||\n    window.msRequestAnimationFrame(cb) ||\n    function (/* function */ cb, /* DOMElement */ element) {\n      window.setTimeout(cb, 1000 / 60);\n    };\n};\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });