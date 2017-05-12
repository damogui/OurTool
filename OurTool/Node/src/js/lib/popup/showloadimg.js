//弹出加载图片针对列表传递居中参数
function ShowLoadingForTable(obj, num) {
    if (num == undefined || obj==undefined) {
        return;
    }
    obj.html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="'+num+'"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;">'+jQuery("#divLoading").html() +'</div></div></td></tr>');
}

function ShowLoadingForTableNoClass(obj, num) {
    if (num == undefined || obj == undefined) {
        return;
    }
    obj.html('<tr><td colspan="' + num + '"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;">' + jQuery("#divLoading").html() + '</div></div></td></tr>');
}


//弹出加载图片
function ShowLoading(obj) {
    if (obj == undefined) {
        return;
    }
    obj.html(jQuery("#divLoading").html());
}


exports.ShowLoadingForTable = ShowLoadingForTable;//针对table布局的
exports.ShowLoadingForTableNoClass = ShowLoadingForTableNoClass;//清除样式

exports.ShowLoading = ShowLoading;


