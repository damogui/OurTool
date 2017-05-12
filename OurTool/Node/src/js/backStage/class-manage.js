var Lui = require('../../LUI/js/lui');
var lui = new Lui();
var tool = require('../../LUI/tool');

tool.pophide($("[data-close]"), $('#editMesg,#addMesg,#student'));

var drop_school;//校区对象
var drop_teacher;//老师对象
var drop_time;//授课时间对象
var row_data = { ClassID: 0, ClassName: "", ClassType: 0, TeacherID: 0, DefaultNumber: 0 };//当前行数据

$("#edit-num,#add-num").keypress(function () {
    var keynum = event.keyCode;
    if (!(keynum >= 48 && keynum <= 57))//非数字
        return false;
    if ($(this).val().length == 3)//3位数字
        return false;
    if ($(this).val() == "" && keynum == 48)//首位不能为0
        return false;
    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
});

$("#edit-name,#add-name").keypress(function () {
    var keynum = event.keyCode;
    if (keynum == 32)
        return false;
    if ($(this).val().length == 25)//25位
        return false;
    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
});

$("#edit-name,#add-name,#edit-num,#add-num").keydown(function () {
    if (event.keyCode == 8) {
        $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
    }
});

$("#edit-name,#add-name").keyup(function () {
    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
});

//修改班级
$("#edit-ok").click(function () {
    if ($("[data-type='edit-info']").css("visibility") == "visible") {
        return;
    }
    row_data.TeacherID = drop_teacher.getValue().value;
    row_data.ClassType = drop_time.getValue().value;
    row_data.ClassName = $("#edit-name").val();
    row_data.DefaultNumber = $("#edit-num").val();
    if (+row_data.TeacherID < 1) {
        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请选择老师！");
        return;
    }
    if ($.trim(row_data.ClassName).length == 0) {
        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("班级不能为空！");
        return;
    }
    if (!(+row_data.DefaultNumber > 0 && +row_data.DefaultNumber < 1000)) {
        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请正确填写班级数量！");
        return;
    }
    $.ajax({
        type: "post",
        url: "/Org/Classes/EditClasses",
        data: { data: JSON.stringify(row_data) },
        dataType: "json",
        error: function (e) {
            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请求失败!");
        },
        success: function (e) {
            if (e.OK) {
                $('.pop-mask,#editMesg').hide();
                var _schoolID = 0;//校长
                if (drop_school)
                    _schoolID = drop_school.getValue().value;//超管
                GetSchool(_schoolID, 1);//加载表格
            }
            else {
                $("[data-type='edit-info']").css({ "visibility": "visible" }).text(e.Result);
            }
        }
    });
});

//添加班级
$("#add-ok").click(function () {
    if ($("[data-type='add-info']").css("visibility") == "visible") {
        return;
    }
    row_data.TeacherID = drop_teacher.getValue().value;
    row_data.ClassType = drop_time.getValue().value;
    row_data.ClassName = $("#add-name").val();
    row_data.DefaultNumber = $("#add-num").val();
    if (+row_data.TeacherID < 1) {
        $("[data-type='add-info']").css({ "visibility": "visible" }).text("请选择老师！");
        return;
    }
    if ($.trim(row_data.ClassName).length == 0) {
        $("[data-type='add-info']").css({ "visibility": "visible" }).text("班级不能为空！");
        return;
    }
    if (!(+row_data.DefaultNumber > 0 && +row_data.DefaultNumber < 1000)) {
        $("[data-type='add-info']").css({ "visibility": "visible" }).text("请正确填写班级数量！");
        return;
    }
    $.ajax({
        type: "post",
        url: "/Org/Classes/AddClasses",
        data: { data: JSON.stringify(row_data) },
        dataType: "json",
        error: function (e) {
            $("[data-type='add-info']").css({ "visibility": "visible" }).text("请求失败！");
        },
        success: function (e) {
            if (e.OK) {
                $('.pop-mask,#addMesg').hide();
                GetSchool(0, 1);//加载表格
            }
            else {
                $("[data-type='add-info']").css({ "visibility": "visible" }).text(e.Result);
            }
        }
    });
});

initData();

//初始化数据
function initData() {
    if (userRole == 2)//超管
    {
        /*全部校区的下拉*/
        $.ajax({
            type: "post",
            url: "/Org/School/GetSchool",
            dataType: "json",
            error: function (e) {
                drop_school = lui.initDropDownList({
                    warpid: "schoolAll", width: 170, subtextlength: 10, textField: 'SchoolName', valueField: 'SchoolID', data: [{ SchoolName: '全部校区', SchoolID: 0 }]
                });
            },
            success: function (e) {
                drop_school = lui.initDropDownList({
                    warpid: "schoolAll", width: 170, subtextlength: 10, textField: 'SchoolName', valueField: 'SchoolID', data: e.Data, selectedCallBack: GetChange
                });
                GetSchool(0, 1);
            }
        });
    }
    else if (userRole == 3)//校长
    {
        tool.popshow($("[data-type='add']"), $('#addMesg'));//添加班级弹出层觖发事件
        AddClick();//添加弹出层
        GetSchool(0, 1);//加载表格
    }
}

