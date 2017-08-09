
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;

namespace OurTool.Wechat
{
    /// <summary>
    /// Wxapi 的摘要说明
    /// </summary>
    public class Wxapi : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            string code = "";
            string iv = "";
            string encryptedData = "";
            try
            {
                code = HttpContext.Current.Request.QueryString["code"].ToString();
                iv = HttpContext.Current.Request.QueryString["iv"].ToString();
                encryptedData = HttpContext.Current.Request.QueryString["encryptedData"].ToString();
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }

            string Appid = "wxa89da5b83536b33a";
            string Secret = "ccec6297c6137167d7684fdc080c366d";
            string grant_type = "authorization_code";

            //向微信服务端 使用登录凭证 code 获取 session_key 和 openid   
            string url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + Appid + "&secret=" + Secret + "&js_code=" + code + "&grant_type=" + grant_type;
            string type = "utf-8";

            GetUsersHelper GetUsersHelper = new GetUsersHelper();
            string j = GetUsersHelper.GetUrltoHtml(url, type);//获取微信服务器返回字符串  

            //将字符串转换为json格式  
            JObject jo = (JObject)JsonConvert.DeserializeObject(j);

            OpenIdAndSessionKey res = new OpenIdAndSessionKey();
            try
            {
                //微信服务器验证成功  
                res.openid = jo["openid"].ToString();
                res.session_key = jo["session_key"].ToString();
            }
            catch (Exception)
            {
                //微信服务器验证失败  
                res.errcode = jo["errcode"].ToString();
                res.errmsg = jo["errmsg"].ToString();
            }
            if (!string.IsNullOrEmpty(res.openid))
            {
                //用户数据解密  
                GetUsersHelper.AesIV = iv;
                GetUsersHelper.AesKey = res.session_key;

                string result = GetUsersHelper.AESDecrypt(encryptedData);


                //存储用户数据  
                JObject _usrInfo = (JObject)JsonConvert.DeserializeObject(result);

                WechatUserInfo userInfo = new WechatUserInfo();
                userInfo.openId = _usrInfo["openId"].ToString();

                try //部分验证返回值中没有unionId  
                {
                    userInfo.unionId = _usrInfo["unionId"].ToString();
                }
                catch (Exception)
                {
                    userInfo.unionId = "unionId";
                }

                userInfo.nickName = _usrInfo["nickName"].ToString();
                userInfo.gender = _usrInfo["gender"].ToString();
                userInfo.city = _usrInfo["city"].ToString();
                userInfo.province = _usrInfo["province"].ToString();
                userInfo.country = _usrInfo["country"].ToString();
                userInfo.avatarUrl = _usrInfo["avatarUrl"].ToString();

                object watermark = _usrInfo["watermark"].ToString();
                object appid = _usrInfo["watermark"]["appid"].ToString();
                object timestamp = _usrInfo["watermark"]["timestamp"].ToString();


                #region  


                //创建连接池对象（与数据库服务器进行连接）  
                MySqlConnection conn = new MySqlConnection("Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;");
                //打开连接池  
                conn.Open();
                //创建命令对象  
                string Qrystr = "SELECT * FROM WeChatUsers WHERE openId='" + userInfo.openId + "'";
                MySqlCommand cmdQry = new MySqlCommand(Qrystr, conn);
                object obj = cmdQry.ExecuteScalar();
                if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
                {
                    string str = "INSERT INTO WeChatUsers ([UnionId] ,[OpenId],[NickName],[Gender],[City],[Province],[Country],[AvatarUrl],[Appid],[Timestamp],[Memo],[Counts])VALUES('" + userInfo.unionId + "','" + userInfo.openId + "','" + userInfo.nickName + "','" + userInfo.gender + "','" + userInfo.city + "','" + userInfo.province + "','" + userInfo.country + "','" + userInfo.avatarUrl + "','" + appid.ToString() + "','" + timestamp.ToString() + "','来自微信小程序','1')";

                    MySqlCommand cmdUp = new MySqlCommand(str, conn);
                    // 执行操作  
                    try
                    {
                        int row = cmdUp.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        context.Response.Write(ex.ToString());
                    }
                }
                else
                {
                    //多次访问，记录访问次数counts   更新unionId是预防最初没有，后期关联后却仍未记录  
                    string str = "UPDATE dbo.WeChatUsers SET counts = counts+1，UnionId = '" + userInfo.unionId + "' WHERE OpenId='" + userInfo.openId + "'";
                    MySqlCommand cmdUp = new MySqlCommand(str, conn);
                    int row = cmdUp.ExecuteNonQuery();
                }

                //关闭连接池  
                conn.Close();
                #endregion

                //返回解密后的用户数据  
                context.Response.Write(result);
            }
            else
            {
                context.Response.Write(j);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }

    /// <summary>  
    /// 微信小程序登录信息结构  
    /// </summary>  
    public class WechatLoginInfo
    {
        public string code { get; set; }
        public string encryptedData { get; set; }
        public string iv { get; set; }
        public string rawData { get; set; }
        public string signature { get; set; }
    }
    /// <summary>  
    /// 微信小程序用户信息结构  
    /// </summary>  
    public class WechatUserInfo
    {
        public string openId { get; set; }
        public string nickName { get; set; }
        public string gender { get; set; }
        public string city { get; set; }
        public string province { get; set; }
        public string country { get; set; }
        public string avatarUrl { get; set; }
        public string unionId { get; set; }
        public Watermark watermark { get; set; }

        public class Watermark
        {
            public string appid { get; set; }
            public string timestamp { get; set; }
        }
    }
    public class OpenIdAndSessionKey
    {
        public string openid { get; set; }
        public string session_key { get; set; }
        public string errcode { get; set; }
        public string errmsg { get; set; }
    }
}