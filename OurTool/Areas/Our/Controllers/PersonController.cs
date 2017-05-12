using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurToolBll.UserBll;
using OurToolModel;

namespace OurTool.Areas.Our.Controllers
{
    public class PersonController : Controller
    {


        UserBll userBll = new UserBll();
        // GET: Our/Person
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// 获取人员列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetUserList()
        {
            List<OurUser> listUser = userBll.GetUserList(3);
            JsonResult json = new JsonResult { Data = listUser };
            json.JsonRequestBehavior=JsonRequestBehavior.AllowGet;
            return json;

        }

    }
}