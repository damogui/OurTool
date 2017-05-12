function LuiGuide() {

};
LuiGuide.prototype.popup=function(dist,getItbutton,has,line,box,dir,content,hasimg,pd,url){//dist那个元素为引导 yes有引导线和框，false没引导线和框  line 线的宽高，box框的宽高  dir向上引导还是向下引导up 向上 down向下,
                                                            //content 传入的内容  hasimg按钮有没有图片  url  连接框的地址
                                                            //getItbutton  get-it按钮触发的事件类  pd:外围的padding

    this.init();
    var line=line;
    var box=box;
    var url=url;
    var pd=pd
    if(url){
        url='/egword/build/img/leade-guide-lineS.png'
    }else{
        url='/egword/build/img/guide-line.png'
    }
   
    if(pd){
        pd=pd
    }else{pd=10}
    var hasimg=hasimg;
   function removeUnit(str,unit) {
        unit=unit||"px";
        str=str+"";
        if(str.indexOf(unit)<0)
        {
            return str*1;
        }
        else{
            return (str.substr(0,str.indexOf(unit)))*1;
        }

    }
    if(!has){
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        $(".guide-pop").remove();
        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
    }else{
        $('<div class="guide-line" style="width:'+line.width+'px;height:'+line.height+'px;background:url('+url+') no-repeat"></div>').insertBefore(document.body.firstChild);
        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
        $('<div class="guide-pop"></div>').insertBefore(document.body.firstChild);
        $('<div class="guide-msg-pop" style="width:' + box.width + 'px;height:' + box.height + 'px"><span class="anchor"></span><div class="padding"><p>' + content + '</p></div><div class="button-center"><span class="get-it ' + getItbutton + '">我知道了</span></div></div>').insertBefore(document.body.firstChild);
        if(hasimg){
            $(".guide-msg-pop").remove();
            $('<div class="guide-msg-pop" style="width:' + box.width + 'px;height:' + box.height + 'px;"><span class="anchor"></span><div class="padding"><p>' + content + '</p></div><div class="bottombutton"><span class="get-it ' + getItbutton + '">我知道了</span><img src="' + hasimg + '" alt=""></div></dvi></div>').insertBefore(document.body.firstChild);
        }
    }
   
    $('.' + getItbutton).on('click', function () {
        $('.guide-pop').hide();
    });
    $('.guide-pop').on('click', function () {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        $(".guide-pop").remove();
    });
    if(dist){
        var d=$(dist);
        var pos=d.offset();
        var t=pos.top-pd-removeUnit(d.css("border-top-width"));
        var l=pos.left-pd-removeUnit(d.css("border-left-width"));
        var w=d.width()+removeUnit(d.css("padding-left"))+removeUnit(d.css("padding-right"));
        var h=d.height()+removeUnit(d.css("padding-top"))+removeUnit(d.css("padding-bottom"));
        $(".guide-over-layer").css({"top":t+"px","left":l+"px","width":w,"height":h,"padding":pd+'px'});
        console.log(pd)
        var hs=$(".guide-over-layer").outerHeight();
        var ws=$(".guide-over-layer").outerWidth();
        if(dir=='up'){
            $(".guide-line").css({"top":t-line.height+"px","left":l+ws/2+"px"});
            $('.guide-msg-pop').css({"top":t-line.height-box.height/3+"px","left":l+ws/2+line.width+"px"});
        }else{
            $(".guide-line").css({"top":t+hs/3+"px","left":l-line.width+"px"});
            $('.guide-msg-pop').css({"top":t+line.height+hs/3+"px","left":l-box.width/2-line.width+"px"});
            if(url.indexOf('leade-guide-lineS')>0){
                console.log(00)
                $(".guide-line").css({"top":t+hs/2+"px","left":l-line.width/2-10+"px"});
                $('.guide-msg-pop').css({"top":t+hs/2+box.height/2+"px","left":l+"px"});
            }
        }

    }
};
LuiGuide.prototype.init=function(){
    $(".guide-over-layer").remove();
    $(".guide-line").remove();
    $(".guide-pop").remove();
    $(".guide-msg-pop").remove();
    /*$('<div class="guide-line"></div>').insertBefore(document.body.firstChild);
    $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
    $('<div class="guide-msg-pop"><span class="anchor"></span></div>').insertBefore(document.body.firstChild);*/



    return this;
};
module.exports=LuiGuide;
