//后台交互
//发送请求调取数据绑定下拉框
var arrTbk = [];//同步课
var arrBj = [];//班级
var arrTjr = [];//推荐人，老师
var arrEdutions = [];//教材列表
var isLoadTeach = 0;//0未加载，1加载
var tplTableStuDetail = require("StudentManage/StuDetail.tpl");//学生详情
var stuId = $("#stuId").val();//学生id  stuEditionId
var stuEditionId = $("#stuEditionId").val();//教材id
var grade;//年级
var stuName;//学生姓名
require("../../tpl/template-helpers.js");
var pop = require("../lib/popup/popuptip.js");
var loadimg = require("../lib/popup/showloadimg.js");
var commJs = require("../lib/util.js");//公共方法
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //加载列表
        GetStuDetailData();//加载数据

    },
    initBtns: function () {
        //todo 绑定事件
        //编辑
        $("body").delegate("#stuEdit", "click", function () {
            window.location.href = "/Org/StudentManage/EditStu/" + stuId + "-" + stuEditionId;
            //"?stuId=" + stuId;//跳转

        });

        //重置密码
        $("body").delegate("#reSetPwd", "click", function () {
            pop.OpenConfrimPop("重置后,密码为:000000", "ConfrimReset","重置提示");
           

        });
        //确定重置
        $("body").delegate("#ConfrimReset", "click", function() {
            
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/ResetStuAccount",
                dataType: "json",
                data: {

                    stuId: stuId, type: 0
                },
                success: function (data) {

                    if (data && data.Data > 0) {
                        $(".small-popbtn").remove();
                        pop.PopTipShow("重置成功","密码重置");

                    } else {
                      
                        pop.PopTipShow("重置失败", "密码重置");
                    }



                }
            });


        });

        //账号冻结
        var strFree = "1";
        $("body").delegate("#accountFreeze", "click", function () {
            

            strFree = $("#accountFreeze").attr("data-id");
            if (strFree == "1") {
                pop.OpenConfrimPop("禁用后,此账号将无法登录", "Confrim", "禁用提示");
                
            } else {
                pop.OpenConfrimPop("确认启用学生账号?", "Confrim", "启用提示");
            }
           
            


        });
        //确定冻结
        $("body").delegate("#Confrim", "click", function () {
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/ResetStuAccount",
                dataType: "json",
                data: {

                    stuId: stuId, type: 1, val: strFree
                },
                success: function (data) {
                    GetStuDetailData();
                    if (data && data.Data > 0) {
                        $(".small-popbtn").remove();
                        pop.PopTipShow("操作成功");

                    } else {
                        pop.PopTipShow("操作失败");
                    }



                }
            });
            
        });

        //处理单选读音
        $("body").delegate("#lbEng,#lbM", "click", function () {

            var type = $(this).attr("data-id");
            $('#read .radio').removeClass('active');
            if (type == 1) {

                $("#AddCourseRead").addClass('active');//英式默认

            } else {
                $("#AddCourseReadM").addClass('active');
            }
        });

        //处理修改读音的单选
        $("body").delegate(".radioRead", "click", function () {

            $('.radioRead').removeClass('active');
            $(this).addClass('active');
        });



        //课程续课
        $("body").delegate("#courseReNew", "click", function () {
            $("#lbEng").click();//默认英语
           
            $('.pop-mask').show();
            $("#sing-up").show();
            loadClass();//加载弹框数据
            var strGrade = commJs.numGradeTran(parseInt(grade));
            $("#stuName").html(stuName + "(" + strGrade + ")");//张三（七年级）

        });
        ///单选
        $("body").delegate(".radio", "click", function () {
            var isChangeProunce = 0;
            var type = $(this).attr("data-type");//类型0为调班,修改读音，1为加课次
            var id = this.id;
           
            if (type == "0") {
                $("#currentClass").html($(this).attr("data-name"));//当前班级
                if ($("#change-prounce").css("display") != "none") {
                    isChangeProunce = 1;
                   
                    //进行联动读音
                    $('.nread').removeClass('active');
                    if (id.split('-')[2] == "true") {//英式选中，美式移除
                        $("#updateRead").addClass('active');

                    } else {
                        $("#updateRead2").addClass('active');

                    }
                }

            } else {
                $("#currentCourseNumber").html(id.split('-')[1] + "/" + id.split('-')[2] + "课次");//目前班级
                $("#currentCourseNumber").attr("data-id", id.split('-')[1] + "-" + id.split('-')[0]);

            }

            if (isChangeProunce == 1) {
                $('#courseRead .radio').removeClass('active');
                
            } else {
                $('.radio').removeClass('active');
            }
           
            $(this).addClass('active');

        });

        //处理单选读音lable标签修改读音的弹窗
        $("body").delegate("#lbEngRead,#lbMRead", "click", function () {
            
            var type = $(this).attr("data-id");
            $('#updateReadNew .radioRead').removeClass('active');
            if (type == 1) {

                $("#updateRead").addClass('active');

            } else {
                $("#updateRead2").addClass('active');
            }
        });



        ///单选课程的lable
        $("body").delegate(".lbCourse", "click", function () {
           
            var id = $(this).attr("data-id");
            var isChangeProunce = 0;
            var type = $(this).attr("data-type");//类型0为调班1为加课次
            if (type == "0") {
              
                if ($("#change-prounce").css("display") != "none") {//修改读音
                    isChangeProunce = 1;
                    //进行联动读音
                    $('.nread').removeClass('active');
                    if (id.split('-')[2] == "true") {//英式选中，美式移除
                        $("#updateRead").addClass('active');

                    } else {
                        $("#updateRead2").addClass('active');

                    }
                } else {
                    $("#currentClass").html($(this).attr("data-name"));
                    
                }
                $("#currentClass").attr("data-id", id.split('-')[1]);

            } else {
                $("#currentCourseNumber").html(id.split('-')[1] + "/" + id.split('-')[2] + "课次");//目前班级

            }
            $("#currentClass").html($(this).attr("data-name"));
            if (isChangeProunce == 1) {
                $('#courseRead .radio').removeClass('active');
                
            } else {
                $('.radio').removeClass('active');
            }
           
            $($(this).find(".radio")[0]).addClass('active');

        });

        //调班
        $("body").delegate("#classChange", "click", function () {

            loadClass(2);//加载班级2代表调班加载下拉班级
            $("#stuNameCc").html(stuName);//张三（七年级）
            $('.pop-mask').show();
            $("#change-class").show();




        });
        //调班提交数据
        $("body").delegate("#changeClassBtn", "click", function () {
           
            if ($("#stuCourse .active").length < 1 || $("#drop_cc").attr("data-id")=="0") {

                return;//无课程
            }
            var jsonAdd = {};
            jsonAdd.StuId = stuId;
            var orgClass = $("#drop_cc").attr("data-id");//班级数组
            jsonAdd.SchoolId = orgClass.split('-')[0];
            jsonAdd.ClassId = orgClass.split('-')[1];
            var orgCourse = $("#stuCourse .active")[0].id;
            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、课次 、课程有效期 课价
            var currC = $("#currentClass").attr("data-id");//当前选择课程所在的班级old
            if (currC == jsonAdd.ClassId || jsonAdd.ClassId=="0") {
                return;//无效请求每更换班级
            }

            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/ChangeOrgStuClass",
                dataType: "json",
                data: {

                    data: JSON.stringify(jsonAdd)
                },
                success: function (data) {

                    if (data && data.Data > 0) {
                        GetStuDetailData();//重新加载列表
                        $("#change-class").hide();
                        $('.pop-mask').hide();

                    } else {
                        alert("提交失败");
                    }



                }
            });


        });


        //加课次
        $("body").delegate("#classAdd", "click", function () {
            $("#addCourseNum").val("");//置空
            loadCourseRad2();//添加课次
            $("#addCStuName").html(stuName);//张三（七年级）
            $('.pop-mask').show();
            $("#add-classOrder").show();
          
            

        });
        //加课次提交数据
        $("body").delegate("#addCourseBtn", "click", function () {
            
            var jsonAdd = {};
            jsonAdd.StuId = stuId;
            var orgCourse = $("#stuCourseAddC .active")[0].id;
            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、已经上课次 、总课次
            var addNum = $("#addCourseNum").val().trim();//要添加课次
           
            if (addNum == "" || parseInt(addNum)<1) {
                return;//必填课次
            }
            //var leftNum = parseInt(orgCourse.split('-')[2]) - parseInt(orgCourse.split('-')[1]) + parseInt(addNum);//剩余课次的和加上新添加的

            // if (leftNum > parseInt(orgCourse.split('-')[2])) {
            //     return;//无效请求不能超过当前的总课次
            // }
            jsonAdd.LeftNumber = addNum;//加课的次数
            jsonAdd.ReaLeftNumber = parseInt(orgCourse.split('-')[3]);//加课的次数
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/AddOrgStuCourse",
                dataType: "json",
                data: {

                    data: JSON.stringify(jsonAdd)
                },
                success: function (data) {
                   
                    if (data && data.Data > 0) {
                        GetStuDetailData();//重新加载列表
                        $("#add-classOrder").hide();
                        $('.pop-mask').hide();

                    } else {
                        $("#addCourseTip").css({ "visibility": "visible" }).html(data.TagValue);
                        //alert(data.TagValue);
                    }



                }
            });


        });

        //退课
        $("body").delegate("#classBack", "click", function () {
            
            loadCourseBack();//退课的加载课程下拉
            $("#backReason").val("");//清空
            var strGrade = commJs.numGradeTran(parseInt(grade));
            $("#backStuName").html(stuName + "(" + strGrade + ")");//张三（七年级）
            $('.pop-mask').show();
            $("#sing-out").show();

        });
        

        //退课的取消
        $("body").delegate("#backCancel", "click", function () {
            $("#sing-out").hide();
            $('.pop-mask').hide();

        });


         //退课的提交
        $("body").delegate("#backBtn", "click", function () {

            $("#addStuffP0").css({ "visibility": "hidden" });//清除提示
            var jsonAdd = {};
            jsonAdd.StuId = stuId;
            var orgCourse = $("#drop_backC").attr("data-id");
            if (orgCourse=="0") {
                return;
            }
            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、已经上课次 、总课次
            jsonAdd.ClassId = orgCourse.split('-')[4];//班级id
            jsonAdd.Remark = $("#backReason").val().trim();//退课的原因
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/BackOrgStuCourse",
                dataType: "json",
                data: {

                    data: JSON.stringify(jsonAdd)
                },
                success: function (data) {
                    
                    if (data && data.Data > 0) {
                        GetStuDetailData();//重新加载列表
                        $("#sing-out").hide();
                        $('.pop-mask').hide();

                    } else if (data.Data == "-1") {
                        
                        //储值不足

                        $("#addStuffP0").css({ "visibility": "visible" }).html(data.Result);

                    } else {

                        $("#addStuffP0").css({ "visibility": "visible" }).html("提交失败！");
                    }



                }
            });

            
        });

        //修改读音
        $("body").delegate("#editSound", "click", function () {
            
            loadCourseRad(2);//当为2的时候渲染读音的课程下拉
            $("#updateReadStuName").html(stuName);//张三（七年级）
            $('.pop-mask').show();
            $("#change-prounce").show();

        });


        //修改读音的提交
        $("body").delegate("#updateReadBtn", "click", function () {

            
            var jsonAdd = {};
            jsonAdd.StuId = stuId;

            if ($("#updateReadCourse .active").length<1) {
                return;
            }
            var orgCourse = $("#updateReadCourse .active")[0].id;
            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、已经上课次 、总课次
            jsonAdd.IsEng = 0;//美
            if ($("#updateRead").hasClass("active")) {
                jsonAdd.IsEng = 1;//英
                
            }
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/UpdateOrgStuCourseRead",
                dataType: "json",
                data: {

                    data: JSON.stringify(jsonAdd)
                },
                success: function (data) {

                    if (data && data.Data > 0) {
                        GetStuDetailData();//重新加载列表
                        $("#change-prounce").hide();
                        $('.pop-mask').hide();

                    } else {
                        alert("提交失败");
                    }



                }
            });


        });


        //续课的确定
        $("body").delegate("#courseAddBtn", "click", function () {

            
            if ($("#drop_class").attr("data-id") == "0") {
                return;//无效请求每更换班级
            }

            
            var jsonAdd = {};
            var orgCourse = $("#drop_course").attr("data-id");//课程数组
            jsonAdd.StuId = stuId;

            jsonAdd.RefereeId = 0;//$("#drop_tjr").attr("data-id");//推荐人
            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、课次 、课程有效期 课价
            jsonAdd.BookNumber = orgCourse.split('-')[1];//课次
            jsonAdd.LeftNumber = orgCourse.split('-')[1];//课次
            jsonAdd.ExpireMonth = orgCourse.split('-')[2];//课次有效期月
            jsonAdd.InPrice = orgCourse.split('-')[3];//课次有效期月
            jsonAdd.BookType = orgCourse.split('-')[5];//教材类型，同步1
            jsonAdd.OriginPrice = orgCourse.split('-')[4];//机构进价
            jsonAdd.StuEditionId = $("#drop_Edition").attr("data-id"); //改为套课的教材id  stuEditionId;//学生教材
            jsonAdd.SchoolId = $("#drop_class").attr("data-id").split('-')[0];
            jsonAdd.ClassId = $("#drop_class").attr("data-id").split('-')[1];
            jsonAdd.HistoryType = 0;//从数据库查，不知道是哪种类型续报就是0
            if ($("#AddCourseRead").hasClass("active")) {
                jsonAdd.IsEng = 1;//是默认的英语

            } else {
                jsonAdd.IsEng = 0;//不是

            }

            if (stuId.length < 1) {

                return;//无效请求
            }

            if ($("#editiondiv").css("display") == "none") {
                jsonAdd.StuEditionId = 0;//对教材进行下处理
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
                        GetStuDetailData();//重新加载列表
                        $("#sing-up").hide();
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





    }


};


//绑定数据
$(function () {
    module.init();

});



//发送请求调取数据
function GetStuDetailData() {
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetStuDetail",
        dataType: "json",
        data: {
            data: stuId
        },
        success: function (data) {

          
            if (data.Data) {
                $("#tb").html(tplTableStuDetail(data.Data));
                grade = data.Data.GradeId;
                stuName = data.Data.StuName;
                if (data.Data.IsFrozen==1) {
                    $("#accountFreeze").html("账号启用");
                    $("#accountFreeze").attr("data-id","0");
                } else {
                    $("#accountFreeze").html("账号冻结");
                    $("#accountFreeze").attr("data-id", "1");
                }


            }
            else {

                alert("获取数据失败");

            }
        }
    });

}


