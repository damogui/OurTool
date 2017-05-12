

$(function () {

    $("#btn-submit").click(function () {
        var pwdold = $("#b-pwdold").val().trim();
        var pwdnew1 = $("#b-pwdnew1").val().trim();
        var pwdnew2 = $("#b-pwdnew2").val().trim();
        var showtip = "";
          $("#showtip").html(showtip);
        if (!isPasswd(pwdold)) {
            showtip = "请输入正确格式的原密码!";
            $("#showtip").html(showtip);
            return;
        }
        if (!isPasswd(pwdnew1) || !isPasswd(pwdnew2)) {
            showtip = "请输入正确格式的新密码!";
            $("#showtip").html(showtip);
            return;
        }
        if (pwdnew1 != pwdnew2) {
            showtip = "两次输入的新密码不一致!";
            $("#showtip").html(showtip);
            return;
        }

        var row_data = { PWD: pwdold, Re: pwdnew1, RePwd: pwdnew2 };//当前行数据

        $.ajax({
        type: "post",
        url: "/Home/RePwd",
        data: { data: JSON.stringify(row_data) },
        dataType: "JSON",

        success: function(data) {
            
                data = JSON.parse(data);

                if (data.OK) {
                    $.router.load("/teacher/myinfo/set",true);
                } else {
                    $("#showtip").html(data.Result);
                }
            }
        });



    });

    //校验密码：只能输入6-20个字母、数字、下划线
    function isPasswd(s) {
        var patrn = /^(\w){6,20}$/;
        if (!patrn.exec(s)) {
            return false;
        }
        return true;
    }
});









