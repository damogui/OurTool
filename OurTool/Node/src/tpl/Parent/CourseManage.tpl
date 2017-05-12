   {{each}}
   
   <div class="reg">
                <p>
                    <span style="font-size: 0.85rem; color: #5d6467;"><span> {{$index+1+$value.PageStart}}.</span><span style="margin-left: 0.75rem;">{{$value.CourseName}}</span></span>
                    <span class="right">{{$value.CreateTimeStr}}</span>
                </p>
                <p class="intruduce">说明：{{$value.Remark}}</p>
                <div class="lesson">
                    <div class="box" style="background: #ffa200; border: 0.025rem solid #c92600; margin-right: 2.3rem;">
                        <span class="big-letter">{{$value.LeftNumber}}</span>
                        <span style="font-size: 0.75rem;">剩余课次</span>
                    </div>
                    <div class="box" style="background: #45c6fc; border: 0.025rem solid #009ee2;">
                        <span class="big-letter">{{$value.BookNumber}}</span>
                        <span style="font-size: 0.75rem;">总课次</span>
                    </div>
                </div>
            </div>
			   {{/each}}