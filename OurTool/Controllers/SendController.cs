using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace OurTool.Controllers
{
    public class SendController : Controller
    {
        // GET: Send
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// （微信推送）
        /// </summary>
        /// <param name="paraList"></param>
        /// <returns></returns>
        public int GetPushInfo(string str)
        {

            List<string> openIds = new List<string>() { "oEMsK0ZAughkZOZ8nFLD8y5DNsxc" };//我自己 ozmxY0rJ3qWyq8QWzXE-6GBRXUzo
            string tempId = "P9j5WqDjmy1gcK8WDavSDFuPLHos1fenHkcONFqbJ-c";//获取机构的退课模板
            
            int numExec = 0;
            StringBuilder sb = new StringBuilder();
            foreach (var item in openIds)
            {
                sb.Append("{\"touser\": \"" + item + "\"," +
                           "\"template_id\": \"" + tempId + "\", " +
                              "\"page\": \"" + "index" + "\", " +
                            "\"url\": \"" + "fd"+ "\", " +
                           "\"form_id\": \"\", " +
                           "\"data\": " +
                           "{\"first\": {\"value\": \"" +"内容" + "\",\"color\": \"#173177\"}," +
                           "\"keyword1\": { \"value\": \"《" + "书名"+ "》\",\"color\": \"#173177\"}," +
                           "\"keyword2\": { \"value\": \"" + "已取消" + "\",\"color\": \"#173177\"}," +
                                 "\"keyword3\": { \"value\": \"" + "已取消" + "\",\"color\": \"#173177\"}," +

                           "\"keyword4\": {\"value\": \"" + "备注" + "\",\"color\": \"#173177\" }}}");
                SendTempletMessge(sb.ToString(), "wxa89da5b83536b33a", "ccec6297c6137167d7684fdc080c366d");

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

    public class WXApi
    {
        public string access_token { set; get; }
    }
}