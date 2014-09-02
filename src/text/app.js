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

	var filterContent = function(content) {
		var sandbox = $('<div></div>').html(content);

		var sanitizeInPlace, whiteList;

		whiteList = {
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
		};

		sanitizeInPlace = function(DOMElement) {
			var allowed, item, i;

			for (i = 0; i < DOMElement.children.length; i++) {
				item = DOMElement.children[i];
				sanitizeInPlace(item);
			}

			allowed = whiteList[DOMElement.localName];
			if (!allowed) {
				for (i = 0; i < DOMElement.childNodes.length; i++) {
					item = DOMElement.childNodes[i];
					DOMElement.parentNode.insertBefore(item, DOMElement);
				}
				DOMElement.parentNode.removeChild(DOMElement);

			} else if (DOMElement.hasAttributes()) {
				for (i = 0; i < DOMElement.attributes.length; i++) {
					item = DOMElement.attributes[i];
					if (!(allowed[item.localName] && (item.value.search(allowed[item.localName]) > -1))) {
						DOMElement.removeAttribute(item.localName);
					}
				}
			}
		};

		sandbox.children().each(function() {
			sanitizeInPlace(this);
		});

		content = sandbox.html();
		return content;
	};

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
			.on("contentChange", Echo.Utils.debounce(function(e) {
				var content = filterContent(e.originalEvent.detail.content);
				self.view.get("result").find('textarea').val(content);
			}), 300);
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
