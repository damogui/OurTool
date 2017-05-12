

initData(1);

//初始化数据
function initData(e1) {
    $("#pager").html("");
    $("#ctable").children(":first").nextAll().remove();
    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
    $.ajax({
        type: "post",
        url: "/Org/Classes/GetClassReportList",
        dataType: "json",
        data: {
            ClassID: ClassID, PageIndex: e1
        },
        error: function (e) {

        },
        success: function (e) {
            $("#ctable").children(":first").nextAll().remove();
            if (e.Data == null || e.Data.length == 0) {
                $("#emptyDataOver").tmpl(null).appendTo("#ctable");
            }
            else {
                $("#reportData").tmpl(e.Data).appendTo("#ctable");
            }
            $("#pager").html(e.TagValue);
            $("[data-c-name]").html(e.Code);

            //分页事件
            PagerClick();
        }
    });

}

function PagerClick() {
    $("#pager a[data-num]").click(function () {
        initData($(this).attr("data-num"));//加载表格
    });
}