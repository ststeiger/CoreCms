
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration;


namespace CoreCMS
{
    
    
    [HandlerPath("/ajax/anyInsert.ashx", "GET,POST")]
    public class anyInsert
        : HandlerMiddleware<anyInsert>, IHttpHandler
    {
        
        public anyInsert() 
            : base()
        { }

        public anyInsert(RequestDelegate next) 
            : base(next)
        { }
        
        void IHttpHandler.ProcessRequest(HttpContext context)
        {
            AjaxResult<string> result = new AjaxResult<string>();
            
            try
            {
                System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>> ls = null;
                ls = CoreCMS.Rest.Insert.Json2List(context.Request.Body);

                CoreDb.WriteDAL writeDAL = (CoreDb.WriteDAL)context.RequestServices.GetService(
                    typeof(CoreDb.WriteDAL)
                );
                
                string sql = AnyList.GetContentOfEmbeddedFile(AnyList.GetParam(context, "sql"));

                using (System.Data.IDbCommand cmd = writeDAL.CreateCommand(sql))
                {
                    writeDAL.InsertList<System.Collections.Generic.Dictionary<string, object>>(cmd, ls,
                        delegate (System.Collections.Generic.Dictionary<string, object> item)
                        {
                            foreach (System.Collections.Generic.KeyValuePair<string, object> kvp in item)
                            {
                                writeDAL.AddParameter(cmd, kvp.Key, kvp.Value);
                            } // Next k 
                        }
                    );
                } // End Using cmd 


                ls.Clear();
                ls = null;
            } // End Try 
            catch (System.Exception ex)
            {
                result.Error = ex;
            } // End Catch 

            context.Response.StatusCode = StatusCodes.Status200OK;
            context.Response.ContentType = "application/json; charset=utf-8";
            
            result.WriteAsJson(context);
        } // End IHttpHandler.ProcessRequest 
        
        
        bool IHttpHandler.IsReusable
        {
            get { return false; }
        } // End Property IsReusable 


    } // End Class anyInsert 


} // End Namespace CoreCMS 
