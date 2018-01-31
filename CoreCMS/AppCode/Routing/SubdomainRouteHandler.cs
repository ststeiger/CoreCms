
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Internal;


namespace CoreCMS.Routing
{



    // https://stackoverflow.com/questions/40512403/area-and-subdomain-routing
    // https://blog.maartenballiauw.be/post/2009/05/20/aspnet-mvc-domain-routing.html
    // http://benjii.me/2015/02/subdomain-routing-in-asp-net-mvc/
    public class SubdomainRouteHandler : IRouter
    {

        MvcRouteHandler m_routeHandler;


        public SubdomainRouteHandler(IApplicationBuilder app)
        {
            System.Console.WriteLine("in the ctors");

            this.m_routeHandler = app.ApplicationServices.
               GetRequiredService<MvcRouteHandler>();
        }

        // https://stackoverflow.com/questions/278668/is-it-possible-to-make-an-asp-net-mvc-route-based-on-a-subdomain
        VirtualPathData IRouter.GetVirtualPath(VirtualPathContext context)
        {
            if (context.HttpContext.Request.Host != null
                && context.HttpContext.Request.Host.HasValue)
            {
                string subd = context.HttpContext.Request.Host.Value;
                context.Values["subdomain"] = subd;
            }

            return this.m_routeHandler.GetVirtualPath(context);
        }

        Task IRouter.RouteAsync(RouteContext context)
        {
            /*
            string url = context.HttpContext.Request.Headers["HOST"];
            string[] splittedUrl = url.Split('.');
            if (splittedUrl.Length > 0 && splittedUrl[0] == "admin")
            {
                context.RouteData.Values.Add("subdomain", "Admin");
            }
            */
            if (context.HttpContext.Request.Host != null && context.HttpContext.Request.Host.HasValue)
            {
                context.RouteData.Values.Add("subdomain", context.HttpContext.Request.Host.Value);
            }

            return this.m_routeHandler.RouteAsync(context);
        }


    }


}