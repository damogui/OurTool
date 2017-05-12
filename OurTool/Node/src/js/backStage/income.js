var util = require("../lib/util");
var tool = require('../../LUI/tool');
var Lui = require("../../LUI/js/lui");
var calender = require('../lib/calendar/calender-plugin.js');

Date.prototype.toCustomLongString = function (obj) {
    return this.toCustomRegString("yyyy-MM-dd HH:mm:ss");
    //console.log(obj); return this.getFullYear().toString() + "-" + (this.getMonth() + 1).toString() + "-" + this.getDate().toString() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
}
Date.prototype.toCustomString = function (obj) {
    return this.toCustomRegString("yyyy-MM-dd");
    //console.log(obj); return this.getFullYear().toString() + "-" + (this.getMonth() + 1).toString() + "-" + this.getDate().toString();
}
Date.prototype.toCustomMonthString = function (obj) {
    return this.toCustomRegString("yyyy-MM");
    //console.log(obj); return this.getFullYear().toString() + "-" + (this.getMonth() + 1).toString();
}
Date.prototype.toMonthDayString = function (obj) {
    return this.toCustomRegString("MM-dd");
    //console.log(obj); return (this.getMonth() + 1).toString() + this.getDate();
}
var income = {
    oqueryobj: function () {
        return { AnlysisType: 1, TimeType: 1, StartTime: new Date().toCustomString(), EndTime: new Date().toCustomString(), SchoolId: -1 };
    },
    queryobj: { AnlysisType: 1, TimeType: 1, StartTime: new Date().toCustomString(), EndTime: new Date().toCustomString(), SchoolId: -1 },
    getData: function () {

        var para = this.queryobj;
        this.StartTime = para.StartTime;
        this.EndTime = para.EndTime;
        var ithis = this;
        //ithis.initDrawData();
        $.ajax({
            url: "/Org/OrgStatManage/GetIncomingAnlyze",
            type: "post",
            content: "json",
            data: para,
            success: function (result) {
                //console.log(result);
                if (result.OK && result.Code == "11-001") {
                    if (result.Data && result.Data.Data) {
                        var d = result.Data.Data;
                        var sd = [];
                        for (p in d) {
                            sd.push({ name: p, value: d[p] });
                        }
                        //console.log(sd);
                        ithis.OrgCreateTime = result.Data.OrgCreateTime;
                        ////异步执行
                        //setTimeout(ithis.drawData(result.Data), 0);
                        //setTimeout(ithis.drawChart(sd), 0);
                        //异步执行
                        ithis.drawData(result.Data);
                        ithis.drawChart(sd);
                    }
                }

            },
            error: function (err) {
                console.log(err.message);
            }

        })

    },
    init: function () {
        var ithis = this;
        ithis.bindEvent();
        var lui = new Lui();
        var tlist = [
        { name: '按不同校区分析', id: '1' },
        { name: '按课程类型分析', id: '2' },
        { name: '按开班类型分析', id: '3' },
        { name: '按学段年级分析', id: '4' },
        ];
        lui.initDropDownList({
            warpid: "drop-type", width: 125, nameField: 'name', idField: 'id', data: tlist,subtextlength:7,
            selectedCallBack: function (warpid, value, text) {
                ithis.queryobj.AnlysisType = value;
                if (value.toString() != "1") {
                    loadSchools();
                }
                else {
                    $("#drop-school").hide();
                    ithis.queryobj.SchoolId = -1;
                    ithis.initDrawData();
                    ithis.getData();
                }
            },
            loadedCallBack: function (warpid, value, text) {
                ithis.queryobj.AnlysisType = value;
                if (value.toString() != "1") {
                    loadSchools();
                }
                else {
                    $("#drop-school").hide();
                    ithis.queryobj.SchoolId = -1;
                    ithis.initDrawData();
                    ithis.getData();
                }
            }
        });

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
                    $("#drop-school").show();
                    var arrJxd = [];
                    //if (data.Data && data.Data.length > 0) {
                        arrJxd.push({
                            name: "不限校区", id: -1
                        });//学校
                        for (var i = 0; i < data.Data.length; i++) {

                            arrJxd.push({ name: data.Data[i].SchoolName, id: data.Data[i].SchoolId });
                        }
                        lui.initDropDownList({
                            warpid: "drop-school", width: 125, nameField: 'name', idField: 'id', data: arrJxd, subtextlength: 7,
                            selectedCallBack: function (warpid, value, text) {
                                ithis.initDrawData();
                                ithis.queryobj.SchoolId = value;
                                ithis.SchoolName = text;
                                ithis.getData();
                            },
                            loadedCallBack: function (warpid, value, text) {
                                ithis.initDrawData();
                                ithis.queryobj.SchoolId = value;
                                ithis.SchoolName = text;
                                ithis.getData();

                            }
                        });
                    //}

                },
                error: function (err) {
                    console.log(err);
                }
            });

        }
        //lui.initDropDownList({ warpid: "drop-school", width: 200, nameField: 'name', idField: 'id', data: {} });
    },
    drawData: function (data) {
        var ithis = this;
        document.getElementById('tmoney').innerHTML =util.splitNumber(data.TotalCurrency);
        var createday = util.getZeroDay(new Date(data.OrgCreateTime));
        var now = util.getZeroDay(new Date());
        //ithis.initDrawData();
        switch (parseInt(ithis.queryobj.TimeType)) {
            case 1:
                document.getElementById('time-show').innerHTML = "截止：" + now.toCustomString();
                break;
            case 2:
                $("#time-show-warp").addClass("choose-date");
                var ct = util.getZeroDay(new Date(data.StartTime));
                var html = data.StartTime;

                if (createday < ct) {
                    ithis.showLeftArrow(util.getYesterday(data.StartTime), util.getYesterday(data.EndTime));
                }

                if (ct < now) {
                    ithis.showRightArrow(util.getTomorrowday(data.StartTime), util.getTomorrowday(data.EndTime));
                }
                //判断是否是今天 昨天
                if (now.getTime() == ct.getTime()) {
                    html += "（今天）";
                }
                else if (util.getYesterday(now).getTime() == ct.getTime()) {
                    html += "（昨天）";
                }
                document.getElementById('time-show').innerHTML = html;
                break;
            case 3:
                $("#time-show-warp").addClass("choose-date");
                var ct = new Date(data.StartTime);
                var et = new Date(data.EndTime);
                var pweek = util.getPrevWeek(ct);
                var nweek = util.getNextWeek(ct);
                //上周
                var lweek = util.getPrevWeek(now);
                //判断出哪个箭头
                if (ct > createday) {
                    ithis.showLeftArrow(pweek.firstday, pweek.lastday);
                }
                if (et < now) {
                    ithis.showRightArrow(nweek.firstday, nweek.lastday);
                }

                var html = "";

                //若周一早于创建时间，以创建时间开始
                ct = ct < createday ? createday : ct;
                //若周日大于今天，以今天为准
                et = et > now ? now : et
                html += ct.toMonthDayString() + "至" + et.toMonthDayString();

                //本周 判断是否是本周 上周
                var md = util.getWeekDay(now, 1);
                var sd = util.getWeekDay(now, 7);
                if (md.getTime() <= ct.getTime() && ct.getTime() <= sd.getTime()) {
                    html += "（本周）";
                }
                else if (lweek.firstday.getTime() <= ct.getTime() && ct.getTime() <= lweek.lastday.getTime()) {
                    html += "（上周）";
                }
                document.getElementById('time-show').innerHTML = html;


                break;
            case 4:
                $("#time-show-warp").addClass("choose-date");
                var ct = new Date(data.StartTime);
                var et = new Date(data.EndTime);
                var pmonth = util.getPrevMonth(ct);
                var nmonth = util.getNextMonth(ct);
                var lmonth = util.getPrevMonth(now);
                //判断出哪个箭头
                if (ct.getTime() > createday.getTime()) {
                    ithis.showLeftArrow(pmonth.firstday, pmonth.lastday);
                }
                if (et.getTime() < now.getTime()) {
                    ithis.showRightArrow(nmonth.firstday, nmonth.lastday);
                }

                var html = "";

                //若本月第一天早于创建时间，以创建时间开始
                ct = ct.getTime() < createday.getTime() ? createday : ct;
                //若本月最后一天大于今天，以今天为准
                et = et.getTime() > now.getTime() ? now : et
                //html += ct.toCustomString() + "至" + et.toCustomString();
                html += ct.toCustomMonthString();

                //本周 判断是否是本月 上月
                var md = util.getMonthOneDay(now);
                var sd = util.getMonthLastDay(now);
                if (md.getTime() <= ct.getTime() && ct.getTime() <= sd.getTime()) {
                    html += "（本月）";
                }
                else if (lmonth.firstday.getTime() <= ct.getTime() && ct.getTime() <= lmonth.lastday.getTime()) {
                    html += "（上月）";
                }
                document.getElementById('time-show').innerHTML = html;


                break;
            case 5:
                $("#time-show-warp").addClass("choose-date");
                var ct = new Date(data.StartTime);
                var et = new Date(data.EndTime);
                var pyear = util.getPrevYear(ct);
                var nyear = util.getNextYear(ct);
                var lyear = util.getPrevYear(now);
                //判断出哪个箭头
                if (ct.getTime() > createday.getTime()) {
                    ithis.showLeftArrow(pyear.firstday, pyear.lastday);
                }
                if (et.getTime() < now.getTime()) {
                    ithis.showRightArrow(nyear.firstday, nyear.lastday);
                }

                var html = "";

                //若本年第一天早于创建时间，以创建时间开始
                ct = ct.getTime() < createday.getTime() ? createday : ct;
                //若本年最后一天大于今天，以今天为准
                et = et.getTime() > now.getTime() ? now : et
                //html += ct.toCustomString() + "至" + et.toCustomString();
                html += ct.getFullYear();

                //本周 判断是否是本月 上月
                var md = util.getYearOneDay(now);
                var sd = util.getYearLastDay(now);
                if (md.getTime() <= ct.getTime() && ct.getTime() <= sd.getTime()) {
                    html += "（今年）";
                }
                else if (lyear.firstday.getTime() <= ct.getTime() && ct.getTime() <= lyear.lastday.getTime()) {
                    html += "（去年）";
                }
                document.getElementById('time-show').innerHTML = html;


                break;
            case 6:
                //var ct = new Date(data.StartTime);
                //var et = new Date(data.EndTime);

                break;
        }

        var h = "";
        switch (parseInt(ithis.queryobj.AnlysisType)) {
            case 1:
                h = "不同校区的纯利润占比图";
                document.getElementById("chart-title").innerHTML = "不同校区的纯利润占比图";
                break;
            case 2:
                var h = "不同课程类型的纯利润占比图";
                break;
            case 3:
                var h = "不同班型的纯利润占比图";
                break;
            case 4:
                var h = "不同学段年级的纯利润占比图";
                break;
        }
        if (ithis.queryobj.SchoolId && ithis.queryobj.SchoolId != -1) { h = ithis.SchoolName + "：" + h; }
        document.getElementById("chart-title").innerHTML = h;

    },
    drawChart: function (sdata) {

        var myChart = echarts.init(document.getElementById('drawchart'));
        var option = {
            title: {
                text: '',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                //formatter: "{a} <br/>{b} : {c} ({d}%)"
                formatter: "{b} : {c} ({d}%)"
            },
            //legend: {
            //    orient: 'vertical',
            //    left: 'left',
            //    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            //},
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            formatter: "{b}({d}%)"
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: sdata,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
            , color: ["#009cff", "#00ffea", "#12ff00", "#baff00", "#ffe400", "#ff8a00", "#ff0000", "#d800ff", "#001eff"]
        };
        ;
        myChart.setOption(option);
    },
    bindEvent: function () {
        var ithis = this;
        $(".right-content").on("click", 'span[data-type="time-op"]', function () {
            $(this).addClass("active").siblings().removeClass("active");
            var ctype = this.getAttribute("data-bind");
            //ithis.queryobj = ithis.oqueryobj();
            ithis.queryobj.TimeType = ctype;
            var obj = {};
            var d = new Date();
            ithis.initDrawData();
           
            switch (parseInt(ctype)) {
                case 1://累计

                    break;
                case 2://日
                    ithis.queryobj.StartTime = d.toCustomString();
                    ithis.queryobj.EndTime = d.toCustomString();
                    break;
                case 3://周
                    ithis.queryobj.StartTime = util.getWeekDay(d, 1).toCustomString();
                    ithis.queryobj.EndTime = util.getWeekDay(d, 7).toCustomString();

                    break;
                case 4://月
                    ithis.queryobj.StartTime = util.getMonthOneDay(d).toCustomString();
                    ithis.queryobj.EndTime = util.getMonthLastDay(d).toCustomString();
                    break;
                case 5://年
                    ithis.queryobj.StartTime = util.getYearOneDay(d).toCustomString();
                    ithis.queryobj.EndTime = util.getYearLastDay(d).toCustomString();
                    break;
                case 6://累计
                    //$('#time-input-warp').show();
                    ithis.initzdyData();
                    break;
            }
            if (ctype != 6) {
                ithis.getData(obj);
            }

        });
        //$(".right-content").on("change", '.calender-input', function () {
        //    ithis.initDrawData();
        //    var stime = $("#stime-input").val();
        //    var etime = $("#etime-input").val();
        //    //calender("#stime-input", calenderConfig, 300);
        //    if (stime && etime) {
        //        ithis.queryobj.StartTime = stime;
        //        ithis.queryobj.EndTime = etime;
        //        ithis.getData(obj);
        //    }
        //});
        $(".right-content").on("click", '.left-arrow,.right-arrow', function () {
            ithis.initDrawData();
            var ctype = ithis.queryobj.TimeType;
            var stime = $(this).attr("data-startTime");
            var etime = $(this).attr("data-endTime");
            ithis.queryobj.StartTime = stime;
            ithis.queryobj.EndTime = etime;
            ithis.getData();
   
        });
    },
    showLeftArrow: function (stime, etime) {

        $(".left-arrow").attr("data-startTime", stime.toCustomLongString());
        $(".left-arrow").attr("data-endTime", etime.toCustomLongString());
        //$(".left-arrow").show();
        $(".left-arrow").css({"visibility":"visible"});
    },
    showRightArrow: function (stime, etime) {
        $(".right-arrow").attr("data-startTime", stime.toCustomLongString());
        $(".right-arrow").attr("data-endTime", etime.toCustomLongString());
        //$(".right-arrow").show();
        $(".right-arrow").css({ "visibility": "visible" });
    },
    initDrawData: function () {
        var ithis = this;
        if (ithis.queryobj.TimeType == 1 || ithis.queryobj.TimeType == 6){
            $("#time-show-warp").removeClass("choose-date");
        }
        //$(".left-arrow").hide();
        //$(".right-arrow").hide();
        $(".left-arrow").css({ "visibility": "hidden" });
        $(".right-arrow").css({ "visibility": "hidden" });
        if (ithis.queryobj.TimeType != 6) {
            $("#time-show-warp").show();
            $("#time-input-warp").hide();
        }
        else {
            $("#time-show-warp").hide();
            $("#time-input-warp").show();
            $("#drawchart").html("");
           
        }

    },
    initzdyData: function () {
        var ithis = this;
        if(ithis.queryobj.TimeType==6){
            var calenderConfig = {
                maxDate: new Date(),
                defaultDate: new Date(),
                onChange: function (obj, val) {
                    var stime = $("#stime-input").val();
                    var etime = $("#etime-input").val();
                    if (stime) {
                        calenderConfig.maxDate = new Date();
                        calenderConfig.minDate = new Date(stime);
                        if (etime) {
                            calenderConfig.defaultDate = new Date(etime);
                        }
                        calender("#etime-input", calenderConfig);
                    }
                    if (etime) {
                        if (ithis.OrgCreateTime) {
                            calenderConfig.minDate = new Date(ithis.OrgCreateTime);
                        }
                        calenderConfig.maxDate = new Date(etime);
                        if (stime) {
                            calenderConfig.defaultDate = new Date(stime);
                        }
                        calender("#stime-input", calenderConfig)
                    }
                    if (stime && etime) {
                        ithis.queryobj.StartTime = stime;
                        ithis.queryobj.EndTime = etime;
                        ithis.getData();
                    }
                    //this.close();
                }
            };
            if (ithis.OrgCreateTime) {
                calenderConfig.minDate = new Date(ithis.OrgCreateTime);
                calenderConfig.defaultDate = new Date(ithis.OrgCreateTime);
                calender("#stime-input", calenderConfig);
            }
            calenderConfig.defaultDate = new Date();
            calender("#etime-input", calenderConfig);
            var stime = $("#stime-input").val();
            var etime = $("#etime-input").val();
            if (stime && etime) {
                ithis.queryobj.StartTime = stime;
                ithis.queryobj.EndTime = etime;
                ithis.getData();
            }
        }
    }

}
$(function () {
    income.init();
})