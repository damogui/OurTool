using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OurTool.Areas.Our.Controllers
{
    public class CertificationOrgController : Controller
    {
        // GET: Our/CertificationOrg
        /// <summary>
        /// 认证培训机构
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 名校大全
        /// </summary>
        /// <returns></returns>
        public ActionResult SchoolAll()
        {
            return View();
        }
    }
}