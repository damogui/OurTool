var Lui = require('../../LUI/js/lui');
var tool = require('../../LUI/tool');
/*var dataDic = require("../lib/DataDics");*/
/*var util = require("../lib/util");*/
var lui = new Lui();
//教材部分的点击效果
//tool.Sibs($('.edit-mesg .operatBtn'));

/*var AddChildClass = {
    drop_stage: undefined,
    drop_booktype: undefined,
    init: function () {
        drop_stage = lui.initDropDownList({ warpid: "drop_stageid", width: 260, textField: 'name', valueField: 'value', data: dataDic.stageList });
        drop_booktype = lui.initDropDownList({ warpid: "drop_booktype", width: 260, textField: 'DicValue', valueField: 'DicKey', data: dataDic.bookTypeList });
        $('input[name="InPrice"],input[name="OutPrice"]').on("keypress", function (e) {
            return util.checkFloat(e);
        })
        $('input[name="DefaultNumber"]').on("keypress", function (e) {
            return util.checkNum(e);
        })
        var tthis = this;
        $("#btnSubmit").click(function () { tthis.submit(); })
    },
    validate: function () {
        return true;
    },
    submit: function () {
        if (!this.validate()) {
            return false;
        }
        var d = this.getSubmitData();
        $.ajax({
            url: "/Management/CourseManage/AddChildCourseApi",
            type: "post",
            data: d,
            success: function (data) {
                console.log(data);
                if (data.Ok == "true") {
                    window.location.href = "/Management/CourseManage/ChildCourseIndex";
                }


            },
            error: function () { }
        })



    },
    getSubmitData: function () {

        var submitData = {};
        submitData.GName = $('input[name="GName"]').val();
        submitData.InPrice = $('input[name="InPrice"]').val();
        submitData.OutPrice = $('input[name="OutPrice"]').val();
        submitData.DefaultNumber = $('input[name="DefaultNumber"]').val();
        submitData.StageID = drop_stage.getValue().value;
        submitData.BookType = drop_booktype.getValue().value;


        //获取书本列表

        var bookList = [];
        $('span[data-name="course_book"]').each(function (index, item) {
            var bookid = $(item).attr("data-bookid");
            bookList.push({ BookID: bookid, BookGroupID: 0 });
        })
        submitData.BookList = bookList;
        submitData.Remark = $('textarea[name="Remark"]').val();
        return submitData;
    }


}
$(function () {
    AddChildClass.init();
})*/
