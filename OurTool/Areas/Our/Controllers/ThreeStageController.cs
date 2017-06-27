using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OurTool.Areas.Our.Controllers
{
    public class ThreeStageController : Controller
    {
        // GET: Our/ThreeStage
        /// <summary>
        /// 幼儿园
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 小学
        /// </summary>
        /// <returns></returns>
        public ActionResult SmallIndex()
        {
            return View();
        }
        /// <summary>
        /// 初中
        /// </summary>
        /// <returns></returns>
        public ActionResult JuniorIndex()
        {
            return View();
        }
       /// <summary>
       /// 高中
       /// </summary>
       /// <returns></returns>
        public ActionResult SeniorIndex()
        {
            return View();
        }
    }
}