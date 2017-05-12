
var Lui = require('../../LUI/js/lui');
var lui = new Lui();
var arrJxd = [];//校区
var arrGrade = [{ name: '不限学段', id: '0', pid: '' }, { name: '小学', id: 'X', pid: 'X' }, { name: '初中', id: 'C', pid: 'C' }, { name: '高中', id: 'G', pid: 'G' }];//年级初始化;//学段
var arrLesson = [];//课程分类
var arrClass = [];//班级类型
//后台交互
require("../../tpl/template-helpers.js");
var pop = require("../lib/popup/popuptip.js");//提示消息
var loadimg = require("../lib/popup/showloadimg.js");
//var calender = require('../lib/calendar/calender-plugin.js');//日期插件
var calenderMonth = require('../lib/monthcalendar/date.js');//日期插件
//var Paginator = require('../lib/page/Paginator.js');
var commJs = require("../lib/util.js");//公共方法
//var tplTableCz = require("OrgManage/ResiveAnysis.tpl");//储值模板
lui.initDropDownList({ warpid: "dif_grade", width: 80, nameField: 'name', idField: 'id', data: arrGrade, selectedCallBack: loadBackDatas });//学段

var monthStrAddCourse = [];//报课月份
var monthValAddCourse = [];//报课人次
var monthStrExamNum = [];//测评月份
var monthValExamNum = [];//测评人次
//var monthStrExperience = [];//体验课月份
//var monthValExperience = [];//体验课
var timeType = 0;//0累计，1自定义
var begMonthStr = new Date();//从后台读取
var endMonthStr = new Date();//后时间
var userRole = "2";//2为超管,3为老师
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //加载列表
        //GetOrgInfo();

        loadSchools();

    },
    initBtns: function () {
        //todo 绑定事件
        //累计的点击
        $("body").delegate("#addAll", "click", function () {
            timeType = 0;
            $("#closeTime").css("display", "");
            $("#closeShow").css("display", "");//截止不显示
            $("#userChoice").css("display", "none");
            $("#monthShow").css("display", "none");//上月下月显示
            $(".timeChoice").removeClass("active");
            $(this).addClass("active");
            loadBackDatas();//截止当前的

        });

        //自定义的点击
        $("body").delegate("#userDefined", "click", function () {
            timeType = 3;
            $("#userChoice").css("display", "");
            $("#closeTime").css("display", "none");
            $("#closeShow").css("display", "none");//截止不显示
            $("#monthShow").css("display", "none");//上月下月显示
            //calender("#txtEnterTime", { defaultDate: new Date() }, 300);

            $("#txtBegTime").val(begMonthStr);
            $("#txtEndTime").val(endMonthStr);
            $(".monthdate").simpleCanleder(null, UpdateTimeVal);//日期


            $(".timeChoice").removeClass("active");
            $(this).addClass("active");


        });


        //上月
        $("body").delegate("#lastMonth", "click", function () {
            debugger;
            timeType = 1;
            $("#monthShow").html(begMonthStr + " (上月)");
            $("#monthShow").css("display", "");//上月下月显示
            $("#userChoice").css("display", "none");
            $("#closeTime").css("display", "none");
            $("#closeShow").css("display", "none");//截止不显示

            $(".timeChoice").removeClass("active");
            $(this).addClass("active");
            loadBackDatas();//截止当前的


        });
        //本月
        $("body").delegate("#currentMonth", "click", function () {
            timeType = 2;
            $("#monthShow").html(endMonthStr + " (本月)");
            $("#monthShow").css("display", "");//显示本月
            $("#userChoice").css("display", "none");
            $("#closeTime").css("display", "none");
            $("#closeShow").css("display", "none");//截止不显示
            //calender("#txtEnterTime", { defaultDate: new Date() }, 300);


            $(".timeChoice").removeClass("active");
            $(this).addClass("active");
            loadBackDatas();//截止当前的

        });


    }


};

//绑定数据
$(function () {
    module.init();



});
//当自定义时间发生改变
function UpdateTimeVal() {
    //自定义时间发声改变
    loadBackDatas();

}

///获取机构信息
function GetOrgInfo() {

    //加载机构其他信息然后获取列表
    $.ajax({
        type: "post",
        url: "/Org/OrgStatManage/GetOrgStatInfo",
        dataType: "json",
        data: {
            data: ""

        },
        success: function (data) {
            if (data.Data) {

                $("#lblOrgName").html(data.Data.OrgName);
                $("#orgCurrentValue").html(data.Data.CurrentValue);//余额(少于变红)
                $("#lblExperTime").html(data.Data.ExpireTimeStr);
                $("#lblCoType").html(data.Data.CoType);
                $("#lblTeachType").html(data.Data.TeachTypeStr);

                if (data.Data.IsRedOrgMoney == 1) {
                    $("#orgCurrentValue").removeClass("gray_money").addClass("red_money");
                }

                if (data.Data.IsRedExpireTime == 1) {
                    $("#lblExperTime").removeClass("gray_money").addClass("red_money");
                }
                if (data.Data.CoType == "银牌") {
                    $("#imgJY").removeClass("bronze_edal").addClass("silver_medal");
                }

                GetCzData();//调用列表

            }
            else {
                //$("#lblOrgName").html(data.Data.OrgName);
                $("#orgCurrentValue").html(data.Data.CurrentValue);//余额(少于变红)
                //$("#lblExperTime").html(data.Data.ExpireTime);
                //$("#lblCoType").html(data.Data.CoType);
                //$("#lblTeachType").html(data.Data.TeachTypeStr);
                alert("获取数据失败");
            }
        }
    });


}




