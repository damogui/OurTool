var ENABLE_DEBUG=!1,ENABLE_IE_SUPPORT=!0;String.prototype.hasOwnProperty("trim")||(String.prototype.trim=function(){return this.replace(/^(\s|\r|\n|\r\n)*|(\s|\r|\n|\r\n)*$/g,"")});
var DOC=document,WIN=window,IsTouch="ontouchstart"in WIN,UA=WIN.navigator.userAgent,IsAndroid=/Android|HTC/i.test(UA)||!!(WIN.navigator.platform+"").match(/Linux/i),IsIPad=!IsAndroid&&/iPad/i.test(UA),IsIPhone=!IsAndroid&&/iPod|iPhone/i.test(UA),IsIOS=IsIPad||IsIPhone,IsWindowsPhone=/Windows Phone/i.test(UA),IsIEMobile=/IEMobile/i.test(UA),IsIE=!!DOC.all,PixelRatio=parseFloat(WIN.devicePixelRatio)||1,MAX_TOUCHMOVE_DISTANCE_FOR_CLICK=IsAndroid?10:6,START_EVENT=IsTouch?"touchstart":"mousedown",MOVE_EVENT=
IsTouch?"touchmove":"mousemove",END_EVENT=IsTouch?"touchend":"mouseup",_hasGetElementsByClassName=DOC.getElementsByClassName,ScreenSizeCorrect=1;if(ENABLE_IE_SUPPORT&&IsIE)try{DOC.execCommand("BackgroundImageCache",!1,!0)}catch(e$$12){}IsAndroid&&(WIN.screen.width/WIN.innerWidth).toFixed(2)==PixelRatio.toFixed(2)&&(ScreenSizeCorrect=1/PixelRatio);
var RR={uid:1,$:function(a,b){return 1>arguments.length?RR.fnCache||new RR.fn:new RR.dom(a,b)},fn:function(){RR.fnCache=this;return this},fnCache:null,selectorAll:DOC.querySelectorAll?function(a,b){b=b||DOC;for(var c=a.slice(1),d,e=!0,f="+~[>#. ".split(""),g=f.length;g--;)if(-1!=c.indexOf(f[g])){e=!1;break}return e?"#"==a.charAt(0)?(d=DOC.getElementById(c))?[d]:[]:_hasGetElementsByClassName&&"."==a.charAt(0)?b.getElementsByClassName(c):b.getElementsByTagName(a):b.querySelectorAll(a)}:function(a,b){return[]},
dom:function(a,b){this.context=[];if(a)if(a.nodeType||a===WIN)this.context=[a],this.length=1;else if("string"===typeof a){var c=a.length;if("<"===a.charAt(0)&&2<c&&">"===a.charAt(c-1)){a=a.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,"<$1></$2>");c=DOC.createElement("div");c.innerHTML=a;for(var d=0,e=c.childNodes.length;d<e;d++)this.context.push(c.childNodes[d])}else{if(b instanceof RR.dom&&(b=b.context[0],!b))return this.context=[],this.length=0,this;this.context=
RR.selectorAll(a,b)}this.length=this.context.length}else{if(a instanceof RR.dom)return a;if(a.length){for(var c=a,d=[],e=0,f=c.length;e<f;e++)d.push(c[e]);this.context=d;this.length=this.context.length}}else this.length=0;return this}};RR.dom.prototype={each:function(a){for(var b=0,c=this.length,d;b<c;b++)d=this.context[b],a.call(this,d,b);return this}};
RR.fn.prototype={extend:function(a,b){var c,d;for(c in b)d=b[c],null!==d&&(a[c]="object"==typeof d&&!d.nodeType&&!(d instanceof Array)?RR.fn.prototype.extend({},d):d);return a}};var $=RR.$;var JSON=WIN.JSON||{$specialChars:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},$replaceChars:function(a){return JSON.$specialChars[a]||"\\u00"+Math.floor(a.charCodeAt()/16).toString(16)+(a.charCodeAt()%16).toString(16)},stringify:function(a){type=a instanceof Array?"array":typeof a;switch(type){case "string":return'"'+a.replace(/[\x00-\x1f\\"]/g,JSON.$replaceChars)+'"';case "array":for(var b=[],c=0,d=a.length;c<d;c++)b.push(JSON.stringify(a[c]));return"["+b.join(",")+
"]";case "object":case "hash":b=[];for(c in a)d=a[c],(d=JSON.stringify(d))&&b.push(JSON.stringify(c)+":"+d);return"{"+b.join(",")+"}";case "number":case "boolean":return String(a);case !1:return"null"}return null},parse:function(a){return eval("("+a+")")}};var Storage=function(a,b){var c=Storage.getStorage();if(c){if("undefined"===typeof b)return(b=c.getItem(a))&&JSON.parse(b);c.setItem(a,JSON.stringify(b))}};Storage.getStorage=function(){var a;try{a=WIN.localStorage}catch(b){ENABLE_DEBUG&&alert("localStorage is not supported")}Storage.getStorage=function(){return WIN.localStorage};return a};Storage.clear=function(a){var b=Storage.getStorage();if(b)if(a)for(var c in b)0===c.indexOf(a)&&b.removeItem(c);else b.clear()};var Notification={reg:function(a,b){Notification._notificationData.hasOwnProperty(a)?Notification._notificationData[a].push(b):Notification._notificationData[a]=[b]},fire:function(a,b,c){c=c||WIN;b&&!(b instanceof Array)&&(b=[b]);a=Notification._notificationData[a]||[];var d,e=a.length;for(d=0;d<e;d++)a[d].apply(c,b)},_notificationData:{}};var URL={getQueryData:function(a){a=a.replace(/^\?+/,"").replace(/&amp;/,"&");a=a.split("&");for(var b=a.length,c={};b--;)if(item=a[b].split("="),item[0]){var d=item[1]||"";try{d=decodeURIComponent(d)}catch(e){d=unescape(d)}c[decodeURIComponent(item[0])]=d}return c},getQueryString:function(a,b){var c;c=b?URL.getElSearchString(b):WIN.location.search.substring(1);c=URL.getQueryData(c);return a in c?c[a]:null},getElSearchString:function(a){a=$(a).get(0);var b=a.search||"";if(!b){a="FORM"==a.nodeName?
a.getAttribute("action"):a.getAttribute("href");var c=a.indexOf("?");-1!==c&&(b=a.slice(c))}return b},setQueryString:function(a,b){a=$(a);var c=a.get(0),d=c.search,e=d||"",f;if(!d){var g,h=c.nodeName;if("FORM"==h)if("post"==c.method.toLowerCase())g=a.attr("action")||location+"";else{for(f in b)e=b[f],(c=$('input[name="'+f+'"]',a))?c.val(e):a.append($('<input type="hidden" name="'+f+'" value="'+e+'" />'));return}else g=a.attr("href")||location+"";var k=g.indexOf("?"),l=g.indexOf("#");-1==l&&(l=g.length);
0>k||k>l?(e="",k=l):e=g.slice(k+1,l)}var m=URL.getQueryData(e),n=[];for(f in b)m[f]=b[f];for(f in m)e=m[f],n.push(f+(e?"="+encodeURIComponent(e):""));1>n.length||(f="?"+n.join("&"),d?c.search=f:a.attr("FORM"==h?"action":"href",g.slice(0,k)+f+g.slice(l)))},objToQueryString:function(a){var b=[],c,d,e;for(c in a)if(d=a[c],d instanceof Array)for(e=d.length;e--;)b.push(c+"[]="+encodeURIComponent(d[e]));else b.push(c+(""===d?"":"="+encodeURIComponent(d)));return b.join("&")}};RR.fn.prototype.param=function(a){return URL.objToQueryString(a)};
RR.fn.prototype.getUrlParam=function(a,b){return URL.getQueryString(a,b)};var Cookie={isEnabled:!1,set:function(a,b,c,d){var e="";0!==c&&(e=new Date,e.setTime(e.getTime()+36E5*(c||24)),e=";expires="+e.toGMTString());a=escape(a)+"="+escape(b)+e+";path=/"+(d?";domain="+d:"");DOC.cookie=a},get:function(a){for(var b=DOC.cookie.split(";"),c,d=0;d<b.length;d++)if(c=b[d].split("="),c[0].trim()==a)return unescape(c[1]);return null},remove:function(a){Cookie.set(a,"",-1E3)},test:function(){Cookie.set("_c_t_","1");Cookie.isEnabled="1"===Cookie.get("_c_t_");Cookie.remove("_c_t_")}};RR.fn.prototype.ready=RR.dom.prototype.ready=function(a){!0===RR.loader.isLoaded?a():(RR.loader.callbacks.push(a),RR.loader.init());return this};RR.dom.prototype.remove=function(){return this.each(function(a){a.parentNode.removeChild(a)})};
RR.insertNodeBefore=function(a,b,c){var d=c?"insertBefore":"appendChild";if(a.nodeType)b[d](a,c);else if(a instanceof RR.dom)for(var e=0,f=a.length;e<f;e++)b[d](a.context[e],c);else if("string"===typeof a){var g=DOC.createElement("div");g.innerHTML=a;e=0;for(f=g.childNodes.length;e<f;e++)b[d](g.childNodes[0],c)}};RR.dom.prototype.before=function(a){return this.each(function(b){RR.insertNodeBefore(a,b.parentNode,b)})};
RR.dom.prototype.after=function(a){return this.each(function(b){RR.insertNodeBefore(a,b.parentNode,b.nextSibling)})};RR.dom.prototype.prepend=function(a){return this.each(function(b){RR.insertNodeBefore(a,b,b.firstChild)})};RR.dom.prototype.append=function(a){return this.each(function(b){RR.insertNodeBefore(a,b)})};RR.dom.prototype.insertBefore=function(a){$(a).before(this);return this};RR.dom.prototype.insertAfter=function(a){$(a).after(this);return this};
RR.dom.prototype.prependTo=function(a){$(a).prepend(this);return this};RR.dom.prototype.appendTo=function(a){$(a).append(this);return this};RR.dom.prototype.width=function(){var a=this.context[0];return a&&a.offsetWidth};RR.dom.prototype.height=function(){var a=this.context[0];return a&&a.offsetHeight};
RR.dom.prototype.offset=function(){var a=this.context[0];return a&&(a=(a=a.getBoundingClientRect)&&a())?{left:a.left+(WIN.pageXOffset||DOC.body.scrollTop||0),top:a.top+(WIN.pageYOffset||DOC.body.scrollLeft||0)}:{left:0,top:0}};RR.dom.prototype.first=function(){return this.eq(0)};RR.dom.prototype.last=function(){return this.eq(-1)};RR.dom.prototype.eq=function(a){return $(this.get(a))};RR.dom.prototype.indexOf=[].indexOf;RR.dom.prototype.index=function(){return this.parent().children().context.indexOf(this.get(0))};
RR.dom.prototype.get=function(a){var b=this.length;a+=0>a?b:0;return a>b-1?null:this.context[a]};RR.dom.prototype.parent=function(){var a=new RR.dom,b=[];this.each(function(a){b.push(a.parentNode)});a.context=b;a.length=b.length;return a};RR.dom.prototype.children=function(){var a=new RR.dom,b=[];this.each(function(a){for(var d=0,e=a.childNodes.length;d<e;d++){var f=a.childNodes[d];1==f.nodeType&&b.push(f)}});a.context=b;a.length=b.length;return a};
RR.dom.prototype.clone=function(a){var b=new RR.dom,c=[];this.each(function(b){c.push(b.cloneNode(!!a))});b.context=c;b.length=c.length;return b};RR.dom.uid=function(a){return a.__ruid||(a.__ruid=RR.uid++)};
RR.loader={callbacks:[],isInited:!1,isLoaded:!1,init:function(){if(!IsIE&&"loading"!=DOC.readyState)RR.loader.loaded();else if(!1===RR.loader.isInited)if(RR.loader.isInited=!0,DOC.addEventListener)DOC.addEventListener("DOMContentLoaded",RR.loader.loaded);else{var a=DOC.getElementById,b=a("_ir_");b||DOC.write('<script id="_ir_" defer="true" src="://">\x3c/script>');b=a("_ir_");b.onreadystatechange=function(){"complete"==this.readyState&&RR.loader.loaded()}}},loaded:function(){RR.loader.isLoaded=!0;
RR.loader.fire()},fire:function(){for(var a=RR.loader.callbacks,b=0,c=a.length;b<c;b++)if(ENABLE_DEBUG)a[b]();else try{a[b]()}catch(d){}RR.loader.callbacks=[]}};RR.dom.prototype.offset=function(){var a=this.context[0],b={left:0,top:0};if(a){do b.left+=a.offsetLeft||0,b.top+=a.offsetTop||0,a=a.offsetParent;while(a)}return b};RR.dom.prototype.html=function(a){var b=a;if("undefined"!==typeof b){var b=b+"",c=!0;-1<b.indexOf("<")&&-1<b.indexOf(">")&&(c=!1);return this.each(function(a){a&&"innerHTML"in a&&(a.innerHTML=b,c||Notification.fire("DOM.html",a))})}return(a=this.context[0])&&a.innerHTML};RR.dom.prototype.val=function(a){if("undefined"!==typeof a)return this.each(function(b){b.value=a});var b=this.context[0];return b&&b.value};
RR.dom.prototype.attr=function(a,b){if("undefined"!==typeof b)return this.each(function(c){c.setAttribute(a,b)});var c=this.context[0];return c&&c.getAttribute&&c.getAttribute(a)};RR.dom.prototype.removeAttr=function(a){return this.each(function(b){b.removeAttribute&&b.removeAttribute(a)})};
RR.dom.prototype.css=function(a,b){if("string"===(typeof a).toLowerCase()&&"undefined"===typeof b){var c=this.context[0];return c&&(c.currentStyle?c.currentStyle:window.getComputedStyle(c,null))[a]}return this.each(function(c){if("object"!==typeof a){var e={};e[a]=b;a=e}for(var f in a)e=a[f],""!==e&&(!isNaN(e)&&0!=e)&&(e+="px"),c.style[f]=e})};RR.dom.prototype.hasClass=function(a){a=(a||"").match(/\S+/g)||[];for(var b=a.length,c=0,d,e=this.length;c<e;c++)for(d=0;d<b;d++)if(-1<(" "+this.context[c].className+" ").indexOf(" "+a[d]+" "))return!0;return!1};RR.dom.prototype.addClass=function(a){var b=(a||"").match(/\S+/g)||[],c=b.length;return this.each(function(a){var e=" "+(a.className||"")+" ",f,g;for(g=0;g<c;g++)f=b[g],0>e.indexOf(" "+f+" ")&&(e+=f+" ");a.className=e.trim()})};
RR.dom.prototype.removeClass=function(a){var b=(a||"").match(/\S+/g)||[],c=b.length;return this.each(function(a){var e=" "+a.className+" ",f=e,g,h;for(h=0;h<c;h++)g=b[h],-1<e.indexOf(g)&&(e=e.replace(" "+g+" "," "));f!=e&&(a.className=e.trim())})};
RR.dom.prototype.toggleClass=function(a,b){var c=(a||"").match(/\S+/g)||[],d=c.length;return this.each(function(a){var f=" "+a.className+" ",g,h,k;for(k=0;k<d;k++)g=c[k],h=0>f.indexOf(" "+g+" "),"undefined"===typeof b&&(b=h),b?h&&(f+=g+" "):f=f.replace(" "+g+" "," ");a.className=f.trim()})};RR.dom.prototype.serialize=function(a){var b={},c=function(a,c){var f=b[a];"undefined"==typeof f?b[a]=c:f instanceof Array?f.push(c):b[a]=[f,c]};this.each(function(a){var e=a.nodeName;if("FORM"==e)$().extend(b,$(a.elements).serialize(!0));else{var f=a.name,g,h;f&&/INPUT|SELECT|BUTTON|TEXTAREA/i.test(e)&&(g=(a.type+"").toUpperCase(),f=f.replace(/\[\]$/,""),h=a.value,"SELECT"===e?(e=a.selectedIndex,0<=e&&(a=a.options[e],c(f,a.value))):"RADIO"===g||"CHECKBOX"===g?a.checked&&c(f,h):c(f,h))}});return a?
b:$().param(b)};
RR.dom.prototype.check=function(){var a=!0;this.each(function(b){if("FORM"==b.nodeName){for(var c=b.elements,d=0,e=c.length,f;d<e;d++){var g=c[d],h=g.getAttribute("required"),k=g.value.trim(),l=g.getAttribute("label")||g.getAttribute("placeholder")||g.name;if(""===k){if(null!==h){f=h||"\u8bf7\u586b\u5199"+l;IsAndroid||g.focus();break}}else if(g=g.getAttribute("length"))k=k.length,h=g.split(","),g=parseInt(h[0]||0,10),h=parseInt(h[1]||0,10),k<g?f=l+"\u7684\u957f\u5ea6\u81f3\u5c11"+g+"\u4e2a\u5b57\u7b26":
h&&k>h&&(f=l+"\u7684\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc7"+h+"\u4e2a\u5b57\u7b26")}f&&($(b).showFormTip(f,"error"),a=!1)}});return a};RR.dom.prototype.showFormTip=function(a,b){return this.each(function(c){var d=$(".form_tip",c);1>d.length&&(d=$('<div class="form_tip"></p>').prependTo(c));d.attr("class","form_tip "+b).html(a)})};var UseTouchClick=!1;IsAndroid||(UseTouchClick=!0);RR.event=function(a){if(a instanceof RR.event)return a;var b=a.changedTouches,b=b&&0<b.length?b[0]:a;this.event=a;this.originalEvent=b;this.target=a.target||a.srcElement;this.type=a.type;return this};RR.event.prototype={isPropagationStopped:!1,preventDefault:function(){var a=this.event;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){var a=this.event;this.isPropagationStopped=!0;a.stopPropagation&&a.stopPropagation()}};
RR.eventCache={};RR.eventType={delegated:"|click|mouseover|mouseout|mousemove|focus|blur|touchstart|touchmove|touchend|touchcancel",captured:"|focus|blur|"};RR.addEvent=DOC.addEventListener?function(a,b,c,d){b.addEventListener(a,c,d)}:function(a,b,c,d){b.attachEvent("on"+a,c)};
RR._addEventData=function(a,b,c,d){var e=RR.eventCache[a]||(RR.eventCache[a]={});b=e[b]||(e[b]=[]);e=-1!==RR.eventType.captured.indexOf(a);1>b.length&&(-1!==RR.eventType.delegated.indexOf(a)&&(c=DOC),RR.addEvent(a,c,RR.dispatchEvent,e));b.push(d)};RR.addTagEvent=function(a,b,c){b="t"+b.toUpperCase();RR._addEventData(a,b,DOC,c)};
RR.dispatchEvent=function(a){a=new RR.event(a);var b=a.type,c=a.target,d=RR.eventCache[b]||{};if("click"===b&&UseTouchClick&&!a.originalEvent.isSimulated)a.preventDefault();else for(;c;){var b=RR.dom.uid(c),b=d[b]||[],e=!0,f=d["t"+c.nodeName];f&&(b=b.concat(f));for(var f=0,g=b.length;f<g;f++){var h=b[f].apply(c,[a]);!1===h&&(e=h)}!1===e&&(a.preventDefault(),a.stopPropagation());if(!0===a.isPropagationStopped)break;c=c.parentNode}};
RR.dom.prototype.on=function(a,b){if("object"===typeof a){for(var c in a)this.on(c,a[c]);return this}return this.each(function(c){var e=RR.dom.uid(c);RR._addEventData(a,e,c,b)})};RR.dom.prototype.trigger=function(a,b){var c=DOC.createEvent("MouseEvents");c.initEvent(a,!0,!0);c.data=b;c.isSimulated=!0;return this.each(function(b){if("function"===typeof b[a])b[a]();else b.dispatchEvent&&b.dispatchEvent(c)})};
RR.touchEvent={activeCls:"active",hasTouchStart:!1,initedId:"__RR_EVENT_INITED__",init:function(){if(!WIN[RR.touchEvent.initedId]){var a={onTouchStart:START_EVENT,onTouchMove:MOVE_EVENT,onTouchEnd:END_EVENT},b;for(b in a)RR.addEvent(a[b],DOC,RR.touchEvent[b],!1);RR.addEvent("touchcancel",DOC,RR.onTouchCancel,!1);UseTouchClick&&RR.addEvent("click",DOC,RR.dispatchEvent,!1);WIN[RR.touchEvent.initedId]=!0}},onTouchStart:function(a){a=new RR.event(a);var b=a.originalEvent;a=a.target;var c=RR.eventCache.click||
{};RR.touchEvent.clearHighlight();RR.touchEvent.hasTouchStart=!0;RR.touchEvent.elTarget=a;RR.touchEvent.startPoint=[b.screenX*ScreenSizeCorrect,b.screenY*ScreenSizeCorrect];for(RR.touchEvent.targets=[];a;)b=RR.dom.uid(a),(c[b]||-1<["A","INPUT","BUTTON"].indexOf(a.nodeName))&&RR.touchEvent.targets.push(RR.$(a).addClass(RR.touchEvent.activeCls)),a=a.parentNode},onTouchMove:function(a){var b=RR.touchEvent;if(b.hasTouchStart&&(a=new RR.event(a),a=a.originalEvent,Math.pow(Math.pow(a.screenX*ScreenSizeCorrect-
b.startPoint[0],2)+Math.pow(a.screenY*ScreenSizeCorrect-b.startPoint[1],2),0.5)>MAX_TOUCHMOVE_DISTANCE_FOR_CLICK))b.onTouchCancel()},onTouchEnd:function(){if(RR.touchEvent.hasTouchStart){var a=DOC.createEvent("MouseEvents"),b=RR.touchEvent.elTarget;RR.touchEvent.onTouchCancel();UseTouchClick&&(a.initEvent("click",!0,!0),a.isSimulated=!0,b.dispatchEvent(a))}},onTouchCancel:function(){RR.touchEvent.hasTouchStart=!1;RR.touchEvent.elTarget=null;setTimeout(RR.touchEvent.clearHighlight,200)},clearHighlight:function(){var a=
RR.touchEvent.targets,b=RR.touchEvent.activeCls;if(a){for(var c=0,d=a.length;c<d;c++)a[c].removeClass(b);RR.touchEvent.targets=null}}};RR.touchEvent.init();var blankFn=function(){},ajaxObj=function(a,b){return this.ajax(a,b)};
ajaxObj.prototype={isLoading:!1,ajax:function(a,b){var c={};"string"==typeof a?c.url=a:"object"==typeof a&&(b=a);b=b||{};c.beforeSend=b.beforeSend||blankFn;c.dataFilter=b.dataFilter||blankFn;c.done=b.done||b.success||blankFn;c.fail=b.fail||b.error||blankFn;c.always=b.always||b.complete||blankFn;c.cache=!!b.cache;c.dataType=(b.dataType||"json").toLowerCase();c.data=b.data||{};c.timeout=b.timeout||0;c.type=(b.type||"GET").toUpperCase();this.options=c;return this},get:function(){this.options.type="GET";
return this.send()},post:function(){this.options.type="POST";return this.send()},abort:function(){this.isLoading&&(this.xmlhttp&&this.xmlhttp.abort(),this.isLoading=!1);return this},send:function(){var a=this.xmlhttp||(window.XMLHttpRequest?new XMLHttpRequest:!1);if(a){this.abort();this.xmlhttp=a;var b=this,c=this.options,d=!1,e=function(){if(!0!==d){var f=a.responseText;b.responseText=f;a.onreadystatechange=blankFn;b.isLoading=!1;f?"json"==c.dataType?f&&(responseData=b._getJSON(f))?(b.responseData=
responseData,b._onLoad(responseData,a.status)):b._onFail("parsererror"):b._onLoad(f,a.status):b._onFail("parsererror");b=null;d=!0}};a.onerror=function(){b.isLoading=!1;b._onFail("offline")};a.onload=e;a.onreadystatechange=function(){b._resetTimeout();4===this.readyState&&0!==this.status&&e()}}else return this._onFail("error"),this;if(!1!==c.beforeSend(this,c)){var f=c.data,f="string"==typeof f?f:$().param(f),g=c.url,h="jsonp"===c.dataType;if("GET"==c.type){var k="";0<f.length&&(k=-1<g.indexOf("?")?
"&":"?");h?this._getJSONP(g+k+f):a.open("get",g+k+f,!0)}else a.open("post",g,!0),a.setRequestHeader("Content-Type","application/x-www-form-urlencoded");a.setRequestHeader("Accept","*/*");h||a.send(f);this.isLoading=!0}return this},_getJSON:function(a){if(""!==a)try{return JSON.parse(a)}catch(b){ENABLE_DEBUG&&console.log("JSON.parse failed!");try{return eval("("+a+")")}catch(c){console.log("JSON.parse(eval) failed!")}}return null},_getJSONP:function(a){var b="__RR"+ +new Date+(Math.random()+"").replace(".",
""),c=this;WIN[b]=function(a){a&&(c.responseData=a,c._onLoad(a,this.status));delete WIN[b]};getScript(a+"&callback="+b)},_resetTimeout:function(){var a=this.options;if(a.timeout){this.timer&&clearTimeout(this.timer);var b=this;this.timer=setTimeout(function(){a.fail.apply(b,[b,"timeout"])},1E3*a.timeout)}},_onLoad:function(a,b){this.options.done.apply(this,[a,b,this]);this.options.always.apply(this,[this,"success"])},_onFail:function(a){this.options.fail.apply(this,[this,a]);this.options.always.apply(this,
[this,a])}};RR.fn.prototype.ajax=function(a,b){return(new ajaxObj(a,b)).send()};RR.fn.prototype.get=function(a,b){return(new ajaxObj(a,b)).get()};RR.fn.prototype.post=function(a,b){return(new ajaxObj(a,b)).post()};var ImageLazyload={init:function(){setTimeout(ImageLazyload.lazyLoadImage,100)},lazyLoadImage:function(a){a=document.querySelectorAll(".imglazyload");var b,c=a.length;for(b=0;b<c;b++)ImageLazyload.imageVisiable(a[b])},imageVisiable:function(a,b){var c=a.getBoundingClientRect();b=$(a).parent();if(0<c.top&&0<WIN.innerHeight-c.top||0>=c.top&&0<=c.bottom)b.hasClass("_loaded")||ImageLazyload.imageReplace(a)},imageReplace:function(a){if(a){var b=$(a).parent(),c;c||(c=$(a).attr("data-url").replace("{new}",
""));var d=new Image;d.src=c;d.onload=function(){$(a).attr("src",d.src);b.removeClass("_loaderror");b.addClass("_loaded");$(a).removeAttr("data-url");setTimeout(function(){$(a).removeClass("imglazyload")},200)};d.onerror=function(){b.addClass("_loaderror")}}}};var Geolocation={isEnabled:!1,getPosition:function(){var a=$("#autogeo");a.addClass("disabled");a.html("\u6b63\u5728\u5b9a\u4f4d");a.attr("disabled","disabled");navigator.geolocation&&navigator.geolocation.getCurrentPosition(Geolocation.locationSuccess,Geolocation.locationError,{enableHighAcuracy:!0,timeout:5E3,maximumAge:3E3})},locationSuccess:function(a){var b=$("#autogeo");a=a.coords;var c=a.longitude,d=a.latitude;b.removeClass("disabled");b.addClass("success");b.html("\u5b9a\u4f4d\u6210\u529f");
Storage("position",'{"lng":'+c+',"lat":'+d+"}");0<b.length&&setTimeout(function(){WIN.location.href="@lat="+d+"&lng="+c},1500)},locationError:function(a){var b=$("#autogeo");switch(a.code){case a.TIMEOUT:alert("\u83b7\u53d6\u4f4d\u7f6e\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5");break;case a.POSITION_UNAVAILABLE:alert("\u83b7\u53d6\u4f4d\u7f6e\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u5b9a\u4f4d\u8bbe\u7f6e");break;case a.PERMISSION_DENIED:alert("\u83b7\u53d6\u4f4d\u7f6e\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u5b9a\u4f4d\u8bbe\u7f6e");
break;case a.UNKNOWN_ERROR:alert("\u83b7\u53d6\u4f4d\u7f6e\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5")}b.removeAttr("disabled");b.removeClass("disabled");b.removeClass("success");b.html("\u81ea\u52a8\u5b9a\u4f4d")}},setCity={sel:"",init:function(){var a=localStorage.getItem("citySel");null!=a&&""!==a&&(setCity.sel=a);setCity.cityList();setCity.bindEven();
$("#city_fn").length||($("body").append('<div id="city_fn" class="city_fn"><a href="javascript:;" id="citydef">\u9ed8\u8ba4\u57ce\u5e02</a><a href="javascript:;" id="citydel">\u5220\u9664</a></div>'),setCity.bindSet())},addCity:function(a,b){var c=setCity.getCitys();if(c["w-"+b])return!1;c["w-"+b]={};c["w-"+b].name=a;c["w-"+b].id=b;setCity.setCitys(c);return c},removeCity:function(a){var b=setCity.getCitys();delete b["w-"+a];setCity.setCitys(b);return b},getCitys:function(){return null===localStorage.getItem("citys")||
""==localStorage.getItem("citys")?{}:JSON.parse(localStorage.getItem("citys"))},setCitys:function(a){localStorage.setItem("citys",JSON.stringify(a))},restCity:function(a,b){setCity.addCity(a,b)&&setCity.init()},setCurId:function(a){setCity.sel=a;localStorage.setItem("citySel",a);$("#sel_city a").removeClass("city_sel");$("#sel-"+a).addClass("city_sel")},cityList:function(){var a=setCity.getCitys(),b,c=0;b="<h3>\u5df2\u9009\u57ce\u5e02</h3><p>";for(var d in a)b+="<span>",b=""!=setCity.sel&&a[d].id==
setCity.sel?b+('<a href="javascript:;" id="sel-'+a[d].id+'" data-id="'+a[d].id+'" data-name="'+a[d].name+'" stat="province_10102" class="city_sel">'+a[d].name+"</a></span>"):b+('<a href="javascript:;" id="sel-'+a[d].id+'" data-id="'+a[d].id+'" data-name="'+a[d].name+'" stat="province_10102">'+a[d].name+"</a></span>"),c++;if(0===c)return!1;$("#sel_city").html(b+"</p>").css("display","block");$("#sel_city .city_sel").length||$("#sel_city a").eq(0).addClass("city_sel")},bindEven:function(){$("#sel_city a").on("click",
function(){var a=$(this).offset().left,b=$(this).offset().top,c=$(this).height(),d=$(this).width(),e=window.innerWidth,f=$(this).attr("data-id");a>e/2?$("#city_fn").css("left","auto").css("right",e-a-d).css("top",b+c).addClass("city_fn_show"):$("#city_fn").css("right","auto").css("left",a).css("top",b+c).addClass("city_fn_show");1>=$("#sel_city a").length?$("#citydel").css("display","none"):$("#citydel").css("display","inline-block");$("#citydef").attr("data-id",f);$("#citydel").attr("data-id",f)})},
bindSet:function(){$(DOC).on("click",function(a){a=a.target;if("a"==a.tagName.toLocaleLowerCase()&&"sel_city"==$(a).parent().parent().parent().attr("id"))return!1;$("#city_fn").removeClass("city_fn_show")});$("#hot_city a").on("click",function(){var a=$(this).attr("data-name"),b=$(this).attr("data-id");setCity.restCity(a,b)});$("#citydef").on("click",function(){var a=$(this).attr("data-id");$("#sel-"+a).hasClass("city_sel")||setCity.setCurId(a);setTimeout(function(){location.href="@cid="+a},1E3)});
$("#citydel").on("click",function(){var a=$(this).attr("data-id");$("#sel-"+a).parent().remove();setCity.removeCity(a);0==$("#sel_city a").length?$("#sel_city").css("display","none"):0==$("#sel_city a.city_sel").length&&setCity.setCurId($("#sel_city a").eq(0).attr("data-id"))})}},Share={init:function(){Share.text=0<$("#js_shareinfo").length&&""!=$("#js_shareinfo").html()?$("#js_shareinfo").html().replace("%title%",""+URL.getQueryString("title")):"";$("#share_fn").length||$("body").append('<div id="share_fn" class="city_fn"><a href="javascript:;" class="share_weibo"></a><a href="javascript:;" class="share_renren"></a></div>');
$(".w_btn_share").on("click",function(){var a=$(this).offset().left,b=$(this).offset().top,c=$(this).width(),d=window.innerWidth,e=$(this).height();$("#share_fn").css("right",d-c-a).css("top",b+e).addClass("city_fn_show")});$(".share_renren").on("click",function(){setTimeout(function(){Share.openShare(Share.data.renren(),"../widget.renren.com/dialog/share")},100)});$(".share_weibo").on("click",function(){setTimeout(function(){Share.openShare(Share.data.weibo(),"../service.weibo.com/share/share.php")},
100)});$(".share_qzone").on("click",function(){setTimeout(function(){Share.openShare(Share.data.qq(),"../sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey")},100)});$(DOC).on("click",function(a){if($(a.target).hasClass("w_btn_share"))return!1;$("#share_fn").removeClass("city_fn_show")})},getShareText:function(){return $(".wt_city").html()+" "+$(".wt_week").html()+"\uff0c"+$(".wt_temperature span").eq(0).html()+"\uff0c"+$(".wt_wind span").eq(0).html()+"\uff0c"+$(".wt_wind span").eq(1).html()+
"\uff0c"+$(".wt_temperature span").eq(1).html()+"\u3002"},data:{renren:function(){var a={resourceUrl:"../www.duba.com/@f=share",srcUrl:"../www.duba.com/@f=share",pic:"static/images/v1/share_logo.jpg",title:"\u624b\u673a\u6bd2\u9738\u7f51\u5740\u5927\u5168 - \u6700\u5b89\u5168\u5b9e\u7528\u7684\u7f51\u5740\u5bfc\u822a"};a.description=Share.getShareText();return a},weibo:function(){var a={url:"../www.duba.com/@f=share"};a.title=Share.getShareText()+" @\u91d1\u5c71\u7f51\u5740\u5bfc\u822a";
a.pic="./"+$(".wt_img img").attr("src");return a},qq:function(){var a={url:"../www.duba.com/@f=share",title:"\u624b\u673a\u6bd2\u9738\u7f51\u5740\u5927\u5168 - \u6700\u5b89\u5168\u5b9e\u7528\u7684\u7f51\u5740\u5bfc\u822a"};a.summary=encodeURIComponent(Share.getShareText());return a}},openShare:function(a,b){if(a){var c=$().param(a);location.href=b+"?"+c}}},selectCity={data:[],init:function(){if("undefined"==typeof citys)return setTimeout(function(){selectCity.init()},500),!1;selectCity.data=
citys;selectCity.province();selectCity.city();selectCity.district();selectCity.cityEven();$("#check_city").css("display","block")},province:function(){for(var a=selectCity.data.length,b="",c=0;c<a;c++)b+='<option value="'+c+'">'+selectCity.data[c][1]+"</option>";$("#province").html(b)},city:function(){for(var a=selectCity.data[parseInt($("#province").val())][2],b=a.length,c="",d=0;d<b;d++)c+='<option value="'+d+'">'+a[d][1]+"</option>";$("#city").html(c)},district:function(){for(var a=selectCity.data[parseInt($("#province").val())][2][parseInt($("#city").val())][2],
b=a.length,c="",d=0;d<b;d++)c+='<option value="'+a[d][1].split(" ")[1]+"-"+a[d][2]+'">'+a[d][1]+"</option>";$("#district").html(c)},cityEven:function(){$("#province").on("change",function(){selectCity.city();selectCity.district()});$("#city").on("change",function(){selectCity.district()});$("#check_city .btn").on("click",function(){var a=$("#district").val().split("-");setCity.restCity(a[0],a[1]);setTimeout(function(){location.href="@cid="+a[1]},1E3)})}},Feedback={submitForm:function(){var a=$(".feedback_btn .btn");
$("#form_feedback");var b=encodeURIComponent($('input[name="refer_url"]').val()),c=encodeURIComponent($('input[name="quetype"]:checked').val()),d=$("#content").val(),e=$('input[name="email"]').val();if(""==d)return Feedback.showError("\u8bf7\u8f93\u5165\u60a8\u7684\u53cd\u9988\u5185\u5bb9"),!1;if(""==e)return Feedback.showError("\u8bf7\u8f93\u5165\u8054\u7cfb\u65b9\u5f0f\uff0c\u65b9\u4fbf\u6211\u4eec\u548c\u60a8\u8054\u7cfb\uff0c\u66f4\u597d\u7684\u4e3a\u60a8\u89e3\u51b3\u95ee\u9898"),!1;$().post("feedback@a=add",
{data:{refer_url:b,quetype:c,content:d,email:e,rdm:(new Date).getTime()},done:function(a){Feedback.feedbackLoaded(a,lng,lat)}});a.addClass("disabled");a.html("\u6b63\u5728\u63d0\u4ea4");a.attr("disabled","disabled");return!1},feedbackLoaded:function(a){var b=decodeURIComponent(a.msg);!0==a.success?Feedback.showSucc(b):Feedback.showError(b)},showSucc:function(a){var b=$(".feedback_btn .btn");$(".success").html(a);$(".error").css("display","none");$(".success").css("display","block");b.removeClass("disabled");
b.html("\u7acb\u5373\u63d0\u4ea4");b.removeAttr("disabled");$("#content").val("")},showError:function(a){var b=$(".feedback_btn .btn");$(".error").html(a);$(".success").css("display","none");$(".error").css("display","block");b.removeClass("disabled");b.html("\u7acb\u5373\u63d0\u4ea4");b.removeAttr("disabled")}},Stat=function(a){a=new RR.event(a);var b=a.target;"A"!=b.nodeName&&!$(b).attr("_href")&&($(b.parentNode).attr("_href")?b=b.parentNode:$(b.parentNode.parentNode).attr("_href")&&(b=b.parentNode.parentNode));
a=$(b).attr("stat");var c=$(b).attr("href")||$(b).attr("_href");if(a){"A"==b.nodeName&&c&&!/javascript|#/.test(c)?($(b).attr("href","javascript:;"),$(b).attr("link",c),setTimeout(function(){$(b).attr("href",c);WIN.location.href=$(b).attr("link")},100)):"BUTTON"==b.nodeName&&$("#baiduForm").length?setTimeout(function(){$("#baiduForm").attr("onSubmit","return true;");document.getElementById("baiduForm").submit()},100):""!=c&&setTimeout(function(){WIN.location.href=c},100);try{trace(173E3,100,"","",
encodeURIComponent("t:newt|cid:"+a+""))}catch(d){}}},loadCnzz=function(){var a=document.createElement("script"),b=document.getElementsByTagName("head")[0];a.type="text/javascript";a.async=!0;b.appendChild(a)};
function tabs(a,b,c,d){this.tabBtn=[];this.tabInner=[];this.curStyle=c;this.count=0;this.defaultCur=d||0;for(c=0;c<a.childNodes.length;c++)1==a.childNodes[c].nodeType&&(this.count==this.defaultCur&&this.addBtnClass(a.childNodes[c]),this.tabBtn.push(a.childNodes[c]),this.count++);for(a=c=0;c<b.childNodes.length;c++)1==b.childNodes[c].nodeType&&(b.childNodes[c].style.display=a==this.defaultCur?"block":"none",a++,this.tabInner.push(b.childNodes[c]));this.bind()}
tabs.prototype.bind=function(){for(var a=this,b=0;b<this.count;b++)a.tabBtn[b].addEventListener("click",function(b){a.change(this)})};tabs.prototype.change=function(a){for(var b=0;b<this.count&&a!=this.tabBtn[b];b++);this.setBtnClass(b)};tabs.prototype.setBtnClass=function(a){for(var b=0;b<this.count;b++)b!=a?(this.removeBtnClass(this.tabBtn[b]),this.tabInner[b].style.display="none"):(this.addBtnClass(this.tabBtn[b]),this.tabInner[b].style.display="block")};
tabs.prototype.removeBtnClass=function(a){var b=a.className;-1!=b.indexOf(this.curStyle)&&(a.className=b.replace(this.curStyle,"").replace("  "," "));return a};tabs.prototype.addBtnClass=function(a){-1=="".indexOf(this.curStyle)&&(a.className=" "+this.curStyle);return a};var inputTime=null;function loadImage(){ImageLazyload.init();setTimeout(loadImage,400)}
$().ready(function(){loadImage();loadCnzz();$("#autogeo").on("click",Geolocation.getPosition);$("#feedback_sub").on("click",Feedback.submitForm);var a=URL.getQueryString("cid"),b=URL.getQueryString("pid"),c=URL.getQueryString("lng"),d=URL.getQueryString("lat");if(0<$(".weather").length){$(".weather").on("click",function(){$(".weather").toggleClass("weather_sdown");$(".weather_box").toggleClass("weather_box_show")});if(Storage("citytemperature")){var e=JSON.parse(Storage("citytemperature"));e.wctddesc?
Weather.setWeather(e,!0):(localStorage.removeItem("citytemperature"),Weather.getWeather(c,d,a))}a?Weather.getWeather(!1,!1,a):Storage("citySel")?Weather.getWeather(!1,!1,Storage("citySel")):Weather.getWeather(c,d,a);Share.init()}b&&($(".list div").css("display","none"),0<$("#p"+b).length?$("#p"+b).css("display","block"):$("#p0").css("display","block"));$(DOC).on("click",Stat);$("#baiduForm").attr("onSubmit","return false;");if($("#newsTitle").length){new tabs(document.getElementById("newsTitle"),
document.getElementById("newsCont"),"cur",1);a=document.getElementsByClassName("aft");for(b=0;b<a.length;b++)a[b].addEventListener("mousedown",function(){var a=this.className,b=knext(this.parentNode.parentNode),c=b.className;-1==a.indexOf("open")?(this.className=a+" open",b.className=c+" btn_links_open"):(this.className=a.replace(" open",""),b.className=c.replace(" btn_links_open",""))})}if($("#baiduForm").length)$("#baiduForm").on("submit",function(){var a=encodeURIComponent($(".ipt",this).val());
IsIOS?__tj(1061100,121,"","1",a,1,""):__tj(1061101,123,"","1",a,1,"")});$("#sel_city").length&&setCity.init();$("#check_city").length&&selectCity.init();$("#suggest_list").length&&($(".ipt_wrap .ipt").on("input",function(){var a=$(this).val();if(""==a)return $("#suggest_list").css("display","none"),!1;clearTimeout(inputTime);inputTime=setTimeout(function(){$().get("wapajax_index.html",{data:{keyword:a},done:function(a){if(0==a.length)return $("#suggest_list").html("").css("display","block"),!1;for(var b=
"",c=0;c<a.length;c++)b+='<li><a href="javascript:;" data-id="'+a[c].city_id+'" data-name="'+a[c].city_name+'" stat="province_10102">'+a[c].city_name+"</a></li>";$("#suggest_list").html(b).css("display","block");$("#suggest_list a").on("click",function(){var a=$(this).attr("data-name"),b=$(this).attr("data-id");setCity.restCity(a,b);$("#suggest_list").css("display","none");setTimeout(function(){location.href="@cid="+b},1E3)})}})},300)}),$(DOC).on("click",function(a){a=a.target;!$(a).parent().parent().parent().hasClass("ipt_wrap")&&
(!$(a).parent().parent().hasClass("ipt_wrap")&&!$(a).parent().hasClass("ipt_wrap"))&&$("#suggest_list").css("display","none")}))});function knext(a){for(a=a.nextSibling;1!=a.nodeType;)a=a.nextSibling;return a};
