(function(jQuery) {
"use strict";

if (Echo.AppServer.Dashboard.isDefined("Echo.Apps.HTMLEmbedApp.Dashboard")) return;

var dashboard = Echo.AppServer.Dashboard.manifest("Echo.Apps.HTMLEmbedApp.Dashboard");

dashboard.inherits = Echo.Utils.getComponent("Echo.AppServer.Dashboards.AppSettings");

dashboard.config = {
	"ecl": [{
		"component": "Textarea",
		"name": "content",
		"type": "string",
		"config": {
			"title": "HTML code",
			"inputHeight": "45",
			"data": {"sample": "<script>\n	//... \n</script>"}
		}
	}]
};

dashboard.init = function() {
	this.parent();
};

Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
