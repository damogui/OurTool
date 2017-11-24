using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using OurToolCommon.Http;
using OurToolModel.Credit;

namespace OurTool.Controllers
{
    public class CreditController : Controller
    {
        // GET: Credit
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 获取用户的信用编码
        /// </summary>
        /// <returns></returns>
        public JsonResult GetComCredit()
        {

            string data = Request["data"] ?? string.Empty;

            var str = data;//Console.ReadLine();

            JsonResult jsonResult = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            //string jsonUrl = string.Format("http://www.tianyancha.com/search/suggest.json?key={0}", str);


            string jsonUrl2 = string.Format("http://www.qichacha.com/tax_view?keyno={0}&ajaxflag=1", GetKeNo(str));

            try
            {
               // string json = HttpHelper.RequestJSONFromUrl(jsonUrl);
                //NamaePara<List<ComName>> para = JsonConvert.DeserializeObject<NamaePara<List<ComName>>>(json);
            }
            catch (Exception ex)
            {
                jsonResult.Data = "1"+ex.Message;

                return jsonResult;

                throw ex;
            }

            BasePara<Credit> para2=new BasePara<Credit>();

            try
            {
                string json2 = HttpHelper.RequestJSONFromUrl(jsonUrl2);
                para2 = JsonConvert.DeserializeObject<BasePara<Credit>>(json2);

            }
            catch (Exception ex)
            {

                jsonResult.Data = "2" + ex.Message;

                return jsonResult;
            }



         
         
          
            jsonResult.Data = para2;

            return jsonResult;


        }

        /// <summary>
        /// 根据关键字获取keno
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public  string GetKeNo(string key)
        {
            string jsonUrl3 = string.Format("http://www.qichacha.com/search?key={0}", key);
            string json3 = HttpHelper.RequestJSONFromUrl(jsonUrl3);
            Regex reg = new Regex(@"(?is)<a[^>]*?href=(['""\s]?)(?<href>([^'""\s]*))\.html\1[^>]*?>");
            MatchCollection match = reg.Matches(json3);//json3
            //            MatchCollection mc = reg.Matches(json3);
            var keno = match[0].Groups["href"].Value.Replace("/firm_", "");

            return keno;

        }
    }
}