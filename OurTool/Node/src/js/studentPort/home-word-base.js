var lui=require("../../LUI/js/lui.js");
var lui=new lui();
var guide=lui.initGuide();
//夹生词引导
//guide.popup($(".classintuduce")[0],'classintuduce',true,{width:130,height:125},{width:370,height:305},'up',' 在这里，可以找到专属于你的单词宝典！','/egword/build/img/get-it-img3.png',20);


var needCourseId = 0;
var groupId = 0;

function VerUserClass() {
    $.post("/Student/LearnCenter/GetUserClassInfo", {}, function (result) {
        if (result.State == 0) {
            needCourseId = parseInt(result.CouserId);
            groupId = result.GroupId;
            if (needCourseId > 0) {
                if (groupId > 0) {
                    $("#zhuangtai").html("<img src=\"../../../egword/build/img/pc.png\" alt=\"\" class=\"vm\"/>&nbsp;<span class=\"learn-coins\">正在上课:</span><span style=\"margin-left: 20px;\">(" + groupId + "组)</span>");
                } else {
                    $("#zhuangtai").html("<img src=\"../../../egword/build/img/pc.png\" alt=\"\" class=\"vm\"/>&nbsp;<span class=\"learn-coins\">正在上课</span>");
                }
               
                $(".synchronization").each(function() {
                    if (parseInt($(this).attr("data-id")) == needCourseId) {
                        var message = $(this).children(".onediv").children(".twodiv").children(".threediv").children(".kexiao").html();
                        var newmessage = (parseInt(message.split('/')[0]) + 1 )+ "/" + message.split('/')[1];
                        $(this).children(".onediv").children(".twodiv").children(".threediv").children(".kexiao").html(newmessage);
                    }
                });
            }
        }
    });
}

function InsertCourse(courseId,type) {
    $.post("/Student/LearnCenter/ReviewCount", { "courseId": courseId }, function (result) {
        if (result.State == 0) {
            if (result.Data == 0) {
                window.location.href = "/Student/LearnCenter/CourseBase?courseId=" + courseId;
                //if (type == 0) {
                //    window.location.href = "/Student/LearnCenter/ExperienceIndex?courseId=" + courseId;
                //} else {
                //    window.location.href = "/Student/LearnCenter/CourseBase?courseId=" + courseId;
                //}
                
            } else {
                window.location.href = "/Student/LearnCenter/ReviewCourse?courseId=" + courseId + "&count=" + result.Data + "&canClose=" + result.CanClose;
                ////测试url
                //window.location.href = "/Student/LearnCenter/ReviewCourse?courseId=13&count=40&canClose=1";
            }
        }
    });
}

$(function () {
  //  $("#go-lesson").hide();
    VerUserClass();

    $("body").delegate("#tuicourse", "click", function () {
        window.location.href = "/Student/LearnCenter/ExperienceTest";
    });

    $("body").delegate(".close", "click", function () {
        $("#go-lesson").hide();
        $('.pop-mask').hide();
    });

    

    $("body").delegate(".courseinsert", "click", function () {
        var courseId = $(this).attr("data-setid");

        if (parseInt(needCourseId) == parseInt(courseId)||parseInt(needCourseId)==0) {
            InsertCourse(courseId,1);
        } else {
            $("#go-lesson").show();
            $('.pop-mask').show();
        }
    });

    $("body").delegate(".analysispage", "click", function () {
        var courseId = $(this).attr("data-setid");
        var courseName = $(this).attr("data-name");

        window.location.href = "/Student/LearnCenter/StudentAnalysis?courseId=" + courseId + "&courseName=" + courseName;
    });

    $("body").delegate(".wordbenpage", "click", function () {
        var courseId = $(this).attr("data-setid");
        var isEng = $(this).attr("data-setEng");
        var courseName = $(this).attr("data-name");
        window.location.href = "/Student/LearnCenter/WordCard?courseId=" + courseId + "&courseName=" + courseName + "&isEng=" + isEng;
        
    });



    $("body").delegate("#centerCourse", "click", function () {
        InsertCourse(needCourseId,1);
    });
    var cookies = document.cookie.split(";");
   
    if ($("#tuicourse").length > 0 && parseInt(showTask) == 1) {
        guide.popup($(".classintuduce")[0], 'classintuduce', true, { width: 130, height: 125 }, { width: 370, height: 245 }, 'down', ' 在这里，可以找到专属于你的单词宝典！', '/egword/build/img/get-it-img3.png', 20);
        
    }
   
    $("body").delegate(".classintuduce", "click", function () {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
    });

    $("body").delegate(".publicinsert", "click", function () {
        var courseId = $(this).attr("data-setid");
        if (needCourseId == courseId || needCourseId == 0) {
            InsertCourse(courseId,0);
        } else {
            $("#go-lesson").show();
            $('.pop-mask').show();
        }
    });
});


