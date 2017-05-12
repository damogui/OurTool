
//后台交互
require("../../tpl/template-helpers.js");
//var pop = require("../lib/popup/popuptip.js");
//var loadimg = require("../lib/popup/showloadimg.js");
//var commJs = require("../lib/util.js");//公共方法
var tplStuCourseNameList = require("Parent/StuCourseNameList.tpl");//学生课程名头部列表
var tplStuCourseInfoList = require("Parent/StuCourseList.tpl");//学生课程下拉列表

//头部
var currentPage = 1;//默认的分页索引
var totalNum = 0;//总的数量
var pageSize = 3;//页显示数
var allPage = 0;//总页数

//列表
var currentPageL = 0;//默认的分页索引
var totalNumL = 0;//总的数量
var pageSizeL = 4;//页显示数
var allPageL = 1;//总页数
var flagEnd = false;//是否是最大页

var id = $("#stuId").val();//学生id

var module = {
    initStup: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
       
       
        //var $body = $('body');
        //document.title = '学情分析';
        //var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        //$iframe.on('load', function () {
        //    setTimeout(function () {
        //        $iframe.off('load').remove();
        //    }, 0);
        //}).appendTo($body);

        
        
      
        //加载列表
        GetStuCourseNameListData();//获取学生课程列表

    },
    initBtns: function () {
        //todo 绑定事件
     
        //左边
        $("body").undelegate("#leftIndex", "click");
        $("body").delegate("#leftIndex", "click", function () {
            if (totalNum <= pageSize) {
                return;
            }
            currentPage = currentPage - 1;
            GetStuCourseNameListData(currentPage);

        });


        //右边
        $("body").undelegate("#rightIndex", "click");

        $("body").delegate("#rightIndex", "click", function () {
            if (totalNum <= pageSize) {
                return;
            }
            currentPage = currentPage + 1;
            GetStuCourseNameListData(currentPage);

        });
       
        $("body").undelegate("#tabsCourse .box", "click");
        //课程点击
        $("body").delegate("#tabsCourse .box", "click", function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            //清空上课记录
            $("#ulCourse").html("");
            $("#showNoData").hide();
          
            
            //加载上课
            GetStuCourseLessonData(1);//加载课堂数据

        });
        //首页的跳转
        $("body").undelegate("#menuId", "click");
        $("body").delegate("#menuId", "click", function () {
            ////window.location.href = "";//跳转
           
            //$.router.load("/Parents/ParentMenu/Index", true);//处理跳转
            window.location.href = "/Parents/ParentMenu/Index/" + id;


        });
        $("body").undelegate("li[datatype='2']", "click");

        //列表的详情跳转
        $("body").delegate("li[datatype='2']", "click", function () {
            var lId = $(this).attr("data-lid");//第几次课
            var cId = $(this).attr("data-cid");//课程id
            var cIn = $(this).attr("data-cin");//班级的第几次课
            var nid = cId + "-" + lId + "-" + cIn+"-"+id;
            //$.router.load("/Parents/ParentMenu/CourseEvalu/" + nid, true);//处理跳转

            window.location.href = "/Parents/ParentMenu/CourseEvalu/" + nid;
        });


        $("body").undelegate("#btnloginOk", "click");
        //展示完的确定的删除弹窗
        $("body").delegate("#btnloginOk", "click", function () {
            $(".eg-pop .close").click();//关闭弹窗
        });




    }


};

//绑定数据
$(function () {
    
 
   
    module.initStup();
    setTitle();

});


function setTitle() {
    var stuName = $("#stuName").val();
    document.title = stuName+'学情分析';
    var i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
        setTimeout(function () {
            i.remove();
        }, 9);
    }
    document.body.appendChild(i);
}


//发送请求调取数据
function GetStuCourseNameListData(page) {
    
    $("#datashow").css("display", "");
    if (page == undefined || page < 1) {
        page = 1;
    }
    allPage = parseInt(totalNum / pageSize) + 1;
    if (totalNum > 0 && page > allPage) {
        page = allPage;
    }
    currentPage = page;
    $("#divLoading").show();
    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/GetOrgCourse",
        dataType: "json",

        data: {
            PageIndex: page, PageSize: pageSize, stuId: id

        },
        success: function (data) {
            $("#divLoading").hide();
            if (data.Data && data.Data.length > 0) {
                //请求新数据绑定
                totalNum = data.PageSum;

                if (totalNum <= pageSize) {
                    $("#leftIndex,#rightIndex").css("display", "none");
                } else {
                    $("#leftIndex,#rightIndex").css("display", "");
                }

                $("#tabsCourse").html(tplStuCourseNameList(data.Data));//加载课程头部
                $("#ulCourse").html("");//需要进行清空
                //加载列表
              
                    GetStuCourseLessonData(1);//加载课堂数据
                    
             
               

            }
            else {
                 $("#ulCourse").html("");//需要进行清空
                ClearLoad();
                loading = false;
                $("#showNoData").show();
                $("#datashow").css("display", "none");
                //alert("无数据");

            }
        }
    });

}


//加载课程的每堂课
function GetStuCourseLessonData(page) {
    $("#datashow").css("display", "");
    //$("#divLoading").show();
    //loadimg.ShowLoadingForTable($("#tb"), 4);
    if (page == undefined || page < 1) {
        page = 1;
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

    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/GetOrgCourseListInfo",//加载出来课程的上课
        dataType: "json",

        data: {
            stuId: id, data: $("#tabsCourse .active").attr("data-co"), PageIndex: page, PageSize: pageSizeL

        },
        success: function (data) {
            
            loading = false;
            //$("#divLoading").hide();
            if (data.Data && data.Data.length > 0) {
                //请求新数据绑定
                totalNumL = data.PageSum;
                $("#ulCourse").append(tplStuCourseInfoList(data.Data));//加载课程列表



                //容器发生改变,如果是js滚动，需要刷新滚动
                $.refreshScroller();
               
                if (page == 1) {
                    loadWordInfo();//加载单词数量信息
                }


            }
            else {
                if (page == 1) {
                    ClearLoad();
                    $("#showNoData").show();
                    $("#datashow").css("display", "none");
                    
                }
               


            }
        }
    });

}

//加载单词数量信息
function loadWordInfo() {

    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/GetOrgCourseWordNum",//加载出来单词数量信息
        dataType: "json",

        data: {
            data: $("#tabsCourse .active").attr("data-co"), stuId: id

        },
        success: function (data) {

            if (data.Data) {
                //请求新数据绑定
                $("#haveWordNum").html(data.Data.HaveWordNum);//加载信息
                $("#goalWord").html(data.Data.GoalWord);//加载信息
                $("#fullScoreNum").html(data.Data.FullScoreNum);//加载信息


            }
            else {
                console.log('无数据');

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
$(document).off('infinite');//解绑
// 注册'infinite'事件处理函数
$(document).on('infinite', '.infinite-scroll-bottom', function () {

    // 如果正在加载，则退出
    if (loading) return;
    // 设置flag
    loading = true;
    currentPageL = currentPageL + 1;
    GetStuCourseLessonData(currentPageL);

});
$.init();


