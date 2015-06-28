'use strict';

require('qtip2');

var extend = require('lodash/object/extend'),
		equals = require('lodash/lang/isEqual');

module.exports = function() {
	return {
		restrict: 'E',
		scope: {
			visible: 	'=',
			target:		'='
		},
		link: function(scope, element, attrs) {
			var my 					= attrs.tooltipMy || 'center left',
				at 						= attrs.tooltipAt || 'right center',
				content				= attrs.tooltipContent || attrs.tooltip,
				tooltipClass 	= attrs.tooltipClass || 'tooltip',
				closeButton 	= scope.$eval(attrs.tooltipCloseButton) || false,
				allowShow 		= scope.$eval(attrs.tooltipAllowShow) !== false,
				allowHide 		= scope.$eval(attrs.tooltipAllowHide) !== false,
				showEffect 		= scope.$eval(attrs.tooltipShowEffect) || false,
				hideEffect 		= scope.$eval(attrs.tooltipHideEffect) || false,
				hideDelay 		= scope.$eval(attrs.tooltipHideDelay) || false,
				adjustX				= parseInt(attrs.tooltipAdjustX) || 0,
				adjustY				= parseInt(attrs.tooltipAdjustY) || 0;

			content = {
				text: content || ''
			};

			if (attrs.tooltipTitle) {
				extend(content, {
					title: attrs.tooltipTitle
				});
			}

			if (closeButton) {
				extend(content, {
					button: true
				});
			}

			var qTipOptions = {
				content: content,
				position: {
					my: my,
					at: at,
					target: element,
					adjust: {
						method: 'shift'
					}
				},
				hide: hideEffect,
				style: tooltipClass
			};

			if (adjustX > 0) {
				if (qTipOptions.position.adjust) {
					qTipOptions.position.adjust.x = adjustX;
				} else {
					extend(qTipOptions.position, {
						adjust: {
							x: adjustX
						}
					});
				}
			}

			if (adjustY > 0) {
				if (qTipOptions.position.adjust) {
					qTipOptions.position.adjust.y = adjustY;
				} else {
					extend(qTipOptions.position, {
						adjust: {
							y: adjustY
						}
					});
				}
			}

			if (!!showEffect) {
				extend(qTipOptions, {
					show: {
						effect: function() {
							switch (showEffect.toLowerCase()) {
								case 'slide':
									$(this).slideDown();
									break;
							}
						}
					}
				});
			}

			if (!allowShow) {
				extend(qTipOptions, {
					show: {
						event: false
					}
				});
			}

			if (!!hideEffect) {
				extend(qTipOptions, {
					hide: {
						effect: function() {
							switch (hideEffect.toLowerCase()) {
								case 'slide':
									$(this).slideUp();
									break;
							}
						}
					}
				});
			}

			if (!!hideDelay) {
				if (!!qTipOptions.hide) {
					extend(qTipOptions.hide, {
						fixed: true,
						delay: 100
					});
				} else {
					extend(qTipOptions, {
						hide: {
							fixed: true,
							delay: 100
						}
					});
				}
			}

			if (!allowHide || closeButton) {
				if (!!qTipOptions.hide) {
					extend(qTipOptions.hide, {
						event: false
					});
				} else {
					extend(qTipOptions, {
						hide: {
							event: false
						}
					});
				}
			}

			$(element).qtip(qTipOptions);

			if (scope.target) {
				scope.$watch('target', function (newValue, oldValue) {
					if (!equals(newValue, oldValue)) {
						$(element).qtip('content', newValue);
					}
				});
			}

			if (attrs.tooltipVisible === "true") {
				scope.$watch('visible', function (newValue, oldValue) {
					$(element).qtip('toggle', newValue);

					if (newValue) {
						$('n17-tooltip-speechbubble').qtip('reposition', null, false);
					}
				});
			}
		}
	};
};
