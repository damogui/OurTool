using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using OurToolModel;

namespace OurTool.App_Start
{
    /// <summary>
    /// 系统属性
    /// </summary>
    public class BaseConfig
    {

        /// <summary>
        /// 加密字符串
        /// </summary>
        public static string WordKey
        {
            get { return ConfigurationManager.AppSettings["wordKey"]; }
        }


        /// <summary>
        /// JsUrl
        /// </summary>
        public static string JsUrl
        {
            get { return ConfigurationManager.AppSettings["JsUrl"]; }
        }

        /// <summary>
        /// CSS
        /// </summary>
        public static string CssUrl
        {
            get { return ConfigurationManager.AppSettings["CssUrl"]; }
        }

        /// <summary>
        /// IMG
        /// </summary>
        public static string ImgUrl
        {
            get { return ConfigurationManager.AppSettings["ImgUrl"]; }
        }
        /// <summary>
        /// WebScoket
        /// </summary>
        public static string WebSocketUrl
        {
            get { return ConfigurationManager.AppSettings["WebSocketUrl"]; }
        }

        /// <summary>
        /// Token
        /// </summary>
        public static string Token
        {
            get { return @"word-token"; }
        }

        /// <summary>
        /// 客户端IP
        /// </summary>
        public static string LocalIP
        {
            get
            {
                return HttpContext.Current.Request.Headers.Get("X-Real-IP") ?? (HttpContext.Current.Request.UserHostAddress ?? string.Empty);
            }
        }

        /// <summary>
        /// 匿名访问的页面
        /// </summary>
        public static List<MenuPage> DefaultPage
        {
            get
            {
                return Page("DefaultPage.xml");
            }
        }

        /// <summary>
        /// MFG后台页面
        /// </summary>
        public static List<MenuPage> MfgPage
        {
            get
            {
                return Page("MfgPage.xml");
            }
        }

        /// <summary>
        /// Org后台页面
        /// </summary>
        public static List<MenuPage> OrgPage
        {
            get
            {
                return Page("OrgPage.xml");
            }
        }

        /// <summary>
        /// 老师后台页面
        /// </summary>
        public static List<MenuPage> TeacherPage
        {
            get
            {
                return Page("TeacherPage.xml");
            }
        }

        /// <summary>
        /// 学生后台页面
        /// </summary>
        public static List<MenuPage> StudentPage
        {
            get
            {
                return Page("StudentPage.xml");
            }
        }

        /// <summary>
        /// 家长端
        /// </summary>
        public static List<MenuPage> ParentPage
        {
            get
            {
                return Page("ParentPage.xml");
            }
        }

        /// <summary>
        /// 公共包
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        private static List<MenuPage> Page(string xml)
        {
            var list = new List<MenuPage>();
            var xd = XDocument.Load(string.Format(HttpContext.Current.Server.MapPath(@"~/App_Data/{0}"), xml));
            if (xd != null)
            {
                foreach (var item in xd.Root.Descendants("Page"))
                {
                    list.Add(new MenuPage() { Url = item.Attribute("url").Value.ToLower(), isPage = item.Attribute("isPage").Value });
                }
            }
            return list;
        }

    }
}