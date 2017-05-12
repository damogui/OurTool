
var classindex;
var classid;
$(function () {

    classindex = $("#hidden-classindex").text();
    classid = $("#hidden-classid").text();

    GetCourseReportList();


    $(".s-tab").on("click", function () {

        $.router.load("/teacher/myclass/SplendidMoment?classindex=" + classindex+"&classid="+classid);

    });
});

function GetCourseReportList() {
    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetCourseReportList",
        cache: false,
        data: { classindex: classindex },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            var tpl = require("teacher/lesson-report");

            $("#g-s-content").html(tpl(data));

            var ishavegroup = 0;

            if (data.grouplist.length > 0) {

                ishavegroup = 1;
            }

    
            $("#btn-submit").click(function () {

                $.router.load("/teacher/myclass/RewardCoin?classindex=" + classindex + "&classid=" + classid+"&ishavegroup="+ishavegroup, true);

            });


            $(".b-studentlist-item").on("click", function () {
                var classindex = $(this).attr("data-classindex");
                var studentid = $(this).attr("data-studentid");
                var courseid = $(this).attr("data-courseid");
                var username = $(this).attr("data-username");
               
                $.router.load("/teacher/myclass/StudentAnalysis?classindex=" + classindex + "&studentid=" + studentid + "&courseid=" + courseid+"&username="+username+"&classid="+classid, true);

            });

        }
    });
}