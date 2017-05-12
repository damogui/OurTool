var Lui = require('../../LUI/js/lui');
var lui = new Lui();
lui.initDropDownList({
    warpid: "dif_school", width: 120, subtextlength: 10, textField: 'SchoolName', valueField: 'SchoolID', data: [{ SchoolName: '全部校区', SchoolID: 0 }]
});


var tool = require('../../LUI/tool');
//var lui = new Lui();
var arrJxd = []; //校区
var resultData;

$(function () {
    var myChart = echarts.init(document.getElementsByClassName('echart_div')[0]);
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgSchools",
        dataType: "json",
        data: {
            data: ""
        },
        success: function (data) {
            debugger;
            if (data.Data && data.Data.length > 0) {
                if (userRole != 2) {
                    $("#dif_school").hide();
                } else {
                    $("#dif_school").show();
                }
                if (userRole == 2) {
                    arrJxd.push({
                        name: "全部校区",
                        id: -1,
                        pid: 0
                    }); //学校
                }

                for (var i = 0; i < data.Data.length; i++) {

                    arrJxd.push({ name: data.Data[i].SchoolName, id: data.Data[i].SchoolId, pid: data.Data[i].SchoolId });
                }

                lui.initDropDownList({ warpid: "dif_school", width: 120, nameField: 'name', idField: 'id', data: arrJxd, selectedCallBack: InitPage, loadedCallBack: InitPage, subtextlength: 10 }); //学校和班级的联动
               

            } else {
                InitPage(0, -1, 0);
            }

        }
    });

    function fomatFloat(src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }

    function InitPage(containId, valueId, title) {
        GetInfo(valueId);
    }

    //function LoadPage(containId, valueId, title) {
    //    GetInfo(valueId);
    //}

    function GetInfo(valueId) {
        $.ajax({
            type: "post",
            url: "/Org/OrgStatManage/GetStudentDraw",
            dataType: "json",
            data: {
                SchoolId: valueId
            },
            success: function (data) {
                resultData = data;
                $("#allstudent").html(data.AllStudent);
                $("#allclass").html(data.AllClass);
                var pingjun = data.AllStudent == 0 ? 0 : fomatFloat(data.AllClass / data.AllStudent, 1);
                var message = data.MoreUserId == 0 ? "" : "，" + data.MoreUserName + "最多报名了" + data.MoreClass + "个课程";
                $("#allmessage").html("平均每个学生报名<span style=\"color:#f62300;line-height: 30px;\">" + pingjun + "</span>个课程" + message);
                SetEChart(1);
            }
        });
    }

    function SetEChart(index) {

        $(".tabs").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        var data1;
        var data2;

        switch (index) {
            case 1:
                $("#student").addClass("active");
                //var allCount = resultData.GradeMessage.HighCount + resultData.GradeMessage.SevNinCount + resultData.GradeMessage.FourSixCount + resultData.GradeMessage.OneThrCount;

                //data1 = ["1-3年级：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.OneThrCount / allCount, 2) * 100 + "%"), "4-6年级：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.FourSixCount / allCount, 2) * 100 + "%"), "7-9年级：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.SevNinCount / allCount, 2) * 100 + "%"), "高中生：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.HighCount / allCount, 2) * 100 + "%")];
                //data2 = [{ value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.OneThrCount / allCount, 2) * 100 + "%"), name: '1-3年级' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.FourSixCount / allCount, 2) * 100 + "%"), name: '4-6年级' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.SevNinCount / allCount, 2) * 100 + "%"), name: '7-9年级' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.HighCount / allCount, 2) * 100 + "%"), name: '高中生' }];
                data2 = [{ value: resultData.GradeMessage.OneThrCount, name: '1-3年级' }, { value: resultData.GradeMessage.FourSixCount, name: '4-6年级' }, { value: resultData.GradeMessage.SevNinCount, name: '7-9年级' }, { value: resultData.GradeMessage.HighCount, name: '高中生' }];

                break;
            case 2:
                $("#coursetype").addClass("active");
                //var allCount = resultData.BookSetMessage.ZeroCount + resultData.BookSetMessage.PeiYou + resultData.BookSetMessage.ChongCi + resultData.GradeMessage.TiGao;

                //data1 = ["零基础类：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.BookSetMessage.ZeroCount / allCount, 2) * 100 + "%"), "同步培优类：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.BookSetMessage.PeiYou / allCount, 2) * 100 + "%"), "大高冲刺类：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.BookSetMessage.ChongCi / allCount, 2) * 100 + "%"), "补差提高类：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.TiGao / allCount, 2) * 100 + "%")];
                //data2 = [{ value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.BookSetMessage.ZeroCount / allCount, 2) * 100 + "%"), name: '零基础类' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.BookSetMessage.PeiYou / allCount, 2) * 100 + "%"), name: '同步培优类' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.BookSetMessage.ChongCi / allCount, 2) * 100 + "%"), name: '大高冲刺类' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.GradeMessage.TiGao / allCount, 2) * 100 + "%"), name: '补差提高类' }];

                data2 = [{ value: resultData.BookSetMessage.ZeroCount, name: '零基础入门类' }, { value: resultData.BookSetMessage.PeiYou, name: '同步培优类' }, { value: resultData.BookSetMessage.ChongCi, name: '大考冲刺类' }, { value: resultData.BookSetMessage.TiGao, name: '补差提高类' }];


                break;
            case 3:
                $("#classtype").addClass("active");
                // var allCount = resultData.ClassTypeMessage.Night + resultData.ClassTypeMessage.Week + resultData.ClassTypeMessage.Cool + resultData.ClassTypeMessage.Hot + resultData.ClassTypeMessage.Country + resultData.ClassTypeMessage.Other;

                //data1 = ["晚班：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Night / allCount, 2) * 100 + "%"), "周末班：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Week / allCount, 2) * 100 + "%"), "寒假班：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Cool / allCount, 2) * 100 + "%"), "暑假班：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Hot / allCount, 2) * 100 + "%"), "国庆班：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Country / allCount, 2) * 100 + "%"), "其他：" + ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Other / allCount, 2) * 100 + "%")];

                //data2 = [{ value: (((allCount == 0 || isNaN(allCount)) || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Night / allCount, 2) * 100 + "%"), name: '晚班' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Week / allCount, 2) * 100 + "%"), name: '周末班' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Cool / allCount, 2) * 100 + "%"), name: '寒假班' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Hot / allCount, 2) * 100 + "%"), name: '暑假班' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Country / allCount, 2) * 100 + "%"), name: '国庆班' }, { value: ((allCount == 0 || isNaN(allCount)) ? "0%" : fomatFloat(resultData.ClassTypeMessage.Other / allCount, 2) * 100 + "%"), name: '其他' }];

                data2 = [{ value: resultData.ClassTypeMessage.Night, name: '晚班' }, { value: resultData.ClassTypeMessage.Week, name: '周末班' }, { value: resultData.ClassTypeMessage.Cool, name: '寒假班' }, { value: resultData.ClassTypeMessage.Hot, name: '暑假班' }, { value: resultData.ClassTypeMessage.Country, name: '国庆班' }, { value: resultData.ClassTypeMessage.Other, name: '其它班' }];

                break;
        }
        

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            series: [
                {
                    name: '数据来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    label: {
                        normal: {
                            show: true,
                            formatter:"{b}({d}%)"
                        },
                        emphasis: {
                            show:true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show:true
                        }
                    },
                    data: data2,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        myChart.setOption(option);
    }

    $("#student").click(function () {
        SetEChart(1);
    });
    $("#classtype").click(function () {
        SetEChart(3);
    });
    $("#coursetype").click(function () {
        SetEChart(2);
    });
});