(function($) {
"use strict";

var embedApp = Echo.App.manifest("Echo.Apps.HTMLEmbed");

if (Echo.App.isDefined("Echo.Apps.HTMLEmbed")) return;

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

Echo.App.create(embedApp);

})(Echo.jQuery);
