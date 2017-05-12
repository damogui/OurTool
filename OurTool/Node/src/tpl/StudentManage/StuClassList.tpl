<td>
  {{each}}
  <p>{{$value.SchoolName}}</p>

  {{/each}}
</td>
<td>
  {{each}}
  <p>{{$value.ClassName}}</p>
 
 {{/each}}
  </td>
  <td>{{each}}
  <p>{{$value.CourseName}}</p>
  
   {{/each}}</td>
<td>
  
  
  
  {{each}}

  {{if $value.IsWarn==1}}
  <p class="red">{{$value.StrBar}}</p>
  {{else}}
  <p>{{$value.StrBar}}</p>
  {{/if}}
 
  
   {{/each}}</td>
<td>
  {{each}}


  <p>{{$value.ExpireTimeStr}}</p>
  {{/each}}</td>