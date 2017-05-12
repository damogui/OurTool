{{if isgroup}}

<!--分组排列情况-->
<div class="list-block cards-list">
    <ul>
{{each list as v i}}

        {{if v.GroupIndexId==-100}}

        <li class="card">
            <div class="card-header">不上课的学生</div>
            <div class="card-content">
                <div class="card-content-inner">
                    {{each v.StudentInfoList as d j}}
                    <div class="stu def">
                        <luicheck class="lui_checkbox" data-name="g1" data-val="{{d.StudentID}}" data-groupindexid="{{v.GroupIndexId}}" data-text="" data-checked="0"></luicheck>
                        <span class="check-name">{{d.UserName}}</span>
                        <span class="info">{{(d.BookNumber - d.LeftNumber)}}/{{d.BookNumber}}</span>
                    </div>
                    {{/each}}
                </div>
            </div>
        </li>
        {{else}}
         <li class="card">
            <div class="card-header">{{v.GroupName}} 队</div>
            <div class="card-content">
                <div class="card-content-inner">
                    {{each v.StudentInfoList as d j}}
                    <div class="stu sel">
                        <luicheck class="lui_checkbox" data-name="g1" data-val="{{d.StudentID}}" data-groupindexid="{{v.GroupIndexId}}" data-text="" data-checked="1"></luicheck>
                        <span class="check-name">{{d.UserName}}</span>
                        <span class="info">{{(d.BookNumber - d.LeftNumber)}}/{{d.BookNumber}}</span>
                    </div>
                    {{/each}}
                </div>
            </div>
        </li>
        {{/if}}

{{/each}}

    </ul>
</div>

{{else}}

<!--未分组排列情况-->
<div class="list-block cards-list">
    <ul>
        {{each list as v i}}
        <li class="card">
            <div class="card-content">
                <div class="card-content-inner">
                    {{each v.StudentInfoList as d j}}
                    <div class="stu sel">
                        <luicheck class="lui_checkbox" data-name="g1" data-val="{{d.StudentID}}" data-groupindexid="{{v.GroupIndexId}}" data-text="" data-checked="{{if d.IsDel==0}}1{{else}}0{{/if}}"></luicheck>
                        <span class="check-name">{{d.UserName}}</span>
                        <span class="info">{{(d.BookNumber - d.LeftNumber)}}/{{d.BookNumber}}</span>
                    </div>
                    {{/each}}
                </div>
            </div>

        </li>
          {{/each}}
    </ul>
</div>
{{/if}}