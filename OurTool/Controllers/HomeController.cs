﻿using System;
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
            //string appId = System.Configuration.ConfigurationManager.AppSettings["WeChatAppId"];
            //string appSecret = System.Configuration.ConfigurationManager.AppSettings["WeChatAppSecret"];
            //bool debug = System.Configuration.ConfigurationManager.AppSettings["WeChatJsDebug"].ToLower() == "true";
            //JSSDK sdk = new JSSDK(appId, appSecret, debug);
            //SignPackage config = sdk.GetSignPackage(JsApiEnum.onMenuShareAppMessage | JsApiEnum.scanQRCode | JsApiEnum.onMenuShareQQ | JsApiEnum.onMenuShareTimeline);
            //System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            //config.jsApiList = new string[] { "checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "onVoicePlayEnd", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard" };
            ViewBag.config = GetWchatConfig(); //serializer.Serialize(config);
            //var xx= Request.Url.ToString();//绝对路径

            //ViewBag.Url = xx;
            //ViewBag.Name = config.signature;

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