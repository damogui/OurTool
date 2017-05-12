var row_data = { PWD: "", Re: "", RePwd: "" };//当前行数据

$("[data-close]").click(function () {
    $('.pop-mask,#editMesg').hide();
});

$("#edit-pwd,#edit-new,#edit-renew").keypress(function () {
    var keynum = event.keyCode;
    if (keynum == 32)
        return false;
    $(".error").html("");
});

$("#edit-ok").click(function () {
    $('.pop-mask,#editMesg').hide();
    location.href = "/";
});

$("#edit-pwd,#edit-new,#edit-renew").keydown(function () {
    if (event.keyCode == 8) {
        $(".error").html("");
    }
    if (event.keyCode == 13) {
        $("#add-ok").click();
    }
});


//添加班级
$("#add-ok").click(function () {
    if ($(".error").html() != "") {
        return;
    }
    row_data.PWD = $("#edit-pwd").val();
    row_data.Re = $("#edit-new").val();
    row_data.RePwd = $("#edit-renew").val();
    if ($.trim(row_data.PWD).length == 0) {
        $(".error").html("密码不能为空！");
        return;
    }
    if ($.trim(row_data.Re).length == 0) {
        $(".error").html("新密码不能为空！");
        return;
    }
    if (row_data.Re != row_data.RePwd) {
        $(".error").html("新密码与确认密码不一致！");
        return;
    }
    $.ajax({
        type: "post",
        url: "/Home/RePwd",
        data: { data: JSON.stringify(row_data) },
        dataType: "json",
        error: function (e) {
            $(".error").html("请求失败!");
        },
        success: function (e) {
            if (e.OK) {
                $('.pop-mask,#editMesg').show();
            }
            else {
                $(".error").html(e.Result);
            }
        }
    });

});


