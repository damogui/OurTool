
//后台交互
require("../../tpl/template-helpers.js");

var openId = $("#openId").val();
var stuId = $("#stuId").val();
var stuAccount = $("#stuAccount").html();//账号
var stuPwd = $("#stuPwd").val();//用户密码
var userRole = $("#userRole").val();//用户角色
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        if (userRole=="4") {
            $("#roleName").html("老师：");
        } else {
            $("#roleName").html("学生：");
        }

     


    },
    initBtns: function () {
        //todo 绑定事件


        //首页的跳转
        $("body").delegate("#menuId", "click", function () {

            // $.router.load("/Parents/ParentMenu/Index", true);//处理跳转
            if (userRole == "4") {
                
                tlogin();//走下教师端的登录
                //window.location.href = "/teacher/myclass/index";//跳转教师端
                
            } else {
                window.location.href = "/Parents/ParentMenu/Index/" + stuId;
            }

           


        });


        //解绑的操作
        $("body").delegate("#unbindAccount", "click", function () {//解除绑定

            var tipStr = "";
            if (userRole == "4") {
                tipStr = "确定解除绑定此老师吗？";

            } else {
                tipStr = "确定解除绑定此学生吗？";
                
            }
            $.confirm(tipStr, function () { UnBindStuAccount(); }, function () { });
          // alert("确定要解除绑定");


        });
      


    }


};

//绑定数据
$(function () {
    module.init();
    
    if (openId == "0" || openId == "") {
        $.router.load("/Parents/ParentMenu/BindStuAccount", true); //处理跳转

    }

});




//解除绑定
function UnBindStuAccount() {
   
    $("#divLoading").show();
    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/BindAccount",
        dataType: "json",

        data: {
            openId: openId, type: 1//0绑定1解绑

        },
        success: function (data) {
            $("#divLoading").hide();
          
            //$("#divLoading").hide();
            if (data.Data && data.Data.length > 0) {
                
               // $.router.load("/Parents/ParentMenu/BindStuAccount", true); //处理跳转
                window.location.href = "/Parents/ParentMenu/BindStuAccount/" + openId;
            }
            else {
                $.alert("绑定失败!", "提示");


            }
        }
    });

}



///教师端登录
function tlogin() {

    $.ajax({
        url: "/Home/Login",
        type: "post",
        data: {
            UserCode: stuAccount,
            UserPWD: stuPwd
        },
        success: function (data) {
            
            if (typeof (data) == "string") {
                data = JSON.parse(data);
            }
            
            if (data.OK.toString() == "false") {
                $.toast(data.Result, 2000, "pop-toast");
            } else {
                window.location.href = "/teacher/myclass/index";
            }
        }

    });

}




