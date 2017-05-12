Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}
Array.prototype.isHaveValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {

            return true;
        }
    }
    return false;
}

var _groupArr = [];

var lesson = {
    init: function () {
        var tthis = this;
        $(document).off("click");
        $(document).on("click", ".card-header", function () {
            tthis.toggleShow(this);

            //var p = $(this).parent();
            //var groupindex = $(this).attr("data-groupindex");

            //if (p.hasClass("slide-down")) {
            //    var next = $(this).next();
            //    $(next).hide(100);
            //    p.removeClass("slide-down").addClass("slide-up");
            //    $(this).find(".icon-down-drop").removeClass("icon-down-drop").addClass("icon-right-drop");


            //    _groupArr.removeByValue(groupindex);

            //} else {
            //    var next = $(this).next();
            //    $(next).show(100);
            //    p.removeClass("slide-up").addClass("slide-down");
            //    $(this).find(".icon-right-drop").removeClass("icon-right-drop").addClass("icon-down-drop");

            //    if (!_groupArr.isHaveValue(groupindex)) {

            //        _groupArr.push(groupindex);
            //    }
            //}

        });
    },
    toggleShow: function (item) {
        var p = $(item).parent();
        var groupindex = $(item).attr("data-groupindex");

        if (p.hasClass("slide-down")) {
            var next = $(item).next();
            $(next).hide(100);
            p.removeClass("slide-down").addClass("slide-up");
            $(item).find(".icon-down-drop").removeClass("icon-down-drop").addClass("icon-right-drop");


            _groupArr.removeByValue(groupindex);

        } else {
            var next = $(item).next();
            $(next).show(100);
            p.removeClass("slide-up").addClass("slide-down");
            $(item).find(".icon-right-drop").removeClass("icon-right-drop").addClass("icon-down-drop");

            if (!_groupArr.isHaveValue(groupindex)) {

                _groupArr.push(groupindex);
            }
        }
    }


}

window.SendMessage = function () {


    if (typeof (ws) != 'undefined' && ws.readyState == WebSocket.OPEN) {

        ws.send("000005/" + g_teacherid + "/" + classindex);//老师请求暂停状态

        console.log("send:" + "000005/" + g_teacherid + "/" + classindex);

        ws.onmessage = function (evt) {//000007/classindex
            //收到消息,说明学生端是暂停状态1,非暂停0

            var message = evt.data;

            console.log("receive:" + evt.data);

            var arr = message.split('/');
            if (arr.length > 2) {

                if (arr[2] == "1") {
                    $(".teacher-pause").hide();
                    $(".teacher-running").show();
                } else {
                    $(".teacher-pause").show();
                    $(".teacher-running").hide();
                }
            }

            $(".teacher-pause").unbind("click");
            $(".teacher-running").unbind("click");
            $(".teacher-pause").click(StopClassStatus);
            $(".teacher-running").click(StartClassStatus)

        }
    }

}

/*初始化*/

var classindex;
var classid;
var timer = {};
var issend = 0;
$(function () {

    classindex = $("#hidden-classindex").text();
    classid = $("#hidden-classid").text();

    GetClassroomMonitor(1);

    $("#btn-submit").click(SaveClassEndWindow);

    $(".teacher-pause").hide();
    $(".teacher-running").hide();


    SendMessage();

});




/*10'/次 获取学生学习信息*/
function GetClassroomMonitor(a) {

    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetClassroomMonitor",
        cache: false,
        data: { classindex: classindex },
        dataType: "JSON",
        success: function (data) {
            document.getElementById("b-monitorlist").innerHTML = "";
            data = JSON.parse(data);


            if (data.Code == "404" && data.OK.toString() == "false") {
                window.location.reload();
                return;

            }

            var li = data.result;

            var tpl = require("teacher/lesson-watching");

            document.getElementById("b-monitorlist").innerHTML = tpl(li);
            //$("#b-monitorlist").html("");
            //$("#b-monitorlist").html(tpl(li));

            lesson.init();


            //保留上次展开的组的状态
            for (var i = 0; i < _groupArr.length; i++) {

                lesson.toggleShow($(".card-header[data-groupindex='" + _groupArr[i] + "']")[0]);
                //$(".card-header[data-groupindex='" + _groupArr[i] + "']").click();

            }

            //第一次第一个组展开
            if (a == 1) {

                //if ($(".card-header").eq(0).length > 0) {
                //    $(".card-header").eq(0).click();
                //}
                lesson.toggleShow($(".card-header").eq(0));
                //$(".card-header").eq(0).click();
                //setTimeout(function () { $(".card-header").eq(0).click(); }, 1000);

            }


            window.timer = setTimeout(GetClassroomMonitor, 10000);

        }
    });

}

/*下课按钮*/
function SaveClassEndWindow() {

    $.confirm('确定下课吗？', function () {
        SaveClassEnd();
    });


}

/*下课保存信息*/
function SaveClassEnd() {

    StartClassStatus();

    _groupArr = [];
    $.ajax({
        type: "POST",
        url: "/teacher/myclass/SaveClassEnd",
        cache: false,
        data: { classindex: classindex },
        dataType: "JSON",
        success: function (data) {

            $("#btn-submit").off("click");

            $.router.load('/teacher/myclass/CourseReport?classindex=' + classindex + "&classid=" + classid, true);

        }
    });

}

/**
 * 暂停
 * @returns {} 
 */
function StopClassStatus() {

    if (typeof (ws) != 'undefined' && ws.readyState == WebSocket.OPEN) {

        ws.send("000003/" + g_teacherid + "/" + classindex);

        console.log("stop:" + "000003/" + g_teacherid + "/" + classindex);

        $(".teacher-pause").hide();
        $(".teacher-running").show();

    }
}

/**
 * 取消暂停
 * @returns {} 
 */
function StartClassStatus() {

    if (typeof (ws) != 'undefined' && ws.readyState == WebSocket.OPEN) {

        ws.send("000004/" + g_teacherid + "/" + classindex);

        console.log("run:" + "000004/" + g_teacherid + "/" + classindex);

        $(".teacher-pause").show();
        $(".teacher-running").hide();

    }
}
