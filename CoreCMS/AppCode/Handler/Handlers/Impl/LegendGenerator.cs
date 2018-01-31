
namespace Portal.Visualiser
{

    public abstract class ReadDBAL
    {
        public static ReadDBAL Create(string providerName)
        {
            if ("Npgsql".Equals(providerName, System.StringComparison.InvariantCultureIgnoreCase))
            {
                return new PgReadDBAL();
            }

            return null;
        }
    }

    public abstract class WriteDBAL
    {

        public static WriteDBAL Create(string providerName)
        {
            if ("Npgsql".Equals(providerName, System.StringComparison.InvariantCultureIgnoreCase))
            {
                return new PgWriteDBAL();
            }

            return null;
        }
    }

    public abstract class DBAL
    {
        public ReadDBAL Read;
        public WriteDBAL Write;

        public static DBAL Create(string providerName)
        {
            PgDBAL instance = new PgDBAL();
            instance.Read = ReadDBAL.Create(providerName);
            instance.Write = WriteDBAL.Create(providerName);

            return instance;
        }

    }

    public class PgReadDBAL : ReadDBAL
    { }

    public class PgWriteDBAL : WriteDBAL
    { }

    public class PgDBAL : DBAL
    { }




    public class LegendGenerator
    {


        public static string Test(CoreDb.ReadDAL SQL)
        {
            return Test(SQL, "6B360D55-901D-487F-AF4A-189BC0906E5B", "71C16DAD-DADB-4BA2-A380-7ED3029DEEE0", "");
        } // End Sub Test 


