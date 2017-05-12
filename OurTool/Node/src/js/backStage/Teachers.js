var Lui = require('../../LUI/js/lui');
var lui = new Lui();


var schoolid = 0;

$(function () {

    GetSchoolsInfo();
});


/*获取学校信息*/
function GetSchoolsInfo() {


    $.ajax({
        type: "get",
        url: "/org/OrgStatManage/GetSchoolsInfo",
        cache: false,
        data: {},
        dataType: "JSON",
        success: function (data) {
           
            var list = data.result;
            var roleid = data.roleid;

            if (roleid == 2) {

                list.unshift({ SchoolId: 0, SchoolName: "全部校区" });

                lui.initDropDownList({
                    warpid: "dif_school", width: 120, subtextlength: 7, textField: 'SchoolName', valueField: 'SchoolId', data: list, loadedCallBack: MySelectedCallBack, selectedCallBack: MySelectedCallBack
                });

                $("#dif_school").show();
            }
            else {
                GetTeacherStatisticsInfo();
            }

        }
    });
}
function MySelectedCallBack(id, selectedvalue, alltitle) {

    schoolid = selectedvalue;

    GetTeacherStatisticsInfo();

}

/*获取老师画像信息*/
function GetTeacherStatisticsInfo() {


    $.ajax({
        type: "get",
        url: "/org/OrgStatManage/GetTeacherStatisticsInfo",
        cache: false,
        data: {
            schoolid: schoolid
        },
        dataType: "JSON",
        success: function (data) {

            var m = data.result;

            $("#teachercount_v").html(m.teachercount);
            $("#maxclass_v").html(m.maxclass);
            $("#avgclass_v").html(m.avgclass);
            $("#maxstudent_v").html(m.maxstudent);
            $("#avgstudent_v").html(m.avgstudent);
            $("#datetimenow_v").html(m.datetimenow);
        }
    });
}




