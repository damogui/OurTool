//遮罩
function MaskShow() {
    $(".pop-mask").show();
}

function MaskHide() {
    $(".pop-mask").hide();
    $(".add").hide();
}
//传递显示的消息
function PopTipShow(obj,title) {
    $(".small-pop").each(function () {

        $(this).remove();
    });

    if (title == undefined) {
        title = "提示消息";
    }
    var tiphtml = '<div class="eg-pop small-pop" > <div class="header"> ' + title + '<span class="close"></span> </div> <div class="body">' + obj + ' </div> </div>';

   
    $("body").append(tiphtml);
    $(".pop-mask").show();
    $(".small-pop").show();
}



//弹出确认框
var OpenConfrimPop = function (obj,btnId,title) {
    $('[class="pop-up font14"]').each(function () {

        $(this).remove();
    });

    if (title==undefined) {
        title ="提示消息";
    }
   
    var html = '<div class="eg-pop small-popbtn" > <div class="header"> ' + title + '<span class="close"></span> </div> <div class="body"> ' + obj + ' </div> <div class="footer"> <span class="operatBtn left" id="' + btnId + '" style="margin-left:50px;">确定</span> <span class="operatBtn right" id="Cancel" style="margin-right:50px;">取消</span> </div> </div>';
    
    $("body").append(html);
    $(".pop-mask").show();
    $(".small-popbtn").show();
};

function PopTipHide() {
    $(".pop-up").hide();
    $(".pop-mask").hide();
    $(".add").hide();
    document.location.reload();
}

exports.MaskShow = MaskShow;
exports.MaskHide = MaskHide;
exports.PopTipShow = PopTipShow;
exports.PopTipHide = PopTipHide;
exports.OpenConfrimPop = OpenConfrimPop;

//处理弹出框的隐藏
$(function () {
    $("body").delegate(".close,#Cancel", "click", function () {
        $(".small-popbtn").hide();
        $(".small-pop").hide();
        $(".pop-mask").hide();
        //document.location.reload();
    });

   



});

