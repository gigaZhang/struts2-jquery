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
<#include "/${parameters.templateDir}/xhtml/controlheader.ftl" />
<#setting number_format="#.#####">
<select<#rt/>
 name="${parameters.name?default("")?html}"<#rt/>
 datatype="json"
<#if parameters.get("size")??>
 size="${parameters.get("size")?html}"<#rt/>
</#if>
<#if parameters.disabled?default(false)>
 disabled="disabled"<#rt/>
</#if>
<#if parameters.tabindex??>
 tabindex="${parameters.tabindex?html}"<#rt/>
</#if>
<#if parameters.id??>
 id="${parameters.id?html}"<#rt/>
</#if>
<#include "/${parameters.templateDir}/simple/css.ftl" />
<#if parameters.title??>
 title="${parameters.title?html}"<#rt/>
</#if>
<#if parameters.multiple?default(false)>
 multiple="multiple"<#rt/>
</#if>
<#if parameters.emptyOption?default(false)>
 emptyOption="true"<#rt/>
</#if>
<#if parameters.headerKey?? && parameters.headerValue??>
 headerKey="${parameters.headerKey?html}"<#rt/>
 headerValue="${parameters.headerValue?html}"<#rt/>
</#if>
<#if parameters.list??>
 list="${parameters.list?html}"<#rt/>
</#if>
<#if parameters.listKey??>
 listKey="${parameters.listKey?html}"<#rt/>
</#if>
<#if parameters.listValue??>
 listValue="${parameters.listValue?html}"<#rt/>
</#if>
  <#include "/${parameters.templateDir}/jquery/base.ftl" />
  <#include "/${parameters.templateDir}/jquery/action.ftl" />
  <#include "/${parameters.templateDir}/jquery/topics.ftl" />
  <#include "/${parameters.templateDir}/jquery/container.ftl" />
  <#include "/${parameters.templateDir}/jquery/draggable.ftl" />
  <#include "/${parameters.templateDir}/jquery/droppable.ftl" />
  <#include "/${parameters.templateDir}/jquery/resizable.ftl" />
  <#include "/${parameters.templateDir}/jquery/selectable.ftl" />
  <#include "/${parameters.templateDir}/jquery/sortable.ftl" />
<#include "/${parameters.templateDir}/simple/scripting-events.ftl" />
<#include "/${parameters.templateDir}/simple/common-attributes.ftl" />
<#include "/${parameters.templateDir}/simple/dynamic-attributes.ftl" />
>
<option value=""></option>
</select><#include "/${parameters.templateDir}/xhtml/controlfooter.ftl" />