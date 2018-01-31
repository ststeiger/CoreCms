
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration;


namespace CoreCMS
{


    [HandlerPath("/getMarkdown")]
    public class HelloWorldHandler
        : HandlerMiddleware<HelloWorldHandler>, IHttpHandler
    {


        public HelloWorldHandler() : base()
        { }


        public HelloWorldHandler(RequestDelegate next) : base(next)
        { }


        void IHttpHandler.ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain; charset=utf-8";

            using (System.IO.FileStream input = System.IO.File.OpenRead("README.md"))
            {
                byte[] buffer = new byte[32768];
                
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    context.Response.Body.Write (buffer, 0, read);
                } // Whend 
                
            } // End Using input 

            // await context.Response.WriteAsync("Hello World!");
            // string text = System.IO.File.ReadAllText("README.md");
            // byte[] buffer = System.Text.Encoding.UTF8.GetBytes(text);
            // context.Response.Body.Write(buffer, 0, buffer.Length);
        } // End Sub ProcessRequest 


        bool IHttpHandler.IsReusable
        {
            get { return false; }
        } // End Property IsReusable 


    } // End Class HelloWorldHandler 


} // End Namespace CoreCMS 
