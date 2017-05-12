
var a = require('template-helpers.js');

var b = this;

$(function () {

    classid = $("#hidden-classid").text();

    this.classname = $("#hidden-classname").text();

    $("#courselist").html("");
    GetClassCourseRecordList(classid);

    $("#btn-submit").on("click", function () {

        $.router.load('/teacher/myclass/StudentGroup?classid=' + classid+'&classname='+classname, true);
    });


});

function GetClassCourseRecordList(classid, pageindex, pagesize) {
    pageindex = pageindex || 1;
    pagesize = pagesize || 10;
    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetClassCourseRecordList",
        cache: false,
        data: { classid: classid, pageindex: pageindex, pagesize: pagesize },
        dataType: "JSON",
        success: function (data) {
            window.loading = false;
            data = JSON.parse(data);

            var li = data.result;
            var str = "暂无课次记录";

            var tpl = require("teacher/my-class-course-list");

            $("#courselist").append(tpl(li));
            if (window.lastIndex + li.length == 0) {
                $("#courselist").html(str);
                $("#courselist-warp").hide();
                $(".no-course-bg").show();
                maxItems = 0;
            }

            // 更新最后加载的序号
            window.lastIndex = $('#courselist li').length;
            maxItems = data.totalnum;

            if (window.lastIndex >= maxItems) {
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                $.detachInfiniteScroll($('.infinite-scroll'));
                // 删除加载提示符
                $('.infinite-scroll-preloader').remove();

            }

            //容器发生改变,如果是js滚动，需要刷新滚动
            $.refreshScroller();
            $(".s-course-list").off("click");
            $(".s-course-list").on("click", function () {

                var classindex = $(this).attr("data-classindex");

                $.router.load('/teacher/myclass/CourseReport?classindex=' + classindex+"&classid="+classid, true);

            });

        }
    });
}

// 加载flag
window.loading = false;

// 最多可加载的条目
var maxItems = 10000000;

// 每次加载添加多少条目
var itemsPerLoad = 10;

// 上次加载的序号
 window.lastIndex = 0;
$(document).off('infinte');
// 注册'infinite'事件处理函数
$(document).on('infinite', '.infinite-scroll-bottom', function () {

    // 如果正在加载，则退出
    if (window.loading) return;
    // 设置flag
    window.loading = true;
    console.log("lastIndex:"+window.lastIndex);
    var p = Math.floor(window.lastIndex / itemsPerLoad);
    console.log(p);
    GetClassCourseRecordList(classid, p + 1, itemsPerLoad);

});

$.init();

