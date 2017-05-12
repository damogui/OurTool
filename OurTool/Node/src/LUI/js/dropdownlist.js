function LuiDropDownList() {
    this.param = null;
    this.selector = "";
}
var dropcount = 1000;
LuiDropDownList.prototype = {
    constructor: LuiDropDownList,
    init: function (param) {
        this.selector = this.warpid = "#" + param.warpid;
        var warpid = param.warpid;
        if (!param.data) { return; }
        var data = param.data;

        var width = param.width = param.width || 180;
        var height = param.height = param.height || 200;
        var subtextlength = param.subtextlength = param.subtextlength || 5;
        param.valueField = param.valueField || "id";
        param.textField = param.textField || "name";
        var valueField = param.valueField;
        var textField = param.textField;
        var selectedCallBack = param.selectedCallBack;
        var loadedCallBack = param.loadedCallBack;
        var zindex = param.zindex;
        if (param.data.length === 0) {
            var d = {};
            d[valueField] = -1;
            d[textField] = "";
            data.push(d);
            height = 0;
        }

        //设置默认值
        var defaultValue = param.defaultValue = param.defaultValue || data[0][valueField];
        var defaultText = param.defaultText = param.defaultValue || data[0][textField];
        this.param = param;
        var ulHtml = "<div class='dropdiv dn'>";
        ulHtml += '  <ul class="dropul" style="max-height:' + height + 'px;overflow:auto;" data-id="' + defaultValue + '" data-name="' + defaultText + '">';

        for (var k = 0; k < data.length; k++) {
            var item = data[k];
            var v = item[textField].length > subtextlength ? item[textField].substring(0, subtextlength) + "..." : item[textField];
            var itemHtml = '<li title=' + item[textField] + ' data-index=' + k + ' data-id=' + item[valueField] + ' data-json=\'' + JSON.stringify(data[k]) + '\'>' + v + '</li>';
            ulHtml += itemHtml;
        }
        ulHtml += "</ul>";
        ulHtml += "</div>";
        var spanHtml = ' <span style="width: ' + width + 'px;" class="dib"><span data-type="dropdownlist_drop_span" id="span' + param.warpid + '">' + defaultText + '</span> <i class="num_down"></i></span>';

        var con = $("#" + warpid);
        con.css({ width: width });
        con.addClass("lui_dropdownlist");
        con.html(spanHtml);
        con.append(ulHtml);
        if (zindex) {
            con.find(".dropdiv").css("z-index", zindex);
            con.attr("zindex", zindex);
        } else {
            // con.find(".dropdiv").css("z-index", dropcount--);
            // con.attr("zindex", dropcount + 1);
        }
        con.addClass("btn_num_updown").addClass("btn_num_updown1").addClass("dib");
        con.attr("title", defaultText);
        con.attr("data-id", defaultValue);

        var ul = $("#" + warpid + " ul");
        var dropdiv = $("#" + warpid + " .dropdiv");
        var li = $("#" + warpid + " ul li");
        var span = con.find("span[data-type='dropdownlist_drop_span']");
        //事件
        //下拉事件
        con.click(function () {

            if (ul.is(":visible")) {
                // ul.slideUp(200);
                dropdiv.slideUp(200);
            } else {
                $(".dropdiv").slideUp(200);
                // dropdiv.show();
                // ul.slideDown(200);
                dropdiv.slideDown(200);
            }
            return false;
        });
        $("body").click(function () {
            // ul.slideUp(200);
            $(".dropdiv").slideUp(200);
            // return false;
        });
        // con.mouseleave(function (e) {
        //     ul.slideUp(200);
        //     console.log(e);
        //     return false;
        // });
        //选中事件
        li.click(function () {
            var selectedValue = $(this).attr("data-id");
            var selectedText = $(this).html();
            var selectedJson = $(this).attr("data-json");
            var alltitle = $(this).attr("title");
            span.text(selectedText);
            span.attr("data-id", selectedValue);
            span.attr("data-json", selectedJson);
            span.attr("title", alltitle);

            con.attr("title", alltitle);
            con.attr("data-id", selectedValue);
            //选中回调事件
            if (selectedCallBack) {
                selectedCallBack(warpid, selectedValue, alltitle,selectedJson);
            }
            dropdiv.slideUp(200);
            return false;

        });
        this.span = span;
        //设置默认值
        this.setValue(defaultValue);
        return this;
    },
    getValue: function () {
        if (this.param.data.length > 0) {
            var span = this.span;
            return { value: span.attr("data-id"), text: span.attr("title"), zindex: $(this.selector).attr("zindex") };
        }
        else {
            return { value: -1, text: "" };
        }

    },
    //暴露给外部的方法
    getSelectedJsonValue: function () {
        if (this.param.data.length > 0) {
            var span = this.span;
            return JSON.parse(span.attr("data-json"));
        }
        else {
            return null;
        }

    },
    setValue: function (value) {
        var textsel = "";
        //选中的值
        var selItem;
        var span = this.span;
        for (var m = 0; m < this.param.data.length; m++) {
            var itemsel = this.param.data[m];
            if (itemsel[this.param.valueField] == value) {
                textsel = itemsel[this.param.textField];
                selItem = itemsel;
                break;
            }
        }
        span.attr("data-id", value);
        span.attr("data-json", JSON.stringify(selItem));
        span.attr("title", textsel);
        $(this.selector).attr("title", textsel);
        var selectedValue = value;
        var selectedText = textsel;
        var warpid = this.param.warpid;
        var v = textsel.length > this.param.subtextlength ? textsel.substring(0, this.param.subtextlength) + "..." : textsel;
        span.text(v);

        if (this.param.loadedCallBack) {
            this.param.loadedCallBack(warpid, selectedValue, selectedText);
        }
        return this;
    }



};
module.exports = LuiDropDownList;