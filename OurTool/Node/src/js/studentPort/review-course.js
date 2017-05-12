var Lui = require("../../LUI/js/lui.js");
var tool = require("../../LUI/tool.js");
var a = require('template-helpers.js');
var lui = new Lui();
var reviewWord = {
    courseId: courseid,
    wordList: {},
    answerTime: 0,
    totalAnswerTime: 0,
    totalWordNum: 0,
    currentWordIndex: -1,
    currentWord: {},
    timeTick: {},
    //当前是否处于学习页面
    islearning: false,
    //总共练习了多少单词
    practiseTotalNum: 0,
    //总共答对了多少单词
    answerRightNum: 0,
    //老师是否点击上课，并且复习超过15分钟
    timesUp: false,
    //当前时间
    curTickTime: 0,
    //当前剩余时间
    remainTickTime: 0,
    //老师是否点击暂停
    isstop: false,
    nextWord: function (isnext) {
        $(".review-word").off("click");
        isnext = isnext || true;
        var wthis = this;
        //清除上个页面计时器
        if (wthis.timeTick) {
            clearInterval(wthis.timeTick.clock);
        }
        //回车按钮默认为没有点击
        if (wthis.isPressEnter) {
            wthis.isPressEnter = false;
        }
        //复习完成
        if (this.currentWordIndex >= 0 && this.currentWordIndex >= this.totalWordNum - 1 && (!this.islearning)) {
            //TODO 暂停上一个
            window.LuiWordSpeakpause = true;
            $(".review-word").hide();
            $(".review-start").hide();
            $("#practiseTotalNum").html(this.practiseTotalNum);
            var p = this.answerRightNum / this.practiseTotalNum;
            var rp = Math.floor(((isNaN(p) || !isFinite(p)) ? 0 : p) * 100);
            var c = 0;
            $("#answerRightNum").html(rp + "%");
            if (rp == 100) {
                c = 30;
            }
            else if (rp >= 90) {
                c = 25;
            }
            else if (rp >= 80) {
                c = 20;
            }
            else if (rp >= 70) {
                c = 15;
            }
            else if (rp >= 60) {
                c = 10;
            }
            else {
                c = 0;
            }
            $("#review-learn-coins").html(c);
            $(".review-end").show();
            this.bindEventWordEnd();
            if (c > 0) {
                $.ajax({
                    url: "/LearnCenter/SendCoins",
                    type: "post",
                    data: { coins: c, courseId: courseid, percent: rp },
                    success: function (data) {
                        if (data.State == 0) {

                        }
                    },
                    error: function () {
                    }
                });
            }
            return;
        }
        if (!this.islearning) {
            if (isnext) {
                this.currentWordIndex = this.currentWordIndex * 1 + 1;
                window.location.hash = "#" + this.currentWordIndex;
            }
        }
        else {
            window.location.hash = "#" + this.currentWordIndex + "#learn";
        }


        // window.history.pushState({currentWordIndex:1},null,"#1");
        this.initWord();
    },
    submitAnswer: function (ispass, type) {
        //ispass -1没有做，0没有过，1过了
        //type 0 答题提交， 1 学习界面提交
        var wthis = this;
        type = type || 0;
        var postype = 4;
        var usetime = wthis.timeTick.tickTime;
        if (type == 1) {
            postype = 5;
            usetime = usetime > 20 ? 20 : usetime;
        }
        $.ajax({
            url: "/LearnCenter/SubmitReviewWord",
            type: "post",
            data: {
                WordId: wthis.currentWord.WordId,
                WordType: wthis.currentWord.WordType,
                IsPass: ispass != 1 ? 0 : ispass,
                PosType: postype,
                CourseId: courseid,
                UseTime: usetime,
                QType: wthis.currentWord.QType
            },
            success: function (data) {
                if (data.State == 0) {
                }
                if (type == 0) {
                    wthis.practiseTotalNum++;
                    //是否通过（-1没有做，0没有过，1过了）
                    //答错需要进入学习页面
                    if (ispass != 1) {
                        wthis.islearning = true;
                    }
                    else {
                        wthis.answerRightNum++;
                    }
                }
                wthis.nextWord();
            }
        })
    },
    getWrodList: function (callback) {
        var wthis = this;
        $.ajax({
            url: "/LearnCenter/GetReviewQue",
            type: "post",
            data: { courseId: wthis.courseId },
            success: function (data) {
                if (data.State == 0) {
                    wthis.wordList = data.Data;
                    wthis.totalWordNum = wthis.wordList.length;
                    $(".sing").html(wthis.wordList.length > 50 ? "50+" : wthis.wordList.length);
                    console.log(data.Data);
                    if (callback) {
                        callback(wthis);
                    }
                }
                else {
                    $(".sing").html(0);
                    callback(wthis);
                }
            },
            error: function () {
                $(".sing").html(0);
            }
        });
    },
    initWord: function (e) {
        var wthis;
        if (e) {
            wthis = e;
        }
        else {
            wthis = this;
        }
        // if(window.location.hash)
        if (wthis.currentWordIndex >= 0) {
            $(".review-start").hide();
            $(".review-word").show();
            var hash = window.location.hash;
            var harr = hash.split("#");
            wthis.currentWordIndex = harr[1];
            if (hash.indexOf("learn") > -1) {
                wthis.islearning = true;
            }
            // wthis.currentWordIndex=hash.substr(hash.indexOf("#")+1,hash.length-1);
            tool.progessBar($(".progress"), wthis.currentWordIndex * 1 + 1, wthis.totalWordNum);
            var curword = wthis.wordList[wthis.currentWordIndex];
            wthis.currentWord = curword;


            //判读当前是否是学习页面
            if (wthis.islearning) {
                wthis.initWordLearn(curword);
                //if (wthis.timeTick) {
                //    clearInterval(wthis.timeTick.clock);
                //}
                wthis.timeTick = tool.timeTickSmall(20);
                $(".rotate-small").hide();
            }
            else {
                // 试题题型（0，听音拼；1，看义拼；2，汉译英；3，英译汉）
                switch (curword.QType) {
                    case 0: {
                        wthis.initWord0(curword);
                    }
                        break;
                    case 1: {

                        wthis.initWord1(curword);
                    }
                        break;
                    case 2: {
                        wthis.initWord2(curword);
                    }
                        break;
                    case 3: {
                        wthis.initWord3(curword);
                    }
                        break;
                }
                //if (wthis.timeTick) {
                //    clearInterval(wthis.timeTick.clock);
                //}

                wthis.timeTick = tool.timeTickSmall(10, function () { wthis.submitAnswer(-1) });
                //判断 是否是第一次出现该题型 闪烁显示红色给用户提醒 20170503
                var prevIndex = wthis.currentWordIndex == 0 ? wthis.currentWordIndex : wthis.currentWordIndex - 1;
                //if (wthis.wordList[prevIndex].QType != curword.QType || wthis.currentWordIndex == 0) {
                if (wthis.wordList[prevIndex].QType != curword.QType) {
                    $("#qtvalue").addClass("shockColor");
                    var shocktime = 1;
                    var temp = setInterval(function () {
                        if (shocktime % 2 > 0) {
                            $("#qtvalue").removeClass("shockColor");
                        }
                        else {
                            $("#qtvalue").addClass("shockColor");
                        }
                        shocktime++;
                        if (shocktime == 3) {
                            clearInterval(temp);
                            $("#qtvalue").removeClass("shockColor");
                        }
                    }, 500);
                }
            }

        }
        else {
            $(".review-start").show();
            $(".review-word").hide();
            wthis.bindEventStart();
        }

    },
    bindEventStart: function () {
        var wthis = this;
        $(".review-start").on("click", "#btn-start", function () {
            wthis.nextWord();
            wthis.totalTimeTick();
        });
    },
    bindEvent: function () {
        var wthis = this;
        $("body").on("click", ".return", function () {
            if ($(this).hasClass("unclick")) { return; }

            $("#remainWord").html(wthis.totalWordNum - wthis.practiseTotalNum);
            $("#pnum").html(wthis.practiseTotalNum);
            var p = wthis.answerRightNum / wthis.practiseTotalNum;
            var rp = Math.floor(((isNaN(p) || !isFinite(p)) ? 0 : p) * 100);
            $("#pright").html(rp + "%");
            $(".pop-quit").show();
            wthis.remainTickTime = wthis.timeTick.remainTickTime;
            clearInterval(wthis.timeTick.clock);
        });
        $("body").on("click", "#btn-exit", function () {
            //window.location.href = "/Student/LearnCenter/Index";
            window.location.href = "/Student/LearnCenter/CourseBase?courseId=" + courseid;

        });
        $("body").on("click", "#btn-contiue,#btn-close-pop", function () {
            $(".pop-quit").hide();
            if (wthis.remainTickTime) {
                wthis.timeTick = tool.timeTickSmall(wthis.remainTickTime, function () { wthis.submitAnswer(-1) });
            }
            if (wthis.islearning) {
                $(".rotate-small").hide();
            }
        });


    },
    bindEventWord0: function () {
        var wthis = this;
        var delIsShow = function () {
            var input = $("input[data-haswrite]");
            //判断回删按钮是否显示
            if (input.attr("data-haswrite") * 1 > 0 && input.attr("data-haswrite") * 1 < input.attr("data-length") * 1) {

                $(".word0-clear").show();
            }
            else { $(".word0-clear").hide(); }
            ////判断回删按钮是否显示
            //if ($("input[data-haswrite='1']").length > 0) {
            //    $(".word0-clear").show();
            //}
            //else { $(".word0-clear").hide(); }

        };
        //判错并提交拼写答案
        var submitSpellAnswer = function () {
            var input = $("input[data-haswrite]");
            if (input&&input.length>0) { }
            else {
                return false;
            }
            var ua = input[0].value;

            var cword = wthis.wordList[wthis.currentWordIndex];
            if (wthis.timeTick.clock) { clearInterval(wthis.timeTick.clock); }
            if (ua == cword.Answer) {
                $(".word0-right-answer-right").show();
                setTimeout(function () {
                    wthis.submitAnswer(1);
                }, 1000);
            } else {
                $(".word0-right-answer-error").show();
                setTimeout(function () {
                    wthis.submitAnswer(0);
                }, 1000);

            }
        }
        delIsShow();
        //键盘事件，输入框聚焦
        if (isKeyMap == 1) {
            $("input[data-haswrite]")[0].focus();
        }

        //键盘事件 回车提交

        $(document).keydown(function (e) {
            var cword = wthis.wordList[wthis.currentWordIndex];
            if ((cword.QType == 1 || cword.QType == 0) && !wthis.isstop) {
                var ev = window.event || e;
                var code = ev.keyCode || ev.which;
                if (code == 13&& !wthis.isPressEnter) {
                    wthis.isPressEnter = true;
                    submitSpellAnswer();
                    return false;
                }
            }
        })
        //听音拼写
        $(".review-word").on("click", ".see", function () {
            if ($(this).html() == "显示词义") {
                $(".word-mean").show();
                $(this).html("隐藏词义");
            }
            else {
                $(".word-mean").hide();
                $(this).html("显示词义");
            }
        });
        //点击选项
        $(".review-word").on("click", '[data-op="word0-sel"]', function () {
            var opt = $(this);
            var haseleted = false;
            if ($(this).hasClass("active")) {
                haseleted = true;
            }

            if (haseleted) { return false; }
            var input = $("input[data-haswrite]");
            if (input.attr("data-haswrite") < input.attr("data-length")) {
                input[0].value = input[0].value + $(this).html();
                var wcount = parseInt(input.attr("data-haswrite")) + 1;
                input.attr("data-haswrite", wcount);
                $(this).addClass("active");
            }

            //若都填完，判断对错，答对直接提交，答错停留1s提交
            if (input.attr("data-haswrite") == input.attr("data-length")) {

                submitSpellAnswer();
            }
            delIsShow();

        });

        //全清
        $(".review-word").on("click", ".word0-clear", function () {
            //$("input[data-haswrite='1']").each(function (index, item) {
            //    item.value = "";
            //    item.setAttribute("data-haswrite", 0);
            //});
            var input = $("input[data-haswrite]");
            input.val("");
            input.attr("data-haswrite", 0);
            $('[data-op="word0-sel"]').removeClass("active");
            delIsShow();
        })
    },
    bindEventWord2: function () {
        var wthis = this;
        //点击选项
        $(".review-word").on("click", '[data-op="word2-sel"]', function () {
            var ua = $(this).attr("data-index");
            var cword = wthis.wordList[wthis.currentWordIndex];
            var ritem = $($('[data-op="word2-sel"]').eq(cword.Answer));
            if (wthis.timeTick.clock) { clearInterval(wthis.timeTick.clock); }
            if (ua == cword.Answer) {
                $(this).removeClass("error").addClass("success").siblings().removeClass("success").removeClass("error");
                $('<img src="/egword/build/img/big-ok.png" alt="" class="vm">').insertAfter(ritem[0]);
                setTimeout(function () {
                    wthis.submitAnswer(1);
                }, 1000);
            } else {
                $(this).removeClass("success").addClass("error").siblings().removeClass("success").removeClass("error");
                ritem.removeClass("error").addClass("success");
                $('<img src="/egword/build/img/big-error.png" alt="" class="vm">').insertAfter(this);
                $('<img src="/egword/build/img/big-ok.png" alt="" class="vm">').insertAfter(ritem[0]);
                setTimeout(function () {
                    wthis.submitAnswer(0);
                }, 1000);

            }
            $(".review-word").off("click");


        });

    },
    bindEventWordLearn: function () {
        var wthis = this;
        $(".review-word").on("click", "#btn-learn-next", function () {
            wthis.islearning = false;
            wthis.submitAnswer(-2, 1);
            // wthis.nextWord();
        })
    },
    bindEventWordEnd: function () {
        var wthis = this;
        $(".review-end").on("click", "#btn-review-end-ok", function () {
            window.location.href = "/Student/LearnCenter/Index";
        })
    },
    initWord0: function (curword) {
        var wthis = this;
        var tpl = require("student/word0");
        curword.spellList = [];
        curword.isKeyMap = isKeyMap;
        for (var k = 0; k < curword.Count; k++) {
            curword.spellList.push(k);
        }
        var html = tpl(curword);
        $("#word-wrap").html(html);
        lui.initWordSpeak({ auto: true, loop: 2, interval: 1000, callback: function () { console.log("播放完毕"); } });

        wthis.bindEventWord0()
    },
    initWord1: function (curword) {
        var wthis = this;
        var tpl = require("student/word1");
        curword.spellList = [];
        curword.isKeyMap = isKeyMap;
        for (var k = 0; k < curword.Count; k++) {
            curword.spellList.push(k);
        }
        var html = tpl(curword);
        $("#word-wrap").html(html);
        // lui.initWordSpeak({ auto: true, loop: 2,callback:function(){console.log("播放完毕");} });
        wthis.bindEventWord0()
    },
    initWord2: function (curword) {
        var wthis = this;
        var tpl = require("student/word2");
        var html = tpl(curword);
        $("#word-wrap").html(html);
        wthis.bindEventWord2()
    },
    initWord3: function (curword) {
        var wthis = this;
        var tpl = require("student/word3");
        var html = tpl(curword);
        $("#word-wrap").html(html);
        lui.initWordSpeak({ auto: true, loop: 2, interval: 1000, callback: function () { console.log("播放完毕"); } });
        wthis.bindEventWord2()
    },
    initWordLearn: function (curword) {
        var wthis = this;

        var tpl = require("student/wordlearn");

        var html = tpl(curword);
        $("#word-wrap").html(html);
        //判断该单词的类型 陌生词 慢速跟读3遍 夹生词，请快速跟读2遍 单词类型0，熟词；1，夹生词；2，生词；
        if (curword.WordType == 1) {
            lui.initWordSpeak({
                auto: true, loop: 2, interval: 800, callback: function () {
                    $(".anysis").show();
                    if (curword.Rember) {
                        $(".remumber").show();
                    }
                    $("#btn-learn-next").show();
                    //$(".word-types").css({ "visibility": "hidden" });
                    //$(".word-types").hide();
                    console.log("播放完毕");
                }
            });
        }
        else {
            lui.initWordSpeak({
                auto: true, loop: 3, interval: 800, callback: function () {
                    $(".anysis").show();
                    if (curword.Rember) {
                        $(".remumber").show();
                    }
                    $("#btn-learn-next").show();
                    //$(".word-types").css({ "visibility": "hidden" });
                    //$(".word-types").hide();
                    console.log("播放完毕");
                }
            });
        }
        wthis.bindEventWordLearn();
    },
    //开始复习后总计时
    totalTimeTick: function () {
        var wthis = this;
        var totalTimeInterval = setInterval(function () {
            if (wthis.isstop) {
                return;
            }
            wthis.totalAnswerTime++;
            //if (wthis.totalAnswerTime >= (60 * 1)) {
            if (wthis.totalAnswerTime >= (60 * 15)) {
                //如果退出是不可点状态，超过15分钟后 闪现退出按钮
                if ($(".return").hasClass("unclick")) {
                    var count = 0;
                    $(".return").removeClass("unclick");
                    var showt = setInterval(function () {
                        if ($(".return").hasClass("hidden")) {
                            $(".return").removeClass("hidden");
                        }
                        else {
                            $(".return").addClass("hidden");
                        }
                        if (count >= 4) {
                            clearInterval(showt);
                            $(".return").removeClass("hidden");
                        }
                        count++;
                    }, 500);
                }
                if (wthis.totalAnswerTime % 30 == 0 && !wthis.timesUp) {
                    // 后台请求是否上课 如果上课 且超过15分钟 弹出timesup
                    $.ajax({
                        url: "/LearnCenter/GetUserClassInfo",
                        type: "post",
                        success: function (data) {
                            if (data.State == 0) {
                                if (data.CourseID > 0) {
                                    $(".time-pop").show();
                                    wthis.timesUp = true;
                                    lui.wordspeak.play($("#times-up-speak"));
                                    setTimeout(function () {
                                        $(".time-pop").hide();
                                        wthis.islearning = false;
                                        wthis.nextWord(false);
                                    }, 1000);
                                    window.clearInterval(totalTimeInterval);
                                }
                            }
                        }
                    });

                }
            }
        }, 1000);
    },
    stopLesson: function () {
        var wthis = this;
        wthis.isstop = true;
        wthis.remainTickTime = wthis.timeTick.remainTickTime;
        clearInterval(wthis.timeTick.clock);
    },
    continueLesson: function () {
        var wthis = this;
        wthis.isstop = false;
        if (wthis.remainTickTime) {
            if (!wthis.islearning) {
                wthis.timeTick = tool.timeTickSmall(wthis.remainTickTime, function () { wthis.submitAnswer(-1) });
            }
        }
    },
    init: function () {
        window.location.hash = "";
        this.getWrodList(this.initWord);
        this.bindEvent();
    }
};
$(function () {
    reviewWord.init();


});
window.pausePopCallback = function () { reviewWord.stopLesson(); };
window.pauseHideCallback = function () { reviewWord.continueLesson(); };
$(document).keydown(function (e) {
    var ev = window.event || e;
    var code = ev.keyCode || ev.which;
    if (code == 116) {
        ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
        cancelBubble = true;
        return false;
    }
}) //禁止f5刷新
document.oncontextmenu = function () { return false };//禁止右键刷新