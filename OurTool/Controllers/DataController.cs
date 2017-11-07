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
            string data = HttpContext.Request.QueryString["data"].ToString();//机构id
            int orgId = 0;
            int.TryParse(data,out orgId);
            if (orgId == 0)
            {
                return "";
            }

            try
            {
                openId = HttpContext.Request.QueryString["openId"].ToString();
                formId = HttpContext.Request.QueryString["formId"].ToString();
              



                SendSmall sendSmall =new SendSmall();
                sendSmall.OpenId = openId;
                sendSmall.FormId = formId;
                sendSmall.OrgId = orgId;

                int num=newsBll.PushSmall(sendSmall);
                if (num>0)
                {
                    return "推送成功";
                }
                else
                {
                    return "推送失败";

                }




            }


            catch (Exception ex)
            {
                Response.Write("openId:" + openId + "|formId:" + formId);
            }



            return "openId:" + openId + "|formId:" + formId;
        }
    }
}