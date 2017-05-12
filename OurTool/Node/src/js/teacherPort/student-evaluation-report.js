
var evaluationid;
var username;
require("../../tpl/template-helpers.js");
$(function () {
    evaluationid = $("#hidden-evaluationid").text();
    username = $("#hidden-username").text();

    GetStudentTestReportDetail();
});

function GetStudentTestReportDetail() {

    $.ajax({
        type: "get",
        url: "/teacher/TestCenter/GetStudentTestReportDetail",
        cache: false,
        data: { evaluationid: evaluationid, username: username },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);
            var li = JSON.parse(data.result);
            var tpl = require("teacher/student-evaluation-report");

            $("#b-reportdetail").html(tpl(li));
        }
    });

}