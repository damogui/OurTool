var tool = require('../../LUI/tool');
var Lui = require("../../LUI/js/lui.js");
var lui = new Lui();

var loop = {
    interval: 1,
    loop_interval: 1500,
    timer: {},
    init: function () {
        var lthis = this;
        // lthis.bindEvent();
        lthis.run();

    },
    run: function () {
        var lthis = this;
        lthis.timer = setInterval(function () {
            lthis.toggle();
        }, lthis.loop_interval);
    },
    next: function () {
        // $(".loop p").each(function(index,item){
        var els = $(".loop p");
        var length = els.length;
        var first = $(els[0]);
        var last = $(els[length - 1]);
        var mid = $(els[Math.floor(length / 2)]);
        last.insertBefore(first[0]);

    },
    toggle: function () {
        var tthis = this;

        var first = $(".loop p[data-index='1']");
        var mid = $(".loop p[data-index='2']");
        var last = $(".loop p[data-index='3']");

        first.animate({
            "font-size": "30px",
            "opacity": 1,
            "top": "22px",
            "line-height": "78px"
        }, "normal", "linear", function () {
            first.removeClass("old").addClass("cur");
            first.attr("data-index", 2);
        });
        mid.animate({
            "font-size": "22px",
            "opacity": "0.5",
            "filter": "alpha(opacity=50)",
            "line-height": "22px",
            "top": "97px"
        }, "normal", "linear", function () {
            mid.removeClass("cur").addClass("old");
            mid.attr("data-index", 3);
        });
        last.animate({"top": "0px"}, "normal", "linear", function () {
            // mid.removeClass("cur").addClass("old");
            last.attr("data-index", 1);
        });
    },
    bindEvent: function () {
        var lthis = this;
        $(".loop").on("mouseover", function () {
            clearInterval(lthis.timer);
        });
        $(".loop").on("mouseleave", function () {
            lthis.toggle();
            lthis.init();
        });
    },


};
var l = {
    chk:{},
    resizeWindow: function () {
        if (window.innerHeight >= (610 + 70)) {
            $("body").css({"height": window.innerHeight});
            $("#top").css({height: 70});
            $("body").css({"position":"static"});
        }
        else {
            $("body").css({"height": 610 + 30 + 30});
            $("#top").css({height: 30});
            $("body").css({"position":"relative"});
        }
    },

    //设置自动登录属性
    setIsAuto: function (e) {
        tool.setCookie("word-isauto", e, 24 * 1000);
    },

    //设置账号
    setCode: function (e) {
        tool.setCookie("word-code", e, 24 * 1000);
    },

    //获取验证码
    setVC: function () {
        $("#imgAuthCode").attr("src", "/Home/VCode?UserCode=0" + "&t=" + Math.random());
    },

    bindEvent:function(){
        $(window).resize(function () {
            l.resizeWindow();
        });
        $("#usercode").keypress(function () {
            var keynum = event.keyCode;
            if (!(keynum >= 48 && keynum <= 57))
                return false;
            if ($("#usercode").val().length > 10) {
                $("#errorInfo").text("账号或密码错误！");
                $("#errorInfo").show();
            }
            else {
                $("#errorInfo").hide();
            }
        });

        //不能有空格
        $("#userpwd").keypress(function () {
            var keynum = event.keyCode;
            if (keynum == 32)
                return false;
            $("#errorInfo").hide();
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
                $("#errorInfo").show();
            }
            else {
                $("#errorInfo").hide();
            }
        });

        $("#userpwd,#reg-code").keydown(function () {
            if (event.keyCode == 13 || event.keyCode == 9) {
                $("#ok").click();
            }
        });

        $("#imgAuthCode").click(function () {
            l.setVC();
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
                            $("#errorInfo").hide();
                        }
                        else {
                            $("#errorInfo").text(e.Result);
                            $("#errorInfo").show();
                        }
                    }
                });
            }
            else {
                if (codeValue == "")
                    $("#errorInfo").text("验证码不能为空！");
                else
                    $("#errorInfo").text("验证码有误！");
                $("#errorInfo").show();
            }
        });


        $("#ok").click(function () {
           l. login();
        });
    },
    setpwd:function(){
        $("#usercode").val(tool.getCookie("word-code"));
        $("#userpwd").val("");
       if (tool.getCookie("word-isauto") && tool.getCookie("word-isauto") != "0") {

           l.chk.setClickStyle1($(".lui_checkbox[data-name='g1']"),1);
            // $("#autoCheck").css("visibility", "visible");
            $("#userpwd").val(tool.getCookie("word-token"));
        }
        else {
           l.chk.setClickStyle1($(".lui_checkbox[data-name='g1']"),0);
            // $("#autoCheck").css("visibility", "hidden");
        }
    },
    login:function() {
    if ($.trim($("#usercode").val()) == "" || $.trim($("#userpwd").val()) == "") {
        $("#errorInfo").text("用户名或密码不能为空！");
        $("#errorInfo").show();
        return;
    }

    if (!$("#org-validate").is(":hidden") && ($.trim($("#reg-code").val()) == "")) {
        $("#errorInfo").text("验证码不能为空！");
        $("#errorInfo").show();
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
            $("#errorInfo").show();
        },
        success: function (e) {
            if (e.OK) {
                l.setCode(orgCode);
                location.href = e.TagValue;
            }
            else {
                if (e.Code == "2") {
                    l.setVC();
                    $("#org-validate").show();
                }
                $("#errorInfo").text(e.Result);
                $("#errorInfo").show();
            }
        }
    });
},
    init:function(){
      l.chk= lui.initCheckBox({
            callback: function (item) {
                if($(item).attr("data-checked")==1)
                {
                    l.setIsAuto(1);
                }
                else{
                    l.setIsAuto(0);
                }
            }
        });
        l.resizeWindow();
        l.bindEvent();
      l.setpwd();
    }


}
$(function () {


    loop.init();
    l.init();




})