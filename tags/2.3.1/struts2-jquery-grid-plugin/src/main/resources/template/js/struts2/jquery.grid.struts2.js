/*
 * jquery.grid.struts2.js
 *
 * Integration of jqGrid with struts 2 
 *
 * Requires use of jquery.struts2.js
 *
 * Copyright (c) 2010 Johannes Geppert http://www.jgeppert.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/*global jQuery, window  */
/*jslint evil: true */

( function($) {
	
	/**
	 * Bind jqGrid to Struts2 Component
	 */
	$.struts2_jquery_grid = {

	lastselectedrow :'',

	grid : function($elem, o) {
		var self = this;
		self.log('grid for : '+o.id);
		self.require("i18n/grid.locale-"+self.gridLocal+".js", function() {
			$.jgrid.no_legacy_api = true;
			$.jgrid.useJSON = true;
		});
		if (!self.loadAtOnce) {
			self.require(
					[
					 "js/base/jquery.ui.widget"+self.minSuffix+".js",
					 "js/base/jquery.ui.mouse"+self.minSuffix+".js",
					 "js/base/jquery.ui.position"+self.minSuffix+".js",
					 "js/base/jquery.ui.button"+self.minSuffix+".js",
					 "js/base/jquery.ui.draggable"+self.minSuffix+".js",
					 "js/base/jquery.ui.droppable"+self.minSuffix+".js",
					 "js/base/jquery.ui.sortable"+self.minSuffix+".js",
					 "js/base/jquery.ui.selectable"+self.minSuffix+".js",
					 "js/base/jquery.ui.resizable"+self.minSuffix+".js",
					 "js/base/jquery.bgiframe"+self.minSuffix+".js",
					 "js/base/jquery.effects.core"+self.minSuffix+".js",
					 "js/base/jquery.effects.scale"+self.minSuffix+".js",
					 "js/base/jquery.effects.drop"+self.minSuffix+".js",
					 "js/base/jquery.ui.dialog"+self.minSuffix+".js",
					 "js/plugins/jquery.jqGrid.js"
					 ]);
		}
		else {
			self.require("js/plugins/jquery.jqGrid.js");
		}
		self.requireCss("themes/ui.jqgrid.css");
		var params = {};
		$.extend(params, o);
		
		if(o.url && o.formids) {
			var data = '';
			if (o.formids) {
				if (!self.loadAtOnce) {
					self.require("js/plugins/jquery.form"+self.minSuffix+".js");
				}
				$.each(o.formids.split(','), function(i, fid) {
					var query = $(self.escId(fid)).formSerialize();
					if (data != '') { data = data + '&' + query; }
					else { data = query; }
				});
			}
			if (o.url.lastIndexOf('?') > 0) {
				params.url = o.url + '&amp;' + data;
			}
			else {
				params.url = o.url + '?' + data;
			}
		}
		
		if (o.onselectrowtopics || (o.editurl && o.editinline === true)) {
			params.onSelectRow = function(id, status) {
				var data = {};
				data.id = id;
				data.status = status;
				data.grid = $elem;

				self.publishTopic($elem, o.onalwaystopics, data);
				$.struts2_jquery.publishTopic($elem, o.onselectrowtopics, data);
				if (o.editurl && o.editinline === true) {
					if ($.struts2_jquery_grid.lastselectedrow != '') {
						$elem.jqGrid('restoreRow', $.struts2_jquery_grid.lastselectedrow);
					}
					$.struts2_jquery_grid.lastselectedrow = id;
					$elem.jqGrid('editRow', id, true);
				}
			};
		}

		if (o.onselectalltopics) {
			params.onSelectAll = function(ids, status) {
				var data = {};
				data.ids = ids;
				data.status = status;
				data.grid = $elem;

				self.publishTopic($elem, o.onalwaystopics, data);
				self.publishTopic($elem, o.onselectalltopics, data);
			};
		}

		if(o.onbeforetopics) {
			params.loadBeforeSend = function(xhr) {
	
				var orginal = {};
				orginal.xhr = xhr;
	
				self.publishTopic($elem, o.onalwaystopics, orginal);
				self.publishTopic($elem, o.onbeforetopics, orginal);
			};
		}
		
		if(o.onpagingtopics) {
			params.onPaging = function(pgButton) {
	
				var orginal = {};
				orginal.pgButton = pgButton;
	
				self.publishTopic($elem, o.onalwaystopics, orginal);
				self.publishTopic($elem, o.onpagingtopics, orginal);
			};
		}
		
		if(o.onsortcoltopics) {
			params.onSortCol = function(index, iCol, sortorder) {
	
				var orginal = {};
				orginal.index = index;
				orginal.iCol = iCol;
				orginal.sortorder = sortorder;
	
				self.publishTopic($elem, o.onalwaystopics, orginal);
				self.publishTopic($elem, o.onsortcoltopics, orginal);
			};
		}

		if(o.oncellselecttopics) {
			params.onCellSelect = function(rowid, iCol, cellcontent, e) {
	
				var orginal = {};
				orginal.rowid = rowid;
				orginal.iCol = iCol;
				orginal.cellcontent = cellcontent;
				orginal.e = e;
	
				self.publishTopic($elem, o.onalwaystopics, orginal);
				self.publishTopic($elem, o.oncellselecttopics, orginal);
			};
		}
		
		if(o.ongridcompletetopics) {
			params.gridComplete = function() {
	
				var orginal = {};
	
				self.publishTopic($elem, o.onalwaystopics, orginal);
				self.publishTopic($elem, o.ongridcompletetopics, orginal);
			};
		}
		
		if(o.onfocustopics) {
			params.beforeSelectRow = function(rowid, e) {
	
				var orginal = {};
				orginal.rowid = rowid;
				orginal.e = e;
	
				self.publishTopic($elem, o.onalwaystopics, orginal);
				self.publishTopic($elem, o.onfocustopics, orginal);
			};
		}
		
		
		if (o.reloadtopics) {
			$.each(o.reloadtopics.split(','), function(i, rts) { 
				$elem.subscribe(rts, '_s2j_reloadgrid', o);
			});
		}

		if (!params.loadtext && self.defaults.loadingText !== null) {
			params.loadtext = self.defaults.loadingText;
		}
		
		params.loadComplete = self.pubCom($elem, o.onalwaystopics, o.oncompletetopics, null, null, o);
		params.loadError = self.pubErr($elem, o.onalwaystopics, o.onerrortopics, o.errortext);

		if (o.subgrid) {
			params.subGrid = true;

			// gridview can't be true when using the subgrid feature
			params.gridview = false;
			params.subGridRowExpanded = function(subgrid_id, row_id) {
				var subgrid_table_id = subgrid_id + "_table";
				var subgrid = $(self.escId(subgrid_id));
				var subgridhtml = "<table id='" + subgrid_table_id + "' class='scroll'></table>";
				if (o.subgridoptions.pager && o.subgridoptions.pager != "") {
					subgridhtml = subgridhtml + "<div id='" + subgrid_id + "_pager'></div>";
					o.subgridoptions.pager = subgrid_id + "_pager";
				}
				if (o.subgridoptions.navigator && o.subgridoptions.navigator != "") {
					subgridhtml = subgridhtml + "<div id='" + subgrid_id + "_navigator'></div>";
					o.subgridoptions.navigator = subgrid_id + "_navigator";
				}

				subgrid.html(subgridhtml);

				if (o.subgridoptions.url) {
					var to = o.subgridoptions.url.indexOf('?');
					if (to > 0) { o.subgridoptions.url = o.subgridoptions.url.substring(0, to); }
					o.subgridoptions.url = o.subgridoptions.url + "?id=" + row_id;
				}
				$(self.escId(subgrid_table_id)).jqGrid(o.subgridoptions);
			};
		}
		else {
			params.gridview = true;
		}
		
		$elem.jqGrid(params);
		

		if (o.resizable) {
			var ros = o.resizableoptions;
			var ro = window[ros];
			if (!ro) {
				ro = eval("( " + ros + " )");
			}
			else {
				ro = {};
			}
			ro.start = self.pubTops($elem, o.onalwaystopics, o.resizableonstarttopics);
			ro.stop = self.pubTops($elem, o.onalwaystopics, o.resizableonstoptopics);
			ro.resize = self.pubTops($elem, o.onalwaystopics, o.resizableonresizetopics);
			$elem.jqGrid('gridResize', ro);
		}

		if (o.draggable && o.droppable) {
			self.log('drag and drop for grid : '+o.id);
			var daos = o.draggableoptions;
			var dao = window[daos];
			if (!dao) {
				dao = eval("( " + daos + " )");
			}
			else {
				dao = {};
			}
			dao.drap = self.pubTops($elem, o.onalwaystopics, o.draggableondragtopics);

			var doos = o.droppableoptions;
			var doo = window[doos];
			if (!doo) {
				doo = eval("( " + doos + " )");
			}
			else {
				doo = {};
			}
			doo.activate = self.pubTops($elem, o.onalwaystopics, o.droppableonactivatetopics);
			doo.deactivate = self.pubTops($elem, o.onalwaystopics, o.droppableondeactivatetopics);
			doo.start = self.pubTops($elem, o.onalwaystopics, o.droppableonstarttopics);
			doo.stop = self.pubTops($elem, o.onalwaystopics, o.droppableonstoptopics);

			var ddo = {};
			ddo.drag_opts = dao;
			ddo.drop_opts = doo;
			ddo.connectWith = o.connectWith;
			ddo.onstart = self.pubTops($elem, o.onalwaystopics, o.draggableonstarttopics);
			ddo.onstop = self.pubTops($elem, o.onalwaystopics, o.draggableonstoptopics);
			ddo.ondrop = self.pubTops($elem, o.onalwaystopics, o.droppableondroptopics);
			$elem.jqGrid('gridDnD', ddo);
		}

		if (o.sortable) {
			self.log('sortable : '+o.id);
			var soos = o.sortableoptions;
			var soo = window[soos];
			if (!soo) {
				soo = eval("( " + soos + " )");
			}
			else {
				soo = {};
			}
			soo.beforeStop = self.pubTops($elem, o.onalwaystopics, o.sortableonbeforestoptopics);
			soo.stop = self.pubTops($elem, o.onalwaystopics, o.sortableonstoptopics);
			soo.start = self.pubTops($elem, o.onalwaystopics, o.sortableonstarttopics);
			soo.sort = self.pubTops($elem, o.onalwaystopics, o.sortableonsorttopics);
			soo.activate = self.pubTops($elem, o.onalwaystopics, o.sortableonactivatetopics);
			soo.deactivate = self.pubTops($elem, o.onalwaystopics, o.sortableondeactivatetopics);
			soo.over = self.pubTops($elem, o.onalwaystopics, o.sortableonovertopics);
			soo.out = self.pubTops($elem, o.onalwaystopics, o.sortableonouttopics);
			soo.remove = self.pubTops($elem, o.onalwaystopics, o.sortableonremovetopics);
			soo.receive = self.pubTops($elem, o.onalwaystopics, o.sortableonreceivetopics);
			soo.change = self.pubTops($elem, o.onalwaystopics, o.sortableonchangetopics);
			soo.update = self.pubTops($elem, o.onalwaystopics, o.sortableonupdatetopics);
			$elem.jqGrid('sortableRows', soo);
		}

		if (o.navigator) {
			var navparams = {};
			navparams.add = o.navigatoradd;
			navparams.del = o.navigatordel;
			navparams.edit = o.navigatoredit;
			navparams.refresh = o.navigatorrefresh;
			navparams.search = o.navigatorsearch;
			navparams.view = o.navigatorview;
			$elem.jqGrid('navGrid', self.escId(o.pager), navparams, o.navigatoreditoptions, o.navigatoraddoptions, o.navigatordeleteoptions, o.navigatorsearchoptions, o.navigatorviewoptions);
		}
		if (o.filter) {
			var fpara = {};
			if (o.filteroptions) { fpara = o.filteroptions; }
			$elem.jqGrid('filterToolbar', fpara);
		}
	}
	};
	
	// Extend it from orginal plugin
	$.extend($.struts2_jquery_grid, $.struts2_jquery);
	
	// Register handler for reloading grid
	$.subscribeHandler('_s2j_reloadgrid', function(event, data) {
		var o = {};
		$.extend(o, event.data);
		if (o.id) {

			if(o.url && o.formids) {
				var formdata = '';
				if (o.formids) {
					if (!$.struts2_jquery.loadAtOnce) {
						$.struts2_jquery.require("js/plugins/jquery.form"+$.struts2_jquery.minSuffix+".js");
					}
					$.each(o.formids.split(','), function(i, fid) {
						var query = $($.struts2_jquery.escId(fid)).formSerialize();
						if (formdata != '') { formdata = formdata + '&' + query; }
						else { formdata = query; }
					});
				}
				if (o.url.lastIndexOf('?') > 0) {
					o.url = o.url + '&amp;' + formdata;
				}
				else {
					o.url = o.url + '?' + formdata;
				}
			}
			var grid = $($.struts2_jquery.escId(o.id));
			grid.jqGrid('setGridParam',{url:o.url})
			$.struts2_jquery.log('reload grid '+o.id);
			grid.trigger("reloadGrid");  
		}
	});

})(jQuery);