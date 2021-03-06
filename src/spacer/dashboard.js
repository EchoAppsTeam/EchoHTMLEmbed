(function($) {
"use strict";

if (Echo.AppServer.Dashboard.isDefined("Echo.Apps.Spacer.Dashboard")) return;

var dashboard = Echo.AppServer.Dashboard.manifest("Echo.Apps.Spacer.Dashboard");

dashboard.inherits = Echo.Utils.getComponent("Echo.AppServer.Dashboards.AppSettings");

dashboard.config = {
	"ecl": [{
		"name": "height",
		"type": "number",
		"component": "Input",
		"default": 30,
		"config": {
			"title": "Height",
			"desc": "Specifies the height of the space"
		}
	}]
};

dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
