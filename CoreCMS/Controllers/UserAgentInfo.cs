
using System;


namespace CoreCMS
{
    
    
    public class UserAgentInfo
    {
        public string UserAgent;
        protected string UA;
        
        public string Family;
        public string Main;
        public string Exact;
        public string Gecko;

        
        public UserAgentInfo(Microsoft.AspNetCore.Http.HttpContext context)
        :this(context.Request.Headers["User-Agent"].ToString())
        { }
        
        
        public UserAgentInfo(string ua)
        {
            this.UserAgent = ua;
            
            if (string.IsNullOrEmpty(ua))
                return;
            
            this.UA = ua.ToLowerInvariant();
            AnalizeAgent();
        } // End Constructor  
        
        
        private static UserAgentInfo ExtractVersion(UserAgentInfo ver
            , string family
            , string brow)
        {
            ver.Family = family;

            // Chrome/([\d\.])+


            if (brow == "msie")
            {
                brow = " " + brow + " ";
            }
            else
            {
                if (brow == "opr")
                {
                    ver.UA = ver.UA.Replace("opera/", "opr/");
                }

                brow += "/";
            }
            
            int pos = ver.UA.IndexOf(brow, StringComparison.Ordinal);
            if (pos != -1)
            {
                pos += brow.Length;
                int i = pos;
                while (i < ver.UA.Length)
                {
                    if (ver.UA[i] != '.')
                    {
                        if (ver.UA[i] == ' '
                            || (ver.UA[i] < '0' || ver.UA[i] > '9'))
                            break;
                    } // End if (ver.UA[i] != '.')
                    
                    ++i;
                } // Whend 
                
                string exact = ver.UA.Substring(pos, i - pos);
                
                for (i = 0; i < exact.Length; ++i)
                {
                    if (exact[i] == '.')
                        break;
                } // Next i 
                
                string main = exact.Substring(0, i);
                
                ver.Main = main;
                ver.Exact = exact;
            } // End if (pos != -1)
            
            
            if (string.Equals(ver.Family, "Firefox", StringComparison.Ordinal))
            {
                pos = ver.UA.IndexOf("gecko/", StringComparison.Ordinal);
                if (pos != -1)
                {
                    pos += "gecko/".Length;
                    int i = pos;
                    while (i < ver.UA.Length)
                    {
                        if (ver.UA[i] != '.')
                        {
                            if (ver.UA[i] == ' '
                                || (ver.UA[i] < '0' || ver.UA[i] > '9'))
                                break;
                        } // End if (ver.UA[i] != '.') 
                        
                        ++i;
                    } // Whend 
                    
                    string exact = ver.UA.Substring(pos, i - pos);
                    ver.Gecko = exact;
                } // End if (pos != -1)
                
            } // End if (string.Equals(ver.Family, "Firefox", StringComparison.Ordinal))
            
            return ver;
        } // End Function ExtractVersion 
        
        
        protected void AnalizeAgent()
        {
            if (this.UA.IndexOf("edge/", StringComparison.Ordinal) != -1)
            {
                ExtractVersion(this, "Edge", "edge");
            }
            else if (this.UA.IndexOf(" msie ", StringComparison.Ordinal) != -1) // 4-10
            {
                ExtractVersion(this, "IE", "msie");
            }
            else if (this.UA.IndexOf("trident/", StringComparison.Ordinal) != -1) // IE11
            {
                this.Family = "IE";
                this.Main = "11";
                this.Exact = "11.0";
            }
            else if (this.UA.IndexOf("bingbot/", StringComparison.Ordinal) != -1) // IE11
            {
                ExtractVersion(this, "BingBot", "bingbot");
            }
            else if (this.UA.IndexOf("opera", StringComparison.Ordinal) != -1
                     || this.UA.IndexOf("opr/", StringComparison.Ordinal) != -1
                     || this.UA.IndexOf("presto", StringComparison.Ordinal) != -1) // chrome
            {
                ExtractVersion(this, "Opera", "opr");
            }
            else if (this.UA.IndexOf("chrome/", StringComparison.Ordinal) != -1
                     && this.UA.IndexOf("chromium/", StringComparison.Ordinal) != -1) // Chromium
            {
                ExtractVersion(this, "Chromium", "chrome");
            }
            else if (this.UA.IndexOf("chrome/", StringComparison.Ordinal) != -1) // Chrome
            {
                ExtractVersion(this, "Chrome", "chrome");
            }
            else if (this.UA.IndexOf("safari/", StringComparison.Ordinal) != -1) // Safari
            {
                ExtractVersion(this, "Safari", "safari");
            }
            else if (this.UA.IndexOf("firefox/", StringComparison.Ordinal) != -1
                     || this.UA.IndexOf("gecko/", StringComparison.Ordinal) != -1) // Firefox & derivates
            {
                ExtractVersion(this, "Firefox", "firefox");
            }
            else if (this.UA.IndexOf("khtml", StringComparison.Ordinal) != -1
                     || this.UA.IndexOf("applewebkit/", StringComparison.Ordinal) != -1) // khtml
            {
                this.Family = "Chrome-Like"; // 11
            }
            else if (this.UA.IndexOf("like gecko", StringComparison.Ordinal) != -1) // Gecko Engine
            {
                this.Family = "Firefox-Like"; // 11
            }
            
        } // End Sub AnalizeAgent 
        
        
    } // End Class UserAgentInfo 
    
    
} // End Namespace CoreCMS 
