
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace CoreCMS
{
    
    
    public interface IHttpHandler
    {
        bool IsReusable { get; }
        void ProcessRequest(HttpContext context);
    }
    
    
    public abstract class HandlerMiddleware<T> 
        where T : IHttpHandler
    {
        private readonly RequestDelegate _next;


        public HandlerMiddleware() 
        { }


        public HandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }


        public async Task Invoke(HttpContext context)
        {
            try
            {
                await SyncInvoke(context);
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex.Message);
                throw;
            }

        } // End Task Invoke 


        public Task SyncInvoke(HttpContext context)
        {
            try
            {
                // IHttpHandler handler = (IHttpHandler)this;
                T handler = System.Activator.CreateInstance<T>();
                handler.ProcessRequest(context);
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex.Message);
                throw;
            }
            
            return Task.CompletedTask;
        } // End Task SyncInvoke 


    } // End Abstract Class HandlerMiddleware 
    
    
} // End Namespace CoreCMS 
