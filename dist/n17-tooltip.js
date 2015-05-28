(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.n17tooltip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var angular 	= _dereq_('angular'),
	app 		= angular.module('n17-tooltip', []);

_dereq_('./directives');
},{"./directives":2,"angular":undefined}],2:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('angular').module('n17-tooltip');

app.directive('n17TooltipSpeechbubble', _dereq_('./speechbubble'));
},{"./speechbubble":3,"angular":undefined}],3:[function(_dereq_,module,exports){
'use strict';

_dereq_('qtip2');

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
},{"qtip2":undefined}]},{},[1])(1)
});