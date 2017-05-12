function LuiCheckBox() {
    this.selector = "luicheck";
    //参数
    this.param = {};
}

LuiCheckBox.prototype = {
    constructor: LuiCheckBox,
    /*
     *warpid 容器id
     *data 数据集，json 串 [{name:rex,val:001},{name:lilei,val:002}]
     *展示字段   textField
     *实际值字段 valueField
     *回调函数 callback 参数为当前触发的复选框上绑定的数据
     */
    init: function (param) {
        var cthis = this;
        if (param && param.group) {
            this.selector = 'luicheck[data-name="' + param.group + '"]';
        }
        this.param = param;
        $(this.selector).each(function (index, item) {
            var ischeckStyle = $(item).attr("data-checked") == 1 ? "check_sel" : "";
            var ischeckshow = $(item).attr("data-showcheckbox") != 1;
            $(item).attr("onselectstart", "return false;");
            var text = $(item).attr("data-text");
            var h = '<i class="icon_check ' + ischeckStyle + ' "></i>';
            var s = '<span class="check_text"  onselectstart="return false;" >' + text + '</span>';
            h = ischeckshow ? h + s : s;
            // if ($(item).find("icon_check").length > 0 || $(item).find("check_text").length > 0) {
            //     return;
            // }

            $(item).html(h);
            $(item).css({"cursor": "pointer"});
            $(item).unbind("click");
            $(item).bind("click", function () {
                var ischeck = $(this).attr("data-checked");
                if (ischeck == 1) {
                    $(this).attr("data-checked", 0);
                    $(this).children("i").removeClass("check_sel").addClass("check_def");
                }
                else {
                    $(this).attr("data-checked", 1);
                    $(this).children("i").removeClass("check_def").addClass("check_sel");
                }
                // alert("bind");
                if (param && param.callback) {
                    var groupname = $(item).attr("data-name");
                    var val = cthis.getJsonValue(groupname);
                    //调用回调函数，并返回组名和所选中值得json串
                    //param.callback(groupname, val);
                    param.callback(item);
                }
                return false;
            });
            $(item).off("clickbox");
            $(item).on("clickbox", function () {
                var ischeck = $(this).attr("data-checked");
                if (ischeck == 1) {
                    $(this).attr("data-checked", 0);
                    $(this).children("i").removeClass("check_sel").addClass("check_def");
                }
                else {
                    $(this).attr("data-checked", 1);
                    $(this).children("i").removeClass("check_def").addClass("check_sel");
                }
                // alert("bind");
                if (param && param.callback) {
                    var groupname = $(item).attr("data-name");
                    var val = cthis.getJsonValue(groupname);
                    //调用回调函数，并返回组名和所选中值得json串
                    //param.callback(groupname, val);
                    param.callback(item);
                }
                return false;
            });

        });
        return this;


    },
    //设置checkbox组哪些值被选中
    setValue: function (name, val) {
        $(this.selector).filter('[data-name="' + name + '"]').filter('[data-val="' + val + '"]').each(function (index, item) {
            var ischeck = $(item).attr("data-checked");
            if (ischeck == 1) {
            }
            else {
                $(item).click();
            }

        });
    },
    //获取checkbox组选中的值
    getValue: function (name) {
        var r = [];
        $(this.selector).filter('[data-name="' + name + '"]').each(function (index, item) {
            var ischeck = $(item).attr("data-checked");

            if (ischeck == 1) {
                r.push($(item).attr("data-val"));
            }


        });
        alert(r.join(','));
    },
    //获取checkbox组选中的值
    getJsonValue: function (name) {
        var r = [];
        $(this.selector).filter('[data-name="' + name + '"]').each(function (index, item) {
            var ischeck = $(item).attr("data-checked");
            if (ischeck == 1) {
                var jsonstr = $(item).attr("data-json");
                if (jsonstr) {
                    r.push(JSON.parse(unescape(jsonstr)));
                }
            }
        });
        return r;
    },
    /**判断当前 checkbox 是否选中 */
    ischeck: function (name, val) {
        var item = $(this.selector).filter('[data-name="' + name + '"]').filter('[data-val="' + val + '"]')[0];
        var ischeck = $(item).attr("data-checked");
        return ischeck == 1;
    },
    /**判断当前 checkbox 是否选中 */
    ischeckElement: function (item) {
        var ischeck = $(item).attr("data-checked");
        return ischeck == 1;
    },
    /**模拟单击 只改变样式 */
    setClickStyle: function (item) {
        var ischeck = $(item).attr("data-checked");
       this.setClickStyle1(item,ischeck==1?0:1);
    },
    setClickStyle1: function (item,ischeck) {
        if (ischeck == 1) {
            $(item).attr("data-checked", 1);
            $(item).children("i").addClass("check_sel").removeClass("check_sel");
        }
        else {
            $(item).attr("data-checked", 0);
            $(item).children("i").removeClass("check_sel").addClass("check_def");
        }
    }
};
module.exports = LuiCheckBox;