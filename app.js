(function($) {
"use strict";

var embedApp = Echo.App.manifest("Echo.Apps.HTMLEmbedApp");

if (Echo.App.isDefined("Echo.Apps.HTMLEmbedApp")) return;

embedApp.config = {
	"content": ""
};

embedApp.templates.main =
	'<div class="{class:container}">' +
		'<div class="{class:content}"></div>' +
	'</div>';

embedApp.renderers.content = function(element) {
	return element
		.empty()
		.append(this.config.get("content"));
};

embedApp.css = "";

Echo.App.create(embedApp);

})(Echo.jQuery);
