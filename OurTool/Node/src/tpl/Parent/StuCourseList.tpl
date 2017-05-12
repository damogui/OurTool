 	{{each}}
 


<li  datatype="2" data-lid="{{$value.LessonName}}"  data-cid="{{$value.CourseId}}"  data-cin="{{$value.ClassIndex}}">
                                <a href="#" class="item-link item-content" style="background:#45c6fc;border-radius:0.3rem;"
>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">
                                                <span style="font-size:1.2rem;float:left;">课{{$value.LessonName}}</span>
                                                <span>新学单词：<span>{{$value.NewWord}}</span></span>
                                                <span style="float:right;">单元小测：<span>{{$value.UnitFullScore}}个100分</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                           


	{{/each}}



					

            

		