//加载学校
function loadSchools() {
    //加载学校
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgSchools",
        dataType: "json",
        data: {
            data: ""
        },
        success: function (data) {
            begMonthStr = data.TagValue.split('|')[1];//开始月
            endMonthStr = data.TagValue.split('|')[2];//截止月
            userRole = data.TagValue.split('|')[0];//用户角色
            arrJxd = [];
            arrLesson = [];
            arrClass = [];
            if (data.Data && data.Data.length > 0) {


                if (userRole != "3") {

                    arrJxd.push({
                        name: "不限校区", id: 0, pid: 0
                    });//学校

                } else {
                    $("#drop_jxd").css("display", "none");//校长隐藏校区


                }


                for (var i = 0; i < data.Data.length; i++) {

                    arrJxd.push({ name: data.Data[i].SchoolName, id: data.Data[i].SchoolId, pid: data.Data[i].SchoolId });
                }

                lui.initDropDownList({ warpid: "drop_jxd", width: 100, nameField: 'name', idField: 'id', data: arrJxd, selectedCallBack: loadBackDatas, subtextlength: 6 });//学校和班级的联动
                loadLessonTypes();//加载课程类型

            }
            else {

                //全部赋值暂无
                arrJxd.push({
                    name: "不限校区", id: 0, pid: 0
                });//学校

                arrLesson.push({
                    name: "不限课型", id: 0, pid: 0
                });//学校
                arrClass.push({
                    name: "不限班型", id: 0, pid: 0
                });
                //dif_lesson
                //dif_class


                lui.initDropDownList({ warpid: "drop_jxd", width: 100, nameField: 'name', idField: 'id', data: arrJxd, selectedCallBack: loadBackDatas, subtextlength: 5 });//学校和班级的联动
                lui.initDropDownList({ warpid: "dif_lesson", width: 100, nameField: 'name', idField: 'id', data: arrLesson, selectedCallBack: loadBackDatas, subtextlength: 8 });



                lui.initDropDownList({ warpid: "dif_class", width: 100, nameField: 'name', idField: 'id', data: arrClass, selectedCallBack: loadBackDatas, subtextlength: 8 });//学校和班级的联动
                loadBackDatas();//无记录

            }
        }
    });

}


