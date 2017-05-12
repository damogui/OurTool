



{{each $data as v i}}
<div class="card slide-up">
    {{if v.GroupIndex>0}}
    <div class="card-header" data-groupindex="{{v.GroupIndex}}">
        <div class="head-title">
            <span class="icon-right-drop"></span>

            {{v.GroupName}} 队

        </div>
        <div class="head-after"><span>平均：</span><span>{{v.AvgCredits}}</span><span>学分</span><span>（第{{v.Ranking}}名）</span></div>
    </div>
    {{else}}
    <div class="card-header" data-groupindex="0" style="min-height:0;height:0;margin:0;padding:0;"></div>
    {{/if}}
    <div class="card-content">
        <div class="list-block">
            <ul>
                {{each v.StudentMonitorInfoList as d j}}
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">
                            {{d.UserName}}

                            {{if d.BookName!=""}}
                            <div class="item-desc">正在学习：<span class="data mldot5rem">第{{d.UnitID}}单元</span><span class="data">（{{d.BookName}}）</span></div>
                            <div class="item-desc">
                                本次课已得
                                    {{if d.MaxCredits == d.Credits && d.Credits>0}}
                                <span class="red mldot5rem">
                                    {{d.Credits}}
                                    {{else}}
                                <span class="data mldot5rem">
                                    {{d.Credits}}
                                    {{/if}}
                                </span><span class="data">学分</span>
                            </div>
                            {{else}}
                            <div class="item-desc">正在学习：<span class="data mldot5rem"></span><span class="data">（未知）</span></div>
                            <div class="item-desc">本次课已得<span class="data mldot5rem">0</span><span class="data">学分</span></div>
                            {{/if}}
                        </div>
                        <div class="item-after">
                            <div>
                                课消<span>
                                    {{if d.CurrentNumber == d.BookNumber}}
                                 <span class="red">
                                    {{d.CurrentNumber}}
                                     </span>
                                    {{else}}
                                    {{d.CurrentNumber}}
                                    {{/if}}
                                    /{{d.BookNumber}}
                                </span>
                            </div>
                            <div class="item-status-lesson">
                                单元满分&nbsp;<span>
                                    {{if d.MaxUnit100Count == d.Unit100Count && d.MaxUnit100Count>0}}
                                              <span class="red">
                                    {{d.Unit100Count}}
                                                  </span>
                                    {{else}}
                                    {{d.Unit100Count}}
                                    {{/if}}
                                    次
                                </span>
                            </div>
                        </div>
                    </div>
                  
                </li>
                {{/each}}
            </ul>
        </div>
    </div>
</div>
{{/each}}