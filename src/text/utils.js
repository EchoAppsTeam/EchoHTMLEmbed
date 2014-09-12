(function($) {
"use strict";

if (!window.Echo.Apps.Text) return;

if (!window.Echo.Apps.Text.Utils) window.Echo.Apps.Text.Utils = {};

Echo.Apps.Text.Utils.filterContent = function(content, whiteList) {
		var sandbox = $('<div></div>').html(Echo.Utils.sanitize(content, "html"));

		var sanitizeInPlace = function(DOMElement, keepTop) {
			var allowed, item, i;

			for (i = 0; i < DOMElement.children.length; i++) {
				item = DOMElement.children[i];
				sanitizeInPlace(item);
			}

			if (keepTop) return; // only sanitize children, do not alter this one node

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

		sanitizeInPlace(sandbox.get(0), true);

		content = sandbox.html();
		return content;
	};


})(Echo.jQuery);