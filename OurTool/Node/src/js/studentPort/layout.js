$(function () {
    $("#youself").click(function (event) {
        var tmp = event.target.getAttribute("data-set");
        switch (tmp) {
            case "updatepassword":
                window.location.href = "/Student/LearnCenter/Update";
                break;
            case "caifu":
                window.location.href = "/Student/LearnCenter/StudentCoinRecord";
                break;
            case "exit":
                $.ajax({
                    type: "post",
                    url: "/Home/Exit",
                    dataType: "json",
                    error: function (e) {
                    },
                    success: function (e) {
                        if (e.OK) {
                            location.href = "/";
                        }
                    }
                });

                break;
            case "preference":
                {
                    window.location.href = "/Student/LearnCenter/LearnPreference";
                }
            default:
        }

    });
    $("#learncenter").click(function () { window.location.href = "/Student/LearnCenter/Index" });
    $("#experientest").click(function () { window.location.href = "/Student/LearnCenter/ExperienceCenter" });
    $('.vedioclick').click(function () {
        $('.veio-mask').show();
        $('.vedio-popMask').show();
    })
    $('.vedio-popMask .close').click(function () {
        $('.veio-mask').hide();
        $('.vedio-popMask').hide();
    })

    //pausepop.show();
});


var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?8242c970a0879477fe92f8a1848001c2";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
