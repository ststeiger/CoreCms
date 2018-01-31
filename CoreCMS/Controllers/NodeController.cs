
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using System.Dynamic;


// For more information on enabling MVC for empty projects, 
// visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreCMS.Controllers
{
    
    
    // https://geeks.ms/clanderas/2016/10/18/asp-net-core-node-services-to-execute-your-nodejs-scripts/
    // https://openlearningportal.gitbooks.io/all-about-asp-net-core/content/run_your_first_net_core_console_application.html
    // http://josephwoodward.co.uk/2016/09/executing-javascript-inside-dot-net-core-using-javascript-services

    // https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.NodeServices#for-non-aspnet-apps
    // https://github.com/aspnet/JavaScriptServices
    // https://andrewlock.net/using-dependency-injection-in-a-net-core-console-application/
    public class NodeController : Controller
    {
        private readonly INodeServices nodeServices;
        
        public NodeController(INodeServices nodeServices)
        {
            this.nodeServices = nodeServices;
        }


        // e.g. http://localhost:58343/123
        // e.g. http://localhost:51003/123
        [HttpGet, Route("{page:int}", Order = 99999)]
        public async Task<ActionResult> Get(int page)
        {
            
            try
            {
                string host = HttpContext.Request.Scheme + "://" + Request.Host.Value;

                dynamic postResult = await nodeServices.InvokeAsync<ExpandoObject>(
                    "./Node/postClient", host, page);
                return Json(postResult);
            }
            catch (System.Exception ex)
            {
                return BadRequest();
            }
        }


        public class AgeInfo
        {

            public string age;
            public int population;
            
            public AgeInfo(string prmAge, int prmPop)
            {
                this.age = prmAge;
                this.population = prmPop;
            }

        }


        // http://gunnarpeipman.com/2017/10/aspnet-core-node-d3js/
        public async Task<IActionResult> Chart([FromServices] INodeServices nodeServices)
        {
            var options = new { width = 400, height = 200 };
            
            var data = new[] {
                new { label = "Abulia", count = 10 },
                new { label = "Betelgeuse", count = 20 },
                new { label = "Cantaloupe", count = 30 },
                new { label = "Dijkstra", count = 40 }
            };
            
            List<AgeInfo> ls = new List<AgeInfo>();
            ls.Add( new AgeInfo("<5", 2704659));
            ls.Add( new AgeInfo("5-13", 4499890));
            ls.Add( new AgeInfo("14-17", 2159981));
            ls.Add( new AgeInfo("18-24", 3853788));
            ls.Add( new AgeInfo("25-44", 14106543));
            ls.Add( new AgeInfo("45-64", 8819342));
            ls.Add( new AgeInfo("≥65", 612463));
            
            
            // string markup = await nodeServices.InvokeAsync<string>("Node/d3Pie.js", options, data);
            
            string markup = await nodeServices.InvokeAsync<string>("Node/d3chart.js", options, ls);
            
            string html = @"<!DOCTYPE html>
<html>
<head><meta charset=""utf-8"" />

<style type=""text/css"">

.arc text 
{
  font: 10px sans-serif;
  text-anchor: middle;
}

.arc path 
{
  stroke: #fff;
}
</style>

</head>
<body>
    <img src=""" + markup + @""" />
</body>
</html>";
            
            return Content(html, "text/html");
        }


        public async Task<IActionResult> MediaWikiToHtml()
        {
            try
            {
                int page = 123;
                string host = HttpContext.Request.Scheme + "://" + Request.Host.Value;

                string html = await nodeServices.InvokeAsync<string>(
                    "./Node/parsee", host, page);

                // return Content(html, "text/html");
                return Content(html, "text/plain");
            }
            catch (System.Exception ex)
            {
                throw;
                // return BadRequest();
            }
        }
        
        
        public async Task<IActionResult> Version()
        {
            try
            {
                string html = await nodeServices.InvokeAsync<string>("./Node/nodeVersion");

                // return Content(html, "text/html");
                return Content(html, "text/plain");
            }
            catch (System.Exception)
            {
                // return BadRequest();
                throw;
            }
        }


        public async Task<IActionResult> About([FromServices] INodeServices nodeServices)
        {
            var options = new {
                  width = 400
                , height = 200
                , showArea = true
                , showPoint = true
                , fullWidth = true
            };
            
            var data = new
            {
                    labels = new[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" },
                    series = new[] {
                        new[] { 1, 5, 2, 5, 4, 3 },
                        new[] { 2, 3, 4, 8, 1, 2 },
                        new[] { 5, 4, 3, 2, 1, 0 }
                    }
            };
            
            string markup = await nodeServices.InvokeAsync<string>("Node/testChartist.js"
                , "line", options, data
            );


            string html = @"<!DOCTYPE html>
<html>
<head><meta charset=""utf-8"" />

<style type=""text/css"">

.arc text 
{
  font: 10px sans-serif;
  text-anchor: middle;
}

.arc path 
{
  stroke: #fff;
}
</style>

</head>
<body>
    " + markup + @"
</body>
</html>";


            return Content(html, "text/html");
        }
        
        
    }
    
    
}
