
var a = require('template-helpers.js');

var classid;
var classname;
$(function () {
    classid = $("#hidden-classid").text();
    classname = $("#hidden-classname").text();

         GetStudentTestList();

});

function GetStudentTestList() {

    $.ajax({
        type: "get",
        url: "/teacher/TestCenter/GetStudentTestReportList",
        cache: false,
        data: { classid: classid },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);
            var li = JSON.parse(data.result);

            var tpl = require("teacher/test-center-class");

            $("#b-studentlist").html(tpl(li));

            if (li.length==0) {
                $("#b-studentlist").html("暂无学生");
                $("#b-studentlist").hide();
                $(".no-course-bg").show();
            }

            $(".b-studentlist-item").on("click", function () {
                var evaluationid = $(this).attr("data-evaluationid");
                var username = $(this).attr("data-username");

                $.router.load("/teacher/testcenter/StudentTestReportDetail?evaluationid=" + evaluationid+"&username="+username+"&classid="+classid+"&classname="+classname, true);

            });

        }
    });

}
