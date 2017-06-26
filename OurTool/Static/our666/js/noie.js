var browser=navigator.appName;
var b_version=navigator.appVersion;
var version=b_version.split(";");
var trim_Version=version[1].replace(/[ ]/g,"");
if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){
	alert("对不起，请使用IE6以上版本浏览器浏览本站！");
	location.href('http://windows.microsoft.com/zh-cn/internet-explorer/download-ie');
}