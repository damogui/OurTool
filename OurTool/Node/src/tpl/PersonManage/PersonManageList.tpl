{{each}}
{{ if $value.IsFrozenStr==1}}
 <tr class="default">
                <td>{{$value.UserName}}</td>
                <td>{{$value.Tel}}</td>
                <td>{{$value.RoleName}}</td>
                <td>
                    <span class="inline operatBtn editMesg" data-id="{{$value.UserId}}">查看</span>
                </td>
            </tr>
			{{else}}
			 <tr >
                <td>{{$value.UserName}}</td>
                <td>{{$value.Tel}}</td>
                <td>{{$value.RoleName}}</td>
                <td>
                    <span class="inline operatBtn editMesg" data-id="{{$value.UserId}}">查看</span>
                </td>
            </tr>
			{{/if}}
			{{/each}}