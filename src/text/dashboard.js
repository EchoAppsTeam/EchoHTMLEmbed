(function($) {
"use strict";

if (Echo.AppServer.Dashboard.isDefined("Echo.Apps.Text.Dashboard")) return;

var dashboard = Echo.AppServer.Dashboard.manifest("Echo.Apps.Text.Dashboard");

dashboard.inherits = Echo.Utils.getComponent("Echo.AppServer.Dashboards.AppSettings");

dashboard.config = {
	"ecl": [{
		"component": "Wysiwyg",
		"name": "content",
		"type": "string",
		"config": {
			"title": "Text",
			"inputHeight": 45,
			"desc": "Specifies the text to be displayed.",
			"notebook": {
				"placeholder": "<p>Feel free to set any text here.</p>"
			},
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
		}
	}]
};

dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
