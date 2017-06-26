$(function () { 
    $(".lc_zs p a").hover(
		function () {
		    var title = $(this).children("img").attr("title");
		    $(this).css("position", "relative").append("<div class='hover-tips'>" + title + "</div>").children(".hover-tips").animate({ height: "36px" });
		},
		function () {
		    $(this).find(".hover-tips").animate({ height: 0 }, 300, function () { $(this).remove(); })
		}
	);
})