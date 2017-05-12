var Lui = require("../../LUI/js/lui.js");
var util = require("../lib/util.js");
var lui = new Lui();
var AudioPlay = function () {
    var nextUnitId = 1;
    var curUnit = unit_id;
    var curBookId = book_id;
    this.wordList = [];
    this.curWordIndex = 0;
    this.totalTime = 0;
    this.pauseTimeObj = { tick: 0 };
    //每个音频循环两次 继续播放
    this.loop = 2;
    //每个音频间接2秒后 继续播放
    this.interval = 2000;
    this.allSource = (function (audio) {
        var s = undefined;
        if (audio.allSource) {
            s = audio.allSource;
        }
        else {
            $.ajax({
                url: '/Experience/Index/GetWord',
                type: "post",
                data: { BookID: curBookId, UnitID: curUnit },
                async: false,
                success: function (data) {
                    if (typeof (data) == "string") {
                        data = JSON.parse(data);
                    }
                    s = data.Data;
                    nextUnitId = data.Data.M.NextUnitID;

                    audio.wordList = data.Data.N;
                },
                error: function () {

                }
            })
        }
        return s;

    })(this);


};
AudioPlay.prototype.init = function () {

    this.bindEvent();
    this.nextUnit();

};
AudioPlay.prototype.nextUnit = function () {
    var shtml = "";
    shtml += '<i class="lui_wordspeak" id="audio-word' + 0 + '" data-src="/egword/sm.mp3"></i>';
    for (var k = 1; k < this.wordList.length; k++) {
        var c = this.wordList[k].f_audio;
        shtml += '<i class="lui_wordspeak" id="audio-word' + k + '" data-src=' + c + '></i>';
    }
    $("body").append('<div style="display: none" id="audio-list-hidden"></div>');
    $("#audio-list-hidden").html(shtml);
    var athis = this;
    lui.initWordSpeak1({
        auto: false, loop: athis.loop, interval: athis.interval, callback: function () {
            athis.pauseTimeObj = { tick: 0 };
            setTimeout(function () {
                athis.next();
            }, athis.interval);

        }
    });
    lui.wordspeak1.audioControl.onloadedmetadata = function () {
        if (athis.pauseTimeObj.tick == 0) {
            athis.getAudioInfo();
            if (athis.showtimer) {
                window.clearInterval(athis.showtimer);
            }
            athis.initAudioInfo();

        }
    };
    athis.play();
};
AudioPlay.prototype.getAllSource = function (curBookId, curUnit, callback) {
    $.ajax({
        url: '/Experience/Index/GetWord',
        type: "post",
        data: { BookID: curBookId, UnitID: curUnit },
        async: false,
        success: function (data) {
            if (typeof (data) == "string") {
                data = JSON.parse(data);
            }
            s = data.Data;
            nextUnitId = data.Data.M.NextUnitID;

            audio.wordList = data.Data.N;
            if (callback) {
                callback();
            }
        },
        error: function () {

        }
    })
};
AudioPlay.prototype.play = function () {
    $("#audio-word" + this.curWordIndex).attr("data-play", 0);
    lui.wordspeak1.play($("#audio-word" + this.curWordIndex));

};
AudioPlay.prototype.getAudioInfo = function () {
    this.totalTime = lui.wordspeak1.audioControl.duration.toFixed(2) * this.loop + this.interval;
    console.log(this.totalTime);
};
AudioPlay.prototype.next = function () {

    var athis = this;
    athis.pause();
    if (athis.curWordIndex < this.wordList.length - 1) {
        athis.curWordIndex++;
    }
    else {
        athis.curWordIndex = 0;
    }

    console.log(athis.curWordIndex);
    athis.play();
};
AudioPlay.prototype.prev = function () {
    var athis = this;
    athis.pause();
    if (athis.curWordIndex > 0) {
        athis.curWordIndex--;
    }
    else {
        athis.curWordIndex = this.wordList.length - 1;
    }

    console.log(athis.curWordIndex);
    athis.play();
};
AudioPlay.prototype.pause = function () {
    var athis = this;
    window.clearInterval(athis.showtimer);
    // if (lui.wordspeak1.audioControl.played){
    lui.wordspeak1.audioControl.pause();

    // }
};
//
AudioPlay.prototype.pauseToPlay = function () {
    var athis = this;
    lui.wordspeak1.audioControl.play();
    athis.showAudioInfoTimer();

};

