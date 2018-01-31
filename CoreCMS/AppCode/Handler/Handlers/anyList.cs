
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration;


namespace CoreCMS
{


    // context.Response.ContentType = "application/json; charset=utf-8";
    // context.Response.ContentType = "text/html; charset=utf-8";
    // context.Response.ContentType = "text/plain; charset=utf-8";
    // context.Response.ContentType = "application/javascript; charset=utf-8";

    
    //[HandlerPath("/anyAssociateArray")]
    [HandlerPath("/ajax/anyList.ashx", "GET,POST")]
    public class AnyList
    : HandlerMiddleware<AnyList>, IHttpHandler
    {
        public AnyList() : base()
        { }

        public AnyList(RequestDelegate next) : base(next)
        { }


        public static string GetParam(HttpContext context, string key)
        {
            string value = null;
            
            if (context.Request.QueryString.HasValue)
            {
                value = context.Request.Query[key];
                if (value != null)
                    return value;
            } // End if (context.Request.QueryString.HasValue) 


            if (context.Request.HasFormContentType)
            {
                if (context.Request.Form != null)
                {
                    value = context.Request.Form[key];
                    if (value != null)
                        return value;
                } // End if (context.Request.Form != null) 

            } // End if ("application/x-www-form-urlencoded" 

            return value;
        } // End Function GetParam 


        // this._params.Add(this.QueryString);
        // this._params.Add(this.Form);
        // this._params.Add(this.Cookies);
        // this._params.Add(this.ServerVariables);
        public static System.Collections.Generic.Dictionary<string, Microsoft.Extensions.Primitives.StringValues>
            GetParameters(HttpContext context)
        {
            System.Collections.Generic.Dictionary<string, Microsoft.Extensions.Primitives.StringValues>
                dict = new System.Collections.Generic.Dictionary
                <string, Microsoft.Extensions.Primitives.StringValues>
                (System.StringComparer.InvariantCultureIgnoreCase);


            // Reverse sequence: last inserted item is prefered item...

            foreach (System.Collections.Generic.KeyValuePair<string
                , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Headers)
            {
                dict[kvp.Key] = kvp.Value;
            } // Next kvp 


            // Missing server-variables
            // Missing cookies

            // Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest dhr;
            // src/Microsoft.AspNetCore.Http/Features/FormFeature.cs
            // return HasApplicationFormContentType(contentType) || HasMultipartFormContentType(contentType);
            // return contentType != null && contentType.MediaType.Equals("application/x-www-form-urlencoded", StringComparison.OrdinalIgnoreCase);
            // if ("application/x-www-form-urlencoded".Equals(context.Request.ContentType, System.StringComparison.InvariantCultureIgnoreCase))

            if (context.Request.HasFormContentType)
            {
                foreach (System.Collections.Generic.KeyValuePair<string
                    , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Form)
                {
                    dict[kvp.Key] = kvp.Value;
                } // Next kvp 
            } // End if (context.Request.HasFormContentType) 

            if (context.Request.QueryString.HasValue)
            {
                foreach (System.Collections.Generic.KeyValuePair<string
                       , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Query)
                {
                    dict[kvp.Key] = kvp.Value;
                } // Next kvp 

            } // End if (context.Request.QueryString.HasValue) 

            return dict;
        } // End Function GetParameters 


        public static void ParametersToCommand(
              HttpContext context
            , System.Data.Common.DbCommand cmd
            , CoreDb.ReadDAL readDAL)
        {
            System.Collections.Generic.Dictionary<string, Microsoft.Extensions.Primitives.StringValues>
                dict = new System.Collections.Generic.Dictionary
                <string, Microsoft.Extensions.Primitives.StringValues>
                (System.StringComparer.InvariantCultureIgnoreCase);

            
            // TODO: Add parameters from PARAMS 
            readDAL.AddParameter(cmd, "BE_ID", 12572);


            foreach (System.Collections.Generic.KeyValuePair<string
                   , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Query)
            {
                readDAL.AddParameter(cmd, kvp.Key, (string)kvp.Value);
            } // Next kvp 


            if (context.Request.HasFormContentType)
            {
                foreach (System.Collections.Generic.KeyValuePair<string
                    , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Form)
                {
                    readDAL.AddParameter(cmd, kvp.Key, (string)kvp.Value);
                } // Next kvp 

            } // End if (context.Request.HasFormContentType) 


            //foreach (System.Collections.Generic.KeyValuePair<string
            //       , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Headers)
            //{
            //    readDAL.AddParameter(cmd, kvp.Key, (string)kvp.Value);
            //}


        } // End Sub ParametersToCommand 


        void IHttpHandler.ProcessRequest(HttpContext context)
        {
            CoreDb.ReadDAL readDAL = (CoreDb.ReadDAL)context.RequestServices.GetService(
                typeof(CoreDb.ReadDAL)
            );

            string sql = GetContentOfEmbeddedFile(GetParam(context, "sql"));
            using (System.Data.Common.DbCommand cmd = readDAL.CreateCommand(sql))
            {
                try
                {
                    ParametersToCommand(context, cmd, readDAL);

                    context.Response.StatusCode = StatusCodes.Status200OK;
                    context.Response.ContentType = "application/json; charset=utf-8";
                    
                    readDAL.SerializeDataTableAsAssociativeJsonArray(cmd, context.Response.Body);
                }
                catch (System.Exception ex)
                {
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    context.Response.WriteAsync(ex.Message, System.Text.Encoding.UTF8).Wait();
                }

            } // End Using cmd 

            // System.Web.HttpUtility.HtmlAttributeEncode(columns[i]) 
            // sb.Append(System.Web.HttpUtility.HtmlEncode(System.Convert.ToString(reader.GetValue(i))));

        } // End Sub ProcessRequest 


        public static string GetContentOfEmbeddedFile(string fileName)
        {
            System.Reflection.Assembly asm = System.Reflection.Assembly.GetExecutingAssembly();
            return GetContentOfEmbeddedFile(fileName, asm);
        } // End Function GetContentOfEmbeddedFile 


        public static string GetContentOfEmbeddedFile(string fileName, System.Reflection.Assembly asm)
        {

            foreach (string thisResouceName in asm.GetManifestResourceNames())
            {
                if (thisResouceName.EndsWith(fileName, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    using (System.IO.Stream strm = asm.GetManifestResourceStream(thisResouceName))
                    {

                        using (System.IO.StreamReader sr = new System.IO.StreamReader(strm))
                        {
                            return sr.ReadToEnd();
                        } // End using sr 

                    } // End Using strm 

                } // End if (thisResouceName.EndsWith(fileName, System.StringComparison.InvariantCultureIgnoreCase)) 

            } // Next thisResouceName 

            throw new System.ArgumentException("No file \""
                + fileName +
                "\" found in embedded resources of assembly \""
                + asm.FullName + "\"");
        } // End Function GetContentOfEmbeddedFile 


        bool IHttpHandler.IsReusable
        {
            get { return false; }
        } // End Property IsReusable 


    } // End Class AnyList 
    
    
} // End Namespace CoreCMS 
