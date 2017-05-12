
//后台交互
//发送请求调取数据绑定下拉框
var arrJxd = [];//校区
var arrBj = [];//班级
var arrTbk = [];//同步课
var arrEdutions = [];//教材列表
var tplTableStu = require("StudentManage/StudentManageList.tpl");//学生列表
var stuGrade = 0;//年级
var stuId = 0;//学生id
var stuEditionId;//学生id
require("../../tpl/template-helpers.js");
var pop = require("../lib/popup/popuptip.js");
var loadimg = require("../lib/popup/showloadimg.js");
var Paginator = require('../lib/page/Paginator.js');
var commJs = require("../lib/util.js");//公共方法
var gradeArr = [{ name: '一年级', id: '1', pid: '' }, { name: '二年级', id: '2', pid: '00' }, { name: '三年级', id: '3', pid: '00' }, { name: '四年级', id: '4', pid: '00_01' }, { name: '五年级', id: '5', pid: '00_01' }, { name: '六年级', id: '6', pid: '00_02' }, { name: '七年级', id: '7', pid: '00_02' }, { name: '八年级', id: '8', pid: '' }, { name: '九年级', id: '9', pid: '00' }, { name: '高一', id: '10', pid: '00' }, { name: '高二', id: '11', pid: '00_01' }, { name: '高三', id: '12', pid: '00_01' }];//年级初始化