//加载班级
function loadClass(obj) {

    var arrTemp = [];
    //加载班级列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgClassConNumber",
        dataType: "json",
        data: {
            data: stuId//需要进行过滤
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {
                //arrBj.push({
                //    name: "全部", id: 0, pid: 0
                //});//课程
                arrTemp.push({
                    name: "请选择", id: 0, pid: 0
                });//课程
                for (var i = 0; i < data.Data.length; i++) {

                    arrTemp.push({
                        name: data.Data[i].StrClassName, id: data.Data[i].StrSchoolAndClassId, pid: data.Data[i].ClassId
                    });//课程
                }

                if (obj == 2) {//调班的
                    lui.initDropDownList({ warpid: "drop_cc", width: 200, nameField: 'name', idField: 'id', data: arrTemp, subtextlength: 15 });
                    loadCourseRad();//加载学生已报的课程

                } else {
                    lui.initDropDownList({ warpid: "drop_class", width: 200, subtextlength: 15, nameField: 'name', idField: 'id', data: arrTemp });//报课的班级
                    loadCourse(1);
                }

            }
            else {

                if (obj == 2) {//调班的
                    lui.initDropDownList({ warpid: "drop_cc", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0' }], subtextlength: 15 });
                    loadCourseRad();//加载学生已报的课程

                } else {
                    lui.initDropDownList({ warpid: "drop_class", width: 200, subtextlength: 15, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0' }] });//报课的班级
                    loadCourse(1);
                }

            }
        }
    });

}

//只是加载列表数据
function GetStuDataNotLoadSelect() {
    return GetStuDetailData(-1);

}

//加载课程
function loadCourse() {
    var arrTemp = [];//创建一个临时数组
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgCourse",
        dataType: "json",
        data: {
            data: stuId,type:1//需要进行过滤
        },
        success: function (data) {

            if (data.Data && data.Data.length > 0) {


                arrTbk.push({
                    name: "全部", id: 0, pid: 0
                });//课程
                for (var i = 0; i < data.Data.length; i++) {

                    arrTemp.push({ name: data.Data[i].CourseName, id: data.Data[i].CourseId + "-" + data.Data[i].BookNumber + "-" + data.Data[i].ExpiryMonth + "-" + data.Data[i].OutPrice + "-" + data.Data[i].InPrice + "-" + data.Data[i].BookType + "-" + data.Data[i].StageId , pid: data.Data[i].CourseId });//报班的课程

                }



                lui.initDropDownList({ warpid: "drop_course", width: 200, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: loadCourseData, subtextlength:15 });//同步课程，需要进行联动

                $("#lessonNumber").html(arrTemp[0].id.split('-')[1]);
                $("#lessonTime").html(arrTemp[0].id.split('-')[2] );
                $("#lessonPrice").html(arrTemp[0].id.split('-')[3]);
                //根据教材类型隐藏教材版本
                if (arrTemp[0].id.split('-')[5] == "5" || arrTemp[0].id.split('-')[5] == "6") {
                    $("#editiondiv").css("display", "none");

                }
                else {
                    $("#editiondiv").css("display", "");

                }
             //隐藏推荐人
                //if (isLoadTeach != 1) {
                //    loadTeachers();//加载推荐人
                    
                //}
                //拼接新的片段
                loadEdution(arrTemp[0].id.split('-')[6]);//联动教材版本

            }
            else {

                lui.initDropDownList({ warpid: "drop_course", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }], selectedCallBack: loadCourseData, subtextlength: 15 });//同步课程，需要进行联动

                $("#lessonNumber").html(0);
                $("#lessonTime").html(0);
                $("#lessonPrice").html(0);
                //$("#actuPrice").html(0+ "元");
                //if (isLoadTeach != 1) {
                //    loadTeachers();//加载推荐人

                //}//隐藏推荐人

            }
        }
    });

}


