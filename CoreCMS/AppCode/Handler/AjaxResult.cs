
using System.Collections;
using System.Threading.Tasks;


namespace CoreCMS
{
    
    
    public class AjaxResult<T>
    {
        
        
        private class AjaxException
        {
            [Newtonsoft.Json.JsonProperty("message")]
            public string Message;
            
            [Newtonsoft.Json.JsonProperty("stack")]
            public string Stack;
            
            [Newtonsoft.Json.JsonProperty("source")]
            public string Source;
            
            [Newtonsoft.Json.JsonProperty("helpLink")]
            public string HelpLink;
            
            [Newtonsoft.Json.JsonProperty("hResult")]
            public int HResult;
            
            [Newtonsoft.Json.JsonProperty("longType")]
            public string LongType;
            
            [Newtonsoft.Json.JsonProperty("shortType")]
            public string ShortType;
            
            [Newtonsoft.Json.JsonProperty("data")]
            public IDictionary Data;
            
            [Newtonsoft.Json.JsonProperty("error")]
            public AjaxException Error;


            private AjaxException()
            { }
            
            
            public AjaxException(System.Exception exception)
            {
                // Recursion is bad - create own LIFO-structure and loop 
                System.Collections.Generic.Stack<System.Exception> stack = 
                    new System.Collections.Generic.Stack<System.Exception>();
                System.Exception ex = exception;
                ;
                while (ex != null)
                {
                    stack.Push(ex);
                    ex = ex.InnerException;
                } // Whend 
                
                
                AjaxException thisException = this;
                while (stack.Count > 0)
                {
                    ex = stack.Pop();
                    thisException.Message = ex.Message;
                    thisException.Stack = ex.StackTrace;
                    
                    this.Source = ex.Source;
                    this.HResult = ex.HResult;
                    this.HelpLink = ex.HelpLink;
                    
                    
                    System.Type t = ex.GetType();
                    this.ShortType = t.Name;
                    this.LongType = t.AssemblyQualifiedName;
                    
                    this.Data = ex.Data;
                    
                    
                    if (stack.Count > 0)
                    {
                        thisException.Error = new AjaxException();
                        thisException = thisException.Error;
                    } // End if (stack.Count > 0) 
                    
                } // Whend 
                
            } // End Constructor 
            
        } // End Class AjaxException 
        
        
        [Newtonsoft.Json.JsonProperty("data")] 
        public T Data;

        
        private AjaxException m_Error;
        [Newtonsoft.Json.JsonProperty("error")]
        public object Error
        {
            get { return this.m_Error; }
            set
            {
                if (value != null)
                    this.m_Error = new AjaxException((System.Exception)value);                
            }

        } // End Property Error 



        public AjaxResult()
            : this(default(T), null)
        { }


        public AjaxResult(System.Exception ex)
            : this(default(T), ex)
        { }


        public AjaxResult(T data)
            : this(data, null)
        { }


        public async Task WriteAsJsonAsync(Microsoft.AspNetCore.Http.HttpContext context)
        {
            await WriteAsJson(context);
        } // End Task WriteAsJsonAsync 


        public Task WriteAsJson(Microsoft.AspNetCore.Http.HttpContext context)
        {
            if (context != null && context.Response != null)
            {
                Newtonsoft.Json.JsonSerializer ser = new Newtonsoft.Json.JsonSerializer();

                using (System.IO.TextWriter output = new System.IO.StreamWriter(context.Response.Body))
                {
                    using (Newtonsoft.Json.JsonWriter jsonWriter =
                        new Newtonsoft.Json.JsonTextWriter(output))
                    {
#if DEBUG
                        jsonWriter.Formatting = Newtonsoft.Json.Formatting.Indented;
#endif
                        ser.Serialize(jsonWriter, this);
                    } // End Using jsonWriter 
                } // End using output
            } // End if (c != null && c.Response != null) 
            
            return Task.CompletedTask;
        } // End Task WriteAsJson 


        public AjaxResult(T data, System.Exception ex)
        {
            this.Data = data;
            this.Error = ex;
        } // End Constructor 


    } // End Class AjaxResult<T> 


} // End Namespace CoreCMS 
