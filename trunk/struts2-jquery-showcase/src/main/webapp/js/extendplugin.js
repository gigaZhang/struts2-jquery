/*
 * extendplugin.js
 *
 * Requires use of  jquery.struts2.js
 *
 * Copyright (c) 2010 Johannes Geppert http://www.jgeppert.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/*global $, jQuery, s2jlog  */


( function($) {
	$.mys2jextend = {
			myrichtextextend : function($elem, options) {
				s2jlog('richtext for : '+options.id);
				$.requireCss("jquery.wysiwyg.css", "js/jwysiwyg/");
				$.require("jquery.wysiwyg.js", null, "js/jwysiwyg/");
				$elem.wysiwyg(options.wysiwygoptions);
				$(document).wysiwyg();
			}
	};

	$.extend($.mys2jextend, $.struts2_jquery);

})(jQuery);