'use strict';

require('qtip2');

var _ = require('lodash');

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
				content 		= attrs.tooltipContent || attrs.tooltip,
				closeButton 	= attrs.tooltipCloseButton || false,
				allowHide 		= attrs.tooltipAllowHide || true,
				showEffect 		= attrs.tooltipShowEffect || false,
				hideEffect 		= attrs.tooltipHideEffect || false,
				hideDelay 		= attrs.tooltipHideDelay || false;

			content = {
				text: content
			};

			if (attrs.tooltipTitle) {
				_.extend(content, {
					title: attrs.tooltipTitle
				});
			}

			if (closeButton) {
				_.extend(content, {
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

			if (!!showEffect) {
				_.extend(qTipOptions, {
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

			if (!!hideEffect) {
				_.extend(qTipOptions, {
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
					_.extend(qTipOptions.hide, {
						fixed: true,
						delay: 100
					});
				} else {
					_.extend(qTipOptions, {
						hide: {
							fixed: true,
							delay: 100
						}
					});
				}
			}

			if (!allowHide || closeButton) {
				if (!!qTipOptions.hide) {
					_.extend(qTipOptions.hide, {
						event: false
					});
				} else {
					_.extend(qTipOptions, {
						hide: {
							event: false
						}
					});
				}
			}

			$(element).qtip(qTipOptions);

			if (attrs.tooltipVisible) {
				scope.$watch('visible', function (newValue, oldValue) {
					$(element).qtip('toggle', newValue);
				});
			}
		}
	};
};