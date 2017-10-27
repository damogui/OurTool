using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mfg_word_Dal;
using MySql.Data.MySqlClient;
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
        /// <summary>
        /// 获取热点新闻
        /// </summary>
        /// <returns></returns>
       public List<HotNews> GetHotNewsList()
       {
            string sqlStr = "SELECT `Id`, `Href`, `Title`, `CreatTime`, `Mark` FROM `ourtool`.`HotNews` LIMIT 0, 3;";

            return DBHelper.GetDataInfolList(sqlStr, GetHotNewsListTran);
        }

        /// <summary>
        /// 转换
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        private HotNews GetHotNewsListTran(IDataReader arg)
        {
            HotNews hotNews = new HotNews();
            hotNews.Href = DataRecord.GetString(arg, "Href");
            hotNews.Title = DataRecord.GetString(arg, "Title");
            return hotNews;
        }
        /// <summary>
        /// 插入地理位置信息
        /// </summary>
        /// <param name="locInfo"></param>
        /// <returns></returns>
       public int InsertLoctInfo(string locInfo)
       {
            string sql = "INSERT INTO `ourtool`.`LoctionInfo` ( `PrinvceName`, `CityName`, `CountryName`, `CreateTime` ) VALUES (@PrinvceName, @CityName, @CountryName, NOW() ) ;";

            return DBHelper.ExecuteSql(sql,new MySqlParameter[] {new MySqlParameter("@PrinvceName", locInfo.Split('-')[0]), new MySqlParameter("@CityName", locInfo.Split('-')[1]), new MySqlParameter("@CountryName", locInfo.Split('-')[2]) });
       }
    }
}
