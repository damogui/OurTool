var lui = require("../../LUI/js/lui.js");
var lui = new lui();
var guide = lui.initGuide();

//单元处引导
//guide.popup($(".child-unit")[0], 'child-unit0', true, { width: 130, height: 125 }, { width: 350, height: 270 }, 'up', '学完每个单元都会有测试，根据结果点亮荣耀之星！', '/egword/build/img/get-it-img2.png', 15);

function InitPage() {
    debugger;
    var dataid = bookGroupId;
    var objectTmp = undefined;
    var dataBookId = bookId;
    if (dataid == 0 && dataBookId==0) {
        dataid = dingWeiBookGroupId;
        dataBookId = dingWeiBookId;
    }

    if (dataid != 0) {
        $(".tabs-content").each(function() {
            if ($(this).attr("data-id") == dataid) {
                $(this).show();
                objectTmp = $(this);

            } else {
                $(this).hide();
            }

        });
     
        $(".mt15").each(function () {
            if (dataBookId > 0) {
                if ($(this).attr("data-id") == dataBookId) {
                    $(this).children(".main-content").show();
                    var doc = $(this).children(".megs").children(".fr").children(".ml30");
                    doc.attr("src", "/egword/build/img/down-arrow.png");
                    $(this).children(".megs").css('background', '#ff8b1e');
                    //if (srcStr.toString().indexOf("down-arrow.png") == -1) {
                    //    doc.attr("src", "/egword/build/img/down-arrow.png");
                    //    $(this).children(".megs").css('background', '#ff8b1e');
                    //} else {
                    //    doc.attr("src", "/egword/build/img/left-arrow.png");
                    //    $(this).children(".megs").css('background', '#ffc46e');
                    //}
                } else {
                    $(this).children(".main-content").hide();
                    var doc = $(this).children(".megs").children(".fr").children(".ml30");
                    doc.attr("src", "/egword/build/img/left-arrow.png");
                    $(this).children(".megs").css('background', '#ffc46e');
                }
               
            }

        });
    } else {
        var count = 0;
        $(".mt15").each(function () {
            if (count != 0) {
                var doc = $(this).children(".megs").children(".fr").children(".ml30");
                doc.attr("src", "/egword/build/img/left-arrow.png");
                $(this).children(".megs").addClass("megscolor");
                $(this).children(".main-content").hide();
            }
            count++;
        });
    }

}

$(function () {
    if (showTask > 0) {
        guide.popup($(".child-unit")[0], 'child-unit0', true, { width: 130, height: 125 }, { width: 350, height: 270 }, 'up', '学完每个单元都会有测试，根据结果点亮荣耀之星！', '/egword/build/img/get-it-img2.png', 15);
    }

    $("body").delegate(".child-unit0", "click", function(event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
    });
    var count = 0;
    $(".tabs-content").each(function () {
        if (count != 0) {
            $(this).hide();
        }
        count++;
    });
   // count = 0;
   

    InitPage();

   
    $("body").delegate(".megs", "click", function (event) {
       // $(this).parent(".fr").parent(".megs").parent(".mt15").children(".main-content").toggle();
       // $(this).parent(".fr").parent(".megs").toggleClass('addColor');
        //var doc = $(this).parent(".fr").children(".ml30");
        
        $(this).parent(".mt15").children(".main-content").toggle();
        $(this).parent().siblings().children(".main-content").hide();
        //var doc = $(this).children(".fr").children(".ml30");
        //var srcStr = doc.attr("src");
        //if (srcStr.toString().indexOf("down-arrow.png") == -1) {
        //    doc.attr("src", "/egword/build/img/down-arrow.png");
        //   $(this).css('background', '#ff8b1e');
        //} else {
        //    doc.attr("src", "/egword/build/img/left-arrow.png");
        //    $(this).css('background', '#ffc46e');
            
          
        //}
        $('.megs').css('background', '#ffc46e');
        $('.downleft').attr('src', '/egword/build/img/left-arrow.png');
        if ($(this).parent(".mt15").children(".main-content").css('display') == 'block') {
            $(this).css('background', '#ff8b1e');
            $(this).find('.downleft').attr("src", "/egword/build/img/down-arrow.png");
        } else {
            $(this).css('background', '#ffc46e');
            $(this).find('.downleft').attr("src", "/egword/build/img/left-arrow.png");
        }

    });

    $("body").delegate(".tabs-header", "click", function (event) {
        if ($(event.target).attr("data-id")==undefined) {
            return;
        }
        $(this).children("span").each(function () {
            $(this).removeClass("active");
            $(this).addClass("normal");
        });
        $(event.target).removeClass("normal");
        $(event.target).addClass("active");
        var dataid = $(event.target).attr("data-id");
        $(".tabs-content").each(function () {
            if ($(this).attr("data-id") == dataid) {
                $(this).show();
            } else {
                $(this).hide();
            }

        });

    });
    $("body").delegate(".showremark", "click", function (event) {
        $('.pop-mask').show();
        var remark = $(this).attr("data-message");
        $(".text").html(remark);
        $("#oneegpop").show();
        //阻止事件继续
        event.stopPropagation();
    });

    $("body").delegate(".close", "click", function (event) {
        $('.pop-mask').hide();
        $("#oneegpop").hide();
    });
    


    $("body").delegate(".fr", "click", function (event) {
        var dataid = $(event.target).attr("data-id");
        $(".orange").each(function () {
            if ($(this).attr("data-id") == dataid) {
                $(this).hide();
            }
        });
    });


    $("body").delegate(".child-unit", "click", function (event) {
        var clear = null;
        var courseId = $(this).attr("data-courseid");
        var unitId = $(this).attr("data-id");
        var orderId = $(this).attr("data-order");
        var brief =escape($(this).attr("data-brief"));
        var bookGroupId = $(this).attr("data-bookgroup");
        var bookId = $(this).attr("data-bookid");
        var lock = $(this).attr("data-lock");
        if (lock == "1") {
            clear = null;
            $(this).addClass('change');
            var This = this;
            clear = setTimeout(function() {
                $(This).removeClass('change');
            }, 800);
          
        } else {
            $.post("/Student/LearnCenter/LogLearn", { "courseId": courseId, "unitId": unitId, "orderId": orderId, "brief": brief }, function (result) {
                if (result.State == 0) {
                    window.location.href = "/Student/LearnCenter/ExperienceLesson?unitId=" + unitId + "&unitOrder=" + orderId + "&bookGroupId=" + bookGroupId + "&birefName=" + brief + "&courseId=" + courseId + "&bookId=" + bookId;
                    // window.location.href = "/Student/LearnCenter/UnitLearn?unitId=" + unitId + "&order=" + orderId + "&bookGroupId=" + bookGroupId + "&userCount=" + userCount;
                }
            });
        }
    });

    if (allPassCourse == 1) {
        $('.pop-mask').show();
        $(".eg-pop-image").removeClass("none");
    }

    $("#twomask").click(function () {
        $('.pop-mask').hide();
        $(".eg-pop-image").addClass("none");
    });

   

});



