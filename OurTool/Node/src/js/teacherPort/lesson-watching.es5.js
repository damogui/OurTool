"use strict";

Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};
Array.prototype.isHaveValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {

            return true;
        }
    }
    return false;
};

var _groupArr = [];

var lesson = {
    init: function init() {

        $(".card-header").off("click");
        $(".card-header").on("click", function () {

            var p = $(this).parent();
            var groupindex = $(this).attr("data-groupindex");

            if (p.hasClass("slide-down")) {
                var next = $(this).next();
                $(next).hide(100);
                p.removeClass("slide-down").addClass("slide-up");
                $(this).find(".icon-down-drop").removeClass("icon-down-drop").addClass("icon-right-drop");

                _groupArr.removeByValue(groupindex);
            } else {
                var next = $(this).next();
                $(next).show(100);
                p.removeClass("slide-up").addClass("slide-down");
                $(this).find(".icon-right-drop").removeClass("icon-right-drop").addClass("icon-down-drop");

                if (!_groupArr.isHaveValue(groupindex)) {

                    _groupArr.push(groupindex);
                }
            }
        });
    }

};

var classindex;
var classid;
var timer = {};

$(function () {

    classindex = $("#hidden-classindex").text();
    classid = $("#hidden-classid").text();

    GetClassroomMonitor(1);

    $("#btn-submit").click(SaveClassEnd);
});

function GetClassroomMonitor(a) {

    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetClassroomMonitor",
        cache: false,
        data: { classindex: classindex },
        dataType: "JSON",
        success: function success(data) {

            data = JSON.parse(data);

            if (data.Code == "404" && data.OK.toString() == "false") {
                window.location.reload();
                return;
            }

            var li = data.result;

            var tpl = require("teacher/lesson-watching");
            $("#b-monitorlist").html(tpl(li));

            lesson.init();

            //�����ϴ�չ��������״̬
            for (var i = 0; i < _groupArr.length; i++) {

                $(".card-header[data-groupindex='" + _groupArr[i] + "']").click();
            }

            //��һ�ε�һ����չ��
            if (a == 1) {
                $(".card-header").eq(0).click();
            }

            window.timer = setTimeout(GetClassroomMonitor, 10000);
        }
    });
}

function SaveClassEnd() {
    _groupArr = [];
    $.ajax({
        type: "POST",
        url: "/teacher/myclass/SaveClassEnd",
        cache: false,
        data: { classindex: classindex },
        dataType: "JSON",
        success: function success(data) {

            $("#btn-submit").off("click");

            $.router.load('/teacher/myclass/CourseReport?classindex=' + classindex + "&classid=" + classid, true);
        }
    });
}

