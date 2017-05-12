
function LuiWordSpeak() {
    this.selector = "lui_wordspeak";
    //参数
    this.param = {};
}

LuiWordSpeak.prototype = {
    constructor: LuiWordSpeak,
    /*
     *warpid 容器id
     *data 数据集，json 串 [{name:rex,val:001},{name:lilei,val:002}]
     *展示字段   textField
     *实际值字段 valueField
     *回调函数 callback 参数为当前触发的复选框上绑定的数据
     */
    init: function (param) {
        var sthis = this;
        param = param || {};
        $(".lui_div_speak").remove();
        var luidivspeak = '<div class="lui_div_speak" id="lui_div_speak"/>';
        $("body").append(luidivspeak);
        $(".lui_wordspeak").each(function (index, item) {
            // $(item).unbind("mouseover");
            $(item).unbind("click");
            $(item).bind("click", function () {
                
                if ($(item).attr("data-play") == 1) {
                    return;
                }
                else {
                    $(item).attr("data-play", 1);
                    var audio = sthis.createAudio(item);
                    audio.onended = function () { $(item).attr("data-play", 0);}
                    audio.play();
                }
            });
            //$(item).unbind("mouseover");
            //$(item).bind("mouseover", function () {
            //    // var soundurl = $(item).attr("data-src");
            //    sthis.play(item);
            //});

        });
        if (param.auto) {
            param.loop = param.loop || 1;
            if (param.loop > 0) {
                $(".lui_wordspeak").each(function (index, item) {
                    sthis.play(item, param.loop, param.interval, param.callback);
                });
            }
        }
        sthis.param = param;
        return sthis;
    },
    //时间间隔
    play: function (item, loop, interval, callback) {
        var sthis = this;
        loop = loop || 1;
        interval = interval || 1000;
        var audio = sthis.createAudio(item);
        audio.onended = null;
        console.log(loop);
        console.log(audio);
        if (loop > 0) {
            audio.play();
            //避免点击播放时也触发事件，将callback 改为callback&&isclick;过滤掉点击触发
            if (callback ) {
                if (loop === 1) {
                    // audio.onended=callback;
                    var is_playFinish = setInterval(function () {
                        if (audio.ended) {
                            callback();
                            window.clearInterval(is_playFinish);
                        }
                    }, 5);
                    setTimeout(function () {
                        window.clearInterval(is_playFinish);
                    }, 10000);
                }
            }
            loop--;
        }
        if (loop > 0) {

            audio.onended = function () {
                setTimeout(function () {
                    sthis.play(item, loop, interval, callback);
                }, interval);
            };



        }
        else { return; }
    },
    playone: function (item) {
       
    },
    createAudio: function (item) {
        var url = $(item).attr("data-src");
        var div = document.getElementById('lui_div_speak');
        div.innerHTML = '<audio id="lui_audio_speak"><source src="' + url + '"></audio>';
        var audio = $("#lui_audio_speak")[0];
       
        return audio;
    }

};

module.exports=LuiWordSpeak;