var isSel = 0;//0表示没加载下拉1表示加载（学校）
//var isSelBj = 0;//0表示没加载下拉班级1表示加载
var arrTjr = [];//推荐人，老师
var isLoadTeach = 0;//是否加载推荐人0没加，1加
var userRole = "2";//2为超管,3为老师
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //加载列表
        GetStuData();
        

    },
    initBtns: function () {
        //todo 绑定事件
        //搜索
        $("body").delegate("#searchImg", "click", function () {
            GetStuData(1);

        });

        //添加学生
        $("body").delegate(".creatStudent", "click", function () {
            $("#txtStuName,#txtStuTel").val("");//清空
            $("#lbMan").click();
            $("#editionName").attr("data-id", "0");
            $("#editionName,#creatStudentP").html("");


            $("#creatStudent").show();
            $(".pop-mask").show();
        });

        //详情页跳转
        $("body").delegate(".seeDetail", "click", function () {

            var dataId = $(this).attr("data-id");
            window.location.href = "/Org/StudentManage/StuDetail/" + dataId;
            //"?stuId=" + dataId.split('-')[0] + "&stuEditionId=" + dataId.split('-')[1];

        });

        //处理单选男
        $("body").delegate("#lbMan,#lbWman", "click", function () {

            var type = $(this).attr("data-id");
            $('.radio').removeClass('active');
            if (type == 1) {

                $("#radSex").addClass('active');

            } else {
                $("#sexWMan").addClass('active');
            }
        });

        //处理单选读音
        $("body").delegate("#lbEng,#lbM", "click", function () {

            var type = $(this).attr("data-id");
            $('#read .radio').removeClass('active');
            if (type == 1) {

                $("#engType").addClass('active');

            } else {
                $("#MType").addClass('active');
            }
        });


       
        //报课、续课的弹窗
        $("body").delegate(".continue", "click", function () {

            $("#lbEng").click();//默认英语

            $("#addStuffP").css({ "visibility": "hidden" });//隐藏
            var dataArr = $(this).attr("data-id");//数组id、姓名、年级、学校id、教材id
            var stuName = $(this).attr("data-name");//学生姓名

           
            stuId = parseInt(dataArr.split('-')[0]);
            stuGrade = parseInt(dataArr.split('-')[1]);
            stuEditionId = 0; //parseInt(dataArr.split('-')[3]);//读取下拉框
            var strGrade = commJs.numGradeTran(parseInt(dataArr.split('-')[1]));
            $("#stuName").html(stuName + "(" + strGrade + ")");//张三（七年级）

            var strShow = $(this).html();//续课
            if (strShow == "续课") {
                $("#showAddCo").html("课程续报");
                //$("#tjr").show();
            } else {
                $("#showAddCo").html("课程开通");
                //$("#tjr").hide();

            }
            //调取数据初始化弹窗(下拉框的数据)
            var arrTemp = [];//临时数据
            //加载班级列表
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/GetOrgClassConNumber",
                dataType: "json",
                data: {
                    data: stuId
                },
                success: function (data) {
                    if (data.Data && data.Data.length > 0) {
                        //arrBj.push({
                        //    name: "全部", id: 0, pid: 0
                        //});//课程
                        for (var i = 0; i < data.Data.length; i++) {

                            arrTemp.push({
                                name: data.Data[i].StrClassName, id: data.Data[i].StrSchoolAndClassId, pid: data.Data[i].ClassId
                            });//课程
                        }

                        lui.initDropDownList({ warpid: "drop_class", width: 185, subtextlength: 15, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: null });//报课的班级
                        loadCourse(1);
                    }
                    else {

                        lui.initDropDownList({ warpid: "drop_class", width: 185, subtextlength: 15, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0' }], selectedCallBack: null });//报课的班级
                        loadCourse(1);


                    }
                }
            });

            $("#continue").show();
            $('.pop-mask').show();

        });


        //报课的确定
        $("body").delegate("#btnAddLesson", "click", function () {

            var jsonAdd = {};
            var orgCourse = $("#drop_course").attr("data-id");//课程数组
            jsonAdd.StuId = stuId;
            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、课次 、课程有效期 课价
            jsonAdd.BookNumber = orgCourse.split('-')[1];//课次
            jsonAdd.LeftNumber = orgCourse.split('-')[1];//课次
            jsonAdd.ExpireMonth = orgCourse.split('-')[2];//课次有效期月
            jsonAdd.InPrice = orgCourse.split('-')[3];//机构售价
            jsonAdd.BookType = orgCourse.split('-')[4];//课程的类型同步课1需要
            jsonAdd.OriginPrice = orgCourse.split('-')[6];//机构进价
            jsonAdd.StuEditionId = $("#drop_Edition").attr("data-id"); //改为套课的教材id  stuEditionId;//学生教材
            jsonAdd.HistoryType = 0;//报课和续课都是0
            if (orgCourse == "0" || $("#drop_class").attr("data-id") == "0") {
                return;//无课程无班级不能报
            }
            if (parseInt(jsonAdd.StuEditionId) > 0) {

            } else {
                jsonAdd.StuEditionId = 0;//对教材进行下处理

            }
           
            if ($("#editiondiv").css("display")=="none") {
                jsonAdd.StuEditionId = 0;//对教材进行下处理
            }

            jsonAdd.SchoolId = $("#drop_class").attr("data-id").split('-')[0];
            jsonAdd.ClassId = $("#drop_class").attr("data-id").split('-')[1];

            jsonAdd.RefereeId = 0; //$("#drop_tjr").attr("data-id");//推荐人
            //if (parseInt(jsonAdd.RefereeId)>0) {

            //} else {
            //    jsonAdd.RefereeId = 0;//给默认值

            //}

            if ($("#engType").hasClass("active")) {
                jsonAdd.IsEng = 1;//是默认的英语

            } else {
                jsonAdd.IsEng = 0;//不是

            }

            if (stuId.length < 1) {

                return;//无效请求
            }

            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/AddOrgStuClass",
                dataType: "json",
                data: {

                    data: JSON.stringify(jsonAdd)
                },
                success: function (data) {

                    if (data && data.Data > 0) {
                        var strAddLesson = $("#showAddCo").html();
                       
                        if (strAddLesson === "课程续报") {
                            ShowTip("续课成功");
                            setTimeout(StopTip, 1000);//提示1秒后关闭

                           
                            
                        } else {
                            ShowTip("报课成功");
                            setTimeout(StopTip, 1000);//提示1秒后关闭
                            
                        }

                       

                        GetStuData(1);//重新加载列表
                        $("#continue").hide();
                        $('.pop-mask').hide();

                    } else if (data.Data == "-1") {
                        //储值不足

                        $("#addStuffP").css({ "visibility": "visible" }).html(data.Result);

                    } else {

                        $("#addStuffP").css({ "visibility": "visible" }).html("提交失败！");
                    }



                }
            });
        });
        //教材选择框
        $("body").delegate('.teacher-grade', "click", function () {

            var grade = $("#drop_nj").attr("data-id");
            if (grade > 9) {

                $("span[data-id='G']").click();

            } else if (grade > 6) {
                $("span[data-id='C']").click();

            } else {

                $("span[data-id='X']").click();
            }

            //GetEdutionData("X");

          

            $("#add-grade").show();


        });
        //教材更换
        $("body").delegate(".tabs span", "click", function () {
            
            var stageStr = $(this).attr("data-id");
            if (stageStr=="G") {
                $(".HighSchoolShow").css("display","none");

            } else {
                $(".HighSchoolShow").css("display", "");
                
            }
            GetEdutionData(stageStr);
        });

       

        //创建学生的请求
        $("body").delegate("#btnAddStu", "click", function () {

            var jsonAdd = {};

            jsonAdd.UserName = escape($("#txtStuName").val().trim());
            jsonAdd.Tel = escape($("#txtStuTel").val().trim());
            if ($("#radSex").hasClass("active")) {
                jsonAdd.Gender = 1;//1为男，0为女
            }
            jsonAdd.Grade = $("#drop_nj").attr("data-id");//年级
            jsonAdd.BookVersion = $("#editionName").attr("data-id");//教材版本

            if (jsonAdd.BookVersion == "0" || jsonAdd.BookVersion == "") {
                $("#creatStudentP").css({ "visibility": "visible" }).html("教材不能为空！");
                return;
            }

            if (jsonAdd.UserName.length < 1) {
                //alert("姓名不能为空");
                $("#creatStudentP").css({ "visibility": "visible" }).html("姓名不能为空！");

                return;
            }
            if (jsonAdd.Tel.length < 1) {
                $("#creatStudentP").css({ "visibility": "visible" }).html("手机格式不对！");
                //alert("手机不能为空");
                return;
            }
            //校验电话
            if (!commJs.IsMobile(jsonAdd.Tel)) {
                $("#creatStudentP").css({ "visibility": "visible" }).html("手机格式不对！");
                // alert("手机格式不对");
                return;

            }
            $("#creatStudentP").css({ "visibility": "hidden" });//隐藏
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/CheckOrgPhone",
                dataType: "json",
                data: {

                    data: jsonAdd.Tel, userId: -1
                },
                success: function (data) {


                    if (data.Data == "0") {

                        $(".eg-pop .close").click();//关闭弹窗
                        $("#creatStudent").hide();
                        //提交表单
                        $.ajax({
                            type: "post",
                            url: "/Org/StudentManage/AddOrgStu",
                            dataType: "json",
                            data: {

                                data: JSON.stringify(jsonAdd)
                            },
                            success: function (data) {
                                //进行显示赋值
                                //$("#orgName").html($("#txtStuName").val().trim());//名不要加密过的
                                $("#loginId").html(data.Data);//登录账号
                                //$("#loginTel").html(jsonAdd.LinkManTel);//电话
                              
                                 ShowTip("创建成功");
                                 setTimeout(StopTip, 1000);//提示1秒后关闭
                                  $('.pop-mask').hide();
                                //$("#addPerson").show();
                                //$('.pop-mask').show();
                                GetStuData();//重新加载列表

                            }
                        });
                    } else {
                        $("#creatStudentP").css({ "visibility": "visible" }).html("电话重复！");

                    }

                }
            });



        });

        //创建学生的请求(报课)
        $("body").delegate("#btnAddStuAndCouse", "click", function () {

            var jsonAdd = {};

            jsonAdd.UserName = escape($("#txtStuName").val().trim());
            jsonAdd.Tel = escape($("#txtStuTel").val().trim());
            if ($("#radSex").hasClass("active")) {
                jsonAdd.Gender = 1;//1为男，0为女
            }
            jsonAdd.Grade = $("#drop_nj").attr("data-id");//年级
            jsonAdd.BookVersion = $("#editionName").attr("data-id");//教材版本

            if (jsonAdd.BookVersion == "0" || jsonAdd.BookVersion == "") {
                $("#creatStudentP").css({ "visibility": "visible" }).html("教材不能为空！");
                return;
            }

            if (jsonAdd.UserName.length < 1) {
                //alert("姓名不能为空");
                $("#creatStudentP").css({ "visibility": "visible" }).html("姓名不能为空！");

                return;
            }
            if (jsonAdd.Tel.length < 1) {
                $("#creatStudentP").css({ "visibility": "visible" }).html("手机格式不对！");
                //alert("手机不能为空");
                return;
            }
            //校验电话
            if (!commJs.IsMobile(jsonAdd.Tel)) {
                $("#creatStudentP").css({ "visibility": "visible" }).html("手机格式不对！");
                // alert("手机格式不对");
                return;

            }
            $("#creatStudentP").css({ "visibility": "hidden" });//隐藏
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/CheckOrgPhone",
                dataType: "json",
                data: {

                    data: jsonAdd.Tel, userId: -1
                },
                success: function (data) {


                    if (data.Data == "0") {

                        $(".eg-pop .close").click();//关闭弹窗
                        $("#creatStudent").hide();
                        //提交表单
                        $.ajax({
                            type: "post",
                            url: "/Org/StudentManage/AddOrgStu",
                            dataType: "json",
                            data: {

                                data: JSON.stringify(jsonAdd)
                            },
                            success: function (data) {

                                ////进行显示赋值
                                ////$("#orgName").html($("#txtStuName").val().trim());//名不要加密过的
                                //$("#loginId").html(data.Data);//登录账号
                                ////$("#loginTel").html(jsonAdd.LinkManTel);//电话
                                //$("#addPerson").show();
                                //$('.pop-mask').show();
                                //GetStuData();//重新加载列表

                                //弹出报课窗口报课
                                var stuInfoAdd = data.TagValue + "-" + jsonAdd.Grade + "-" + "0" + "-" + jsonAdd.BookVersion;
                               
                                AlertAddLesson($("#txtStuName").val().trim(), stuInfoAdd);//进行报课按照添加课程的顺序
                                GetStuData();


                            }
                        });
                    } else {
                        $("#creatStudentP").css({ "visibility": "visible" }).html("电话重复！");

                    }

                }
            });



        });

        //当点击的时候进行赋值
        $("body").delegate("span[data-type='1']", "click", function () {

            var dataId = $(this).attr("data-id");//取值然后赋值
            $("#editionName").html($(this).html());
            $("#editionName").attr("data-id", dataId.split('-')[2]);//赋值
            $("#add-grade").hide();
            //$(".pop-mask").hide();
        });




        //展示完的确定的删除弹窗
        $("body").delegate("#loginIdBtn", "click", function () {
            $(".eg-pop .close").click();//关闭弹窗
            $("#addPerson").hide();
            $(".pop-mask").hide();//手动关闭遮罩
        });

        ///jc非教材的x关闭
        $("body").delegate(".close", "click", function () {

            if (this.id !== 'jc') {//非教材的弹框全部关闭
                $('.eg-pop').hide();

            }

        });

        ///教材的x关闭
        $("body").delegate("#jc", "click", function () {

            $("#add-grade").hide();
            $(".pop-mask").show();
        });


    }


};

