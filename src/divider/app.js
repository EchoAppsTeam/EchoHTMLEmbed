(function($) {
"use strict";

var dividerApp = Echo.App.manifest("Echo.Apps.Divider");

if (Echo.App.isDefined("Echo.Apps.Divider")) return;

dividerApp.config = {
	"color": "#d2d2d2",
	"width": 1,
	"style": "solid"
};

dividerApp.templates.main ='<hr class="{class:line}">';

dividerApp.renderers.line = function(element) {
	var style = {
		"border-top-color": this.config.get("color"),
		"border-top-width": "" + (parseInt(this.config.get("width"),10) || 0) + "px",
		"border-top-style": this.config.get("style")
	};
	element.css(style);
	return element;
};

dividerApp.css = ".{class} .{class:line} { border: 0 none; }";

Echo.App.create(dividerApp);

})(Echo.jQuery);
