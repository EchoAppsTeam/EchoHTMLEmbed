(function($) {
"use strict";

var textApp = Echo.App.manifest("Echo.Apps.Text");

if (Echo.App.isDefined("Echo.Apps.Text")) return;

textApp.config = {
	"content": ""
};

textApp.templates.main =
	'<div class="{class:container}">{config:content}</div>';

textApp.css =
	".{class} { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; }";

Echo.App.create(textApp);

})(Echo.jQuery);
