
var total_data = '';
var reqs_Book_id = '';
var reqs_next_unit_id = '';
var audio = new Audio();
var time_clear = null;
var drag_audio = null;//拖动时候播放的元素
//定义一个对象定义当前的播放状态
function CurrentAudio(elem, index, dataArry, unmber) {//elem哪一个元素，播放的元素的index的值,unmber当前播放的次数,status当前元素的播放状态
    this.index = index;
    this.unmber = 0;//是否循环数据  0初次播放 1循环下一个
    this.status = false;//status当前元素的播放状态
    this.data = dataArry;//data定义请求的数据
    var indexs = this.index;
    this.btn_click = '';
    elem.src = this.data[indexs];
    elem.paused = this.status;
    this.totalTimes = 0;
    this.loop = 0;//进行标识循环的状态。0表示单元循环的状态，1表示单曲循环的状态  2表示整本教材循环的状态。。
    this.move = true;//true为自由播放模式。。false为拖动模式
    var This = this;
    this.ratio = 0;//当前拖动的值
    this.current_time = 0;//拖动的时候的当前时间
    this.pre_time = 0;//标记上一次的播放时间
    this.start = 0;//鼠标开始的位置
    $('.pre').click(function (e) {//当前播放状态的上一个
        var pre = $(e.target).attr('class');
        clearTimeout(time_clear);
        time_clear = null;
        elem.loop = false;
        This.unmber = 0;
        $('.inner-bar').css('width', 0 + '%');
        $('.dot').css('left', 0 + '%');

        This.loop_pre(pre);
    });
    $('.next').click(function (e) {//当前播放状态的下一个
        clearTimeout(time_clear);
        time_clear = null;
        elem.loop = false;
        This.unmber = 0;
        $('.inner-bar').css('width', 0 + '%');
        $('.dot').css('left', 0 + '%');
        This.loop_next();

    });
    this.paused = function () {
        if (This.status) {
            elem.play();
        } else {
            elem.pause();
        }
    };
    this.loop_next = function () {
        if (This.loop == 0 || This.loop == 1) {//点击时候的循环
            This.index = This.index + 1;
            var next_index = This.index;
            if (next_index >= This.data.length) {
                This.index = 0;
                next_index = 0;
            }
            elem.src = This.data[next_index];
            This.paused();
        } else {
            This.index = This.index + 1;
            var next_index = This.index;
            if (next_index >= This.data.length) {

                This.request();
            } else {
                elem.src = This.data[next_index];
                This.paused();
            }
        }
    };
    this.loop_pre = function (pre) {
        if (This.loop == 0 || This.loop == 1) {//如果是单元循环
            This.index = This.index - 1;
            var pre_index = This.index;
            if (pre_index < 0) {
                This.index = This.data.length - 1;
                pre_index = This.data.length - 1;
            }
            elem.src = This.data[pre_index];
            This.paused();
        } else {

            This.index = This.index - 1;
            var pre_index = This.index;
            if (pre_index < 0) {//进行整本教材的循环
                This.request(pre);
            } else {
                elem.src = This.data[pre_index];
                This.paused();
            }
        }


    };
    this.request = function (pre) {//数据请求下一个单元的接口的接口
       var data = { BookID: reqs_Book_id, UnitID: reqs_next_unit_id };
        $.ajax({
            url: '/Experience/Index/GetWord',
            type: "post",
            data: data,
            success: function (data) {
                reqs_Book_id = data.Data.M.BookID;
                reqs_next_unit_id = data.Data.M.NextUnitID;
                document.title = reqs_next_unit_id;
                $('.title-audio .title').html(data.Data.M.UnitTitle);
                $('.main-decript').html(data.Data.M.Remark);
                //对得到的数据进行过滤
                var filter_Arry = data.Data.N.map(function (v) {
                    if (v.f_audio) { return v.f_audio; }
                });
                console.log(filter_Arry)
               This.data = filter_Arry;
                if (This.loop == 2) {//整本教材循环
                   
                    if (pre == 'pre') {
                        This.index = This.data.length-1;
                        elem.src = This.data[This.index];
                        This.paused();
                    } else {
                        This.index = 0;
                        elem.src = This.data[0];
                        This.paused();
                    }
                    
                }
            },
            error: function () {

            }
        })

    };
    $('#btn-stat').click(function () {//开始暂停按钮
        if ($(this).attr('class') == 'stop') {
            $(this).attr('class', 'start');
            $('.state').html('正在播放...')
            clearTimeout(time_clear);
            time_clear = null;
            elem.play();
            This.status = true;
            
        } else {
            $('.state').html('停止播放...')
            $(this).attr('class', 'stop');
            clearTimeout(time_clear);
            time_clear = null;
            elem.pause();
            This.status = false;
            
        }
    });
    //点击进行单元  单曲。。整本教材的循环切换
    var count = 0;
    $('#event-loop').click(function () {
        count++;
        if (count % 3 == 0) {
            This.loop = 0;
            if ($(this).attr('class') != 'unit-loop') { $(this).attr('class', ''); $(this).addClass('unit-loop') }
        } else if (count % 3 == 1) {
            This.loop = 1;
            if ($(this).attr('class') != 'loop') { $(this).attr('class', ''); $(this).addClass('loop') }
        } else { This.loop = 2; if ($(this).attr('class') != 'book-loop') { $(this).attr('class', ''); $(this).addClass('book-loop') } }

    });
    this.repeat = function () {
        var repeat_index = This.index;
        elem.src = This.data[repeat_index];
        This.paused();
        This.unmber = 1;
    };
    this.next = function () {//自动播放的时候的循环
        clearTimeout(time_clear);
        time_clear = null;
        if (This.loop == 0) {//如果是单元循环
            This.index = This.index + 1;
            var next_index = This.index;
            if (next_index >= This.data.length) {
                This.index = 0;
                next_index = 0;
            }
            elem.src = This.data[next_index];
            This.paused();
        } else if (This.loop == 1) {//单曲循环循环的是整个单元的上一个下一个
            var next_index = This.index;
            elem.src = This.data[next_index];
            This.paused();
        } else {
            This.index = This.index + 1;
            var next_index = This.index;
            if (next_index >= This.data.length) {
                This.request();
            } else {
                elem.src = This.data[next_index];
                This.paused();
            }
        }
    };
    this.audio_auto = function () {//音频结束的时候调用的函数
        if (This.unmber == 0) {
            This.repeat();//相同的进行读两遍操作;
        } else {
            This.unmber = 0;
            time_clear = setTimeout(function () {
                This.next();
                $('.inner-bar').css('width', 0 + '%');
                $('.dot').css('left', 0 + '%');
            }, 2000);
        }
    };
    this.timeup = function () {
        elem.loop = false;
        var value = elem.currentTime / elem.duration * 50 + '%';
      //  elem.removeEventListener('timeupdate', This.timeup);
        //document.removeEventListener('touchend', This.move_end);//取消dom元素的绑定
        if (elem.currentTime / elem.duration) {
            if (This.unmber == 0) {
                $('.inner-bar').css('width', value);
                $('.dot').css('left', value);
                This.ratio = elem.currentTime / elem.duration * 50;
                if ($('.totl-time').html() != Number((elem.duration * 2).toFixed(2))) {
                    $('.totl-time').html(Number((elem.duration * 2).toFixed(2)));
                    This.totalTimes = Number((elem.duration * 2).toFixed(2));
                }
                $('.current-time').html(elem.currentTime.toFixed(2));
                This.current_time = elem.currentTime.toFixed(2);
            } else {
                var value = elem.currentTime / elem.duration * 50 + 50 + '%';
                $('.inner-bar').css('width', value);
                $('.dot').css('left', value);
                This.ratio = elem.currentTime / elem.duration * 50 + 50;
                var time = (Number(elem.duration) + Number(elem.currentTime)).toFixed(2);
                if (This.ratio > 99) {//差值大设置相等
                    time = This.totalTimes;
                }
                $('.current-time').html(time);
                This.current_time = time;
            }
        }

    };
    this.move_touch = function (e) {//move事件在执行
        e.preventDefault();
        clearTimeout(time_clear);
        time_clear = null;
        var oLeft = ($(window).width()) * 0.075;
        var touches = e.touches[0];
        var dist = touches.clientX - oLeft;
        This.start = dist;
        This.ratio = parseFloat((dist / $('.progress').width() * 100).toFixed(2));
        if (This.ratio >= 100) {
            This.ratio = 100;
            elem.currentTime
        } else if (This.ratio <= 0) {
            This.ratio = 0;
            elem.currentTime = 0;
        }
        if (This.ratio <= 50) {
            This.current_time = This.ratio / 100 * This.totalTimes;//当前播放的时间等于
            elem.currentTime = parseFloat(This.current_time.toFixed(2));
        } else {
            This.current_time = This.ratio / 100 * This.totalTimes - This.totalTimes / 2;//当前播放的时间等于
            elem.currentTime = parseFloat(This.current_time.toFixed(2));
        }
        $('.inner-bar').css('width', This.ratio + '%');
        $('.dot').css('left', This.ratio + '%');
    }
    this.move_end = function (e) {//鼠标结束的事件
        clearTimeout(time_clear);
        time_clear = null;
        var oLeft = ($(window).width()) * 0.075;
        var touches = e.changedTouches[0];
        This.star = touches.clientX - oLeft;
        document.removeEventListener('touchmove', This.move_touch);
        if (This.ratio <= 50 && elem.loop != "loop") {//&& This.ratio < 99
            elem.loop = 'loop';
            This.unmber = 0;
        } else {
            elem.loop = false;
            This.unmber = 1;
        }
        elem.currentTime = This.current_time;
        This.paused();
        elem.addEventListener('timeupdate', This.timeup);
        elem.addEventListener('ended', This.audio_auto);
    };
    elem.addEventListener('ended', This.audio_auto);
    elem.addEventListener('timeupdate', This.timeup);
    var dot = document.getElementsByClassName('dot')[0];
    var innerBar = document.getElementsByClassName('inner-bar')[0];
    var progress = document.getElementsByClassName('progress')[0];
   
    $('.dot').on('touchstart', function (e) {
        e.preventDefault();
        clearTimeout(time_clear);
        time_clear = null;
        elem.currentTime = This.current_time;
        elem.removeEventListener('timeupdate', This.timeup);
        elem.removeEventListener('ended', This.audio_auto);
        elem.currentTime = This.current_time;
        This.paused();
        $(document).on('touchmove', This.move_touch);
        This.paused();
        $('.dot').on('touchend', function (e) {//鼠标结束的事件
            clearTimeout(time_clear);
            time_clear = null;
            e.preventDefault();
            var oLeft = ($(window).width()) * 0.075;
            var touches = e.changedTouches[0];
            This.star = touches.clientX - oLeft;
            $(document).off('touchmove', This.move_touch);
            if (This.ratio <= 50 && elem.loop != "loop") {//&& This.ratio < 99
                elem.loop = 'loop';
                This.unmber = 0;
            } else {
                elem.loop = false;
                This.unmber = 1;
            }
            elem.currentTime = This.current_time;
            elem.addEventListener('timeupdate', This.timeup);
            elem.addEventListener('ended', This.audio_auto);
            This.paused();
        })

    })

}

$.ajax({
    url: '/Experience/Index/GetWord',
    type: "post",
    data: data,
    success: function (data) {
        total_data = data;
        reqs_Book_id = total_data.Data.M.BookID;
        reqs_next_unit_id = total_data.Data.M.NextUnitID;

        //对得到的数据进行过滤
        var filter_Arry = data.Data.N.map(function (v) {
            if (v.f_audio) {
                return v.f_audio;
            }
        });
        
        //对数据进行填充
        $('.title-audio .title').html(data.Data.M.UnitTitle);
        $('.main-decript').html(data.Data.M.Remark);
        //初始化调用上面的对象
        var audio_init = new CurrentAudio(audio, 0, filter_Arry);//filter_Arry  
        //c初始化的时候进行音频的播放
        audio_init.paused();

    },
    error: function () {

    }
})