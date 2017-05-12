
//后台交互
require("../../tpl/template-helpers.js");

var tplStuCourseDetail = require("Parent/StuCourseDetail.tpl");//课程评价模板

var id = $("#cId").val() + "-" + $("#lId").val() + "-" + $("#cInId").val() + "-" + $("#stuId").val();//第三个参数精彩瞬间用

var stuId = $("#stuId").val();//学生id


var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        document.title = '课程报告';
        //加载列表
        GetStuCourseLessionData();

    },
    initBtns: function () {
        //todo 绑定事件
       
        //精彩瞬间
        $("body").delegate("#momentG", "click", function () {
            //$.router.load("/Parents/ParentMenu/SpleMoment/" + id, true);//精彩瞬间跳转

            window.location.href = "/Parents/ParentMenu/SpleMoment/" + id;


        });
        //首页的跳转
        $("body").delegate("#menuId", "click", function () {
            
           // $.router.load("/Parents/ParentMenu/Index", true);//处理跳转

            window.location.href = "/Parents/ParentMenu/Index/" + stuId;

        });
      
     
    }


};

//绑定数据
$(function () {
    module.init();



});


//发送请求调取单堂课的数据
function GetStuCourseLessionData() {
   
    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/GetOrgCourseInfoById",
        dataType: "json",

        data: {
            CourseId: $("#cId").val(), CurrentNumber: $("#lId").val(), stuId: stuId

        },
        success: function (data) {
            if (data.Data) {
                //请求新数据绑定
                $("#tb").html(tplStuCourseDetail(data.Data));//加载课程头部
               
            }
            else {

                //alert("无数据");

            }
        }
    });

}




