var Lui = require('../../LUI/js/lui');
var lui = new Lui();
var drop_school;//校区对象
var drop_clsss;//班级对象
var row_data = { StudentID: 0, CValue: 0, Remark: "", CType: 0 };//当前行数据


$("[data-close]").click(function () {
    $('.pop-mask,#coins,#coins-add').hide();
});

$("#edit-num,#add-num").keypress(function () {
    var keynum = event.keyCode;
    if (!(keynum >= 48 && keynum <= 57))//非数字
        return false;
    if ($(this).val().length == 9)//9位数字
        return false;
    if ($(this).val() == "" && keynum == 48)//首位不能为0
        return false;
    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
});

$("#edit-remark,#add-remark").keypress(function () {
    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
});

$("#edit-num,#add-num,#edit-remark,#add-remark").keydown(function () {
    if (event.keyCode == 8) {
        $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
    }
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
                GetClasses(0);
            }
        });
    }
    else if (userRole == 3)//校长
    {
        GetClasses(0);
    }
    getAwardListData();
}

function GetClasses(e1) {
    /*全部班级的下拉*/
    $.ajax({
        type: "post",
        url: "/Org/Classes/GetClassName",
        dataType: "json",
        data: { SchoolID: e1 },
        error: function (e) {
            drop_clsss = lui.initDropDownList({
                warpid: "classAll", width: 100, subtextlength: 10, textField: 'ClassName', valueField: 'ClassID', data: [{ ClassName: '全部班级', ClassID: 0 }]
            });
        },
        success: function (e) {
            drop_clsss = lui.initDropDownList({
                warpid: "classAll", width: 100, subtextlength: 10, textField: 'ClassName', valueField: 'ClassID', data: e, selectedCallBack: GetTableChange
            });
         
            var _schoolID = 0;//校长
            if (drop_school)
                _schoolID = drop_school.getValue().value;//超管
            loadData(_schoolID, 0, 1);//加载表格--学校/班级/页码
        }
    });
}

function GetChange(e1, e2)//控件ID、选中项ID--加载班级
{
    GetClasses(e2);
}

function GetTableChange(e1, e2)//控件ID、e2班级ID--加载表格
{
    var _schoolID = 0;//校长
    if (drop_school)
        _schoolID = drop_school.getValue().value;//超管
    loadData(_schoolID, e2, 1);//加载表格--学校/班级/页码
}

function loadData(e1, e2, e3) {
    $("#pager").html("");
    $("#ctable").children(":first").nextAll().remove();
    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
    $.ajax({
        type: "post",
        url: "/Org/Currency/GetCurrency",
        data: {
            SchoolID: e1, ClassID: e2, PageIndex: e3
        },
        dataType: "json",
        error: function (e) {
        },
        success: function (e) {
            $("#ctable").children(":first").nextAll().remove();
            if (e.Data.length == 0) {
                $("#emptyDataOver").tmpl(null).appendTo("#ctable");
            }
            else {
                $("#curData").tmpl(e.Data).appendTo("#ctable");
            }
            $("#pager").html(e.TagValue);
            //分页事件
            PagerClick();

            //弹出层
            EditClick();
        }
    });
}

function PagerClick() {
    $("#pager a[data-num]").click(function () {
        var _schoolID = 0;//校长
        if (drop_school)
            _schoolID = drop_school.getValue().value;//超管
        var _classID = drop_clsss.getValue().value;
        loadData(_schoolID, _classID, $(this).attr("data-num"));//加载表格--学校/班级/页码
    });
}


//点击修改班级
function EditClick() {
    $("[data-type='edit']").click(function () {

        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
        row_data.StudentID = $(this).attr("data-id")//学生ID
        GetCur(row_data.StudentID, "#edit-cur")//Money       
        $("#edit-num").val("");
        $("#edit-remark").val("");
        $("[data-type='edit-info']").css({ "visibility": "hidden" });
        $('.pop-mask,#coins').show();

    });

    $("[data-type='add']").click(function () {
        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
        row_data.StudentID = $(this).attr("data-id")//学生ID
        GetCur(row_data.StudentID, "#add-cur")//Money
        $("#add-num").val("");
        $("#add-remark").val("");
        $("[data-type='add-info']").css({ "visibility": "hidden" });
        $('.pop-mask,#coins-add').show();
    });
}

function GetCur(e1, e2) {
    $.ajax({
        type: "post",
        url: "/Org/Currency/GetCur",
        dataType: "json",
        data: { StudentID: e1 },
        error: function (e) {

        },
        success: function (e) {
            $(e2).text(e.TagValue);
        }
    });
}

