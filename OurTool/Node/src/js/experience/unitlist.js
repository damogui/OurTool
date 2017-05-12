var List = require("../lib/experience/List");
var Unitlist = function () {

};
Unitlist.prototype = new List();
Unitlist.prototype.constructor = Unitlist;
Unitlist.prototype.init = function () {
    this.loadList('/Experience/Index/GetUnits', "#units_warp", require("experience/unitlist.tpl"),  { BookID: bookid });
    this.bindEvent();
};
Unitlist.prototype.bindEvent = function () {
    $("#units_warp").on("click", ".unit-item", function () {
        window.location.href = "/Experience/Index/Word/" + $(this).attr("data-bookid") +"/"+ $(this).attr("data-unitid")+"/word";
    });
}


$(function () {
    var l = new Unitlist();
    l.init();

})