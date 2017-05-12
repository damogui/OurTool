$('#eg-header').html(require('component/header'))
$('.header .nav li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});