var titleO = "全部";//$("#drop_type").attr("title")  定义全局变量来监听改变事件
//绑定数据
$(function () {
    module.init();
    //OptTypeSel();


});


//发送请求调取数据
function GetStuData(page) {
    loadimg.ShowLoadingForTable($("#tb"), 8);
    if (page == undefined) {
        page = 1;
    }
    var pageSize = 10;
    var json = {};
    json.SchoolId = $("#drop_jxd").attr("data-id");;//学校的下拉
    json.ClassId = $("#drop_bj").attr("data-id");//班级的下拉
    json.CourseId = $("#drop_tbk").attr("data-id");//课程的下拉
    json.KeyWord = escape($("#txtserch").val());
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetStuList",
        dataType: "json",
        data: {
            data: JSON.stringify(json), PageIndex: page, PageSize: pageSize
        },
        success: function (data) {
            //通过tagId判断是不是应该隐藏学生
            userRole = data.TagValue;//根据角色进行显示
            if (data.TagValue != "3") {

                $("#btnCreatStudent").hide();

            } else {
                $("#btnCreatStudent").show();
            }


            if (data.Data && data.Data.length > 0) {
                $("#tb").html(tplTableStu(data.Data));
                $("#Totalcount").html(data.PageSum);
                Paginator.Paginator(10, page, data.PageSum, GetStuData);

                //加载学校列表
                if (isSel != 1) {
                    loadSchools();
                }
                isSel = 1;

            }
            else {

                $("#tb").html("");
                //<img src="../../../bundle/img/noclass.png" style="text-align:center;">
                $("#tb").html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="8"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;"><br/><span>暂无数据！</span></div></div></td></tr>');//清空数据
                $("#pagination").html("");//分页控件不显示
                $("#Totalcount").html(0);//数据设置为0

            }
        }
    });

}




