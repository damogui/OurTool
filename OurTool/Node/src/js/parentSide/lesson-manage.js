
//后台交互
require("../../tpl/template-helpers.js");

var tplCourseManage = require("Parent/CourseManage.tpl");//课程管理模板

var id = $("#stuId").val();//课程评价需要的id学生id
//列表
var currentPageL = 0;//默认的分页索引
var totalNumL = 0;//总的数量
var pageSizeL = 4;//页显示数
var allPageL = 1;//总页数
var flagEnd = false;//是否是最大页

var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        document.title = '课程管理';
        //加载列表
        GetClassMamangeData(1);

    },
    initBtns: function () {
        //todo 绑定事件

        //课程评价
        $("body").delegate("#courseE", "click", function () {
           // $.router.load("/Parents/ParentMenu/CourseEvalu/" + id, true);//精彩瞬间跳转


            window.location.href = "/Parents/ParentMenu/CourseEvalu/" + id;

        });
        //首页的跳转
        $("body").delegate("#menuId", "click", function () {

           // $.router.load("/Parents/ParentMenu/Index", true);//处理跳转

            window.location.href = "/Parents/ParentMenu/Index/" + id;
        });


    }


};

//绑定数据
$(function () {
    module.init();



});


//发送请求调取课程管理的数据
function GetClassMamangeData(page) {

    if (page == undefined || page < 1) {
        page = 1;
    }
    if (page == 1) {
        $("#tb").html("");
    }
    allPageL = parseInt(totalNumL / pageSizeL) + 1;
    currentPageL = page;
    if (totalNumL > 0 && page > allPageL) {
        page = allPageL;
        flagEnd = true;
        loading = false;
        ClearLoad();//不在加载
        return;
    }
    $("#divLoading").show();
    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentCourseManage/GetStuCourseManage",
        dataType: "json",

        data: {
            PageIndex: page, PageSize: pageSizeL,stuId:id//传递的是班级的第几次上课

        },
        success: function (data) {
            $("#divLoading").hide();
            loading = false;
            if (data.Data && data.Data.length > 0) {
                //请求新数据绑定
                $("#tb").append(tplCourseManage(data.Data));//加载课程头部


                //请求新数据绑定
                totalNumL = data.PageSum;
                //容器发生改变,如果是js滚动，需要刷新滚动
                $.refreshScroller();
               
            
            }
            else {

                if (page == 1) {
                    $("#showNoData").show();//显示暂无数据

                }
               

            }
        }
    });

}


//清除加载
function ClearLoad() {
    // 加载完毕，则注销无限加载事件，以防不必要的加载
    $.detachInfiniteScroll($('.infinite-scroll'));
    // 删除加载提示符
    $('.infinite-scroll-preloader').remove();

}

///滚动事件


// 加载flag
var loading = false;
$(document).off('infinite');
// 注册'infinite'事件处理函数
$(document).on('infinite', '.infinite-scroll-bottom', function () {

    // 如果正在加载，则退出
    if (loading) return;
    // 设置flag
    loading = true;
    currentPageL = currentPageL + 1;
    GetClassMamangeData(currentPageL);

});
$.init();