AudioPlay.prototype.setPlayTime = function (curtime) {
    var time = curtime - lui.wordspeak1.audioControl.duration - this.interval;
    var curtime = time > 0 ? time : curtime;
    lui.wordspeak1.audioControl.currentTime = curtime;
}
AudioPlay.prototype.setProgress = function (w, totalwidth) {
    var athis = this;
    athis.setProgressStyle(w, totalwidth);
    athis.setPlayTime(athis.progesstime);
}
AudioPlay.prototype.setProgressStyle = function (w, totalwidth) {
    if (w < 0) w = 0;
    if (w > totalwidth) w = totalwidth;
    var athis = this;
    var p1 = athis.totalTime * w / totalwidth;
    athis.progesstime = p1;
    $(".dot").css({ left: (w / totalwidth) * 100 + "%" });


}
AudioPlay.prototype.bindEvent = function () {
    var athis = this;
    $(".music-event").on("click", ".start", function () {
        athis.pause();
        $(this).removeClass("start").addClass("stop");
    });
    $(".music-event").on("click", ".stop", function () {
        athis.pauseToPlay();
        $(this).removeClass("stop").addClass("start");
    });
    $(".music-event").on("click", ".pre", function () {
        athis.prev();
        $(".stop").removeClass("stop").addClass("start");
    });
    $(".music-event").on("click", ".next", function () {
        athis.next();
        $(".stop").removeClass("stop").addClass("start");
    });

    //拖动
    athis.drag = false;
    $(".dot").on(
        {
            "mousedown": function (e) {
                athis.drag = true;
                console.log("down");
            },
            "touchstart": function (e) {
                athis.drag = true;
                console.log("touchstart");
            }

        });
    $(document).on({
        "mousemove": function (e) {
            if (athis.drag) {
                var p = $(".progress");
                var x = e.clientX;
                var ps = p.offset().left;
                var w = x - ps;
                if (athis.showtimer) { clearInterval(athis.showtimer); }
                athis.setProgressStyle(w, p.width());
                athis.showAudioInfo();
                console.log("move");
            }
            e.preventDefault();

        },

        "mouseup": function (e) {
            if (athis.drag) {
                var p = $(".progress");
                var x = e.clientX;
                var ps = p.offset().left;
                var w = x - ps;
                athis.setProgress(w, p.width());
                athis.drag = false;
                athis.showAudioInfoTimer();
            }
            console.log("up");

        },
        "touchmove": function (e) {
            if (athis.drag) {
                var p = $(".progress");
                var x = e.originalEvent.touches[0].clientX;
                var ps = p.offset().left;
                var w = x - ps;
                if (athis.showtimer) { clearInterval(athis.showtimer); }
                athis.setProgressStyle(w, p.width());
                athis.showAudioInfo();
                console.log("thouchmove");
            }
            e.preventDefault();

        },

        "touchend": function (e) {
            if (athis.drag) {
                var p = $(".progress");
                //手指离开后只能从changedTouches取出离开时的位置
                var x = e.originalEvent.changedTouches[0].clientX;
                var ps = p.offset().left;
                var w = x - ps;
                athis.setProgress(w, p.width());
                athis.drag = false;
                athis.showAudioInfoTimer();
            }
            console.log("touchend");

        }
    })
};
AudioPlay.prototype.initAudioInfo = function () {
    var athis = this;
    $(".totl-time").html(util.convertTime(athis.totalTime));
    $(".current-time").html(util.convertTime(0));
    $(".dot").css({ left: 0 });
    athis.progesstime = 0;
    athis.showAudioInfoTimer();
};
AudioPlay.prototype.showAudioInfoTimer = function () {
    var athis = this;
    athis.showtimer = setInterval(function () {

        if (athis.progesstime <= athis.totalTime) {
            athis.progesstime = athis.progesstime + 0.01;
            $(".current-time").html(util.convertTime(athis.progesstime));
            $(".dot").css({ left: (athis.progesstime / athis.totalTime) * 100 + "%" });
            athis.pauseTimeObj = { tick: athis.progesstime };
        }
        else {
            clearInterval(athis.showtimer);
            athis.pauseTimeObj = { tick: 0 };
        }

    }, 10)
};

AudioPlay.prototype.showAudioInfo = function () {
    var athis = this;
    if (athis.progesstime <= athis.totalTime) {
        athis.progesstime = athis.progesstime + 0.01;
        $(".current-time").html(util.convertTime(athis.progesstime));
        $(".dot").css({ left: (athis.progesstime / athis.totalTime) * 100 + "%" });
        athis.pauseTimeObj = { tick: athis.progesstime };
    }
};

$(function () {
    var p = new AudioPlay();
    p.init();

})