//只是加载列表数据
function GetStuDataNotLoadSelect() {

    loadClass(-1);//如果是-的话不进行加载课程
    $("#drop_bj").attr("data-id", "0");//记得赋值，校区联动可能会有延迟
    return GetStuData(1);

}

//只是加载列表数据（不联动）
function GetStuDataNotLoadSelectBj() {

    return GetStuData(1);

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
            if (data.Data && data.Data.length > 0) {
                debugger;
                if (userRole != "3") {
                    arrJxd.push({
                        name: "全部校区", id: 0, pid: 0
                    });//学校
                    
                }
               
                for (var i = 0; i < data.Data.length; i++) {

                    arrJxd.push({ name: data.Data[i].SchoolName, id: data.Data[i].SchoolId, pid: data.Data[i].SchoolId });
                }

                lui.initDropDownList({ warpid: "drop_jxd", width: 185, nameField: 'name', idField: 'id', data: arrJxd, selectedCallBack: GetStuDataNotLoadSelect, subtextlength: 10 });//学校和班级的联动

                loadClass();
            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}



//加载班级
function loadClass(obj) {
    var jxdId = $("#drop_jxd").attr("data-id");

    //加载班级列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgClass",
        dataType: "json",
        data: {
            data: jxdId, "stuId": stuId
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {

                arrBj.length = 0;//清空数组
                arrBj.push({
                    name: "全部班级", id: 0, pid: 0
                });//班级
                for (var i = 0; i < data.Data.length; i++) {

                    arrBj.push({
                        name: data.Data[i].ClassName, id: data.Data[i].ClassId, pid: data.Data[i].ClassId
                    });//班级
                }


                lui.initDropDownList({ warpid: "drop_bj", width: 185, nameField: 'name', idField: 'id', data: arrBj, selectedCallBack: GetStuDataNotLoadSelectBj, subtextlength: 10 });//班级

                if (obj != -1) {
                    loadCourse();

                }

            }
            else {

                lui.initDropDownList({ warpid: "drop_bj", width: 185, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0' }], selectedCallBack: null, subtextlength: 10 });//班级

            }
        }
    });

}

//提示
function ShowTip(obj) {
    $("#showTip").html(obj);
    $("#showTip").css("display", "block");
    
}
//停止提示
function StopTip() {
    $("#showTip").css("display", "none");
}


//加载课程 obj为1代表报课的班级 
function loadCourse(obj) {
    var arrTemp = [];//创建一个临时数组
    if (obj!=1) {
        obj = 0;
    }

    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgCourse",
        dataType: "json",
        data: {
            data: stuId, type: obj//下面的所有的
        },
        success: function (data) {

            if (data.Data && data.Data.length > 0) {
                //if (isLoadTeach != 1) {
                //    loadTeachers();//加载推荐人

                //}//推荐人隐藏

                arrTbk.push({
                    name: "全部课程", id: 0, pid: 0
                });//班级
                for (var i = 0; i < data.Data.length; i++) {


                    if (obj == 1) {
                        arrTemp.push({ name: data.Data[i].CourseName, id: data.Data[i].CourseId + "-" + data.Data[i].BookNumber + "-" + data.Data[i].ExpiryMonth + "-" + data.Data[i].OutPrice + "-" + data.Data[i].BookType + "-" + data.Data[i].StageId + "-" + data.Data[i].InPrice, pid: data.Data[i].CourseId });//报班的课程
                    } else {
                        arrTbk.push({
                            name: data.Data[i].CourseName, id: data.Data[i].CourseId, pid: data.Data[i].CourseId
                        });//报班的课程
                    }

                }


                if (obj == 1) {//报课的加载课程需要赋值一些参数
                    lui.initDropDownList({ warpid: "drop_course", width: 185, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: loadCourseData, subtextlength: 10 });//同步课程，需要进行联动

                    $("#lessonNumber").html(arrTemp[0].id.split('-')[1]);
                    $("#lessonTime").html(arrTemp[0].id.split('-')[2]);
                    $("#lessonPrice").html(arrTemp[0].id.split('-')[3]);
                   
                    if (arrTemp[0].id.split('-')[4] == "5" || arrTemp[0].id.split('-')[4] == "6") {
                        $("#editiondiv").css("display", "none");

                    }
                    else {
                        $("#editiondiv").css("display", "");

                    }
                    //拼接新的片段
                    loadEdution(arrTemp[0].id.split('-')[5]);


                } else {
                    lui.initDropDownList({ warpid: "drop_tbk", width: 185, nameField: 'name', idField: 'id', data: arrTbk, selectedCallBack: GetStuDataNotLoadSelectBj, subtextlength: 20 });//课程
                }


            }
            else {
                //无
                if (obj == 1) {//报课的加载课程需要赋值一些参数
                    lui.initDropDownList({ warpid: "drop_course", width: 185, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }], subtextlength: 10 });//同步课程，需要进行联动

                    $("#lessonNumber").html(0);
                    $("#lessonTime").html(0);
                    $("#lessonPrice").html(0);
                    //拼接新的片段

                } else {
                    lui.initDropDownList({ warpid: "drop_tbk", width: 185, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }], subtextlength: 10 });//课程
                }

            }
        }
    });

}


