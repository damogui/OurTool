var html_js_cssRoute=[];
var src={jsurl:'/egword/build/js/parentSide/',cssurl:'/egword/build/css/parentSide/',version:'1.0'};
//所有页面上的pageId ,js ,css的对应关系都要在此一一声明
html_js_cssRoute["main"]={css:"main",js:"main"};//菜单
html_js_cssRoute["wonderful-moment"]={css:"wonderful-moment",js:"wonderful-moment"};//精彩瞬间
html_js_cssRoute["lesson-report"]={css:"lesson-report",js:"lesson-report"};//课程报告
html_js_cssRoute["lesson-manage"]={css:"lesson-manage",js:"lesson-manage"};//课程管理
html_js_cssRoute["lesson-evaluate"]={css:"lesson-evaluate",js:"lesson-evaluate"};//课程管理
html_js_cssRoute["contat-us"]={css:"contat-us",js:"contat-us"};//课程管理
html_js_cssRoute["bind-info"]={css:"bind-info",js:"bind-info"};//绑定学生
html_js_cssRoute["unbind-info"]={css:"unbind-info",js:"unbind-info"};//解除绑定


//页面dom加载之后加载js
$(document).on("pageInit", function (e, pageId, $page) {
    if(pageId&&html_js_cssRoute[pageId]){
        var jsUrl = src.jsurl + html_js_cssRoute[pageId].js + ".js?v=" + src.version;
        reloadJS("cp-script", jsUrl, pageId);
    }
});
//动画切换之前换加载下一个页面的css
$(document).on("pageAnimationStart",function(e,pageId,$page){
    if(pageId&&html_js_cssRoute[pageId]){
        var cssUrl=src.cssurl+html_js_cssRoute[pageId].css+".css?v="+src.version;
        reloadCss("cp-css",cssUrl);
    }
    document.title = document.getElementById("doc-title").value;
});
//动画切换之后加载下一个页面的css
//    $(document).on("pageAnimationEnd",function(e,pageId,$page){
//        if(pageId&&html_js_cssRoute[pageId]){
////            var jsUrl=src.jsurl+html_js_cssRoute[pageId].js+".js?v="+src.version;
//            var cssUrl=src.cssurl+html_js_cssRoute[pageId].css+".css?v="+src.version;
//            reloadCss("cp-css",cssUrl);
////            reloadJS("cp-script",jsUrl);
//        }
//    });
function reloadJS(id,path,pageid)
{
    var oldjs = document.getElementById(id);
    //如果该页面已经加载js 不再做变动
   if (oldjs) {
       //var regMapCache = new RegExp('\/(' + html_js_cssRoute[pageid].js + ')[.].*[.]cache[.]js');
       var regMapCache = new RegExp('\/(' + html_js_cssRoute[pageid].js + ')-[0-9a-f]{8,10}[.]js')
        var regMap = new RegExp('\/(' + html_js_cssRoute[pageid].js + ')[.]js');
        if (regMap.test(oldjs.src) || regMapCache.test(oldjs.src)) { return; }
        oldjs.parentNode.removeChild(oldjs);
    }
    var scriptObj = document.createElement("script");
    scriptObj.src = path;
    scriptObj.type = "text/javascript";
    scriptObj.id   = id;
    document.getElementsByTagName("head")[0].appendChild(scriptObj);
}
function reloadCss(id,path)
{
   var oldcss = document.getElementById(id);
    if(oldcss) {oldcss.parentNode.removeChild(oldcss);}
    var linkObj = document.createElement("link");
    linkObj.id=id;
    linkObj.href = path;
    linkObj.rel = 'stylesheet';
    linkObj.type = 'text/css';
    document.getElementsByTagName("head")[0].appendChild(linkObj);
}