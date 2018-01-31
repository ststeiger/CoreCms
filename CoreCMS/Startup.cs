
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Threading.Tasks;
using CoreCMS.ConfigData;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.NodeServices;

namespace CoreCMS
{
    
    
    public class Startup
    {
        public IConfiguration Configuration { get; }


        public static System.Collections.Generic.List<string> GetTables(string xml)
        {
            System.Collections.Generic.List<string> ls = null;
            // string xml = @"<tables><table>T_AP_Ref_Mandant</table><table>T_SYS_ApertureColorToHex</table></tables>";

            if (string.IsNullOrWhiteSpace(xml))
                return ls;

            System.Xml.XmlDocument doc = new System.Xml.XmlDocument();
            doc.LoadXml(xml);

            if(doc.DocumentElement.ChildNodes.Count > 0)
            ls = new System.Collections.Generic.List<string>();

            foreach (System.Xml.XmlElement cn in doc.DocumentElement.ChildNodes)
            {
                ls.Add(cn.InnerText);
            } // Next cn 

            return ls;
        }


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddAuthentication(AuthTest.JwtAuthentication.SetCookieSchemes)
            .AddCookie(AuthTest.JwtAuthentication.SetupCookie)
            // .AddJwtBearer(AuthTest.JwtAuthentication.SetupBearer)
            ;
            /*
            services.AddAntiforgery(
                delegate (Microsoft.AspNetCore.Antiforgery.AntiforgeryOptions options)
                {
                     // https://damienbod.com/2017/05/09/anti-forgery-validation-with-asp-net-core-mvc-and-angular/
                     options.HeaderName = "X-XSRF-TOKEN";
                     //options.CookieDomain = "localhost";
                     options.Cookie.Name = "XSRF";
                }
           );
           */
            // services.AddMvc();

            // https://geeks.ms/clanderas/2016/10/18/asp-net-core-node-services-to-execute-your-nodejs-scripts/
            // https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/
            services.AddNodeServices( options => {
                // options.DebuggingPort 
            });

            services.AddRouting(delegate(Microsoft.AspNetCore.Routing.RouteOptions options)
            { });


            services.AddMvc(
                /*
                delegate (Microsoft.AspNetCore.Mvc.MvcOptions config)
                {
                    Microsoft.AspNetCore.Authorization.AuthorizationPolicy policy =
                        new Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder()
                                     .RequireAuthenticatedUser()
                                     // .AddRequirements( new NoBannedIPsRequirement(new HashSet<string>() { "127.0.0.1", "0.0.0.1" } ))
                                     .Build();

                    config.Filters.Add(new Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter(policy));
                }
                */
            )
            .AddJsonOptions(options =>
            {
#if DEBUG
                options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
#else
                options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.None;
#endif
            });

            
            services.Configure<Microsoft.AspNetCore.Mvc.Razor.RazorViewEngineOptions>(options =>
            {
                options.ViewLocationExpanders.Add(new CoreCMS.Routing.SubdomainViewLocationExpander());
            });
            
            
            
            Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions
                .Configure<ConfigData.SmtpConfig>(services, Configuration.GetSection("Smtp"));
            
            
            /*
            Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions
                .Configure<Dictionary<string, ConfigData.cConnectionString>>(services
                , Configuration.GetSection("ConnectionStrings")
            );
            
            Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions
                .Configure<ConfigData.cConnectionStrings>(services
                    , Configuration.GetSection("DataBase"));

            string foo = Configuration.GetValue<string>("data:userID");
            System.Console.WriteLine(foo);
            // https://msdn.microsoft.com/en-us/magazine/mt632279.aspx
            */
            
            ConfigData.Databases dbs = Configuration.Get<ConfigData.Databases>();

            // System.Console.WriteLine(cs);
            // services.AddSingleton<ConfigData.Database>(cs);

            DbConfig dbConfig = null;

            if (dbs.ConnectionStrings.ContainsKey(System.Environment.MachineName))
                dbConfig = dbs.ConnectionStrings[System.Environment.MachineName];
            
            
            if (dbConfig == null)
            {
                if (dbs.ConnectionStrings.ContainsKey("server"))
                    dbConfig = dbs.ConnectionStrings["server"];
            }
            
            
            if (dbConfig == null)
                throw new System.IO.InvalidDataException("Connection string not configured...");
            
            
            CoreDb.DalConfig dalConfig = 
                new CoreDb.DalConfig(dbConfig.ProviderName, dbConfig.ConnectionString);
            
            CoreDb.ReadDAL readData = new CoreDb.ReadDAL(dalConfig);
            CoreDb.WriteDAL writeData = new CoreDb.WriteDAL(dalConfig);
            
            services.AddSingleton<CoreDb.ReadDAL>(readData);
            services.AddSingleton<CoreDb.WriteDAL>(writeData);
        }
        
        
        // http://benfoster.io/blog/how-to-configure-kestrel-urls-in-aspnet-core-rc2
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env
            //, Microsoft.Extensions.Options.IOptions<Dictionary<string, ConnectionString>> cons
            //, ConfigData.cConnectionStrings cons
        )
        {
            app.Use(
                delegate (HttpContext context, System.Func<Task> next)
                {
                    if (context.Response.Headers.ContainsKey("X-SourceFiles"))
                        context.Response.Headers.Remove("X-SourceFiles");

                    return next.Invoke();
                }
            );


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseBrowserLink();
            }
            else
            {
                app.UseDeveloperExceptionPage();
                // app.UseExceptionHandler("/Home/Error");
            }
            
            app.UseStatusCodePages();

            app.AddHandlers(typeof(Startup).Assembly);

            /*
            // this is for modules
            app.UseWhen(delegate (HttpContext context)
            {
                return ps.Equals(context.Request.Path, StringComparison.InvariantCultureIgnoreCase);
            }, x => x.UseMiddleware<FooMiddleware>());
            */
            
            app.UseStaticFiles();
            app.UseFileServer(enableDirectoryBrowsing: false);


            app.UseRouter(
               delegate (Microsoft.AspNetCore.Routing.IRouteBuilder r)
               {
                   Microsoft.AspNetCore.Routing.IInlineConstraintResolver requiredService =
                        r.ServiceProvider.GetRequiredService<Microsoft.AspNetCore.Routing.IInlineConstraintResolver>();

                   r.Routes.Add(new Microsoft.AspNetCore.Routing.Route(new CoreCMS.Routing.SubdomainRouteHandler(app)
                                      , "{controller=Home}/{action=Index}/{id?}"
                                      , requiredService));
               }
            );

                    // https://blog.elmah.io/improving-security-in-asp-net-mvc-using-custom-headers/
                    app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
            
        } // End Sub Configure 
        
        
    } // End Class Startup 
    
    
} // End Namespace CoreCMS 