//加载课程Rdio当为2的时候渲染读音的课程下拉
function loadCourseRad(obj) {//当为2的时候为修改读音的渲染
   
    var strHtml = "";//创建一个字符串进行拼接
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgStuCourse",
        dataType: "json",
        data: {
            data: stuId//需要进行过滤
        },
        success: function (data) {
           
            if (data.Data && data.Data.length > 0) {
                for (var i = 0; i < data.Data.length; i++) {

                    if (i == 0) {
                        strHtml += '<label style="" class="lbCourse" data-type="0" data-name=' + data.Data[i].ClassName + '  data-id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].IsEng + '><span data-type="0" class="radio active" style="margin-right:15px;" data-name=' + data.Data[i].ClassName + '  id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId  + "-" + data.Data[i].IsEng + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';
                        $("#currentClass").html(data.Data[i].ClassName);//目前班级
                        $("#currentClass").attr("data-id", data.Data[i].ClassId);
                       

                    } else {
                        strHtml += '<label style="" class="lbCourse" data-type="0"  data-name=' + data.Data[i].ClassName + ' data-id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].IsEng + '><span data-type="0"  class="radio " style="margin-right:15px;" data-name=' + data.Data[i].ClassName + '  id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId  + "-" + data.Data[i].IsEng + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';

                    }
                }
                if (obj == 2) {
                   
                    $("#updateReadCourse").html(strHtml);
                    //updateRead
                    $('#updateReadNew .nread ').removeClass('active');
                    
                    if (data.Data[0].IsEng ==true) {//英式选中，美式移除
                        $("#updateRead").addClass('active');
                        
                    } else {
                        $("#updateRead2").addClass('active');
                        
                    }
                } else {
                    $("#stuCourse").html(strHtml);
                    
                }
               



            }
            else {

                $("#stuCourse").html("<span>无</span>");

            }
        }
    });

}


