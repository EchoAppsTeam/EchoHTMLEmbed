(function($) {
"use strict";

if (Echo.AppServer.Dashboard.isDefined("Echo.Apps.Image.Dashboard")) return;

var dashboard = Echo.AppServer.Dashboard.manifest("Echo.Apps.Image.Dashboard");

dashboard.inherits = Echo.Utils.getComponent("Echo.AppServer.Dashboards.AppSettings");

dashboard.config = {
	"ecl": [{
		"name": "imageURL",
		"type": "string",
		"component": "Filepicker",
		"config": {
			"title": "Image",
			"desc": "Specifies the image URL"
		}
	}, {
		"name": "height",
		"type": "number",
		"component": "Input",
		"config": {
			"title": "Max Height",
			"desc": "Specifies the maximum height of the image"
		}
	}, {
		"name": "width",
		"type": "number",
		"component": "Input",
		"config": {
			"title": "Max Width",
			"desc": "Specifies the maximum width of the image"
		}
	}, {
		"name": "alt",
		"type": "string",
		"component": "Input",
		"config": {
			"title": "Tooltip",
			"desc": "Specifies text to be displayed on cursor hover"
		}
	}, {
		"name": "linkURL",
		"type": "string",
		"component": "Input",
		"config": {
			"title": "Link",
			"desc": "Specifies hyperlink URL. Leave blank for no link."
		}
	}]
};

dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
