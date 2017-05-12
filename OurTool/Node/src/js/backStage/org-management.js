
var Lui = require('../../LUI/js/lui');
var tool = require('../../LUI/tool');
var lui = new Lui();
var commJs = require("../lib/util.js");//公共方法
//发送请求调取省市县数据
var arrS = [];//省
var arrSs = [];//市
var arrX = [];//县
var orgId = 0;//当前的orgId

var arrStuNums = [];//学生数量
var arrTeacherNums = [];//教师数量
var arrSchoolNums = [];//校区数量
var arrEarning = [];//年营收



//arrS.push({ name: '北京市', id: '110000', pid: '110000' });
//arrSs.push({ name: '北京市', id: '110000', pid: '110000' });
//arrX.push({ name: '东城区', id: '110101', pid: '110101' });


//机构类型的下拉
lui.initDropDownList({ warpid: "drop_type", width: 85, nameField: 'name', idField: 'id', data: [{ name: '全部', id: '0', pid: '' }, { name: '金牌', id: '1', pid: '00' }, { name: '银牌', id: '2', pid: '00' }] });
//合作类型的下拉
lui.initDropDownList({ warpid: "drop_hz", width: 120, nameField: 'name', idField: 'id', data: [{ name: '金牌', id: '1', pid: '' }] });
//合同期限的下拉
lui.initDropDownList({ warpid: "drop_ht", width: 160, nameField: 'name', idField: 'id', data: [{ name: '一年', id: '1', pid: '' }, { name: '二年', id: '2', pid: '00' }, { name: '三年', id: '3', pid: '00' }] });
//签约渠道的下拉
lui.initDropDownList({ warpid: "drop_qd1", width: 150, subtextlength: 10, nameField: 'name', idField: 'id', data: [{ name: '渠道类型', id: '0', pid: '0' },{ name: '魔方格销售部', id: '1', pid: '1' }, { name: '地方渠道代理', id: '2', pid: '2' }, { name: '客户转介绍', id: '3', pid: '3' }, { name: '自主上门', id: '4', pid: '4' }, { name: '内部测试', id: '5', pid: '5' }] });
lui.initDropDownList({ warpid: "drop_qd2", width: 100, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
//////省的下拉（下面）
//lui.initDropDownList({ warpid: "drop_sheng", width: 60, nameField: 'name', idField: 'id', data: arrS });
//////市的下拉
//lui.initDropDownList({ warpid: "drop_shi", width: 60, nameField: 'name', idField: 'id', data: arrSs });
//////县的下拉
//lui.initDropDownList({ warpid: "drop_x", width: 60, nameField: 'name', idField: 'id', data: arrX });
//区域等级的下拉
lui.initDropDownList({ warpid: "drop_qy", width: 90, nameField: 'name', idField: 'id', data: [{ name: '区域等级', id: '0', pid: '0' },{ name: '一线', id: '1', pid: '1' }, { name: '二线', id: '2', pid: '2' }, { name: '三线', id: '3', pid: '3' }, { name: '四线', id: '4', pid: '4' }, { name: '县城', id: '5', pid: '5' }, { name: '乡镇', id: '6', pid: '6' }] });
//生产源量的下拉
//lui.initDropDownList({ warpid: "drop_StuNums", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
//校区数量下拉
//lui.initDropDownList({ warpid: "drop_SchoolNums", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
//教研评级下拉12
lui.initDropDownList({ warpid: "drop_jy", width: 180, nameField: 'name', idField: 'id', data: [{ name: 'A级', id: '1', pid: '1' }, { name: 'B级', id: '2', pid: '2' }] });
//销售额的下拉13 年营收
//lui.initDropDownList({ warpid: "drop_Earning", width: 180, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
////教师数量的下拉
//lui.initDropDownList({ warpid: "drop_TeacherNums", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });

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
//添加机构的弹出层事件
tool.pophide($('.eg-pop .close'), $('.eg-pop'));
//tool.popshow($('.addbtn '), $('#addorg-pop'));
//机构详情的弹出层事件
tool.popshow($('.see-detail '), $('#addorg-name'));

//多选框的点击
tool.checkBoox();
//后台交互
var tplTableOrg = require("OrgManage/OrgManageList.tpl");
require("../../tpl/template-helpers.js");
//分页
var pop = require("../lib/popup/popuptip.js");
var loadimg = require("../lib/popup/showloadimg.js");
var Paginator = require('../lib/page/Paginator.js');
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();

    },

    render: function () {
        //加载列表
        GetOrgData();

    },
    initBtns: function () {
        //todo 绑定事件
        //搜索
        $("body").delegate("#searchImg", "click", function () {
            GetOrgData(1);

        });
        //添加机构
        $("body").delegate("#addOrgBtn", "click", function () {

            GetSData();//初始化省市数据  添加机构的时候触发
            $("#addorg-pop").show();
            $('.pop-mask').show();



        });

        //详情页跳转
        $("body").delegate(".see-detail", "click", function () {
            var dataId = $(this).attr("data-id");
            window.location.href = "/Management/OrgManage/OrgDetail/" + dataId;

        });
        //展示完的确定的删除弹窗
        $("body").delegate("#loginShowBtn", "click", function () {
            $(".eg-pop .close").click();//关闭弹窗
        });


        $("body").delegate("#btnOk", "click", function () {
            var jsonAdd = {};
            jsonAdd.OrgName = escape($("#txtorgname").val().trim());
            jsonAdd.LinkMan = escape($("#txtorgcon").val());//联系人
            jsonAdd.LinkManTel = $("#txtcontel").val();
            jsonAdd.ProvinceId = $("#drop_sheng").attr("data-id");//省
            jsonAdd.CityId = $("#drop_shi").attr("data-id");
            jsonAdd.CountyId = $("#drop_x").attr("data-id");
            jsonAdd.AreaLeval = $("#drop_qy").attr("data-id");
            jsonAdd.Addr = escape($("#txtconaddr").val());
          
            jsonAdd.SellerId = 0;//签约人默认值页面没展示
            jsonAdd.SellerMan = escape($("#txtSaleMan").val().trim());//签约人SellerMan
            jsonAdd.ChannelId = $("#drop_qd1").attr("data-id");//签约渠道
            jsonAdd.CoType = $("#drop_hz").attr("title");//1金牌，2银牌
            var ht = $("#drop_ht").attr("title");
           
            switch (ht) {
                case "一年":
                    jsonAdd.CoYear = 1;
                    break;
                case "二年":
                    jsonAdd.CoYear = 2;
                    break;
                case "三年":
                    jsonAdd.CoYear = 3;
                    break;


                default:
            }

            jsonAdd.TeachType = 1; //$("#drop_jy").attr("data-id");//教研评级：1为教研A级；2为教研B级；写死
            jsonAdd.Sales = $("#drop_Earning").attr("title");//销售额/年
            jsonAdd.Schools = $("#drop_SchoolNums").attr("title");//校区数量
            jsonAdd.Teachers = $("#drop_TeacherNums").attr("title");//教师数量
            jsonAdd.Students = $("#drop_StuNums").attr("title");//学生数量
            
            
            
            
           
            
            jsonAdd.Remark = escape($("#txtmark").val());//备注
            if (jsonAdd.OrgName.length < 1) {
                $("#addTip").css({ "visibility": "visible" }).html("机构名称不能为空！");

                return;
            }
            if (jsonAdd.LinkMan.length < 1) {
                $("#addTip").css({ "visibility": "visible" }).html("机构联系人不能为空！");
                return;
            }
            if (jsonAdd.LinkManTel.length < 1) {
                $("#addTip").css({ "visibility": "visible" }).html("电话格式不对！");


                return;
            }

          

            //校验电话
            if (!IsMobile(jsonAdd.LinkManTel)) {
                $("#addTip").css({ "visibility": "visible" }).html("电话格式不对！");

                return;

            }
            //新添加(省)
            if (jsonAdd.ProvinceId=="0") {
                $("#addTip").css({ "visibility": "visible" }).html("省不能为空！");


                return;
            }
            //新添加（市）
            if (jsonAdd.CityId=="0") {
                $("#addTip").css({ "visibility": "visible" }).html("市不能为空！");


                return;
            }
            //新添加（县）
            if (jsonAdd.CountyId=="0") {
                $("#addTip").css({ "visibility": "visible" }).html("县不能为空！");


                return;
            }
            //新添加（区域等级）
            if (jsonAdd.AreaLeval=="0") {
                $("#addTip").css({ "visibility": "visible" }).html("区域等级不能为空！");


                return;
            }
            //新添加（渠道类型）
            if (jsonAdd.ChannelId=="0") {
                $("#addTip").css({ "visibility": "visible" }).html("渠道类型不能为空！");


                return;
            }


            //end





            //地址不能为空
            if (jsonAdd.Addr.length < 1) {
                $("#addTip").css({ "visibility": "visible" }).html("地址不能为空！");

                return;
            }

            //校验校区数量
            if ($("#drop_SchoolNums").attr("data-id")=="0") {
                $("#addTip").css({ "visibility": "visible" }).html("校区数量必选！");



                return;

            }

            //校验老师数量
            if ($("#drop_TeacherNums").attr("data-id") == "0") {
                $("#addTip").css({ "visibility": "visible" }).html("教师数量必选！");



                return;

            }

            //校验年生源量
            if ($("#drop_StuNums").attr("data-id") == "0") {
                $("#addTip").css({ "visibility": "visible" }).html("学生数量必选！");



                return;

            }


            //提交表单
            $.ajax({
                type: "post",
                url: "/Management/OrgManage/CheckOrgPhone",
                dataType: "json",
                data: {

                    data: jsonAdd.LinkManTel, orgId: -1
                },
                success: function (data) {


                    if (data.Data == "0") {

                        $(".eg-pop .close").click();//关闭弹窗
                        //提交表单
                        $.ajax({
                            type: "post",
                            url: "/Management/OrgManage/AddMfgOrg",
                            dataType: "json",
                            data: {

                                data: JSON.stringify(jsonAdd)
                            },
                            success: function (data) {

                                //进行显示赋值
                                $("#orgName").html($("#txtorgname").val().trim());//机构名不要加密过的
                                $("#txtShowPersonName").html($("#txtorgcon").val().trim());//负责人
                                //$("#loginId").html(data.Data);//登录账号
                                $("#loginTel").html(jsonAdd.LinkManTel);//电话
                                $("#addorg-name").show();
                                $('.pop-mask').show();
                                //alert(data + "添加成功");
                                GetOrgData();//重新加载列表

                            }
                        });
                    } else {
                        //alert("电话重复");
                        $("#addTip").css({ "visibility": "visible" }).html("电话重复！");

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


        //储值
        $("body").delegate(".cz", "click", function () {
            $("#addTipM").css({ "visibility": "hidden" });
            orgId = $(this).attr("data-id");//当前的机构id
            $("#orgNameShow").html($(this).attr("data-name"));//机构的名称
            $("#txtOrgMoney,#txtOrgValue,#txtRemarks").val("");//清空
            $("#addCz").html("");//清空上次

            $('#save-pop').show();
            $('.pop-mask').show();

        });

        //储值信息的提交表单
        $("body").delegate("#btnCzOk", "click", function () {
            var jsonAddCz = {};
            jsonAddCz.OrgId = orgId;
            jsonAddCz.OrgMoney = $("#txtOrgMoney").val();//付款金额
            jsonAddCz.DisCount = 1; //$("#drop_zk").attr("data-id");//折扣  
            jsonAddCz.OrgValue = $("#txtOrgValue").val();//奖励储值  checkImg
            jsonAddCz.Remarks = escape($("#txtRemarks").val());//备注
            jsonAddCz.AfterValue = escape($("#addCz").html());//最后的总的计算钱数
            //var cssVal0 = $("#checkImg").css("visibility");

            //if (cssVal0 === "hidden") {

            //    jsonAddCz.OrgValue = "0";
            //}

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

                    GetOrgData(1);//重新加载

                }
            });



        });
        //储值的取消
        $("body").delegate("#addMCancel", "click", function () {
            $("#save-pop").hide();
            $('.pop-mask').hide();
        });

    }


};

var titleO = "全部";//$("#drop_type").attr("title")  定义全局变量来监听改变事件
var dataType = "0";
//绑定数据
$(function () {
    module.init();
    OptTypeSel();


});


//处理下拉列表
function OptTypeSel() {
    $("#drop_type li").click(function () {
        var titleN = $(this).attr("title");
        dataType = $(this).attr("data-id");


        if (titleO != titleN) {
            titleO = titleN;//重新赋值
            GetOrgData();

        }


    });

}


//发送请求调取数据
function GetOrgData(page) {
    //$("#divLoading").show();

    loadimg.ShowLoadingForTableNoClass($("#tb"), 12);//不要tr样式的清除
    if (page == undefined) {
        page = 1;
    }

    var pageSize = 10;
    var json = {};
    json.OrgType = dataType;//0:全部，1金牌，2银牌
    json.KeyWord = escape($("#txtserch").val());
    //加载机构列表
    $.ajax({
        type: "post",
        url: "/Management/OrgManage/GetOrgList",
        dataType: "json",
        data: {
            //OrgType: dataType,
            //KeyWord: escape($("#txtserch").val()) //$("#tagId").val()
            data: JSON.stringify(json), PageIndex: page, PageSize: pageSize
        },
        success: function (data) {


            if (data.Data && data.Data.length > 0) {
                $("#tb").html(tplTableOrg(data.Data));
                //$("#Totalcount").html(data.PageSum);
                //Paginator.Paginator(10, page, data.PageSum, loadExamStu);
                //加载列表
                Paginator.Paginator(pageSize, page, data.PageSum, GetOrgData);


            }
            else {

                $("#tb").html("");
                //<img src="../../../bundle/img/noclass.png" style="text-align:center;">
                $("#tb").html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="8"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;"><br/><span>暂无数据！</span></div></div></td></tr>');//清空数据
                $("#pagination").html("");//分页控件不显示
                $("#Totalcount").html(0);//数据设置为0
                $("#bandTotalcount").html(0);//禁用




            }
        }
    });

}


var Scode = "110000";//省的代码
var Sscode = "110000";//市
var Xcode = "110101";//县
var provinceData = {};//省市全部数据
var xData = {};//县的数据
//发送请求调取省数据
function GetSData() {
    var json = {};
    json.Parent = dataType;//0:全部，1金牌，2银牌
    json.KeyWord = escape($("#txtserch").val());
    arrS = [];//加载前进行清空
    //加载机构列表
    $.ajax({
        type: "post",
        url: "/Management/OrgManage/GetProvinceAndCity",
        dataType: "json",
        data: {
            data: JSON.stringify(json)
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {

                provinceData = data.Data;
                arrS.push({ name:"省", id: 0, pid: 0});//省
                for (var i = 0; i < data.Data.length; i++) {

                    arrS.push({ name: data.Data[i].Name, id: data.Data[i].Code, pid: data.Data[i].Code });//省
                }

                lui.initDropDownList({ warpid: "drop_sheng", subtextlength: 6, width: 85, nameField: 'name', idField: 'id', data: arrS, selectedCallBack: OptSxBind });//省

                BindEmptySx();//绑定空的数据
                loadEarning();//绑定年营收
            }
            else {

                alert("获取数据失败");

            }
        }
    });

}



//绑定空的市县
function BindEmptySx() {

    arrSs.length = 0;
    arrX.length = 0;
    //添加默认值

    arrSs.push({ name: "市", id: 0, pid: 0 });//市区
    arrX.push({ name: "区县", id: 0, pid: 0 });//县
    
    lui.initDropDownList({ warpid: "drop_shi", width: 90, nameField: 'name', idField: 'id', data: arrSs, selectedCallBack: OptShiBind });//市
    lui.initDropDownList({
        warpid: "drop_x", width: 90, nameField: 'name', idField: 'id', data: arrX
    });//县

    //绑定生源


}




//计算总额
function CalMoney() {


    var total = 0;
    var zk = $("#drop_zk").attr("data-id");
    if ($("#txtOrgMoney").val() != "") {

        total = parseFloat($("#txtOrgMoney").val());// / parseFloat(zk)
    }
    //var cssVal = $("#checkImg").css("visibility");
    //if (cssVal != "hidden") {


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



//校验是不是电话
function IsMobile(obj) {
    return (/^1[3|4|5|7|8]\d{9}$/.test(obj));
}


//绑定市县
function BindSx(scode) {

    arrSs.length = 0;
    arrX.length = 0;
    //添加默认值

    arrSs.push({ name: "市", id: 0, pid: 0 });//市区
    arrX.push({ name: "区县", id: 0, pid: 0 });//县
    for (var i = 0; i < provinceData.length; i++) {
        if (provinceData[i].Code == scode) {
            xData = provinceData[i].CityList[0].AreaList;//赋值县的数据
            for (var j = 0; j < provinceData[i].CityList.length; j++) {
                arrSs.push({
                    name: provinceData[i].CityList[j].Name, id: provinceData[i].CityList[j].Code, pid: '1'
                });//市
            }

        }

    }

    for (var k = 0; k < xData.length; k++) {
        arrX.push({
            name: xData[k].Name, id: xData[k].Code, pid: '1'
        });//县

    }
    lui.initDropDownList({ warpid: "drop_shi", width: 90, nameField: 'name', idField: 'id', data: arrSs, selectedCallBack: OptShiBind });//市
    lui.initDropDownList({
        warpid: "drop_x", width: 90, nameField: 'name', idField: 'id', data: arrX
    });//县

    //绑定生源


}
//绑定县参数传递市的code
function Bindx(sscode) {

    arrSs.length = 0;
    arrX.length = 0;
    for (var i = 0; i < provinceData.length; i++) {
        if (provinceData[i].Code == Scode) {

            for (var j = 0; j < provinceData[i].CityList.length; j++) {
                if (provinceData[i].CityList[j].Code == sscode) {
                    xData = provinceData[i].CityList[j].AreaList;//赋值对应的县的数据

                }

            }


        }

    }
    arrX.push({
        name: "区县", id:0, pid: 0
    });//县
    for (var k = 0; k < xData.length; k++) {
        arrX.push({
            name: xData[k].Name, id: xData[k].Code, pid: '1'
        });//县

    }
    //lui.initDropDownList({ warpid: "drop_shi", width: 60, nameField: 'name', idField: 'id', data: arrSs });//市
    lui.initDropDownList({
        warpid: "drop_x", width: 90, nameField: 'name', idField: 'id', data: arrX
    });//县


}

//绑定事件
function OptSxBind() {
    Scode = $("#drop_sheng").attr("data-id");

    BindSx(Scode);

}

//市区的下拉点击的时候
function OptShiBind() {
    Sscode = $("#drop_shi").attr("data-id");

    Bindx(Sscode);

}



//绑定年营收
function loadEarning() {

    $.ajax({
        type: "post",
        url: "/Management/OrgManage/GetOrgDropByType",
        dataType: "json",
        data: {
            type: "10"//年营收：200万以下、200～500万、500万～1000万（默认选中）、1000～2000万、2000～5000万、5000万～1亿、1亿以上
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {

                for (var i = 0; i < data.Data.length; i++) {

                    arrEarning.push({ name: data.Data[i].Name, id: data.Data[i].Id, pid: data.Data[i].Id });
                }

                lui.initDropDownList({ warpid: "drop_Earning", width: 180, nameField: 'name', idField: 'id', data: arrEarning, selectedCallBack: null, subtextlength: 15, defaultValue: 3, defaultText: "500万～1000万" });

                loadSchoolNums();//加载校区数量
            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}

//绑定校区数量
function loadSchoolNums() {
    arrSchoolNums = [];//加载前进行清空
    $.ajax({
        type: "post",
        url: "/Management/OrgManage/GetOrgDropByType",
        dataType: "json",
        data: {
            type: "11"//校区数量：5个以下、5～10个、10～20个、20～50个、50～100个、100个以上
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {
                arrSchoolNums.push({
                    name: "校区数量", id: 0, pid: 0
                });
                for (var i = 0; i < data.Data.length; i++) {

                    arrSchoolNums.push({ name: data.Data[i].Name, id: data.Data[i].Id, pid: data.Data[i].Id });
                }

                lui.initDropDownList({ warpid: "drop_SchoolNums", width: 140, nameField: 'name', idField: 'id', data: arrSchoolNums, selectedCallBack: null, subtextlength: 15 });

                loadTeacherNums();//老师数量
            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}

//绑定老师数量
function loadTeacherNums() {
    arrTeacherNums = [];//加载前进行清空
    $.ajax({
        type: "post",
        url: "/Management/OrgManage/GetOrgDropByType",
        dataType: "json",
        data: {
            type: "12"//老师数量：20人以下、20～50人、50～100人、100～200人、200～500人、500人以上
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {
                arrTeacherNums.push({
                    name: "老师数量", id: 0, pid: 0
                });
                for (var i = 0; i < data.Data.length; i++) {

                    arrTeacherNums.push({ name: data.Data[i].Name, id: data.Data[i].Id, pid: data.Data[i].Id });
                }

                lui.initDropDownList({ warpid: "drop_TeacherNums", width: 140, nameField: 'name', idField: 'id', data: arrTeacherNums, selectedCallBack: null, subtextlength: 15 });

                loadStuNums();//年生源量
            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}

//绑定年生源量
function loadStuNums() {
    arrStuNums = [];//加载前进行清空
    $.ajax({
        type: "post",
        url: "/Management/OrgManage/GetOrgDropByType",
        dataType: "json",
        data: {
            type: "13"//年生源量：500人以下、500～1000人、1000～2000人、2000～5000人、5000～10000人、10000人以上
        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {
                arrStuNums.push({
                    name: "年生源量", id: 0, pid: 0
                });//学校
                for (var i = 0; i < data.Data.length; i++) {

                    arrStuNums.push({ name: data.Data[i].Name, id: data.Data[i].Id, pid: data.Data[i].Id });
                }

                lui.initDropDownList({ warpid: "drop_StuNums", width: 140, nameField: 'name', idField: 'id', data: arrStuNums, selectedCallBack: null, subtextlength: 15});


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
//校验
function OptCheck() {

    $("#txtorgname,#txtorgcon").keyup(function () {

        if (this.value.length > 1) {
            $("#addTip").css({ "visibility": "hidden" });
        }

    });

    $("#txtcontel").keyup(function () {
        if (commJs.IsMobile(this.value)) {
            $("#addTip").css({ "visibility": "hidden" });
        } else {
            $("#addTip").css({ "visibility": "visible" }).html("手机格式不对！");
        }

    });

    //校验金额
    $("#txtOrgMoney").keyup(function () {

        if (this.value.length > 1) {
            $("#addTipM").css({ "visibility": "hidden" });
        }

    });



}




//回车事件
$(function () {
    $('#txtserch').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            GetOrgData(1);

        }
    });
});




