using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OurTool.Areas.Our.Controllers
{
    public class OurController : Controller
    {
        // GET: Our/Our
        /// <summary>
        /// our666
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 广告服务
        /// </summary>
        /// <returns></returns>
        public ActionResult AdIndex()
        {
            return View();
        }
        /// <summary>
        /// 网站留言
        /// </summary>
        /// <returns></returns>
        public ActionResult WebMessage()
        {
            return View();
        }

        /// <summary>
        ///  联系我们
        /// </summary>
        /// <returns></returns>
        public ActionResult ContactUs()
        {
            return View();
        }
    }
}