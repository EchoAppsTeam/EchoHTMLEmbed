(function($) {
"use strict";

if (Echo.AppServer.App.isDefined("Echo.AppServer.Controls.Configurator.GridItems.Wysiwyg")) return;

var wysiwyg = Echo.AppServer.App.manifest("Echo.AppServer.Controls.Configurator.GridItems.Wysiwyg");

wysiwyg.inherits = Echo.Utils.getComponent("Echo.AppServer.Controls.Configurator.GridItems.Base");

wysiwyg.init = function() {
	this.parent();
};

wysiwyg.config = {
	"notebook": {
		"placeholder": "",
		"modifiers": ["bold", "italic", "underline", "h1", "h2", "h3", "ol", "ul", "anchor"]
	}
};

wysiwyg.templates.main =
	'<div class="{inherited.class:container} {class:container}">' +
		'<div class="{inherited.class:header} {class:header}">' +
			'<div class="{inherited.class:headerPane} {class:headerPane} clearfix">' +
				'<div class="{inherited.class:valueContainer} {class:valueContainer}">' +
					'<div class="{inherited.class:value} {class:value}"></div>' +
				'</div>' +
				'<div class="{inherited.class:titleContainer} {class:titleContainer}">' +
					'<span class="{inherited.class:title} {class:title}">{config:title}</span>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>';

wysiwyg.renderers.value = function(element) {
	var content = Echo.Apps.Text.Utils.filterContent(this.get("data.value"), this.config.get("filterOptions"));
	return element
		.empty()
		.append(content)
		.notebook(this.config.get("notebook"))
		.on("contentChange", Echo.Utils.debounce(function(e) {
			this.setValue(e.originalEvent.detail.content);
		}.bind(this), 300));
};

wysiwyg.dependencies = [{
	"url": "{%= baseURLs.prod %}/text/third-party/jquery.notebook.js"
}, {
	"url": "{%= baseURLs.prod %}/text/third-party/jquery.notebook.css"
}, {
	"url": "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
}];

wysiwyg.css =
	'.echo-sdk-ui .{class:value}, .echo-sdk-ui .{class:value} p { font-size: 12px; line-height: initial; margin: 0px; white-space: initial; }' +
	'.echo-sdk-ui .{class:value} ul li, .echo-sdk-ui .{class:value} ol li { list-style: initial; }' +
	'.echo-sdk-ui .{class:value} ol li { list-style-type: decimal; }' +
	'.echo-sdk-ui .{class:value} h1, .echo-sdk-ui .{class:value} h2, .echo-sdk-ui .{class:value} h3 { line-height: 30px; }' +
	'.echo-sdk-ui .{class:value} h1 { font-size: 28px; }' +
	'.echo-sdk-ui .{class:value} h2 { font-size: 21px; }' +
	'.echo-sdk-ui .{class:value} h3 { font-size: 14px; }' +
	'.{class} .editor { min-height: 1em; }' +
	'.{class} .jquery-notebook.bubble { height: auto; border-radius: 0; background: #28333b; position: fixed; }' +
	'.{class} .jquery-notebook.bubble:after { background: #28333b; }' +
	'.{class} .jquery-notebook.bubble button { font-size: 12px; width: 30px; height: 30px; color: white; opacity: 70%; }' +
	'.{class} .jquery-notebook.bubble button:hover { font-size: 13px; opacity: 1; }' +
	'.{class} .jquery-notebook.bubble button.active { font-size: 13px; opacity: 1; color: #54b9ee; }' +
	'.{class} .jquery-notebook p.placeholder + p { margin: 0; }' +
	'.{class} .jquery-notebook.bubble.fixed:after { display: none; }' +
	'.{class} .jquery-notebook.bubble button.h3:after { font-family: inherit; content: "h3"; }';

Echo.AppServer.App.create(wysiwyg);

})(Echo.jQuery);
