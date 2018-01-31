
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration;


namespace CoreCMS
{


    [HandlerPath("/lol", "GET,POST")]
    public class JsonHandlerMiddleware
    {
        private readonly RequestDelegate m_next;

        public JsonHandlerMiddleware(RequestDelegate next)
        {
            m_next = next;
        }


        public class ExampleData
        {
            public string a = "aaaa";
            public string b = "bbbb";
        }

        // https://stackoverflow.com/questions/40897781/why-middleware-in-asp-net-core-requires-specific-semantics-but-not-an-interface
        public async Task Invoke(HttpContext context)
        {
            // this will run per each request
            // do your stuff and call next middleware inside the chain.

            // await m_next.Invoke(context);
            // await m_next(context);

            // context.Response.StatusCode = 200;
            // context.Response.ContentType = "application/json";
            context.Response.ContentType = "application/json; charset=utf-8";

            // var exList = new Exception("1", new Exception("2", new Exception("3")));
            // var result = new AjaxResult<ExampleData>(exList, context);
            var result = new AjaxResult<ExampleData>(new ExampleData());
            await result.WriteAsJsonAsync(context);
        } // End TaskInvoke 


    } // End Class JsonHandlerMiddleware 


} // End Namespace CoreCMS 
