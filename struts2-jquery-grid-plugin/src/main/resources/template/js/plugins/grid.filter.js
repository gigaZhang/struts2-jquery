/*
 * jqFilter  jQuery jqGrid filter addon.
 * Copyright (c) 2011, Tony Tomov, tony@trirand.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * 
 * The work is inspired from this Stefan Pirvu
 * http://www.codeproject.com/KB/scripting/json-filtering.aspx
 *
 * The filter uses JSON entities to hold filter rules and groups. Here is an example of a filter:
/*global jQuery, $, window, navigator */
(function(a){a.fn.jqFilter=function(b){if(typeof b==="string"){var d=a.fn.jqFilter[b];if(!d){throw ("jqFilter - No such method: "+b)}var c=a.makeArray(arguments).slice(1);return d.apply(this,c)}var e=a.extend(true,{filter:null,columns:[],onChange:null,afterRedraw:null,checkValues:null,error:false,errmsg:"",errorcheck:true,showQuery:true,sopt:null,ops:[{name:"eq",description:"equal",operator:"="},{name:"ne",description:"not equal",operator:"<>"},{name:"lt",description:"less",operator:"<"},{name:"le",description:"less or equal",operator:"<="},{name:"gt",description:"greater",operator:">"},{name:"ge",description:"greater or equal",operator:">="},{name:"bw",description:"begins with",operator:"LIKE"},{name:"bn",description:"does not begin with",operator:"NOT LIKE"},{name:"in",description:"in",operator:"IN"},{name:"ni",description:"not in",operator:"NOT IN"},{name:"ew",description:"ends with",operator:"LIKE"},{name:"en",description:"does not end with",operator:"NOT LIKE"},{name:"cn",description:"contains",operator:"LIKE"},{name:"nc",description:"does not contain",operator:"NOT LIKE"},{name:"nu",description:"is null",operator:"IS NULL"},{name:"nn",description:"is not null",operator:"IS NOT NULL"}],numopts:["eq","ne","lt","le","gt","ge","nu","nn","in","ni"],stropts:["eq","ne","bw","bn","ew","en","cn","nc","nu","nn","in","ni"],_gridsopt:[],groupOps:[{op:"AND",text:"AND"},{op:"OR",text:"OR"}],groupButton:true,ruleButtons:true,direction:"ltr"},a.jgrid.filter,b||{});return this.each(function(){if(this.filter){return}this.p=e;if(this.p.filter===null||this.p.filter===undefined){this.p.filter={groupOp:this.p.groupOps[0].op,rules:[],groups:[]}}var j,f=this.p.columns.length,g,k=/msie/i.test(navigator.userAgent)&&!window.opera;if(this.p._gridsopt.length){for(j=0;j<this.p._gridsopt.length;j++){this.p.ops[j].description=this.p._gridsopt[j]}}this.p.initFilter=a.extend(true,{},this.p.filter);if(!f){return}for(j=0;j<f;j++){g=this.p.columns[j];if(g.stype){g.inputtype=g.stype}else{if(!g.inputtype){g.inputtype="text"}}if(g.sorttype){g.searchtype=g.sorttype}else{if(!g.searchtype){g.searchtype="string"}}if(g.hidden===undefined){g.hidden=false}if(!g.label){g.label=g.name}if(g.index){g.name=g.index}if(!g.hasOwnProperty("searchoptions")){g.searchoptions={}}if(!g.hasOwnProperty("searchrules")){g.searchrules={}}}if(this.p.showQuery){a(this).append("<table class='queryresult ui-widget ui-widget-content' style='display:block;max-width:440px;border:0px none;' dir='"+this.p.direction+"'><tbody><tr><td class='query'></td></tr></tbody></table>")}var h=function(n,i){var l=[true,""];if(a.isFunction(i.searchrules)){l=i.searchrules(n,i)}else{if(a.jgrid&&a.jgrid.checkValues){try{l=a.jgrid.checkValues(n,-1,null,i.searchrules,i.label)}catch(m){}}}if(l&&l.length&&l[0]===false){e.error=!l[0];e.errmsg=l[1]}};this.onchange=function(){this.p.error=false;this.p.errmsg="";return a.isFunction(this.p.onChange)?this.p.onChange.call(this,this.p):false};this.reDraw=function(){a("table.group:first",this).remove();var i=this.createTableForGroup(e.filter,null);a(this).append(i);if(a.isFunction(this.p.afterRedraw)){this.p.afterRedraw.call(this,this.p)}};this.createTableForGroup=function(o,z){var n=this,x;var y=a("<table class='group ui-widget ui-widget-content' style='border:0px none;'><tbody></tbody></table>"),v="left";if(this.p.direction=="rtl"){v="right";y.attr("dir","rtl")}if(z===null){y.append("<tr class='error' style='display:none;'><th colspan='5' class='ui-state-error' align='"+v+"'></th></tr>")}var l=a("<tr></tr>");y.append(l);var m=a("<th colspan='5' align='"+v+"'></th>");l.append(m);if(this.p.ruleButtons===true){var s=a("<select class='opsel'></select>");m.append(s);var u="",t;for(x=0;x<e.groupOps.length;x++){t=o.groupOp===n.p.groupOps[x].op?" selected='selected'":"";u+="<option value='"+n.p.groupOps[x].op+"'"+t+">"+n.p.groupOps[x].text+"</option>"}s.append(u).bind("change",function(){o.groupOp=a(s).val();n.onchange()})}var C="<span></span>";if(this.p.groupButton){C=a("<input type='button' value='+ {}' title='Add subgroup' class='add-group'/>");C.bind("click",function(){if(o.groups===undefined){o.groups=[]}o.groups.push({groupOp:e.groupOps[0].op,rules:[],groups:[]});n.reDraw();n.onchange();return false})}m.append(C);if(this.p.ruleButtons===true){var q=a("<input type='button' value='+' title='Add rule' class='add-rule ui-add'/>"),p;q.bind("click",function(){if(o.rules===undefined){o.rules=[]}for(x=0;x<n.p.columns.length;x++){var i=(n.p.columns[x].search===undefined)?true:n.p.columns[x].search,F=(n.p.columns[x].hidden===true),E=(n.p.columns[x].searchoptions.searchhidden===true);if((E&&i)||(i&&!F)){p=n.p.columns[x];break}}var D;if(p.searchoptions.sopt){D=p.searchoptions.sopt}else{if(n.p.sopt){D=n.p.sopt}else{if(p.searchtype==="string"||p.searchtype==="text"){D=n.p.stropts}else{D=n.p.numopts}}}o.rules.push({field:p.name,op:D[0],data:""});n.reDraw();return false});m.append(q)}if(z!==null){var r=a("<input type='button' value='-' title='Delete group' class='delete-group'/>");m.append(r);r.bind("click",function(){for(x=0;x<z.groups.length;x++){if(z.groups[x]===o){z.groups.splice(x,1);break}}n.reDraw();n.onchange();return false})}if(o.groups!==undefined){for(x=0;x<o.groups.length;x++){var w=a("<tr></tr>");y.append(w);var A=a("<td class='first'></td>");w.append(A);var B=a("<td colspan='4'></td>");B.append(this.createTableForGroup(o.groups[x],o));w.append(B)}}if(o.groupOp===undefined){o.groupOp=n.p.groupOps[0].op}if(o.rules!==undefined){for(x=0;x<o.rules.length;x++){y.append(this.createTableRowForRule(o.rules[x],o))}}return y};this.createTableRowForRule=function(u,w){var v=this,m=a("<tr></tr>"),G,y,o,x,B="",A;m.append("<td class='first'></td>");var p=a("<td class='columns'></td>");m.append(p);var H=a("<select></select>"),z,D=[];p.append(H);H.bind("change",function(){u.field=a(H).val();o=a(this).parents("tr:first");for(G=0;G<v.p.columns.length;G++){if(v.p.columns[G].name===u.field){x=v.p.columns[G];break}}if(!x){return}x.searchoptions.id=a.jgrid.randId();if(k&&x.inputtype==="text"){if(!x.searchoptions.size){x.searchoptions.size=10}}var L=a.jgrid.createEl(x.inputtype,x.searchoptions,"",true,v.p.ajaxSelectOptions,true);a(L).addClass("input-elm");if(x.searchoptions.sopt){y=x.searchoptions.sopt}else{if(v.p.sopt){y=v.p.sopt}else{if(x.searchtype==="string"||x.searchtype==="text"){y=v.p.stropts}else{y=v.p.numopts}}}var J="",K=0;D=[];a.each(v.p.ops,function(){D.push(this.name)});for(G=0;G<y.length;G++){z=a.inArray(y[G],D);if(z!==-1){if(K===0){u.op=v.p.ops[z].name}J+="<option value='"+v.p.ops[z].name+"'>"+v.p.ops[z].description+"</option>";K++}}a(".selectopts",o).empty().append(J);a(".selectopts",o)[0].selectedIndex=0;if(a.browser.msie&&a.browser.version<9){var i=parseInt(a("select.selectopts",o)[0].offsetWidth,10)+1;a(".selectopts",o).width(i);a(".selectopts",o).css("width","auto")}a(".data",o).empty().append(L);a.jgrid.bindEv(L,x.searchoptions,v);a(".input-elm",o).bind("change",function(N){var M=a(this).hasClass("ui-autocomplete-input")?200:0;setTimeout(function(){var O=N.target;u.data=O.nodeName.toUpperCase()==="SPAN"&&x.searchoptions&&a.isFunction(x.searchoptions.custom_value)?x.searchoptions.custom_value(a(O).children(".customelement:first"),"get"):O.value;v.onchange()},M)});setTimeout(function(){u.data=a(L).val();v.onchange()},0)});var E=0;for(G=0;G<v.p.columns.length;G++){var s=(v.p.columns[G].search===undefined)?true:v.p.columns[G].search,F=(v.p.columns[G].hidden===true),I=(v.p.columns[G].searchoptions.searchhidden===true);if((I&&s)||(s&&!F)){A="";if(u.field===v.p.columns[G].name){A=" selected='selected'";E=G}B+="<option value='"+v.p.columns[G].name+"'"+A+">"+v.p.columns[G].label+"</option>"}}H.append(B);var C=a("<td class='operators'></td>");m.append(C);x=e.columns[E];x.searchoptions.id=a.jgrid.randId();if(k&&x.inputtype==="text"){if(!x.searchoptions.size){x.searchoptions.size=10}}var n=a.jgrid.createEl(x.inputtype,x.searchoptions,u.data,true,v.p.ajaxSelectOptions,true);if(u.op=="nu"||u.op=="nn"){a(n).attr("readonly","true");a(n).attr("disabled","true")}var l=a("<select class='selectopts'></select>");C.append(l);l.bind("change",function(){u.op=a(l).val();o=a(this).parents("tr:first");var i=a(".input-elm",o)[0];if(u.op==="nu"||u.op==="nn"){u.data="";i.value="";i.setAttribute("readonly","true");i.setAttribute("disabled","true")}else{i.removeAttribute("readonly");i.removeAttribute("disabled")}v.onchange()});if(x.searchoptions.sopt){y=x.searchoptions.sopt}else{if(v.p.sopt){y=v.p.sopt}else{if(x.searchtype==="string"||x.searchtype==="text"){y=e.stropts}else{y=v.p.numopts}}}B="";a.each(v.p.ops,function(){D.push(this.name)});for(G=0;G<y.length;G++){z=a.inArray(y[G],D);if(z!==-1){A=u.op===v.p.ops[z].name?" selected='selected'":"";B+="<option value='"+v.p.ops[z].name+"'"+A+">"+v.p.ops[z].description+"</option>"}}l.append(B);var r=a("<td class='data'></td>");m.append(r);r.append(n);a.jgrid.bindEv(n,x.searchoptions,v);a(n).addClass("input-elm").bind("change",function(){u.data=x.inputtype==="custom"?x.searchoptions.custom_value(a(this).children(".customelement:first"),"get"):a(this).val();v.onchange()});var t=a("<td></td>");m.append(t);if(this.p.ruleButtons===true){var q=a("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del'/>");t.append(q);q.bind("click",function(){for(G=0;G<w.rules.length;G++){if(w.rules[G]===u){w.rules.splice(G,1);break}}v.reDraw();v.onchange();return false})}return m};this.getStringForGroup=function(n){var l="(",i;if(n.groups!==undefined){for(i=0;i<n.groups.length;i++){if(l.length>1){l+=" "+n.groupOp+" "}try{l+=this.getStringForGroup(n.groups[i])}catch(o){alert(o)}}}if(n.rules!==undefined){try{for(i=0;i<n.rules.length;i++){if(l.length>1){l+=" "+n.groupOp+" "}l+=this.getStringForRule(n.rules[i])}}catch(m){alert(m)}}l+=")";if(l==="()"){return""}return l};this.getStringForRule=function(q){var n="",s="",p,m,o,r,l=["int","integer","float","number","currency"];for(p=0;p<this.p.ops.length;p++){if(this.p.ops[p].name===q.op){n=this.p.ops[p].operator;s=this.p.ops[p].name;break}}for(p=0;p<this.p.columns.length;p++){if(this.p.columns[p].name===q.field){m=this.p.columns[p];break}}if(m==null){return""}r=q.data;if(s==="bw"||s==="bn"){r=r+"%"}if(s==="ew"||s==="en"){r="%"+r}if(s==="cn"||s==="nc"){r="%"+r+"%"}if(s==="in"||s==="ni"){r=" ("+r+")"}if(e.errorcheck){h(q.data,m)}if(a.inArray(m.searchtype,l)!==-1||s==="nn"||s==="nu"){o=q.field+" "+n+" "+r}else{o=q.field+" "+n+' "'+r+'"'}return o};this.resetFilter=function(){this.p.filter=a.extend(true,{},this.p.initFilter);this.reDraw();this.onchange()};this.hideError=function(){a("th.ui-state-error",this).html("");a("tr.error",this).hide()};this.showError=function(){a("th.ui-state-error",this).html(this.p.errmsg);a("tr.error",this).show()};this.toUserFriendlyString=function(){return this.getStringForGroup(e.filter)};this.toString=function(){var l=this;function m(p){if(l.p.errorcheck){var o,n;for(o=0;o<l.p.columns.length;o++){if(l.p.columns[o].name===p.field){n=l.p.columns[o];break}}if(n){h(p.data,n)}}return p.op+"(item."+p.field+",'"+p.data+"')"}function i(p){var o="(",n;if(p.groups!==undefined){for(n=0;n<p.groups.length;n++){if(o.length>1){if(p.groupOp==="OR"){o+=" || "}else{o+=" && "}}o+=i(p.groups[n])}}if(p.rules!==undefined){for(n=0;n<p.rules.length;n++){if(o.length>1){if(p.groupOp==="OR"){o+=" || "}else{o+=" && "}}o+=m(p.rules[n])}}o+=")";if(o==="()"){return""}return o}return i(this.p.filter)};this.reDraw();if(this.p.showQuery){this.onchange()}this.filter=true})};a.extend(a.fn.jqFilter,{toSQLString:function(){var b="";this.each(function(){b=this.toUserFriendlyString()});return b},filterData:function(){var b;this.each(function(){b=this.p.filter});return b},getParameter:function(b){if(b!==undefined){if(this.p.hasOwnProperty(b)){return this.p[b]}}return this.p},resetFilter:function(){return this.each(function(){this.resetFilter()})},addFilter:function(b){if(typeof b==="string"){b=a.jgrid.parse(b)}this.each(function(){this.p.filter=b;this.reDraw();this.onchange()})}})})(jQuery);