

var _classindex;
var _classgroupid = 0;
var _studentid = 0;

$(function () {
    _classindex = $("#hidden-classindex").text();
    var ishavegroup =  $("#hidden-ishavegroup").text();
    $(".s-tab").on("click",
        function() {
            var types = $(this).attr("data-id");

            $(this).addClass("active");
            $(this).siblings().removeClass("active");

            if (types == "g") {

                GetGroupOrderList();

            } else {
                GetStudentOrderList();
            }


        });

    if (ishavegroup == "1") {

        GetGroupOrderList();

    } else {
        GetStudentOrderList();
    }




});

function GetGroupOrderList() {

    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetGroupOrderList",
        cache: false,
        data: {
            classindex: _classindex
        },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);
            var li = data.result;
            if (li.length > 0) {

                var tpl = require("teacher/lesson-report-group-g");

                $("#g-s-content").html(tpl(li));

                $(".b-grouplist-item").off("click");
                $(".b-grouplist-item").on("click", function () {
                    var groupindex = $(this).attr("data-groupindex");
                    _classgroupid = $(this).attr("data-classgroupid");
                    var groupname = $(this).attr("data-groupname");


                    $(".b-addcoin-num").removeClass("active").first().addClass("active");
                    $("#hidden-coinnum").text(10);

                    $(".b-showaddcoin").show();
                    $("#b-showaddcoin-title").html("奖励学币-" + groupname + "队");

                    $(".b-addcoin-num").off("click");
                    $(".b-addcoin-num").on("click", function () {

                        $(".b-addcoin-num").removeClass("active");

                        var coinnum = $(this).addClass("active").text();

                        $("#hidden-coinnum").text(coinnum);

                    });


                    $("#btn-submit").off("click");
                    $("#btn-submit").click(function () {

                        $(".b-showaddcoin").hide();
                        AddGroupCurrency();

                    });
                    $("#btn-cancel").off("click");
                    $("#btn-cancel").click(function () {
                        $(".b-showaddcoin").hide();
                    });


                });


            }
            else {

            $("#g-s-content").html("");
            }



        }
    });
}

function GetStudentOrderList() {

    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetStudentOrderList",
        cache: false,
        data: {
            classindex: _classindex
        },
        dataType: "JSON",
        success: function (data) {


            data = JSON.parse(data);
            var li = data.result;

            var tpl = require("teacher/lesson-report-group-s");

            $("#g-s-content").html(tpl(li));

            $(".b-studentlist-item").off("click");
            $(".b-studentlist-item").on("click", function () {
                _studentid = $(this).attr("data-studentid");
                var studentname = $(this).attr("data-studentname");

                $(".b-addcoin-num").removeClass("active").first().addClass("active");
                $("#hidden-coinnum").text(10);

                $(".b-showaddcoin").show();


                $("#b-showaddcoin-title").html("奖励学币-" + studentname);

                $(".b-addcoin-num").off("click");
                $(".b-addcoin-num").on("click", function () {

                    $(".b-addcoin-num").removeClass("active");

                    var coinnum = $(this).addClass("active").text();

                    $("#hidden-coinnum").text(coinnum);

                });

                $("#btn-submit").off("click");
                $("#btn-submit").click(function () {

                    $(".b-showaddcoin").hide();
                    AddStudentCurrency();

                });
                $("#btn-cancel").off("click");
                $("#btn-cancel").click(function () {
                    $(".b-showaddcoin").hide();
                });
            });



        }
    });
}

function AddGroupCurrency() {

    var num = $("#hidden-coinnum").text();

    $.ajax({
        type: "post",
        url: "/teacher/myclass/AddGroupCurrency",
        cache: false,
        data: {
            classindex: _classindex,
            classGroupId: _classgroupid,
            currencyNum: num

        },
        dataType: "JSON",
        success: function (data) {

            GetGroupOrderList();


        }
    });

}

function AddStudentCurrency() {


    var num = $("#hidden-coinnum").text();
    $.ajax({
        type: "post",
        url: "/teacher/myclass/AddStudentCurrency",
        cache: false,
        data: {
            classindex: _classindex,
            studentId: _studentid,
            currencyNum: num

        },
        dataType: "JSON",
        success: function (data) {

            GetStudentOrderList();

        }
    });

}