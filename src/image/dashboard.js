(function($) {
"use strict";

if (Echo.AppServer.Dashboard.isDefined("Echo.Apps.Image.Dashboard")) return;

var dashboard = Echo.AppServer.Dashboard.manifest("Echo.Apps.Image.Dashboard");

dashboard.inherits = Echo.Utils.getComponent("Echo.AppServer.Dashboards.AppSettings");

dashboard.config = {
	"ecl": [{
			"name": "imageURL",
			"type": "string",
			"component": "Input",
			"default": "",
			"config": {
				"title": "Image URL",
				"desc": "Specifies URL the image will be loaded from"
			}
		}, {
			"name": "height",
			"type": "string",
			"component": "Input",
			"default": "",
			"config": {
				"title": "Height",
				"desc": "Specifies width of the image"
			}
		}, {
			"name": "width",
			"type": "string",
			"component": "Input",
			"default": "",
			"config": {
				"title": "Width",
				"desc": "Specifies height of the image"
			}
		}, {
			"name": "alt",
			"type": "string",
			"component": "Input",
			"default": "",
			"config": {
				"title": "Alt text",
				"desc": "Sets the alt text for image"
			}
		}, {
			"name": "linkURL",
			"type": "string",
			"component": "Input",
			"default": "",
			"config": {
				"title": "Hyperlink URL",
				"desc": "Sets the URL for hyperlink around the image"
			}
		}]
};

dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
