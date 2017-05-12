$('#eg-header').html(require('component/headers'))
$('.header .nav li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});

