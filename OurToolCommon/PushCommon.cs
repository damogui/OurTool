using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace OurToolCommon
{
   public class PushCommon
    {

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