//加载课程Rdio（加课次）
function loadCourseRad2() {
    var strHtml = "";//创建一个字符串进行拼接
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgStuCourse",
        dataType: "json",
        data: {
            data: stuId//需要进行过滤
        },
        success: function (data) {

            if (data.Data && data.Data.length > 0) {
                for (var i = 0; i < data.Data.length; i++) {

                    if (i == 0) {
                        strHtml += '<label style="width:100%;display:inline-block;font-size:14px;" class="lbCourse" data-type="1" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + "-" + data.Data[i].LeftNumber + '><span data-type="1"  class="radio active" style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + "-" + data.Data[i].LeftNumber + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';
                        $("#currentCourseNumber").html(data.Data[i].HaveNumber + "/" + data.Data[i].BookNumber + "课次");//目前班级
                        $("#currentCourseNumber").attr("data-id", data.Data[i].HaveNumber + "-" + data.Data[i].CourseId);

                    } else {
                        strHtml += '<label style="width:100%;display:inline-block;font-size:14px;line-height:30px;" class="lbCourse" data-type="1" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + "-" + data.Data[i].LeftNumber + '><span data-type="1"  class="radio " style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + "-" + data.Data[i].LeftNumber + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';

                    }
                }

                $("#stuCourseAddC").html(strHtml);



            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}



//加载课程退课
function loadCourseBack() {
    var arrTemp = [];//创建一个临时数组
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/StudentManage/GetOrgStuCourse",
        dataType: "json",
        data: {
            data: stuId//需要进行过滤
        },
        success: function (data) {

            if (data.Data && data.Data.length > 0) {

                for (var i = 0; i < data.Data.length; i++) {

                    arrTemp.push({
                        name: data.Data[i].CourseName, id: data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + "-" + data.Data[i].ExpiryMonth + "-" + data.Data[i].ClassId, pid: data.Data[i].CourseId
                    });//报班的课程

                }



                lui.initDropDownList({
                    warpid: "drop_backC", width: 200, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: loadCourseDataBack,subtextlength: 15
                });//同步课程，需要进行联动

                $("#backCourse").html(arrTemp[0].id.split('-')[1] + "/" + arrTemp[0].id.split('-')[2] + "课次");//显示的课程进度


            }
            else {

                lui.initDropDownList({
                    warpid: "drop_backC", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }], selectedCallBack: loadCourseDataBack, subtextlength: 15
                });//同步课程，需要进行联动
                $("#backCourse").html("0/0课次");//显示的课程进度

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
                    warpid: "drop_tjr", width: 200, nameField: 'name', idField: 'id', data: arrTjr, subtextlength: 10
                });//推荐人
                isLoadTeach = 1;

            }
            else {

                lui.initDropDownList({
                    warpid: "drop_tjr", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }]
                });//推荐人

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
        //$("#actuPrice").html(jsData.split('-')[4] + "元");
    }
    //根据教材类型隐藏教材版本
    if (jsData.split('-')[5] == "5" || jsData.split('-')[5] == "6") {
        $("#editiondiv").css("display", "none");

    }
    else {
        $("#editiondiv").css("display", "");

    }

    //还需要联动教材版本
    loadEdution(jsData.split('-')[6]);//根据套课id去查询

}

