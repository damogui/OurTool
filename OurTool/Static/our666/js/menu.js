<!-- 头部（logo + 日期） -->
document.write ("<div class='head'>");
    document.write ("<div class='head_div'>");
        document.write ("<div class='head_left'>您好，欢迎来到<span>采药郎</span>！</div>");
        document.write ("<div class='head_right'><a href='#' class='to_ri_sp1'>设为主页</a><a href='#' class='to_ri_sp2'>加入收藏</a></div>");
    document.write ("</div>");
document.write ("</div>");
document.write ("<div class='clear'></div>");
    document.write ("<div class='header'>");
	
document.write ("<div class='top'>");
    document.write ("<div class='logo'><a href='index.html'><img src='images/logo.png' width='230' height='73' alt='采药郎' title='采药郎' /></a></div>");
    document.write ("<div class='date'>");
        document.write ("<div class='time'><a href='#'>7月25日 周五六月廿九</a></div>");
        document.write ("<div class='weather'><iframe width='455' scrolling='no' height='75' frameborder='0' allowtransparency='true' src='http://i.tianqi.com/index.php?c=code&id=38&icon=1&num=2&align=left'></iframe></div>");
        document.write ("<a href='#'><div class='adv1'><img src='images/guanggao1.jpg' width='178' height='55' alt='采药郎' title='采药郎' /></div></a>");
    document.write ("</div>");
document.write ("</div>");
document.write ("<div class='clear'></div>");
<!-- 头部（logo + 日期） end -->
<!-- 搜索栏 -->
document.write ("<div class='search'>");
    document.write ("<div class='ruzhu'><a href='#'><img src='images/ruzhu.png' width='208' height='49' alt='' title='' /></a></div>");
    document.write ("<div class='sea'> ");
        document.write ("<div class='sea_left'><p>综合搜索 ></p></div>");
        document.write ("<div class='sea_center'>");
		    document.write ("<div class='sea_center1'>");
            document.write ("<input class='txtSearch' name='keyword' type='text' id='search' value='请输入关键字' />");
			document.write ("</div>");
        document.write ("</div>");
        document.write ("<input type='button' value='搜索一下' class='sea_right' />");
        document.write ("<div class='sea_bottom'>");
            document.write ("<span class='span1'>热门：</span>");
            document.write ("<span><a href='#'>医药招商</a></span>");
            document.write ("<span><a href='#'>交易平台</a></span>");
            document.write ("<span><a href='#'>国家药监局</a></span>");
            document.write ("<span><a href='#'>原料企业</a></span>");
            document.write ("<span><a href='#'>制药设备</a></span>");
            document.write ("<span><a href='#'>医药公司</a></span>");
            document.write ("<span><a href='#'>修正药业</a></span>");
        document.write ("</div>");
    document.write ("</div>");
document.write ("</div>");
document.write ("<div class='search_bottom'></div>");
document.write ("<div class='clear'></div>");
<!-- 搜索栏 end -->
document.write ("</div>");
document.write ("<div class='clear'>");
document.write ("</div>");

$(document).ready(function(){

	 $(".suspend").mouseover(function() {
        $(this).stop();
        $(this).animate({width: 160}, 400);
    })

    $(".suspend").mouseout(function() {
        $(this).stop();
        $(this).animate({width: 40}, 400);
    });
	
});















/*<!-- 头部（logo + 日期） -->
document.write ("<div class='head'>");
    document.write ("<div class='head_div'>");
        document.write ("<div class='head_left'>您好，欢迎来到<span>采药郎</span>！</div>");
        document.write ("<div class='head_right'><a href='#' class='to_ri_sp1'>设为主页</a><a href='#' class='to_ri_sp2'>加入收藏</a></div>");
    document.write ("</div>");
document.write ("</div>");
document.write ("<div class='clear'></div>");
    document.write ("<div class='header'>");
	
document.write ("<div class='top'>");
    document.write ("<div class='logo'><a href='index.html'><img src='images/logo.png' width='230' height='73' alt='采药郎' title='采药郎' /></a></div>");
    document.write ("<div class='date'>");
        document.write ("<div class='time'><a href='#'>7月25日 周五六月廿九</a></div>");
        document.write ("<div class='weather'><iframe width='455' scrolling='no' height='75' frameborder='0' allowtransparency='true' src='http://i.tianqi.com/index.php?c=code&id=38&icon=1&num=2&align=left'></iframe></div>");
        document.write ("<a href='#'><div class='adv1'><img src='images/guanggao1.jpg' width='178' height='55' alt='采药郎' title='采药郎' /></div></a>");
    document.write ("</div>");
document.write ("</div>");
document.write ("<div class='clear'></div>");
<!-- 头部（logo + 日期） end -->
<!-- 搜索栏 -->
document.write ("<div class='search'>");
    document.write ("<div class='ruzhu'><a href='#'><img src='images/rzjm.jpg' width='208' height='49' alt='' title='' /></a></div>");
    document.write ("<div class='sea'> ");
        document.write ("<div class='sea_left'><p>综合搜索 ></p></div>");
        document.write ("<div class='sea_center'>");
		    document.write ("<div class='sea_center1'>");
            document.write ("<input class='txtSearch' name='keyword' type='text' id='search' value='请输入关键字' />");
			document.write ("</div>");
        document.write ("</div>");
        document.write ("<input type='button' value='搜索一下' class='sea_right' />");
        document.write ("<div class='sea_bottom'>");
            document.write ("<span class='span1'>热门：</span>");
            document.write ("<span><a href='#'>医药招商</a></span>");
            document.write ("<span><a href='#'>交易平台</a></span>");
            document.write ("<span><a href='#'>国家药监局</a></span>");
            document.write ("<span><a href='#'>原料企业</a></span>");
            document.write ("<span><a href='#'>制药设备</a></span>");
            document.write ("<span><a href='#'>医药公司</a></span>");
            document.write ("<span><a href='#'>修正药业</a></span>");
        document.write ("</div>");
    document.write ("</div>");
document.write ("</div>");
document.write ("<div class='search_bottom'></div>");
document.write ("<div class='clear'></div>");
<!-- 搜索栏 end -->
document.write ("</div>");
document.write ("<div class='clear'>");
document.write ("</div>");

$(document).ready(function(){

	 $(".suspend").mouseover(function() {
        $(this).stop();
        $(this).animate({width: 160}, 400);
    })

    $(".suspend").mouseout(function() {
        $(this).stop();
        $(this).animate({width: 40}, 400);
    });
	
});
*/


