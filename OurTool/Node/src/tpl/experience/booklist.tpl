{{each $data as v i}}
<div class="list book-item" data-bookid="{{v.BookID}}">
    <span class="title border-r1px">{{i+1}}</span>
    <span>{{v.BookName}}</span>
</div>
{{/each}}