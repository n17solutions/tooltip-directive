# N17 Tooltip

## Angular Directive

Show a tooltip to give the user some information, can be shown or hidden either on a mouse event, or programmatically.

### Installation

**Bower**

`bower install --save n17tooltip`

**GitHub**

https://github.com/n17solutions/tooltip-directive.git

The usable files are housed in the **dist** folder

### Compatibility

N17 Tooltip requires:
* AngularJS
* jQuery
* qTip2

If you are already using these frameworks in your project, you should use the files from the **no-frameworks** folder. We have also included a full bundle in the **inc-frameworks** folder.

If using the **inc-frameworks** source, you will need to bootstrap an AngularJS App around all N17 Tooltips on the page. For Example:

```html
<div ng-app="n17-tooltip">
	<n17-tooltip-speechbubble>
		...
```

If using AngularJS in your app already, you will need to add N17 Tooltip as a dependency of your app. For Example:
```javascript
var app = angular.module('myapp', ['n17-tooltip']);
```

### Usage

```html
<n17-tooltip-speechbubble
	tooltip="Tooltip Content"
	tooltip-title="Tooltip Title">
		Tooltip Element
</n17-tooltip-speechbubble>
```

#### This will result in a speechbubble tooltip resembling
![Speechbubble tooltip screenshot]
(http://i.imgur.com/zTRPS2H.png)

### Options

There are many options available and they can be accessed using the Angular Directive attribute notation.
For Example:

```html
<n17-tooltip-speechbubble
	tooltip="Tooltip Content"
	tooltip-title="Tooltip Title"
	tooltip-close-button="true">
		Tooltip Element
</n17-tooltip-speechbubble>
```

This will show a close button within the tooltip to enable the dismissal of the popout, as shown in the previous screenshot.

*List of Options*
* tooltip-my:						String; The tooltip positioning (default: 'center left') (See: [QTip2 Positioning Guide] (https://github.com/qTip2/qTip2/wiki/Position))
* tooltip-at: 					String; The tooltip positioning (default: 'right center') (See: [QTip2 Positioning Guide] (https://github.com/qTip2/qTip2/wiki/Position))
* tooltip-class:				String; The CSS class to assign to the element (default: 'tooltip')
* tooltip-content:			String; The content to show within the tooltip
* tooltip:							String; Alias for tooltip-content
* tooltip-close-button:	Boolean; show a close button (default: false)
* tooltip-allow-hide:		Boolean; allow the tooltip to auto hide (default: true)
* tooltip-show-effect:	Enum; one of the effect values (see below)
* tooltip-hide-effect:	Enum; one of the effect values (see below)
* tooltip-hide-delay:		Boolean; Whether to have a delay before the tooltip hides
* tooltip-adjust-x:			Int; adjusts the position of the tooltip along the x axis by the amount of pixels specified
* tooltip-adjust-y:			Int; adjusts the position of the tooltip along the y axis by the amount of pixels specified
* expression:						Angular Expression; expression to use as the tooltip value

### Effects
N17 Tooltip supports animations and effects when showing and hiding the tooltip, the supported effects are:
* Slide - slides down on show and up on hide
