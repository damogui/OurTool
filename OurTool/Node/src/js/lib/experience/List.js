
var List = function () {

}
List.prototype.loadList = function (url, warp, tpl, data) {
    $("#divLoading").show();
    $.ajax({
        url: url,
        type: "post",
        data: data,
        success: function (data) {
            console.log(data);
            if (data.OK) {
                //var tpl = require("experience/booklist.tpl");
                var dlist = data.Data;
                if (dlist.length > 0) {
                    var html = tpl(dlist);
                    $(warp).html(html);
                }
                else {
                    $(warp).html("暂无数据");
                }
            }
            $("#divLoading").hide();
        },
        error: function () {
            $("#divLoading").hide();
        }
    })
};
module.exports = List;