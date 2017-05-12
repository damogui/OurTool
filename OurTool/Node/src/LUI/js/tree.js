/*参数说明
 *warpid 容器ID
 *nameField 节点展示内容字段
 *idField   节点绑定id字段
 *parentField 节点父级ID
 *data      数据列表 json格式
 *showParentCheckBox 父节点元素是否显示复选框
 *showCheckBox 子节点元素是否显示复选框
 */
function LuiTree() {
    var param;
    this.selector = "";
    this.param = null;
    /*
     list：传入的数据来源
     current：当前要处理的项
     pid：父级ID
     currlevel：当前层级
     currentIndex：当前idndex 判断是否是最后一个last
     allcount：当前兄弟节点总数量，用于判断是否是最后一个节点
     */
    function createTreeHtml(list, current, pid, currlevel, currentIndex, allcount) {
        //获取指定层级的所有子元素  私有方法
        function getChildren(list, pid) {
            var result = [];
            for (var k = 0; k < list.length; k++) {
                var kno = list[k];
                if (kno[param.parentField] === pid) {
                    result.push(kno);
                }
            }
            return result;
        }

        /*拼接html */
        var html = "";
        if (!current)
            current = list[0];
        var nameField = param.nameField || "name";
        var idField = param.idField || "id";
        var warpid = param.warpid || "tree_1";
        var childrens = getChildren(list, pid);
        var isclose = currlevel >= param.showlevel || 0;

        if (childrens.length > 0) {
            if (currentIndex == allcount - 1) {
                html += '<li class="parent-last">';
            }
            else {
                html += '<li>';
            }

            if (isclose) {
                html += '<i class="icon icon_op close"></i>';
            } else {
                // html += '<i class="li_close "></i>';
                html += '<i class="icon icon_op open"></i>';
            }
            if (param.showParentCheckBox) {
                html += '<luicheck class="lui_checkbox"  data-type="parent" data-showcheckbox="0" data-name="' + warpid + '" data-level="' + currlevel + '" data-json=\'' + escape(JSON.stringify(current)) + '\'  data-val="' + current[idField] + '" data-text="' + current[nameField] + '" data-checked="0"></luicheck>';
            }
            else {
                html += '<luicheck class="lui_checkbox"  data-type="parent" data-showcheckbox="1" data-name="' + warpid + '" data-level="' + currlevel + '" data-json=\'' + escape(JSON.stringify(current)) + '\'  data-val="' + current[idField] + '" data-text="' + current[nameField] + '" data-checked="0"></luicheck>';
            }
            // html += ' <a class="hand" data-type="parent" data-level="' + currlevel + '" data-json=\'' + escape(JSON.stringify(current)) + '\' data-val="' + current[idField] + '">' + current[nameField] + '</a>';
            if (isclose) {
                html += '<ul class="dn">';
            } else {
                html += '<ul>';
            }

            for (var m = 0; m < childrens.length; m++) {
                var nextlevel = currlevel + 1;
                //回调
                html += arguments.callee(list, childrens[m], childrens[m][idField], nextlevel, m, childrens.length);
            }
            html += "</ul>";
            html += "</li>";
        } else {

            if (currentIndex == allcount - 1) {
                html += '<li class="leaf-last">';
            }
            else {
                html += '<li class="leaf">';
            }
            if (param.showCheckBox) {
                html += '<luicheck class="lui_checkbox" data-type="leaf"  data-showcheckbox="0" data-name="' + warpid + '" data-level="' + currlevel + '" data-json=\'' + escape(JSON.stringify(current)) + '\'  data-val="' + current[idField] + '" data-text="' + current[nameField] + '" data-checked="0"></luicheck>';
            } else {
                html += '<luicheck class="lui_checkbox" data-type="leaf"  data-showcheckbox="1" data-name="' + warpid + '" data-level="' + currlevel + '" data-json=\'' + escape(JSON.stringify(current)) + '\'  data-val="' + current[idField] + '" data-text="' + current[nameField] + '" data-checked="0"></luicheck>';
            }

            // html += '<a class="hand " data-type="leaf" data-level="' + currlevel + '" data-json=\'' + JSON.stringify(current) + '\' data-val="' + current[idField] + '">' + current[nameField] + '</a></li>';
        }


        return html;


    }
    /*初始化树
 *warpid 容器ID
 *nameField 节点展示内容字段
 *idField   节点绑定id字段
 *parentField 节点父级ID
 *data      数据列表 json格式
 *showParentCheckBox 父节点元素是否显示复选框
 *showCheckBox 子节点元素是否显示复选框
 *selectedCallBack 点击节点触发回调事件
 *isOnlyLeafCallback  是否【只有点击子元素触发事件，点击父元素只用作展开折叠，不做其它功能】
 *若showParentCheckBox与showCheckBox都为false 返回当前点击节点以及子元素的数据 json格式
 *若showParentCheckBox与showCheckBox任何一个为ture 返回值为所有选中节点的数据 json格式 
 
 */
    this.init = function (p) {
        if (!p) { return; }
        p.showParentCheckBox = !p.isOnlyLeafCallBack;
        this.param = param = p;
        var list = param.data;
        var nameField = param.nameField || "name";
        var idField = param.idField || "id";
        var warpid = param.warpid || "tree_1";
        this.selector = this.warpid = "#" + warpid;
        var html = createTreeHtml(list, list[0], list[0][idField], 0, 0, list.length);
        var con = $("#" + warpid);
        con.html("<ul>" + html + "</ul>");
        con.addClass("lui_tree_warp");
        /**展开折叠 */
        con.find(".icon_op").click(function () {
            if ($(this).hasClass("close")) {
                $(this).removeClass("close").addClass("open");
                $(this).siblings("ul").show(200);
            } else {
                $(this).removeClass("open").addClass("close");
                $(this).siblings("ul").hide(200);
            }
        });
        var luitemp = new Lui();

        luitemp.initCheckBox({ group: warpid });
        con.find("luicheck").click(function () {

            var item = $(this);
            var isleaf = item.attr("data-type") == "leaf";
            var op = item.prev("i.icon_op");
            //只有子节点触发
            if (param.isOnlyLeafCallBack) {
                if (!isleaf && op) { op.click(); return; }
            }

            if (!isleaf) {
                if (param.showParentCheckBox) {
                    if (luitemp.checkBox.ischeckElement(this)) {

                        item.siblings("ul").find("luicheck").each(function (index, citem) {
                            if (!luitemp.checkBox.ischeckElement(citem)) {
                                litem = citem;
                                lui.checkBox.setClickStyle(citem);

                            }
                        });
                    }
                    else {
                        item.siblings("ul").find("luicheck").each(function (index, citem) {
                            if (luitemp.checkBox.ischeckElement(citem)) {
                                lui.checkBox.setClickStyle(citem);

                            }
                        });
                    }
                }
            }


            if (param.selectedCallBack) {
                if (param.showCheckBox) {
                    // alert('子节点 多选');
                    var groupname = item.attr("data-name");
                    var val = luitemp.checkBox.getJsonValue(groupname);
                    param.selectedCallBack(groupname, val);
                }
                else {
                    // alert('子节点 单选')
                }
            }



        });

        return this;
    };
}

LuiTree.prototype = {
    constructor: LuiTree,

    /*定位
     *locationid 定位ID
     */
    setLocation: function (locationid) {

    },
    /*获取已选中节点的值 json格式
     */
    getSelectedJsonValue: function () {
        if (this.param.showParentCheckBox || this.param.showParentCheckBox) {
            var luitemp = new Lui();
            var result = lui.checkBox.getJsonValue();
            luitemp = null;
            return result;
        }
    },
    /*
     *展开层级
     *nodeindex 从哪个节点开始展开
     *length  展开几个node
     *level 展开深度
     */
    openNode: function (openstarnodeindex, length, level) { }


};
module.exports=LuiTree;