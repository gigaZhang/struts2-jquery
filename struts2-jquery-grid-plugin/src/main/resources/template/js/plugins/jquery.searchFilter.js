/* Plugin:      searchFilter v1.2.9
 * Author:      Kasey Speakman (kasey@cornerspeed.com)
 * License:     Dual Licensed, MIT and GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html)
 */
jQuery.fn.searchFilter=function(a,c){function b(j,p,g){this.$=j;this.add=function(z){if(z==null){j.find(".ui-add-last").click()}else{j.find(".sf:eq("+z+") .ui-add").click()}return this};this.del=function(z){if(z==null){j.find(".sf:last .ui-del").click()}else{j.find(".sf:eq("+z+") .ui-del").click()}return this};this.search=function(z){j.find(".ui-search").click();return this};this.reset=function(z){if(z===undefined){z=false}j.find(".ui-reset").trigger("click",[z]);return this};this.close=function(){j.find(".ui-closer").click();return this};if(p!=null){function v(){jQuery(this).toggleClass("ui-state-hover");return false}function i(z){jQuery(this).toggleClass("ui-state-active",(z.type=="mousedown"));return false}function e(z,A){return"<option value='"+z+"'>"+A+"</option>"}function s(B,z,A){return"<select class='"+B+"'"+(A?" style='display:none;'":"")+">"+z+"</select>"}function w(z,B){var A=j.find("tr.sf td.data "+z);if(A[0]!=null){B(A)}}function q(z,B){var A=j.find("tr.sf td.data "+z);if(A[0]!=null){jQuery.each(B,function(){if(this.data!=null){A.bind(this.type,this.data,this.fn)}else{A.bind(this.type,this.fn)}})}}var n=jQuery.extend({},jQuery.fn.searchFilter.defaults,g);var y=-1;var x="";jQuery.each(n.groupOps,function(){x+=e(this.op,this.text)});x="<select name='groupOp'>"+x+"</select>";j.html("").addClass("ui-searchFilter").append("<div class='ui-widget-overlay' style='z-index: -1'>&#160;</div><table class='ui-widget-content ui-corner-all'><thead><tr><td colspan='5' class='ui-widget-header ui-corner-all' style='line-height: 18px;'><div class='ui-closer ui-state-default ui-corner-all ui-helper-clearfix' style='float: right;'><span class='ui-icon ui-icon-close'></span></div>"+n.windowTitle+"</td></tr></thead><tbody><tr class='sf'><td class='fields'></td><td class='ops'></td><td class='data'></td><td><div class='ui-del ui-state-default ui-corner-all'><span class='ui-icon ui-icon-minus'></span></div></td><td><div class='ui-add ui-state-default ui-corner-all'><span class='ui-icon ui-icon-plus'></span></div></td></tr><tr><td colspan='5' class='divider'><hr class='ui-widget-content' style='margin:1px'/></td></tr></tbody><tfoot><tr><td colspan='3'><span class='ui-reset ui-state-default ui-corner-all' style='display: inline-block; float: left;'><span class='ui-icon ui-icon-arrowreturnthick-1-w' style='float: left;'></span><span style='line-height: 18px; padding: 0 7px 0 3px;'>"+n.resetText+"</span></span><span class='ui-search ui-state-default ui-corner-all' style='display: inline-block; float: right;'><span class='ui-icon ui-icon-search' style='float: left;'></span><span style='line-height: 18px; padding: 0 7px 0 3px;'>"+n.searchText+"</span></span><span class='matchText'>"+n.matchText+"</span> "+x+" <span class='rulesText'>"+n.rulesText+"</span></td><td>&#160;</td><td><div class='ui-add-last ui-state-default ui-corner-all'><span class='ui-icon ui-icon-plusthick'></span></div></td></tr></tfoot></table>");var k=j.find("tr.sf");var h=k.find("td.fields");var f=k.find("td.ops");var o=k.find("td.data");var r="";jQuery.each(n.operators,function(){r+=e(this.op,this.text)});r=s("default",r,true);f.append(r);var l="<input type='text' class='default' style='display:none;' />";o.append(l);var u="";var t=false;var d=false;jQuery.each(p,function(C){var B=C;u+=e(this.itemval,this.text);if(this.ops!=null){t=true;var z="";jQuery.each(this.ops,function(){z+=e(this.op,this.text)});z=s("field"+B,z,true);f.append(z)}if(this.dataUrl!=null){if(C>y){y=C}d=true;var F=this.dataEvents;var D=this.dataInit;var A=this.buildSelect;jQuery.ajax(jQuery.extend({url:this.dataUrl,complete:function(H){var G;if(A!=null){G=jQuery("<div />").append(A(H))}else{G=jQuery("<div />").append(H.responseText)}G.find("select").addClass("field"+B).hide();o.append(G.html());if(D){w(".field"+C,D)}if(F){q(".field"+C,F)}if(C==y){j.find("tr.sf td.fields select[name='field']").change()}}},n.ajaxSelectOptions))}else{if(this.dataValues!=null){d=true;var E="";jQuery.each(this.dataValues,function(){E+=e(this.value,this.text)});E=s("field"+B,E,true);o.append(E)}else{if(this.dataEvents!=null||this.dataInit!=null){d=true;var E="<input type='text' class='field"+B+"' />";o.append(E)}}}if(this.dataInit!=null&&C!=y){w(".field"+C,this.dataInit)}if(this.dataEvents!=null&&C!=y){q(".field"+C,this.dataEvents)}});u="<select name='field'>"+u+"</select>";h.append(u);var m=h.find("select[name='field']");if(t){m.change(function(B){var A=B.target.selectedIndex;var C=jQuery(B.target).parents("tr.sf").find("td.ops");C.find("select").removeAttr("name").hide();var z=C.find(".field"+A);if(z[0]==null){z=C.find(".default")}z.attr("name","op").show();return false})}else{f.find(".default").attr("name","op").show()}if(d){m.change(function(B){var A=B.target.selectedIndex;var C=jQuery(B.target).parents("tr.sf").find("td.data");C.find("select,input").removeClass("vdata").hide();var z=C.find(".field"+A);if(z[0]==null){z=C.find(".default")}z.show().addClass("vdata");return false})}else{o.find(".default").show().addClass("vdata")}if(t||d){m.change()}j.find(".ui-state-default").hover(v,v).mousedown(i).mouseup(i);j.find(".ui-closer").click(function(z){n.onClose(jQuery(j.selector));return false});j.find(".ui-del").click(function(z){var A=jQuery(z.target).parents(".sf");if(A.siblings(".sf").length>0){if(n.datepickerFix===true&&jQuery.fn.datepicker!==undefined){A.find(".hasDatepicker").datepicker("destroy")}A.remove()}else{A.find("select[name='field']")[0].selectedIndex=0;A.find("select[name='op']")[0].selectedIndex=0;A.find(".data input").val("");A.find(".data select").each(function(){this.selectedIndex=0});A.find("select[name='field']").change(function(B){B.stopPropagation()})}return false});j.find(".ui-add").click(function(C){var D=jQuery(C.target).parents(".sf");var B=D.clone(true).insertAfter(D);B.find(".ui-state-default").removeClass("ui-state-hover ui-state-active");if(n.clone){B.find("select[name='field']")[0].selectedIndex=D.find("select[name='field']")[0].selectedIndex;var A=(B.find("select[name='op']")[0]==null);if(!A){B.find("select[name='op']").focus()[0].selectedIndex=D.find("select[name='op']")[0].selectedIndex}var z=B.find("select.vdata");if(z[0]!=null){z[0].selectedIndex=D.find("select.vdata")[0].selectedIndex}}else{B.find(".data input").val("");B.find("select[name='field']").focus()}if(n.datepickerFix===true&&jQuery.fn.datepicker!==undefined){D.find(".hasDatepicker").each(function(){var E=jQuery.data(this,"datepicker").settings;B.find("#"+this.id).unbind().removeAttr("id").removeClass("hasDatepicker").datepicker(E)})}B.find("select[name='field']").change(function(E){E.stopPropagation()});return false});j.find(".ui-search").click(function(C){var B=jQuery(j.selector);var z;var A=B.find("select[name='groupOp'] :selected").val();if(!n.stringResult){z={groupOp:A,rules:[]}}else{z='{"groupOp":"'+A+'","rules":['}B.find(".sf").each(function(D){var G=jQuery(this).find("select[name='field'] :selected").val();var F=jQuery(this).find("select[name='op'] :selected").val();var E=jQuery(this).find("input.vdata,select.vdata :selected").val();E+="";if(!n.stringResult){z.rules.push({field:G,op:F,data:E})}else{E=E.replace(/\\/g,"\\\\").replace(/\"/g,'\\"');if(D>0){z+=","}z+='{"field":"'+G+'",';z+='"op":"'+F+'",';z+='"data":"'+E+'"}'}});if(n.stringResult){z+="]}"}n.onSearch(z);return false});j.find(".ui-reset").click(function(A,B){var z=jQuery(j.selector);z.find(".ui-del").click();z.find("select[name='groupOp']")[0].selectedIndex=0;n.onReset(B);return false});j.find(".ui-add-last").click(function(){var A=jQuery(j.selector+" .sf:last");var z=A.clone(true).insertAfter(A);z.find(".ui-state-default").removeClass("ui-state-hover ui-state-active");z.find(".data input").val("");z.find("select[name='field']").focus();if(n.datepickerFix===true&&jQuery.fn.datepicker!==undefined){A.find(".hasDatepicker").each(function(){var B=jQuery.data(this,"datepicker").settings;z.find("#"+this.id).unbind().removeAttr("id").removeClass("hasDatepicker").datepicker(B)})}z.find("select[name='field']").change(function(B){B.stopPropagation()});return false});this.setGroupOp=function(B){selDOMobj=j.find("select[name='groupOp']")[0];var C={},z=selDOMobj.options.length,A;for(A=0;A<z;A++){C[selDOMobj.options[A].value]=A}selDOMobj.selectedIndex=C[B];jQuery(selDOMobj).change(function(D){D.stopPropagation()})};this.setFilter=function(F){var D=F.sfref,B=F.filter;var K=[],J,I,G,L,M,z={};selDOMobj=D.find("select[name='field']")[0];for(J=0,G=selDOMobj.options.length;J<G;J++){z[selDOMobj.options[J].value]={index:J,ops:{}};K.push(selDOMobj.options[J].value)}for(J=0,M=K.length;J<M;J++){selDOMobj=D.find(".ops > select[class='field"+J+"']")[0];if(selDOMobj){for(I=0,L=selDOMobj.options.length;I<L;I++){z[K[J]]["ops"][selDOMobj.options[I].value]=I}}selDOMobj=D.find(".data > select[class='field"+J+"']")[0];if(selDOMobj){z[K[J]]["data"]={};for(I=0,L=selDOMobj.options.length;I<L;I++){z[K[J]]["data"][selDOMobj.options[I].value]=I}}}var H,A,C,E,N;H=B.field;if(z[H]){A=z[H]["index"]}if(A!=null){C=z[H]["ops"][B.op];if(C===undefined){for(J=0,M=g.operators.length;J<M;J++){if(g.operators[J].op==B.op){C=J;break}}}E=B.data;if(z[H]["data"]==null){N=-1}else{N=z[H]["data"][E]}}if(A!=null&&C!=null&&N!=null){D.find("select[name='field']")[0].selectedIndex=A;D.find("select[name='field']").change();D.find("select[name='op']")[0].selectedIndex=C;D.find("input.vdata").val(E);D=D.find("select.vdata")[0];if(D){D.selectedIndex=N}return true}else{return false}}}}return new b(this,a,c)};jQuery.fn.searchFilter.version="1.2.9";jQuery.fn.searchFilter.defaults={clone:true,datepickerFix:true,onReset:function(a){alert("Reset Clicked. Data Returned: "+a)},onSearch:function(a){alert("Search Clicked. Data Returned: "+a)},onClose:function(a){a.hide()},groupOps:[{op:"AND",text:"all"},{op:"OR",text:"any"}],operators:[{op:"eq",text:"is equal to"},{op:"ne",text:"is not equal to"},{op:"lt",text:"is less than"},{op:"le",text:"is less or equal to"},{op:"gt",text:"is greater than"},{op:"ge",text:"is greater or equal to"},{op:"in",text:"is in"},{op:"ni",text:"is not in"},{op:"bw",text:"begins with"},{op:"bn",text:"does not begin with"},{op:"ew",text:"ends with"},{op:"en",text:"does not end with"},{op:"cn",text:"contains"},{op:"nc",text:"does not contain"}],matchText:"match",rulesText:"rules",resetText:"Reset",searchText:"Search",stringResult:true,windowTitle:"Search Rules",ajaxSelectOptions:{}};