function GetSchool(e1, e2)//学校ID、页码
{
    $("#pager").html("");
    $("#ctable").children(":first").nextAll().remove();
    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
    $.ajax({
        type: "post",
        url: "/Org/Classes/GetClasses",
        data: {
            SchoolID: e1, PageIndex: e2
        },
        dataType: "json",
        error: function (e) {
        },
        success: function (e) {
            $("#ctable").children(":first").nextAll().remove();
            if (e.Data == null || e.Data.length == 0) {
                $("#emptyDataOver").tmpl(null).appendTo("#ctable");
            }
            else {
                $("#classData").tmpl(e.Data).appendTo("#ctable");
            }
            $("#pager").html(e.TagValue);
            tool.popshow($("[data-type='edit']"), $('#editMesg'));
            //分页事件
            PagerClick();
            //修改事件
            EditClick();
            //查看人数事件
            ViewInfo();
        }
    });
}

function ViewInfo() {
    $("[data-type='view-info']").click(function () {
        var _classID = $(this).attr("data-id");
        $('.pop-mask,#student').show();
        GetStudent(_classID);
    });
}

function PagerClick() {
    $("#pager a[data-num]").click(function () {
        var _schoolID = 0;//校长
        if (drop_school)
            _schoolID = drop_school.getValue().value;//超管
        GetSchool(_schoolID, $(this).attr("data-num"));//加载表格
    });
}

function GetChange(e1, e2)//控件ID、选中项ID
{
    GetSchool(e2, 1);
}

//点击添加班级
function AddClick() {
    $("[data-type='add']").click(function () {
        $("#add-name").val("");
        $("#add-num").val("");
        $.ajax({
            type: "post",
            url: "/Org/Classes/GetDic",
            data: {
                DicType: 1
            },
            dataType: "json",
            error: function (e) {
            },
            success: function (e) {
                drop_time = lui.initDropDownList({
                    warpid: "drop_time_add", width: 260, subtextlength: 10, textField: 'DicValue', valueField: 'DicKey', data: e.Data
                });
                GetTeachersAdd();
            }
        });

    });
}

//点击修改班级
function EditClick() {
    $("[data-type='edit']").click(function () {
        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
        row_data.ClassID = $(this).attr("data-id")//班级ID
        row_data.ClassName = $r.children("[data-index=1]").attr("data-value");//班级名称
        row_data.ClassType = $r.children("[data-index=2]").attr("data-value");//班级类型
        row_data.TeacherID = $r.children("[data-index=3]").attr("data-value");//老师
        row_data.DefaultNumber = $r.children("[data-index=4]").attr("data-value");//班级默认人数
        //
        $("#edit-name").val(row_data.ClassName);
        $("#edit-num").val(row_data.DefaultNumber);
        //
        $.ajax({
            type: "post",
            url: "/Org/Classes/GetDic",
            data: {
                DicType: 1
            },
            dataType: "json",
            error: function (e) {
            },
            success: function (e) {
                drop_time = lui.initDropDownList({
                    warpid: "drop_time", width: 260, subtextlength: 10, textField: 'DicValue', valueField: 'DicKey', data: e.Data
                });
                drop_time.setValue(row_data.ClassType);
                GetTeachers();
            }
        });
    });
}

//加载老师数据
function GetTeachers() {
    $.ajax({
        type: "post",
        url: "/Org/Classes/GetTeachers",
        dataType: "json",
        error: function (e) {
        },
        success: function (e) {
            drop_teacher = lui.initDropDownList({
                warpid: "drop_teacher", width: 260, subtextlength: 10, textField: 'UserName', valueField: 'UserID', data: e.Data
            });
            drop_teacher.setValue(row_data.TeacherID);
        }
    });
}

//加载老师数据
function GetTeachersAdd() {
    $.ajax({
        type: "post",
        url: "/Org/Classes/GetTeachers",
        dataType: "json",
        error: function (e) {
        },
        success: function (e) {
            drop_teacher = lui.initDropDownList({
                warpid: "drop_teacher_add", width: 260, subtextlength: 10, textField: 'UserName', valueField: 'UserID', data: e.Data
            });
        }
    });
}

//加载学生数据
function GetStudent(e1) {
    $("#viewDataHtml").html("");
    $("#emptyViewDataBefore").tmpl(null).appendTo("#viewDataHtml");
    $.ajax({
        type: "post",
        url: "/Org/Classes/GetStuents",
        data: { ClassID: e1 },
        dataType: "json",
        error: function (e) {
        },
        success: function (e) {
            if (e.OK) {
                $("#viewDataHtml").html("");
                if (e.Data.length == 0) {
                    $("#emptyViewDataOver").tmpl(null).appendTo("#viewDataHtml");
                }
                else {
                    $("#viewData").tmpl(e).appendTo("#viewDataHtml");
                    var divhtml = $("#viewDataHtml").html();
                    var reg = /<td data-id="a"><\/td>(.*?)<td data-id="b"><\/td>/gi;
                    var newhtml = divhtml.replace(reg, "<tr>$1</tr>");
                    $("#viewDataHtml").html(newhtml);
                }
            }
        }
    });
}
