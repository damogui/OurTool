$(function(){
    var sear = document.getElementById("search");
    sear.onfocus = function(){
        if(this.value != "请输入关键字") return;
        sear.value = ""
    };
    sear.onblur = function(){
        if(this.value != "") return;
        sear.value = "请输入关键字"
		sear.style.color="#aaa"
    };
})