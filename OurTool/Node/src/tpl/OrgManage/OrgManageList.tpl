{{each}}
<tr>
                <td>{{$value.OrgId}}</td>
                <td>{{$value.OrgName}}</td>
                <td>{{$value.CoType}}</td>
                <td>{{$value.TeachType}}</td>
                <td>{{$value.ExpireTime | dateFormat: "yyyy-MM-dd"}}</td>
                <td>{{$value.CurrentValue}}</td>
                <td>
                    <span class="inline operatBtn see-detail" data-id="{{$value.OrgId}}">查看详情</span>
                    <span class="inline operatBtn ml25 cz" data-id="{{$value.OrgId}}" data-name="{{$value.OrgName}}">储值</span>
                </td>
            </tr>
            
           

			{{/each}}