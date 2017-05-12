
var tool = require('../../LUI/tool');
//单选按钮
tool.radio();
//添加员工的弹出层事件
tool.pophide($('.eg-pop .close'), $('.eg-pop'));
tool.popshow($('.addstuff'), $('#addStuff'));
var Lui = require('../../LUI/js/lui');
var lui = new Lui();
var arrJxd = [];//校区的数组
//角色
//lui.initDropDownList({ warpid: "drop_role", width: 260, nameField: 'name', idField: 'id', subtextlength: 15, data: [{ name: '校区管理员', id: '3', pid: '' }, { name: '老师', id: '4', pid: '00' }] });
//校区
//lui.initDropDownList({ warpid: "drop_sc", width: 260, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });

//后台交互
require("../../tpl/template-helpers.js");
var pop = require("../lib/popup/popuptip.js");
var loadimg = require("../lib/popup/showloadimg.js");
var Paginator = require('../lib/page/Paginator.js');
var commJs = require("../lib/util.js");//公共方法

var calender = require('../lib/calendar/calender-plugin.js');
//require('../lib/calendar/calender-plugin.min.css');
//var tplTablePer = require("PersonManage/PersonManageList.tpl");//员工模板
var dataId = $("#perId").val();
var defRole = 0;//默认角色
var defSc = 0;//默认学校
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
       
        calender("#txtEnterTime",null,300);
        //加载
        GetPerSingle();

    },
    initBtns: function () {
        //todo 绑定事件
       
        //修改确定请求
        $("body").delegate("#btnSave", "click", function () {

            var jsonAdd = {};
            jsonAdd.UserId = dataId;
            jsonAdd.UserName = escape($.trim($("#txtPreName").val()));
            jsonAdd.Tel = $.trim($("#perTel").val());
            if ($("#sexMan").hasClass("active")) {
                jsonAdd.Gender = 1;//1为男，0为女
            } else {
                jsonAdd.Gender = 0;
            }
            jsonAdd.EnterTime = $.trim($("#txtEnterTime").val());//入职时间
            //jsonAdd.UserRole = $("#drop_role").attr("data-id");//角色不在修改
            jsonAdd.SchoolId = $("#drop_sc").attr("data-id");//校区id

            if (jsonAdd.UserName.length < 1) {
                $("#addStuffP").css({ "visibility": "visible" }).html("姓名不能为空！");
              
                return;
            }
            if (jsonAdd.Tel.length < 1) {
                $("#addStuffP").css({ "visibility": "visible" }).html("手机格式不对！");
              
                return;
            }
            //校验电话
            if (!commJs.IsMobile(jsonAdd.Tel)) {
                $("#addStuffP").css({ "visibility": "visible" }).html("手机格式不对！");
             
                return;

            }
           
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/StudentManage/CheckOrgPhone",
                dataType: "json",
                data: {

                    data: jsonAdd.Tel, userId: dataId
                },
                success: function (data) {
                    $("#addStuffP").css({ "visibility": "hidden" });

                    if (data.Data == "0") {

                        $(".eg-pop .close").click();//关闭弹窗
                        //提交表单
                        $.ajax({
                            type: "post",
                            url: "/Org/PersonManage/UpdateOrgPer",
                            dataType: "json",
                            data: {

                                data: JSON.stringify(jsonAdd)
                            },
                            success: function (data) {
                                //跳转
                                window.location.href = "/Org/PersonManage/Index";

                            }
                        });
                    } else {
                        $("#addStuffP").css({ "visibility": "visible" }).html("电话重复！");
                    }

                }
            });



        });

        //处理单选男
        $("body").delegate("#lbMan,#lbWman", "click", function () {

            var type = $(this).attr("data-id");
            $('.radio').removeClass('active');
            if (type == 1) {

                $("#sexMan").addClass('active');

            } else {
                $("#sexWMan").addClass('active');
            }


        });



        //展示完的确定的删除弹窗
        $("body").delegate("#btnloginOk", "click", function () {
            $(".eg-pop .close").click();//关闭弹窗
        });




    }


};

//绑定数据
$(function () {
    module.init();


});




//发送请求调取数据
function GetPerSingle() {
   
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/PersonManage/GetPerSingle",
        dataType: "json",
        data: {
            data: dataId//员工id

        },
        success: function (data) {

            //$("#divLoading").hide();
            if (data.OK) {
                //$("#perTb").html(tplTablePerDetail(data.Data));/手动赋值
                $("#txtPreName").val(data.Data.UserName);
                $("#perTel").val(data.Data.Tel);
                $("#txtEnterTime").val(data.Data.EnterTime);
                if (data.Data.Gender!=1) {//男
                    $('.radio').removeClass('active');
                    $("#sexWMan").addClass('active');//女
                }
                //初始化下拉框    drop_role    drop_sc
                $("#drop_role").html(data.Data.RoleName);
                $("#drop_role").attr("data-id", data.Data.RoleId);
                //lui.initDropDownList({ warpid: "drop_role", width: 260, nameField: 'name', idField: 'id', subtextlength: 15, data: [{ name: '校区管理员', id: '3', pid: '' }, { name: '老师', id: '4', pid: '00' }], defaultValue: data.Data.RoleId, defaultText: data.Data.RoleName });
                
                if (data.Data.RoleId < 3 || data.Data.RoleId == 4) {
                    $("#schoolShow").hide();
                }


                loadSchools(data.Data.SchoolId, data.Data.SchoolName);//加载学校列表并且赋值默认值
            }
            else {

                $("#perTb").html("");
                alert("获取数据失败");

            }
        }
    });

}




//加载学校下拉
function loadSchools(defaultValue,defaultText) {
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
                //arrJxd.push({
                //    name: "全部", id: 0, pid: 0
                //});//学校
                for (var i = 0; i < data.Data.length; i++) {

                    arrJxd.push({ name: data.Data[i].SchoolName, id: data.Data[i].SchoolId, pid: data.Data[i].SchoolId });
                }

                lui.initDropDownList({ warpid: "drop_sc", width: 260, nameField: 'name', idField: 'id', data: arrJxd, selectedCallBack: null, defaultValue: defaultValue, defaultText: defaultText });//学校列表和赋值默认值

            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}




//添加实时校验
$(function () {
    OptCheck();

});

function OptCheck() {

    $("#txtPreName").keyup(function () {
        if (this.value.length > 1) {
            $("#addStuffP").css({ "visibility": "hidden" });
        }

    });

    $("#perTel").keyup(function () {
        if (commJs.IsMobile(this.value)) {
            $("#addStuffP").css({ "visibility": "hidden" });
        } else {
            $("#addStuffP").css({ "visibility": "visible" }).html("手机格式不对！");
        }

    });


}


