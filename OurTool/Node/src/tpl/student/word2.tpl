<div class="voice">
    <div class="need" style="height:90px;line-height:90px;">
        <span id="qtvalue">根据词意选择正确的单词</span>
    </div>
    <p class="mean" style="margin-bottom:20px;">
        {{each WordNatures as v i}}
        {{v}}
        {{/each}}
    </p>


    {{each Selection as v i}}
    <!--<div class="btn" data-index="{{i}}" data-op="word2-sel"><span class="order">{{i+1 | GetEngBig}}</span>{{v}}</div>-->
    <div class="btn" data-index="{{i}}" data-op="word2-sel">{{# v}}</div>
    {{/each}}

</div>

