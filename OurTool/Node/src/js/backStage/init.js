var tool = require('../../LUI/tool');

tool.popshow($("#btnlogin"), $('#popLogin'));
tool.pophide($('#popLogin .close'), $('#popLogin'));

$("#btnlogin").click(function () {
    $("#usercode").val(tool.getCookie("word-code"));
    $("#userpwd").val("");
    $("#errorInfo").parent().hide();
    if (tool.getCookie("word-isauto") && tool.getCookie("word-isauto") != "0") {
        $("#autoCheck").css("visibility", "visible");
        $("#userpwd").val(tool.getCookie("word-token"));
    }
    else {
        $("#autoCheck").css("visibility", "hidden");        
    }
});


$("span[data-auto]").click(function () {
    if ($("#autoCheck").css("visibility") == "hidden") {
        $("#autoCheck").css("visibility", "visible");
        setIsAuto(1);
    }
    else {
        $("#autoCheck").css("visibility", "hidden");
        setIsAuto(0);
    }
});


$("#usercode").keypress(function () {
    var keynum = event.keyCode;
    if (!(keynum >= 48 && keynum <= 57))
        return false;
    if ($("#usercode").val().length > 10) {
        $("#errorInfo").text("账号或密码错误！");
        $("#errorInfo").parent().show();
    }
    else {
        $("#errorInfo").parent().hide();
    }
});

//不能有空格
$("#userpwd").keypress(function () {
    var keynum = event.keyCode;
    if (keynum == 32)
        return false;
    $("#errorInfo").parent().hide();
});

//不能有空格
$("#reg-code").keypress(function () {
    var keynum = event.keyCode;
    if (keynum == 32)
        return false;
});

$("#usercode").keydown(function () {
    if ($("#usercode").val().length > 12) {
        $("#errorInfo").text("账号或密码错误！");
        $("#errorInfo").parent().show();
    }
    else {
        $("#errorInfo").parent().hide();
    }
});

$("#userpwd,#reg-code").keydown(function () {
    if (event.keyCode == 13 || event.keyCode == 9) {
        $("#ok").click();
    }
});

$("#imgAuthCode").click(function () {
    setVC();
});

$("#reg-code").keyup(function () {

    var codeValue = $("#reg-code").val();
    if (codeValue.length == 4) {
        $.ajax({
            type: "post",
            url: "/Home/GetCode",
            dataType: "json",
            data: { Code: codeValue },
            error: function (e) {

            },
            success: function (e) {
                if (e && e.OK) {
                    $("#errorInfo").parent().hide();
                }
                else {
                    $("#errorInfo").text(e.Result);
                    $("#errorInfo").parent().show();
                }
            }
        });
    }
    else {
        if (codeValue == "")
            $("#errorInfo").text("验证码不能为空！");
        else
            $("#errorInfo").text("验证码有误！");
        $("#errorInfo").parent().show();
    }
});


$("#ok").click(function () {
    login();
});

function login() {
    if ($.trim($("#usercode").val()) == "" || $.trim($("#userpwd").val()) == "") {
        $("#errorInfo").text("用户名或密码不能为空！");
        $("#errorInfo").parent().show();
        return;
    }

    if (!$("#org-validate").is(":hidden") && ($.trim($("#reg-code").val()) == "")) {
        $("#errorInfo").text("验证码不能为空！");
        $("#errorInfo").parent().show();
        return;
    }

    var orgCode = $("#usercode").val();

    $.ajax({
        type: "post",
        url: "/Home/Login",
        data: {
            UserCode: orgCode,
            UserPWD: $("#userpwd").val(),
            Code: $("#reg-code").val()
        },
        dataType: "json",
        error: function (e) {
            $("#errorInfo").text("登录异常！");
            $("#errorInfo").parent().show();
        },
        success: function (e) {
            if (e.OK) {
                setCode(orgCode);
                location.href = e.TagValue;
            }
            else {
                if (e.Code == "2") {
                    setVC();
                    $("#org-validate").show();
                }
                $("#errorInfo").text(e.Result);
                $("#errorInfo").parent().show();
            }
        }
    });
}

//设置自动登录属性
function setIsAuto(e) {
    tool.setCookie("word-isauto", e, 24 * 1000);
}

//设置账号
function setCode(e) {
    tool.setCookie("word-code", e, 24 * 1000);
}

//获取验证码
function setVC() {
    $("#imgAuthCode").attr("src", "/Home/VCode?UserCode=0" + "&t=" + Math.random());
}

