var stuAccount = "";//用户账号
var stuPwd = "";//用户密码
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //账号绑定
       

    },
    initBtns: function () {
        //todo 绑定事件

    //先解绑，再添加事件
        $("body").undelegate("#btnBind", "click");
        //绑定
        $("body").delegate("#btnBind", "click", function () {
             stuAccount = $("#stuAccount").val().trim();
             stuPwd = $("#stuPwd").val().trim();
           
            if (stuAccount.length < 1) {
                $.alert("请输入正确账号或密码!", "提示");
                return;
                // $.confirm("确定解除绑定此学生吗？", function () { alert("ok") }, function () { alert("cancel") });
            }
            if (stuPwd.length < 1) {

                $.alert("请输入正确账号或密码!", "提示");
                return;
            }
          
            BindStuAccount(stuAccount, stuPwd);
        });
        


    }


};
var openId = $("#openId").val();
var stuId = $("#stuId").val();
//绑定数据
$(function () {
    module.init();
   
    if (stuId != "0" && stuId != "") {
       // $.router.load("/Parents/ParentMenu/UnBindStuAccount/" + openId, true);//处理跳转
        window.location.href = "/Parents/ParentMenu/UnBindStuAccount/" + openId;
        
    } 



});



//绑定
function BindStuAccount(a, b) {
   
    if (parseInt(openId) > 0) {//表明是返回导致的
        $.alert("请重新点击微信菜单进入", "提示");
        return;

    }
   
    $("#divLoading").show();
    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/BindAccount",
        dataType: "json",

        data: {
            loginAccount: a, loginPwd: b, openId: openId, type: 0//0绑定1解绑

        },
        success: function (data) {
          
           
            //$("#divLoading").hide();
            if (data.Data && data.Data == 1) {
                $("#openId").val(data.TagValue);//赋值
                $.toast('绑定成功', 2000, 'pop-toast');
                //判断然后决定学生还是老师
                if (data.Code=="4") {
                    tlogin();//老师登录跳转
                } else {
                    this.setTimeout(function () {
                        $.router.load("/Parents/ParentMenu/Index/" + data.TagValue, true);//处理跳转

                    }, 1000);
                    
                }
               


              


            }
            else {
                $.alert(data.Data, "提示");


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
        success: function(data) {

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