//进行联动课程的选择
function loadCourseData() {
    var jsData = $("#drop_course").attr("data-id");//组合的数据进行联动

    if (jsData.length > 0) {
        $("#lessonNumber").html(jsData.split('-')[1]);
        $("#lessonTime").html(jsData.split('-')[2]);
        $("#lessonPrice").html(jsData.split('-')[3]);
    }
   
    if (jsData.split('-')[4] == "5" || jsData.split('-')[4] == "6") {
        $("#editiondiv").css("display", "none");

    }
    else {
        $("#editiondiv").css("display", "");

    }

    //还需要联动教材版本
    loadEdution(jsData.split('-')[5]);//根据套课id去查询

}
//加载学生教材列表  obj为传递的学段
function loadEdution(obj) {
   
    arrEdutions.length = 0;
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetEdutionsByBookStage",
        dataType: "json",
        data: {
            data: obj
        },
        success: function (data) {
            if (data.Data) {

                for (var i = 0; i < data.Data.length; i++) {

                    arrEdutions.push({
                        name: data.Data[i].EditionName, id: data.Data[i].EditionId, pid: data.Data[i].EditionId
                    });//报班的课程
                }

                lui.initDropDownList({ warpid: "drop_Edition", width: 185, nameField: 'name', idField: 'id', data: arrEdutions, subtextlength: 10 });//教材版本


            } else {
                lui.initDropDownList({ warpid: "drop_Edition", width: 185, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }] });//课程

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



//加载推荐人
function loadTeachers() {

    //加载班级列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgTeachers",
        dataType: "json",
        data: {
            data: ""
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {



                for (var i = 0; i < data.Data.length; i++) {

                    arrTjr.push({
                        name: data.Data[i].TeachName, id: data.Data[i].TeachId, pid: 1
                    });//推荐人
                }


                lui.initDropDownList({
                    warpid: "drop_tjr", width: 185, nameField: 'name', idField: 'id', subtextlength: 10, data: arrTjr
                });//推荐人
                isLoadTeach = 1;

            }
            else {

                lui.initDropDownList({
                    warpid: "drop_tjr", width: 185, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }]
                });//推荐人

            }
        }
    });

}