//加载学生教材列表 obj为传递的学段
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

                lui.initDropDownList({ warpid: "drop_Edition", width: 200, nameField: 'name', idField: 'id', data: arrEdutions, subtextlength: 10 });//教材版本


            } else {
                lui.initDropDownList({ warpid: "drop_Edition", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }] });//课程

            }


        }
    });

}








//进行联动课程的选择(退课)
function loadCourseDataBack() {
    var jsData = $("#drop_backC").attr("data-id");//组合的数据进行联动

    if (jsData.length > 0) {
        $("#backCourse").html(jsData.split('-')[1] + "/" + jsData.split('-')[2] + "课次");//显示的课程进度
    }




}




















//初始化下拉框
var Lui = require('../../LUI/js/lui');
var tool = require('../../LUI/tool');
var lui = new Lui();
//创建下级弹出层事件
/*tool.pophide($('.eg-pop .close,.eg-pop .sure'),$('.eg-pop'));
tool.popshow($('.creatStudent'),$('#creatStudent'));
//课程开通
tool.popshow($('.continue'),$('#continue'));
tool.Sibs($('.spans'));*/
//鼠标移动倒课程管理的事件
$('.managebtn').on('mouseenter', function () {
    $('.managebtn').css({
        'padding-bottom': '10px'
    });
    $('.drop').show();
})
$('.manage').on('mouseleave', function () {
    $('.managebtn').css({
        'padding-bottom': '0px'
    });
    $('.drop').hide();
})
$('.drop li').on('click', function (event) {
    $('.drop').hide();
});
//性别按钮
tool.radio();
//选择读音
tool.Sibs($('.spans'));

