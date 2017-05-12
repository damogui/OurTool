{{each}}
{{ if $value.ActionType==1}}

			<tr class="mine">
                    <td>{{$value.CreateTime}}</td>
					 <td>---</td>
                    <td>我</td>
                    <td style='text-align:left;'>{{$value.Remarks}}</td>
                    <td>
                        <span  style="color: #7EE39A;font-weight: 600;">+{{$value.OrgMoney}}</span>
                    </td>
                </tr>
			{{else}}
		  <tr>
                    <td>{{$value.CreateTime}}</td>
					<td>{{$value.SchoolName}}</td>
                    <td>{{$value.OperationUserName}}</td>
                    <td style='text-align:left;'>{{$value.Remarks}}</td>
                    <td>
					{{ if $value.OrgMoney>0}}
					   <span  style="color: #7EE39A;font-weight: 600;">+{{$value.OrgMoney}}</span>
					{{else}}
                        <span class="red">{{$value.OrgMoney}}</span>
							{{/if}}
                    </td>
                </tr>
			{{/if}}
			{{/each}}