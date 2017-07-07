using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OurToolDAL.News;
using OurToolModel;
using OurToolModel.News;

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
    }
}
