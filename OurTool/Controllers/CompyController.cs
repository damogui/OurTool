using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenIdAndSessionKey = OurTool.Wechat.OpenIdAndSessionKey;
using WechatUserInfo = OurTool.Wechat.WechatUserInfo;

namespace OurTool.Controllers
{
    /// <summary>
    /// 公司信息插入
    /// </summary>
    public class CompyController : Controller
    {
        // GET: Compy
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 插入公司名字
        /// </summary>
        /// <returns></returns>
        public int InsertCompanySearch()
        {
            string corpName = "";//名称
            string companyId = "";//id

            corpName = HttpContext.Request.QueryString["corpname"].ToString();
            companyId = HttpContext.Request.QueryString["companyid"].ToString();

          
                #region   插入数据库


                //创建连接池对象（与数据库服务器进行连接）  
                MySqlConnection conn = new MySqlConnection("Database=ourtool;Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;");
                //打开连接池  
                conn.Open();
                //创建命令对象  
                string Qrystr = "SELECT count(1) FROM CompanySearch WHERE CompanyId=@CompanyId";//companyId
                MySqlCommand cmdQry = new MySqlCommand(Qrystr, conn);
              cmdQry.Parameters.Add(new MySqlParameter("@CompanyId", companyId));
                object obj = cmdQry.ExecuteScalar();
                if (Convert.ToInt32(obj.ToString())==0)
                {
                    string str = "INSERT INTO   `CompanySearch` ( `CorpName`, `CompanyId`,CreateTime)  VALUES   (@CorpName,@CompanyId,now()) ;  ";

                    MySqlCommand cmdUp = new MySqlCommand(str, conn);
                cmdUp.Parameters.Add(new MySqlParameter("@CorpName", corpName));
                cmdUp.Parameters.Add(new MySqlParameter("@CompanyId", companyId));

                // 执行操作  
                try
                {
                    int row = cmdUp.ExecuteNonQuery();
                    return row;
                }
                    catch (Exception ex)
                    {
                        Response.Write(ex.ToString());
                    return 0;
                }
                }
                else
                {
                   //更新时间
                    return 0;
                }

                //关闭连接池  
                conn.Close();
                #endregion

                //返回解密后的用户数据  
                //Response.Write(result);
            }


        /// <summary>
        /// 插入公司信息
        /// </summary>
        /// <returns></returns>
        public int InsertCompanyInfo()
        {
            string corpName = "";//名称
            string address = "";//地址
            string creditcode = "";//信用code
            string taxNumber = "";//纳税code
            string phone = "";//名称
            string proxyer = "";//董事长
            string regtime = "";//注册时间
           

            corpName = HttpContext.Request.QueryString["corpname"].ToString();
             address = HttpContext.Request.QueryString["address"].ToString();
            corpName = HttpContext.Request.QueryString["corpname"].ToString();
            creditcode = HttpContext.Request.QueryString["creditcode"].ToString();
            taxNumber = HttpContext.Request.QueryString["taxNumber"].ToString();
            phone = HttpContext.Request.QueryString["phone"].ToString();
            corpName = HttpContext.Request.QueryString["corpname"].ToString();
            proxyer = HttpContext.Request.QueryString["proxyer"].ToString();
            regtime = HttpContext.Request.QueryString["regtime"].ToString();
            

            #region   插入数据库


            //创建连接池对象（与数据库服务器进行连接）  
            MySqlConnection conn = new MySqlConnection("Database=ourtool;Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;");
            //打开连接池  
            conn.Open();
            //创建命令对象  
            string Qrystr = "SELECT count(1) FROM CorpInfo WHERE taxNumber=@taxNumber";//companyId
            MySqlCommand cmdQry = new MySqlCommand(Qrystr, conn);
            cmdQry.Parameters.Add(new MySqlParameter("@taxNumber", taxNumber));
            object obj = cmdQry.ExecuteScalar();
            if (Convert.ToInt32(obj.ToString()) == 0)
            {
                string str = "INSERT INTO `ourtool`.`CorpInfo` ( `corpname`, `address`, `creditcode`, `taxNumber`, `phone`, `proxyer`, `regtime`, `creatime` ) VALUES (  @corpname, @address, @creditcode, @taxNumber, @phone, @proxyer, @regtime, now() ) ;  ";

                MySqlCommand cmdUp = new MySqlCommand(str, conn);
                cmdUp.Parameters.Add(new MySqlParameter("@CorpName", corpName));
                cmdUp.Parameters.Add(new MySqlParameter("@address", address));
                cmdUp.Parameters.Add(new MySqlParameter("@creditcode", creditcode));
                cmdUp.Parameters.Add(new MySqlParameter("@taxNumber", taxNumber));
                cmdUp.Parameters.Add(new MySqlParameter("@phone", phone));
                cmdUp.Parameters.Add(new MySqlParameter("@proxyer", proxyer));
                cmdUp.Parameters.Add(new MySqlParameter("@regtime", regtime));
              

                // 执行操作  
                try
                {
                    int row = cmdUp.ExecuteNonQuery();
                    return row;
                }
                catch (Exception ex)
                {
                    Response.Write(ex.ToString());
                    return 0;
                }
            }
            else
            {
                //更新时间
                return 0;
            }

            //关闭连接池  
            conn.Close();
            #endregion

            //返回解密后的用户数据  
            //Response.Write(result);
        }

    }
}