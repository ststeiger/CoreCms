
using Microsoft.AspNetCore.Http;


namespace CoreCMS
{
    
    
    public class DataTableHelper
    {
        
        
        
        public static void Serialize(System.IO.TextWriter tw, object value)
        {
            // if(value == null)
            System.Type type = value.GetType();
            
            Newtonsoft.Json.JsonSerializer json = new Newtonsoft.Json.JsonSerializer();
            
            json.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
            
            json.ObjectCreationHandling = Newtonsoft.Json.ObjectCreationHandling.Replace;
            json.MissingMemberHandling = Newtonsoft.Json.MissingMemberHandling.Ignore;
            json.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            
            if (type == typeof(System.Data.DataRow))
                json.Converters.Add(new DataRowConverter());
            else if (type == typeof(System.Data.DataTable))
                json.Converters.Add(new DataTableConverter());
            else if (type == typeof(System.Data.DataSet))
                json.Converters.Add(new DataSetConverter());
            
            
            using (Newtonsoft.Json.JsonTextWriter writer = new Newtonsoft.Json.JsonTextWriter(tw))
            {
                // if (this.FormatJsonOutput)
#if DEBUG
                writer.Formatting = Newtonsoft.Json.Formatting.Indented;
#else
                writer.Formatting = Newtonsoft.Json.Formatting.None;
#endif
                
                writer.QuoteChar = '"';
                json.Serialize(writer, value);
                
                writer.Flush();
                tw.Flush();
                
                tw.Close();
                writer.Close();
            } // End Using writer 
            
        } // End Sub Serialize 
        
        
        public static void Serialize(HttpContext context, object value)
        {
            using (System.IO.TextWriter sw =
                new System.IO.StreamWriter(
                    context.Response.Body, System.Text.Encoding.UTF8)
            )
            {
                Serialize(sw, value);
            }
        }
        
        
        public static void WriteJSON(HttpContext context, string value)
        {
            using (System.IO.TextWriter sw =
                new System.IO.StreamWriter(
                    context.Response.Body, System.Text.Encoding.UTF8)
            )
            {
                sw.Write(value);
            }
        }
        
        
        public static string Serialize(object value)
        {
            if (value == null)
                return Newtonsoft.Json.JsonConvert.SerializeObject(null);
            
            string res = null;
            
            using (System.IO.StringWriter sw = new System.IO.StringWriter())
            {
                Serialize(sw, value);
                res = sw.ToString();
            }
            
            return res;
        } // End Function Serialize 
        
        
    }
    
    
}
