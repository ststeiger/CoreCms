
using Microsoft.Extensions.Configuration;


namespace CoreCMS.ConfigurationProvider
{
    
    
    // https://www.jeffogata.com/asp-net-5-configuration-custom-providers/
    // https://andrewlock.net/creating-a-custom-iconfigurationprovider-in-asp-net-core-to-parse-yaml/
    // https://github.com/andrewlock/NetEscapades.Configuration
    public class ExampleFileProvider : FileConfigurationProvider
    {

        public ExampleFileProvider(FileConfigurationSource sf):base(sf)
        { }

        public override void Load(System.IO.Stream strm)
        {
            base.Data["setting1"] = "Value 1 - Custom";
            base.Data["data:settingA"] = "Value A - Custom";
        }
        
    }


    public class ExampleFileProviderSource : FileConfigurationSource
    {
        
        public ExampleFileProviderSource(string fileName)
            : base()
        {
            //this.FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
            //    System.IO.Path.GetDirectoryName(fileName)
            //);
            this.Path = fileName;
        }
        
        
        public override IConfigurationProvider Build(IConfigurationBuilder builder)
        {
            base.FileProvider = FileProvider ?? builder.GetFileProvider();
            return new ExampleFileProvider(this);
        }
        
        
    }
    
    
}
