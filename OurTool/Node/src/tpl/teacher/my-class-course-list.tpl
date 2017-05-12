
                    {{each $data as v i }}
                    <li class="item-content item-link s-course-list" data-classindex="{{v.ClassIndex}}">
                            <div class="item-inner">
                            <div class="item-title">课{{v.CurrentIndex}}</div>
                            <div class="item-after">上课时间：<span>{{v.ActionTime | dateFormat: 'yyyy/MM/dd hh:mm:ss' }}</span></div>
                        </div>
                    </li>
                    {{/each}}
