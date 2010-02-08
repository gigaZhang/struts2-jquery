<#--
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
-->
<script type='text/javascript'>
	var options_tab_${parameters.id?html} = {};
  <#if parameters.id?if_exists != "">
	options_tab_${parameters.id?html}.id = "${parameters.id?html}";
  </#if>
  <#if parameters.cssStyle?if_exists != "">
	options_tab_${parameters.id?html}.cssstyle = "${parameters.cssStyle?html}";
  </#if>
  <#if parameters.cssClass?if_exists != "">
	options_tab_${parameters.id?html}.cssclass = "${parameters.cssClass?html}";
  </#if>
  <#if parameters.href?if_exists != "">
	options_tab_${parameters.id?html}.href = "${parameters.href?html}";
  <#elseif parameters.target?if_exists != "" >
	options_tab_${parameters.id?html}.href = "#${parameters.target?html}";
  <#else>
	options_tab_${parameters.id?html}.href = "#";
  </#if>
  <#if parameters.label?if_exists != "">
	options_tab_${parameters.id?html}.label = "${parameters.label?html}";
  </#if>
  <#if parameters.parentTabbedPanel?if_exists != "">
  options_${parameters.parentTabbedPanel?html}_tabs.push(options_tab_${parameters.id?html});
  </#if>
</script>