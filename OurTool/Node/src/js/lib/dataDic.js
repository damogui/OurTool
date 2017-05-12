module.exports = {
    //学段列表
    stageList: [{ name: "不限", value: "" }, { name: "小学", value: "X" }, { name: "初中", value: "C" }, { name: "高中", value: "G" }],
    bookTypeList: (function () {
        var result = [];
        $.ajax({
            url: "/Management/CourseManage/GetDicList",
            type: "get",
            async: false,
            data: { dicType: 2 },
            success: function (data) {
                result = data.Data;

            },
            error: function () { return result; }
        });
        return result;
    })()

}
