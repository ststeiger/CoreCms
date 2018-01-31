
namespace CoreCMS.ConfigData
{
    

    public class Databases
    {
        public System.Collections.Generic.Dictionary<string, DbConfig> 
            ConnectionStrings { get; set; }
    }
    
    
    public class DbConfig
    {
        public string ConnectionString{ get; set; }
        public string ProviderName { get; set; }
    }
    
    
}
