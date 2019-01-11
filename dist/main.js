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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconsole.log(\"webpack is working\");\n\n\n\n\n_util__WEBPACK_IMPORTED_MODULE_0__[\"requestAnimFrame\"]();\n\nlet canvas,\n  ctx,\n  prevX,\n  currX,\n  prevY,\n  currY,\n  lineColor = '#008080',\n  lineSize = 2,\n  width,\n  height;\n\nfunction init(){\n  canvas = document.getElementById('game-canvas');\n  ctx = canvas.getContext('2d');\n  width = canvas.width;\n  height = canvas.height;\n\n  canvas.addEventListener('mousemove', e => {\n    findxy(e);\n  });\n  canvas.addEventListener('mouseout', e => {\n    currX = currY = undefined;\n  });\n}\n\nfunction draw(){\n  ctx.beginPath();\n  ctx.moveTo(prevX, prevY);\n  ctx.lineTo(currX, currY);\n  ctx.strokeStyle = lineColor;\n  ctx.lineWidth = lineSize;\n  ctx.stroke();\n  ctx.closePath();\n}\n\nfunction findxy(e) {\n  if(currX === undefined && currY === undefined){\n    currX = e.clientX - canvas.offsetLeft;\n    currY = e.clientY - canvas.offsetTop;\n  }\n  prevX = currX;\n  prevY = currY;\n  currX = e.clientX - canvas.offsetLeft;\n  currY = e.clientY - canvas.offsetTop;\n  draw();\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  init();\n});\n\n// window.requestAnimFrame = (function () {\n//   return window.requestAnimationFrame ||\n//     window.webkitRequestAnimationFrame ||\n//     window.mozRequestAnimationFrame ||\n//     window.oRequestAnimationFrame ||\n//     window.msRequestAnimationFrame ||\n//     function (/* function */ callback, /* DOMElement */ element) {\n//       window.setTimeout(callback, 1000 / 60);\n//     };\n// })();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: requestAnimFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"requestAnimFrame\", function() { return requestAnimFrame; });\n// window.requestAnimFrame = (function () {\n//   return window.requestAnimationFrame ||\n//     window.webkitRequestAnimationFrame ||\n//     window.mozRequestAnimationFrame ||\n//     window.oRequestAnimationFrame ||\n//     window.msRequestAnimationFrame ||\n//     function (/* function */ callback, /* DOMElement */ element) {\n//       window.setTimeout(callback, 1000 / 60);\n//     };\n// })();\n\nconst requestAnimFrame = () => {\n  return window.requestAnimationFrame ||\n    window.webkitRequestAnimationFrame ||\n    window.mozRequestAnimationFrame ||\n    window.oRequestAnimationFrame ||\n    window.msRequestAnimationFrame ||\n    function (/* function */ callback, /* DOMElement */ element) {\n      window.setTimeout(callback, 1000 / 60);\n    };\n};\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });