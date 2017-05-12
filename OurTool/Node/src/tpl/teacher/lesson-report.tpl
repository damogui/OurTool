{{if grouplist.length>0}}
<div class="card">
    <div class="card-header">
        <i class="seq-icon group-icon"></i>
        小队排名
    </div>
    <div class="card-content">
        <div class="card-content-inner">
            <div class="list-block">
                <ul>
                    {{each grouplist as d j}}
                    <li class="item-content">
                        <div class="item-media"></div>

                        <div class="item-inner">
                            <div class="item-title">

                                <span>{{d.GroupName}} 队</span>

                            </div>
                            <div class="item-after"><span class="word-num"><span>平均学分：{{d.AvgCredits}}</span></span></div>
                        </div>
                        {{if d.Ranking==1}}
                        <i class="seq seq-icon first-icon"></i>
                        {{else if d.Ranking==2}}
                        <i class="seq seq-icon second-icon"></i>
                        {{else if d.Ranking==3}}
                        <i class="seq seq-icon third-icon"></i>
                        {{else}}
                        <span class="seq-num">{{d.Ranking}}</span>
                        {{/if}}
                    </li>

                    {{/each}}
                </ul>
            </div>
        </div>
    </div>
    <div class="card-footer"></div>
</div>
{{/if}}

<div class="card student">
    <div class="card-header"><i class="seq-icon student-icon"></i>学生排名</div>
    <div class="card-content">
        <div class="card-content-inner">
            <div class="list-block">
                <ul>
                    {{each studentlist as v i}}
                    <li class="item-content b-studentlist-item" data-classindex="{{v.ClassIndex}}" data-studentid="{{v.StudentID}}" data-courseid="{{v.CourseID}}" data-username="{{v.UserName}}">
                        {{if v.AllCredits > v.AddSourceWordNum}}
                        <div class="item-media green"></div>
                        {{else if (v.AddSourceWordNum*0.8)<=v.AllCredits && v.AllCredits <=v.AddSourceWordNum}}
                        <div class="item-media yellow"></div>
                        {{else if v.AllCredits<(v.AddSourceWordNum*0.8)}}
                        <div class="item-media red"></div>
                        {{else}}

                        {{/if}}




                        <div class="item-inner">
                            <div class="item-title">

                                <span>{{v.UserName}}</span>
                                {{if grouplist.length>0}}
                                <span>({{v.GroupName}}队)</span>
                                {{/if}}

                            </div>

                            <div class="item-after">
                                {{if v.LeftNumber == 0}}
                                <div class="lesson-circle over">已结课</div>
                                {{else if v.LeftNumber == 1}}
                                <div class="lesson-circle normal">剩1次</div>
                                {{else}}

                                {{/if}}
                                <span class="word-num">学分：<span>{{v.Credits}}</span></span>
                            </div>
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