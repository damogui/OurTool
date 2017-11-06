using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 获取热点新闻
        /// </summary>
        /// <returns></returns>
        public JsonResult GetHotNews()
        {

            string data = Request.Form.Get("data") ?? string.Empty;
            SearhPre serPre = JsonConvert.DeserializeObject<SearhPre>(data);
            serPre.KeyWord = Server.UrlDecode(serPre.KeyWord);
            ManagePara<SearhPre> paraList = new ManagePara<SearhPre>();//参数类初始化
            paraList.Para = serPre;
            paraList.PageIndex = Convert.ToInt32(Request.Form.Get("currentPage") ?? (1).ToString());//接收分页参数
            paraList.PageSize = Convert.ToInt32(Request.Form.Get("pageSize") ?? (10).ToString());
        
            ManageResponse<List<Org>> response = newsBll.GetOrgsList(paraList);
            JsonResult json = new JsonResult { Data = response };
            return json;
            //JsonResult jsonResult = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            //List<Org> listHot = newsBll.GetOrgsList();
            //jsonResult.Data = listHot;

            //return jsonResult;



        }
    }
}