
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Routing;


namespace CoreCMS.Routing
{


    // https://www.hanselman.com/blog/AddingACustomInlineRouteConstraintInASPNETCore10.aspx
    // https://weblogs.asp.net/jongalloway/looking-at-asp-net-mvc-5-1-and-web-api-2-1-part-2-attribute-routing-with-custom-constraints
    // http://rion.io/2015/11/13/understanding-routing-precedence-in-asp-net-mvc/
    // https://blogs.msdn.microsoft.com/webdev/2013/10/17/attribute-routing-in-asp-net-mvc-5/
    public class SiteConstraint : Microsoft.AspNetCore.Routing.IRouteConstraint
    {

        public SiteConstraint(string s)
        { }
        

        bool Microsoft.AspNetCore.Routing.IRouteConstraint.Match(
              Microsoft.AspNetCore.Http.HttpContext httpContext
            , Microsoft.AspNetCore.Routing.IRouter route
            , string routeKey
            , Microsoft.AspNetCore.Routing.RouteValueDictionary values
            , Microsoft.AspNetCore.Routing.RouteDirection routeDirection)
        {
            throw new System.NotImplementedException();
        } // End Function Match 


    } // End Class SiteConstraint 


    /*
    public class SiteRouteAttribute : RouteFactoryAttribute
    {
        public SiteRouteAttribute(string template, string sitePermitted) : base(template)
        {
            SitePermitted = sitePermitted;
        }

        public override RouteValueDictionary Constraints
        {
            get
            {
                var constraints = new RouteValueDictionary();
                constraints.Add("site", new SiteConstraint(SitePermitted));
                return constraints;
            }
        }

        public string SitePermitted
        {
            get;
            private set;
        }
    }*/


} // End Namespace CoreCMS.Routing 
