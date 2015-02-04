(function($) {
"use strict";

var textApp = Echo.App.manifest("Echo.Apps.Text");

if (Echo.App.isDefined("Echo.Apps.Text")) return;

textApp.config = {
	"content": "",
	"filterOptions": {
		"b": {},
		"i": {},
		"h1": {},
		"h2": {},
		"h3": {},
		"p": {},
		"br": {},
		"ul": {},
		"ol": {},
		"li": {},
		"div": {},
		"a": {
			"href": /^(https?\:)?\/\//
		}
	}
};

textApp.templates.main =
	'<div class="{class:container}"></div>';

textApp.renderers.container = function(element) {
	return element
		.empty()
		.append(Echo.Apps.Text.Utils.filterContent(this.config.get("content"), this.config.get("filterOptions")));
};

textApp.css =
	".{class} { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; }";

Echo.App.create(textApp);

})(Echo.jQuery);
