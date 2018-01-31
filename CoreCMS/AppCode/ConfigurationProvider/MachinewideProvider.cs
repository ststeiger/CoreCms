
using Microsoft.Extensions.Configuration;


namespace CoreCMS.ConfigurationProvider
{
    
    
    public class MachinewideProvider
    { }
    
    
    public class MachinewideConfigurationProvider 
        : Microsoft.Extensions.Configuration.ConfigurationProvider
    {
        
        public MachinewideConfigurationProvider(IConfigurationSource cs) :base()
        { }

        public override void Load()
        {
            // HKEY_CURRENT_USER\Software\COR\All
            //base.Load();
            // Computer\HKEY_CURRENT_USER\Software\""

            base.Data["data:userID"] = TestPlotly.SecretManager.GetSecret<string>("DefaultDbUser");
            base.Data["data:password"] = TestPlotly.SecretManager.GetSecret<string>("DefaultDbPassword");
        }
        
        
    }
    
    
    public class MachinewideConfigurationProviderSource 
        : Microsoft.Extensions.Configuration.IConfigurationSource
    {
        
        //public IConfigurationProvider Build(IConfigurationBuilder builder)
        //{
        //    return new MyEasyConfProvider(this);
        //}
        
        IConfigurationProvider IConfigurationSource.Build(IConfigurationBuilder builder)
        {
            return new MachinewideConfigurationProvider(this);
        }
        
    }
    
    
}
