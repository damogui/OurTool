
$(function() {

    $("#btn-changepassword").click(function() {
        $.router.load("/teacher/myinfo/ChangePassword");
    });

      $("#btn-loginout").click(function () {
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
        });

    
});