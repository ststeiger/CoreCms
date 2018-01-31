
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;


namespace CoreCMS.ConfigurationProvider
{
    
    
    public class ComplexExampleProvider : IConfigurationProvider
    {
        IEnumerable<string> IConfigurationProvider.GetChildKeys(IEnumerable<string> earlierKeys, string parentPath)
        {
            throw new System.NotImplementedException();
        }

        IChangeToken IConfigurationProvider.GetReloadToken()
        {
            throw new System.NotImplementedException();
        }

        void IConfigurationProvider.Load()
        {
            throw new System.NotImplementedException();
        }

        void IConfigurationProvider.Set(string key, string value)
        {
            throw new System.NotImplementedException();
        }

        bool IConfigurationProvider.TryGet(string key, out string value)
        {
            throw new System.NotImplementedException();
        }
    }

    
}