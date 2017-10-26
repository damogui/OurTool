
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace OurTool
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {

            filters.Add(new OrgAttribute());//请求页面的权限判断
            //filters.Add(new OrgExceptionFilterAttribute());//异常
        }

        /// <summary>
        /// 全局处理
        /// </summary>
        public class OrgAttribute : ActionFilterAttribute
        {
            public override void OnActionExecuting(ActionExecutingContext filterContext)
            {
                filterContext.RequestContext.HttpContext.Response.AppendHeader("Access-Control-Allow-Origin", "*");
                filterContext.RequestContext.HttpContext.Response.AppendHeader("Access-Control-AllowMethods","POST,GET,OPTIONS,DELETE");
                filterContext.RequestContext.HttpContext.Response.AppendHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");//解决跨域的问题
             

                base.OnActionExecuting(filterContext);
            }
        }

    }
}
