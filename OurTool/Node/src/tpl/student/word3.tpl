<div class="voice">
    <div class="mt30">
        <span class="need" id="qtvalue">请选择正确的词义</span>
    </div>
    <div class="word">
        <span class="fl" style="text-align:left;">{{Word}}</span>
        <div class="pronunce">

            {{# $helpers.GetRedWord($data)}}
            <i class="lui_wordspeak" data-src="{{Audio}}" data-auto="true" data-loop="2"></i>
            <!--<img src="/egword/build/img/horn.png" alt="" class="horn">-->
        </div>
    </div>
    {{each Selection as v i}}
    <!--<div class="btn" data-index="{{i}}" data-op="word2-sel"><span class="order">{{i+1 | GetEngBig}}</span>{{v}}</div>-->
    <div class="btn" data-index="{{i}}" data-op="word2-sel">{{# v}}</div>
    {{/each}}

</div>
