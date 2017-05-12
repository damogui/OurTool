/*! <DEBUG:undefined> */
function anonymous($data,$filename) {'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,v=$data.v,i=$data.i,$escape=$utils.$escape,cutchar=$data.cutchar,iscg=$data.iscg,$out='';$out+=' ';
$each(data,function(v,i){
$out+=' <tr data-id="';
$out+=$escape(v.AwardID);
$out+='"> <td>';
$out+=$escape(v.Seq);
$out+='</td> <td>';
$out+=$escape(v.AwardName);
$out+='</td> <td>';
$out+=$escape(v.AwardTypeName);
$out+='</td> <td>';
$out+=$escape(v.AwardWaysName);
$out+='</td> ';
if(v.AwardWays==1){
$out+=' <td>';
$out+=$escape(v.CValue);
$out+='</td> ';
}else{
$out+=' <td>---</td> ';
}
$out+=' <td>';
$out+=$escape((v.Remark==""?"---":v.Remark)|cutchar:10);
$out+='</td> <td>';
$out+=$escape(v.EditTimeStr);
$out+='</td> ';
if(iscg==1){
$out+=' ';
}else{
$out+=' <td> <span class="inline operatBtn coins" data-op="btn" data-type="edit">修改</span> <span class="inline operatBtn " data-op="btn" data-type="del">删除</span> </td> ';
}
$out+=' </tr> ';
});
return new String($out);}