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

package com.jgeppert.struts2.jquery.components;

import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.components.ListUIBean;
import org.apache.struts2.views.annotations.StrutsTag;
import org.apache.struts2.views.annotations.StrutsTagAttribute;
import org.apache.struts2.views.annotations.StrutsTagSkipInheritance;

import com.opensymphony.xwork2.util.ValueStack;

/**
 * <!-- START SNIPPET: javadoc --> Renders a accordion from a given list or map
 * <!-- END SNIPPET: javadoc -->
 * 
 * <p>
 * Examples
 * </p>
 * <!-- START SNIPPET: example1 --> &lt;sj:accordion list="mylist" /&gt; <!--
 * END SNIPPET: example1 -->
 */
@StrutsTag(name = "accordion", tldTagClass = "com.jgeppert.struts2.jquery.views.jsp.ui.AccordionTag", description = "Render an accordion from a List.")
public class Accordion extends ListUIBean {

  final private static transient Random RANDOM         = new Random();
  public static final String            JQUERYACTION   = "accordion";
  public static final String            TEMPLATE       = "accordion";
  public static final String            COMPONENT_NAME = Accordion.class.getName();

  protected String                      active;
  protected String                      animated;
  protected String                      autoHeight;
  protected String                      clearStyle;
  protected String                      collapsible;
  protected String                      fillSpace;
  protected String                      header;
  protected String                      openOnMouseover;
  protected String                      href;
  protected String                      paramKeys;
  protected String                      paramValues;
  protected String                      onBeforeTopics;
  protected String                      onAlwaysTopics;
  protected String                      onChangeTopics;

  public Accordion(ValueStack stack, HttpServletRequest request, HttpServletResponse response) {
    super(stack, request, response);
  }

  protected String getDefaultTemplate()
  {
    return TEMPLATE;
  }

  public void evaluateExtraParams()
  {
    super.evaluateExtraParams();

    addParameter("jqueryaction", JQUERYACTION);

    if (active != null) addParameter("active", findString(active));
    if (animated != null) addParameter("animated", findString(animated));
    if (autoHeight != null) addParameter("autoHeight", findValue(this.autoHeight, Boolean.class));
    if (clearStyle != null) addParameter("clearStyle", findValue(this.clearStyle, Boolean.class));
    if (collapsible != null) addParameter("collapsible", findValue(this.collapsible, Boolean.class));
    if (fillSpace != null) addParameter("fillSpace", findValue(this.fillSpace, Boolean.class));
    if (header != null) addParameter("header", findString(header));
    if (openOnMouseover != null) addParameter("openOnMouseover", findValue(this.openOnMouseover, Boolean.class));
    if (href != null) addParameter("href", findString(href));
    if (paramKeys != null) addParameter("paramKeys", findString(paramKeys));
    if (paramValues != null) addParameter("paramValues", findString(paramValues));

    if (onBeforeTopics != null) addParameter("onBeforeTopics", findString(onBeforeTopics));
    if (onChangeTopics != null) addParameter("onChangeTopics", findString(onChangeTopics));
    if (onAlwaysTopics != null) addParameter("onAlwaysTopics", findString(onAlwaysTopics));

    if ((this.id == null || this.id.length() == 0))
    {
      // resolves Math.abs(Integer.MIN_VALUE) issue reported by FindBugs
      // http://findbugs.sourceforge.net/bugDescriptions.html#RV_ABSOLUTE_VALUE_OF_RANDOM_INT
      int nextInt = RANDOM.nextInt();
      nextInt = nextInt == Integer.MIN_VALUE ? Integer.MAX_VALUE : Math.abs(nextInt);
      this.id = "accordion_" + String.valueOf(nextInt);
      addParameter("id", this.id);
    }
  }

  @Override
  @StrutsTagSkipInheritance
  public void setTheme(String theme)
  {
    super.setTheme(theme);
  }

  @Override
  public String getTheme()
  {
    return "jquery";
  }

