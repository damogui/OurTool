﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mfg_word_Dal;
using OurToolDAL.SqlTran;
using OurToolModel.News;

namespace OurToolDAL.News
{
   public class NewsDal
    {
        /// <summary>
        /// 获取实时新闻
        /// </summary>
        /// <returns></returns>
       public List<NewsShow> GetNewsList()
        {
            string sqlStr= "SELECT `Id`, `Href`, `Title`, `CreatTime`, `Mark` FROM `ourtool`.`News` LIMIT 0, 20;";

            return DBHelper.GetDataInfolList(sqlStr, GetNewsListTran);


        }
        /// <summary>
        /// 转换
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
       private NewsShow GetNewsListTran(IDataReader arg)
       {
            NewsShow newsShow=new NewsShow();
            newsShow.Href = DataRecord.GetString(arg, "Href");
            newsShow.Title = DataRecord.GetString(arg, "Title");
            return newsShow;
       }
    }
}