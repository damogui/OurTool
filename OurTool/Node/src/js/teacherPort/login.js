var tool = require('../../LUI/tool');
$(function(){
t.init();
});
var t={
    init:function(){
      t.bindEvent();
    },
    login:function(){
        $.ajax({
            //url: "/Home/Login",
            url: "/Home/LoginTeacher",
            
            type:"post",
            data:{
                UserCode:document.getElementsByName("UserCode")[0].value,
                UserPWD:document.getElementsByName("UserPWD")[0].value,
            },
            success:function(data){

                if(typeof(data)=="string")
                {
                data=JSON.parse(data);
                }

                if(data.OK.toString()=="false"){
                    $.toast(data.Result,2000,"pop-toast");
                }
                else{
                    $.toast("登录成功", 2000, "pop-toast");
                    setTimeout(function () {
                        //window.location.href = data.tagValue;
                        window.location.reload();
                    },2000)
                }
            }

        })
    },
    bindEvent: function () {
        var tthis = this;
        $("#t-login").off("click");
        $("#t-login").click(function () {
            tthis.login();
        });
        //$("input").on("focus", function () { })
        var focus = false;
        $(document).on({
            "focus": function () {
                focus = true;
                $(".bar-tab").css({ "z-index": -1 });
            }, "blur": function () {
                focus = false;
                if (!focus) {
                    setTimeout(function () {
                        if (!focus)
                            $(".bar-tab").css({ "z-index": 10 });
                    }, 1000);
                }


                //console.log(2);
            }
        }, "input");
    }
}