  @StrutsTagAttribute(description = "Selector for the active element. Set to false to display none at start. Needs collapsible: true.  Default: 0")
  public void setActive(String active)
  {
    this.active = active;
  }

  @StrutsTagAttribute(description = "Choose your favorite animation, or disable them (set to false). Values are slide, bounceslide. Default: slide")
  public void setAnimated(String animated)
  {
    this.animated = animated;
  }

  @StrutsTagAttribute(description = "If set, the highest content part is used as height reference for all other parts. Provides more consistent animations. Default: true", defaultValue = "true", type = "Boolean")
  public void setAutoHeight(String autoHeight)
  {
    this.autoHeight = autoHeight;
  }

  @StrutsTagAttribute(description = "If set, clears height and overflow styles after finishing animations. This enables accordions to work with dynamic content. Won't work together with autoHeight. Default: false", defaultValue = "false", type = "Boolean")
  public void setClearStyle(String clearStyle)
  {
    this.clearStyle = clearStyle;
  }

  @StrutsTagAttribute(description = "Whether all the sections can be closed at once. Allows collapsing the active section by the triggering event. Default: false", defaultValue = "false", type = "Boolean")
  public void setCollapsible(String collapsible)
  {
    this.collapsible = collapsible;
  }

  @StrutsTagAttribute(description = "If set, the accordion completely fills the height of the parent element. Overrides autoheight.. Default: false", defaultValue = "false", type = "Boolean")
  public void setFillSpace(String fillSpace)
  {
    this.fillSpace = fillSpace;
  }

  @StrutsTagAttribute(description = "Selector for the header element. Default: h3", defaultValue = "h3")
  public void setHeader(String header)
  {
    this.header = header;
  }

  @StrutsTagAttribute(description = "open accordion on mouse over event. Default: false", defaultValue = "false", type = "Boolean")
  public void setOpenOnMouseover(String openOnMouseover)
  {
    this.openOnMouseover = openOnMouseover;
  }

  @StrutsTagAttribute(description = "Iterable source to populate from. If the list is a Map (key, value), the Map key will become the option 'value' parameter and the Map value will become the option body.", required = true)
  public void setList(Object list)
  {
    super.list = list;
  }

  @StrutsTagAttribute(description = "Property of list objects to get field value from")
  public void setListKey(String listKey)
  {
    super.listKey = listKey;
  }

  @StrutsTagAttribute(description = "Property of list objects to get field content from")
  public void setListValue(String listValue)
  {
    super.listValue = listValue;
  }

  @StrutsTagAttribute(description = "The URL to call to obtain the content. Note: If used with ajax context, the value must be set as an url tag value.")
  public void setHref(String href)
  {
    this.href = href;
  }

  @StrutsTagAttribute(description = "Comma seperated List of parameter names for the href url. e.g. queryParam1,queryParam2")
  public void setParamKeys(String paramKeys)
  {
    this.paramKeys = paramKeys;
  }

  @StrutsTagAttribute(description = "Comma seperated List of List Keys for parameter values. e.g. queryValue1,queryValue2")
  public void setParamValues(String paramValues)
  {
    this.paramValues = paramValues;
  }

  @StrutsTagAttribute(name = "onBeforeTopics", description = "Topics that are published before a load", type = "String", defaultValue = "")
  public void setOnBeforeTopics(String onBeforeTopics)
  {
    this.onBeforeTopics = onBeforeTopics;
  }

  @StrutsTagAttribute(name = "onAlwaysTopics", description = "A comma delimited list of topics that published always", type = "String", defaultValue = "")
  public void setOnAlwaysTopics(String onAlwaysTopics)
  {
    this.onAlwaysTopics = onAlwaysTopics;
  }

  @StrutsTagAttribute(name = "onChangeTopics", description = "A comma delimited list of topics that published when the element changed", type = "String", defaultValue = "")
  public void setOnChangeTopics(String onChangeTopics)
  {
    this.onChangeTopics = onChangeTopics;
  }
}