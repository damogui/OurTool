<ul>
    {{each $data as v i}}
    <li class="item-content s-class-list-item" data-classname="{{v.ClassName}}" data-classid="{{v.ClassID}}" data-classindex="{{v.ClassIndex}}" data-classstatus="{{v.ClassStatus}}">
        <div class="item-inner">
            <div class="item-title">
                {{v.ClassName}}
                <div class="item-desc">共<span>{{v.CurrentNumber}}</span>名学生</div>
            </div>
            <div class="item-after">
                <div>{{v.CurrentIndex}}</div>
                {{if v.ClassStatus==1}}
                <div class="item-status-lesson">正在上课</div>
                {{/if}}
            </div>
        </div>
    </li>

    {{/each}}
</ul>