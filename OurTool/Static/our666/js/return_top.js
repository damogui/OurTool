$(document).ready(function(){
	/*返回顶部*/
	$('#roll_top').hide();
	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			$('#roll_top').fadeIn(400);//当滑动栏向下滑动时，按钮渐现的时间
		} 
		else {
			$('#roll_top').fadeOut(0);//当页面回到顶部第一屏时，按钮渐隐的时间
		}
	});
	
	$('#sx2').hide();
	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			$('#sx2').fadeIn(400);//当滑动栏向下滑动时，按钮渐现的时间
		} 
		else {
			$('#sx2').fadeOut(0);//当页面回到顶部第一屏时，按钮渐隐的时间
		}
	});
	
	$('#roll_top').click(function () {
		$('html,body').animate({
			scrollTop : '0px'
		}, 300);//返回顶部所用的时间 返回顶部也可调用goto()函数
	});
});
function goto(selector){
	$.scrollTo ( selector , 1000);	
}