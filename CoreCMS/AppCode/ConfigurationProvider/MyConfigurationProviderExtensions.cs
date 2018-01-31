
using Microsoft.Extensions.Configuration;


namespace CoreCMS.ConfigurationProvider
{
    
    
    public static class MyConfigurationProviderExtensions
    {

        public static IConfigurationBuilder AddEasyConfiguration(
            this IConfigurationBuilder builder
            , string fileName)
        {
            return builder.Add(new ConfigurationProvider.ExampleFileProviderSource(fileName));
        }
        
        
        public static IConfigurationBuilder AddConfidentialConfiguration(
            this IConfigurationBuilder builder)
        {
            return builder.Add(new ConfigurationProvider.MachinewideConfigurationProviderSource());
        }
        
        
    }
    
    
}
