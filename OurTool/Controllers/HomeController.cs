using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OurTool.Wechat;
using OurToolBll.News;
using OurToolModel.News;
using OurWechatSdkCore;

namespace OurTool.Controllers
{
    public class HomeController : BaseController
    {
        NewsBll newsBll=new NewsBll();
        public ActionResult Index()
        {
            ViewBag.config = GetWchatConfig();
            string news = newsBll.GetNewsList();
            ViewBag.News = news;
            return View("Index");
        }
        /// <summary>
        /// 最新our66新首页
        /// </summary>
        /// <returns></returns>
        public ActionResult OurIndex()
        {
            return View("OurIndex");

        }

        //二维码生成
        public ActionResult MTCode()
        {
            ViewBag.config = GetWchatConfig();

            return View();

        } 
        /// <summary>
        /// 广告
        /// </summary>
        /// <returns></returns>
        public ActionResult Show()
        {
            ViewBag.config = GetWchatConfig();

            return View();

        }

        /// <summary>
        /// 生成签名串
        /// </summary>
        /// <returns></returns>
        public string GetSignStr()
        {

           
            string signature = Request["signature"];
            string echostr = Request["echostr"];//返回的随机字符串
          

            string timestamp = Request["timestamp"];
            string nonce = Request["nonce"];
            string token = "our666";


            Dictionary<string, string> signData = new Dictionary<string, string>() {
                 {"timestamp",timestamp},
                 {"nonce",nonce},
                 {"token",token}
               
             };

            string signatureMy = new Signature().Sign(signData);//获取的签名
            //signature应该和signatureMy相等

            return echostr;
        }
        /// <summary>
        /// 插入翻译微信用户
        /// </summary>
        /// <returns></returns>
        public string InsertUser()
        {
            string code = "";
            string iv = "";
            string encryptedData = "";
            try
            {
                code = HttpContext.Request.QueryString["code"].ToString();
                iv = HttpContext.Request.QueryString["iv"].ToString();
                encryptedData =Server.UrlDecode(HttpContext.Request.QueryString["encryptedData"].ToString()) ;
            }

           
            catch (Exception ex)
            {
                Response.Write("code:"+code+"|iv:"+ iv + "|encryptedData:" + encryptedData);
            }
          
            string Appid = "wxa89da5b83536b33a";
            string Secret = "ccec6297c6137167d7684fdc080c366d";
            string grant_type = "authorization_code";

            //向微信服务端 使用登录凭证 code 获取 session_key 和 openid   
            string url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + Appid + "&secret=" + Secret + "&js_code=" + code + "&grant_type=" + grant_type;
            string type = "utf-8";

            GetUsersHelper GetUsersHelper = new GetUsersHelper();
            string j = GetUsersHelper.GetUrltoHtml(url, type);//获取微信服务器返回字符串  
            //return string.Format("j:{0}---"+"code:" + code + "|iv:" + iv ,j);
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

                //return string.Format("j:{0}---" + "code:" + code + "|iv:" + iv + "result:" + result+ "encryptedData:"+ encryptedData+ "AesIV:"+iv+ "AesKey:"+ res.session_key, j);
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

                //return "code:" + code + "|iv:" + iv + "|encryptedData:" + encryptedData + "openId:" + userInfo.openId;
                #region   插入数据库


                //创建连接池对象（与数据库服务器进行连接）  
                MySqlConnection conn = new MySqlConnection("Database=ourtool;Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;");
                //打开连接池  
                conn.Open();
                //创建命令对象  
                string Qrystr = "SELECT * FROM WeChatUsers WHERE openId='" + userInfo.openId + "'";
                MySqlCommand cmdQry = new MySqlCommand(Qrystr, conn);
                object obj = cmdQry.ExecuteScalar();
                if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
                {
                    string str = "INSERT  into `ourtool`.`WeChatUsers` (   `OpenId`, `NickName`, `Gender`, `City`, `Province`, `Country`, `AvatarUrl`, `Appid`,  `Memo`, `Counts`,Type,CreateTime ) values('"+ userInfo.openId + "','" + userInfo.nickName + "','" + userInfo.gender + "','" + userInfo.city + "','" + userInfo.province + "','" + userInfo.country + "','" + userInfo.avatarUrl + "','" + appid.ToString()   + "','来自翻译小程序','1',1,now())";

                    MySqlCommand cmdUp = new MySqlCommand(str, conn);
                    // 执行操作  
                    try
                    {
                        int row = cmdUp.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        Response.Write(ex.ToString());
                    }
                }
                else
                {
                    //多次访问，记录访问次数counts   更新unionId是预防最初没有，后期关联后却仍未记录  
                    string str = "UPDATE   WeChatUsers SET counts = counts+1,EditeTime=now()  WHERE OpenId='" + userInfo.openId + "'";
                    MySqlCommand cmdUp = new MySqlCommand(str, conn);
                    int row = cmdUp.ExecuteNonQuery();
                }

                //关闭连接池  
                conn.Close();
                #endregion

                //返回解密后的用户数据  
                //Response.Write(result);
            }
            else
            {
                //Response.Write(j);
            }

