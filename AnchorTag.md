

# Introduction #

A tag that creates an HTML element, that when clicked makes an asynchronous request(XMLHttpRequest). The url attribute must be build using the `<s:url/>` tag.

# Samples #

## AJAX call to result div ##
```
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sj" uri="/struts-jquery-tags"%>
<html>
  <head>
    <sj:head/>
  </head>
  <body>
    <div id="div1">Div 1</div>
    <s:url var="ajaxTest" value="/AjaxTest.action"/>

    <sj:a id="link1" href="%{ajaxTest}" targets="div1">
      Update Content
    </sj:a>
  </body>
</html>
```

## AJAX call to multiple result divs with Highlight Effects ##

For effects, set **jqueryui="true"** in the sj:head tag.

Supported Effects are
  * bounce - Bounces the element vertically or horizontally n-times.
  * highlight - Highlights the background with a defined color.
  * pulsate - Pulsates the opacity of the element multiple times.
  * shake - Shakes the element vertically or horizontally n-times.
  * size - Resize an element to a specified width and height.
  * transfer - Transfers the outline of an element to another.

For **effectOptions** please look at the [jQuery UI Effects API](http://docs.jquery.com/UI/Effects)
```
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sj" uri="/struts-jquery-tags"%>
<html>
  <head>
    <sj:head jqueryui="true"/>
  </head>
  <body>
    <div id="div1">Div 1</div>
    <div id="div2">Div 2</div>
    <s:url var="ajaxTest" value="/AjaxTest.action"/>

    <sj:a id="link1" href="%{ajaxTest}" targets="div1, div2"  effect="highlight" effectOptions="{ color : '#222222' }" effectDuration="3000">
      Update Content
    </sj:a>
  </body>
</html>
```

## AJAX form submission ##
```
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sj" uri="/struts-jquery-tags"%>
<html>
  <head>
    <sj:head/>
  </head>
  <body>
    <s:form id="form" action="AjaxTest">
      <input type="textbox" name="data">   
    </s:form>

    <sj:a formId="form" targets="div1">Submit form</sj:a>
  </body>
</html>
```

## AJAX call to result div with events ##
```
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sj" uri="/struts-jquery-tags"%>
<html>
  <head>
    <sj:head/>
    <script type="text/javascript">
       $.subscribe('before', function(event,data) {
           alert('Before request ');
           $('#result').html('Loading ...');
       });
       $.subscribe('complete', function(event,data) {
           $('#result').append('<br/><br/><strong>Completed request '+event.originalEvent.request.statusText+' completed with '+event.originalEvent.status+ '.</strong><br/>Status: '+event.originalEvent.request.status);
       });
       $.subscribe('errorState', function(event,data) {
           $('#result').html('<br/><br/><strong>Error request '+event.originalEvent.request.statusText+' completed with '+event.originalEvent.status+ '.</strong><br/>Status: '+event.originalEvent.request.status);
       });
    </script>        
  </head>
  <body>
    <div id="result">Result Div</div>
 	<s:url var="ajax" value="/ajax1.action"/>
	
	<sj:a id="ajaxlink" href="%{ajax}" indicator="indicator" targets="result" onClickTopics="before" onCompleteTopics="complete" effect="pulsate" cssClass="buttonlink ui-state-default ui-corner-all"><span class="ui-icon ui-icon-refresh"></span>
	  Run AJAX Action
	</sj:a>
    <img id="indicator" src="images/indicator.gif" alt="Loading..." style="display:none"/>    
    <br/>
    <br/>
    <sj:a id="ajaxlink2" href="file-does-not-exist.html" indicator="indicator2" targets="result" onClickTopics="before" onCompleteTopics="complete" onErrorTopics="errorState" effect="pulsate" effectDuration="1500" cssClass="buttonlink ui-state-default ui-corner-all"><span class="ui-icon ui-icon-refresh"></span>
      Run AJAX Error Action
    </sj:a>
    <img id="indicator2" src="images/indicator.gif" alt="Loading..." style="display:none"/>    
  </body>
</html>
```

# Attributes #
> <table width='100%'>
<blockquote><tr>
<blockquote><th align='left' valign='top'><h4>Name</h4></th>
<th align='left' valign='top'><h4>Required</h4></th>
<th align='left' valign='top'><h4>Default</h4></th>
<th align='left' valign='top'><h4>Evaluated</h4></th>
<th align='left' valign='top'><h4>Type</h4></th>
<th align='left' valign='top'><h4>Description</h4></th>
</blockquote></tr>
<blockquote><tr>
<blockquote><td align='left' valign='top'>accesskey</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html accesskey attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>button</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>jQuery UI Button</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>buttonIcon</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Icons to display. The primary icon is displayed on the left of the label text. Value must be a classname (String), eg. ui-icon-gear.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>buttonIconSecondary</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Icons to display. The secondary icon is displayed on the right of the label text. Value must be a classname (String), eg. ui-icon-gear.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>buttonText</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>true</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Whether to show any text - when set to false (display no text), icons (see icons option) must be enabled, otherwise it'll be ignored.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>clearForm</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Clear all form fields after successful submit when using formIds. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cssClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css class to use for element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cssErrorClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css error class to use for element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cssErrorStyle</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css error style definitions for element to use</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>cssStyle</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The css style definitions for element to use</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>dataType</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Type of the result. e.g. html, xml, text, json, ...</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>disabled</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html disabled attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>effect</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>none</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Perform a effect on the elements specified in the 'targets' attribute. e.g. bounce, highlight, pulsate, shake, size or transfer. See more details at <a href='http://docs.jquery.com/UI/Effects'>http://docs.jquery.com/UI/Effects</a></td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>effectDuration</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>2000</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Duration of effect in milliseconds. Only valid if 'effect' attribute is set</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>effectMode</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>none</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The Effect Mode. show, hide, toggle, none</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>effectOptions</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>jQuery options for effect, eg 'color : #aaaaaa' for the highlight effect or 'times : 3' for the bounce effect. Only valid if 'effect' attribute is set. See more details at <a href='http://docs.jquery.com/UI/Effects'>http://docs.jquery.com/UI/Effects</a></td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>errorElementId</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>This should provide the id of the element into which the error text will be placed when an error ocurrs loading the container. If 'errorTest' is provided, that  wil be used, otherwise the ajax error message text wil be used.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>errorPosition</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Define error position of form element (top|bottom)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>errorText</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The text to be displayed on load error. If 'errorElement' is provided, this will display the error in the elemtn (if existing), if not, it will display the error as the contents of this container</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>formIds</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Comma delimited list of form ids for which to serialize all fields during submission when this element is clicked (if multiple forms have overlapping element names, it is indeterminate which will be used)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>href</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The url to be use when this element is clicked</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>id</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>HTML id attribute</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>iframe</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Boolean flag indicating whether the form should always target the server response to an iframe when using formIds. This is useful in conjuction with file uploads. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>indicator</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If loading content into a target, Id of element that will be displayed during loading and hidden afterwards (will override settings for the target container)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>javascriptTooltip</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Use JavaScript to generate tooltips</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>key</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the key (name, value, label) for this particular component</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>label</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Label expression used for rendering an element specific label</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>labelSeparator</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>:</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>String that will be appended to the label</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>labelposition</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Define label position of form element (top/left)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>listenTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The comma separated list 'listenTopics' is the list of topic names that is used to trigger a request.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>loadingText</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>If loading content into a target, The text to be displayed during load (will be shown if any provided, will override settings for the target container)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>name</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The name to set for element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onAfterValidationTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published after the Ajax validation. event.originalEvent.formvalidate to see if validation passed/failed.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onAlwaysTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published always</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onBeforeTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Topics that are published before a load</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onBlurTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element is blured</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onChangeTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element changed</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onClickTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element is clicked</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onCompleteTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element ajax request is completed (will override settings for a target container if provided)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onDisableTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element disabled</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onEffectCompleteTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when an effect is completed </td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onEnableTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element is enabled</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onErrorTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element ajax request returns an error (will override settings for a target container if provided)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onFocusTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element is focused</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onSuccessTopics</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma delimited list of topics that published when the element ajax request is completed successfully  (will override settings for a target container if provided)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onblur</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'> Set the html onblur attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onchange</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onchange attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onclick</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onclick attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>ondblclick</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html ondblclick attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onfocus</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onfocus attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onkeydown</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onkeydown attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onkeypress</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onkeypress attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onkeyup</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onkeyup attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmousedown</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmousedown attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmousemove</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmousemove attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmouseout</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmouseout attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmouseover</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmouseover attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onmouseup</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onmouseup attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>onselect</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html onselect attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>openDialog</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>id of dialog that will be opened when clicked.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>openDialogTitle</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the title of a dialog opened by openDialog or openDialogTopics</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>openTemplate</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set template to use for opening the rendered html.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>replaceTarget</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Set to true if the target should be replaced or false if only the target contents should be replaced when using formIds.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>requestType</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>POST</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Type of the AJAX Request. POST, GET, PUT</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>requiredLabel</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>If set to true, the rendered element will indicate that input is required</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>requiredPosition</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Define required position of required form element (left|right)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>resetForm</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Reset the form after successful submi twhen using formIds. Default: false</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tabindex</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html tabindex attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>targets</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A comma separated list of ids of container elements to load with the contents from the result of this request</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>template</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The template (other than default) to use for rendering the element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>templateDir</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>The template directory.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>timeout</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>3000</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Integer</td>
<td align='left' valign='top'>jQuery options for timeout. Default is 3000</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>title</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the html title attribute on rendered html element</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltip</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Set the tooltip of this particular component</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltipConfig</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Deprecated. Use individual tooltip configuration attributes instead.</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltipCssClass</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>StrutsTTClassic</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>CSS class applied to JavaScrip tooltips</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltipDelay</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Classic</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Delay in milliseconds, before showing JavaScript tooltips </td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>tooltipIconPath</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Icon path used for image that will have the tooltip</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>validate</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>Boolean</td>
<td align='left' valign='top'>Enable client AJAX validation</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>validateFunction</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>A function that handle the client validation result. eg.: myValidation(form, errors)</td>
</blockquote></tr>
<tr>
<blockquote><td align='left' valign='top'>value</td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'></td>
<td align='left' valign='top'>false</td>
<td align='left' valign='top'>String</td>
<td align='left' valign='top'>Preset the value of input element.</td>
</blockquote></tr>
</blockquote></blockquote><blockquote></table>