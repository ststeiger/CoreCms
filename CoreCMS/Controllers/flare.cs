
namespace CoreCMS.D3Models
{
    
    using Newtonsoft.Json;    
    using System.Collections.Generic;
    
    public partial class Flare 
    {
        [JsonProperty("imports")]
        public List<string> Imports { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("size")]
        public long Size { get; set; }
        
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Converter.Settings);
        }
        
        public static List<Flare> FromJson(string json)
        {
            return JsonConvert.DeserializeObject<List<Flare>>(json, Converter.Settings);
        }
    }
    
    
    public class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
        };
    }
    
    
}