            return "code:" + code + "|iv:" + iv + "|encryptedData:" + encryptedData+"openId:"+ res.openid;
        }

        /// <summary>
        /// 资讯用户插入
        /// </summary>
        /// <returns></returns>
        public string InsertUserNew()
        {
            string code = "";
            string iv = "";
            string encryptedData = "";
            try
            {
                code = HttpContext.Request.QueryString["code"].ToString();
                iv = HttpContext.Request.QueryString["iv"].ToString();
                encryptedData = Server.UrlDecode(HttpContext.Request.QueryString["encryptedData"].ToString());
            }


            catch (Exception ex)
            {
                Response.Write("code:" + code + "|iv:" + iv + "|encryptedData:" + encryptedData);
            }

            string Appid = "wxba92380dc6210082";//资讯的
            string Secret = "8938f3c2513bfc3883038284b67e0316";
            string grant_type = "authorization_code";

            //向微信服务端 使用登录凭证 code 获取 session_key 和 openid   
            string url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + Appid + "&secret=" + Secret + "&js_code=" + code + "&grant_type=" + grant_type;
            string type = "utf-8";

            GetUsersHelper GetUsersHelper = new GetUsersHelper();
            string j = GetUsersHelper.GetUrltoHtml(url, type);//获取微信服务器返回字符串  
            //return string.Format("j:{0}---"+"code:" + code + "|iv:" + iv ,j);
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

                //return string.Format("j:{0}---" + "code:" + code + "|iv:" + iv + "result:" + result+ "encryptedData:"+ encryptedData+ "AesIV:"+iv+ "AesKey:"+ res.session_key, j);
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

                //return "code:" + code + "|iv:" + iv + "|encryptedData:" + encryptedData + "openId:" + userInfo.openId;
                #region   插入数据库


                //创建连接池对象（与数据库服务器进行连接）  
                MySqlConnection conn = new MySqlConnection("Database=ourtool;Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;");
                //打开连接池  
                conn.Open();
                //创建命令对象  
                string Qrystr = "SELECT * FROM WeChatUsers WHERE openId='" + userInfo.openId + "'";
                MySqlCommand cmdQry = new MySqlCommand(Qrystr, conn);
                object obj = cmdQry.ExecuteScalar();
                if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
                {
                    string str = "INSERT  into `ourtool`.`WeChatUsers` (   `OpenId`, `NickName`, `Gender`, `City`, `Province`, `Country`, `AvatarUrl`, `Appid`,  `Memo`, `Counts`,Type,CreateTime ) values('" + userInfo.openId + "','" + userInfo.nickName + "','" + userInfo.gender + "','" + userInfo.city + "','" + userInfo.province + "','" + userInfo.country + "','" + userInfo.avatarUrl + "','" + appid.ToString()+ "','来自资讯小程序','1',2,now())";

                    MySqlCommand cmdUp = new MySqlCommand(str, conn);
                    // 执行操作  
                    try
                    {
                        int row = cmdUp.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        Response.Write(ex.ToString());
                    }
                }
                else
                {
                    //多次访问，记录访问次数counts   更新unionId是预防最初没有，后期关联后却仍未记录  
                    string str = "UPDATE   WeChatUsers SET counts = counts+1,EditeTime=now()  WHERE OpenId='" + userInfo.openId + "'";
                    MySqlCommand cmdUp = new MySqlCommand(str, conn);
                    int row = cmdUp.ExecuteNonQuery();
                }

                //关闭连接池  
                conn.Close();
                #endregion

                //返回解密后的用户数据  
                //Response.Write(result);
            }
            else
            {
                //Response.Write(j);
            }

