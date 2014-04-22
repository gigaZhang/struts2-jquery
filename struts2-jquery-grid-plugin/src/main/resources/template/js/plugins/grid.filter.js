/*
 * jqFilter  jQuery jqGrid filter addon.
 * Copyright (c) 2011, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * 
 * The work is inspired from this Stefan Pirvu
 * http://www.codeproject.com/KB/scripting/json-filtering.aspx
 */
(function(a){a.fn.jqFilter=function(b){if(typeof b==="string"){var d=a.fn.jqFilter[b];if(!d){throw ("jqFilter - No such method: "+b)}var c=a.makeArray(arguments).slice(1);return d.apply(this,c)}var e=a.extend(true,{filter:null,columns:[],onChange:null,afterRedraw:null,checkValues:null,error:false,errmsg:"",errorcheck:true,showQuery:true,sopt:null,ops:[],operands:null,numopts:["eq","ne","lt","le","gt","ge","nu","nn","in","ni"],stropts:["eq","ne","bw","bn","ew","en","cn","nc","nu","nn","in","ni"],strarr:["text","string","blob"],groupOps:[{op:"AND",text:"AND"},{op:"OR",text:"OR"}],groupButton:true,ruleButtons:true,direction:"ltr"},a.jgrid.filter,b||{});return this.each(function(){if(this.filter){return}this.p=e;if(this.p.filter===null||this.p.filter===undefined){this.p.filter={groupOp:this.p.groupOps[0].op,rules:[],groups:[]}}var j,f=this.p.columns.length,g,k=/msie/i.test(navigator.userAgent)&&!window.opera;this.p.initFilter=a.extend(true,{},this.p.filter);if(!f){return}for(j=0;j<f;j++){g=this.p.columns[j];if(g.stype){g.inputtype=g.stype}else{if(!g.inputtype){g.inputtype="text"}}if(g.sorttype){g.searchtype=g.sorttype}else{if(!g.searchtype){g.searchtype="string"}}if(g.hidden===undefined){g.hidden=false}if(!g.label){g.label=g.name}if(g.index){g.name=g.index}if(!g.hasOwnProperty("searchoptions")){g.searchoptions={}}if(!g.hasOwnProperty("searchrules")){g.searchrules={}}}if(this.p.showQuery){a(this).append("<table class='queryresult ui-widget ui-widget-content' style='display:block;max-width:440px;border:0px none;' dir='"+this.p.direction+"'><tbody><tr><td class='query'></td></tr></tbody></table>")}var l=function(){return a("#"+a.jgrid.jqID(e.id))[0]||null};var h=function(o,i){var m=[true,""],p=l();if(a.isFunction(i.searchrules)){m=i.searchrules.call(p,o,i)}else{if(a.jgrid&&a.jgrid.checkValues){try{m=a.jgrid.checkValues.call(p,o,-1,i.searchrules,i.label)}catch(n){}}}if(m&&m.length&&m[0]===false){e.error=!m[0];e.errmsg=m[1]}};this.onchange=function(){this.p.error=false;this.p.errmsg="";return a.isFunction(this.p.onChange)?this.p.onChange.call(this,this.p):false};this.reDraw=function(){a("table.group:first",this).remove();var i=this.createTableForGroup(e.filter,null);a(this).append(i);if(a.isFunction(this.p.afterRedraw)){this.p.afterRedraw.call(this,this.p)}};this.createTableForGroup=function(p,A){var o=this,y;var z=a("<table class='group ui-widget ui-widget-content' style='border:0px none;'><tbody></tbody></table>"),w="left";if(this.p.direction==="rtl"){w="right";z.attr("dir","rtl")}if(A===null){z.append("<tr class='error' style='display:none;'><th colspan='5' class='ui-state-error' align='"+w+"'></th></tr>")}var m=a("<tr></tr>");z.append(m);var n=a("<th colspan='5' align='"+w+"'></th>");m.append(n);if(this.p.ruleButtons===true){var t=a("<select class='opsel'></select>");n.append(t);var v="",u;for(y=0;y<e.groupOps.length;y++){u=p.groupOp===o.p.groupOps[y].op?" selected='selected'":"";v+="<option value='"+o.p.groupOps[y].op+"'"+u+">"+o.p.groupOps[y].text+"</option>"}t.append(v).bind("change",function(){p.groupOp=a(t).val();o.onchange()})}var D="<span></span>";if(this.p.groupButton){D=a("<input type='button' value='+ {}' title='Add subgroup' class='add-group'/>");D.bind("click",function(){if(p.groups===undefined){p.groups=[]}p.groups.push({groupOp:e.groupOps[0].op,rules:[],groups:[]});o.reDraw();o.onchange();return false})}n.append(D);if(this.p.ruleButtons===true){var r=a("<input type='button' value='+' title='Add rule' class='add-rule ui-add'/>"),q;r.bind("click",function(){if(p.rules===undefined){p.rules=[]}for(y=0;y<o.p.columns.length;y++){var i=(o.p.columns[y].search===undefined)?true:o.p.columns[y].search,G=(o.p.columns[y].hidden===true),F=(o.p.columns[y].searchoptions.searchhidden===true);if((F&&i)||(i&&!G)){q=o.p.columns[y];break}}var E;if(q.searchoptions.sopt){E=q.searchoptions.sopt}else{if(o.p.sopt){E=o.p.sopt}else{if(a.inArray(q.searchtype,o.p.strarr)!==-1){E=o.p.stropts}else{E=o.p.numopts}}}p.rules.push({field:q.name,op:E[0],data:""});o.reDraw();return false});n.append(r)}if(A!==null){var s=a("<input type='button' value='-' title='Delete group' class='delete-group'/>");n.append(s);s.bind("click",function(){for(y=0;y<A.groups.length;y++){if(A.groups[y]===p){A.groups.splice(y,1);break}}o.reDraw();o.onchange();return false})}if(p.groups!==undefined){for(y=0;y<p.groups.length;y++){var x=a("<tr></tr>");z.append(x);var B=a("<td class='first'></td>");x.append(B);var C=a("<td colspan='4'></td>");C.append(this.createTableForGroup(p.groups[y],p));x.append(C)}}if(p.groupOp===undefined){p.groupOp=o.p.groupOps[0].op}if(p.rules!==undefined){for(y=0;y<p.rules.length;y++){z.append(this.createTableRowForRule(p.rules[y],p))}}return z};this.createTableRowForRule=function(v,x){var w=this,I=l(),n=a("<tr></tr>"),H,z,p,y,C="",B;n.append("<td class='first'></td>");var q=a("<td class='columns'></td>");n.append(q);var J=a("<select></select>"),A,E=[];q.append(J);J.bind("change",function(){v.field=a(J).val();p=a(this).parents("tr:first");for(H=0;H<w.p.columns.length;H++){if(w.p.columns[H].name===v.field){y=w.p.columns[H];break}}if(!y){return}y.searchoptions.id=a.jgrid.randId();if(k&&y.inputtype==="text"){if(!y.searchoptions.size){y.searchoptions.size=10}}var N=a.jgrid.createEl.call(I,y.inputtype,y.searchoptions,"",true,w.p.ajaxSelectOptions||{},true);a(N).addClass("input-elm");if(y.searchoptions.sopt){z=y.searchoptions.sopt}else{if(w.p.sopt){z=w.p.sopt}else{if(a.inArray(y.searchtype,w.p.strarr)!==-1){z=w.p.stropts}else{z=w.p.numopts}}}var L="",M=0;E=[];a.each(w.p.ops,function(){E.push(this.oper)});for(H=0;H<z.length;H++){A=a.inArray(z[H],E);if(A!==-1){if(M===0){v.op=w.p.ops[A].oper}L+="<option value='"+w.p.ops[A].oper+"'>"+w.p.ops[A].text+"</option>";M++}}a(".selectopts",p).empty().append(L);a(".selectopts",p)[0].selectedIndex=0;if(a.jgrid.msie&&a.jgrid.msiever()<9){var i=parseInt(a("select.selectopts",p)[0].offsetWidth,10)+1;a(".selectopts",p).width(i);a(".selectopts",p).css("width","auto")}a(".data",p).empty().append(N);a.jgrid.bindEv.call(I,N,y.searchoptions);a(".input-elm",p).bind("change",function(P){var O=P.target;v.data=O.nodeName.toUpperCase()==="SPAN"&&y.searchoptions&&a.isFunction(y.searchoptions.custom_value)?y.searchoptions.custom_value.call(I,a(O).children(".customelement:first"),"get"):O.value;w.onchange()});setTimeout(function(){v.data=a(N).val();w.onchange()},0)});var F=0;for(H=0;H<w.p.columns.length;H++){var t=(w.p.columns[H].search===undefined)?true:w.p.columns[H].search,G=(w.p.columns[H].hidden===true),K=(w.p.columns[H].searchoptions.searchhidden===true);if((K&&t)||(t&&!G)){B="";if(v.field===w.p.columns[H].name){B=" selected='selected'";F=H}C+="<option value='"+w.p.columns[H].name+"'"+B+">"+w.p.columns[H].label+"</option>"}}J.append(C);var D=a("<td class='operators'></td>");n.append(D);y=e.columns[F];y.searchoptions.id=a.jgrid.randId();if(k&&y.inputtype==="text"){if(!y.searchoptions.size){y.searchoptions.size=10}}var o=a.jgrid.createEl.call(I,y.inputtype,y.searchoptions,v.data,true,w.p.ajaxSelectOptions||{},true);if(v.op==="nu"||v.op==="nn"){a(o).attr("readonly","true");a(o).attr("disabled","true")}var m=a("<select class='selectopts'></select>");D.append(m);m.bind("change",function(){v.op=a(m).val();p=a(this).parents("tr:first");var i=a(".input-elm",p)[0];if(v.op==="nu"||v.op==="nn"){v.data="";if(i.tagName.toUpperCase()!=="SELECT"){i.value=""}i.setAttribute("readonly","true");i.setAttribute("disabled","true")}else{if(i.tagName.toUpperCase()==="SELECT"){v.data=i.value}i.removeAttribute("readonly");i.removeAttribute("disabled")}w.onchange()});if(y.searchoptions.sopt){z=y.searchoptions.sopt}else{if(w.p.sopt){z=w.p.sopt}else{if(a.inArray(y.searchtype,w.p.strarr)!==-1){z=w.p.stropts}else{z=w.p.numopts}}}C="";a.each(w.p.ops,function(){E.push(this.oper)});for(H=0;H<z.length;H++){A=a.inArray(z[H],E);if(A!==-1){B=v.op===w.p.ops[A].oper?" selected='selected'":"";C+="<option value='"+w.p.ops[A].oper+"'"+B+">"+w.p.ops[A].text+"</option>"}}m.append(C);var s=a("<td class='data'></td>");n.append(s);s.append(o);a.jgrid.bindEv.call(I,o,y.searchoptions);a(o).addClass("input-elm").bind("change",function(){v.data=y.inputtype==="custom"?y.searchoptions.custom_value.call(I,a(this).children(".customelement:first"),"get"):a(this).val();w.onchange()});var u=a("<td></td>");n.append(u);if(this.p.ruleButtons===true){var r=a("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del'/>");u.append(r);r.bind("click",function(){for(H=0;H<x.rules.length;H++){if(x.rules[H]===v){x.rules.splice(H,1);break}}w.reDraw();w.onchange();return false})}return n};this.getStringForGroup=function(o){var m="(",i;if(o.groups!==undefined){for(i=0;i<o.groups.length;i++){if(m.length>1){m+=" "+o.groupOp+" "}try{m+=this.getStringForGroup(o.groups[i])}catch(p){alert(p)}}}if(o.rules!==undefined){try{for(i=0;i<o.rules.length;i++){if(m.length>1){m+=" "+o.groupOp+" "}m+=this.getStringForRule(o.rules[i])}}catch(n){alert(n)}}m+=")";if(m==="()"){return""}return m};this.getStringForRule=function(r){var o="",t="",q,n,p,s,m=["int","integer","float","number","currency"];for(q=0;q<this.p.ops.length;q++){if(this.p.ops[q].oper===r.op){o=this.p.operands.hasOwnProperty(r.op)?this.p.operands[r.op]:"";t=this.p.ops[q].oper;break}}for(q=0;q<this.p.columns.length;q++){if(this.p.columns[q].name===r.field){n=this.p.columns[q];break}}if(n==undefined){return""}s=r.data;if(t==="bw"||t==="bn"){s=s+"%"}if(t==="ew"||t==="en"){s="%"+s}if(t==="cn"||t==="nc"){s="%"+s+"%"}if(t==="in"||t==="ni"){s=" ("+s+")"}if(e.errorcheck){h(r.data,n)}if(a.inArray(n.searchtype,m)!==-1||t==="nn"||t==="nu"){p=r.field+" "+o+" "+s}else{p=r.field+" "+o+' "'+s+'"'}return p};this.resetFilter=function(){this.p.filter=a.extend(true,{},this.p.initFilter);this.reDraw();this.onchange()};this.hideError=function(){a("th.ui-state-error",this).html("");a("tr.error",this).hide()};this.showError=function(){a("th.ui-state-error",this).html(this.p.errmsg);a("tr.error",this).show()};this.toUserFriendlyString=function(){return this.getStringForGroup(e.filter)};this.toString=function(){var m=this;function n(q){if(m.p.errorcheck){var p,o;for(p=0;p<m.p.columns.length;p++){if(m.p.columns[p].name===q.field){o=m.p.columns[p];break}}if(o){h(q.data,o)}}return q.op+"(item."+q.field+",'"+q.data+"')"}function i(q){var p="(",o;if(q.groups!==undefined){for(o=0;o<q.groups.length;o++){if(p.length>1){if(q.groupOp==="OR"){p+=" || "}else{p+=" && "}}p+=i(q.groups[o])}}if(q.rules!==undefined){for(o=0;o<q.rules.length;o++){if(p.length>1){if(q.groupOp==="OR"){p+=" || "}else{p+=" && "}}p+=n(q.rules[o])}}p+=")";if(p==="()"){return""}return p}return i(this.p.filter)};this.reDraw();if(this.p.showQuery){this.onchange()}this.filter=true})};a.extend(a.fn.jqFilter,{toSQLString:function(){var b="";this.each(function(){b=this.toUserFriendlyString()});return b},filterData:function(){var b;this.each(function(){b=this.p.filter});return b},getParameter:function(b){if(b!==undefined){if(this.p.hasOwnProperty(b)){return this.p[b]}}return this.p},resetFilter:function(){return this.each(function(){this.resetFilter()})},addFilter:function(b){if(typeof b==="string"){b=a.jgrid.parse(b)}this.each(function(){this.p.filter=b;this.reDraw();this.onchange()})}})})(jQuery);
