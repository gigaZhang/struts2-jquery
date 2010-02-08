<#--
/*
 * $Id: div-close.ftl 590812 2007-10-31 20:32:54Z apetrelli $
 *
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
</div>
<script type="text/javascript">
<#if parameters.bindOn?if_exists != "">
$('#${parameters.bindOn?html}').bind(
<#else>
$('#${parameters.id?html}').bind(
</#if>
	'${parameters.events?default('click')}', 
	function(e){
      <#if parameters.effectOptions?if_exists == "">
    	var optionse${parameters.id?html} = { };
      <#else>
   	 	var optionse${parameters.id?html} = { ${parameters.effectOptions?html} };
      </#if>
      <#if parameters.effectDuration?if_exists != "">
        $("#${parameters.id?trim}").effect("${parameters.effect?html}",optionse${parameters.id?html},${parameters.effectDuration?html});
      <#else>
        $("#${parameters.id?trim}").effect("${parameters.effect?html}",optionse${parameters.id?html},2000);
      </#if>
});
</script>