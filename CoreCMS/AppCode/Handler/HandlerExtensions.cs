
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration; // CoreCMS


namespace Microsoft.Extensions.Configuration 
{

    public static class HandlerExtensions
    {

        //public static IRouteBuilder MapVerb(this IRouteBuilder builder, string verb, string template, Action<IApplicationBuilder> action);
        

        public static IApplicationBuilder AddHandlers(this IApplicationBuilder app, System.Reflection.Assembly asm)
        {
            // System.Collections.Generic.List<System.Type> ls = HandlerFinder.FindDerivedTypes(
            //     asm, typeof(CoreCMS.HandlerMiddleware<>), typeof(CoreCMS.IHttpHandler)
            // );

            System.Collections.Generic.List<System.Type> ls =
                HandlerFinder.GetTypesWithAttribute<HandlerPathAttribute>(asm);

            foreach (System.Type t in ls)
            {
                app.MapVerbs(t);
            }

            return app;
        }


        public static IApplicationBuilder MapVerbs<T>(this IApplicationBuilder app)
        {
            return MapVerbs(app, typeof(T));
        }


        public static IApplicationBuilder MapVerbs(this IApplicationBuilder app, System.Type middleware)
        {
            var attribute = System.Reflection.CustomAttributeExtensions
                .GetCustomAttribute<HandlerPathAttribute>(
                    System.Reflection.IntrospectionExtensions.GetTypeInfo(middleware)
                );

            if (attribute == null)
            {
                throw new System.ArgumentNullException("HandlerPathAttribute/url");
            }

            string url = attribute.Path;
            string methods = attribute.Methods;
            return MapVerbs(app, url, methods, middleware);
        } // End Sub MapVerbs 


        public static IApplicationBuilder MapVerbs<T>(this IApplicationBuilder app, string url, string methods)
        {
            return MapVerbs(app, url, methods, typeof(T));
        }

        public static IApplicationBuilder MapVerbs(this IApplicationBuilder app, string url, string methods, System.Type middleware)
        {
            PathString ps = new PathString(url);
            string[] allowedMethods = methods.ToLowerInvariant().Split(',');
            int allowedMethodCount = allowedMethods.Length;

            app.MapWhen(
                delegate (HttpContext context)
                {
                    if (context.Request.Method == null)
                        return false;

                    bool cancel = true;
                    string method = context.Request.Method.ToLowerInvariant();

                    // https://stackoverflow.com/questions/1051276/fastest-way-to-compare-a-string-with-an-array-of-strings-in-c2-0
                    // if (!allowedMethods.Contains<string>(method, System.StringComparer.Ordinal))
                    // return false;

                    for (int i = 0; i < allowedMethodCount; ++i)
                    {
                        if (allowedMethods[i].Equals(method, System.StringComparison.Ordinal))
                        {
                            cancel = false;
                            break;
                        }
                    } // Next i 

                    if (cancel)
                        return false;

                    return ps.Equals(context.Request.Path, System.StringComparison.InvariantCultureIgnoreCase);
                }
                ,
                delegate (IApplicationBuilder builder)
                {
                    // builder.UseMiddleware<T>();
                    // middleware = typeof(T);
                    builder.UseMiddleware(middleware);
                }

            ); // End MapWhen 

            return app;
        } // End Sub MapVerbs 


    } // End Class HandlerExtensions 


}
