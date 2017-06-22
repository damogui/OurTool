using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OurWechatSdkCore;

namespace OurTool.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string appId = System.Configuration.ConfigurationManager.AppSettings["WeChatAppId"];
            string appSecret = System.Configuration.ConfigurationManager.AppSettings["WeChatAppSecret"];
            bool debug = System.Configuration.ConfigurationManager.AppSettings["WeChatJsDebug"].ToLower() == "true";
            JSSDK sdk = new JSSDK(appId, appSecret, debug);
            SignPackage config = sdk.GetSignPackage(JsApiEnum.scanQRCode |JsApiEnum.onMenuShareAppMessage | JsApiEnum.onMenuShareQQ| JsApiEnum.onMenuShareTimeline);
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            config.jsApiList=new string[] { "checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "onVoicePlayEnd", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard" };
            ViewBag.config = serializer.Serialize(config);

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