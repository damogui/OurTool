
if($('#eg-header').length){//检测是否有导航
    var data={title:'20'};
    var html=require('component/student-header')(data);
    $('#eg-header').html(html);
    $('.header .nav li').click(function(){
        if($(this).is('.header .nav li:last')){return false}
        $(this).addClass('active').siblings().removeClass('active');
    });

    var val=$('.main-pop').outerHeight()<$(window).height()-82;
    if(val){
        $('#content').height($(window).height()-82);
    }
    $(window).resize(function(){
        var val=$('.main-pop').outerHeight()<$(window).height()-82;

        if(val){
            $('#content').height($(window).height()-82);
        }else{
            $('#content').height($('.main-pop').outerHeight());
        }
    })
}else{
   var val=$('.main-pop').outerHeight()<$(window).height();
    console.log($('.main-pop').outerHeight())
   if(val){
       $('#content').height($(window).height());
   }
    $(window).resize(function(){
        var val=$('.main-pop').outerHeight()<$(window).height();
        if(val){
            $('#content').height($(window).height());
        }else{
            $('#content').height($('.main-pop').outerHeight());
        }
    })
}
