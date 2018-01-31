
namespace System.Web.Hosting
{


    public class HostingEnvironment
    {
        public bool IsHosted = true;


        public static string MapPath(string path)
        {
            if (path == null)
                return System.AppDomain.CurrentDomain.BaseDirectory;

            path = path.Replace('\\', '/');

            if (path.StartsWith("~"))
            {
                path = System.AppDomain.CurrentDomain.BaseDirectory + "/" + path.Substring(1);
                path = path.Replace('/', System.IO.Path.DirectorySeparatorChar);
            } // End if (path.StartsWith("~")) 

            path = System.IO.Path.GetFullPath(path);

            return path;
        } // End Function MapPath 


    } // End Class HostingEnvironment 


} // End Namespace System.Web.Hosting 
