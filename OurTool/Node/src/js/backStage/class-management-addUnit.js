var tool=require('../../LUI/tool');
//添加单元的弹出层事件
tool.pophide($('.eg-pop .close,.eg-pop .cancel'),$('.eg-pop'));
tool.popshow($('.add-org '),$('#add-unit'));