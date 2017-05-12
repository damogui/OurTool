 
 <div class="font18" style="height:85px;line-height:85px;">
            <span id="perName">{{UserName}}</span>
        </div>
        <div>
            <span class="mr20">姓&emsp;&emsp;名:</span>
            <span id="perName0">{{UserName}}</span>
        </div>
        <div class="mt20">
            <span class="mr20">账&emsp;&emsp;号:</span>
            <span id="perLoginId"> {{LoginId}}</span>
        </div>
        <div class="mt20">
            <span class="mr20">性&emsp;&emsp;别:</span>
			{{if Gender==1}}
            <span  > 男</span>
			{{else}}
			 <span  > 女</span>
			{{/if}}
        </div>
        <div class="mt20">
            <span class="mr20">角&emsp;&emsp;色:</span>
            <span id="perRoleName">{{RoleName}}</span>
        </div>
{{if IsShowSchool==0}}
<div class="mt20">
  <span class="mr20">管理校区:</span>
  <span id="perScName">{{SchoolName}}</span>
</div>
{{else}}

{{/if}}

        <div class="mt20">
            <span class="mr20">入职时间:</span>
            <span id="perEnterTime">{{EnterTime}}</span>
        </div>
        <div class="mt20">
            <span class="mr20">手&emsp;&emsp;机:</span>
            <span id="perTel"> {{Tel}}</span>
        </div>