////修改班级
//$("#edit-ok").click(function () {
//    if ($("[data-type='edit-info']").css("visibility") == "visible") {
//        return;
//    }
//    row_data.CType = 5;
//    row_data.CValue = +($("#edit-num").val());
//    row_data.Remark = $.trim($("#edit-remark").val());
//    if (row_data.CValue == 0) {
//        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请输入兑换数量！");
//        return;
//    }
//    if (!(+row_data.CValue > 0 && +row_data.CValue <= +($("#edit-cur").text()))) {
//        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("学币不足！");
//        return;
//    }
//    if (row_data.Remark == "") {
//        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请填写备注");
//        return;
//    }
//    $.ajax({
//        type: "post",
//        url: "/Org/Currency/EditCur",
//        data: { data: JSON.stringify(row_data) },
//        dataType: "json",
//        error: function (e) {
//            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请求失败!");
//        },
//        success: function (e) {
//            if (e.OK) {
//                $('.pop-mask,#coins').hide();
//                var _schoolID = 0;//校长
//                if (drop_school)
//                    _schoolID = drop_school.getValue().value;//超管
//                var _classID = drop_clsss.getValue().value;
//                loadData(_schoolID, _classID, 1);//加载表格--学校/班级/页码
//            }
//            else {
//                $("[data-type='edit-info']").css({ "visibility": "visible" }).text(e.Result);
//            }
//        }
//    });
//});

//添加班级
$("#add-ok").click(function () {
    if ($("[data-type='add-info']").css("visibility") == "visible") {
        return;
    }
    row_data.CType = 4;
    row_data.CValue = +$("#add-num").val();
    row_data.Remark = $.trim($("#add-remark").val());
    if (row_data.CValue == 0) {
        $("[data-type='add-info']").css({ "visibility": "visible" }).text("请输入奖励数量！");
        return;
    }
    if (!(+row_data.CValue > 0 && +row_data.CValue <= 999999999)) {
        $("[data-type='add-info']").css({ "visibility": "visible" }).text("奖励数量过大！");
        return;
    }
    if (row_data.Remark == "") {
        $("[data-type='add-info']").css({ "visibility": "visible" }).text("请填写备注");
        return;
    }
    $.ajax({
        type: "post",
        url: "/Org/Currency/EditCur",
        data: { data: JSON.stringify(row_data) },
        dataType: "json",
        error: function (e) {
            $("[data-type='add-info']").css({ "visibility": "visible" }).text("请求失败！");
        },
        success: function (e) {
            if (e.OK) {
                $('.pop-mask,#coins-add').hide();
                var _schoolID = 0;//校长
                if (drop_school)
                    _schoolID = drop_school.getValue().value;//超管
                var _classID = drop_clsss.getValue().value;
                loadData(_schoolID, _classID, 1);//加载表格--学校/班级/页码
            }
            else {
                $("[data-type='add-info']").css({ "visibility": "visible" }).text(e.Result);
            }
        }
    });
});
var drop_awardlist;
function getAwardListData() {
    $.ajax({
        url: "/Org/Currency/GetAwardList",
        type: "post",
        async: true,
        data: { awardType: 0, schoolID: 0, awardID: 0, pageSize: 1000, pageIndex: 1, awardWays: 1 },
        success: function (data) {
            if (data.OK) {
                result = data.Data;
                result.unshift({ AwardID: -1, AwardName: "请选择奖品" });
                drop_awardlist=  lui.initDropDownList({
                    warpid: "drop_awardlist", width: 240, textField: 'AwardName', valueField: 'AwardID', data: result, subtextlength: 7,
                    selectedCallBack: function (warpid, value, text, json) {
                        var json = JSON.parse(json);
                        var coin = json.CValue;
                        var hcoin=$("#edit-cur").html();
                        if (parseInt(hcoin) < parseInt(coin)) {
                            var h = '需要 ' + coin + ' 个学币，<span style="color:red">无法兑换</span>';
   
                            $("p[data-type='edit-info']").css({ "visibility": "visible" }).html(h);
                        }
                        else {
                            var h = '需要 ' + coin + ' 个学币';
                            $("p[data-type='edit-info']").css({ "visibility": "visible" }).html(h);
                        }
                    }

                });

            }

        },
        error: function () {
        }
    });
}
function showTip(msg, cb) {
    $(".fixed-success").html(msg);
    $(".fixed-success").show();
    setTimeout(function () { $(".fixed-success").hide(); if (cb) { cb(); } }, 1000);
}
//修改班级
$("#edit-ok").click(function () {
 
    row_data.CType = 5;
    var j = drop_awardlist.getSelectedJsonValue();
    var coin = j.CValue;
    var hcoin = $("#edit-cur").html();

    if (parseInt(hcoin) < parseInt(coin)) {
        return;
    }
    row_data.CValue = j.CValue;
    row_data.Remark = j.AwardName;
    row_data.AwardID = j.AwardID;

    $.ajax({
        type: "post",
        url: "/Org/Currency/EditCur",
        data: { data: JSON.stringify(row_data) },
        dataType: "json",
        error: function (e) {
            //$("[data-type='edit-info']").css({ "visibility": "visible" }).html("请求失败!");
        },
        success: function (e) {
            if (e.OK) {
                $('.pop-mask,#coins').hide();
                var _schoolID = 0;//校长
                if (drop_school)
                    _schoolID = drop_school.getValue().value;//超管
                var _classID = drop_clsss.getValue().value;
                showTip("兑换成功<br>消费"+row_data.CValue+"学币",function(){
                    loadData(_schoolID, _classID, 1);//加载表格--学校/班级/页码
                })
                
            }
            else {
                var h = '需要 ' + row_data.CValue + ' 个学币，<span style="color:red">无法兑换</span>';
                $("[data-type='edit-info']").css({ "visibility": "visible" }).html(h);
            }
        }
    });
});

