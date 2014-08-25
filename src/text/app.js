(function($) {
"use strict";

var textApp = Echo.App.manifest("Echo.Apps.Text");

if (Echo.App.isDefined("Echo.Apps.Text")) return;

textApp.config = {
	"content": ""
};

textApp.templates.main =
	'<div class="{class:container}">' +
		'<div class="{class:content}"></div>' +
	'</div>';

textApp.renderers.content = function(element) {
	return element
		.empty()
		.append(this.config.get("content"));
};

Echo.App.create(textApp);

})(Echo.jQuery);
