module.exports = {
    Paginator: function (pageSize, currentPage, totalCount, callback) {
        //todo 绑定事件

        var totalPages;
        if (totalCount % pageSize == 0) {
            totalPages = totalCount / pageSize;
        }
        else {
            totalPages = parseInt(totalCount / pageSize) + 1;
        }
        var pagePre = '<a href="#"  data-num=' + (parseInt(currentPage) - 1) + ' class="pre-page inline mr20 pre-e">上一页</a>';
        var pageNext = '<a href="#"  data-num=' + (parseInt(currentPage) + 1) + ' class="next-page inline next-e">下一页</a>';
        var indexPage = '<a href="#"  data-num="1" class="pre-page inline mr20">首页</a></li>';

        var lastPage = ' <a href="#"  data-num=' + totalPages + ' class="pre-page inline mr20 ml20"> 末页</a>';
        if (totalPages < pageSize) {
            // pagePre = "";
            //pageNext = "";
            indexPage = "";
            lastPage = "";
        }

        if (currentPage <= 1) {
            currentPage = 1;
            pagePre = "";

        }
        if (currentPage >= totalPages) {
            currentPage = totalPages;
            pageNext = "";
            lastPage = "";
        }

        if (totalCount > 0) {

            var pagenum = '<ul class="page-box inline mr20 mb20">';


            if (totalPages > 1) {
                if (currentPage == 1) //第一页
                {

                    //output.Append(" <a disabled='disabled' class='colH'>上一页</a> ");//上一页
                }
                if (currentPage > 1) {
                    //处理首页连接
                    //处理上一页的连接
                    //pagePre = ' <li><a href="#"  data-num=' + (parseInt(currentPage) - 1) + '>上一页</a> </li>';
                    // output.AppendFormat(" <a data-pageIndex='{0}' class='pageLink'>上一页</a> ", currentPage - 1);//上一页
                }
                if (totalPages > 7) {
                    var currint = 3;
                    if (currentPage < 4)//4
                    {

                        for (var i = 0; i <= 6; i++) {
                            if (currentPage == i + 1) {
                                pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + currentPage + '>' + currentPage + '</a> </li>';

                            }
                            else {
                                if (i == 6) {

                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + 7 + '>...</a> </li>';
                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + totalPages + '>' + totalPages + '</a> </li>';
                                }
                                else {

                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (i + 1) + '>' + (i + 1) + '</a> </li>';
                                }
                            }
                        }
                    }//4
                    else if (currentPage >= 4 && currentPage < totalPages - 3) {

                        for (var i = 0; i <= 6; i++) {
                            if (i == 0) {
                                //pagenum=pagenum+' <li data-num='+(currentPage-3)+'><a href="#" onclick="Paginator('+pageSize+','+(currentPage-3)+',' + totalCount + ')">...</a> </li>';
                                pagenum = pagenum + ' <li><a href="#"  data-num="1">1</a> </li>';//201609130930
                                if (parseInt(currentPage) - 3 > 1) {
                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (parseInt(currentPage) - 3) + '>...</a> </li>';//201609130930
                                }

                            }
                            else if (i == 3)//中间当前页
                            {


                                pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + (currentPage) + '>' + currentPage + '</a> </li>';
                            }
                            else if (i == 6) {

                                pagenum = pagenum + ' <li><a href="#" data-num=' + (parseInt(currentPage) + 3) + '>...</a> </li>';
                                pagenum = pagenum + ' <li><a href="#"  data-num=' + totalPages + '>' + totalPages + '</a> </li>';
                            }
                            else {

                                pagenum = pagenum + ' <li><a href="#"  data-num=' + (parseInt(currentPage) + i - parseInt(currint)) + '>' + (parseInt(currentPage) + i - parseInt(currint)) + '</a> </li>';
                            }
                        }

                    }
                    else {
                        for (var i = 0; i <= 6; i++) {
                            if (i == 0) {

                                pagenum = pagenum + ' <li><a href="#"  data-num="1">1</a> </li>';//201609130930
                                pagenum = pagenum + ' <li><a href="#" data-num=' + (parseInt(totalPages) - 6) + '>...</a> </li>';//201609130930
                            }
                            else {
                                if (totalPages - 6 + i == currentPage) {


                                    pagenum = pagenum + ' <li><a href="#" class="active"  data-num=' + currentPage + '>' + currentPage + '</a> </li>';
                                }
                                else {

                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (totalPages - 6 + i) + '>' + (totalPages - 6 + i) + '</a> </li>';
                                }
                            }
                        }
                    }

                }
                else {
                    for (var i = 0; i < totalPages; i++) {
                        if (currentPage == i + 1) {

                            pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + currentPage + '>' + currentPage + '</a> </li>';

                        }
                        else {

                            pagenum = pagenum + ' <li><a href="#"  data-num=' + (i + 1) + '>' + (i + 1) + '</a> </li>';

                        }
                    }
                }
                if (currentPage == totalPages) //最后一页
                {//处理下一页和尾页的链接


                    //output.Append(" <a disabled='disabled' class='colH'>下一页</a> ");
                    pageNext = "";
                    lastPage = "";
                }
                if (currentPage < totalPages) {//处理下一页和尾页的链接 

                    //output.AppendFormat(" <a data-pageindex='{0}' class='pageLink'>下一页</a> ", currentPage + 1);
                    //pagePre = '<a href="#"  data-num=' + (parseInt(currentPage) + 1) + ' class="next-page inline">下一页</a>';
                }


            }

            pagenum = pagenum + '</ul>';
            document.getElementById("pagination").innerHTML = indexPage + pagePre + pagenum + pageNext;


        }
        else {
            document.getElementById("pagination").innerHTML = "";
        }
        $("#pagination a").unbind("click");
        $("#pagination a").bind("click", function () {
           
            if (callback) {
                callback($(this).attr("data-num"));
            }
        });

    }
}
//function Paginator(pageSize, currentPage, totalCount, callback) {


//}

