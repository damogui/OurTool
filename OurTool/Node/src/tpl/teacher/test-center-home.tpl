<ul>
    {{each $data as v i}}
    <li class="b-classlist-item" data-classid="{{v.ClassID}}" data-classname ="{{v.ClassName}}">
        <a href="#" class="item-link item-content">
            <div class="item-inner">
                <div class="item-title-row">
                    <div class="item-title">{{v.ClassName}}</div>
                </div>
            </div>
        </a>
    </li>
    {{/each}}

</ul>