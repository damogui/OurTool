
$(function () {

    GetStudentStatistics();
});

function GetStudentStatistics() {

    var classindex = $("#hidden-classindex").text();
    var studentid = $("#hidden-studentid").text();
    var courseid = $("#hidden-courseid").text();

    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetStudentStatistics",
        cache: false,
        data: {
            studentid: studentid, classindex: classindex, courseid: courseid
        },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);


            var tpl = require("teacher/lesson-report-study-info");

            $("#studentinfo").html(tpl(data));


        }
    });

}