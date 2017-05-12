 <div class="name-student">
                    <span id="stuName">{{StuName}}</span>
   {{if IsEndCourse==1}}
                    <span class="circle" id="overCourse">已结课</span>
      {{else}}
 {{/if }}
                </div>
                <div class="current-less">
                    <div class="titles">
                        <span class="span"></span>
                        <span>本次课程</span>
                    </div>
                    <div class="item">
                        <span>新学单词：<span class="ml1" id="newWord">{{NewWord}}</span></span>
                      {{if IsWordKing==1}}
                      <span class="btn" id="wordKing">单词王</span>
                         {{else}}
                    {{/if}}
                    </div>
                    <div class="item">
                        <span>奖励学分：<span class="ml1" id="getScore">{{Credits}}</span></span><span class="red">(班级排名：<span id="rank">{{Rank}}</span>)</span>
                    </div>
                    <div class="item">
                        <span>单元小测：<span class="ml1">{{UnitFullScore}}个100分</span></span>
                      {{if IsFullKing==1}}
                      <span class="btn">满分王</span>
                      {{else}}
                      {{/if }}

                     
                    </div>
                    <div class="item">
                        <span>拼写错误率：<span class="ml1" id="sellError">{{SpellFix}}%</span></span><span>词义错误率：<span class="red" id="wordError">{{NatureFix}}%</span></span>
                    </div>
                </div>