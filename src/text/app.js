(function($) {
"use strict";

var textApp = Echo.App.manifest("Echo.Apps.Text");

if (Echo.App.isDefined("Echo.Apps.Text")) return;

textApp.config = {
	"content": "",
	"appkey": "echo.echo.echo-topic-radar-dev.echo.prod" // TODO create the necessary structure to keep this one current
};

textApp.dependencies = [{
	"url": "{%= baseURLs.prod %}/text/third-party/jquery.notebook.js",
	"loaded": function() { 
		return !!$.fn.notebook;
	}
}];

textApp.templates.main =
	'<div class="{class:container}">' +
		'<div class="{class:content}"></div>' +
		'<div class="{class:result}" style="display: none;"><p><small>Please, copy the following to the HTML Code property of this app</small></p>' +
			'<textarea readonly></textarea>' +
		'</div>' +
	'</div>';

textApp.renderers.content = function(element) {
	var self = this,
		content = self.config.get("content");

	element
		.empty()
		.append(content);

	if (this.user.is("admin")) {
		Echo.Loader.download([{
			"url": "{%= baseURLs.prod %}/text/third-party/jquery.notebook.css"
		}, {
			"url": "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
		}]);

		this.view.get("result").show();
		// make an editor
		element
			.notebook({
				placeholder: "Write here&hellip;"
			})
			.on("contentChange", function(e) {
				var content = e.originalEvent.detail.content;
				self.view.get("result").find('textarea').val(content);
			});
	}

	return element;
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
