var Lui = require('../../LUI/js/lui');
var lui = new Lui();
var a = require('template-helpers.js');
var awardList = {
    awardTypePop: undefined,
    uawardTypePop: undefined,
    //加载学校
    getSchools: function () {
        var ithis = this;
        //加载学校
        $.ajax({
            type: "post",
            url: "/Org/StudentManage/GetOrgSchools",
            dataType: "json",
            data: {
                data: ""
            },
            success: function (data) {
                $("#drop_school").show();
                var arrJxd = [];
                arrJxd.push({
                    name: "全部校区", id: -1
                });//学校
                for (var i = 0; i < data.Data.length; i++) {

                    arrJxd.push({ name: data.Data[i].SchoolName, id: data.Data[i].SchoolId });
                }
                lui.initDropDownList({
                    warpid: "drop_school", width: 125, nameField: 'name', idField: 'id', data: arrJxd, subtextlength: 7,
                    selectedCallBack: function (warpid, value, text) {
                        ithis.initDrawData();
                        ithis.queryobj.schoolID = value;
                        ithis.getData();
                    },
                    loadedCallBack: function (warpid, value, text) {
                        //ithis.initDrawData();
                        ithis.queryobj.schoolID = value;
                        //ithis.getData();
                        ithis.getAwardTypes();

                    }
                });

            },
            error: function (err) {
                console.log(err);
            }
        });

    },
    getAwardTypes: function () {
        var ithis = this;


        $.ajax({
            url: "/Management/CourseManage/GetDicList",
            type: "get",
            async: true,
            data: { dicType: 14 },
            success: function (data) {
                result = data.Data;
                $("#drop_awardtype").show();
                result.unshift({ DicKey: -1, DicValue: "全部类别" });

                lui.initDropDownList({
                    warpid: "drop_awardtype", width: 125, textField: 'DicValue', valueField: 'DicKey', data: result, subtextlength: 7,
                    selectedCallBack: function (warpid, value, text) {
                        ithis.initDrawData();
                        ithis.queryobj.awardType = value;
                        ithis.getData();
                    },
                    loadedCallBack: function (warpid, value, text) {
                        ithis.initDrawData();
                        ithis.queryobj.awardType = value;
                        ithis.getData();

                    }
                });
                result.shift();
                result.unshift({ DicKey: -1, DicValue: "请选择奖品类别" });
                awardTypePop = lui.initDropDownList({
                    warpid: "drop_awardtype_pop", width: 260, textField: 'DicValue', valueField: 'DicKey', data: result, subtextlength: 7,
                    selectedCallBack: function (warpid, value, text) {

                    },

                });
                uawardTypePop = lui.initDropDownList({
                    warpid: "drop_awardtype_pop_u", width: 260, textField: 'DicValue', valueField: 'DicKey', data: result, subtextlength: 7,
                    selectedCallBack: function (warpid, value, text) {

                    },

                });

            },
            error: function () { }
        });

    },
    getData: function () {
        $("#ctable").html('<tr><td colspan=8>' + $("#divLoading").html() + '</td></tr>');
        var nodata = '<tr><td colspan=8><div align="center" style="margin-top: 30px; margin-bottom: 30px;"><br>暂无奖品<br> <br></div></td></tr>'
        var ithis = this;
        $.ajax({
            url: "/Org/Currency/GetAwardList",
            type: "post",
            async: true,
            data: ithis.queryobj,
            success: function (data) {
                if (data.OK) {
                    var tpl = require("OrgManage/awardList");
                    var r = data.Data;
                    var d = { iscg: iscg, data: r };
                    $("#totalNum").text(data.PageSum);
                    if (r.length > 0) {
                        $("#ctable").html(tpl(d));
                        

                    }
                    else {

                        $("#ctable").html(nodata);
                    }
                    $("#pager").html(data.TagValue);
                }

            },
            error: function () {
                $("#ctable").html(nodata);
            }
        });
    },
    initDrawData: function () { },
    showDelAward: function (id) {
        $("#btn-del").attr("data-id", id);
        $("#pop-del,.pop-mask").show();
    },
    delAward: function (id) {
        var ithis = this;
        $.ajax({
            type: "post",
            url: "/Org/Currency/DelAward",
            dataType: "json",
            data: {
                awardID: id
            },
            success: function (data) {
                ithis.showTip("删除成功", function () {
                    ithis.getData();
                });
                
            },
            error: function () { }

        })
    },
    queryobj: { awardType: 0, schoolID: 0, awardID: 0, pageSize: 6, pageIndex: 1 },
    init: function () {
        if (iscg == 1) {
            this.getSchools();
        } else {
            this.getAwardTypes();
        }
        this.bindEvent();
    },
    showTip: function (msg, cb) {
        $(".fixed-success").html(msg);
        $(".fixed-success").show();
        setTimeout(function () { $(".fixed-success").hide(); if (cb) { cb(); } }, 1000);
    },
    PagerClick: function () {

    },

    bindEvent: function () {
        var ithis = this;

        $("#pager").on("click", "a[data-num]", function () {
            ithis.queryobj.pageIndex = $(this).attr("data-num");
            ithis.getData();
        });
        $("#btncreate").click(function () {
            $("#cawardName").val("");
            awardTypePop.setValue(-1);
            ithis.checkradio($("#pop-create").find("label[data-isautocheck]"));
            $("#ccoin-num").val("");
            $("#cremark").val("");
            $("#pop-create").show();
            $(".pop-mask").show();
        });
        $(".eg-pop .close").click(function () {
            $(this).parent().parent().hide();
            $(".pop-mask").hide();
        })

        $("#pop-create,#pop-update").on("click", 'label[data-group="award-way"]', function () {
            ithis.checkradio(this);
        });

        //提交验证
        function validateInput(m) {
            if (!m.AwardName) {
                $(".error").html("奖品名称不可为空");
                $(".error").show();
                setTimeout(function () { $(".error").html(""); }, 1500);
                return false;
            }
            if (m.AwardType && m.AwardType > 0) { }
            else {
                $(".error").html("请选择奖品类别");
                $(".error").show();
                setTimeout(function () { $(".error").html(""); }, 1500);
                return false;
            }
            return true;
            //if()
        }
        $("#pop-create").on("click", "#btn-create-ok", function () {
            var m = {
                AwardName: $("#cawardName").val(),
                AwardType: awardTypePop.getValue().value,
                AwardWays: $("#pop-create").find("span[data-group-sel]").attr("data-value"),
                CValue: $("#ccoin-num").val(),
                Remark: $("#cremark").val()

            };
            if (!validateInput(m)) {
                return false;
            }

            $.ajax({
                url: "/Org/Currency/AddAward",
                data: m,
                type: "post",
                success: function () {
                    ithis.showTip("添加成功", function () {
                        $("#pop-create").hide();
                        $(".pop-mask").hide();
                        ithis.getData();
                    });

                },
                error: function () {
                }
            })

        });

        $("#ucoin-num,#ccoin-num").keypress(function () {
            var keynum = event.keyCode;
            if (!(keynum >= 48 && keynum <= 57))//非数字
                return false;
            if ($(this).val().length == 3)//3位数字
                return false;
            if ($(this).val() == "" && keynum == 48)//首位不能为0
                return false;

        });



        //修改奖品
        $("#ctable").on("click", ".operatBtn", function () {
            var t = $(this).attr("data-type");
            var id = $(this).closest("tr").attr("data-id");
            switch (t) {
                case "edit":
                    ithis.showUpdatePop(id);
                    break;
                case "del":
                    ithis.showDelAward(id);
                    break;
            }
        });

        $("#pop-update").on("click", "#btn-save", function () {
            var m = {
                AwardID:$(this).attr("data-id"),
                AwardName: $("#uawardName").val(),
                AwardType: uawardTypePop.getValue().value,
                AwardWays: $("#pop-update").find("span[data-group-sel]").attr("data-value"),
                CValue: $("#ucoin-num").val(),
                Remark: $("#uremark").val()

            };
            if (!validateInput(m)) {
                return false;
            }

            $.ajax({
                url: "/Org/Currency/EditAward",
                data: m,
                type: "post",
                success: function (data) {
                    if (data.OK) {
                        ithis.showTip("修改成功", function () {
                            $("#pop-update").hide();
                            $(".pop-mask").hide();
                            ithis.getData();
                        });
                    }

                },
                error: function () {
                }
            })
        });
        $("#pop-update").on("click", "#btn-ab", function () {
            $("#pop-update").hide();
            $(".pop-mask").hide();
        });


        //删除奖品

        $("#pop-del").on("click", "#btn-del", function () {
            ithis.delAward($(this).attr("data-id"));
        });
        $("#pop-del").on("click", "#btn-del-cancel", function () {
            $("#pop-del,.popmask").hide();
        });

    },

    //弹出修改框
    showUpdatePop: function(id) {
        ithis = this;
        $.ajax({
            url: "/Org/Currency/GetAwardList",
            type: "post",
            async: true,
            data: { awardID: id },
            success: function (data) {
                if (data.OK) {
                    var r = data.Data;
                    var m = r[0];
                    $("#btn-save").attr("data-id",id);
                    $("#uawardName").val(m.AwardName);
                    uawardTypePop.setValue(m.AwardType);
                    ithis.checkradio($("#pop-update").find(".radio[data-value='" + m.AwardWays + "']").parent());
                    if (m.AwardWays == 1) {
                        $("#ucoin-num").val(m.CValue);
                    }
                    else {
                        $("#ucoin-num").val("");
                    }
                    $("#uremark").val(m.Remark);
                }

            },
            error: function () {

            }
        });

        $("#pop-update").show();
        $("#pop-mask").show();
    },
    checkradio: function (item) {
        var scheck = $(item).find(".radio");
        var acheck = $('label[data-group="award-way"]').find(".radio");
        acheck.removeClass("active");
        acheck.removeAttr("data-group-sel");
        scheck.addClass("active");
        scheck.attr("data-group-sel", 1);
        if (scheck.attr("data-value") == 2) {
            $(".coin-num-area").hide();
        }
        else {
            $(".coin-num-area").show();
        }
    }

}
//radio 选中

$(function () {

    awardList.init();
})