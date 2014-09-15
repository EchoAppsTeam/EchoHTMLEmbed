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
	var self = this;
	this.set("data.instance.config.topic", this._getSharedTopic());
	this._getAllAppKeys(function() {
		self.render();
		self.ready();
	});
	this._listenContentChange();
};

dashboard.methods._getAllAppKeys = function(callback) {
	var self = this;
	var customerId = this.config.get("data.customer.id");
	var request = this.config.get("request");
	var keys = this.get("appkeys");

	callback = callback || $.noop;

	if (keys && keys.length > 0) {
		callback.call(this);
	} else {
		request({
			"endpoint": "customer/" + customerId + "/appkeys",
			"success": function(response) {
				self.set("appkeys", response);
				callback.call(self);
			}
		});
	}
};

dashboard.methods._saveConfig = function() {
	Echo.AppServer.API.request({
		"endpoint": "instance/" + this.get("data.instance.id") + "/update",
		"data": {
			"data": {
				"config": this.get("data.instance.config")
			}
		}
	}).send();
};

dashboard.methods.declareInitialConfig = function() {
	var keys = this.get("appkeys");
	var result = {};
	if (keys && keys[0] && keys[0].key) {
		result.appkey = keys[0].key;
	}
	return result;
};

dashboard.methods._getSharedTopic = function() {
	return this.config.get("context");
};

dashboard.methods._listenContentChange = function() {
	var self = this;
	Echo.AppServer.FrameMessages.subscribe(function(data) {
		if (!data.content || (data.topic !== self._getSharedTopic())) return;
		data.content = Echo.Apps.Text.Utils.filterContent(data.content, {
			"b": {},
			"i": {},
			"h1": {},
			"h2": {},
			"h3": {},
			"h4": {},
			"p": {},
			"br": {},
			"ul": {},
			"ol": {},
			"li": {},
			"hr": {},
			"a": {
				"href": /^(https?\:)?\/\//
			}
		});
		self.set("data.instance.config.content", data.content);
		self.configurator.setValue({
			"content": data.content
		});
		self._saveConfig();
	});
};


Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
