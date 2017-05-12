
var row_data = { SchoolID: 0, SchoolName: "" };//当前行数据

$("[data-type='add']").click(function () {

    $("[data-type='add-info']").css({ "visibility": "hidden" });
    $("#add-name").val("");
    $('.pop-mask,#addteach-pointer').show();

});

$("[data-close]").click(function () {
    $('.pop-mask,#addteach-pointer,#editteach-pointer').hide();
});

$("#edit-name,#add-name").keypress(function () {
    var keynum = event.keyCode;
    if (keynum == 32)
        return false;
    if ($(this).val().length == 25)//25位
        return false;
    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
});

$("#edit-name,#add-name").keydown(function () {
    if (event.keyCode == 8) {
        $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
    }
});

$("#edit-name,#add-name").keyup(function () {
    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
});

//修改校区
$("#edit-ok").click(function () {
    if ($("[data-type='edit-info']").css("visibility") == "visible") {
        return;
    }
    row_data.SchoolName = $("#edit-name").val();
    if ($.trim(row_data.SchoolName).length == 0) {
        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("校区不能为空！");
        return;
    }
    if ($.trim(row_data.SchoolName).length > 10) {
        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("校区名称最大长度为10！");
        return;
    }
    $.ajax({
        type: "post",
        url: "/Org/School/EditSchool",
        data: { data: JSON.stringify(row_data) },
        dataType: "json",
        error: function (e) {
            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请求失败!");
        },
        success: function (e) {
            if (e.OK) {
                $('.pop-mask,#editteach-pointer').hide();
                init(1);//加载表格
            }
            else {
                $("[data-type='edit-info']").css({ "visibility": "visible" }).text(e.Result);
            }
        }
    });
});

//添加校区
$("#add-ok").click(function () {
    if ($("[data-type='add-info']").css("visibility") == "visible") {
        return;
    }
    row_data.SchoolName = $("#add-name").val();
    if ($.trim(row_data.SchoolName).length == 0) {
        $("[data-type='add-info']").css({ "visibility": "visible" }).text("校区不能为空！");
        return;
    }
    if ($.trim(row_data.SchoolName).length > 10) {
        $("[data-type='add-info']").css({ "visibility": "visible" }).text("校区名称最大长度为10！");
        return;
    }
    $.ajax({
        type: "post",
        url: "/Org/School/AddSchool",
        data: { data: JSON.stringify(row_data) },
        dataType: "json",
        error: function (e) {
            $("[data-type='add-info']").css({ "visibility": "visible" }).text("请求失败！");
        },
        success: function (e) {
            if (e.OK) {
                $('.pop-mask,#addteach-pointer').hide();
                init(1);//加载表格
            }
            else {
                $("[data-type='add-info']").css({ "visibility": "visible" }).text(e.Result);
            }
        }
    });
});

init(1);

function init(e1) {
    $("#pager").html("");
    $("#ctable").children(":first").nextAll().remove();
    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
    $.ajax({
        type: "post",
        url: "/Org/School/GetSchooles",
        data: {
            PageIndex: e1
        },
        dataType: "json",
        error: function (e) {
        },
        success: function (e) {
            $("#ctable").children(":first").nextAll().remove();
            if (e.Data.length == 0) {
                $("#emptyDataOver").tmpl(null).appendTo("#ctable");
            }
            else {
                $("#schoolData").tmpl(e.Data).appendTo("#ctable");
            }
            $("#dataCount").html(e.PageSum);
            $("#pager").html(e.TagValue);
            //分页事件
            PagerClick();

            //修改事件
            EditClick();
        }
    });
}

function PagerClick() {
    $("#pager a[data-num]").click(function () {
        init($(this).attr("data-num"));//加载表格
    });
}

//点击修改班级
function EditClick() {
    $("[data-type='edit']").click(function () {

        $('.pop-mask,#editteach-pointer').show();

        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
        row_data.SchoolID = $(this).attr("data-id")//学校ID
        row_data.SchoolName = $r.children("[data-index=1]").attr("data-value");//学校名称
        //
        $("#edit-name").val(row_data.SchoolName);
        $("[data-type='edit-info']").css({ "visibility": "hidden" });
    });
}