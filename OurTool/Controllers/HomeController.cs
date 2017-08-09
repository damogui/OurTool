using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurToolBll.News;
using OurToolModel.News;
using OurWechatSdkCore;

namespace OurTool.Controllers
{
    public class HomeController : BaseController
    {
        NewsBll newsBll=new NewsBll();
        public ActionResult Index()
        {
            ViewBag.config = GetWchatConfig();
            string news = newsBll.GetNewsList();
            ViewBag.News = news;
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

        /// <summary>
        /// 生成签名串
        /// </summary>
        /// <returns></returns>
        public string GetSignStr()
        {

           
            string signature = Request["signature"];
            string echostr = Request["echostr"];//返回的随机字符串
          

            string timestamp = Request["timestamp"];
            string nonce = Request["nonce"];
            string token = "our666";


            Dictionary<string, string> signData = new Dictionary<string, string>() {
                 {"timestamp",timestamp},
                 {"nonce",nonce},
                 {"token",token}
               
             };

            string signatureMy = new Signature().Sign(signData);//获取的签名
            //signature应该和signatureMy相等

            return echostr;
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