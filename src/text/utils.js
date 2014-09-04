(function($) {
"use strict";

if (!window.Echo.AppServer.Utils) window.Echo.AppServer.Utils = {};

Echo.AppServer.Utils.filterContent = function(content, whiteList) {
		var sandbox = $('<div></div>').html(content);

		var sanitizeInPlace = function(DOMElement) {
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


})(Echo.jQuery);