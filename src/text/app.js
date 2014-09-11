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
	var content = this.config.get("content");

	element
		.empty()
		.append(content);

	if (this.user.is("admin")) {
		this.installEditor(element);
	}

	return element;
};

textApp.methods.saveContent = function(content) {
	content = Echo.Apps.Text.Utils.filterContent(content, {
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
	Echo.AppServer.FrameMessages.post(window.parent, {
		"topic": this.config.get("topic"),
		"content": content
	}, "*");
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
	}], function (){
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
	".{class} .jquery-notebook.bubble button.active { font-size: 13px; opacity: 1; color: #54b9ee; }";

Echo.App.create(textApp);

})(Echo.jQuery);
