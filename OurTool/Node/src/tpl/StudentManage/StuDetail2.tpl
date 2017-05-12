{{each}}


  <tr>
                    <td>{{$value.CourseName}}</td>
					 <td>{{$value.EditionName}}</td>
                    <td>{{$value.ClassName}}</td>
                    <td>{{$value.TeachName}}</td>
                    <td>
                        {{$value.HaveNumber}}课次/{{$value.BookNumber}}课次
                    </td>
					{{if $value.IsWarn==1}}
                    <td class="red">
                      已过期
                    </td>

					{{else}}

					 <td>
                        {{$value.ExpireTime | dateFormat: "yyyy-MM-dd"}}
                    </td>

					{{/if}}
					{{if $value.IsEng==1}}
                    <td>
                     英式读音
                    </td>

					{{else}}

					 <td>
                      美式读音
                    </td>

					{{/if}}
                </tr>

{{/each}}