        public static string Test(CoreDb.ReadDAL SQL, string svg_uid, string dar_uid, string legend)
        {
            //  -- TRUNCATE TABLE T_VWS_PdfLegende 
            string strSQL = @"
DECLARE @in_sprache varchar(3) 
SET @in_sprache = 'DE'


SELECT 
	 T_VWS_Ref_PaperSize.PS_Width_mm
	,T_VWS_Ref_PaperSize.PS_Height_mm
	 
	,T_VWS_PdfLegende.PL_UID
	,T_VWS_PdfLegende.PL_PLK_UID
	,T_VWS_PdfLegende.PL_Type
	,T_VWS_PdfLegende.PL_Format

	,T_VWS_PdfLegende.PL_X
	,T_VWS_PdfLegende.PL_Y
	,T_VWS_PdfLegende.PL_W
	,T_VWS_PdfLegende.PL_H

	,T_VWS_PdfLegende.PL_Angle
	,T_VWS_PdfLegende.PL_AspectRatio
	,T_VWS_PdfLegende.PL_AlignH
	,T_VWS_PdfLegende.PL_AlignV
	 
	,
	CASE @in_sprache
		WHEN 'FR' THEN T_VWS_PdfLegende.PL_Text_FR
		WHEN 'IT' THEN T_VWS_PdfLegende.PL_Text_IT
		WHEN 'EN' THEN T_VWS_PdfLegende.PL_Text_EN
		ELSE T_VWS_PdfLegende.PL_Text_DE
	END AS PL_Text 
	
	,T_VWS_PdfLegende.PL_Outline
	,T_VWS_PdfLegende.PL_Style
	,T_VWS_PdfLegende.PL_DataBind

	,
	CASE 
		WHEN T_VWS_PdfLegende.PL_Type = 'rectangle' THEN 1 
		WHEN T_VWS_PdfLegende.PL_Type = 'legend' THEN 2 
		WHEN T_VWS_PdfLegende.PL_Type = 'image' THEN 3 
		WHEN T_VWS_PdfLegende.PL_Type = 'text' THEN 4 
		ELSE NULL
	END AS RPT_TypeSort 

	,100 + ROW_NUMBER() OVER 
    (
         ORDER BY 
		 ISNULL(T_VWS_PdfLegende.PL_Sort, 666666666) 
		,CASE 
			WHEN T_VWS_PdfLegende.PL_Type = 'rectangle' THEN 1 
			WHEN T_VWS_PdfLegende.PL_Type = 'legend' THEN 2 
			WHEN T_VWS_PdfLegende.PL_Type = 'image' THEN 3 
			WHEN T_VWS_PdfLegende.PL_Type = 'text' THEN 4 
			ELSE NULL 
		END 
		,T_VWS_PdfLegende.PL_Type 
    ) AS PL_Sort 
    
    --,T_VWS_Ref_PdfLegendenKategorie.* 
FROM T_VWS_Ref_PdfLegendenKategorie 

LEFT JOIN T_VWS_Ref_PaperSize 
	ON T_VWS_Ref_PaperSize.PS_UID = T_VWS_Ref_PdfLegendenKategorie.PLK_PS_UID 
    
LEFT JOIN T_VWS_PdfLegende 
	ON T_VWS_PdfLegende.PL_PLK_UID = T_VWS_Ref_PdfLegendenKategorie.PLK_UID 
    
WHERE T_VWS_Ref_PdfLegendenKategorie.PLK_DAR_UID IS NULL 
AND T_VWS_Ref_PdfLegendenKategorie.PLK_IsDefault = 1 

ORDER BY 
	 PL_Sort 
";


            System.Data.DataTable dt = SQL.GetDataTable(strSQL);
            System.Collections.Generic.List<DrawingControl> ls = new System.Collections.Generic.List<DrawingControl>();
            foreach (System.Data.DataRow dr in dt.Rows)
            {
                string pl_type = System.Convert.ToString(dr["PL_Type"]);

                if ("image".Equals(pl_type, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    ls.Add(new ImageFragment(SQL, dr, svg_uid, dar_uid));
                }
                else if ("text".Equals(pl_type, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    ls.Add(new PlainTextFragment(SQL, dr, svg_uid, dar_uid));
                }
                else if ("legend".Equals(pl_type, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    ls.Add(new LegendFragment(SQL, dr, svg_uid, dar_uid, legend));
                }
                else if ("rectangle".Equals(pl_type, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    ls.Add(new RectangleFragment(SQL, dr, svg_uid, dar_uid));
                }
                else
                {
                    throw new System.NotSupportedException(("type \""
                                    + (pl_type + "\" is not supported in legend ")));
                }

            } // Next dr 


            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            foreach (DrawingControl thisControl in ls)
            {
                sb.AppendLine(thisControl.RenderFragment());
            } // Next thisControl 

            sb.Insert(0, @"
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv=""X-UA-Compatible"" content=""IE=edge,chrome=1"" />
    <meta http-equiv=""Content-Type"" content=""text/html;charset=utf-8"" />
    <meta charset=""utf-8"" />

    <meta http-equiv=""cache-control"" content=""max-age=0"" />
    <meta http-equiv=""cache-control"" content=""no-cache"" />
    <meta http-equiv=""expires"" content=""0"" />
    <meta http-equiv=""expires"" content=""Tue, 01 Jan 1980 1:00:00 GMT"" />
    <meta http-equiv=""pragma"" content=""no-cache"" />

    <title>Legende</title>

    <meta name=""viewport"" content=""width=device-width, initial-scale=1.00, minimum-scale=0.00, maximum-scale=10.00, user-scalable=yes"" />

    <style type=""text/css"">
        
        *
        {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            #white-space-collapse: discard;
        }

        body 
        {
            width: 84.1cm;
            height: 118.9cm;
            background-color: lightgrey; 
            background-color: white; 
            z-index: 999999; 
            position:relative;

            font-family: Arial;
            font-size: 11px;
            height: 12.4px;
        }

    </style>

    <script>

    </script>

</head>
<body>
");
            sb.AppendLine(@"</body>
</ html > ");

            string html = sb.ToString();
            sb.Clear();
            sb = null;

            return html;
        } // End Sub Test 


    } // End Class LegendGenerator 


    public abstract class DrawingControl
    {

        protected System.Data.DataRow m_data;
        protected string Legende;
        

        private static System.Globalization.NumberFormatInfo nfi = new System.Globalization.NumberFormatInfo()
        {
            NumberDecimalSeparator = ".",
            NumberGroupSeparator = "",
            CurrencyDecimalSeparator = ".",
            CurrencyGroupSeparator = "",
            CurrencySymbol = ""
        };


        public DrawingControl(CoreDb.ReadDAL SQL, System.Data.DataRow dr, string psvg_uid, string pdar_uid)
        {
            this.m_data = dr;
            this.m_X = (decimal)System.Convert.ChangeType(dr["PL_X"], typeof(decimal));
            this.m_Y = (decimal)System.Convert.ChangeType(dr["PL_Y"], typeof(decimal));
            this.m_Width = (decimal)System.Convert.ChangeType(dr["PL_W"], typeof(decimal));
            this.m_Height = (decimal)System.Convert.ChangeType(dr["PL_H"], typeof(decimal));
            this.m_Angle = (decimal)System.Convert.ChangeType(dr["PL_Angle"], typeof(decimal));

            this.m_Text = System.Convert.ToString(dr["PL_Text"]);
            this.m_Sort = System.Convert.ToString(dr["PL_Sort"]);

            this.m_AspectRatio = System.Convert.ToString(dr["PL_AspectRatio"]);

            this.m_Format = System.Convert.ToString(dr["PL_Format"]);
            this.m_Type = System.Convert.ToString(dr["PL_Type"]);
            this.m_DataBind = (string)System.Convert.ChangeType(dr["PL_DataBind"], typeof(string));

            this.m_SVG_UID = psvg_uid;
            this.m_DAR_UID = pdar_uid;
        } // End Constructor 



        protected System.Decimal m_X;

        public virtual string X
        {
            get
            {
                return this.m_X.ToString(nfi);
            }
        }



        protected System.Decimal m_Y;

        public virtual string Y
        {
            get
            {
                return this.m_Y.ToString(nfi);
            }
        }



        protected System.Decimal m_Width;

        public virtual string Width
        {
            get
            {
                return this.m_Width.ToString(nfi);
            }
        }



        protected System.Decimal m_Height;

        public virtual string Height
        {
            get
            {
                return this.m_Height.ToString(nfi);
            }
        }



        protected System.Decimal m_Angle;

        public virtual string Angle
        {
            get
            {
                return this.m_Angle.ToString(nfi);
            }
        }



        protected string m_Text;

        public virtual string Text
        {
            get
            {
                return this.m_Text;
            }
            set
            {
                this.m_Text = value;
            }
        }



        protected string m_Sort;

        public virtual string Sort
        {
            get
            {
                return this.m_Sort;
            }
            set
            {
                this.m_Sort = value;
            }
        }



        protected string m_Type;

        public virtual string Type
        {
            get
            {
                return this.m_Type;
            }
            set
            {
                this.m_Type = value;
            }
        }



        protected string m_Format;

        public virtual string Format
        {
            get
            {
                return this.m_Format;
            }
            set
            {
                this.m_Format = value;
            }
        }



        public virtual string OutlineColor
        {
            get
            {
                return "hotpink";
            }
        }



        protected string m_AspectRatio;

        public virtual string AspectRatio
        {
            get
            {
                return this.m_AspectRatio;
            }
            set
            {
                this.m_AspectRatio = value;
            }
        }



        public virtual string Color
        {
            get
            {
                if ("legend".Equals(this.Type, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    return "white";
                }

                if ("date".Equals(this.Format, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    return "white";
                }

                if ("rectangle".Equals(this.Type, System.StringComparison.InvariantCultureIgnoreCase))
                {
                    return "white; border: 1px solid black";
                }

                return "";
            }

        } // End Property Color 



        protected string m_SVG_UID;
        public virtual string SVG_UID
        {
            get
            {
                return this.m_SVG_UID;
            }
        }



        protected string m_DAR_UID;
        public virtual string DAR_UID
        {
            get
            {
                return this.m_DAR_UID;
            }
        }



        protected CoreDb.ReadDAL m_SQL;
        public virtual CoreDb.ReadDAL SQL
        {
            get
            {
                return this.m_SQL;
            }
        }



        protected string m_Svg;
        public virtual string Svg
        {
            get
            {
                string strSVG = this.Text;

                if (strSVG.StartsWith("~"))
                {
                    strSVG = System.Web.Hosting.HostingEnvironment.MapPath(strSVG);
                    strSVG = System.IO.File.ReadAllText(strSVG, System.Text.Encoding.UTF8);
                } // End if (strSVG.StartsWith("~")) 

                if (string.IsNullOrEmpty(strSVG))
                {
                    // System.Web.HttpContext context = System.Web.HttpContext.Current;
                    string url = "";
                    // string url = context.Request.Url.Scheme
                    //    + System.Uri.SchemeDelimiter + context.Request.Url.Authority;
                    // url = url + Portal.General.Handler.baseASHX.ContentUrl("~/ajax/Visualiser/SVG.ashx");
                    url += "&addStyleSheet=1";
                    url += "&BE_ID=200CEB26807D6BF99FD6F4F0D1CA54D4";
                    url = url + "&DAR_UID=" + this.DAR_UID;
                    url = url + "&SVG_UID=" + this.SVG_UID;
                    using (System.Net.WebClient wc = new System.Net.WebClient())
                    {
                        wc.Encoding = System.Text.Encoding.UTF8;
                        strSVG = wc.DownloadString(url);
                    } // End Using 

                } // End if (string.IsNullOrEmpty(strSVG)) 


                if (!string.IsNullOrEmpty(strSVG))
                {
                    System.Xml.XmlDocument doc = new System.Xml.XmlDocument();
                    doc.XmlResolver = null;
                    doc.PreserveWhitespace = true;
                    doc.LoadXml(strSVG);

                    System.Xml.XmlAttribute attrWidth = null;
                    System.Xml.XmlAttribute attrHeight = null;
                    System.Xml.XmlAttribute attrRatio = null;


                    if (doc.DocumentElement.HasAttribute("width"))
                    {
                        attrWidth = doc.DocumentElement.Attributes["width"];
                    }
                    else
                    {
                        attrWidth = doc.CreateAttribute("width");
                        doc.DocumentElement.Attributes.Append(attrWidth);
                    }

                    if (doc.DocumentElement.HasAttribute("height"))
                    {
                        attrHeight = doc.DocumentElement.Attributes["height"];
                    }
                    else
                    {
                        attrHeight = doc.CreateAttribute("height");
                        doc.DocumentElement.Attributes.Append(attrHeight);
                    }

                    if (doc.DocumentElement.HasAttribute("preserveAspectRatio"))
                    {
                        attrRatio = doc.DocumentElement.Attributes["preserveAspectRatio"];
                    }
                    else
                    {
                        attrRatio = doc.CreateAttribute("preserveAspectRatio");
                        doc.DocumentElement.Attributes.Append(attrRatio);
                    }

                    attrWidth.Value = "100%";
                    attrHeight.Value = "100%";
                    attrRatio.Value = this.AspectRatio;
                    strSVG = doc.OuterXml;
                    doc = null;
                } // End if (!string.IsNullOrEmpty(strSVG)) 

                return strSVG;
            } // End Get 
            set
            {
                this.m_Svg = value;
            }

        } // End Property SVG 


        protected string m_DataBind;
        public virtual string DataBind
        {
            get
            {
                return this.m_DataBind;
            }
            set
            {
                this.m_DataBind = value;
            }
        } // End Property DataBind 


        protected System.Data.DataTable m_Data;
        public virtual System.Data.DataTable Data
        {
            get
            {
                if (this.m_Data != null)
                    return this.m_Data;
                
                if (string.IsNullOrEmpty(this.DataBind))
                    return null;

                string strSQL = $"SELECT * FROM [{this.DataBind.Replace("]", "]]")}](@in_svg, @in_dar_uid, @BE_ID, CURRENT_TIMESTAMP); ";

                using (System.Data.IDbCommand cmd = this.SQL.CreateCommand(strSQL))
                {
                    //  this.SQL.AddParameter(cmd, "in_svg", "97888427-5447-4C63-8CCA-87BAE22FC383");
                    this.SQL.AddParameter(cmd, "in_svg", this.SVG_UID);
                    this.SQL.AddParameter(cmd, "in_dar_uid", this.DAR_UID);
                    this.SQL.AddParameter(cmd, "BE_ID", "12435");
                    this.SQL.AddParameter(cmd, "in_stichtag", System.DateTime.Today);

                    this.m_Data = this.SQL.GetDataTable(cmd);
                } // End Using cmd 

                return this.m_Data;
            } // End Get 
            set
            {
                this.m_Data = value;
            }

        } // End Property Data 


        public virtual string RenderFragment()
        {
            throw new System.NotImplementedException("RenderFragment not implemented...");
        } // End Function RenderFragment 


    } // End Class xxx


    public class RectangleFragment : DrawingControl
    {

        public RectangleFragment(CoreDb.ReadDAL SQL, System.Data.DataRow dr, string pSVG_UID, string pdar_uid) :
                base(SQL, dr, pSVG_UID, pdar_uid)
        { }

        public override string RenderFragment()
        {
            string html = @"
<div data-type=""" + this.Type + @""" data-format=""" + this.Format + @""" style=""display: block; position: absolute;
    left: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + @"cm; 
z-index: " + this.Sort + @";background-color: " + this.Color + @"; border: 1px solid black;"">
    </div>
";
            return html;
        } // End Function RenderFragment 


    } // End Class RectangleFragment 


    public class LegendFragment : DrawingControl
    {


        public LegendFragment(CoreDb.ReadDAL SQL, System.Data.DataRow dr, string pSVG_UID, string pdar_uid, string plegend) :
                base(SQL, dr, pSVG_UID, pdar_uid)
        {
            // ⁰¹²³⁴⁵⁶⁷⁸⁹ ₉₈₇₆₅₄₃₂₁₀
            // plegend = plegend.Replace("m²", "<span style=""letter-spacing: 1mm;"">m<sup>2</sup></span>")
            plegend = plegend.Replace("m²", @"<span style=""letter-spacing: 0.8mm;"">m²</span>");

            this.Legende = plegend;
        } // End Constructor 


        public override string RenderFragment()
        {
            string html = @"
<div data-type=""" + this.Type + @""" data-format=""" + this.Format + @""" style=""display: block; position: absolute; 
    left: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + @"cm; 
    z-index: " + this.Sort + @"; background-color: " + this.Color + @"; border: 1px solid black;"">"+ this.Legende + @"
    </div>
";
            return html;
        } // End Function RenderFragment 


    } // End Class LegendFragment 


    public class ImageFragment : DrawingControl
    {

        public ImageFragment(CoreDb.ReadDAL SQL, System.Data.DataRow dr, string pSVG_UID, string pdar_uid) :
                base(SQL, dr, pSVG_UID, pdar_uid)
        { }

        public override string RenderFragment()
        {
            string html = @"
<div data-type=""image"" style=""position:absolute; display: block; z-index: " + this.Sort + @"; 
left: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + @"cm;
background-color: #fffdf9; border: 1px solid #e6e6e6; border: none; "">" + this.Svg + @"
</div>
";
            return html;
        } // End Function RenderFragment 

    } // End Class ImageFragment 


    public class PlainTextFragment : DrawingControl
    {

        public PlainTextFragment(CoreDb.ReadDAL SQL, System.Data.DataRow dr, string pSVG_UID, string pdar_uid) :
                base(SQL, dr, pSVG_UID, pdar_uid)
        { }


        public override string RenderFragment()
        {
            string strText = "";
            if ("date".Equals(this.Format, System.StringComparison.InvariantCultureIgnoreCase))
            {
                strText = System.DateTime.Now.ToString(this.Text, System.Globalization.CultureInfo.InvariantCulture);
            } // End if ("date".Equals(this.Format, System.StringComparison.InvariantCultureIgnoreCase)) 

            if (!string.IsNullOrEmpty(strText))
            {
                if (this.Data != null)
                {
                    foreach (System.Data.DataRow dr in this.Data.Rows)
                    {
                        foreach (System.Data.DataColumn dc in this.Data.Columns)
                        {
                            string strValue = System.Convert.ToString(dr[dc.ColumnName]);
                            strText = strText.Replace("{@" + dc.ColumnName + "}", strValue);
                        } // Next dc 

                    } // Next dr 

                } // End if (this.Data != null) 

                strText = System.Web.HttpUtility.HtmlEncode(strText);
            } // End if (!string.IsNullOrEmpty(strText)) 

            string html = @"
    <div data-type=""text"" data-format=""plain"" style=""position:absolute; display: block; z-index: " + this.Sort + @"; 
left: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + @"cm;
background-color: " + this.Color + @"; 
border: 1px solid " + this.OutlineColor + @"; "">
        <div style=""width: 100%; height: 100%; overflow: hidden;
    font-family: 'Bodoni MT'; font-size: 1cm; padding: 0.25cm; "">
<span>" + strText + @"</span></div>
    </div>";
            return html;
        } // End Function RenderFragment 


    } // End Class PlainTextFragment 


    public class HtmlTextFragment : DrawingControl
    {

        public HtmlTextFragment(CoreDb.ReadDAL SQL, System.Data.DataRow dr, string pSVG_UID, string pdar_uid) :
                base(SQL, dr, pSVG_UID, pdar_uid)
        { }

    } // End Class HtmlTextFragment 


} // End Namespace Portal.Visualiser 