//下拉框初始化
var Lui = require('../../LUI/js/lui');
var tool = require('../../LUI/tool');
var lui = new Lui();
//创建下级弹出层事件
//tool.pophide($('.eg-pop .close'), $('.eg-pop'));
//tool.popshow($('.creatStudent'), $('#creatStudent'));
//课程开通
tool.popshow($('.continue'), $('#continue'));
tool.Sibs($('.spans'));
//进行初始化
tool.Sibs($('.tabs span'));
//性别按钮
tool.radio();
//编辑学生的弹窗
tool.popshow($('.editMesg'), $('#editMesg'));

/*全部校区的下拉*/
//lui.initDropDownList({ warpid: "drop_jxd", width: 100, nameField: 'name', idField: 'id', data: [{ name: '全部', id: '0', pid: '1' }] });
///*授课时间的下拉  全部班级*/
//lui.initDropDownList({ warpid: "drop_bj", width: 100, nameField: 'name', idField: 'id', data: [{ name: '全部', id: '0', pid: '1' }] });
///*任课老师的下拉  同步课*/
//lui.initDropDownList({ warpid: "drop_tbk", width: 100, nameField: 'name', idField: 'id', data: [{ name: '全部', id: '0', pid: '1' }] });
////年级的下拉
lui.initDropDownList({ warpid: "drop_nj", width: 260, nameField: 'name', idField: 'id', data: gradeArr });


