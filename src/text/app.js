(function($) {
"use strict";

var textApp = Echo.App.manifest("Echo.Apps.Text");

if (Echo.App.isDefined("Echo.Apps.Text")) return;

textApp.config = {
	"content": "",
	"appkey": ""
};

textApp.labels = {
	"editorPlaceholder": "Write here&hellip;"
};

textApp.templates.main =
	'<div class="{class:container}">' +
	'<div class="{class:content}"></div>' +
	'</div>';

textApp.renderers.content = function(element) {
	element
		.empty()
		.append(this.config.get("content"));

	if (this.user.is("admin")) {
		this.installEditor(element);
	}

	return element;
};

textApp.methods.saveContent = function(content) {
	Echo.AppServer.FrameMessages.post(window.parent, {
		"topic": "textAppContentChange",
		"appId": this.getAppId(),
		"content": content
	}, "*");
};

textApp.methods.getAppId = function() {
	var match = this.config.get("target").attr("class").match(/echo-canvas-appId-([\w\d]+)/);
	return match && match[1];
};

textApp.methods.installEditor = function(element) {
	var self = this;

	Echo.Loader.download([{
		"url": "{%= baseURLs.prod %}/text/third-party/jquery.notebook.js",
		"loaded": function() {
			return !!$.fn.notebook;
		}
	}, {
		"url": "{%= baseURLs.prod %}/text/third-party/jquery.notebook.css"
	}, {
		"url": "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
	}], function() {
		// make an editor
		element
			.notebook({
				placeholder: self.labels.get("editorPlaceholder"),
				movingBubble: false,
				modifiers: ["bold", "italic", "underline", "h1", "h2", "h3", "ol", "ul", "anchor"]
			})
			.on("contentChange", Echo.Utils.debounce(function(e) {
				self.saveContent(e.originalEvent.detail.content);
			}, 300));
	});
};

textApp.css =
	".{class} { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; }" +
	".{class} .{class:content}.editor { min-height: 1em; }" +
	".{class} .jquery-notebook.bubble { height: auto; border-radius: 0; background: #28333b; }" +
	".{class} .jquery-notebook.bubble:after { background: #28333b; }" +
	".{class} .jquery-notebook.bubble button { font-size: 12px; width: 30px; height: 30px; color: white; opacity: 70%; }" +
	".{class} .jquery-notebook.bubble button:hover { font-size: 13px; opacity: 1; }" +
	".{class} .jquery-notebook.bubble button.active { font-size: 13px; opacity: 1; color: #54b9ee; }" + 
	".{class} .jquery-notebook p.placeholder + p { margin: 0; }" +
	".{class} .jquery-notebook.bubble.fixed:after { display: none; }" +
	".{class} .jquery-notebook.bubble button.h3:after { font-family: inherit; content: 'h3'; }";

Echo.App.create(textApp);

})(Echo.jQuery);
