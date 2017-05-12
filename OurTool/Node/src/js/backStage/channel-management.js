var tool=require('../../LUI/tool');
//删除下级弹出层事件
tool.pophide($('.eg-pop .close,.eg-pop .cancel,.eg-pop .sure'),$('.eg-pop'));
tool.popshow($('.dele-child'),$('#delet-child'));
//创建下级弹出层事件
tool.pophide($('.eg-pop .close,.eg-pop .sure'),$('.eg-pop'));
tool.popshow($('.creat-hild'),$('#creat-child'));