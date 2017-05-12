// var tool=require("../../LUI/tool.js");
var Lui = require("../../LUI/js/lui.js");
var lui = new Lui();
lui.initCheckBox();

var _studentGroup = null;
var classid;
var _isgroup = 1;//1分组;0不分组
var _studentCount = 0;


var teshubiaoji = 0;
/*初始化*/
$(function () {

    classid = $("#hidden-classid").text();
    GetStudentGroup(classid);
    bindEventCheck();

});

/*获取学生分组信息 ajax*/
function GetStudentGroup(classid) {
    var url = "/teacher/myclass/GetStudentGroup";
    if (!_isgroup) {
        url = "/teacher/myclass/GetStudentNoGroup";
    }


    var groupinfo = "";
    if (_studentGroup != null) {
        groupinfo = JSON.stringify(_studentGroup);
    }


    $.ajax({
        type: "post",
        url: url,
        cache: false,
        data: { classid: classid, groupinfo: groupinfo },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            var li = data.result;
            _studentGroup = li;


            var t_data = { isgroup: _isgroup, list: li }

            var tpl = require("teacher/student-group");
            $("#grouplist").html(tpl(t_data));

            ShowSetGroupInfo();

            lui.initCheckBox({
                callback: function (item) {


               

                    var groupname = $(item).attr("data-name");
                    if (groupname == "gall") {

                        if ($(item).attr("data-checked") == "1") {
                            //分组
                            _isgroup = 1;

                        } else {
                            //不分组
                            _isgroup = 0;

                        }

                        if ((_studentCount == 0 && _isgroup == 1)||teshubiaoji ==1) {
                            ChangeCheckBoxHandleAll();
                        } else {
                            ChangeCheckBoxHandle();
                        }


                        GetStudentGroup(classid);

                    }
                    else if (groupname == "g1") {

                        if ($(item).attr("data-checked") == "1") {

                            $(item).parent().removeClass("def").addClass("sel");

                        }
                        else {

                            $(item).parent().removeClass("sel").addClass("def");

                            if (_studentCount == 1 && _isgroup == 1) {

                                teshubiaoji = 1;

                                $("luicheck[data-name='gall']").click();
                                return;
                            } 


                        }

                        ChangeCheckBoxHandle();


                        if (_isgroup) {
                            GetStudentGroup(classid);
                        } else {
                            ShowSetGroupInfo();
                        }

                    }

                         teshubiaoji = 0;
                }
            });
        }
    });
}

/*修改学生选中状态*/
function ChangeCheckBoxHandleAll() {

    
        $("luicheck[data-name='g1']").each(function () {


            for (var i = 0; i < _studentGroup.length; i++) {


                for (var j = 0; j < _studentGroup[i].StudentInfoList.length; j++) {

                    _studentGroup[i].StudentInfoList[j].IsDel = 0;


                }


            }

        });
    

}


function ChangeCheckBoxHandle() {


        $("luicheck[data-name='g1']").each(function () {

            var isbool = $(this).attr("data-checked") == 1;

            var getgroupindexid = $(this).attr("data-groupindexid");
            var studentid = $(this).attr("data-val");

            for (var i = 0; i < _studentGroup.length; i++) {
                if (getgroupindexid == _studentGroup[i].GroupIndexId) {

                    for (var j = 0; j < _studentGroup[i].StudentInfoList.length; j++) {
                        if (studentid == _studentGroup[i].StudentInfoList[j].StudentID) {


                            if (isbool) {
                                _studentGroup[i].StudentInfoList[j].IsDel = 0;
                            }
                            else {
                                _studentGroup[i].StudentInfoList[j].IsDel = 1;

                            }

                        }
                    }

                }
            }

        });


}

/*分组人数显示 / 分组,学生是否有效(IsDel) / 提交按钮是否可用*/
function ShowSetGroupInfo() {
    _studentCount = 0;
    var groupCount = 0;
    var studentCount = 0;

    if (_isgroup) {

        for (var i = 0; i < _studentGroup.length; i++) {

            var t_stucount = _studentGroup[i].StudentInfoList.length;


            for (var j = 0; j < _studentGroup[i].StudentInfoList.length; j++) {

                if (_studentGroup[i].StudentInfoList[j].IsDel == 1) {
                    t_stucount--;
                }
                else {
                    studentCount++;
                }

            }

            if (t_stucount == 0) {
                _studentGroup[i].IsDel = 1;
            }
            else {
                _studentGroup[i].IsDel = 0;

                groupCount++;
            }

        }

        $("#groupinfo").html("( " + studentCount + "人 共 " + groupCount + " 队)");

    } else {
        var sl = _studentGroup[0].StudentInfoList;

        var t_stucount = sl.length;


        for (var j = 0; j < sl.length; j++) {

            if (sl[j].IsDel == 1) {
                t_stucount--;
            }
            else {
                studentCount++;
            }

        }

        if (t_stucount == 0) {
            _studentGroup[0].IsDel = 1;
        }
        else {
            _studentGroup[0].IsDel = 0;

        }

        $("#groupinfo").html("( " + studentCount + " 人)");
    }

    _studentCount = studentCount;


    $("#btn-submit").off("click");
    if (studentCount == 0) {
        //确定按钮不可用
        $("#btn-submit").addClass("btn-disable");


    } else {
        $("#btn-submit").removeClass("btn-disable");

        $("#btn-submit").click(SaveClassBegin);
    }

}

function SaveClassBeginWindow() {
    $.confirm('确定并公布组队',
        function() {
            SaveClassBegin();
        });
}


/*提交上课信息*/
function SaveClassBegin() {

    var groupinfo = JSON.stringify(_studentGroup);

    $.ajax({
        type: "POST",
        url: "/teacher/myclass/SaveClassBegin",
        cache: false,
        data: { classid: classid, groupinfo: groupinfo },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            $("#btn-submit").off("click");

            $.router.load('/teacher/myclass/ClassroomMonitor?classindex=' + data.result + "&classid=" + classid, true);

        }
    });

}

/*扩大checkbox选中范围*/
function bindEventCheck() {
    $(document).on("click", ".content-head,.stu", function () {
        var item = $(this);
        item.find("luicheck[data-name]").trigger("clickbox");


    });
}
