
using Microsoft.AspNetCore.Http;


namespace CoreCMS
{
    
    
    // string json = Newtonsoft.Json.JsonConvert.SerializeObject(result, Formatting.Indented);
    // byte[] buffer = System.Text.Encoding.UTF8.GetBytes(json);
    // context.Response.Body.Write(buffer, 0, buffer.Length);
    public class JsonHelper
    {
        
        
        public static System.Threading.Tasks.Task WriteAsJson
            (Microsoft.AspNetCore.Http.HttpContext context, object data)
        {
            Newtonsoft.Json.JsonSerializer ser = new Newtonsoft.Json.JsonSerializer();
            
            using (System.IO.TextWriter output = new System.IO.StreamWriter(context.Response.Body, System.Text.Encoding.UTF8))
            {
                using (Newtonsoft.Json.JsonWriter jsonWriter =
                    new Newtonsoft.Json.JsonTextWriter(output))
                {
#if DEBUG
                    jsonWriter.Formatting = Newtonsoft.Json.Formatting.Indented;
#endif
                    ser.Serialize(jsonWriter, data);
                } // End Using jsonWriter 
            } // End using output

            return System.Threading.Tasks.Task.CompletedTask;
        }
        
        
        public static void SerializeObject(System.IO.Stream strm, object value, bool pretty)
        {
            Newtonsoft.Json.JsonSerializer ser = new Newtonsoft.Json.JsonSerializer();
            
            using (System.IO.TextWriter sw = 
                new System.IO.StreamWriter(strm, System.Text.Encoding.UTF8)
            )
            {
                using (Newtonsoft.Json.JsonTextWriter jsonWriter = new Newtonsoft.Json.JsonTextWriter(sw))
                {
                    if (pretty)
                        jsonWriter.Formatting = Newtonsoft.Json.Formatting.Indented;
                    
                    ser.Serialize(jsonWriter, value);
                    jsonWriter.Flush();
                } // End Using jsonWriter 
                
                sw.Flush();
            } // End Using sw 
            
        } // End Sub SerializeObject 
        
        
        public static void SerializeObject(System.IO.Stream strm, object value)
        {
            SerializeObject(strm, value, false);
        } // End Sub SerializeObject 
        
        
        public static void SerializeObject(HttpContext context, object value, bool pretty)
        {
            SerializeObject(context.Response.Body, value);
        } // End Sub SerializeObject 
        
        
        public static void SerializeObject(HttpContext context, object value)
        {
            SerializeObject(context, value, false);
        } // End Sub SerializeObject 
        
        
    } // End Class 
    
    
} // End Namespace 
