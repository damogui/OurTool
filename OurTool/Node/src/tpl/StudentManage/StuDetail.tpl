<div>
  <span class="mr20">姓&emsp;&emsp;名:</span>
  <span>{{StuName}}</span>
</div>
<div class="mt20">
  <span class="mr20">账&emsp;&emsp;号:</span>
  <span> {{LoginId}}</span>
</div>
<div class="mt20">
  <span class="mr20">性&emsp;&emsp;别:</span>
  {{if Gender==1}}
  <span> 男</span>
  {{else}}
  <span> 女</span>
  {{/if}}
</div>
<div class="mt20">
  <span class="mr20">手&emsp;&emsp;机:</span>
  <span>{{Tel}}</span>
</div>
<div class="mt20">
  <span class="mr20">年&emsp;&emsp;级:</span>
  <span>{{GradeId | GetBigGrade}}</span>
</div>
<div class="mt20">
            <span class="mr20">教材版本:</span>
            <span>{{EditionName}}</span>
        </div>

<div class="mt20">
  <span class="mr20">课程信息:</span>
</div>
<div class="table" style="margin-top:15px;">
  <table class="wd100">
    <tr>
      <td>报班课程</td>
      <td>版本</td>
      <td>班级</td>
      <td>班主任</td>
      <td>课次进度</td>
      <td>有效期</td>
      <td>读音</td>
    </tr>
    {{include './StuDetail2' CourseInfoList}}
  </table>
</div>

