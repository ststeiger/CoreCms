
namespace PageDesigner.UI
{


    function guid(): string
    {
        function s4()
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        } // End Function s4 

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    } // End Function guid 


    function compareStrings(string1: string, string2: string, ignoreCase: boolean, useLocale: boolean): boolean
    {
        if (string1 == null && string2 == null)
            return true;

        if (string1 == null || string2 == null)
            return false;

        if (ignoreCase)
        {
            if (useLocale)
            {
                string1 = string1.toLocaleLowerCase();
                string2 = string2.toLocaleLowerCase();
            }
            else
            {
                string1 = string1.toLowerCase();
                string2 = string2.toLowerCase();
            }
        } // End if (ignoreCase) 

        return string1 === string2;
    } // End Function compareStrings 


    //export let escapeXml: (input: string) => string = (function ()
    //{
    //    let doc = document.implementation.createDocument("", "", null)
    //        ,el: HTMLElement = doc.createElement("temp") 
    //        , ser = new XMLSerializer();

    //    el.textContent = "temp";
    //    el = <HTMLElement>el.firstChild;

    //    return function (text)
    //    {
    //        el.nodeValue = text;
    //        return ser.serializeToString(el);
    //    };
    //})();


    function htmlEncode(text: string)
    {
        let ret = null, span = document.createElement("span")
        span.appendChild(document.createTextNode(text));
        ret = span.innerHTML;
        span = null;
        return ret;
    } // End Function htmlEncode 


    function getPageSize(w, h)
    {
        // console.log("getPageSize")

        // let A4 = { w: 29.7, h: 21 };
        // let A0 = { w: 84.1, h: 118.9 };
        // let A0quer = { w: A0.h, h: A0.w };
        let someFormat = { "w": w, "h": h };

        function querformat(f)
        {
            let quer = JSON.parse(JSON.stringify(f));
            if (f.h > f.w)
            {
                quer.w = f.h;
                quer.h = f.w;
            }

            return quer;
        } // End Function querformat 

        function hochformat(f)
        {
            let hoch = JSON.parse(JSON.stringify(f));
            if (f.h < f.w)
            {
                hoch.w = f.h;
                hoch.h = f.w;
            }

            return hoch;
        } // End Function hochformat 

        return querformat(someFormat);
    } // End Function getPageSize 


    // PageDesigner.UI.addLogo();
    export function addLogo()
    {
        let page = document.getElementById("page");
        let mes = document.getElementById("measure");

        let dr = {
            "PL_UID": guid(),
            "PL_PLK_UID": mes.getAttribute("data-plk_uid"),
            "PL_Type": "image",
            "PL_Format": null,
            "PL_X": 2.0,
            "PL_Y": 2.0,
            "PL_W": 4.0,
            "PL_H": 1.0,
            "PL_Angle": 0,
            "PL_AspectRatio": "xMinYMin meet",
            "PL_AlignH": null,
            "PL_AlignV": null,
            "PL_Text": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" version="1.1" id="svg9498" width="100%" height="100%" viewBox="-10.6299372 -10.6299372 1530.5224744 375.5911144" preserveAspectRatio="xMinYMin meet"><path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" d="m 265.91,124.35875 -177.17175,0 0,-37.30625 177.17175,0 0,37.30625 z m -1.5525,142.97637 -39.48375,0 0,-115.01512 39.48375,0 0,115.01512 z m -67.45125,0 -39.48,0 0,-115.01512 39.48,0 0,115.01512 z m -67.13875,0 -39.477,0 0,-115.01512 39.477,0 0,115.01512 z M 177.1675,0 C 79.32025,0 0,79.3175 0,177.1625 0,275.01 79.32025,354.33125 177.1675,354.33125 c 97.8475,0 177.165,-79.32125 177.165,-177.16875 C 354.3325,79.3175 275.015,0 177.1675,0" /><path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" d="m 1447.4126,160.865 c 18.75,0 22.3375,15.5525 23.15,30.7175 l -44.2875,0 c 0.3875,-13.5725 4.3875,-30.7175 21.1375,-30.7175 z m 2.4,87.354 c -19.9501,0 -23.5375,-17.15388 -23.5375,-33.89275 l 82.9875,0 c 0,-40.30625 -14.3625,-76.20125 -61.0375,-76.20125 -40.3,0 -60.6375,32.70875 -60.6375,69.81375 0,38.6865 23.125,63.02487 61.8125,63.02487 26.35,0 53.4625,-11.15625 55.4625,-40.6885 l -33.5,0 c -2.4125,11.9575 -9.175,17.94388 -21.55,17.94388 m -153.2001,-83.37775 -27.925,0 0,-49.4575 28.3125,0 c 15.975,0 29.1375,6.76625 29.1375,24.33375 0,17.94375 -13.1625,25.12375 -29.525,25.12375 z M 1327.725,178.01 c 22.35,-6.38 39.1125,-19.94 39.1125,-44.67375 0,-34.7175 -32.325,-46.2775 -62.25,-46.2775 l -74.5925,0 0,180.32137 38.6925,0 0,-73.00637 30.325,0 c 34.7125,0 26.325,48.2675 31.9,73.00637 l 42.3,0 c -19.1625,-33.9175 4,-79.79512 -45.4875,-89.37012 m -176.3275,-3.1925 -33.5137,0 c -0.7975,-9.18 -9.18,-13.9525 -17.9438,-13.9525 -7.9837,0 -19.5537,2.39 -19.1562,12.76 0.4,7.98 9.18,10.37125 15.555,11.95875 l 14.3737,3.60875 c 21.9438,4.78 47.075,13.9525 47.075,40.28525 0,31.90962 -32.7325,41.48587 -59.0587,41.48587 -25.9275,0 -51.4575,-11.5635 -53.45,-39.48975 l 34.71,0 c 1.195,11.16738 9.975,16.74513 20.7475,16.74513 9.5775,0 21.9275,-3.984 21.9275,-15.54788 0,-23.93612 -74.995,-6.78862 -74.995,-55.45737 0,-29.51875 29.53,-39.08875 54.2625,-39.08875 22.7412,0 45.4812,9.17125 49.0675,33.90625 l 0.3987,2.78625 m -123.2662,0 -33.51255,0 c -0.81375,-9.18 -9.18,-13.9525 -17.96,-13.9525 -7.98375,0 -19.55375,2.39 -19.15625,12.76 0.39875,7.98 9.18,10.37125 15.57,11.95875 l 14.35875,3.60875 c 21.94375,4.78 47.07505,13.9525 47.07505,40.28525 0,31.90962 -32.7175,41.48587 -59.04255,41.48587 -25.92875,0 -51.4575,-11.5635 -53.46625,-39.48975 l 34.70875,0 c 1.195,11.16738 9.97625,16.74513 20.74875,16.74513 9.5775,0 21.94375,-3.984 21.94375,-15.54788 0,-23.93612 -75.01125,-6.78862 -75.01125,-55.45737 0,-29.51875 29.53,-39.08875 54.2625,-39.08875 22.7412,0 45.4813,9.17125 49.0675,33.90625 l 0.4138,2.78625 m -165.5763,-56.645 39.90475,0 0,-31.11325 -39.90475,0 0,31.11325 z m 1.195,149.20762 37.499,0 0,-125.67 -37.499,0 0,125.67 z m -105.71875,0 -17.94375,-59.84387 c -4,-13.1625 -6.39,-26.33875 -9.17875,-39.50125 -2.00875,9.58 -3.58625,19.1675 -6.39125,28.33375 l -2.78875,9.97625 -16.74875,61.03512 -44.28625,0 L 619.5975,141.71 l 42.29125,0 17.5625,65.82625 2.39,9.16625 1.99125,8.785 c 0.7975,5.189 1.59375,10.37112 2.39125,15.55375 1.99125,-15.15875 5.59375,-29.51375 9.5775,-43.87625 l 15.5525,-55.455 43.0925,0 16.35,57.84625 c 3.99875,13.565 6.78875,27.12375 8.78125,41.09487 l 1.195,-7.1885 c 1.5925,-11.95887 4.78,-23.52887 8.3825,-35.50012 l 15.5525,-56.2525 40.3025,0 -43.09,125.67012 -43.88875,0 M 605.23,137.72 l -37.1,0 c -0.395,-17.5625 -13.16875,-27.53125 -30.31625,-27.53125 -14.76375,0 -31.91,5.5775 -31.91,23.1475 0,39.8875 104.515,13.5625 104.515,78.9875 0,40.3 -34.70875,58.63987 -71.41,58.63987 -41.89625,0 -76.5975,-14.74462 -76.19625,-60.63362 l 39.49625,0 c 0,19.94512 10.7725,33.50862 31.91,33.50862 15.5625,0 36.31125,-5.57725 36.31125,-24.33612 0,-41.8875 -102.93,-13.55875 -102.93,-80.98 0,-39.90375 37.09875,-55.4575 71.40875,-55.4575 36.3025,0 63.83,17.555 66.22125,54.655" /></svg>`,
            "PL_Outline": false,
            "PL_Style": null,
            "PL_DataBind": null,
            "PL_Sort": getMaxZindex(),
            "PL_Status": 1
        };

        let ptf: DrawingControl = new ImageFragment(dr);

        let html: string = ptf.RenderFragment();
        page.insertAdjacentHTML("beforeend", html);
        PageDesigner.UI.Init();
    }


    // PageDesigner.UI.addDrawing();
    export function addDrawing()
    {
        let page = document.getElementById("page");
        let mes = document.getElementById("measure");

        let dr = {
            "PL_UID": guid(),
            "PL_PLK_UID": mes.getAttribute("data-plk_uid"),
            "PL_Type": "image",
            "PL_Format": null,
            "PL_X": 2.0,
            "PL_Y": 2.0,
            "PL_W": 5.0,
            "PL_H": 5.0,
            "PL_Angle": 0,
            "PL_AspectRatio": "xMinYMin meet",
            "PL_AlignH": null,
            "PL_AlignV": null,
            "PL_Text_DE": null,
            "PL_Text_FR": null,
            "PL_Text_IT": null,
            "PL_Text_EN": null,
            "PL_Outline": false,
            "PL_Style": null,
            "PL_DataBind": null,
            "PL_Sort": getMaxZindex(),
            "PL_Status": 1
        };

        let ptf: DrawingControl = new ImageFragment(dr);

        let html: string = ptf.RenderFragment();
        page.insertAdjacentHTML("beforeend", html);
        PageDesigner.UI.Init();
    }



    // PageDesigner.UI.addTitle();
    export function addTitle()
    {
        let page = document.getElementById("page");
        let mes = document.getElementById("measure");

        let dr = {
            "PL_UID": guid(),
            "PL_PLK_UID": mes.getAttribute("data-plk_uid"),
            "PL_Type": "text",
            "PL_Format": "plain",
            "PL_X": 2.0,
            "PL_Y": 2.0,
            "PL_W": 10.0,
            "PL_H": 2.0,
            "PL_Angle": 0,
            "PL_AspectRatio": null,
            "PL_AlignH": null,
            "PL_AlignV": null,
            "PL_Text": `{@LC_Lang_en} - {@PR_Name} - {@FloorDisplayString} - {@Darstellung}`,
            "PL_Outline": false,
            "PL_Style": null,
            "PL_DataBind": "tfu_VWS_PDF_LegendeTitelDaten_SwissRe",
            "PL_Sort": getMaxZindex(),
            "PL_Status": 1
        };

        let ptf: DrawingControl = new PlainTextFragment(dr);
        let html: string = ptf.RenderFragment();
        page.insertAdjacentHTML("beforeend", html);
        PageDesigner.UI.Init();
    }


    export function addDate()
    {
        let page = document.getElementById("page");
        let mes = document.getElementById("measure");

        let dr = {
            "PL_UID": guid(),
            "PL_PLK_UID": mes.getAttribute("data-plk_uid"),
            "PL_Type": "text",
            "PL_Format": "date",
            "PL_X": 2.0,
            "PL_Y": 2.0,
            "PL_W": 8.0,
            "PL_H": 2.0,
            "PL_Angle": 0,
            "PL_AspectRatio": null,
            "PL_AlignH": null,
            "PL_AlignV": null,
            "PL_Text": `dd'-'MMM'-'yyyy`,
            "PL_Outline": false,
            "PL_Style": null,
            "PL_DataBind": null,
            "PL_Sort": getMaxZindex(),
            "PL_Status": 1
        };

        let ptf: DrawingControl = new PlainTextFragment(dr);
        let html: string = ptf.RenderFragment();
        page.insertAdjacentHTML("beforeend", html);
        PageDesigner.UI.Init();
    }



    // PageDesigner.UI.addLegend();
    export function addLegend()
    {
        let page = document.getElementById("page");
        let mes = document.getElementById("measure");

        let dr = {
            "PL_UID": guid(),
            "PL_PLK_UID": mes.getAttribute("data-plk_uid"),
            "PL_Type": "legend",
            "PL_Format": "html",
            "PL_X": 2.0,
            "PL_Y": 2.0,
            "PL_W": 5.0,
            "PL_H": 5.0,
            "PL_Angle": 0,
            "PL_AspectRatio": null,
            "PL_AlignH": null,
            "PL_AlignV": null,
            "PL_Text_DE": ``,
            "PL_Outline": false,
            "PL_Style": null,
            "PL_DataBind": null,
            "PL_Sort": getMaxZindex(),
            "PL_Status": 1
        };

        let ptf: DrawingControl = new LegendFragment(dr);
        let html: string = ptf.RenderFragment();
        page.insertAdjacentHTML("beforeend", html);
        PageDesigner.UI.Init();
    }



    // PageDesigner.UI.addBorder();
    export function addBorder()
    {
        let page = document.getElementById("page");
        let mes = document.getElementById("measure");

        let dr = {
            "PL_UID": guid(),
            "PL_PLK_UID": mes.getAttribute("data-plk_uid"),
            "PL_Type": "rectangle",
            "PL_Format": null,
            "PL_X": 2.0,
            "PL_Y": 2.0,
            "PL_W": 5.0,
            "PL_H": 5.0,
            "PL_Angle": 0,
            "PL_AspectRatio": null,
            "PL_AlignH": null,
            "PL_AlignV": null,
            "PL_Text_DE": ``,
            "PL_Text_FR": ``,
            "PL_Text_IT": ``,
            "PL_Text_EN": ``,
            "PL_Outline": false,
            "PL_Style": null,
            "PL_DataBind": null,
            "PL_Sort": getMaxZindex(),
            "PL_Status": 1
        };

        let ptf: DrawingControl = new LegendFragment(dr);
        let html: string = ptf.RenderFragment();
        page.insertAdjacentHTML("beforeend", html);
        PageDesigner.UI.Init();
    }





    export function mainMenuApply(dialog) 
    {
        console.log("mainMenuApply");

        let mes = document.getElementById("measure");
        let selPaperFormat = <HTMLSelectElement>document.getElementById("selPaperFormat");
        let selCategory = <HTMLSelectElement>document.getElementById("selCathegory");
        // console.log(selCategory);


        let ps_uid: string = null;
        let plk_code: string = null;
        let paperWidth: number = 84.1;
        let paperHeight: number = 118.9;
        let paperFormat: string = "A0";

        if (selPaperFormat.selectedIndex != -1)
        {
            plk_code = selPaperFormat.options[selPaperFormat.selectedIndex].text;

            if (plk_code != null)
                plk_code = plk_code.substr(0, 10);

            let temp = selPaperFormat.value.split(";");
            ps_uid = temp[0];
            paperWidth = parseFloat(temp[1]) / 10.0;
            paperHeight = parseFloat(temp[2]) / 10.0;
            paperFormat = temp[3];
            // console.log("pwh", paperWidth, paperHeight)
        } // End if (selPaperFormat.selectedIndex != -1) 


        mes.innerHTML = "";
        mes.appendChild(document.createTextNode(paperFormat));

        if (selCategory.selectedIndex != -1)
        {
            if (selCategory.value === 'custom')
            {
                let newCategoryName = document.getElementById("txtNewCategory").value;
                // console.log(newCategoryName);

                let newCategory =
                    {
                        "PLK_UID": guid()
                        , "PLK_Code": plk_code
                        , "PLK_PS_UID": ps_uid
                        , "PLK_DAR_UID": null
                        , "PLK_Name_DE": newCategoryName
                        , "PLK_Name_FR": newCategoryName
                        , "PLK_Name_IT": newCategoryName
                        , "PLK_Name_EN": newCategoryName
                        , "PLK_IsDefault": false
                        , "PLK_Status": 1
                    };

                new Http.Json("../../ajax/anyInsert.ashx?sql=PL_T_VWS_Ref_PdfLegendenKategorie_Insert.sql"
                    , newCategory, function (result)
                    {
                        // console.log("success", result);
                        mes.setAttribute("data-plk_uid", newCategory.PLK_UID);
                        loadElements(dialog, newCategory.PLK_UID, paperWidth, paperHeight);
                    }
                ).send();

                return;
            } // End if (selCategory.value === 'custom') 

            mes.setAttribute("data-plk_uid", selCategory.value);
            loadElements(dialog, selCategory.value, paperWidth, paperHeight);
        } // End if (selCategory.selectedIndex != -1)

        document.getElementById("paperMenu").style.display = "none";
    } // End Function mainMenuApply 


    function loadElements(dialog: HTMLElement, plk_uid: string
        , paperWidth: number, paperHeight: number)
    {
        console.log("loadElements");
        dialog.parentElement.parentElement.style.display = 'none';


        // Set page-Size
        let page = document.getElementById("page");
        // let paperSize = getPageSize(84.1, 118.9);
        page.style.width = paperWidth + "cm";
        page.style.height = paperHeight + "cm";
        PageDesigner.Ruler.drawRuler(paperWidth, paperHeight);

        let tools = document.getElementById("tools");
        tools.style.left = (1 + paperWidth) + "cm";

        let params = { "PL_PLK_UID": plk_uid };
        new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_Load_LegendeByCategory_List.sql", params, function (data)
        {
            // console.log("success", data);
            // window["mydata"] = data;

            // let ls: DrawingControl[] = [];

            for (let i = 0; i < data.length; ++i)
            {
                // console.log(data[i]["PL_UID"]);
                // console.log(data[i]["PL_PLK_UID"]);
                // console.log(data[i]["PL_Type"]);
                // console.log(data[i]["PL_Format"]);
                // console.log(data[i]["PL_X"]);
                // console.log(data[i]["PL_Y"]);
                // console.log(data[i]["PL_W"]);
                // console.log(data[i]["PL_H"]);

                // console.log(data[i]["PL_Angle"]);
                // console.log(data[i]["PL_AspectRatio"]);
                // console.log(data[i]["PL_AlignH"]);
                // console.log(data[i]["PL_AlignV"]);
                // console.log(data[i]["PL_Text"]);

                // console.log(data[i]["PL_Outline"]);
                // console.log(data[i]["PL_Style"]);
                // console.log(data[i]["PL_DataBind"]);
                // console.log(data[i]["PL_Sort"]);

                let pl_type: string = <string>data[i]["PL_Type"];

                // document.getElementById("inSearch").setAttribute("style", "direction: rtl; unicode-bidi: bidi-override;");
                let ctrl: DrawingControl = null;

                if (compareStrings("image", pl_type, true, false))
                {
                    ctrl = new ImageFragment(data[i]);
                }
                else if (compareStrings("text", pl_type, true, false))
                {
                    ctrl = new PlainTextFragment(data[i]);
                }
                else if (compareStrings("legend", pl_type, true, false))
                {
                    ctrl = new LegendFragment(data[i]);
                }
                else if (compareStrings("rectangle", pl_type, true, false))
                {
                    ctrl = new RectangleFragment(data[i]);
                }
                else
                {
                    throw Error(`type "${pl_type}" is not supported in legend`);
                }

                let html = ctrl.RenderFragment();
                // console.log(html); 
                // ls.push(ctrl); 
                page.insertAdjacentHTML("beforeend", html);
            } // Next i 

            PageDesigner.UI.Init();
        }).send();

    } // End Function loadElements 



    export abstract class DrawingControl
    {
        protected m_data: any;
        protected Legende: string;

        protected m_PL_UID: string;
        protected m_X: number;
        protected m_Y: number;
        protected m_Width: number;
        protected m_Height: number;
        protected m_Angle: number;


        protected m_Text: string;
        protected m_Sort: string;
        protected m_AspectRatio: string;

        protected m_Format: string;
        protected m_Type: string;


        constructor(dataRow: any)
        {
            this.RenderFragment = this.RenderFragment.bind(this);

            this.m_data = dataRow;

            this.m_PL_UID = <string>dataRow["PL_UID"];
            this.m_X = <number>dataRow["PL_X"];
            this.m_Y = <number>dataRow["PL_Y"];
            this.m_Width = <number>dataRow["PL_W"];
            this.m_Height = <number>dataRow["PL_H"];
            this.m_Angle = <number>dataRow["PL_Angle"];

            this.m_Text = <string>dataRow["PL_Text"];
            this.m_Sort = <string>dataRow["PL_Sort"];
            this.m_AspectRatio = <string>dataRow["PL_AspectRatio"];

            this.m_Format = <string>dataRow["PL_Format"];
            this.m_Type = <string>dataRow["PL_Type"];

            this.m_dataBind = <string>dataRow["PL_DataBind"];
            if (this.m_dataBind == null)
                this.m_dataBind = null;

        } // End Constructor 


        get PL_UID(): string
        {
            return this.m_PL_UID;
        }

        get X(): number
        {
            return this.m_X;
        }

        get Y(): number
        {
            return this.m_Y;
        }

        get Width(): number
        {
            return this.m_Width;
        }

        get Height(): number
        {
            return this.m_Height;
        }

        get Angle(): number
        {
            return this.m_Angle;
        }


        get Text(): string
        {
            return this.m_Text;
        }

        set Text(value: string)
        {
            this.m_Text = value;
        }


        get Sort(): string
        {
            return this.m_Sort;
        }

        get Type(): string
        {
            return this.m_Type;
        }


        get Format(): string
        {
            return this.m_Format;
        }


        get OutlineColor(): string
        {
            return "hotpink";
        }

        get AspectRatio(): string
        {
            return this.m_AspectRatio;
        }


        protected m_Color: string;

        get Color(): string
        {
            if (compareStrings("legend", this.Type, true, false))
            {
                return "rgb(242,244,246)"; // blue
            }

            if (compareStrings("date", this.Format, true, false))
            {
                return "rgba(255,255,255, 0.5)"; // white
            }

            if (compareStrings("rectangle", this.Type, true, false))
            {
                return "rgba(228, 255, 226, 0.75); border: 1px solid black"; // green
            }

            if (this.m_Color == null)
                this.m_Color = "";

            return this.m_Color;
        }

        set Color(value: string)
        {
            this.m_Color = value;
        }


        protected m_dataBind: string;


        get DataBind(): string
        {
            return this.m_dataBind;
        }

        set DataBind(value: string)
        {
            this.m_dataBind = value;
        }



        protected m_Svg: string;
        get Svg(): string
        {
            return this.m_Svg;
        }


        public RenderFragment(): string 
        {
            throw Error("RenderFragment not implemented...");
        } // End Function RenderFragment 


    } // End Abstract class



    export class RectangleFragment extends DrawingControl
    {

        constructor(dataRow: any)
        {
            super(dataRow);
            this.RenderFragment = this.RenderFragment.bind(this);
            this.m_data = dataRow;
        } // End Constructor 


        public RenderFragment(): string
        {
            let html: string = `
<div id="${this.PL_UID}" data-type="${this.Type}" data-format="${this.Format}" style="display: block; position: absolute;
left: ${this.X}cm; top: ${this.Y}cm; width: ${this.Width}cm; height: ${this.Height}cm;
z-index: ${this.Sort}; background-color: ${this.Color}; border: 1px solid black; " ></div>
`;

            return html;
        } // End Function RenderFragment 


    } // End Class RectangleFragment 



    export class LegendFragment extends DrawingControl
    {
        constructor(dataRow: any)
        {
            super(dataRow);
            this.RenderFragment = this.RenderFragment.bind(this);
            this.m_data = dataRow;
        } // End Constructor 


        public RenderFragment(): string
        {
            if (this.Legende == null)
            {

                if (compareStrings(this.Type, "legend", true, false))
                    this.Legende = "<h3>Legend Placeholder</h3>";
                else
                    this.Legende = '<h3 style="padding: 0.25cm;">Border-Box</h3>';
            }


            let html: string = `
<div id="${this.PL_UID}" data-type="${this.Type}" data-format="${this.Format}" style="display: block; position: absolute;
left: ${this.X}cm; top: ${this.Y}cm; width: ${this.Width}cm; height: ${this.Height}cm;
z-index: ${this.Sort}; background-color: ${this.Color}; border: 1px solid black; " >${this.Legende}</div>
`;
            return html;
        } // End Function RenderFragment 

    } // End Class LegendFragment 



    export class ImageFragment extends DrawingControl
    {

        constructor(dataRow: any)
        {
            super(dataRow);
            this.RenderFragment = this.RenderFragment.bind(this);
            this.m_data = dataRow;
        } // End Constructor 


        public RenderFragment(): string
        {
            if (this.Text != null && this.Text[0] == "~")
            {
                // // this.Text = System.Web.Hosting.HostingEnvironment.MapPath(this.Text);
                // this.Text = System.IO.File.ReadAllText(this.Text, System.Text.Encoding.UTF8)
                console.log("load from FS not implemented", this.Text);
            } // End if (this.Text != null && this.Text[0] == "~") 


            if (this.Text == null)
            {
                this.Text = `<iframe onload="forwardMouse(this);" src= "plan_forum.svg" style="width: 100%; height: 100%; z-index: -5;" frameborder= "0" ></iframe>`;
            } // End if (this.Text == null) 

            if (this.Text != null && this.Text != "")
            {
                let parser = new DOMParser();
                let doc = <SVGSVGElement><any>
                    parser.parseFromString(this.Text, "image/svg+xml").documentElement;
                parser = null;

                let attrWidth = null;
                let attrHeight = null;
                let attrRatio = null;


                doc.setAttribute("width", "100%");
                doc.setAttribute("height", "100%");
                doc.setAttribute("preserveAspectRatio", this.AspectRatio);

                let serializer = new XMLSerializer();
                this.Text = serializer.serializeToString(doc);
                doc = null;
                serializer = null;
            } // End if (this.Text != null && this.Text != "") 

            // whitesmoke
            let html: string = `
<div id="${this.PL_UID}" data-type="image" style="position: absolute; display: block; z-index: ${this.Sort};
left: ${this.X}cm; top: ${this.Y}cm; width: ${this.Width}cm; height: ${this.Height}cm;
background-color: rgba(245,245,245, 0.75); border: 1px solid #e6e6e6; border: none; " >${this.Text}
</div>
`;
            // console.log(this.Text); 
            // console.log(html); 

            return html;
        } // End Function RenderFragment 

    } // End Class ImageFragment 


    export class PlainTextFragment extends DrawingControl
    {


        constructor(dataRow: any)
        {
            super(dataRow);
            this.RenderFragment = this.RenderFragment.bind(this);
            this.m_data = dataRow;
        } // End Constructor 


        public RenderFragment(): string
        {
            let strText: string;

            if (compareStrings("date", this.Format, true, false))
            {
                //// strText = System.DateTime.Now.ToString("dd' - 'MMM' - 'yyyy", System.Globalization.CultureInfo.InvariantCulture);
                //let d:Date = new Date();
                //let day:any = d.getDate();
                //let month: any = d.getMonth();
                //let year: any = d.getFullYear();
                //if (day < 10) day = "0" + day;
                //// if (month < 10) month = "0" + month;
                //// https://stackoverflow.com/questions/1643320/get-month-name-from-date

                //// const locale = "en-us";
                //// month = d.toLocaleString(locale, { month: "short" });

                //let month_names: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                //    , month_names_short: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                //month = month_names_short[month];

                //strText = `${day} - ${month} - ${year}`;
                strText = this.Text;
            }
            else
            {
                strText = this.Text;
            }


            if (strText == null || strText == "")
            {
                strText = "some Text";
            } // End if (strText == null || strText == "") 

            console.log("loadedText");
            // strText = htmlEncode(strText);


            let html: string = `
<div id="${this.PL_UID}" data-databind="${this.DataBind}" data-type="text" data-format="${this.Format}" style="position: absolute; display: block; z-index: ${this.Sort};
left: ${this.X}cm; top: ${this.Y}cm; width: ${this.Width}cm; height: ${this.Height}cm;
background-color: ${this.Color};
border: 1px solid ${this.OutlineColor}; " >
    <div style="width: 100%; height: 100%; overflow: hidden;
font-family: 'Bodoni MT'; font-size: 1cm; padding: 0.25cm; " >
    <span contenteditable="true">${strText}</span>
    </div>
</div>`;

            console.log(html);

            return html;
        } // End Function RenderFragment 


    } // End Class PlainTextFragment 


    export class HtmlTextFragment extends DrawingControl
    {

        constructor(dataRow: any)
        {
            super(dataRow);
            this.RenderFragment = this.RenderFragment.bind(this);
            this.m_data = dataRow;
        } // End Constructor 

    } // End Class HtmlTextFragment 


} // End Namespace PageDesigner.UI 
