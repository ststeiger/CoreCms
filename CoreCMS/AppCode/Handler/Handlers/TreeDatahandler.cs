
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration;



// context.Response.ContentType = "application/json; charset=utf-8";
// context.Response.ContentType = "text/html; charset=utf-8";
// context.Response.ContentType = "text/plain; charset=utf-8";
// context.Response.ContentType = "application/javascript; charset=utf-8";
namespace CoreCMS
{
    
    
    [HandlerPath("/treedata", "GET,POST")]
    public class HelloWorldHandler2
        : HandlerMiddleware<TreeDatahandler> 
    {
        public HelloWorldHandler2() : this(null)
        { }
        
        public HelloWorldHandler2(RequestDelegate next) : base(next)
        { }
        
    }
    
    
    public class TreeDatahandler
        : IHttpHandler
    {
        
        
        bool IHttpHandler.IsReusable
        {
            get { throw new System.NotImplementedException(); }
        }
        
        
        
        void IHttpHandler.ProcessRequest(HttpContext context)
        {
            object parent = context.Request.Query["id"].ToString();

            string contentType = context.Request.Headers["content-type"];
            
            if(string.IsNullOrWhiteSpace((string)parent)
                && "application/x-www-form-urlencoded".Equals(contentType,
                    System.StringComparison.InvariantCultureIgnoreCase))
                {
                    if(context.Request.Form != null)
                        parent = context.Request.Form["id"].ToString();
            
                }
            
            if("null".Equals((string)parent, System.StringComparison.OrdinalIgnoreCase) || string.IsNullOrWhiteSpace((string)parent))
                parent = System.DBNull.Value;


            string sql = @"
-- DECLARE  @__in_parent varchar(36)  
-- SET @__in_parent = 'F0000000-E000-0000-0000-000000000002'
-- -- SET @__in_parent =  'BEB6CD1D-5ACB-4FB1-93F4-A3F07A053DB7'
-- SET @__in_parent = NULL 

SELECT 
T_FMS_Navigation.NA_UID AS id 
    ,T_FMS_Navigation.NA_NA_UID AS parent 
    ,T_FMS_Translation.FT_DE AS text 
    --,T_FMS_Navigation.NA_Sort 

    ,CASE 
    WHEN EXISTS
(
    SELECT * 
    FROM T_FMS_Navigation AS Children 
    WHERE Children.NA_Status = 1 
AND Children.NA_NA_UID = T_FMS_Navigation.NA_UID 
    ) 
THEN 1 
ELSE 0 
END AS hasChildren 
    FROM T_FMS_Navigation 
    LEFT JOIN T_FMS_Translation ON T_FMS_Translation.FT_UID = T_FMS_Navigation.NA_FT_UID 
WHERE T_FMS_Navigation.NA_Status = 1 
AND 
(
    NA_NA_UID = @__in_parent 
OR 
(
    @__in_parent IS NULL 
AND 
    NA_NA_UID IS NULL 
    )
    )

ORDER BY 
-- T_FMS_Navigation.NA_Sort,
text 
";

            CoreDb.ReadDAL readDAL = (CoreDb.ReadDAL)context.RequestServices.GetService(
                typeof(CoreDb.ReadDAL)
            );


            using (System.Data.Common.DbCommand cmd = readDAL.CreateCommand(sql))
            {
             
                System.Data.Common.DbParameter param = cmd.CreateParameter();

                param.ParameterName = "__in_parent";
                param.DbType = System.Data.DbType.AnsiString;
                param.Size = 36;
                param.Value = parent;
                
                cmd.Parameters.Add(param);
                
                using (System.Data.DataTable dt = readDAL.GetDataTable(cmd))
                {

                    // https://stackoverflow.com/questions/17154967/is-content-encoding-being-set-to-utf-8-invalid
                    // context.Response.Headers["content-encoding"] = "utf-8";
                    // context.Response.ContentType = "text/plain; charset=utf-8";
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    context.Response.ContentType = "application/json; charset=utf-8";
                    DataTableHelper.Serialize(context, dt);                    
                } // End Using dt 
                
            } // End Using cmd 
            
        } // End Sub ProcessRequest
        
        
    } // End Class 
    
    
} // End Namespace 
