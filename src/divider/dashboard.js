(function($) {
"use strict";

if (Echo.AppServer.Dashboard.isDefined("Echo.Apps.Divider.Dashboard")) return;

var dashboard = Echo.AppServer.Dashboard.manifest("Echo.Apps.Divider.Dashboard");

dashboard.inherits = Echo.Utils.getComponent("Echo.AppServer.Dashboards.AppSettings");

dashboard.config = {
	"ecl": [{
		"name": "color",
		"type": "string",
		"component": "Input",
		"default": "#d8d8d8",
		"config": {
			"title": "Line color",
			"desc": "Specifies the color of the horizontal line"
		}
	}, {
		"name": "width",
		"type": "number",
		"component": "Input",
		"default": 1,
		"config": {
			"title": "Line width",
			"desc": "Specifies the width of the horizontal line"
		}
	}, {
		"name": "style",
		"type": "string",
		"component": "Select",
		"default": "solid",
		"config": {
			"title": "Line style",
			"desc": "Specifies the style of the horizontal line",
			"options": [{
				"title": "none",
				"value": "none"
			}, {
				"title": "solid",
				"value": "solid"
			}, {
				"title": "dotted",
				"value": "dotted"
			}, {
				"title": "dashed",
				"value": "dashed"
			}, {
				"title": "double",
				"value": "double"
			}]
		}
	}]
};

dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
