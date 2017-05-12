

$(function () {
    GetMyTeachClassList();

});

function GetMyTeachClassList() {

    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetMyTeachClassList",
        cache: false,
        data: {},
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            var li = data.result;
            var str = "暂无关联班级";

            var tpl = require("teacher/my-class-list");
            $("#classlist").html(tpl(li));
            if (li.length == 0) {
                $("#classlist").html(str);
            }


            $(".s-class-list-item").on("click", function () {

                var classid = $(this).attr("data-classid");
                var classindex = $(this).attr("data-classindex");
                var classstatus = $(this).attr("data-classstatus");
                 var classname = $(this).attr("data-classname");
                if (classstatus == "1") {
                    $.router.load('/teacher/myclass/ClassroomMonitor?classindex=' + classindex, true);
                } else {
                    $.router.load('/teacher/myclass/ClassCourseRecord?classid=' + classid+'&classname='+classname, true);
                }

            });


        }
    });
}
