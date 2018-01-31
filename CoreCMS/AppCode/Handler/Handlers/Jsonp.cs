
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration;


namespace CoreCMS
{

    [HandlerPath("/jsonp")]
    public class JsonpMiddleware
    {
        private readonly RequestDelegate _next;

        public JsonpMiddleware(RequestDelegate next)
        {
            _next = next;
        }



        public class Data
        {
            public string a = "aaaa";
            public string b = "bbbb";
        }


        // https://stackoverflow.com/questions/40897781/why-middleware-in-asp-net-core-requires-specific-semantics-but-not-an-interface
        public async Task Invoke(HttpContext context)
        {
            // this will run per each request
            // do your stuff and call next middleware inside the chain.

            // await _next.Invoke(context);
            // await _next(context);

            // context.Response.StatusCode = 200;
            //   context.Response.ContentType = "​application/javascript";
            context.Response.ContentType = "application/javascript; charset=utf-8";

            string strCallback = context.Request.Query["callback"].ToString();
            if (string.IsNullOrWhiteSpace(strCallback))
                strCallback = "callback";

            string message = System.Web.HttpUtility.JavaScriptStringEncode(
                ReplaceFirst("Callback-function named \"{@callback}\" not defined, or not a function..."
                    , "{@callback}", strCallback)
            );

            //string json = Newtonsoft.Json.JsonConvert.SerializeObject(new Data());

            //string strResult = "typeof " + strCallback + " != 'undefined' ? " 
            //    + strCallback + "(" + json + ") : alert('" + message + "'); " 
            //    + System.Environment.NewLine;

            // await context.Response.WriteAsync(strResult);

            // if (typeof v === "function") {
            // if (typeof v != "undefined") {

            await context.Response.WriteAsync("typeof ");
            await context.Response.WriteAsync(strCallback);
            await context.Response.WriteAsync(" === 'function' ? ");
            await context.Response.WriteAsync(strCallback);
            await context.Response.WriteAsync("(");

            await JsonHelper.WriteAsJson(context, new Data());
            
            await context.Response.WriteAsync(") : alert('");
            await context.Response.WriteAsync(message);
            await context.Response.WriteAsync("'); \n");
        } // End Task Invoke
        
        
        protected static string ReplaceFirst(string text, string search, string replace)
        {
            if (string.IsNullOrWhiteSpace(text))
                return text;
            
            int pos = text.IndexOf(search);
            if (pos < 0)
            {
                return text;
            }
            
            return text.Substring(0, pos) + replace + text.Substring(pos + search.Length);
        } // End Function ReplaceFirst 


    } // End Class JsonpMiddleware 
    
    
} // End Namespace CoreCMS 
