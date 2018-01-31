
namespace CoreCMS.Controllers
{


    public class TreeData
    {

        [Newtonsoft.Json.JsonProperty("id")]
        public string Id;

        [Newtonsoft.Json.JsonProperty("parent")]
        public string Parent;

        [Newtonsoft.Json.JsonProperty("text")]
        public string Text;

        [Newtonsoft.Json.JsonProperty("hasChildren")]
        public bool HasChildren;

        [Newtonsoft.Json.JsonProperty("children")]
        public TreeData[] Children;

        public string ToJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this, Converter.Settings);
        }

        public static System.Collections.Generic.List<TreeData> FromJson(string json)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<
                    System.Collections.Generic.List<TreeData>
                >(json, Converter.Settings);
        }

    }


    public class Converter
    {
        public static readonly Newtonsoft.Json.JsonSerializerSettings Settings = 
            new Newtonsoft.Json.JsonSerializerSettings
        {
            MetadataPropertyHandling = Newtonsoft.Json.MetadataPropertyHandling.Ignore,
            DateParseHandling = Newtonsoft.Json.DateParseHandling.None,
        };
    }


}
