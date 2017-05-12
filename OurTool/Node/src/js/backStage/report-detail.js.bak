//幻灯片开始部分
var iCountOfImage = 0;
var interval = null;
//play函数
function play(index) {
    $(".ppt-container .image-list li").hide();
    $(".ppt-container .image-list li").eq(index).show();
    $(".ppt-container .button-list span").removeClass("selected");
};
//自动播放
function auto(num) {
    interval = setInterval(function () { // 自动播放，每5秒触发一次单击事件，来播放幻灯片
        play(num);
        $(".ppt-container .button-list span").eq(num).addClass("selected");
        num++;
        if (num >= iCountOfImage) { num = 0; }
    }, 1000);
};

function BindPic() {
    $(".ppt-container ul.button-list li span").on('mouseenter', function () {
        var index = $(this).parent().index();
        clearInterval(interval);
        play(index);
        $(this).addClass("selected");
    });
    $(".ppt-container ul.button-list li span").on('mouseleave', function () {
        var index = $(this).parent().index() + 1;
        if (index >= iCountOfImage) { index = 0; }
        auto(index);
    });
}

init();
function init() {
    $("#viewGroup").html("");
    $("#emptyDataBefore").tmpl(null).appendTo("#viewGroup");
    $.ajax({
        type: "post",
        url: "/Org/Classes/GetReportDetails",
        dataType: "json",
        data: {
            ClassID: _ClassID, ClassIndex: _ClassIndex
        },
        error: function (e) {

        },
        success: function (e) {
            $("#viewGroup").html("");
            if (e.OK) {
                $("[data-cla='1']").html(e.Data.ClassName);
                $("[data-cla-index='1']").html(e.Data.CurrentIndex);
                $("#viewPicData").tmpl(e.Data).appendTo("#viewPic");
                //幻灯片结束部分
                iCountOfImage = $('.image-list img').length;
                BindPic();
                auto(0);
                //
                gs = e.Data;
                $("#viewGroupData").tmpl(e.Data).appendTo("#viewGroup");
                //
                BindStu();//点击事件
                $("[data-hand=0]").click();
            }
            else {

            }
        }
    });
}


function BindStu() {
    $("[data-hand]").click(function () {
        $('.progres').not($(this).closest('.progres')).removeClass('show');
        $(this).closest('.progres').toggleClass('show');
        if ($(this).attr("data-ok") == "1")//已经请求
        { }
        else
        {
            $(this).nextAll().remove();
            $("#emptyDataBefore").tmpl(null).insertAfter($(this));
            //
            var id = $(this).attr("data-id");
            var $id = $(this);
            $.ajax({
                type: "post",
                url: "/Org/Classes/GetStuReport",
                dataType: "json",
                data: {
                    CourseID: id, ClassIndex: _ClassIndex
                },
                error: function (e) {

                },
                success: function (e) {
                    if (e.OK) {
                        $id.nextAll().remove();
                        $("#viewStuData").tmpl(e).insertAfter($id);
                        $id.attr("data-ok", "1");
                    }
                }
            });
            //


        }
    });
}