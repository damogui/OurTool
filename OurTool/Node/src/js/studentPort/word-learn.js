var lui = require("../../LUI/js/lui.js");
var lui = new lui();
var guide = lui.initGuide();
//夹生词
//guide.popup($(".konow-gap-guide")[1],'konow-gap-guides',true,{width:130,height:125},{width:340,height:175},'up','掌握程度不同，学习方法不同，因“词”施教！','/egword/build/img/get-it-img3.png');
//记忆法
//guide.popup($(".remumber")[0],'remumber',false);



//单词熟悉不熟悉 word-familiar show
//guide.popup($(".word-familiar .btn")[0],'word-familiar',true,{width:63,height:176},{width:545,height:236},'down',' 1、用户第1次进入基础课页第1单元第1个单词，根据结果提示：<br/> 2、熟悉&答对、未作答&答对：“Congratulations！熟悉词加一<br/>3、熟悉&答错、未作答&答错：“Come on！夹生词+1','/egword/build/img/chose-guide.png',15,'/egword/build/img/leade-guide-lineS.png');



var currentType = -1;//0，熟词；1，夹生词；2，生词(-1未进入状态；3熟悉或未熟悉没有点击;4未学)；
var currentUseTime = 0;
var timer;
var timerRead;
var canClick = false;
var currentpostion = 0;//当前加载页面

var timerStop = false;
var enterIn = false;//Enter点击事件


//初始化页面
function InitPage() {
    localStorage.clear();
    $.post("/Student/LearnCenter/MeetSelfTest", { "unitId": unitId }, function (result) {
        if (result.State == 0) {
            if (result.Data == 0) {
                $.post("/Student/LearnCenter/ObtainWord", { "unitId": unitId }, function (result) {
                    if (result.State == 0) {
                        localStorage.Index = result.Index;
                        localStorage.Words = JSON.stringify(result.Words);
                        InitProccess();
                        InitLearnPage(1, 0, 0);
                    }
                });

            } else {
                $(".congration").html("恭喜，已完成本单元" + result.Data + "个词汇的学习！");
                $("#learnend").removeClass("none");
                $("#learning").addClass("none");
            }
        }
    });
}

//初始化进度条
function InitProccess() {
    var index = parseInt(localStorage.Index);
    var arrary = JSON.parse(localStorage.Words);
    var count = (index + 1) + "/" + arrary.length;
    $(".child-progress").attr("style", "width:" + (index + 1) * (480 / arrary.length) + "px");
    $(".color").html(count);
}

///0，是否熟悉时间；1，学习阶段学习单词界面提留时间；2，学习自测时间；3，自测阶段的自测时间；4，复习阶段的自测时间；5，复习阶段学习页面停留时间
function LogTime(useTime, type) {
    var index = parseInt(localStorage.Index);
    var arrary = JSON.parse(localStorage.Words);
    var word = arrary[index];
    $.post("/Student/LearnCenter/LogAllTime", { "unitId": unitId, "wordId": word.WordId, "useTime": currentUseTime, "type": type }, function (result) {
        if (result.State == 0) {
            if (result.Data == "true") {
                console.log("LogTime log true");
            }
        }
    });
}

//更新word单词的类别
function SetWordType() {
    var index = parseInt(localStorage.Index);
    var arrary = JSON.parse(localStorage.Words);
    var word = arrary[index];
    $.post("/Student/LearnCenter/SetWordType", { "wordId": word.WordId, "type": currentType, "unitId": unitId, "bgrade": word.Bgrade }, function (result) {
        if (result.State == 0) {
            if (result.Data == "true") {
                console.log("SetWordType log true");
            }
        }
    });
}
//记录做题记录
function LogStudy(ispass, qtype) {
    var index = parseInt(localStorage.Index);
    var arrary = JSON.parse(localStorage.Words);
    var word = arrary[index];
    $.post("/Student/LearnCenter/LogStudy", { "studytype": 0, "wordId": word.WordId, "ispass": ispass, "qtype": qtype, "bookGroupId": bookGroupId, "useTime": currentUseTime }, function (result) {
        if (result.State == 0) {
            if (result.Data == "true") {
                console.log("LogStudy log true");
            }
        }
    });
}

//更新方式（1，学习完上一个学习下一个。0，未学习上一个从而学习下一个）
function SetStudyUp(type) {
    $.post("/Student/LearnCenter/SetStudyUp", { "unitId": unitId, "type": type }, function (result) {
        if (result.State == 0) {
            if (result.Data == "true") {
                if (type == 0) {
                    var arrary = JSON.parse(localStorage.Words);
                    var index = parseInt(localStorage.Index);
                    var word = arrary[index];
                    arrary.splice(index, 1);
                    arrary.push(word);
                }
                console.log("SetStudyUp log true");
            }
        }
    });
}

function SubStringStr(str) {
    var strTmp = str.replace(new RegExp("&emsp;", "gi"), "");
    return strTmp.substring(0, 25) + (strTmp.length > 25 ? "..." : "");
}



