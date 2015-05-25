'use strict';

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






/*'use strict';

module.exports = function() {
	return {
		restrict: 'E',
		scope: {
			visible: '='
		},
		controller: function($scope) {
			debugger;
		},
		link: function(scope, element, attrs) {
			debugger;
			var my 				= attrs.tooltipMy || 'bottom center',
				at 				= attrs.tooltipAt || 'top center',
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
					target: element
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
};*/