//加载课程类型
function loadLessonTypes() {
    //加载学校
    $.ajax({
        type: "post",
        url: "/Org/OrgStatManage/GetOrgLessonAndClassType",
        dataType: "json",
        data: {
            type: "8"//课程类型
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {
                arrLesson.push({
                    name: "不限课型", id: 0, pid: 0
                });//学校
                for (var i = 0; i < data.Data.length; i++) {

                    arrLesson.push({ name: data.Data[i].Name, id: data.Data[i].Id, pid: data.Data[i].Id });
                }

                lui.initDropDownList({ warpid: "dif_lesson", width: 100, nameField: 'name', idField: 'id', data: arrLesson, selectedCallBack: loadBackDatas, subtextlength: 6 });

                loadClassTypes();
            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}


//加载班级类型
function loadClassTypes() {
    //加载学校
    $.ajax({
        type: "post",
        url: "/Org/OrgStatManage/GetOrgLessonAndClassType",
        dataType: "json",
        data: {
            type: "1"//根据类型筛选数据
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {
                arrClass.push({
                    name: "不限班型", id: 0, pid: 0
                });//学校
                for (var i = 0; i < data.Data.length; i++) {

                    arrClass.push({ name: data.Data[i].Name, id: data.Data[i].Id, pid: data.Data[i].Id });
                }

                lui.initDropDownList({ warpid: "dif_class", width: 100, nameField: 'name', idField: 'id', data: arrClass, selectedCallBack: loadBackDatas, subtextlength: 6 });//学校和班级的联动

                loadBackDatas();//初始化数据
            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}
//app.title = '多 X 轴示例';




///画echat图
//var backShow = false;
var addCourseShow = true;//报课
var examShow = true;//测评
var addCourseShowZ = false;//报课(柱子图默认隐藏)
var examShowZ = false;//测评
//var tiyanShow = true;
function drawChart() {
    //  var sd = sdata;
    //sd.push({ name: p, value: d[p] });
    var colors = ['#F73E26', '#00A200', '#FBB500', '#333333'];
    var myChart = echarts.init(document.getElementById('drawchart'));

    var option = {
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            //data: ['2015 降水量', '2016 降水量']//横title


            selected: {
                '报课人次': addCourseShow,
                '测评人次': examShow,//控制是否显示
                '报课人次柱子': addCourseShowZ,
                '测评人次柱子': examShowZ

                
            }

        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                name: '月份',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[3]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '退课率' + params.value + '：' + params.seriesData[0].data;
                        }
                    }
                },
                data: monthStrAddCourse //["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]//横坐标
            },
            {
                //横坐标上
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '退课率  ' + params.value + '：' + params.seriesData[0].data;
                        }
                    }
                },
                data: [], //["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
                show: false

            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'人次',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}'
                }
            }
        ],
        series: [
        {
            show: false,//addCourseShow
            name: '报课人次',
            type: 'line',
            //xAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#00A200',//绿色
                    lineStyle: {
                        color: '#00A200'
                    }
                }
            },

            smooth: true,
            tooltip: {

                formatter: "{b}<br/>{a} : {c}"
            },

            data: monthValAddCourse //[0.26, 0.59, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]

        },
            {
                show: examShow,
                name: '测评人次',
                type: 'line',
                tooltip: {

                    formatter: "{b}<br/>{a} : {c}"
                },

                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#FBB500',//黄色
                        lineStyle: {
                            color: '#FBB500'
                        }
                    }
                },

                data: monthValExamNum//[0.39, 0.59, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
            }, {
                show: addCourseShowZ,
                name: '报课人次柱子',
                type: 'bar',
                //xAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#00A200',//绿色
                        lineStyle: {
                            color: '#00A200'
                        }
                    }
                },

                smooth: true,
                tooltip: {

                    formatter: "{b}<br/>报课人次 : {c}"
                },

                data: monthValAddCourse //[0.26, 0.59, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]

            },
            {
                show: examShowZ,
                name: '测评人次柱子',
                type: 'bar',
                tooltip: {

                    formatter: "{b}<br/>测评人次 : {c}"
                },

                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#FBB500',//黄色
                        lineStyle: {
                            color: '#FBB500'
                        }
                    }
                },

                data: monthValExamNum//[0.39, 0.59, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
            }

        ]
    };

    myChart.setOption(option);
}




//加载退课率测评数据数据
function loadBackDatas() {
    var type = timeType;
    var json = {};//查询数据
    json.SchoolId = $("#drop_jxd").attr("data-id");//学校的下拉
    json.StuStage = $("#dif_grade").attr("data-id");//学段
    json.LessonType = $("#dif_lesson").attr("data-id");//课程类型
    json.ClassType = $("#dif_class").attr("data-id");//课程类型

    json.Type = type;
    if (type == 3) {

        json.BeginTime = $("#txtBegTime").val();//时间
        json.EndTime = $("#txtEndTime").val();
        if (json.BeginTime == "" || json.EndTime == "") {
            return;

        }
        debugger;
        //时间判断
        var begTime = new Date(json.BeginTime);
        var endTime = new Date(json.EndTime);

        if (begTime.getTime() > endTime.getTime()) {
            pop.PopTipShow("开始时间不能大于结束时间");
            //alert("开始时间不能大于结束时间");
            return;
        }



    }
    else {
        json.BeginTime = "2017-04";//时间
        json.EndTime = "2017-04";

    }


    $.ajax({
        type: "post",
        url: "/Org/OrgStatManage/GetOrgAddCourseAndExam",
        dataType: "json",
        data: {
            data: JSON.stringify(json)
        },
        success: function (data) {
            debugger;
            if (data.Data) {
                //$("#lbBackRet").html(data.Data.BackRet + "%");

                $("#lbAddCourseNum").html(data.Data.AddCourseNum);//报课
                $("#lbExamNum").html(data.Data.ExamNum);//测评

                $("#closeTime").html(data.TagValue);//截止时间
                monthStrAddCourse = [];
                monthValAddCourse = [];
                monthStrExamNum = [];
                monthValExamNum = [];

                if (data.Data.ListMonth != null) {
                    for (var i = 0; i < data.Data.ListMonth.length; i++) {

                        monthStrAddCourse.push(data.Data.ListMonth[i]);
                        monthValAddCourse.push(data.Data.AddCourseNumData[i].RunVale);
                        monthValExamNum.push(data.Data.ExamNumData[i].RunVale);//报课人次和测评人次


                    }

                } else {
                    addCourseShow = false;
                    examShow = false;
                    //tiyanShow = false;

                }
                debugger;
                if (timeType == 1 || timeType == 2) {//控制隐藏折线
                    addCourseShow = false;
                    examShow = false;
                    addCourseShowZ = true;
                    examShowZ = true;

                } else {
                    addCourseShow = true;
                    examShow = true;

                    addCourseShowZ = false;
                    examShowZ = false;
                    
                }

                drawChart();
            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}




