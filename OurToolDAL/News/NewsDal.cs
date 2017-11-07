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
using OurToolModel.Parents;

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

        /// <summary>
        /// 获取机构列表
        /// </summary>
        /// <param name="paraList"></param>
        /// <returns></returns>
       public ManageResponse<List<Org>> GetOrgsList(ManagePara<SearhOrg> paraList)
       {
            List<MySqlParameter> mySqlParams = new List<MySqlParameter>();
            string whereClause = ConvertQuery(paraList.Para, mySqlParams);

            ManageResponse<List<Org>> result = new ManageResponse<List<Org>>();

            string order = " o.UpdateTime DESC,o.OrgId desc";

            string countSql = string.Format("SELECT   count(1) FROM `ourtool`.`ParentsOrg`  o  where 1=1  {0} ;", whereClause);
            //string bandSql = string.Format("SELECT   count(1)  FROM       `mfg_user`   u  WHERE      1=1  and   UserRole in (2,3,4)  and  u.IsEffect=1    AND  u.IsFrozen=1  {0} ;", whereClause);//禁用
            string searchSql = string.Format("SELECT `OrgId`, `ImgUrl`, `Content`, `ReMark`, `LInkMan`, `LinkTel`, `ProvinceId`, `CityId`, `CountyId`, `CreateTime`, `UpdateTime`,OrgName,Address  FROM `ourtool`.`ParentsOrg`     o  WHERE      1=1    {0} ORDER BY  {3}     LIMIT {1},{2};", whereClause, (paraList.PageIndex - 1) * paraList.PageSize, paraList.PageSize, order);

            result.PageSum = Convert.ToInt32(DBHelper.GetScalarFile(countSql, mySqlParams.ToArray()));//总数
            //result.TagValue = DBHelper.GetScalarFile(bandSql, mySqlParams.ToArray()).ToString();//禁用人数
            if (result.PageSum > 0)
            {
                result.Data = DBHelper.GetDataInfolList(searchSql, GetOrgListTran, mySqlParams.ToArray());
            }



            return result;
        }


        /// <summary>
        /// 辅助检索
        /// </summary>
        private string ConvertQuery(SearhOrg seachOrg, List<MySqlParameter> list)
        {
            StringBuilder whereClause = new StringBuilder();
            if (seachOrg == null)
            {

                return "";
            }
          
            //搜索条件
            if (!string.IsNullOrEmpty(seachOrg.KeyWord))
            {
                whereClause.Append(" AND (  o.LInkMan LIKE CONCAT('%', @str, '%')  or o. OrgName LIKE CONCAT('%', @str, '%')  or o. LinkTel LIKE CONCAT('%', @str, '%') )");//账号和姓名加上电话
                //list.Add(DBHelper.AddParameterWithValue("@str", searhOrg.KeyWord));
                list.Add(new MySqlParameter("@str", seachOrg.KeyWord));

            }

            return whereClause.ToString();
        }

        /// <summary>
        /// 机构列表转换
        /// </summary>
        /// <param name="arg"></param>
        /// <returns></returns>
        private Org GetOrgListTran(IDataReader arg)
        {
            Org org = new Org();
            org.OrgId = DataRecord.GetInt32(arg, "OrgId");
            org.OrgName = DataRecord.GetString(arg, "OrgName");

            org.ImgUrl = DataRecord.GetString(arg, "ImgUrl");
            org.Content = DataRecord.GetString(arg, "Content");
            org.LinkTel = DataRecord.GetString(arg, "LinkTel");
            org.LInkMan = DataRecord.GetString(arg, "LInkMan");
            org.Address = DataRecord.GetString(arg, "Address");


            org.UpdateTime = DataRecord.GetDateTime(arg, "UpdateTime").ToString("yyyy-MM-dd HH:mm");

            return org;
        }
        /// <summary>
        /// 获取机构详情
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
       public Org GetOrgDetailById(int orgId)
       {
            string searchSql = "SELECT `OrgId`, `ImgUrl`, `Content`, `ReMark`, `LInkMan`, `LinkTel`, `ProvinceId`, `CityId`, `CountyId`, `CreateTime`, `UpdateTime`,OrgName,Address  FROM `ourtool`.`ParentsOrg`     o  WHERE      1=1  and OrgId=@OrgId   ;";

            return DBHelper.GetDataInfo(searchSql, GetOrgListTran, new MySqlParameter("@OrgId", orgId));
       }
    }
}
