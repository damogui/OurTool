<div class="voice">
    <div class="need" style="margin-top:35px;height:85px;line-height:85px;">
        <span id="qtvalue">听音拼写单词</span>
    </div>
    <div class="tell">
        <i class="lui_wordspeak" data-src="{{Audio}}" data-auto="true" data-loop="2"></i>

        <span class="see">显示词义</span>

        {{each WordNatures as v i}}
        <span class="word-mean none">{{# v}}</span>
        {{/each}}

    </div>
    <div class="write">
 
        <input type="text" data-index="{{i}}" data-haswrite="0" data-length="{{spellList.length}}">
 
        <i class="back-del word0-clear" style="display:none"></i>
        <span class="none word0-right-answer-right">
                        <img src="/egword/build/img/smail.png" alt="" class="ml30">
                        <span class="success">正确拼写:<span>{{Answer}}</span></span>
                    </span>
        <span class="none word0-right-answer-error">
                        <img src="/egword/build/img/cry.png" alt="" class="ml30">
                        <span class="error">正确拼写:<span>{{Answer}}</span></span>
                    </span>

    </div>
    {{if isKeyMap==0}}
    
    <div class="sing-word" >
        {{each Selection as v i}}
        <span data-op="word0-sel">{{v}}</span>
        {{/each}}

    </div>
    {{else}}
    <div class="enter_hint">按Enter提交</div>
    {{/if}}

</div>