//创建下级弹出层事件
tool.pophide($('.eg-pop .close'), $('.eg-pop'));
//编辑学生的弹窗
/*tool.popshow($('.editMesg'),$('#editMesg'));*/
/*课程续保推荐人的下拉*/
//lui.initDropDownList({ warpid: "drop_dem1", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
/*课程续保课程的下拉*/
//lui.initDropDownList({ warpid: "drop_dem2", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
/*课程续保班级的下拉*/
//lui.initDropDownList({ warpid: "drop_dem3", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });

//办理退课课程的下拉
//lui.initDropDownList({
//    warpid: "drop_backC", width: 140, nameField: 'name', idField: 'id', data: [{
//        name: '01', id: '00', pid: ''
//    }, {
//        name: '02', id: '00_01', pid: '00'
//    }, {
//        name: '03', id: '00_02', pid: '00'
//    }, {
//        name: '04', id: '00_01_01', pid: '00_01'
//    }, {
//        name: '05', id: '00_01_02', pid: '00_01'
//    }, {
//        name: '06', id: '00_02_01', pid: '00_02'
//    }, {
//        name: '07', id: '00_02_02', pid: '00_02'
//    }]
//});
//调班班级的下拉
//lui.initDropDownList({ warpid: "drop_cc", width: 100, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });

