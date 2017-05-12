
var Lui = require('../../LUI/js/lui');
var tool = require('../../LUI/tool');
var ut = require('../lib/util.js');//校验
var pop = require("../lib/popup/popuptip.js");//提示消息

var lui = new Lui();
//编辑的弹出层事件
tool.pophide($('.eg-pop .close,.eg-pop .cancel'), $('.eg-pop'));
//tool.popshow($('.editMesg '),$('#edit-pop'));
//储值的弹出层事件
//tool.popshow($('.saveVal '),$('#save-pop'));

//机构详情的弹出层事件
/*
tool.popshow($('.see-detail '),$('#addorg-name'));*/
//奖励之前面的选项
tool.checkBoox();
//合同类型下拉
lui.initDropDownList({ warpid: "drop_ht", width: 90, nameField: 'name', idField: 'id', data: [{ name: '金牌', id: '1', pid: '1' }, { name: '银牌', id: '2', pid: '2' }] });
//教研评级下拉
lui.initDropDownList({
    warpid: "drop_jy", width: 85, nameField: 'name', idField: 'id', data: [{ name: 'A级', id: '1', pid: '1' }, { name: 'B级', id: '2', pid: '2' }]
});
//合同延期的下拉
lui.initDropDownList({ warpid: "drop_htyq", width: 150, nameField: 'name', idField: 'id', data: [{ name: '一年', id: '1', pid: '' }, { name: '二年', id: '2', pid: '00' }, { name: '三年', id: '3', pid: '00' }, { name: '四年', id: '4', pid: '00_01' }] });
//储值折扣的下拉
//lui.initDropDownList({ warpid: "drop_czzk", width: 150, nameField: 'name', idField: 'id', data: [{ name: '九折', id: '9', pid: '' }, { name: '八折', id: '8', pid: '00' }, { name: '七折', id: '7', pid: '00' }, { name: '六折', id: '6', pid: '00_01' }, { name: '五折', id: '5', pid: '00_01' }, { name: '四折', id: '4', pid: '00_02' }] });
//折扣的下拉
lui.initDropDownList({
    warpid: "drop_zk", width: 90, nameField: 'name', idField: 'id', data: [{
        name: '一折', id: '0.1', pid: '00_02'
    }, {
        name: '二折', id: '0.2', pid: '00_02'
    }, {
        name: '三折', id: '0.3', pid: '00_02'
    }, {
        name: '四折', id: '0.4', pid: '00_02'
    }, { name: '五折', id: '0.5', pid: '00_01' }, { name: '六折', id: '0.6', pid: '00_01' }, {
        name: '七折', id: '0.7', pid: '00'
    }, {
        name: '八折', id: '0.8', pid: '00'
    }, { name: '九折', id: '0.9', pid: '' }]
});


//后台交互
var tplTableOrgDetail = require("OrgManage/OrgDetail.tpl");
var orgId = $("#orgId").val();//机构id，从后台返回的隐藏值
var orgName = "";//作为全局变量取值
//var oldCoYear = 0;//旧的合作年限
require("../../tpl/template-helpers.js");
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();

    },

    render: function () {
        //详情数据(绑定)
        GetSingleOrg();

    },
    initBtns: function () {
        //todo 绑定事件 委托事件
        //编辑
        $("body").delegate("#editBtn", "click", function () {
            $('#edit-pop').show();
            $('.pop-mask').show();

        });

        //储值
        $("body").delegate("#storeBtn", "click", function () {
            //进行清空弹窗数据
            $("#txtOrgMoney,#txtOrgValue,#txtRemarks").val("");
            $("#addCz").html("");
            // initDropDownZk();//初始化折扣


            $('#save-pop').show();
            $('.pop-mask').show();

        });

        //编辑的提交
        $("body").delegate("#updateOrgBtn", "click", function () {
            var jsonAdd = {};

            jsonAdd.OrgId = orgId;
            jsonAdd.OrgName = escape($.trim($("#txtOrgName").val()));//机构名称
            jsonAdd.CoType = $("#drop_ht").attr("title");//1金牌，2银牌
            jsonAdd.TeachType = $("#drop_jy").attr("data-id");//教研A级B级
            jsonAdd.CoYear = $("#drop_htyq").attr("data-id");//合作期限

            //jsonAdd.OldCoYear = oldCoYear;//老的合作期限
            jsonAdd.LinkMan = escape($("#txtorgcon").val());//联系人
            jsonAdd.LinkManTel = $("#txtcontel").val();
            jsonAdd.Addr = escape($("#txtconaddr").val());
            jsonAdd.Remark = escape($("#txtmark").val());//备注

            if (jsonAdd.LinkMan.length < 1) {
                $("#addTipU").css({ "visibility": "visible" }).html("机构联系人不能为空！");
                //alert("机构联系人不能为空");
                return;
            }
            if (jsonAdd.LinkManTel.length < 1) {
                $("#addTipU").css({ "visibility": "visible" }).html("电话格式不对！");
                //alert("机构电话不能为空");
                return;
            }

            //校验电话
            if (!ut.IsMobile(jsonAdd.LinkManTel)) {
                $("#addTipU").css({ "visibility": "visible" }).html("电话格式不对！");

                //alert("电话格式不对");
                return;

            }


            //提交表单
            $.ajax({
                type: "post",
                url: "/Management/OrgManage/CheckOrgPhone",
                dataType: "json",
                data: {

                    data: jsonAdd.LinkManTel, orgId: orgId
                },
                success: function (data) {


                    if (data.Data == "0") {

                        $(".eg-pop .close").click();//关闭弹窗
                        //提交表单
                        $.ajax({
                            type: "post",
                            url: "/Management/OrgManage/UpdateSingleOrg",
                            dataType: "json",
                            data: {

                                data: JSON.stringify(jsonAdd)
                            },
                            success: function (data) {

                                GetSingleOrg();//成功之后重新调取数据
                                //alert("添加成功");
                                pop.PopTipShow("操作成功");

                            }
                        });
                    } else {
                        //alert("电话重复");
                        $("#addTipU").css({ "visibility": "visible" }).html("电话重复！");

                    }

                }
            });







        });

        //机构付款金额和奖励储值失去焦点的时候
        $("body").delegate("#txtOrgMoney,#txtOrgValue", "blur", function () {
            CalMoney();
        });

        //checkbox点击的时候
        $("body").delegate("#checkBoxSpan", "click", function () {

            CalMoney();
        });


        //储值信息的提交表单
        $("body").delegate("#btnCzOk", "click", function () {
            var jsonAddCz = {};
            jsonAddCz.OrgId = orgId;
            jsonAddCz.OrgMoney = $("#txtOrgMoney").val();//付款金额
            jsonAddCz.DisCount = 1;//$("#drop_zk").attr("data-id");//折扣  
            jsonAddCz.OrgValue = $("#txtOrgValue").val();//奖励储值  checkImg
            jsonAddCz.Remarks = escape($("#txtRemarks").val());//备注
            jsonAddCz.AfterValue = escape($("#addCz").html());//最后的总的计算钱数


            if (jsonAddCz.OrgValue == "") {
                jsonAddCz.OrgValue = 0;
            }
            if (jsonAddCz.OrgMoney.length < 1) {
                $("#addTipM").css({ "visibility": "visible" }).html("机构付款金额不能为空！");
                //alert("机构付款金额不能为空");
                return;
            }
            //提交表单
            $.ajax({
                type: "post",
                url: "/Management/OrgManage/AddOrgMoney",
                dataType: "json",
                data: {

                    data: JSON.stringify(jsonAddCz)
                },
                success: function (data) {

                    $(".eg-pop .close").click();//关闭弹窗
                    GetSingleOrg();//重新请求

                    // alert("添加成功");
                    //pop.PopTipShow("添加成功");

                }
            });



        });



        //机构账号冻结
        $("body").delegate("#froBtn", "click", function () {
            var str = $("#froBtn").html();
            pop.OpenConfrimPop("确认" + str + "?", "Confrim", str + "提示");



        });
        //确定禁用
        $("body").delegate("#Confrim", "click", function () {
            var subVal = $("#froBtn").attr("data-id");
            //提交表单
            $.ajax({
                type: "post",
                url: "/Management/OrgManage/FrozenAccount",
                dataType: "json",
                data: {
                    data: orgId, type: subVal
                },
                success: function (data) {

                    $(".eg-pop").hide();
                    $(".pop-mask").hide();//隐藏

                    //alert("冻结成功");
                    //pop.PopTipShow("操作成功");
                    if (subVal == "1") {//启用
                        $("#froBtn").html("启用账号");
                        $("#froBtn").attr("data-id", "0");


                    } else {
                        $("#froBtn").html("冻结账号");
                        $("#froBtn").attr("data-id", "1");

                    }

                }
            });

        });


    }


};


//绑定数据
$(function () {
    module.init();
    OptDrop();


});





//发送请求调取数据
function GetSingleOrg() {


    //加载机构列表
    $.ajax({
        type: "post",
        url: "/Management/OrgManage/GetSingleOrg",
        dataType: "json",
        data: {
            orgId: orgId
        },
        success: function (data) {

            if (data.Data) {
                orgName = data.Data.OrgName;//赋值机构名称
                $("#content").html(tplTableOrgDetail(data.Data));//读取模板加载
                //加载编辑框的内容
                $("#drop_ht").attr("title", data.Data.CoType);
                $("#spandrop_ht").html(data.Data.CoType);
                if (data.Data.TeachType == "1") {
                    $("#drop_jy").attr("title", "A级");
                    $("#drop_jy").attr("data-id", 1);
                    $("#spandrop_jy").html("A级");

                } else {
                    $("#drop_jy").attr("title", "B级");
                    $("#drop_jy").attr("data-id", 2);
                    $("#spandrop_jy").html("B级");

                }

                $("#drop_htyq").attr("title", GetNumTran(data.Data.CoYear) + "年");//合同延期
                $("#spandrop_htyq").html(GetNumTran(data.Data.CoYear) + "年");//合同延期显示赋值
                $("#drop_htyq").attr("data-id", data.Data.CoYear);

                $("#experTime").html(data.Data.ExpireTimeStr);//直接赋值字符串
                $("#txtorgcon").val(data.Data.LinkMan);
                $("#txtcontel").val(data.Data.LinkManTel);
                $("#txtconaddr").val(data.Data.Addr);
                $("#txtmark").val(data.Data.Remark);
                //oldCoYear = data.Data.CoYear;//后台需要进行减法处理（暂时不需要）
                //储值信息赋值
                $("#orgName").html(orgName);
                $("#txtOrgName").val(orgName);//机构名称修改
                if (data.Data.IsFrozen) {//禁用1启用0
                    $("#froBtn").attr("data-id", "0");
                    $("#froBtn").html("启用账号");


                } else {
                    $("#froBtn").attr("data-id", "1");//
                    $("#froBtn").html("冻结账号");


                }


            }
            else {
                alert("获取数据失败");
                $("#content").html("");



            }
        }
    });

}


//针对下拉框的//折扣点击的时候
function OptDrop() {
    $("#drop_zk li").click(function () {
        CalMoney();
    });

}



//计算总额
function CalMoney() {


    var total = 0;
    var zk = $("#drop_zk").attr("data-id");
    if ($("#txtOrgMoney").val() != "") {

        total = parseFloat($("#txtOrgMoney").val());/// parseFloat(zk)
    }
    //var cssVal = $("#checkImg").css("visibility");
    //if (cssVal != "hidden") {
    //    if ($("#txtOrgValue").val() != "") {
    //        total = parseFloat($("#txtOrgValue").val()) + total;//不再进行判断

    //    }

    //}


    if ($("#txtOrgValue").val() != "") {
        total = parseFloat($("#txtOrgValue").val()) + total;

    }
    
    if (total >= 0) {
        total = total.toFixed(2);//保留两位小数
        $("#addCz").html(total);
    } else {
        
        $("#txtOrgMoney,#txtOrgValue").val("");//异常数据

    }


}








//进行转换
function GetNumTran(num) {

    switch (num) {
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六";
        case 7:
            return "七";
        case 8:
            return "八";
        case 9:
            return "九";
        case 10:
            return "十";


    }

}
//进行初始化折扣
function initDropDownZk() {
    //折扣的下拉
    lui.initDropDownList({
        warpid: "drop_zk", width: 90, nameField: 'name', idField: 'id', data: [{
            name: '一折', id: '0.1', pid: '00_02'
        }, {
            name: '二折', id: '0.2', pid: '00_02'
        }, {
            name: '三折', id: '0.3', pid: '00_02'
        }, {
            name: '四折', id: '0.4', pid: '00_02'
        }, { name: '五折', id: '0.5', pid: '00_01' }, { name: '六折', id: '0.6', pid: '00_01' }, {
            name: '七折', id: '0.7', pid: '00'
        }, {
            name: '八折', id: '0.8', pid: '00'
        }, { name: '九折', id: '0.9', pid: '' }]
    });

}






//添加实时校验
$(function () {
    OptCheck();

});
//校验
function OptCheck() {


    //校验金额
    $("#txtOrgMoney").keyup(function () {

        if (this.value.length > 1) {
            $("#addTipM").css({ "visibility": "hidden" });
        }

    });



}




