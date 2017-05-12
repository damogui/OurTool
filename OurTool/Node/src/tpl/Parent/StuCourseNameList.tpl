 	{{each}}
 {{ if $index==0}}
 <div class="box active"  data-co="{{$value.CourseId}}"  data-cl="{{$value.ClassId}}">{{$value.CourseName | cutchar: 8}}</div>
           {{else}}
		   <div class="box "  data-co="{{$value.CourseId}}"  data-cl="{{$value.ClassId}}">{{$value.CourseName | cutchar: 8}}</div>
		   {{/if}}  
	{{/each}}



					

            

		