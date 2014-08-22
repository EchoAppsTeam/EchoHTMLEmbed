(function($) {
"use strict";

if (Echo.AppServer.Dashboard.isDefined("Echo.Apps.Spacer.Dashboard")) return;

var dashboard = Echo.AppServer.Dashboard.manifest("Echo.Apps.Spacer.Dashboard");

dashboard.inherits = Echo.Utils.getComponent("Echo.AppServer.Dashboards.AppSettings");

dashboard.config = {
	"ecl": [{
		"name": "height",
		"type": "string",
		"component": "Input",
		"default": "0",
		"config": {
			"title": "Height (in pixels)",
			"desc": "Specifies the height of the horizontal line"
		}
	}]
};

dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
