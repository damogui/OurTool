
var Lui = require('../../LUI/js/lui');
var lui = new Lui();
//后台交互
require("../../tpl/template-helpers.js");
//var pop = require("../lib/popup/popuptip.js");
var loadimg = require("../lib/popup/showloadimg.js");
var Paginator = require('../lib/page/Paginator.js');
var commJs = require("../lib/util.js");//公共方法
var tplTableCz = require("OrgManage/ResiveAnysis.tpl");//储值模板

var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //加载列表
        GetOrgInfo();

    },
    initBtns: function () {
        //todo 绑定事件
        //搜索
        //$("body").delegate("#searchImg", "click", function () {
        //    GetCzData();

        //});


    }


};

//绑定数据
$(function () {
    module.init();



});

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
              
                if (data.Data.IsRedOrgMoney==1) {
                    $("#orgCurrentValue").removeClass("gray_money").addClass("red_money");
                }

                if (data.Data.IsRedExpireTime==1) {
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
                
            }
        }
    });

    
}




//发送请求调取数据
function GetCzData(page) {
    //$("#divLoading").show();
    loadimg.ShowLoadingForTable($("#tb"), 4);
    if (page == undefined) {
        page = 1;
    }

    var pageSize = 10;
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/OrgStatManage/GetOrgStatList",
        dataType: "json",
        data: {
            data: "", PageIndex: page, PageSize: pageSize//escape($("#txtserch").val())

        },
        success: function (data) {
            if (data.Data && data.Data.length > 0) {

                $("#tb").html(tplTableCz(data.Data));
                $("#Totalcount").html(data.PageSum);
                
                //$("#orgCurrentValue").html(TranNum(data.TagValue));//余额
                Paginator.Paginator(pageSize, page, data.PageSum, GetCzData);

            }
            else {

                $("#tb").html("");
                //<img src="../../../bundle/img/noclass.png" style="text-align:center;">
                $("#tb").html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="5"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;"><br/><span>暂无数据！</span></div></div></td></tr>');//清空数据
                $("#pagination").html("");//分页控件不显示
                $("#Totalcount").html(0);//数据设置为0
                $("#bandTotalcount").html(0);//禁用
                //$("#orgCurrentValue").html(TranNum(data.TagValue));//余额


            }
        }
    });

}

//进行转换1111111变成11,111,111
function TranNum(obj) {
    var v, j, sj, rv = "";
    v = obj.replace(/,/g, "").split(".");
    j = v[0].length % 3;
    sj = v[0].substr(j).toString();
    for (var i = 0; i < sj.length; i++) {
        rv = (i % 3 == 0) ? rv + "," + sj.substr(i, 1) : rv + sj.substr(i, 1);
    }
    var rvalue = (v[1] == undefined) ? v[0].substr(0, j) + rv : v[0].substr(0, j) + rv + "." + v[1];
    if (rvalue.charCodeAt(0) == 44) {
        rvalue = rvalue.substr(1);
    }
      return  rvalue;
}









