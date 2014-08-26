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
			"title": "HTML code",
			"inputHeight": "45",
			"data": {
				"sample": "<script>\n	//... \n</script>"
			}
		}
	}, {
		"component": "Select",
		"name": "appkey",
		"type": "string",
		"config": {
			"title": "StreamServer application key",
			"desc": "Specifies the application key for this instance",
			"options": []
		}
	}]
};
dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
