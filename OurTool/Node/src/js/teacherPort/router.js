var html_js_cssRoute = [];
var src = { jsurl: '/egword/build/js/teacherPort/', cssurl: '/egword/build/css/teacherPort/', version: '1.0' };
//所有页面上的pageId ,js ,css的对应关系都要在此一一声明
html_js_cssRoute["my-class-course-list"] = { css: "my-class-course-list", js: "my-class-course-list" };
html_js_cssRoute["my-class-list"] = { css: "my-class-list", js: "my-class-list" };
html_js_cssRoute["lesson-watching"] = { css: "lesson-watching", js: "lesson-watching" };//课堂监管
html_js_cssRoute["lesson-student-group"] = { css: "lesson-student-group", js: "lesson-student-group" };//智能分组
html_js_cssRoute["lesson-report-study-info"] = { css: "lesson-report-study-info", js: "lesson-report-study-info" };//智能分组
html_js_cssRoute["test-center-class"] = { css: "test-center-class", js: "test-center-class" };//测评中心-班级
html_js_cssRoute["test-center-home"] = { css: "test-center-home", js: "test-center-home" };//测评中心-班级
html_js_cssRoute["person-center"] = { css: "person-center", js: "person-center" };//个人中心
html_js_cssRoute["person-center-set"] = { css: "person-center-set", js: "person-center-set" };//个人中心-设置
html_js_cssRoute["person-center-editPas"] = { css: "person-center-editPas", js: "person-center-editPas" };//个人中心-修改密码
html_js_cssRoute["reward-coins"] = { css: "reward-coins", js: "reward-coins" };//奖励学币
html_js_cssRoute["wonderful-sure"] = { css: "wonderful-sure", js: "wonderful-sure" };//精彩瞬间-确定提交
html_js_cssRoute["lesson-report-group"] = { css: "lesson-report-group", js: "lesson-report-group" };//奖励学币-小组，学生
html_js_cssRoute["lesson-report"] = { css: "lesson-report", js: "lesson-report" };//课次报告
html_js_cssRoute["student-evaluation-report"] = { css: "student-evaluation-report", js: "student-evaluation-report" };//测评报告
html_js_cssRoute["login"] = { css: "login", js: "login" };//登录

//页面dom加载之后加载js
$(document).on("pageInit", function (e, pageId, $page) {
    $('.picker-modal').hide(0);
    //上传图片逻辑
    $('.photo-browser').remove();
    if (window.urlList && window.urlList.length > 0) {
        window.urlList.forEach(function (item) {
            URL.revokeObjectURL(item);
        })

    }
    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetMyTeachClassList",
        async: false,
        cache: false,
        data: {},
        dataType: "JSON",
        success: function (data) {
            data = JSON.parse(data);
            if (data.Code == "404" && data.OK.toString() == "false") {
                window.location.reload();
            }

        }
    });
    if (window.timer) {
        window.clearTimeout(window.timer);
    }

    if (pageId && html_js_cssRoute[pageId]) {
        var jsUrl = src.jsurl + html_js_cssRoute[pageId].js + ".js?v=" + src.version;
        reloadJS("cp-script", jsUrl, pageId);
    }


    // 


});
//动画切换之前换加载下一个页面的css
$(document).on("pageAnimationStart", function (e, pageId, $page) {

    if (pageId && html_js_cssRoute[pageId]) {
        var cssUrl = src.cssurl + html_js_cssRoute[pageId].css + ".css?v=" + src.version;
        reloadCss("cp-css", cssUrl);
    }
    document.title = document.getElementById("doc-title").value;
});
//请求新的页面之前
//$(document).on("pageLoadComplete", function () {
//   console.log(66)
//    console.log($('.picker-modal'))
//    $('.picker-modal').hide();
//})
//动画切换之后加载下一个页面的css
//    $(document).on("pageAnimationEnd",function(e,pageId,$page){
//        if(pageId&&html_js_cssRoute[pageId]){
////            var jsUrl=src.jsurl+html_js_cssRoute[pageId].js+".js?v="+src.version;
//            var cssUrl=src.cssurl+html_js_cssRoute[pageId].css+".css?v="+src.version;
//            reloadCss("cp-css",cssUrl);
////            reloadJS("cp-script",jsUrl);
//        }
//    });
function reloadJS(id, path, pageid) {
    var oldjs = document.getElementById(id);
    //如果该页面已经加载js 不再做变动

    if (oldjs) {
        //var regMapCache = new RegExp('\/(' + html_js_cssRoute[pageid].js + ')[.].*[.]cache[.]js');
        var regMapCache = new RegExp('\/(' + html_js_cssRoute[pageid].js + ')-[0-9a-f]{8,10}[.]js');
        var regMap = new RegExp('\/(' + html_js_cssRoute[pageid].js + ')[.]js');
        if (regMap.test(oldjs.src) || regMapCache.test(oldjs.src)) { return;}
        oldjs.parentNode.removeChild(oldjs);
    }
    var scriptObj = document.createElement("script");
    scriptObj.src = path;
    scriptObj.type = "text/javascript";
    scriptObj.id = id;
    document.getElementsByTagName("head")[0].appendChild(scriptObj);

}
function reloadCss(id, path) {
    var oldcss = document.getElementById(id);
    if (oldcss) { oldcss.parentNode.removeChild(oldcss); }
    var linkObj = document.createElement("link");
    linkObj.id = id;
    linkObj.href = path;
    linkObj.rel = 'stylesheet';
    linkObj.type = 'text/css';
    document.getElementsByTagName("head")[0].appendChild(linkObj);
}