//初始化学习页面参数1：初始化页面方式；2：初始化的力度；3：做题测试页面的次数（是为了听写与口语词汇加的）
function InitLearnPage(position, lastposition, isfirst) {


    ///没个里面初始话一下时间
    currentUseTime = 0;

    currentpostion = position;
    $("#learn").addClass("none");
    $("#know").addClass("none");
    $("#learnend").addClass("none");
    $("#choosedo").addClass("none");
    $("#listendo").addClass("none");

    var index = parseInt(localStorage.Index);
    var arrary = JSON.parse(localStorage.Words);
    var word = arrary[index];
    var start = 0;
    var timerTime = 0;
    if (position == 1 && index > 0) {
        timerTime = 1000;
    } else {
        timerTime = 1;
    }

    var timerOut = setTimeout(function () {
        if (position == 1 && index > 0) {
            $.ajax({
                url: '/Student/LearnCenter/GetCourseWord', // 跳转到 action    
                data: {
                    wordId: arrary[index - 1].WordId
                },
                type: 'post',
                async: false,
                success: function (data) {

                    if (data.State == "true" || data.State >= 1) {
                        console.log("小伙子/小姑娘你的数据已经完美提交了");
                    } else {
                        console.log("数据未提交成功，请重新学习1！");

                        word = arrary[index - 1];
                        localStorage.Index = index - 1;
                    }
                },
                error: function () {
                    console.log("数据未提交成功，请重新学习2！");
                    word = arrary[index - 1];
                    localStorage.Index = index - 1;
                }

            });
        }
        if (position == 2) {
            enterIn = true;
        } else {
            enterIn = false;
        }
        switch (position) {
            case 1:
                start = 0;
                clearInterval(timer);
                $(".rotate-small").show();
                $("#time").html("5s");
                $("#time").attr("datanum", 5);
                currentUseTime = 0;
                var wordStr = word.Word;
                if (word.Word.indexOf("-") == -1) {
                    wordStr = word.Syllables.join("-");
                }


                var array = ['sion', 'tion', 'sual', 'sure', 'ture', 'dge', 'ar', 'or', 'er', 'ir', 'ur', 'air', 'eir', 'ear', 'eer', 'oar', 'are', 'ere', 'ere', 'ire', 'ore', 'ure', '-y', 'le', 'al', 'el', 'ol', 'il', 'ul', 'ow', 'ew', 'aw', 'gh', 'nk', 'ng', 'ge', 'a', 'e', 'i', 'o', 'u', 'an', 'en', 'in'];
                for (var l = 0; l < array.length; l++) {
                    if (wordStr.indexOf(array[l]) != -1) {
                        wordStr = wordStr.replace(new RegExp(array[l], "gi"), (l + 10000).toString());
                    }
                }
                for (var l = 0; l < array.length; l++) {
                    if (wordStr.indexOf((l + 10000).toString()) != -1) {
                        wordStr = wordStr.replace(new RegExp((l + 10000).toString(), "gi"), ("<span class=\"red\">" + array[l] + "</span>"));
                    }

                }
                var arr = wordStr.split("<span class=\"red\">");
                for (var m = 0; m < arr.length; m++) {
                    if (arr[m].indexOf("<") == -1) {
                        wordStr = wordStr.replace(arr[m], ("<span>" + arr[m] + "</span>"));
                    } else {
                        if (arr[m].split("</span>")[1] != "") {
                            wordStr = wordStr.replace(arr[m], (arr[m].split("</span>")[0] + "</span><span>" + arr[m].split("</span>")[1] + "</span>"));
                        }
                    }
                }

                $("#know").children(".voice").children(".word").html(word.Word);
                $("#know").children(".voice").children(".pronunce").html("<span class='pronunce-guide'>" + wordStr + "</span>" + "<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
                $("#know").removeClass("none");
                if (parseInt(showTask) == 1) {
                    guide.popup($(".rotate-small")[0], 'roates', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'down', '快速聚焦是一种能力，你要在短时间内作出准确判断！', '/egword/build/img/clock-clock.png', 12);

                } else {
                    timer = setInterval(function () {
                        if (timerStop == false) {
                            var value = parseInt($("#time").attr("datanum")) - 1;
                            currentUseTime = parseInt(currentUseTime) + 1;
                            $("#time").html(value + "s");
                            $("#time").attr("datanum", value);
                            if (value == 0) {
                                clearInterval(timer);
                                currentType = 3;
                                InitLearnPage(2, 1, 0);
                            }
                        }

                    }, 1000);
                }
                //加载读音
                try {
                    var readId = "myaudio" + word.WordId;
                    // var start = 0;
                    document.getElementById(readId).play();
                    document.getElementById(readId).onended = function () {
                        start++;
                        start > 0 && document.getElementById(readId).pause();
                        if (start == 1) {
                            setTimeout(function () {
                                try {
                                    if (currentpostion == position) {
                                        document.getElementById(readId).play();
                                    }

                                } catch (err) {
                                    console.log(err);
                                }
                            }, 1000);
                        }

                    };
                } catch (err) {
                    console.log(err);
                }
                break;
            case 2:
                clearInterval(timer);
                $(".rotate-small").show();
                $("#time").html("10s");
                $("#time").attr("datanum", 10);
                currentUseTime = 0
                if (((word.Spoken == 1 || word.Writen == 1) && lastposition == 3 && isfirst == 1) || ((word.Spoken == 1 || word.Writen == 1) && lastposition == 1 && isfirst == 1)) {

                    var mean = "";
                    for (var i = 0; i < word.Mean.length; i++) {
                        mean += (word.Mean[i] + " ");
                    }
                    $("#listendo").children(".content").children(".tell").html("<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><span class=\"btn\" id=\"oneshow\">显示词义</span><span class=\"oneciyi\">" + mean + "</span><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
                    var kong = "";


                    kong += "<input type=\"text\" class=\"pingxieti\" data-count=\"" + word.Syllables.length + "\"> <i class=\"back-del\" style=\"display:none\"></i><span class=\"none\" id=\"errorshow\"><img src=\"/egword/build/img/cry.png\" alt=\"\" class=\"ml30\" ><span class=\"error\">正确拼写:<span>" + word.Word + "</span></span></span><span class=\"none\" id=\"rightshow\"><img src=\"/egword/build/img/smail.png\" alt=\"\" class=\"ml30\"><span class=\"success\">正确</span></span>";

                    $("#listendo").children(".content").children(".write").html(kong);

                    var spanCountChoose = 0;
                    var spanchoose = "";
                    var arraryNum = [];
                    var spanList = [];

                    while (true) {
                        var numRand = Math.floor(Math.random() * word.Syllables.length);
                        var canNext = true;
                        for (var k = 0; k < arraryNum.length; k++) {
                            if (arraryNum[k] == numRand) {
                                canNext = false;
                            }
                        }
                        if (canNext) {
                            arraryNum[spanCountChoose] = numRand;
                            // var num = Math.floor(Math.random() * 2);
                            switch (numRand) {
                                case 0:

                                    for (var j = 0; j < word.OneSd.length; j++) {
                                        spanList.push("<span>" + word.OneSd[j] + "</span>");
                                    }
                                    spanList.push("<span>" + word.Syllables[0] + "</span>");
                                    break;
                                case 1:

                                    for (var j = 0; j < word.TwoSd.length; j++) {
                                        spanList.push("<span>" + word.TwoSd[j] + "</span>");
                                    }
                                    spanList.push("<span>" + word.Syllables[1] + "</span>");
                                    break;
                                case 2:

                                    for (var j = 0; j < word.ThreeSd.length; j++) {
                                        spanList.push("<span>" + word.ThreeSd[j] + "</span>");
                                    }
                                    spanList.push("<span>" + word.Syllables[2] + "</span>");
                                    break;
                                case 3:

                                    for (var j = 0; j < word.FourSd.length; j++) {
                                        spanList.push("<span>" + word.FourSd[j] + "</span>");
                                    }
                                    spanList.push("<span>" + word.Syllables[3] + "</span>");
                                    break;
                                default:
                            }
                            spanCountChoose++;
                            if (spanCountChoose == word.Syllables.length) {
                                break;
                            }
                        }

                    }


                    spanList.sort(function () { return 0.5 - Math.random() });



                    $("#listendo").children(".content").children(".sing-word").html(spanList.join(''));
                    $(".oneciyi").hide();
                    $("#listendo").removeClass("none");
                    if (isKeyMap == 1) {
                        $(".pingxieti")[0].focus();
                    }


                } else {

                    var wordStr = word.Word;
                    if (word.Word.indexOf("-") == -1) {
                        wordStr = word.Syllables.join("-");
                    }


                    var array = ['sion', 'tion', 'sual', 'sure', 'ture', 'dge', 'ar', 'or', 'er', 'ir', 'ur', 'air', 'eir', 'ear', 'eer', 'oar', 'are', 'ere', 'ere', 'ire', 'ore', 'ure', '-y', 'le', 'al', 'el', 'ol', 'il', 'ul', 'ow', 'ew', 'aw', 'gh', 'nk', 'ng', 'ge', 'a', 'e', 'i', 'o', 'u', 'an', 'en', 'in'];
                    for (var l = 0; l < array.length; l++) {
                        if (wordStr.indexOf(array[l]) != -1) {
                            wordStr = wordStr.replace(new RegExp(array[l], "gi"), (l + 10000).toString());
                        }
                    }
                    for (var l = 0; l < array.length; l++) {
                        if (wordStr.indexOf((l + 10000).toString()) != -1) {
                            wordStr = wordStr.replace(new RegExp((l + 10000).toString(), "gi"), ("<span class=\"red\">" + array[l] + "</span>"));
                        }

                    }
                    var arr = wordStr.split("<span class=\"red\">");
                    for (var m = 0; m < arr.length; m++) {
                        if (arr[m].indexOf("<") == -1) {
                            wordStr = wordStr.replace(arr[m], ("<span>" + arr[m] + "</span>"));
                        } else {
                            if (arr[m].split("</span>")[1] != "") {
                                wordStr = wordStr.replace(arr[m], (arr[m].split("</span>")[0] + "</span><span>" + arr[m].split("</span>")[1] + "</span>"));
                            }
                        }
                    }


                    $("#choosedo").children(".content").children(".voice").children(".word").children(".fl").html(word.Word);
                    //   $("#know").children(".content").children(".pronunce").html(wordStr + "<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
                    $("#choosedo").children(".content").children(".voice").children(".word").children(".pronunce").html(wordStr + "<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
                    var num = Math.floor(Math.random() * 4 + 1);
                    var chooseItem = "";
                    var count = 0;
                    var mean = "";
                    for (var i = 0; i < word.Mean.length; i++) {
                        mean += (word.Mean[i] + " ");
                    }
                    for (var i = 1; i < 5; i++) {
                        if (i == num) {
                            chooseItem += ("<div class=\"btn\" data-id=\"ok\">" + SubStringStr(mean) + "</div><img src=\"/egword/build/img/big-ok.png\" alt=\"\" class=\"vm\" data-id=\"ok\">");
                        } else {
                            chooseItem += ("<div class=\"btn\" data-id=\"" + i + "\">" + SubStringStr(word.Choose[count]) + "</div><img src=\"/egword/build/img/big-error.png\" alt=\"\" class=\"vm\" data-id=\"" + i + "\" data-name=\"error\">");
                            count++;
                        }
                    }
                    $("#choosedo").children(".content").children(".voice").children(".items").html(chooseItem);
                    $("#choosedo").children(".content").children(".voice").children(".items").children("img").each(function () {
                        $(this).hide();
                    });
                    $("#choosedo").removeClass("none");
                }
                //加载读音
                try {
                    var readId = "myaudio" + word.WordId;
                    start = 0;
                    document.getElementById(readId).play();
                    document.getElementById(readId).onended = function () {
                        start++;
                        start >= 1 && document.getElementById(readId).pause();
                        if (start == 1) {
                            setTimeout(function () {
                                try {
                                    if (currentpostion == position) {
                                        document.getElementById(readId).play();
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                            }, 1000);
                        }
                    };
                } catch (err) {
                    console.log(err);
                }
                timer = setInterval(function () {
                    if (timerStop == false) {
                        var value = parseInt($("#time").attr("datanum")) - 1;
                        currentUseTime = parseInt(currentUseTime) + 1;
                        $("#time").html(value + "s");
                        $("#time").attr("datanum", value);
                        if (value == 0) {
                            //单词未学
                            clearInterval(timer);
                            if (currentType == -1 || currentType == 3) {
                                currentType = 4;
                            }
                            InitLearnPage(3, 0, 0);
                        }
                    }
                }, 1000);
                break;

            case 3:
                canClick = false;
                clearInterval(timer);
                $("#learn").children(".voice").children(".remumber").html("");
                $("#learn").children(".voice").children(".remumber").hide();
                $("#nextword").hide();
                $("#learn").children(".voice").children(".anysis").html("");

                $(".rotate-small").hide();
                $("#time").html("20s");
                $("#time").attr("datanum", 20);
                timer = setInterval(function () {
                    var value = parseInt($("#time").attr("datanum")) - 1;
                    currentUseTime = parseInt(currentUseTime) + 1;
                    $("#time").html(value + "s");
                    $("#time").attr("datanum", value);
                    if (value == 0) {
                        clearInterval(timer);
                    }
                }, 1000);
                currentUseTime = 0;
                $("#learn").children(".voice").children(".word").html(word.Word);

                var wordStr = word.Word;
                if (word.Word.indexOf("-") == -1) {
                    wordStr = word.Syllables.join("-");
                }
                var array = ['sion', 'tion', 'sual', 'sure', 'ture', 'dge', 'ar', 'or', 'er', 'ir', 'ur', 'air', 'eir', 'ear', 'eer', 'oar', 'are', 'ere', 'ere', 'ire', 'ore', 'ure', '-y', 'le', 'al', 'el', 'ol', 'il', 'ul', 'ow', 'ew', 'aw', 'gh', 'nk', 'ng', 'ge', 'a', 'e', 'i', 'o', 'u', 'an', 'en', 'in'];
                for (var l = 0; l < array.length; l++) {
                    if (wordStr.indexOf(array[l]) != -1) {
                        wordStr = wordStr.replace(new RegExp(array[l], "gi"), (l + 10000).toString());
                    }
                }
                for (var l = 0; l < array.length; l++) {
                    if (wordStr.indexOf((l + 10000).toString()) != -1) {
                        wordStr = wordStr.replace(new RegExp((l + 10000).toString(), "gi"), ("<span class=\"red\">" + array[l] + "</span>"));
                    }

                }
                var arr = wordStr.split("<span class=\"red\">");
                for (var m = 0; m < arr.length; m++) {
                    if (arr[m].indexOf("<") == -1) {
                        wordStr = wordStr.replace(arr[m], ("<span>" + arr[m] + "</span>"));
                    } else {
                        if (arr[m].split("</span>")[1] != "") {
                            wordStr = wordStr.replace(arr[m], (arr[m].split("</span>")[0] + "</span><span>" + arr[m].split("</span>")[1] + "</span>"));
                        }
                    }
                }


                var count = 0;
                var wordTypeHtml = "";
                //发出读音后展示词性  词义
                $("#learn").children(".voice").children(".word-types").html("<audio id=\"autuo" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
                if (currentType == 1) {
                    count = 2;
                    wordTypeHtml = '<div class="word-types">   <div>  <span class="konow-gap">夹</span>   </div>  </div>';
                    //wordTypeHtml = "<span class=\"konow-gap\">夹</span>";
                    // $("#learn").children(".voice").children(".word-types").html("<div class=\"konow-gapone\"><span id=\"zhangwochengdu\"><span class=\"konow-gap\">生</span><span>夹生词，分音节，快速跟读两遍</span></span></div><audio id=\"autuo" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");


                } else if (currentType == 2 || currentType == 4) {
                    count = 3;
                    //wordTypeHtml = "<span class=\"konow-gap\">陌</span>";
                    wordTypeHtml = '<div class="word-types">   <div>  <span class="konow-gap">陌</span>   </div>  </div>';
                    // $("#learn").children(".voice").children(".word-types").html(" <div class=\"konow-gapone\"><span id=\"zhangwochengdu\"><span class=\"konow-gap\">陌</span><span>陌生词，分音节，慢速跟读三遍</span></span></div><audio id=\"autuo" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");

                }

                $("#learn").children(".voice").children(".pronunce").html(wordTypeHtml + "<span id=\"biaohong\" style='display:inline-block;margin-top:-4px;'>" + wordStr + "</span>" + "<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
                $("#learn").removeClass("none");



                if (word.Rember != "" && word.Rember.length > 0) {
                    $("#learn").children(".voice").children(".remumber").show();
                    $("#learn").children(".voice").children(".remumber").html("<div class=\"wordWrap\"><span class=\"mr10\">【记忆法】</span>" + word.Rember + "</div>");
                }
                var mean = "";
                for (var i = 0; i < word.Mean.length; i++) {
                    mean += (word.Mean[i] + "<br/>");
                }
                $("#learn").children(".voice").children(".anysis").html(" <span>" + mean + "</span>");
                $("#learn").children(".voice").children(".word-types").show();
                try {
                    var dataId = "autuo" + word.WordId;
                    start = 0;
                    document.getElementById(dataId).play();
                    document.getElementById(dataId).onended = function () {
                        start++;
                        if (start == count) {

                            document.getElementById(dataId).pause();
                            setTimeout(function () {
                                $("#nextword").show();
                                canClick = true;

                            }, 0);
                        } else {
                            setTimeout(function () {
                                try {
                                    document.getElementById(dataId).play();
                                } catch (err) {
                                    console.log(err);
                                }
                            }, 800);
                        }
                    };

                } catch (err) {
                    console.log(err);
                    //$("#learn").children(".voice").children(".word-types").hide();
                    $("#nextword").show();
                    //if (word.Rember!=""&&word.Rember.length>0) {
                    //    $("#learn").children(".voice").children(".remumber").show();
                    //    $("#learn").children(".voice").children(".remumber").html("<div class=\"wordWrap\"><span class=\"mr10\">【记忆法】</span>" + word.Rember + "</div>");
                    //}

                    //var mean = "";
                    //for (var i = 0; i < word.Mean.length; i++) {
                    //    mean += (word.Mean[i] + "<br/>");
                    //}
                    //$("#learn").children(".voice").children(".anysis").html(" <span>" + mean + "</span>");
                    canClick = true;
                    //if (parseInt(userCount) == 0) {
                    //    clearInterval(timer);
                    //    // guide.popup($(".konow-gapone")[0], 'konow-gap-guides', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', '掌握程度不同，学习方法不同，因“词”施教！', '/egword/build/img/get-it-img3.png');
                    //    guide.popup($("#zhangwochengdu"), 'konow-gap-guides', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', '掌握程度不同，学习方法不同，因“词”施教！', '/egword/build/img/get-it-img3.png');

                    //}
                }

                $("#learn").removeClass("none");

                break;
            default:
                break;
        }

        clearTimeout(timerOut);
    }, timerTime);





}

$(function () {
    InitPage();




    $(document).keydown(function (e) {
        if (timerStop) {
            return false;
        }
        var ev = window.event || e;
        var code = ev.keyCode || ev.which;
        if (code == 13) {
            if (enterIn) {
                enterIn = false;
                submitSpellAnswer();
            }
            // cancelBubble = true;
            return false;
        }

    });

    function submitSpellAnswer() {
        var answer = "";
        var word = JSON.parse(localStorage.Words)[localStorage.Index];
        $("input").each(function () {
            answer += $(this).val();
        });
        if (answer == word.Word) {

            $("#rightshow").remove("none");
            $("#rightshow").show();

            LogTime(currentUseTime, 2);
            if (currentType == -1) {
                currentType = 0;
                SetWordType();
            } else if (currentType == 3) {
                LogTime(5, 0);
                currentType = 0;
                SetWordType();
            }
            LogStudy(1, 0);
            SetStudyUp(1);
            localStorage.Index = parseInt(localStorage.Index) + 1;
            currentType = -1;

            setTimeout(function () {
                if (parseInt(localStorage.Index) != JSON.parse(localStorage.Words).length) {
                    InitProccess();
                }

                var isTrue = true;
                setTimeout(function () {
                    $.ajax({
                        url: '/Student/LearnCenter/GetCourseWord', // 跳转到 action    
                        data: {
                            wordId: JSON.parse(localStorage.Words)[localStorage.Index - 1].WordId
                        },
                        type: 'post',
                        async: false,
                        success: function (data) {

                            if (data.State == "true" || data.State >= 1) {
                                isTrue = true;
                                console.log("小伙子/小姑娘你的数据已经完美提交了");
                            } else {
                                isTrue = false;
                                console.log("数据未提交成功，请重新学习1！");
                            }
                        },
                        error: function () {
                            isTrue = false;
                            console.log("数据未提交成功，请重新学习2！");
                        }

                    });
                    if (parseInt(localStorage.Index) == JSON.parse(localStorage.Words).length && isTrue) {
                        window.location.href = "/Student/LearnCenter/SelfTestIndex?unitId=" + unitId + "&count=" + localStorage.Index;
                    } else {

                        InitLearnPage(1, 0, 0);
                        enterIn = true;
                    }
                }, 1000);


            }, 1000);




        } else {
            $("#errorshow").remove("none");
            $("#errorshow").show();

            setTimeout(function () {
                //进入学习页面
                LogTime(currentUseTime, 2);
                if (currentType == -1) {
                    currentType = 1;
                    SetWordType();
                } else if (currentType == 3) {
                    LogTime(5, 0);
                    currentType = 2;
                    SetWordType();
                }
                LogStudy(0, 0);
                InitLearnPage(3, 0, 0);
            }, 1000);
        }

    }

    $("body").delegate(".start-learn", "click", function (event) {
        window.location.href = "/Student/LearnCenter/SelfTestWord?unitId=" + unitId;
    });

    $("body").delegate(".konow-gap-guides", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        //记忆法
        guide.popup($(".remumber")[0], 'remumberone', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', '别人家的孩子经常用的记忆小贴士，让你记得更快、更牢、更有趣！', '/egword/build/img/get-it-img3.png');
    });

    $("body").delegate(".remumberone", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        $("#time").html("20s");
        $("#time").attr("datanum", 20);
        timer = setInterval(function () {
            var value = parseInt($("#time").attr("datanum")) - 1;
            currentUseTime = parseInt(currentUseTime) + 1;
            $("#time").html(value + "s");
            $("#time").attr("datanum", value);
            if (value == 0) {
                clearInterval(timer);
            }
        }, 1000);
        userCount = 1;
    });

    $("body").delegate(".roates", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        // guide.popup($(".pronunce-guide")[0], 'pronunce-guides', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'down', '注意标红字母的发音，掌握自然拼读法，“拼音式”记忆！', '/egword/build/img/pingzi.png', 25);
        // guide.popup($("#biaohong"), 'pronunce-guides', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'down', '注意标红字母的发音，掌握自然拼读法，“拼音式”记忆！', '/egword/build/img/pingzi.png', 25);
        guide.popup($(".pronunce-guide"), 'pronunce-guides', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'down', '注意标红字母的发音，掌握自然拼读法，“拼音式”记忆！', '/egword/build/img/pingzi.png', 25);
        showTask = 2;
    });

    $("body").delegate(".pronunce-guides", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        $("#time").html("5s");
        $("#time").attr("datanum", 5);
        timer = setInterval(function () {
            var value = parseInt($("#time").attr("datanum")) - 1;
            currentUseTime = parseInt(currentUseTime) + 1;
            $("#time").html(value + "s");
            $("#time").attr("datanum", value);
            if (value == 0) {
                clearInterval(timer);
                currentType = 3;
                InitLearnPage(2, 1, 0);
            }
        }, 1000);

    });

    $("body").delegate("#exit", "click", function (event) {
        $('.pop-mask').show();
        $('.returnPop').show();
        timerStop = true;
    });


    window.pausePopCallback = function () {
        console.log("老师暂停了");
        timerStop = true;
    }

    window.pauseHideCallback = function () {
        console.log("老师继续上课了");
        timerStop = false;
    }



    $("body").delegate(".return", "click", function (event) {
        $('.pop-mask').show();
        $('.returnPop').show();
        timerStop = true;
    });
    $('.returnsure').click(function () {
        window.location.href = "/Student/LearnCenter/CourseBase?courseId=" + oneCourseId;
        // window.location.href = "/Student/LearnCenter/ExperienceLesson?unitId=" + unitId + "&unitOrder=" + orderUnit + "&bookGroupId=" + bookGroupId + "&birefName=noname&courseId=" + oneCourseId;
    })
    //读音
    $("body").delegate(".horn", "mouseover", function (event) {
        try {
            $(this).attr("src", "/egword/build/img/sound-play2.gif");
            var readId = "myaudio" + event.target.getAttribute("data-id");
            var start = 0;
            document.getElementById(readId).play();
            document.getElementById(readId).onended = function () {
                $(".horn").attr("src", "/egword/build/img/horn.png");
                start++;
                start == 1 && document.getElementById(readId).pause();
            };
        } catch (err) {
            console.log(err);
        }

    });

    //展示词义
    $("body").delegate("#oneshow", "click", function () {
        if ($(this).html() == "显示词义") {
            $(this).html("隐藏词义");
        } else {
            $(this).html("显示词义");
        }

        $(".oneciyi").each(function () {
            $(this).toggle();
        });
    });
    var ontTypeCount = 0;
    //拼写题
    $("body").delegate("#onetype", "click", function (event) {
        if ($("input").val() == "") {
            ontTypeCount = 0;
        }
        if ($(event.target).attr("class") == "active") {
            return;
        }
        var value = event.target.innerHTML;
        if (value.indexOf("<") != -1) {
            return;
        }
        event.target.setAttribute("class", "active");
        var write = true;
        ontTypeCount++;
        $(".back-del").show();
        $("input").each(function () {
            var word = JSON.parse(localStorage.Words)[localStorage.Index];
            $(this).val($(this).val() + value);
            if (ontTypeCount == word.Syllables.length) {
                $(".back-del").hide();
                ontTypeCount = 0;
                clearInterval(timer);
                // var word = JSON.parse(localStorage.Words)[localStorage.Index];
                var answer = "";
                $("input").each(function () {
                    answer += $(this).val();
                });
                if (answer == word.Word) {

                    $("#rightshow").remove("none");
                    $("#rightshow").show();

                    LogTime(currentUseTime, 2);
                    if (currentType == -1) {
                        currentType = 0;
                        SetWordType();
                    } else if (currentType == 3) {
                        LogTime(5, 0);
                        currentType = 0;
                        SetWordType();
                    }
                    LogStudy(1, 0);
                    SetStudyUp(1);
                    localStorage.Index = parseInt(localStorage.Index) + 1;
                    currentType = -1;

                    setTimeout(function () {
                        if (parseInt(localStorage.Index) != JSON.parse(localStorage.Words).length) {
                            InitProccess();
                        }
                        var isTrue = true;
                        setTimeout(function () {
                            $.ajax({
                                url: '/Student/LearnCenter/GetCourseWord', // 跳转到 action    
                                data: {
                                    wordId: JSON.parse(localStorage.Words)[localStorage.Index - 1].WordId
                                },
                                type: 'post',
                                async: false,
                                success: function (data) {

                                    if (data.State == "true" || data.State >= 1) {
                                        isTrue = true;
                                        console.log("小伙子/小姑娘你的数据已经完美提交了");
                                    } else {
                                        isTrue = false;
                                        console.log("数据未提交成功，请重新学习1！");
                                    }
                                },
                                error: function () {
                                    isTrue = false;
                                    console.log("数据未提交成功，请重新学习2！");
                                }

                            });
                            if (parseInt(localStorage.Index) == JSON.parse(localStorage.Words).length && isTrue) {
                                window.location.href = "/Student/LearnCenter/SelfTestIndex?unitId=" + unitId + "&count=" + localStorage.Index;
                            } else {

                                InitLearnPage(1, 0, 0);
                            }
                        }, 1000);

                    }, 1000);




                } else {
                    $("#errorshow").remove("none");
                    $("#errorshow").show();

                    setTimeout(function () {
                        //进入学习页面
                        LogTime(currentUseTime, 2);
                        if (currentType == -1) {
                            currentType = 1;
                            SetWordType();
                        } else if (currentType == 3) {
                            LogTime(5, 0);
                            currentType = 2;
                            SetWordType();
                        }
                        LogStudy(0, 0);
                        InitLearnPage(3, 0, 0);
                    }, 1000);
                }
            }


        });
    });

    //拼写题清空
    $("body").delegate(".back-del", "click", function () {
        $("input").each(function () {
            $(this).val("");
        });
        $("#onetype span").each(function () {
            $(this).removeClass("active");
        });

    });



    //选义题
    $("body").delegate(".items", "click", function (event) {
        if ($(event.target).attr("class") == "items") {
            return;
        }
        $(this).children("img").each(function () {
            if ($(this).attr("data-id") == $(event.target).attr("data-id")) {
                $(this).removeClass("none");
            }
        });
        clearInterval(timer);
        if ($(event.target).attr("data-id") == "ok") {
            var word = JSON.parse(localStorage.Words)[localStorage.Index];
            if (word.Spoken == 1 || word.Writen == 1) {
                $("img[data-id=\"ok\"]").show();
                $(event.target).addClass("success");
                setTimeout(function () {
                    InitLearnPage(2, 1, 1);
                }, 1000);
            } else {
                $("img[data-id=\"ok\"]").show();
                $(event.target).addClass("success");
                LogTime(currentUseTime, 2);
                if (currentType == -1) {
                    currentType = 0;
                    SetWordType();
                } else if (currentType == 3) {
                    LogTime(5, 0);
                    currentType = 0;
                    SetWordType();
                }
                LogStudy(1, 3);
                SetStudyUp(1);
                localStorage.Index = parseInt(localStorage.Index) + 1;
                currentType = -1;
                if (parseInt(userCount) == 0) {
                    guide.popup($(event.target), 'userchooseok', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', 'Congratulations！熟词＋1', '/egword/build/img/get-it-img3.png');
                    userCount = 1;
                    clearInterval(timer);

                } else {
                    setTimeout(function () {

                        if (parseInt(localStorage.Index) != JSON.parse(localStorage.Words).length) {
                            InitProccess();
                        }
                        var isTrue = true;
                        setTimeout(function () {
                            $.ajax({
                                url: '/Student/LearnCenter/GetCourseWord', // 跳转到 action    
                                data: {
                                    wordId: JSON.parse(localStorage.Words)[localStorage.Index - 1].WordId
                                },
                                type: 'post',
                                async: false,
                                success: function (data) {

                                    if (data.State == "true" || data.State >= 1) {
                                        isTrue = true;
                                        console.log("小伙子/小姑娘你的数据已经完美提交了");
                                    } else {
                                        isTrue = false;
                                        console.log("数据未提交成功，请重新学习1！");
                                    }
                                },
                                error: function () {
                                    isTrue = false;
                                    console.log("数据未提交成功，请重新学习2！");
                                }

                            });
                            if (parseInt(localStorage.Index) == JSON.parse(localStorage.Words).length && isTrue) {
                                window.location.href = "/Student/LearnCenter/SelfTestIndex?unitId=" + unitId + "&count=" + localStorage.Index;
                            } else {
                                InitLearnPage(1, 0, 0);
                            }
                        }, 1000);

                    }, 1000);
                }
            }

        } else {
            $(".btn").each(function () {
                if ($(this).attr("data-id") == "ok") {
                    $(this).addClass("success");
                }
            });
            $("img[data-id=\"ok\"]").show();
            $("img[data-id=\"" + $(event.target).attr("data-id") + "\"]").show();
            $(event.target).addClass("error");
            setTimeout(function () {
                LogStudy(0, 3);
                LogTime(currentUseTime, 2);
                if (currentType == -1) {
                    currentType = 1;
                    SetWordType();
                }
                else if (currentType == 3) {
                    LogTime(5, 0);
                    currentType = 2;
                    SetWordType();
                }
                if (parseInt(userCount) == 0) {
                    guide.popup($(event.target), 'userchooseerror', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', 'Come on！夹生词＋1', '/egword/build/img/get-it-img3.png');
                    userCount = 1;
                    clearInterval(timer);
                } else {
                    InitLearnPage(3, 0, 0);
                }
            }, 1000);


        }
    });

    $("body").delegate("#knowword", "click", function (event) {
        currentType = -1;
        LogTime(currentUseTime, 0);
        InitLearnPage(2, 1, 0);
    });

    $("body").delegate("#notknow", "click", function (event) {
        LogTime(currentUseTime, 0);
        currentType = 2;
        SetWordType();
        InitLearnPage(3, 0, 0);
    });

    $("body").delegate("#nextword", "click", function (event) {
        if (!canClick) {
            return;
        }
        clearInterval(timer);
        clearInterval(timerRead);
        if (currentType == 4) {
            InitLearnPage(1, 0, 0);
            // SetStudyUp(0);
            // localStorage.Index = parseInt(localStorage.Index) + 1;
            //currentType = -1;
        } else {
            LogTime(currentUseTime, 1);
            InitLearnPage(2, 3, 1);
        }

    });

    $("body").delegate(".userchooseok", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        var isTrue = true;
        setTimeout(function () {
            $.ajax({
                url: '/Student/LearnCenter/GetCourseWord', // 跳转到 action    
                data: {
                    wordId: JSON.parse(localStorage.Words)[localStorage.Index - 1].WordId
                },
                type: 'post',
                async: false,
                success: function (data) {

                    if (data.State == "true" || data.State >= 1) {
                        isTrue = true;
                        console.log("小伙子/小姑娘你的数据已经完美提交了");
                    } else {
                        isTrue = false;
                        console.log("数据未提交成功，请重新学习1！");
                    }
                },
                error: function () {
                    isTrue = false;
                    console.log("数据未提交成功，请重新学习2！");
                }

            });
            if (parseInt(localStorage.Index) == JSON.parse(localStorage.Words).length && isTrue) {
                window.location.href = "/Student/LearnCenter/SelfTestIndex?unitId=" + unitId + "&count=" + localStorage.Index;
            } else {
                InitLearnPage(1, 0, 0);
            }
        }, 1000);

    });

    $("body").delegate(".userchooseerror", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        InitLearnPage(3, 0, 0);
    });
    $('.header .close,.eg-pop .cancel').click(function () {
        $('.pop-mask').hide();
        $('.eg-pop').hide();
        timerStop = false;
    });


});
