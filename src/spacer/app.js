(function($) {
"use strict";

var spacerApp = Echo.App.manifest("Echo.Apps.Spacer");

if (Echo.App.isDefined("Echo.Apps.Spacer")) return;

spacerApp.config = {
	"height": 30
};

spacerApp.templates.main ='<div class="{class:spacer}">';

spacerApp.renderers.spacer = function(element) {
	var style = {
		'height': "" + (parseInt(this.config.get("height"), 10) || 0) + "px"
	};
	element.css(style);

	return element;
};

Echo.App.create(spacerApp);

})(Echo.jQuery);