
var openId = $("#openId").val();
var stuId = $("#stuId").val();
var userRole = $("#userRole").val();
var userPwd = $("#userPwd").val();
var loginId = $("#loginId").val();
$(function() {
   
    document.title = '魔方格';
    if (stuId == "0" || stuId == "") {
        //$.router.load("/Parents/ParentMenu/BindStuAccount", true); //处理跳转

        window.location.href = "/Parents/ParentMenu/BindStuAccount/" + openId;


    } else if (userRole == "4") {
        tlogin();
        //window.location.href = "/teacher/myclass/index";//跳转家长端

       
    } else {
        $("#main").css("display", "");//显示
    }

    document.title = '家长端';
   
});



///教师端登录
function tlogin() {
    $.ajax({
        url: "/Home/Login",
        type: "post",
        data: {
            UserCode: loginId,
            UserPWD: userPwd
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

