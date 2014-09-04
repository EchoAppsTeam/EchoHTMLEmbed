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
			"inputHeight": "45",
			"data": {
				"sample": "<h1>Hello!</h1><p>Feel free to set any text here.</p>"
			}
		}
	}]
};

dashboard.init = function() {
	this.set("data.instance.config.topic", this._getSharedTopic());
	this._autosetAppKey();

	this._listenContentChange();

	this.parent();
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

dashboard.methods._autosetAppKey = function() {
	this._getAllAppKeys(function() {
		var keys = this.get("appkeys");
		if (keys && keys[0] && keys[0].key) {
			this.set("data.instance.config.appkey", keys[0].key);
			this.update({
				"config": this.get("data.instance.config"),
				"instance": {
					"id": this.get("data.instance.id")
				}
			});
		}
	});
};

dashboard.methods._getSharedTopic = function() {
	return this.config.get("context");
};

dashboard.methods._listenContentChange = function() {
	var self = this;
	Echo.AppServer.FrameMessages.subscribe(function(data) {
		if ((data.topic === self._getSharedTopic()) && data.content) {
			data.content = Echo.AppServer.Utils.filterContent(data.content, {
				'b': {},
				'i': {},
				'h1': {},
				'h2': {},
				'h3': {},
				'h4': {},
				'p': {},
				'br': {},
				'ul': {},
				'ol': {},
				'li': {},
				'hr': {},
				'a': {
					'href': /^(https?\:)?\/\//
				}
			});
			self.set("data.instance.config.content", data.content);
			self.configurator.setValue({
				"content": data.content
			});
			self._saveConfig();
		}
	});
};


Echo.AppServer.Dashboard.create(dashboard);

})(Echo.jQuery);
