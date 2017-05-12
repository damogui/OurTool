$(".main-pops").on("click", "span[data-type='answerway']", function () {
    var value = $(this).attr("data-value");
    var tthis = this;
    $.ajax({
        type: "post",
        content: "json",
        url: "/LearnCenter/UpdateLearnPreference",
        data: { keymap: value },
        success: function (data) {
            $(tthis).removeClass("unselected").addClass("selected").siblings().removeClass("selected").addClass("unselected");
            showTip("已修改为" + (value == 1 ? "键盘方式" : "鼠标方式"));

        },

    });
});

function showTip(msg) {
    
    $("#showtip").html(msg);
    $("#showtip").show();
    setTimeout(function () { $("#showtip").hide();}, 1500)
}
