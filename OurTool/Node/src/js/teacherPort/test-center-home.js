

$(function() {

    GetMyTeachClassList();

});

function GetMyTeachClassList() {

    $.ajax({
        type: "get",
        url: "/teacher/testcenter/GetMyTeachClassList4Test",
        cache: false,
        data: {},
        dataType: "JSON",
        success: function (data) {
            if (data != null) {

                data = JSON.parse(data);

                var li = data.result;

                var tpl = require("teacher/test-center-home");

                $("#b-classlist").html(tpl(li));

                $(".b-classlist-item").on("click", function() {
                    var classid = $(this).attr("data-classid");
                    var classname = $(this).attr("data-classname");

                    $.router.load("/teacher/testcenter/StudentTestReportList?classid=" + classid+"&classname="+classname,true );

                });

            }
        }
    });
}
