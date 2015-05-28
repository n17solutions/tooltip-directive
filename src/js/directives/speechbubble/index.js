'use strict';

require('qtip2');

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