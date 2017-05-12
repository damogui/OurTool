var stopws;
$(function() {
    //stopws = new WebSocket('ws://192.168.180.183:8888/ws');
    stopws = new WebSocket(socketUrl);
    console.log("正在链接中。。。。");
    stopws.onopen = function() {
        console.log('已经连接');
        if (stopws.readyState == WebSocket.OPEN) {
            stopws.send("000001/" + userId);
            console.log("登录了");
            stopws.send("000009/" + userId);
            console.log("请求一下 暂停状态");
        }
        setInterval(function () {
            if (stopws.readyState == WebSocket.OPEN) {
                stopws.send("000002/" + userId);
                console.log("发送心跳");
            }
        }, 180000);
    }
    stopws.onmessage = function (evt) {
        console.log("reciveMessage:"+evt.data);
        var arrary = evt.data.split('/');
        switch (arrary[0]) {
            case "000006":
            case "000010":
                if (arrary[2] == "1") {
                    pausepop.show();
                }
                if (arrary[0] == "000006") {
                    stopws.send("000008/" + userId);
                }
                break;
            case "000011":
                pausepop.hide();
                stopws.send("000012/" + userId);
                break;
            default:
                break;
        }

    }
    stopws.onerror = function(evt) {
        console.log(JSON.stringify(evt));
    }
    stopws.onclose = function() {
        console.log('已经关闭');
    }

    
    
});



var pausepop = (function (obj) {
    obj.pausePopCallback = function () {
        console.log("老师暂停了");
    }
    obj.pauseHideCallback = function () {
        console.log("老师继续上课了");
    }
    var op = {
        show: function () {
            $("#pop-mask-global").remove();
            $("#time-pop-global").remove();
            var popmask = '<div class="pop-mask-global" id="pop-mask-global"></div>';
            $('body').append(popmask);
            var pophtml = '<div class="time-pop teacherpause"  id="time-pop-global"><div class="inner_wrap">';
            pophtml += '<!--全局暂停 开始--><div class="time_center "><div class="all_pause"> </div>';
            pophtml += '<p class="f18 col-ff8716 info" style="">摘下耳机，老师有话说</p></div>';
            pophtml += '<!--全局暂停 结束--></div></div>';
            $('body').append(pophtml);

            $("#pop-mask-global").show();
            $("#time-pop-global").show();
            if (obj.pausePopCallback) {
                obj.pausePopCallback();
            }

        },
        hide: function () {
            $("#pop-mask-global").remove();
            $("#time-pop-global").remove();
            if (obj.pauseHideCallback) {
                obj.pauseHideCallback();
            }
        },

    }
    return op;
})(window);