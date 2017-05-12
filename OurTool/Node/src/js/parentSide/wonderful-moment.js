
//后台交互
require("../../tpl/template-helpers.js");

var tplSpleMoment = require("Parent/SpleMoment.tpl");//精彩瞬间模板

var id = $("#hideId").val();//课程评价需要的id

var aid = $("#hideAId").val();//比较全的id

var stuId = $("#stuId").val();//学生id
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //加载列表
        GetClassMomentData();

    },
    initBtns: function () {
        //todo 绑定事件

        //课程评价
        $("body").delegate("#courseE", "click", function () {
           // $.router.load("/Parents/ParentMenu/CourseEvalu/" + aid, true);//精彩瞬间跳转

            window.location.href = "/Parents/ParentMenu/CourseEvalu/"+aid;


        });
        //首页的跳转
        $("body").delegate("#menuId", "click", function () {

            //$.router.load("/Parents/ParentMenu/Index", true);//处理跳转

            window.location.href = "/Parents/ParentMenu/Index/"+stuId;


        });


    }


};

//绑定数据
$(function () {
    module.init();
    //处理图片的点击效果
    $(document).on('click', '.img', function () {
        $('.pop-mask').show();
        var htnlval = $(this).html();
        $('.pop-mask').html(htnlval);

    });
    $(document).on('click', '.pop-mask img', function () {
        $('.pop-mask').html('');
        $('.pop-mask').hide();
    });

});


//发送请求调取单堂课的数据
function GetClassMomentData() {

    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/GetOrgClassMoment",
        dataType: "json",

        data: {
            stuId: stuId, ClassIndex: $("#hideId").val()//传递的是班级的第几次上课

        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {
                //请求新数据绑定
                $("#tb").html(tplSpleMoment(data.Data));//加载课程头部
            }
            else {
              
                $("#tb").hide();
                $("#showNoData").show();//显示暂无数据

            }
        }
    });

}




