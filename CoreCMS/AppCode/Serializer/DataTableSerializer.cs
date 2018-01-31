
// https://weblog.west-wind.com/posts/2008/sep/03/datatable-json-serialization-in-jsonnet-and-javascriptserializer
namespace CoreCMS
{


    public class DataRowConverter : Newtonsoft.Json.JsonConverter
    {


        /// <summary>
        /// Determines whether this instance can convert the specified value type.
        /// </summary>
        public override bool CanConvert(System.Type objectType)
        {
            return typeof(System.Data.DataRow).IsAssignableFrom(objectType);
        }


        /// <summary>
        /// Reads the JSON representation of the object.
        /// </summary>
        public override object ReadJson(Newtonsoft.Json.JsonReader reader
            , System.Type objectType, object existingValue
            , Newtonsoft.Json.JsonSerializer serializer)
        {
            throw new System.NotImplementedException();
        }


        /// <summary>
        /// Writes the JSON representation of the object.
        /// </summary>
        public override void WriteJson(Newtonsoft.Json.JsonWriter writer
            , object dataRow
            , Newtonsoft.Json.JsonSerializer serializer)
        {
            System.Data.DataRow row = dataRow as System.Data.DataRow;

            writer.WriteStartObject();
            foreach (System.Data.DataColumn column in row.Table.Columns)
            {
                writer.WritePropertyName(column.ColumnName);

                if(row[column] == System.DBNull.Value)
                    serializer.Serialize(writer, null);
                else
                    serializer.Serialize(writer, row[column]);
            }
            writer.WriteEndObject();
        }
    }


    public class DataTableConverter : Newtonsoft.Json.JsonConverter
    {


        /// <summary>
        /// Determines whether this instance can convert the specified value type.
        /// </summary>
        public override bool CanConvert(System.Type objectType)
        {
            return typeof(System.Data.DataTable).IsAssignableFrom(objectType);
        }


        /// <summary>
        /// Reads the JSON representation of the object.
        /// </summary>
        public override object ReadJson(Newtonsoft.Json.JsonReader reader, System.Type objectType, 
            object existingValue, Newtonsoft.Json.JsonSerializer serializer)
        {
            throw new System.NotImplementedException();
        }


        /// <summary>
        /// Writes the JSON representation of the object.
        /// </summary>
        public override void WriteJson(Newtonsoft.Json.JsonWriter writer, object dataTable,
            Newtonsoft.Json.JsonSerializer serializer)
        {
            System.Data.DataTable table = dataTable as System.Data.DataTable;
            DataRowConverter converter = new DataRowConverter();

            writer.WriteStartObject();

            writer.WritePropertyName("Rows");
            writer.WriteStartArray();

            foreach (System.Data.DataRow row in table.Rows)
            {
                converter.WriteJson(writer, row, serializer);
            }

            writer.WriteEndArray();
            writer.WriteEndObject();

            converter = null;
        }
    }
    

    public class DataSetConverter : Newtonsoft.Json.JsonConverter
    {
        /// <summary>
        /// Determines whether this instance can convert the specified value type.
        /// </summary>
        public override bool CanConvert(System.Type objectType)
        {
            return typeof(System.Data.DataSet).IsAssignableFrom(objectType);
        }


        /// <summary>
        /// Reads the JSON representation of the object.
        /// </summary>
        public override object ReadJson(Newtonsoft.Json.JsonReader reader, System.Type objectType, 
            object existingValue, Newtonsoft.Json.JsonSerializer serializer)
        {
            throw new System.NotImplementedException();
        }


        public override void WriteJson(Newtonsoft.Json.JsonWriter writer, object dataset,
            Newtonsoft.Json.JsonSerializer serializer)
        {
            System.Data.DataSet dataSet = dataset as System.Data.DataSet;

            DataTableConverter converter = new DataTableConverter();

            writer.WriteStartObject();

            writer.WritePropertyName("Tables");
            writer.WriteStartArray();

            foreach (System.Data.DataTable table in dataSet.Tables)
            {
                converter.WriteJson(writer, table, serializer);
            }

            writer.WriteEndArray();
            writer.WriteEndObject();

            converter = null;
        }


    }


}
