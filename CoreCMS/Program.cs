
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;


using CoreCMS.ConfigurationProvider;


namespace CoreCMS
{
    
    
    public class Program
    {
        
        
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        } // End Sub Main 
        
        
        public static IWebHost BuildWebHost(string[] args)
        {
            // http://localhost:5000
            // Error - 4092 EACCES permission denied on WS2012R2 + IIS #193
            // Means port is BUSY - hence adjust in hosting.json
            
            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                .AddJsonFile("hosting.json", true)
                .AddUserSecrets("CoreCMS")
                .AddConfidentialConfiguration()

                // https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio
                //defined in a file called secrets.json which is stored in:
                //Windows: %APPDATA%\microsoft\UserSecrets\\secrets.json
                //Linux: ~/.microsoft/usersecrets//secrets.json
                //Mac: ~/.microsoft/usersecrets//secrets.json

                // In the current version, the values are stored 
                // in a JSON configuration file in the user profile directory:
                // Windows: %APPDATA%\microsoft\UserSecrets\< userSecretsId >\secrets.json
                // Linux: ~/.microsoft/usersecrets/<userSecretsId>/secrets.json
                    // Mac: ~/.microsoft/usersecrets/<userSecretsId>/secrets.json
                // mkdir -p ~/.microsoft/usersecrets/c03bf52a-aada-4216-a61c-ed2c8a8fc1df/
                // gedit ~/.microsoft/usersecrets/c03bf52a-aada-4216-a61c-ed2c8a8fc1df/secrets.json
                
                // The value of userSecretsId comes from the value specified in .csproj file.
                // <UserSecretsId>c03bf52a-aada-4216-a61c-ed2c8a8fc1df</UserSecretsId>

                // You should not write code that depends on the location or format 
                // of the data saved with the Secret Manager tool, 
                // as these implementation details might change. 
                // For example, the secret values are currently not encrypted 
                // today, but could be someday.
                
                // C:\Users\<UserName>\AppData\Roaming\Microsoft\UserSecrets\c03bf52a-aada-4216-a61c-ed2c8a8fc1df\secrets.json
                .Build();
            
            // https://stackoverflow.com/questions/46294883/how-to-determine-which-port-asp-net-core-2-is-listening-on-when-a-dynamic-port
            return WebHost.CreateDefaultBuilder(args)
                .UseConfiguration(config)
                .UseKestrel(
                    delegate(Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions c)
                    {
                        c.AddServerHeader = false;
                    })
                .UseStartup<Startup>()
                
                .Build();
        } // End Function BuildWebHost 
        
        
    } // End Class Program 
    
    
} // End Namespace CoreCMS 
