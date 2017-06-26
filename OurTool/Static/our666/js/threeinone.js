/* 九宫格特效 */
$(document).ready(function(){					   
	$("#Sudokus").find(".pres").hide();//初始化为第一版
	var page=1;//初始化当前的版面为1
	var $show=$("#Sudokus").find(".Sudoku_boxs");//找到图片展示区域
	var page_count=$show.find("ul").length;
	var $width_box=$show.parents("#wai_box1").width();//找到图片展示区域外围的div
	//显示title文字
	$show.find("li").ready(function(){
		$(this).find(".title").show();								
	},function(){
		$(this).find(".title").hide();
	})
	function nav(){
		if(page==1){
			$("#Sudokus").find(".pres").hide().siblings(".nexts").show();
		}else if(page==page_count){
			$("#Sudokus").find(".nexts").hide().siblings(".pres").show();
		}else{
			$("#Sudokus").find(".pres").show().siblings(".nexts").show();
		}
	}
	$("#Sudokus").find(".nexts").click(function(){
		//首先判断展示区域是否处于动画
		if(!$show.is(":animated")){
			$show.animate({left:'-='+$width_box},"normal");
			page++;
			nav();
			$number=page-1;
			$("#Sudokus").find(".nav a:eq("+$number+")").addClass("now").siblings("a").removeClass("now");
			return false;
		}
	})
	
	$("#Sudokus").hover(
	function () {
		$("#Sudokus .pres").stop(false,true);
		$("#Sudokus .nexts").stop(false,true);
		$("#Sudokus .pres").animate({ left: 0}, { duration: 5 });
		$("#Sudokus .nexts").animate({ right: 0}, { duration: 5 });
	}, function () {
		$("#Sudokus .pres").stop(false,true);
		$("#Sudokus .nexts").stop(false,true);
		$("#Sudokus .pres").animate({ left: -500}, { duration: 5 });
		$("#Sudokus .nexts").animate({ right: -300}, { duration: 5 });
	}
    );

	$("#Sudokus").find(".pres").click(function(){
		if(!$show.is(":animated")){
			$show.animate({left:'+='+$width_box},"normal");
			page--;
			nav();
			$number=page-1;
			$("#Sudokus").find(".nav a:eq("+$number+")").addClass("now").siblings("a").removeClass("now");
		}
		return false;
	})
	$("#Sudokus").find(".nav a").click(function(){
		$index=$(this).index();
		page=$index+1;
		nav();
		$show.animate({left:-($width_box*$index)},"normal");	
		$(this).addClass("now").siblings("a").removeClass("now");
		return false;
	})
	// 隐藏所有工具提示
	$(".Sudoku_boxs li").each(function(){
		$(".Sudoku_boxs li .title", this).css("opacity", "0");
	});
	
	$(".Sudoku_boxs li").hover(function(){ // 悬浮 
		$(this).stop().fadeTo(500,1).siblings().stop().fadeTo(500,0.6);
		$(".Sudoku_boxs li .title", this).stop().animate({opacity:1,bottom:"0px"},300);
	},function(){ // 寻出
		$(this).stop().fadeTo(500, 1).siblings().stop().fadeTo(500,1);	
		$(".Sudoku_boxs li .title", this).stop().animate({opacity:0,bottom:"-30px"},300);
	});				   
});

/* 九宫格特效 end */


/* 翻页模块一 */
$(".fourinone").ready(function(){
    $(this).find(".one_pre,.one_next").stop(true, true).fadeTo("show", 0.5)
},
function(){
    $(this).find(".one_pre,.one_next").fadeOut()
});
$(".fourinone").slide({
    mainCell: ".one",
    effect: "fold",
    autoPlay: true,
    autoPage: true,
    trigger: "click",
    startFun: function(i) {
        var curLi = jQuery(".fourinone .one .theone").eq(i);
        if ( !! curLi.attr("_src")) {
            curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
        }
    }
});
/* 翻页模块一 end */

/* 翻页模块二 */
$(".fullSlide").ready(function(){
    $(this).find(".yjjp_pre,.yjjp_next").stop(true, true).fadeTo("show", 0.5)
},
function(){
    $(this).find(".yjjp_pre,.yjjp_next").fadeOut()
});
$(".fullSlide").slide({
    mainCell: ".bd",
    effect: "fold",
    autoPlay: true,
    autoPage: true,
    trigger: "click",
    startFun: function(i) {
        var curLi = jQuery(".fullSlide .bd ul").eq(i);
        if ( !! curLi.attr("_src")) {
            curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
        }
    }
});
/* 翻页模块二 end */
