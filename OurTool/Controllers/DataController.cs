using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using OurToolBll.News;
using OurToolModel.News;
using OurToolModel.Parents;

namespace OurTool.Controllers
{
    public class DataController : Controller
    {

        NewsBll newsBll = new NewsBll();
        // GET: Data
        //public ActionResult Index()
        //{
        //    return View();
        //}
        /// <summary>
        /// 获取列表信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetOrgsList()
        {

            string data = Request["data"] ?? string.Empty;
            SearhOrg serPre = new SearhOrg(); //JsonConvert.DeserializeObject<SearhOrg>(data);
            serPre.KeyWord = Server.UrlDecode(data);
            ManagePara<SearhOrg> paraList = new ManagePara<SearhOrg>();//参数类初始化
            paraList.Para = serPre;
            paraList.PageIndex = Convert.ToInt32(Request["currentPage"] ?? (1).ToString());//接收分页参数
            paraList.PageSize = Convert.ToInt32(Request.Form.Get("pageSize") ?? (10).ToString());
        
            ManageResponse<List<Org>> response = newsBll.GetOrgsList(paraList);
            response.TagValue = paraList.PageIndex.ToString();
            JsonResult json = new JsonResult { Data = response,JsonRequestBehavior = JsonRequestBehavior.AllowGet};
            return json;
           
        }

        /// <summary>
        /// 获取机构详细信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetOrgDetailById()
        {
            string data = Request["data"] ?? string.Empty;
            int orgId = 0;
            int.TryParse(data,out orgId);
            if (orgId==0)
            {
                return null;
            }
            ManageResponse<Org> response = newsBll.GetOrgDetailById(orgId);
//            Org  org = newsBll.GetOrgDetailById(orgId);
            JsonResult json = new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            return json;

        }


        /// <summary>
        /// 进行推送消息
        /// </summary>
        /// <returns></returns>
        public string PushUserForm()
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
                Response.Write("openId:" + openId + "|formId:" + formId);
            }


            #region   插入数据库


            //创建连接池对象（与数据库服务器进行连接）  
            MySqlConnection conn = new MySqlConnection("Database=ourtool;Data Source=101.201.69.84;Port=3306;User=root;Password=qsx123456;CharSet=utf8;Allow User Variables=True;Connect Timeout=300;");
            //打开连接池  
            conn.Open();

            string query0 = "SELECT count(1) FROM FormInfo WHERE openId='" + openId + "'";
            MySqlCommand cmdQry0 = new MySqlCommand(query0, conn);
            object obj0 = cmdQry0.ExecuteScalar();
            if (Convert.ToInt32(obj0) < 1)
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


            return "openId:" + openId + "|formId:" + formId;
        }
    }
}