//版本的下拉
lui.initDropDownList({ warpid: "drop_bb", width: 260, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
//创建学生同步课程
//lui.initDropDownList({ warpid: "drop_course", width: 135, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
//创建学生班级的下拉
//lui.initDropDownList({ warpid: "drop_class", width: 135, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });


//添加实时校验
$(function () {
    OptCheck();

});

//校验
function OptCheck() {

    $("#txtStuName").keyup(function () {
        if (this.value.length > 1) {
            $("#creatStudentP").css({ "visibility": "hidden" });
        }

    });

    $("#txtStuTel").keyup(function () {
        if (commJs.IsMobile(this.value)) {
            $("#creatStudentP").css({ "visibility": "hidden" });
        } else {
            $("#creatStudentP").css({ "visibility": "visible" }).html("手机格式不对！");
        }

    });


}

///弹窗报课
function AlertAddLesson(stuNameAdd, stuInfoAdd) {
   
    $("#lbEng").click();//默认英语

    $("#addStuffP").css({ "visibility": "hidden" });//隐藏
    var dataArr = stuInfoAdd;//数组id、姓名、年级、学校id、教材id
    var stuName = stuNameAdd;//学生姓名

           
    stuId = parseInt(dataArr.split('-')[0]);
    stuGrade = parseInt(dataArr.split('-')[1]);
    stuEditionId = 0; //parseInt(dataArr.split('-')[3]);//读取下拉框
    var strGrade = commJs.numGradeTran(parseInt(dataArr.split('-')[1]));
    $("#stuName").html(stuName + "(" + strGrade + ")");//张三（七年级）

    $("#showAddCo").html("课程开通");
    //调取数据初始化弹窗(下拉框的数据)
    var arrTemp = [];//临时数据
    //加载班级列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgClassConNumber",
        dataType: "json",
        data: {
            data: stuId
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {
                //arrBj.push({
                //    name: "全部", id: 0, pid: 0
                //});//课程
                for (var i = 0; i < data.Data.length; i++) {

                    arrTemp.push({
                        name: data.Data[i].StrClassName, id: data.Data[i].StrSchoolAndClassId, pid: data.Data[i].ClassId
                    });//课程
                }

                lui.initDropDownList({ warpid: "drop_class", width: 185, subtextlength: 15, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: null });//报课的班级
                loadCourse(1);
            }
            else {

                lui.initDropDownList({ warpid: "drop_class", width: 185, subtextlength: 15, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0' }], selectedCallBack: null });//报课的班级
                loadCourse(1);


            }
        }
    });

    $("#continue").show();
    $('.pop-mask').show();

    
}



//回车事件
$(function () {
    $('#txtserch').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            GetStuData(1);

        }
    });
});
