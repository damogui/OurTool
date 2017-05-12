<div id="header">
	{{include '../tplb/b'}}
	{{include '../tplb/c'}}
	<ul id="nav">
	<div>ksafhskjgbfadjk倒计时这个设置总路径</div>
	{{each list as item}}

	    <li><a href="http://www.qq.com">{{item.time | dateFormat:'yyyy-MM-dd hh:mm:ss'}}</a></li>
	{{/each}}
	</ul>
</div>
<!-- 头部 结束 --> 