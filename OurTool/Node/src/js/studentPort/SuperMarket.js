var Lui = require('../../LUI/js/lui');
var lui = new Lui();

var drop_new;//最新奖品
var drop_type;//类型

$.ajax({
    type: "post",
    url: "/Org/Classes/GetDic",
    data: {
        DicType: 14
    },
    dataType: "json",
    error: function (e) {
    },
    success: function (e) {
        e.Data.unshift({ DicKey: 0, DicValue: "全部类别" });
        drop_type = lui.initDropDownList({
            warpid: "drop_dem1", width: 160, subtextlength: 10, textField: 'DicValue', valueField: 'DicKey', data: e.Data, selectedCallBack: GetChange1
        });
        drop_new = lui.initDropDownList({
            warpid: "drop_dem2", width: 120, nameField: 'name', idField: 'id', data: [{ name: '最新奖品', id: '1' }, { name: '最贵奖品', id: '2' }], selectedCallBack: GetChange2
        });

        init(1, 0, 1, 0);
    }
});


$("#checkOne").click(function () {
    $(this).children("i").toggleClass(function () {
        return "icon_def icon_check_bg";
    });
    var _bg = $(this).children("i").hasClass("icon_check_bg") ? "1" : "0";
    init(1, drop_type.getValue().value, drop_new.getValue().value, _bg);
});

function GetChange1(e1, e2)//控件ID、选中项ID
{
    var _bg = $("#checkOne").children("i").hasClass("icon_check_bg") ? "1" : "0";
    init(1, e2, drop_new.getValue().value, _bg);
}

function GetChange2(e1, e2)//控件ID、选中项ID
{
    var _bg = $("#checkOne").children("i").hasClass("icon_check_bg") ? "1" : "0";
    init(1, drop_type.getValue().value, e2, _bg);
}

//数据绑定
function init(e1, e2, e3, e4) {
    $("#pages").html("");
    $("#tDatas").html("");
    $("#emptyViewDataBefore").tmpl(null).appendTo("#tDatas");
    $.ajax({
        type: "post",
        url: "/Student/LearnCenter/GetAward",
        data: {
            PageIndex: e1, AwardType: e2, IsNew: e3, IsMine: e4
        },
        dataType: "json",
        error: function (e) {
        },
        success: function (e) {
            $("#tDatas").html("");
            $("#dataTotal").html(e.PageSum);
            if (e.Data == null || e.Data.length == 0) {
                $("#emptyViewDataOver").tmpl(null).appendTo("#tDatas");
            }
            else {
                $("#marketData").tmpl(e.Data, {
                    getValue: function (m) {
                        if (+this.data.CValue <= +_cv) {
                            return '<span class="has_bingo"></span>';
                        }
                        else {
                            return '<span class="no_bingo">差' + ((+this.data.CValue) - (+_cv)).toString() + '个</span>';
                        }
                    },
                    getStr: function (m) {
                        m = $.trim(m);
                        if (m.length > 16)
                            return m.substr(0, 15) + "...";
                        return m;
                    }
                }).appendTo("#tDatas");
            }
            $("#pages").html(e.TagValue);
            onClick();
        }
    });
}


function onClick() {
    $("#pages span:not([class='cur'])").click(function () {
        var _bg = $("#checkOne").children("i").hasClass("icon_check_bg") ? "1" : "0";
        var _pageIndex = $(this).attr("data-set");
        init(_pageIndex, drop_type.getValue().value, drop_new.getValue().value, _bg);
    });
}
