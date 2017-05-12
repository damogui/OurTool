<ul>
    {{each $data as v i }}
    <li class="b-studentlist-item" data-evaluationid="{{v.EvaluationId}}" data-username ="{{v.UserName}}">
        <a href="#" class="item-link item-content">
            <div class="item-inner">
                <div class="item-title-row">
                    <div class="item-title">{{v.UserName}} ({{v.ClassName}})</div>
                    <div class="item-after"><span>词汇等级：</span><span class="ml10">{{v.ResultLevel}}</span></div>
                </div>
                <div class="item-subtitle"><span>测评时间：</span><span class="ml10">{{v.CreateTime}}</span></div>
            </div>
        </a>
    </li>
    {{/each}}
</ul>