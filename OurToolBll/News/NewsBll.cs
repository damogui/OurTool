using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
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

                sb.Append(string.Format("<li><a href=\"{0}\" >{1}</a></li>", list[i].Href, list[i].Title));

                if (i == 9)
                {
                    sb.Append(string.Format("</ul><ul class=\"tab-cnt\"> <li><a href =\"{0}\" >{1}</a></li>", list[i].Href, list[i].Title));
                }
                if (i == 19)
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
                result.Result = "异常";//CustomInfo
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
        /// <summary>
        /// 进行推送
        /// </summary>
        /// <param name="sendSmall"></param>
        /// <returns></returns>
        public int PushSmall(SendSmall sendSmall)
        {
            Org org = userDal.GetOrgDetailById(sendSmall.OrgId);

            List<string> openIds = new List<string>() { sendSmall.OpenId };//我自己 ozmxY0rJ3qWyq8QWzXE-6GBRXUzo
            string tempId = "cfoCwUwZJXU2N7Tul9UsuR5hGOcEr-iN6ewHjyqsGjA";//推送模板

            int numExec = 0;
            StringBuilder sb = new StringBuilder();
            foreach (var item in openIds)
            {
                sb.Append("{\"touser\": \"" + item + "\"," +
                           "\"template_id\": \"" + tempId + "\", " +
                              "\"page\": \"" + "pages/search/details/details?orgId=" + sendSmall.OrgId + "\", " +

                           "\"form_id\": \"" + sendSmall.FormId + "\", " +
                           "\"data\": " +
                           "{\"keyword1\": {\"value\": \"" + org.OrgName + "\",\"color\": \"#173177\"}," +
                           "\"keyword2\": { \"value\": \"" + org.Content + "\",\"color\": \"#173177\"}," +
                                 "\"keyword3\": { \"value\": \"" + DateTime.Now + "\",\"color\": \"#173177\"}," +
                                  "\"keyword4\": { \"value\": \"" + org.LinkTel + "\",\"color\": \"#173177\"}," +
                           "\"keyword5\": {\"value\": \"" + org.LInkMan + "\",\"color\": \"#173177\" }}}");
                SendTempletMessge(sb.ToString(), "wxba92380dc6210082", "8938f3c2513bfc3883038284b67e0316");

                numExec += 1;
                sb.Clear();


            }


            return numExec;
        }


        #region 微信消息模板
        /// <summary>
        /// 传递推送模板
        /// </summary>
        /// <param name="temp"></param>
        /// <param name="appId"></param>
        /// <param name="secret"></param>
        /// <returns></returns>
        public string SendTempletMessge(string temp, string appId, string secret)
        {
            string strReturn = string.Empty;
            try
            {
                #region 获取access_token  
                string apiurl = string.Format("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}", appId, secret);
                WebRequest request = WebRequest.Create(@apiurl);
                request.Method = "POST";
                WebResponse response = request.GetResponse();
                Stream stream = response.GetResponseStream();
                Encoding encode = Encoding.UTF8;
                StreamReader reader = new StreamReader(stream, encode);
                string detail = reader.ReadToEnd();
                var jd = JsonConvert.DeserializeObject<WXApi>(detail);
                string token = (String)jd.access_token;
                #endregion

                #region 组装信息推送，并返回结果（其它模版消息于此类似）  
                string url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + token;
                #endregion

                //发送消息  
                GetResponseData(temp, @url);
                strReturn = "推送成功";
            }
            catch (Exception ex)
            {
                strReturn = ex.Message;
            }
            return strReturn;
        }

        /// <summary>    
        /// 返回JSon数据    
        /// </summary>    
        /// <param name="JSONData">要处理的JSON数据</param>    
        /// <param name="Url">要提交的URL</param>    
        /// <returns>返回的JSON处理字符串</returns>    
        public string GetResponseData(string JSONData, string Url)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(JSONData);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);
            request.Method = "POST";
            request.ContentLength = bytes.Length;
            request.ContentType = "json";
            Stream reqstream = request.GetRequestStream();
            reqstream.Write(bytes, 0, bytes.Length);

            //声明一个HttpWebRequest请求    
            request.Timeout = 90000;
            //设置连接超时时间    
            request.Headers.Set("Pragma", "no-cache");
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream streamReceive = response.GetResponseStream();
            Encoding encoding = Encoding.UTF8;

            StreamReader streamReader = new StreamReader(streamReceive, encoding);
            string strResult = streamReader.ReadToEnd();
            streamReceive.Dispose();
            streamReader.Dispose();
            return strResult;
        }

        #endregion




    }
}
