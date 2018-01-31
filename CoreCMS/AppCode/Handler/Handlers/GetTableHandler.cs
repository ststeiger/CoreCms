
using Microsoft.AspNetCore.Http;

using My.Extensions.Configuration;


namespace CoreCMS
{


    [HandlerPath("/getData", "GET,POST")]
    public class GetTableHandler
    : HandlerMiddleware<GetTableHandler>, CoreCMS.IHttpHandler
    {

        public GetTableHandler() : base()
        { }


        public GetTableHandler(RequestDelegate next) : base(next)
        { }


        void IHttpHandler.ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/html; charset=utf-8";

            string html = @"<!DOCTYPE html>
<html xmlns=""http://www.w3.org/1999/xhtml"" lang=""en"">
<head>
    <meta http-equiv=""X-UA-Compatible"" content=""IE=edge,chrome=1"" />

    <meta http-equiv=""cache-control"" content=""max-age=0"" />
    <meta http-equiv=""cache-control"" content=""no-cache"" />
    <meta http-equiv=""expires"" content=""0"" />
    <meta http-equiv=""expires"" content=""Tue, 01 Jan 1980 1:00:00 GMT"" />
    <meta http-equiv=""pragma"" content=""no-cache"" />

    <meta charset=""utf-8"" />
    <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8"" />

    <meta http-equiv=""Content-Language"" content=""en"" />
    <meta name=""viewport"" content=""width=device-width,initial-scale=1"" />


    <!--
    <meta name=""author"" content=""name"" />
    <meta name=""description"" content=""description here"" />
    <meta name=""keywords"" content=""keywords,here"" />

    <link rel=""shortcut icon"" href=""favicon.ico"" type=""image/vnd.microsoft.icon"" />
    <link rel=""stylesheet"" href=""stylesheet.css"" type=""text/css"" />
    -->

    <title>Title</title>
    <style type=""text/css"" media=""all"">
        body
        {
            background-color: #0c70b4;
            color: #546775;
            font: normal 400 18px ""PT Sans"", sans-serif;
            -webkit-font-smoothing: antialiased;
        }

        .Table 
        {
            display: -webkit-box;
            display: -moz-box;
            display: box;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: column nowrap;
            -moz-flex-flow: column nowrap;
            flex-flow: column nowrap;
            -webkit-box-pack: justify;
            -moz-box-pack: justify;
            box-pack: justify;
            -webkit-justify-content: space-between;
            -moz-justify-content: space-between;
            -ms-justify-content: space-between;
            -o-justify-content: space-between;
            justify-content: space-between;
            -ms-flex-pack: justify;
            border: 1px solid #f2f2f2;
            font-size: 1rem;
            margin: 0.5rem;
            line-height: 1.5;
        }

        .Table-header 
        {
            display: none;
        }


        @media (min-width: 500px) 
        {

            .Table-header 
            {
            font-weight: 700;
            background-color: #f2f2f2;
            }

        }


        .Table-row 
        {
            width: 100%;
        }

        .Table-row:nth-of-type(even) 
        {
            background-color: #f2f2f2;
        }

        .Table-row:nth-of-type(odd) 
        {
            background-color: #ffffff;
        }


        @media (min-width: 500px) 
        {

            .Table-row 
            {
                display: -webkit-box;
                display: -moz-box;
                display: box;
                display: -webkit-flex;
                display: -moz-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-flex-flow: row nowrap;
                -moz-flex-flow: row nowrap;
                flex-flow: row nowrap;
            }

            .Table-row:nth-of-type(even) 
            {
                background-color: #ffffff;
            }

            .Table-row:nth-of-type(odd) 
            {
                background-color: #f2f2f2;
            }
        }


        .Table-row-item 
        {
            display: -webkit-box;
            display: -moz-box;
            display: box;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row nowrap;
            -moz-flex-flow: row nowrap;
            flex-flow: row nowrap;
            -webkit-flex-grow: 1;
            -moz-flex-grow: 1;
            flex-grow: 1;
            -ms-flex-positive: 1;
            -webkit-flex-basis: 0;
            -moz-flex-basis: 0;
            flex-basis: 0;
            -ms-flex-preferred-size: 0;
            word-wrap: break-word;
            overflow-wrap: break-word;
            word-break: break-all;
            padding: 0.5em;
            word-break: break-word;
        }

        .Table-row-item:before 
        {
            content: attr(data-header);
            width: 30%;
            font-weight: 700;
        }


        @media (min-width: 500px) 
        {

            .Table-row-item 
            {
            border: 1px solid #ffffff;
            padding: 0.5em;
            }

            .Table-row-item:before 
            {
            content: none;
            }

        }

    </style>
</head>
<body>
    {@HTML}
</body>
</html>
";

            string sql = (string)context.Request.Query["sql"] ?? (string)context.Request.Form["sql"];
            sql = System.Net.WebUtility.UrlDecode(sql);
            sql = sql.Replace("\r", "").Replace("\n", System.Environment.NewLine);
            

            CoreDb.ReadDAL readDAL = (CoreDb.ReadDAL)context.RequestServices.GetService(
                typeof(CoreDb.ReadDAL)
            );

            readDAL.ExecuteReader(sql, 
                delegate (System.Data.Common.DbDataReader dr)
                {
                    string table = responsiveTable("foo", dr);
                    html = html.Replace("{@HTML}", table);
                }
            );

            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(html);
            context.Response.Body.Write(buffer, 0, buffer.Length);
        }
        

        public static string responsiveTable(string id, System.Data.Common.DbDataReader reader)
        {
            string retVal = null;
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            responsiveTable(id, reader, sb);
            retVal = sb.ToString();
            sb.Length = 0;
            sb = null;
            return retVal;
        } // End Function responsiveTable 


        public static void responsiveTable(string id, System.Data.Common.DbDataReader reader, System.Text.StringBuilder sb)
        {
            sb.AppendLine(@"<div id=""" + System.Web.HttpUtility.HtmlAttributeEncode(id) + @""" class=""table"">");
            sb.AppendLine(@"<div class=""Table-row Table-header"">");


            string[] columns = new string[reader.FieldCount];

            for (int i = 0; i < reader.FieldCount; i++)
            {
                columns[i] = reader.GetName(i);

                sb.Append(@"<div class=""Table-row-item"">");
                sb.Append(System.Web.HttpUtility.HtmlEncode(columns[i]));
                sb.AppendLine("</div>"); // End Header-Cell
            } // Next i 
            sb.AppendLine("</div>"); // End Header-Row


            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    sb.AppendLine(@"<div class=""Table-row"">");

                    //foreach (string columnName in columns)
                    for (int i = 0; i < columns.Length; ++i)
                    {
                        sb.Append(@"<div class=""Table-row-item"" data-header=""" + System.Web.HttpUtility.HtmlAttributeEncode(columns[i]) + @""">");
                        sb.Append(System.Web.HttpUtility.HtmlEncode(System.Convert.ToString(reader.GetValue(i))));
                        sb.AppendLine("</div>"); // End Cell
                    } // Next dc 

                    sb.AppendLine("</div>"); // End Row
                } // Whend 
            } // End if (reader.HasRows) 

            sb.AppendLine("</div>"); // End Table
        } // End Sub responsiveTable 


        bool IHttpHandler.IsReusable
        {
            get { return false; }
        } // End Property IsReusable 


    } // End Class GetTableHandler 


} // End Namespace CoreCMS 
