using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OurTool.Controllers
{
    public class CardController : BaseController
    {
        // GET: Card
        public ActionResult Index()
        {
            ViewBag.config = GetWchatConfig();

            return View();
          
        }
    }
}