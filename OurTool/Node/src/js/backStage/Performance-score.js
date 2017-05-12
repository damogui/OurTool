

$("[data-year]").click(function () {
    $(this).siblings().removeClass("active").end().addClass("active");
    GetKpi(1);
});

GetKpi(1);

function GetKpi(e1)//ҳ��
{
    $("#pager").html("");
    $("#ctable").children(":first").nextAll().remove();
    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
    //
    var year = +$(".active[data-year]").attr("data-year");
    //
    $.ajax({
        type: "post",
        url: "/Org/KPI/GetKPI",
        data: {
            Year: year, PageIndex: e1
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
                $("#kpiData").tmpl(e.Data).appendTo("#ctable");
            }
            $("#pager").html(e.TagValue);
            //��ҳ�¼�
            PagerClick();

        }
    });
}

function PagerClick() {
    $("#pager a[data-num]").click(function () {
        GetKpi($(this).attr("data-num"));//���ر��
    });
}
