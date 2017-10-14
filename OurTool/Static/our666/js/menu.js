//<!-- 头部（logo + 日期） -->
document.write ("<div class='head'>");
    document.write ("<div class='head_div'>");
        document.write ("<div class='head_left'>您好，欢迎来到<span>our666</span>！</div>");
        document.write("<div class='head_right'><a href='#'  class='to_ri_sp1' id='makeHome'>设为主页</a><a href='#' id='addBro' class='to_ri_sp2'>加入收藏</a></div>");
    document.write ("</div>");
document.write ("</div>");
document.write ("<div class='clear'></div>");
    document.write ("<div class='header'>");
	
document.write ("<div class='top'>");
document.write("<div class='logo'><a href='/Home/Index'><img src='/Static/our666/images/logo.png' width='230' height='73' alt='our666' title='our666' /></a></div>");
    document.write ("<div class='date'>");
    document.write("<div class='time'><a  target='_blank' href='https://www.baidu.com/s?word=%E6%97%A5%E5%8E%86&tn=siteour666&ie=utf-8' id='nowDateTimeSpan' >7月25日 周五六月廿九</a></div>");
    document.write("<div class='weather'><iframe width='455' scrolling='no' height='75' frameborder='0' allowtransparency='true' src='https://is.tianqi.com/index.php?c=code&id=12&icon=1&num=3&site=12'></iframe></div>");
        //document.write ("<a href='#'><div class='adv1'><img src='/Static/our666/images//guanggao1.jpg' width='178' height='55' alt='our666' title='our666' /></div></a>");
    document.write ("</div>");
document.write ("</div>");
document.write ("<div class='clear'></div>");
//<!-- 头部（logo + 日期） end -->
//<!-- 搜索栏 -->

document.write("<div class='search'>");

document.write("<div class='ruzhu'><a href='/Our/Our/AdIndex'><img src='/Static/our666/images//ruzhu.png' width='208' height='49' alt='' title='' /></a></div>");
    document.write("<div class='sea'> ");
    
    document.write("<div class='sea_left'><p>百度</p></div>");
    document.write("<form action='https://www.baidu.com/baidu' target='_blank'  id='form'>");//表单开始
        document.write ("<div class='sea_center'>");
        document.write("<div class='sea_center1'>");
      
        document.write("<input class='txtSearch text' style='position: absolute' autocomplete='off'   name='word' type='text' id='searchText' placeholder='请输入关键字' /> <div id='auto'  class='auto'> </div>");

			document.write ("</div>");
        document.write ("</div>");
        document.write("<input type='submit' value='百度一下' class='sea_right'  id='btnSearch' style='cursor:pointer' />");
        document.write(" </form>");//提交尾部
        document.write ("<div class='sea_bottom'>");
            document.write ("<span class='span1'>热门：</span>");
            document.write ('<span><a href="http://edu.sina.com.cn/gaokao/" target="_blank">2017年高考专区</a></span>');
            document.write ('<span><a href="http://www.zhongkao.com" target="_blank">2017年查分入口</a></span>');
            //document.write ("<span><a href='#'>国家药监局</a></span>");
            //document.write ("<span><a href='#'>原料企业</a></span>");
            //document.write ("<span><a href='#'>制药设备</a></span>");
            //document.write ("<span><a href='#'>医药公司</a></span>");
            //document.write ("<span><a href='#'>修正药业</a></span>");
        document.write ("</div>");
        document.write("</div>");
       
document.write ("</div>");
document.write ("<div class='search_bottom'></div>");
document.write ("<div class='clear'></div>");
//<!-- 搜索栏 end -->
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
















