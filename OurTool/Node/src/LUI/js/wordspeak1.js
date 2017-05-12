function LuiWordSpeak1() {
    this.selector = "lui_wordspeak";
    this.param = {};
    this.audioControl = {};
}

LuiWordSpeak1.prototype = {
    constructor: LuiWordSpeak1,
    init: function (param) {
        var sthis = this;
        param = param || {};
        $(".lui_div_speak").remove();
        var luidivspeak = '<div class="lui_div_speak" id="lui_div_speak"/>';
        $("body").append(luidivspeak);
        $(".lui_wordspeak").each(function (index, item) {
            $(item).unbind("mouseover");
            $(item).bind("mouseover", function () {
                sthis.play(item, 1, 1000, param.callback, true);
                $(item).addClass("play");
            });

        });
        if (param.auto) {
            param.loop = param.loop || 1;
            if (param.loop > 0) {
                var item = $(".lui_wordspeak")[0];
                sthis.play(item,  param.interval, param.callback);
            }
        }
        sthis.param = param;
        sthis.createAudio(undefined,  param.interval, param.callback);
        return sthis;
    },
    //时间间隔
    play: function (item, loop, interval, callback, isclick) {
        var sthis = this;
        loop = loop || this.param.loop || 1;
        interval = interval || this.param.interval || 1000;
        isclick = isclick || false;
        callback = callback || sthis.param.callback;
        if ($(item).attr("data-play") == 1) {
            return;
        } else {
            if ($(item).attr("data-play", 1));
        }
        // if (!sthis.audioControl.ended) { return;}
        var audio = sthis.createAudio(item,  interval, callback, isclick);
        if (loop > 0) {
            if (!isclick) {
                sthis.loop = loop;
            }
            sthis.isclick = isclick;
            sthis.item = item;
            audio.play();
        }

    },
    createAudio: function (item,  interval, callback, isclick) {
        var sthis = this;
        var url = "";
        if (item) {
            url = $(item).attr("data-src");
        }

        if ($("#lui_audio_speak").length > 0) {
            $("#lui_audio_speak")[0].src = url;
            return $("#lui_audio_speak")[0];
        }
        var div = document.getElementById('lui_div_speak');
        div.innerHTML = '<audio id="lui_audio_speak"><source src="' + url + '"></audio>';
        var audio = $("#lui_audio_speak")[0];
        audio.onended = null;
        audio.onended = function () {
            var item = sthis.item;
            $(item).attr("data-play", 0);
            $(item).removeClass("play");

            if (sthis.loop > 1) {
                if (sthis.speaktimer) {
                    clearTimeout(sthis.speaktimer);
                }
                sthis.speaktimer = setTimeout(function () {
                    sthis.play(item, sthis.loop - 1, interval, callback);
                }, interval);
            }
            else if (sthis.loop == 1) {
                clearTimeout(sthis.speaktimer);
                if (!sthis.isclick && callback) {
                    callback();
                }
            }
            // else if (sthis.loop == 0) {
            //     if (!sthis.isclick&&callback){
            //         callback();
            //     }
            // }
        };

        sthis.audioControl = audio;
        return audio;
    }


};
module.exports = LuiWordSpeak1;