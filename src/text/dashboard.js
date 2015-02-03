(function($) {
"use strict";

if (Echo.AppServer.Dashboard.isDefined("Echo.Apps.Text.Dashboard")) return;

var dashboard = Echo.AppServer.Dashboard.manifest("Echo.Apps.Text.Dashboard");

dashboard.inherits = Echo.Utils.getComponent("Echo.AppServer.Dashboards.AppSettings");

dashboard.config = {
	"ecl": [{
		"component": "Textarea",
		"name": "content",
		"type": "string",
		"config": {
			"title": "Text",
			"inputHeight": 45,
			"desc": "Specifies the text to be displayed. Supports full HTML.",
			"data": {
				"sample": "<h1>Hello!</h1><p>Feel free to set any text here.</p>"
			}
		}
	}]
};

dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
