var List = require("../lib/experience/List");
var Booklist = function () {

};
Booklist.prototype = new List();
Booklist.prototype.constructor = Booklist;
Booklist.prototype.init = function () {
    this.loadList('/Experience/Index/GetBooks', "#book_warp", require("experience/booklist.tpl"), '');
    this.bindEvent();
};
Booklist.prototype.bindEvent = function () {
    $("#book_warp").on("click", ".book-item", function () {
        window.location.href = "/Experience/Index/Units/" + $(this).attr("data-bookid");
    });
}


$(function () {
    var l = new Booklist();
    l.init();

})