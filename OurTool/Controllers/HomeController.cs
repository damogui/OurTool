using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurWechatSdkCore;

namespace OurTool.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
           
            ViewBag.config = GetWchatConfig(); 
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

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
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

    }
}