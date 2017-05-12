var row_data = { BookSetID: 0, BookType: 0, SName: "", OutPrice: 0, BookNumber: 0, Remark: "" };//当前行数据

$("[data-close]").click(function () {
    $('.pop-mask,#edit').hide();
});

$("#edit-num").keypress(function () {
    var keynum = event.keyCode;
    if (!(keynum >= 48 && keynum <= 57))//非数字
        return false;
    if ($(this).val().length == 3)//3位数字
        return false;
    if ($(this).val() == "" && keynum == 48)//首位不能为0
        return false;
    $("[data-type='edit-info']").css({ "visibility": "hidden" });
});

$("#edit-out").keypress(function () {
    var keynum = event.keyCode;
    if (!(keynum >= 48 && keynum <= 57))//非数字
        return false;
    if ($(this).val().length == 6)//6位数字
        return false;
    if (row_data.BookType == 4)//体验课
    {
        if ($(this).val() == "0" && keynum == 48)//首位不能为0
            return false;
    }
    else {
        if ($(this).val() == "" && keynum == 48)//首位不能为0
            return false;
    }
    $("[data-type='edit-info']").css({ "visibility": "hidden" });
});

$("#edit-num,#edit-out").keydown(function () {
    if (event.keyCode == 8) {
        $("[data-type='edit-info']").css({ "visibility": "hidden" });
    }
});


$("[data-type='view-info']").click(function () {
    $.ajax({
        type: "post",
        url: "/Org/Course/GetBookSetInfo",
        data: { BookSetID: row_data.BookSetID },
        dataType: "json",
        error: function (e) {
        },
        success: function (e) {
            if (e.OK) {
                $("#edit-num").val(e.Data[0].DefaultNumber);
                $("[data-type='edit-info']").css({ "visibility": "hidden" });
            }
        }
    });
});

//修改班级
$("#edit-ok").click(function () {
    if ($("[data-type='edit-info']").css("visibility") == "visible") {
        return;
    }
    row_data.OutPrice = $("#edit-out").val();
    row_data.BookNumber = $("#edit-num").val();
    row_data.Remark = $("#edit-remark").val();
    if (row_data.BookType == 4)//体验课
    {
        if (row_data.OutPrice == "") {
            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请有效填写学生售价！");
            return;
        }
        if (!(+row_data.OutPrice >= 0 && +row_data.OutPrice < 1000000)) {
            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请有效填写学生售价！");
            return;
        }
    }
    else if (!(+row_data.OutPrice > 0 && +row_data.OutPrice < 1000000)) {
        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请有效填写学生售价！");
        return;
    }
    if (!(+row_data.BookNumber > 0 && +row_data.BookNumber < 1000)) {
        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请正确填写课次！");
        return;
    }
    $.ajax({
        type: "post",
        url: "/Org/Course/EditCourse",
        data: { data: JSON.stringify(row_data) },
        dataType: "json",
        error: function (e) {
            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请求失败!");
        },
        success: function (e) {
            if (e.OK) {
                $('.pop-mask,#edit').hide();
                init(1);//加载表格
            }
            else {
                $("[data-type='edit-info']").css({ "visibility": "visible" }).text(e.Result);
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
        url: "/Org/Course/GetCourse",
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
                $("#courseData").tmpl(e.Data).appendTo("#ctable");
            }
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

        $('.pop-mask,#edit').show();

        $("[data-type='edit-info']").css({ "visibility": "hidden" }).text("");

        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
        row_data.BookSetID = $(this).attr("data-id")//套课ID
        row_data.BookType = $r.children("[data-index=10]").attr("data-value");//套课类型
        row_data.SName = $r.children("[data-index=1]").attr("data-value");//套课名称
        row_data.OutPrice = $r.children("[data-index=0]").attr("data-value");//学生售价
        row_data.BookNumber = $r.children("[data-index=2]").attr("data-value");//套课课次
        row_data.Remark = $r.children("[data-index=3]").attr("data-value");//套课备注
        //
        $("#edit-name").html(row_data.SName);
        $("#edit-num").val(row_data.BookNumber);
        $("#edit-out").val(row_data.OutPrice);
        $("#edit-remark").val(row_data.Remark);
    });
}