
// http://benfoster.io/blog/asp-net-core-themes-and-multi-tenancy
// http://benfoster.io/blog/asp-net-5-multitenancy
// https://github.com/saaskit/saaskit
namespace CoreCMS.Routing
{


    // public class AppTenant { public string Theme; }

    
    // Test: 
    // http://localhost:58343/Home/About 
    public class SubdomainViewLocationExpander : Microsoft.AspNetCore.Mvc.Razor.IViewLocationExpander
    {
        private const string THEME_KEY = "theme";


        public void PopulateValues(Microsoft.AspNetCore.Mvc.Razor.ViewLocationExpanderContext context)
        {
            // context.Values[THEME_KEY] = context.ActionContext.HttpContext.GetTenant<AppTenant>()?.Theme;
            // context.Values[THEME_KEY] = "TestME";
            context.Values[THEME_KEY] = (string)context.ActionContext.RouteData.Values["subdomain"];
        } // End Function PopulateValues 


        public System.Collections.Generic.IEnumerable<string> ExpandViewLocations(
            Microsoft.AspNetCore.Mvc.Razor.ViewLocationExpanderContext context,
            System.Collections.Generic.IEnumerable<string> viewLocations)
        {
            string theme = null;
            if (context.Values.TryGetValue(THEME_KEY, out theme))
            {
                // Enumerable.Prepend<string>(viewLocations, $"/Themes/{theme}/Shared/{{0}}.cshtml");
                // Enumerable.Prepend<string>(viewLocations, $"/Themes/{theme}/{{1}}/{{0}}.cshtml");

                //using System.Linq;
                //viewLocations = new string[] {
                //    $"/Themes/{theme}/{{1}}/{{0}}.cshtml",
                //    $"/Themes/{theme}/Shared/{{0}}.cshtml",
                //}.Concat(viewLocations);

                viewLocations = System.Linq.Enumerable.Concat(new string[] {
                    $"/Themes/{theme}/{{1}}/{{0}}.cshtml",
                    $"/Themes/{theme}/Shared/{{0}}.cshtml",
                }, viewLocations);

            } // End if (context.Values.TryGetValue(THEME_KEY, out theme)) 

            return viewLocations;
        } // End Function ExpandViewLocations 


    } // End Class SubdomainViewLocationExpander : Microsoft.AspNetCore.Mvc.Razor.IViewLocationExpander 


} // End Namespace CoreCMS.Routing 
