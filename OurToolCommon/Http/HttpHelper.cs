using System.IO;
using System.Net;
using System.Text;

namespace OurToolCommon.Http
{
    public class HttpHelper
    {
        /// <summary>
        /// 通过URL、获取返回值
        /// </summary>
        /// <param name="url">路径</param>
        /// <returns></returns>
        public static string RequestJSONFromUrl(string url)
        {
            //ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            //超时时间为：90秒
            request.Timeout = 90000;
            request.Credentials = CredentialCache.DefaultCredentials;
            #region 捕捉错误信息
            request.Headers.Set("Pragma", "no-cache");
            request.UserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)";
            #endregion
            var response = request.GetResponse();
            var stream = response.GetResponseStream();
            if (stream == null) return "";
           
            using (var reader = new StreamReader(stream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

        /// <summary>    
        /// 返回JSon数据    
        /// </summary>    
        /// <param name="JSONData">要处理的JSON数据</param>    
        /// <param name="Url">要提交的URL</param>    
        /// <returns>返回的JSON处理字符串</returns>    
        public static string GetResponseData(string JSONData, string Url)
        {

            //ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3;
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
            request.UserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream streamReceive = response.GetResponseStream();
            Encoding encoding = Encoding.UTF8;

            StreamReader streamReader = new StreamReader(streamReceive, encoding);
            string strResult = streamReader.ReadToEnd();
            streamReceive.Dispose();
            streamReader.Dispose();
            return strResult;
        }

    }
}
