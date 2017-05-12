//后台交互
var stuId = $("#stuId").val();//学生id  stuEditionId
var commJs = require("../lib/util.js");//公共方法
var gradeArr = [{ name: '一年级', id: '1', pid: '' }, { name: '二年级', id: '2', pid: '00' }, { name: '三年级', id: '3', pid: '00' }, { name: '四年级', id: '4', pid: '00_01' }, { name: '五年级', id: '5', pid: '00_01' }, { name: '六年级', id: '6', pid: '00_02' }, { name: '七年级', id: '7', pid: '00_02' }, { name: '八年级', id: '8', pid: '' }, { name: '九年级', id: '9', pid: '00' }, { name: '高一', id: '10', pid: '00' }, { name: '高二', id: '11', pid: '00_01' }, { name: '高三', id: '12', pid: '00_01' }];
var Lui = require('../../LUI/js/lui');
var tool = require('../../LUI/tool');
var lui = new Lui();
//性别按钮
tool.radio();
tool.Sibs($('.tabs span'));
//编辑学生的弹窗
//tool.popshow($('.teacher-grade'), $('#add-grade'));
tool.pophide($('.eg-pop .close'), $('.eg-pop'));
/*年级*/
lui.initDropDownList({ warpid: "drop_grade", width: 130, nameField: 'name', idField: 'id', data: gradeArr });
var pop = require("../lib/popup/popuptip.js");
var tplDataEdu = require("StudentManage/StuEdition.tpl");//教材展示列表模板
var grade = 0;//对应的年级做教材弹框用
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //加载学生修改信息
        GetStuEditData();

    },
    initBtns: function () {
        //todo 绑定事件
        //教材选择框
        $("body").delegate('.teacher-grade', "click", function () {
            
            //对应的学段点击
            // GetEdutionData("X");
            grade=parseInt($("#drop_grade").attr("data-id"));//年级
            if (grade > 9) {

                $("span[data-id='G']").click();

            } else if (grade > 6) {
                $("span[data-id='C']").click();

            } else {
                $("span[data-id='X']").click();
                //GetEdutionData("X");
            }

            $("#add-grade").show();
            $(".pop-mask").show();

        });

        //男选择
        $("body").delegate("#lman", "click", function () {

            $(".radio").removeClass("active");
            $("#sexMan").addClass("active");
        });

        //女选择
        $("body").delegate("#lwman", "click", function () {

            $(".radio").removeClass("active");
            $("#sexWMan").addClass("active");
        });


        //教材更换
        $("body").delegate(".tabs span", "click", function () {

            var stageStr = $(this).attr("data-id");

            if (stageStr == "G") {
                $(".HighSchoolShow").css("display", "none");

            } else {
                $(".HighSchoolShow").css("display", "");

            }
            GetEdutionData(stageStr);
        });
        //当点击的时候进行赋值
        $("body").delegate("span[data-type='1']", "click", function () {

            var dataId = $(this).attr("data-id");//取值然后赋值
            $("#editionName").html($(this).html());
            $("#editionName").attr("data-id", dataId.split('-')[2]);//赋值
            $("#add-grade").hide();
            $(".pop-mask").hide();
        });




        //修改学生的保存操作
        $("body").delegate("#btnEdit,#spanEditBtn", "click", function () {

            var jsonAdd = {};
            jsonAdd.UserId = stuId;
            jsonAdd.UserName = escape($("#txtStuName").val().trim());
            jsonAdd.Gender = 0;
            if ($("#sexMan").hasClass("active")) {
                jsonAdd.Gender = 1;//1为男，0为女
            }
            jsonAdd.Grade = $("#drop_grade").attr("data-id");//年级
           jsonAdd.EditionId = $("#editionName").attr("data-id");//选的教材id
          
           //jsonAdd.EditionId = 0;//学生教材无用
           if (jsonAdd.EditionId == "0" || jsonAdd.EditionId == "") {
               //$("#creatStudentP").css({ "visibility": "visible" }).html("教材不能为空！");
               pop.PopTipShow("教材不能为空!");
               return;
           }

            if (jsonAdd.UserName.length < 1) {
               
                pop.PopTipShow("姓名不能为空!");

                return;
            }

            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/UpdateOrgStuInfo",
                dataType: "json",
                data: {

                    data: JSON.stringify(jsonAdd)
                },
                success: function (data) {
                    if (data) {
                        //alert("修改成功");
                        // GetStuEditData();//重新加载列表
                        window.location.href = "/Org/StudentManage/Index";

                    } else {
                        alert("修改失败");

                    }



                }
            });




        });





        //展示完的确定的删除弹窗
        $("body").delegate("#loginIdBtn", "click", function () {
            $(".eg-pop .close").click();//关闭弹窗
        });




    }


};
//页面加载
$(function (parameters) {
    module.init();
});


//发送请求调取数据
function GetStuEditData() {
    //加载
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetStuDetail",
        dataType: "json",
        data: {
            data: stuId, type: 1//传递学生id,当type为1时不需要加载课程信息
        },
        success: function (data) {


            if (data.Data) {
                $("#stuName").html(data.Data.StuName);
                $("#txtStuName").val(data.Data.StuName);
                $('.radio').removeClass('active');
                if (data.Data.Gender == 1) {

                    $("#sexMan").addClass('active');

                } else {
                    $("#sexWMan").addClass('active');
                }

                $("#drop_grade,#spandrop_grade").attr("title", commJs.numGradeTran(data.Data.GradeId));//年级转换
                $("#spandrop_grade").html(commJs.numGradeTran(data.Data.GradeId));
                $("#drop_grade,#spandrop_grade").attr("data-id", data.Data.GradeId);
                grade = data.Data.GradeId;
                //教材   data.Data.TeachVersion
                $("#editionName").html(data.Data.EditionName);
                $("#editionName").attr("data-id", data.Data.EditionId);//教材版本
                //$("#editionId").val(data.Data.EditionId);


            }
            else {


                alert("获取数据失败");


            }
        }
    });

}

//调用教材数据
function GetEdutionData(obj) {

    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgEdutions",
        dataType: "json",
        data: {
            data: obj
        },
        success: function (data) {


            if (data.Data) {


                var trStr0 = "";
                var trStr1 = "";
                for (var i = 0; i < data.Data[0].OrgStuBooks.length; i++) {

                    if (i === 0) {
                        trStr0 += "<tr>";
                    }
                    if (i % 4 === 0 && i > 0) {
                        trStr0 += "</tr><tr>";
                    }
                    trStr0 += " <td><span  data-type='1' data-id='" + obj + "-0-" + data.Data[0].OrgStuBooks[i].EditionId + "'>" + data.Data[0].OrgStuBooks[i].EditionName + "</span></td>";

                }
                for (var j = 0; j < data.Data[1].OrgStuBooks.length; j++) {

                    if (j === 0) {
                        trStr1 += "<tr>";
                    }
                    if (j % 4 === 0 && j > 0) {
                        trStr1 += "</tr><tr>";
                    }
                    trStr1 += " <td><span data-type='1' data-id='" + obj + "-1-" + data.Data[1].OrgStuBooks[j].EditionId + "'>" + data.Data[1].OrgStuBooks[j].EditionName + "</span></td>";

                }

                if (trStr0.length > 0) {
                    trStr0 += "</tr>";
                }
                if (trStr1.length > 0) {
                    trStr1 += "</tr>";
                }

                $("#lszT").html(trStr0);
                $("#wsT").html(trStr1);

            }
            else {

                alert("没有进行教材数据");


            }
        }
    });

}








