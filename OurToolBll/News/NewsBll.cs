using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OurToolDAL.News;
using OurToolModel;
using OurToolModel.News;
using OurToolModel.Parents;

namespace OurToolBll.News
{
    public class NewsBll
    {

        NewsDal userDal = new NewsDal();

        /// <summary>
        /// 获取实时新闻
        /// </summary>
        /// <returns></returns>
        public string GetNewsList()
        {
            List<NewsShow> list = userDal.GetNewsList();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < list.Count; i++)
            {
                if (i == 0)
                {
                    sb.Append(string.Format("<ul class=\"tab-cnt on\">"));
                }
               
                sb.Append(string.Format("<li><a href=\"{0}\" >{1}</a></li>",list[i].Href,list[i].Title));

                if (i == 9)
                {
                    sb.Append(string.Format("</ul><ul class=\"tab-cnt\"> <li><a href =\"{0}\" >{1}</a></li>", list[i].Href, list[i].Title));
                }
                if (i==19)
                {
                    sb.Append("</ul>");
                }


            }
            return sb.ToString();


        }
        /// <summary>
        /// 获取热点新闻
        /// </summary>
        /// <returns></returns>
        public List<HotNews> GetHotNewsList()
        {
            List<HotNews> list = userDal.GetHotNewsList();

            return list;
        }
        /// <summary>
        /// 插入地理位置信息
        /// </summary>
        /// <param name="locInfo"></param>
        /// <returns></returns>
        public int InsertLoctInfo(string locInfo)
        {
            return userDal.InsertLoctInfo(locInfo);


        }
        /// <summary>
        /// 获取机构列表
        /// </summary>
        /// <param name="paraList"></param>
        /// <returns></returns>
        public ManageResponse<List<Org>> GetOrgsList(ManagePara<SearhOrg> paraList)
        {
            ManageResponse<List<Org>> result = new ManageResponse<List<Org>> { Ok = true };
            try
            {
              
                result = userDal.GetOrgsList(paraList);
               

            }
            catch (Exception ex)
            {

                result.Ok = false;
                result.Result ="异常";//CustomInfo
                result.Code = "002";
            }
            return result;
        }
        /// <summary>
        /// 获取机构详情根据机构id
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
        public ManageResponse<Org> GetOrgDetailById(int orgId)
        {
            ManageResponse<Org> result = new ManageResponse<Org>();
            try
            {

                result.Data = userDal.GetOrgDetailById(orgId);


            }
            catch (Exception ex)
            {

                result.Ok = false;
                result.Result = "异常";//CustomInfo
                result.Code = "002";
            }
            return result;
        }
    }
}
