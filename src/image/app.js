(function($) {
"use strict";

var imageApp = Echo.App.manifest("Echo.Apps.Image");

if (Echo.App.isDefined("Echo.Apps.Image")) return;

imageApp.templates.main = '<div class="{class:imageWrapper}"><image class="{class:image}"></div>';

imageApp.renderers.image = function(element) {
	var targetRect = [this.config.get("width"), this.config.get("height")];

	element
		.hide()
		.attr("src", this.config.get("imageURL"))
		.attr("alt", this.config.get("alt"))
		.clone()
		.on("load", function() {
			// determining the real image size to properly scale it
			var fitWidth = function(imgSize, rect) {
				var widths = [imgSize[0]],
					width;
				for (var i = 0; i < 2; i++) {
					if (rect[i] > 0) {
						width = imgSize[0] * rect[i] / imgSize[i];
						if ((width > 0)) {
							widths.push(width);
						}
					}
				}
				return Math.min.apply(null, widths);
			};

			element
				.attr("width", "" + fitWidth([this.width, this.height], targetRect) + "px")
				.show();

			$(this).remove();
		})
		.css({
			"visibility": "hidden",
			"position": "absolute",
			"left": "100%"
		})
		.appendTo('body');

	return element;
};

imageApp.renderers.imageWrapper = function(element){
	var targetURL = this.config.get("linkURL");
	if (targetURL) {
		var a = $("<a></a>").attr("href", targetURL);
		element.find('img').wrap(a);
	}

	return element;
};

imageApp.config = {
	"imageURL": ""
};

imageApp.css = ".{class} {text-align: center;}" + 
	".{class} .{class:image} { max-width: 100%; height: auto; vertical-align: bottom;}";

Echo.App.create(imageApp);

})(Echo.jQuery);