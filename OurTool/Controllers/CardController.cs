using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurToolBll.News;

namespace OurTool.Controllers
{
    public class CardController : BaseController
    {
        NewsBll newsBll = new NewsBll();
        // GET: Card
        public ActionResult Index()
        {
            ViewBag.config = GetWchatConfig();

            return View();
          
        }
        /// <summary>
        /// 插入用户信息
        /// </summary>
        /// <returns></returns>
        public JsonResult InsertLoctInfo()
        {
            JsonResult  jsonResult=new JsonResult();
            string locInfo = Request["locInfo"]??"";
            locInfo = Server.UrlDecode(locInfo);
            if (locInfo.IndexOf('-')==-1)
            {
                return null;
            }
            jsonResult.Data = newsBll.InsertLoctInfo(locInfo);
            return jsonResult;


        }
    }
}