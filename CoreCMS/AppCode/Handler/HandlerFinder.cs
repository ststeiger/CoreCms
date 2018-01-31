
namespace My.Extensions.Configuration
{

    public class HandlerPathAttribute : System.Attribute
    {
        public string Path;
        public string Methods;

        public HandlerPathAttribute(string url) 
            : this(url, "GET")
        { } // End Constructor 

        public HandlerPathAttribute(string url, string methods)
        {
            this.Path = url;
            this.Methods = methods;
            //this.Methods = methods.Split(',', System.StringSplitOptions.RemoveEmptyEntries);
            //for (int i = 0; i < this.Methods.Length; ++i)
            //{
            //    this.Methods[i] = this.Methods[i].Trim();
            //}

        } // End Constructor 

    } // End Class HandlerPathAttribute 


    public class HandlerFinder
    {
        
        
        // https://stackoverflow.com/questions/851248/c-sharp-reflection-get-all-active-assemblies-in-a-solution
        // This will get all of the loaded assemblies in the current AppDomain.
        // As noted in the comments, it's possible to spawn multiple AppDomains, 
        // in which case each can have its own assemblies. 
        // The immediate advantage to doing so is that you can unload Assemblies 
        // by unloading the containing AppDomain.
        public static System.Reflection.Assembly[] GetAllAssemblies()
        {
            return System.AppDomain.CurrentDomain.GetAssemblies();
        } // End Function GetAllAssemblies


        // GetTypesWithAttribute<HandlerPathAttribute>(asm);
        public static System.Collections.Generic.List<System.Type> GetTypesWithAttribute<T>(System.Reflection.Assembly assembly)
        {
            System.Collections.Generic.List<System.Type> ls = new System.Collections.Generic.List<System.Type>();

            foreach (System.Type type in assembly.GetTypes())
            {
                if (type.GetCustomAttributes(typeof(T), true).Length > 0)
                {
                    ls.Add(type);
                }
            } // Next type 

            return ls;
        } // End Function GetTypesWithAttribute


        // https://stackoverflow.com/questions/1268397/how-to-find-all-the-types-in-an-assembly-that-inherit-from-a-specific-type-c-sha
        public System.Collections.Generic.List<System.Type> FindDerivedTypes(
              System.Reflection.Assembly assembly
            , System.Type baseType)
        {
            System.Collections.Generic.List<System.Type> ls = 
                new System.Collections.Generic.List<System.Type>();
            
            System.Type[] ta = assembly.GetTypes();

            for (int i = 0; i < ta.Length; ++i)
            {
                if(baseType.IsAssignableFrom(ta[i]))
                    ls.Add(ta[i]);
            } // Next i 
            
            return ls;
        } // End Function FindDerivedTypes


        // FindDerivedTypes(asm, typeof(CoreCMS.HandlerMiddleware<>), typeof(CoreCMS.IHttpHandler))
        public static System.Collections.Generic.List<System.Type> FindDerivedTypes(
            System.Reflection.Assembly assembly
            ,System.Type typeToSearch
            ,System.Type neededInterface)
        {
            System.Collections.Generic.List<System.Type> ls = 
                new System.Collections.Generic.List<System.Type>();

            System.Type[] ta = assembly.GetTypes();

            int l = ta.Length;
            for (int i = 0; i < l; ++i)
            {
                if (ta[i].BaseType == null)
                    continue;

                if (!ta[i].BaseType.IsGenericType)
                    continue;
                
                // public class Middleman : IHttpHandler
                // public class HelloWorldHandler2 : HandlerMiddleware<Middleman>
                // public class HelloWorldHandler : HandlerMiddleware<HelloWorldHandler>, IHttpHandler

                var gt = ta[i].BaseType.GetGenericTypeDefinition();
                if (gt == null)
                    continue;

                if (!object.ReferenceEquals(gt, typeToSearch))
                    continue;

                System.Type[] typeParameters = ta[i].BaseType.GetGenericArguments();
                if (typeParameters == null || typeParameters.Length < 1)
                    continue;

                if(neededInterface.IsAssignableFrom(typeParameters[0]))
                    ls.Add(ta[i]);
            } // Next i 

            return ls;
        } // End Function FindDerivedTypes
        
        
        public static  System.Collections.Generic.List<System.Type> FindDerivedTypes<T>
            (System.Reflection.Assembly assembly, System.Type iface)
        {
            return FindDerivedTypes(assembly, typeof(T), iface);
        } // End Function FindDerivedTypes 


        // If you need to include types that implement an interface see @Jon Skeet's answer.
        public System.Collections.Generic.IEnumerable<System.Type> FindSubClassesOf<TBaseType>()
        {
            System.Collections.Generic.List<System.Type> ls =
                new System.Collections.Generic.List<System.Type>();
            
            System.Type baseType = typeof(TBaseType);
            System.Reflection.Assembly assembly = baseType.Assembly;

            System.Type[] ta = assembly.GetTypes();

            for (int i = 0; i < ta.Length; ++i)
            {
                if(ta[i].IsSubclassOf(baseType))
                    ls.Add(ta[i]);
            }
            
            return ls;
        } // End Function FindSubClassesOf 


    } // End Class HandlerFinder 


} // End namespace Microsoft.Extensions.Configuration 
