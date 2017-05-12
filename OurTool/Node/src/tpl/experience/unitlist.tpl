{{each $data as v i}}
<div class="list unit-item" data-unitid="{{v.UnitID}}" data-bookid="{{v.BookID}}">
    <span class="title border-r1px">{{i+1}}</span>
    <span>{{v.UnitTitle}}</span>
</div>
{{/each}}

