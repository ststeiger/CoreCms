
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreCMS.Models;


namespace CoreCMS.Controllers
{


    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        
        public ContentResult UA()
        {
            UserAgentInfo ua = new UserAgentInfo(this.HttpContext);
            
            // string uaa = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko";
            // UserAgentInfo ua = new UserAgentInfo(uaa);
            
            return Content(ua.Family, "text/plain");
        }
        
        
        public IActionResult About(string subdomain, string controller, string action, string id)
        {
            ViewData["Message"] = "Your application description page.";
            string sd = (string) this.ControllerContext.RouteData.Values["subdomain"];
            System.Console.WriteLine(sd);

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }


}
