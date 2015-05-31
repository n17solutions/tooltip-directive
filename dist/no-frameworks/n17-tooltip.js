(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("jquery"), require("qtip2"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "jquery", "qtip2"], factory);
	else if(typeof exports === 'object')
		exports["n17tooltip"] = factory(require("angular"), require("jquery"), require("qtip2"));
	else
		root["n17tooltip"] = factory(root["angular"], root["jquery"], root["qtip2"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	var app = angular.module('n17-tooltip', []);

	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var app = angular.module('n17-tooltip');

	app.directive('n17TooltipSpeechbubble', __webpack_require__(3));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(5);

	module.exports = function() {
		return {
			restrict: 'E',
			scope: {
				visible: '='
			},
			link: function(scope, element, attrs) {
				var my 				= attrs.tooltipMy || 'center left',
					at 				= attrs.tooltipAt || 'right center',
					tooltipClass 	= attrs.tooltipClass || 'tooltip',
					content 		= attrs.tooltipContent || attrs.tooltip;

				if (attrs.tooltipTitle) {
					content = {
						title: attrs.tooltipTitle,
						text: content
					};
				}

				$(element).qtip({
					content: content,
					position: {
						my: my,
						at: at,
						target: element,
						adjust: {
							method: 'shift'
						}
					},
					hide: {
						fixed: true,
						delay: 100
					},
					style: tooltipClass
				});

				if (attrs.tooltipVisible) {
					scope.$watch('visible', function (newValue, oldValue) {
						$(element).qtip('toggle', newValue);
					});
				}
			}
		};
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;