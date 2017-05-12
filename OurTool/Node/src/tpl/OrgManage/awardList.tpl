{{each data as v i}}
<tr data-id="{{v.AwardID}}">
    <td>{{v.Seq}}</td>
    <td>{{v.AwardName }}</td>
    <td>{{v.AwardTypeName}}</td>
    <td>{{v.AwardWaysName}}</td>
    {{if v.AwardWays==1}}
    <td>{{v.CValue}}</td>
    {{else}}
    <td>---</td>
    {{/if}}
    
    <td title="{{v.Remark==""?"---":v.Remark}}">{{$helpers.cutchar(v.Remark==""?"---":v.Remark,20)}}</td>
    <td>{{v.EditTimeStr}}</td>
    {{if iscg==1}}
    
    {{else}}
        <td>
            <span class="inline operatBtn coins" data-op="btn" data-type="edit">修改</span>
            <span class="inline operatBtn " data-op="btn" data-type="del">删除</span>
        </td>
    {{/if}}
    
</tr>

{{/each}}