            return "code:" + code + "|iv:" + iv + "|encryptedData:" + encryptedData + "openId:" + res.openid;
        }


        /// <summary>
        /// 插入表单
        /// </summary>
        /// <returns></returns>
        public string InsertUserForm()
        {
            string openId = "";
            string formId = "";
          
            try
            {
                openId = HttpContext.Request.QueryString["openId"].ToString();
                formId = HttpContext.Request.QueryString["formId"].ToString();
              
            }


            catch (Exception ex)
            {
                Response.Write("openId:" + openId + "|formId:" + formId );
            }

           
                #region   插入数据库


                //创建连接池对象（与数据库服务器进行连接）  
                MySqlConnection conn = new MySqlConnection("Database=ourtool;Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;");
                //打开连接池  
                conn.Open();

            string query0 = "SELECT count(1) FROM FormInfo WHERE openId='" + openId + "'";
            MySqlCommand cmdQry0 = new MySqlCommand(query0, conn);
            object obj0 = cmdQry0.ExecuteScalar();
            if (Convert.ToInt32(obj0)<1)
            {
                //创建命令对象  
                List<MySqlParameter> listParameters = new List<MySqlParameter>();
                string Qrystr =
                    "INSERT INTO `ourtool`.`FormInfo` (  `OpenId`, `FormId`, `CreateTime`, `EditeTime`, `Type` ) VALUES ( @OpenId, @FormId, now(), now(), 2 ) ; ";

                //listParameters.Add(new MySqlParameter("@OpenId",openId));
                //listParameters.Add(new MySqlParameter("@FormId", formId));
               
                 MySqlCommand cmdQry = new MySqlCommand(Qrystr, conn);//listParameters
                using (cmdQry)
                {
                    cmdQry.Parameters.Add(new MySqlParameter("@OpenId", openId));
                    cmdQry.Parameters.Add(new MySqlParameter("@FormId", formId));
                    try
                    {
                        object obj = cmdQry.ExecuteScalar();
                    }
                    catch (Exception ex)
                    {

                       // ex.Message;
                    }
                  
                }
              


            }
            else
            {
               
                //多次访问，记录访问次数counts   更新unionId是预防最初没有，后期关联后却仍未记录  
                string str = " UPDATE   `FormInfo` SET     `FormId` = @FormId, `EditeTime` = now() WHERE `OpenId` = @OpenId;";
                MySqlCommand cmdUp = new MySqlCommand(str, conn);
                try
                {
                    cmdUp.Parameters.Add(new MySqlParameter("@FormId", formId));
                    cmdUp.Parameters.Add(new MySqlParameter("@OpenId", openId));

                    int row = cmdUp.ExecuteNonQuery();
                }
                catch (Exception ex)
                {

                    //ex.Message;
                }
               
            }

            //关闭连接池  
            conn.Close();
            #endregion

            //返回解密后的用户数据  
            //Response.Write(result);


            return "openId:" + openId + "|formId:" + formId ;
        }

        /// <summary>
        /// 发音界面
        /// </summary>
        /// <returns></returns>
        public ActionResult Read()
        {
            

            return View();
        }

        /// <summary>
        /// 能够自适应
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadH5()
        {


            return View();
        }




        /// <summary>
        /// 数据库连接
        /// </summary>
        /// <returns></returns>
        public int TestDataCon()
        {

            #region  


            //创建连接池对象（与数据库服务器进行连接）  
            MySqlConnection conn = new MySqlConnection("Database=ourtool;Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;");
            //conn.ConnectionString = "Database=ourtool;Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;";
            //打开连接池  
            conn.Open();
            //创建命令对象  
            string Qrystr = "SELECT * FROM WeChatUsers WHERE openId='" +12 + "'";
            MySqlCommand cmdQry = new MySqlCommand(Qrystr, conn);
            object obj = cmdQry.ExecuteScalar();
            WechatUserInfo userInfo = new WechatUserInfo();
            userInfo.unionId = "12";
            userInfo.openId = "dsds";
            userInfo.nickName = "dsds";
            userInfo.gender = "dsds";
            userInfo.city = "dsds";
            userInfo.province = "dsds";
            userInfo.country = "dsds";
            userInfo.avatarUrl = "dsds";



            userInfo.province = "dsds";

            if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
            {
                string str = "INSERT  into `ourtool`.`WeChatUsers` (  `UnionId`, `OpenId`, `NickName`, `Gender`, `City`, `Province`, `Country`, `AvatarUrl`, `Appid`, `Timestamp`, `Memo`, `Counts` ) values('" + userInfo.unionId + "','" + userInfo.openId + "','" + userInfo.nickName + "','" + userInfo.gender + "','" + userInfo.city + "','" + userInfo.province + "','" + userInfo.country + "','" + userInfo.avatarUrl + "','" +"dsdsd" + "','" + "888" + "','来自微信小程序','1')";

                MySqlCommand cmdUp = new MySqlCommand(str, conn);
                // 执行操作  
                try
                {
                    int row = cmdUp.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    Response.Write(ex.ToString());
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


            return 1;

        }


        //测试转换
        public string TestTran()
        {
            GetUsersHelper.AesIV = "Lcpj9wNElgK9vuPXb9XmdQ==";
            GetUsersHelper.AesKey= "fQzhx8pyE7aqY1HwVZRL8A==";
          

            string result = GetUsersHelper.AESDecrypt("rk1fT8fL5uWHlvIFQAryrymM4jIbiaXdBy8lJ7Pt1vcVKumkq3b4K4TLWhPUxld/nE1bs/nasTp/QcyuJHFNKJibEcMkfOtTXoXXOK/FRIsLiEltIKUDWHfSHhDt24arWCWXBkqosEzVTH6BA3Dh6AEqjaAV+q9z+ho7KNZ471neNOFiZ1Y2ds3qwxx3eL8OhCkGelfwA9wVXs2d8sxy8lOwCUfK8Pi9PcIZnr2DPcXIhgfCFDl7bJNX668o4vEJlusQ7MUtvQRf6kHWVgNXzD16buCTynDCwY763jmrud4lYoQ/tzO6SK2o2WvOCsaY+ZiQDW8ACvIbfBeS9H53ftAbWw4W/2GOoC1o6BlGYmvj8p8/RllEahYROUIBLF7CWVyZVCYuy5yb2N7wY9ngxrjeg7Q8xBU07Lekk4sxdbiYZFBgFW2AgEJNcTyaY8nbHZKG1n00pMpTfkdsg7TdrQ==");


            return result;
        }





        /// <summary>
        /// 调用其他接口返回数据
        /// </summary>
        /// <returns></returns>
        public JsonResult GetStockData()
        {
            JsonResult  json=new JsonResult() {JsonRequestBehavior = JsonRequestBehavior.AllowGet};
            string obj = Request["code"]??"";
            if (string.IsNullOrEmpty(obj))
            {

                json.Data = "1=1";
                return json;
            }

            string url = string.Format("http://hq.sinajs.cn/list={0}", obj);
            string type = "gb2312";
            GetUsersHelper GetUsersHelper = new GetUsersHelper();
            string j = GetUsersHelper.GetUrltoHtml(url, type);//获取微信服务器返回字符串  
            json.Data = j;
            return json;

        }




    }
}