<div class="card">
    <div class="card-header">选择奖励小队</div>
    <div class="card-content">
        <div class="card-content-inner">
            <div class="list-block">
                <ul>
                    {{each $data as v i}}
                    <li class="item-content b-grouplist-item" data-groupindex="{{v.GroupIndex}}" data-classgroupid="{{v.ClassGroupID}}" data-groupname="{{v.GroupName}}">
                        <div class="item-media"></div>
                        <div class="item-inner">
                            <div class="item-title">
                                <!--<span class="seq">{{v.Ranking}}.</span>-->
                                <span>{{v.GroupName}} 队</span>
                            </div>
                            <div class="item-after"><span class="word-num">奖学币：<span>{{v.Currency}}</span></span></div>
                        </div>

                        {{if v.Ranking==1}}
                        <i class="seq seq-icon first-icon"></i>
                        {{else if v.Ranking==2}}
                        <i class="seq seq-icon second-icon"></i>
                        {{else if v.Ranking==3}}
                        <i class="seq seq-icon third-icon"></i>
                        {{else}}
                        <span class="seq-num">{{v.Ranking}}</span>
                        {{/if}}

                    </li>
              
                     {{/each}}
                </ul>
            </div>
        </div>
    </div>
    <div class="card-footer"></div>
</div>