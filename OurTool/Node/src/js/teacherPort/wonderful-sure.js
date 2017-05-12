

var classindex;
var classid;

var temp_pic_count = 0;
var islate = 0;//是否超时 1:超时

$(function () {

    classindex = $("#hidden-classindex").text();
    classid = $("#hidden-classid").text();

    $(".b-tab").click(function () {

        $.router.load("/teacher/myclass/CourseReport?classindex=" + classindex + "&classid=" + classid, true);
    });

    GetSplendidPic();
    $(document).off("click", "img[data-img-hasupload]");
    $(document).on("click", "img[data-img-hasupload]", function () {
        var citem = this;
        var cindex = 0;
        var imgs = [];
        $("img[data-img-hasupload]").each(function (index, item) {
            if (citem == item) {
                cindex = index;
            }
            imgs.push(item.src);
        });
        var myPhotoBrowserStandalone = $.photoBrowser({
           photoTemplate:'<div class="photo-browser-slide swiper-slide"><img src="{{url}}"></div>',
            photos: imgs
        });
        myPhotoBrowserStandalone.open(cindex);
        $(".photo-browser-of").html("/");
        $(".photo-browser.photo-browser-in").addClass("photo-browser-exposed");

    })


});

/*获取图片列表*/
function GetSplendidPic() {
    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetSplendidPic",
        cache: false,
        data: {
            classindex: classindex
        },
        dataType: "JSON",
        success: function (data) {
            $("#b-message").html('课堂精彩瞬间照片请下课后一小时内完成上传，逾期将无法上传！');
            data = JSON.parse(data);

            var m = data.result;
            islate = data.islate;

            var str = "";
            for (var i = 0; i < m.length; i++) {
                str += '<div class="img" ><img data-img-hasupload="1" src="' + m[i].PicUrl + '" alt=""></div>';
            }

            $("#b-piclist").html(str);

            $("#b-show-btnsubmit").hide();

            if (islate) {

                $("#b-message").html("下课1小时后，不再允许上传照片");
                //上传按钮不可用
                $("#b-showupimg").hide();


            }
        }
    });
}


(function (obj) {
    var URL = obj.webkitURL || obj.mozURL || obj.URL;
    var jic = {
        /**
         * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
         * @param {Image} source_img_obj The source Image Object
         * @param {Integer} quality The output quality of Image Object
         * @return {Image} result_image_obj The compressed Image Object
         */

        compress: function (source_img_obj, quality, output_format) {

            var mime_type = "image/jpeg";
            if (output_format != undefined && output_format == "png") {
                mime_type = "image/png";
            }
            var cvs = document.createElement('canvas');
            cvs.width = source_img_obj.naturalWidth;
            cvs.height = source_img_obj.naturalHeight;
            var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
            var newImageData = cvs.toDataURL(mime_type, quality / 100);
            var result_image_obj = new Image();
            result_image_obj.src = newImageData;
            return result_image_obj;
        }

    };


    (function () {
        var fileInput = document.getElementById("b-upfile");

        var uploadButton = document.getElementById("b-show-btnsubmit");

        var upfileNames = [];


        fileInput.addEventListener('change', function () {
            var compressIndex = 0;
            $("#b-message").html('课堂精彩瞬间照片请下课后一小时内完成上传，逾期将无法上传！');
            if (fileInput.files.length == 0) {
                return false;
            }
            if (fileInput.files.length > 8) {
                $("#b-message").html('一次最多选择8张照片');
                return false;
            }

            for (var k = 0; k < fileInput.files.length; k++) {

                var file = fileInput.files[k];
                if (upfileNames.indexOf(file.name) > -1) { $("#b-message").html('图片重复'); return false; }
                else {
                    upfileNames.push(file.name);
                }
                if (k == 0) {
                    $.showPreloader('图片压缩中...');
                }
              
                var url = URL.createObjectURL(file);

                (function () {
                    var simg = new Image();
                    simg.onload = function (e) {
                        var dimg = jic.compress(simg, 60);

                        var img = '<div class="img"><img data-img-hasupload="0" src="' + dimg.src + '" alt="" class="b-upimg"><span class="close b-delimg"></span></div>';
                        $("#b-piclist").prepend(img);
                        temp_pic_count++;
                        $("#b-show-btnsubmit").show();
                        $(".b-delimg").off("click");
                        $(".b-delimg").on("click", function () {
                            $(this).parent().remove();
                            temp_pic_count--;
                            if (temp_pic_count == 0) {
                                $("#b-show-btnsubmit").hide();
                            }
                        });
                        compressIndex++;
                        if (compressIndex == fileInput.files.length) {
                            $.hidePreloader();

                        }
                    }
                    simg.src = url;
                })();

            }

        }, false);

        uploadButton.addEventListener("click", function (event) {
            $.showPreloader('努力上传中...');

            var fd = new FormData();
            var picArr = [];
            $(".b-upimg").each(function (i, v) {
                var src = $(v).prop("src");

                picArr.push(src);
                
                
            });
            if (picArr.length > 8 || picArr.length == 0) {
                $("#b-message").html("一次最多选择8张照片");
                return;
            }
            var picarrstr = JSON.stringify(picArr);
            fd.append("classindex", classindex);
            fd.append("picarr", picarrstr);
            var xhr = new XMLHttpRequest();
            xhr.responseType = "json";
            xhr.open("post", '/teacher/myclass/SetSplendidPic', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    $.hidePreloader();
                    data = xhr.response;
                    console.log(data);
                    if (data.result == -1) {
                        //上传失败
                        $("#b-message").html("下课 1 小时后，不再允许上传照片");
                    }
                    else if (data.result == 0) {
                        $("#b-message").html("上传失败");
                    }
                    else if (data.result == -2) {
                        $("#b-message").html("图片仅支持 .jpg .gif .bmp .png 格式");

                    }
                    else if (data.result == -3) {
                        $("#b-message").html("上传失败.");
                    }
                    else {
                        $("#b-message").html("上传成功");
                        //$.showPreloader('上传成功');
                        $(".b-delimg").remove();
                        $(".b-upimg").attr("data-img-hasupload", 1);
                        $(".b-upimg").removeClass("b-upimg");

                        temp_pic_count = 0;
                        $("#b-show-btnsubmit").hide();

                    }
                   
                    setTimeout(function () {
                        $("#b-message").html("课堂精彩瞬间照片请下课后一小时内完成上传，逾期将无法上传！");
                    }, 6000);
                }
            };
            xhr.send(fd);




        }, false);

    })();

})(window);
