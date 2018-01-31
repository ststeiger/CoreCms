
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration;


namespace CoreCMS
{


    [HandlerPath("/test")]
    public class TestHtml
    {
        private readonly RequestDelegate _next;

        public TestHtml(RequestDelegate next)
        {
            _next = next;
        } // End Constructor 
        

        // https://stackoverflow.com/questions/40897781/why-middleware-in-asp-net-core-requires-specific-semantics-but-not-an-interface
        public async Task Invoke(HttpContext context)
        {
            context.Response.ContentType = "text/html; charset=utf-8";

            CoreDb.ReadDAL readDAL = (CoreDb.ReadDAL)context.RequestServices.GetService(
                typeof(CoreDb.ReadDAL)
            );


            await context.Response.WriteAsync(Portal.Visualiser.LegendGenerator.Test(readDAL));
        } // End Task Invoke 


    } // End Class TestHtml 


} // End namespace CoreCMS 
