(function(e){e.fn.orbit=function(a){a=e.extend({animation:"fade",animationSpeed:500,advanceSpeed:4E3,startClockOnMouseOut:false,startClockOnMouseOutAfter:3E3,directionalNav:true,captions:true,captionAnimationSpeed:200,timer:false,bullets:false},a);return this.each(function(){function m(c){function g(){f.eq(h).css({"z-index":1});s=false}var h=b,k=c;if(h==k)return false;if(!s){s=true;if(c=="next"){b++;if(b==n)b=0}else if(c=="prev"){b--;if(b<0)b=n-1}else{b=c;if(h<b)k="next";else if(h>b)k="prev"}a.bullets&&
x();if(a.animation=="fade"){f.eq(h).css({"z-index":2});f.eq(b).css({opacity:0,"z-index":3}).animate({opacity:1},a.animationSpeed,g);a.captions&&o()}if(a.animation=="horizontal-slide"){f.eq(h).css({"z-index":2});k=="next"&&f.eq(b).css({left:t,"z-index":3}).animate({left:0},a.animationSpeed,g);k=="prev"&&f.eq(b).css({left:-t,"z-index":3}).animate({left:0},a.animationSpeed,g);a.captions&&o()}if(a.animation=="vertical-slide"){f.eq(h).css({"z-index":2});k=="prev"&&f.eq(b).css({top:u,"z-index":3}).animate({top:0},
a.animationSpeed,g);k=="next"&&f.eq(b).css({top:-u,"z-index":3}).animate({top:0},a.animationSpeed,g);a.captions&&o()}}}var b=0,n=0,t,u,s,d=e(this).addClass("orbit"),f=d.find("img, a img");f.each(function(){var c=e(this),g=c.width();c=c.height();d.width(g);t=d.width();d.height(c);u=d.height();n++});f.eq(b).css({"z-index":3});if(a.timer){d.append('<div class="timer"><span class="mask"><span class="rotator"></span></span><span class="pause"></span></div>');var j=e("div.timer"),p;if(j.length!=0){var C=
a.advanceSpeed/180,v=e("div.timer span.rotator"),y=e("div.timer span.mask"),z=e("div.timer span.pause"),l=0,A,w=function(){p=true;z.removeClass("active");A=setInterval(function(){var c="rotate("+l+"deg)";l+=2;v.css({"-webkit-transform":c,"-moz-transform":c,"-o-transform":c});if(l>180){v.addClass("move");y.addClass("move")}if(l>360){v.removeClass("move");y.removeClass("move");l=0;m("next")}},C)},q=function(){p=false;clearInterval(A);z.addClass("active")};w();j.click(function(){p?q():w()});if(a.startClockOnMouseOut){var B;
d.mouseleave(function(){B=setTimeout(function(){p||w()},a.startClockOnMouseOutAfter)});d.mouseenter(function(){clearTimeout(B)})}}}if(a.captions){d.append('<div class="caption"><span class="orbit-caption"></span></div>');var r=d.children("div.caption").children("span").addClass("orbit-caption").show(),o=function(){var c=f.eq(b).attr("rel"),g=e("#"+c).html(),h=r.height()+20;r.attr("id","#"+c).html(g);g?r.parent().stop().animate({bottom:0},a.captionAnimationSpeed):r.parent().stop().animate({bottom:-h},
a.captionAnimationSpeed)};o()}if(a.directionalNav){d.append('<div class="slider-nav"><span class="right">Right</span><span class="left">Left</span></div>');j=d.children("div.slider-nav").children("span.left");var D=d.children("div.slider-nav").children("span.right");j.click(function(){a.timer&&q();m("prev")});D.click(function(){a.timer&&q();m("next")})}if(a.bullets){d.append('<ul class="orbit-bullets"></ul>');var E=e("ul.orbit-bullets");for(i=0;i<n;i++){j=e("<li>"+i+"</li>");e("ul.orbit-bullets").append(j);
j.data("index",i);j.click(function(){a.timer&&q();m(e(this).data("index"))})}var x=function(){E.children("li").removeClass("active").eq(b).addClass("active")};x()}})}})(jQuery);

$(window).load(function(){
	$('#demo1').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'vertical-slide'
	});
	
	$('#demo2').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'horizontal-slide'
	});
	
	$('#demo3').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'horizontal-slide'
	});
	
	$('#demo4').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'vertical-slide'
	});
	
	$('#demo5').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'horizontal-slide'
	});
	
	$('#demo6').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'vertical-slide'
	});
	
	$('#demo7').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'horizontal-slide'
	});
	
	$('#demo8').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'vertical-slide'
	});
	
	$('#demo9').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'horizontal-slide'
	});
	
	$('#demo10').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'vertical-slide'
	});
	$('#demo11').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'horizontal-slide'
	});
	
	$('#demo12').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'vertical-slide'
	});
	
	$('#demo13').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'horizontal-slide'
	});
	
	$('#demo14').orbit({
		'bullets': true,
		'timer' : true,
		'animation' : 'vertical-slide'
	});
	
});