var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PageDesigner;
(function (PageDesigner) {
    var UI;
    (function (UI) {
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        function compareStrings(string1, string2, ignoreCase, useLocale) {
            if (string1 == null && string2 == null)
                return true;
            if (string1 == null || string2 == null)
                return false;
            if (ignoreCase) {
                if (useLocale) {
                    string1 = string1.toLocaleLowerCase();
                    string2 = string2.toLocaleLowerCase();
                }
                else {
                    string1 = string1.toLowerCase();
                    string2 = string2.toLowerCase();
                }
            }
            return string1 === string2;
        }
        function htmlEncode(text) {
            var ret = null, span = document.createElement("span");
            span.appendChild(document.createTextNode(text));
            ret = span.innerHTML;
            span = null;
            return ret;
        }
        function getPageSize(w, h) {
            var someFormat = { "w": w, "h": h };
            function querformat(f) {
                var quer = JSON.parse(JSON.stringify(f));
                if (f.h > f.w) {
                    quer.w = f.h;
                    quer.h = f.w;
                }
                return quer;
            }
            function hochformat(f) {
                var hoch = JSON.parse(JSON.stringify(f));
                if (f.h < f.w) {
                    hoch.w = f.h;
                    hoch.h = f.w;
                }
                return hoch;
            }
            return querformat(someFormat);
        }
        function addLogo() {
            var page = document.getElementById("page");
            var mes = document.getElementById("measure");
            var dr = {
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
                "PL_Text": "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\" version=\"1.1\" id=\"svg9498\" width=\"100%\" height=\"100%\" viewBox=\"-10.6299372 -10.6299372 1530.5224744 375.5911144\" preserveAspectRatio=\"xMinYMin meet\"><path style=\"fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"m 265.91,124.35875 -177.17175,0 0,-37.30625 177.17175,0 0,37.30625 z m -1.5525,142.97637 -39.48375,0 0,-115.01512 39.48375,0 0,115.01512 z m -67.45125,0 -39.48,0 0,-115.01512 39.48,0 0,115.01512 z m -67.13875,0 -39.477,0 0,-115.01512 39.477,0 0,115.01512 z M 177.1675,0 C 79.32025,0 0,79.3175 0,177.1625 0,275.01 79.32025,354.33125 177.1675,354.33125 c 97.8475,0 177.165,-79.32125 177.165,-177.16875 C 354.3325,79.3175 275.015,0 177.1675,0\" /><path style=\"fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"m 1447.4126,160.865 c 18.75,0 22.3375,15.5525 23.15,30.7175 l -44.2875,0 c 0.3875,-13.5725 4.3875,-30.7175 21.1375,-30.7175 z m 2.4,87.354 c -19.9501,0 -23.5375,-17.15388 -23.5375,-33.89275 l 82.9875,0 c 0,-40.30625 -14.3625,-76.20125 -61.0375,-76.20125 -40.3,0 -60.6375,32.70875 -60.6375,69.81375 0,38.6865 23.125,63.02487 61.8125,63.02487 26.35,0 53.4625,-11.15625 55.4625,-40.6885 l -33.5,0 c -2.4125,11.9575 -9.175,17.94388 -21.55,17.94388 m -153.2001,-83.37775 -27.925,0 0,-49.4575 28.3125,0 c 15.975,0 29.1375,6.76625 29.1375,24.33375 0,17.94375 -13.1625,25.12375 -29.525,25.12375 z M 1327.725,178.01 c 22.35,-6.38 39.1125,-19.94 39.1125,-44.67375 0,-34.7175 -32.325,-46.2775 -62.25,-46.2775 l -74.5925,0 0,180.32137 38.6925,0 0,-73.00637 30.325,0 c 34.7125,0 26.325,48.2675 31.9,73.00637 l 42.3,0 c -19.1625,-33.9175 4,-79.79512 -45.4875,-89.37012 m -176.3275,-3.1925 -33.5137,0 c -0.7975,-9.18 -9.18,-13.9525 -17.9438,-13.9525 -7.9837,0 -19.5537,2.39 -19.1562,12.76 0.4,7.98 9.18,10.37125 15.555,11.95875 l 14.3737,3.60875 c 21.9438,4.78 47.075,13.9525 47.075,40.28525 0,31.90962 -32.7325,41.48587 -59.0587,41.48587 -25.9275,0 -51.4575,-11.5635 -53.45,-39.48975 l 34.71,0 c 1.195,11.16738 9.975,16.74513 20.7475,16.74513 9.5775,0 21.9275,-3.984 21.9275,-15.54788 0,-23.93612 -74.995,-6.78862 -74.995,-55.45737 0,-29.51875 29.53,-39.08875 54.2625,-39.08875 22.7412,0 45.4812,9.17125 49.0675,33.90625 l 0.3987,2.78625 m -123.2662,0 -33.51255,0 c -0.81375,-9.18 -9.18,-13.9525 -17.96,-13.9525 -7.98375,0 -19.55375,2.39 -19.15625,12.76 0.39875,7.98 9.18,10.37125 15.57,11.95875 l 14.35875,3.60875 c 21.94375,4.78 47.07505,13.9525 47.07505,40.28525 0,31.90962 -32.7175,41.48587 -59.04255,41.48587 -25.92875,0 -51.4575,-11.5635 -53.46625,-39.48975 l 34.70875,0 c 1.195,11.16738 9.97625,16.74513 20.74875,16.74513 9.5775,0 21.94375,-3.984 21.94375,-15.54788 0,-23.93612 -75.01125,-6.78862 -75.01125,-55.45737 0,-29.51875 29.53,-39.08875 54.2625,-39.08875 22.7412,0 45.4813,9.17125 49.0675,33.90625 l 0.4138,2.78625 m -165.5763,-56.645 39.90475,0 0,-31.11325 -39.90475,0 0,31.11325 z m 1.195,149.20762 37.499,0 0,-125.67 -37.499,0 0,125.67 z m -105.71875,0 -17.94375,-59.84387 c -4,-13.1625 -6.39,-26.33875 -9.17875,-39.50125 -2.00875,9.58 -3.58625,19.1675 -6.39125,28.33375 l -2.78875,9.97625 -16.74875,61.03512 -44.28625,0 L 619.5975,141.71 l 42.29125,0 17.5625,65.82625 2.39,9.16625 1.99125,8.785 c 0.7975,5.189 1.59375,10.37112 2.39125,15.55375 1.99125,-15.15875 5.59375,-29.51375 9.5775,-43.87625 l 15.5525,-55.455 43.0925,0 16.35,57.84625 c 3.99875,13.565 6.78875,27.12375 8.78125,41.09487 l 1.195,-7.1885 c 1.5925,-11.95887 4.78,-23.52887 8.3825,-35.50012 l 15.5525,-56.2525 40.3025,0 -43.09,125.67012 -43.88875,0 M 605.23,137.72 l -37.1,0 c -0.395,-17.5625 -13.16875,-27.53125 -30.31625,-27.53125 -14.76375,0 -31.91,5.5775 -31.91,23.1475 0,39.8875 104.515,13.5625 104.515,78.9875 0,40.3 -34.70875,58.63987 -71.41,58.63987 -41.89625,0 -76.5975,-14.74462 -76.19625,-60.63362 l 39.49625,0 c 0,19.94512 10.7725,33.50862 31.91,33.50862 15.5625,0 36.31125,-5.57725 36.31125,-24.33612 0,-41.8875 -102.93,-13.55875 -102.93,-80.98 0,-39.90375 37.09875,-55.4575 71.40875,-55.4575 36.3025,0 63.83,17.555 66.22125,54.655\" /></svg>",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            var ptf = new ImageFragment(dr);
            var html = ptf.RenderFragment();
            page.insertAdjacentHTML("beforeend", html);
            PageDesigner.UI.Init();
        }
        UI.addLogo = addLogo;
        function addDrawing() {
            var page = document.getElementById("page");
            var mes = document.getElementById("measure");
            var dr = {
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
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            var ptf = new ImageFragment(dr);
            var html = ptf.RenderFragment();
            page.insertAdjacentHTML("beforeend", html);
            PageDesigner.UI.Init();
        }
        UI.addDrawing = addDrawing;
        function addTitle() {
            var page = document.getElementById("page");
            var mes = document.getElementById("measure");
            var dr = {
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
                "PL_Text": "{@LC_Lang_en} - {@PR_Name} - {@FloorDisplayString} - {@Darstellung}",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": "tfu_VWS_PDF_LegendeTitelDaten_SwissRe",
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            var ptf = new PlainTextFragment(dr);
            var html = ptf.RenderFragment();
            page.insertAdjacentHTML("beforeend", html);
            PageDesigner.UI.Init();
        }
        UI.addTitle = addTitle;
        function addDate() {
            var page = document.getElementById("page");
            var mes = document.getElementById("measure");
            var dr = {
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
                "PL_Text": "dd'-'MMM'-'yyyy",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            var ptf = new PlainTextFragment(dr);
            var html = ptf.RenderFragment();
            page.insertAdjacentHTML("beforeend", html);
            PageDesigner.UI.Init();
        }
        UI.addDate = addDate;
        function addLegend() {
            var page = document.getElementById("page");
            var mes = document.getElementById("measure");
            var dr = {
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
                "PL_Text_DE": "",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            var ptf = new LegendFragment(dr);
            var html = ptf.RenderFragment();
            page.insertAdjacentHTML("beforeend", html);
            PageDesigner.UI.Init();
        }
        UI.addLegend = addLegend;
        function addBorder() {
            var page = document.getElementById("page");
            var mes = document.getElementById("measure");
            var dr = {
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
                "PL_Text_DE": "",
                "PL_Text_FR": "",
                "PL_Text_IT": "",
                "PL_Text_EN": "",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            var ptf = new LegendFragment(dr);
            var html = ptf.RenderFragment();
            page.insertAdjacentHTML("beforeend", html);
            PageDesigner.UI.Init();
        }
        UI.addBorder = addBorder;
        function mainMenuApply(dialog) {
            console.log("mainMenuApply");
            var mes = document.getElementById("measure");
            var selPaperFormat = document.getElementById("selPaperFormat");
            var selCategory = document.getElementById("selCathegory");
            var ps_uid = null;
            var plk_code = null;
            var paperWidth = 84.1;
            var paperHeight = 118.9;
            var paperFormat = "A0";
            if (selPaperFormat.selectedIndex != -1) {
                plk_code = selPaperFormat.options[selPaperFormat.selectedIndex].text;
                if (plk_code != null)
                    plk_code = plk_code.substr(0, 10);
                var temp = selPaperFormat.value.split(";");
                ps_uid = temp[0];
                paperWidth = parseFloat(temp[1]) / 10.0;
                paperHeight = parseFloat(temp[2]) / 10.0;
                paperFormat = temp[3];
            }
            mes.innerHTML = "";
            mes.appendChild(document.createTextNode(paperFormat));
            if (selCategory.selectedIndex != -1) {
                if (selCategory.value === 'custom') {
                    var newCategoryName = document.getElementById("txtNewCategory").value;
                    var newCategory_1 = {
                        "PLK_UID": guid(),
                        "PLK_Code": plk_code,
                        "PLK_PS_UID": ps_uid,
                        "PLK_DAR_UID": null,
                        "PLK_Name_DE": newCategoryName,
                        "PLK_Name_FR": newCategoryName,
                        "PLK_Name_IT": newCategoryName,
                        "PLK_Name_EN": newCategoryName,
                        "PLK_IsDefault": false,
                        "PLK_Status": 1
                    };
                    new Http.Json("../../ajax/anyInsert.ashx?sql=PL_T_VWS_Ref_PdfLegendenKategorie_Insert.sql", newCategory_1, function (result) {
                        mes.setAttribute("data-plk_uid", newCategory_1.PLK_UID);
                        loadElements(dialog, newCategory_1.PLK_UID, paperWidth, paperHeight);
                    }).send();
                    return;
                }
                mes.setAttribute("data-plk_uid", selCategory.value);
                loadElements(dialog, selCategory.value, paperWidth, paperHeight);
            }
            document.getElementById("paperMenu").style.display = "none";
        }
        UI.mainMenuApply = mainMenuApply;
        function loadElements(dialog, plk_uid, paperWidth, paperHeight) {
            console.log("loadElements");
            dialog.parentElement.parentElement.style.display = 'none';
            var page = document.getElementById("page");
            page.style.width = paperWidth + "cm";
            page.style.height = paperHeight + "cm";
            PageDesigner.Ruler.drawRuler(paperWidth, paperHeight);
            var tools = document.getElementById("tools");
            tools.style.left = (1 + paperWidth) + "cm";
            var params = { "PL_PLK_UID": plk_uid };
            new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_Load_LegendeByCategory_List.sql", params, function (data) {
                for (var i = 0; i < data.length; ++i) {
                    var pl_type = data[i]["PL_Type"];
                    var ctrl = null;
                    if (compareStrings("image", pl_type, true, false)) {
                        ctrl = new ImageFragment(data[i]);
                    }
                    else if (compareStrings("text", pl_type, true, false)) {
                        ctrl = new PlainTextFragment(data[i]);
                    }
                    else if (compareStrings("legend", pl_type, true, false)) {
                        ctrl = new LegendFragment(data[i]);
                    }
                    else if (compareStrings("rectangle", pl_type, true, false)) {
                        ctrl = new RectangleFragment(data[i]);
                    }
                    else {
                        throw Error("type \"" + pl_type + "\" is not supported in legend");
                    }
                    var html = ctrl.RenderFragment();
                    page.insertAdjacentHTML("beforeend", html);
                }
                PageDesigner.UI.Init();
            }).send();
        }
        var DrawingControl = (function () {
            function DrawingControl(dataRow) {
                this.RenderFragment = this.RenderFragment.bind(this);
                this.m_data = dataRow;
                this.m_PL_UID = dataRow["PL_UID"];
                this.m_X = dataRow["PL_X"];
                this.m_Y = dataRow["PL_Y"];
                this.m_Width = dataRow["PL_W"];
                this.m_Height = dataRow["PL_H"];
                this.m_Angle = dataRow["PL_Angle"];
                this.m_Text = dataRow["PL_Text"];
                this.m_Sort = dataRow["PL_Sort"];
                this.m_AspectRatio = dataRow["PL_AspectRatio"];
                this.m_Format = dataRow["PL_Format"];
                this.m_Type = dataRow["PL_Type"];
            }
            Object.defineProperty(DrawingControl.prototype, "PL_UID", {
                get: function () {
                    return this.m_PL_UID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "X", {
                get: function () {
                    return this.m_X;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Y", {
                get: function () {
                    return this.m_Y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Width", {
                get: function () {
                    return this.m_Width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Height", {
                get: function () {
                    return this.m_Height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Angle", {
                get: function () {
                    return this.m_Angle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Text", {
                get: function () {
                    return this.m_Text;
                },
                set: function (value) {
                    this.m_Text = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Sort", {
                get: function () {
                    return this.m_Sort;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Type", {
                get: function () {
                    return this.m_Type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Format", {
                get: function () {
                    return this.m_Format;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "OutlineColor", {
                get: function () {
                    return "hotpink";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "AspectRatio", {
                get: function () {
                    return this.m_AspectRatio;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Color", {
                get: function () {
                    if (compareStrings("legend", this.Type, true, false)) {
                        return "rgb(242,244,246)";
                    }
                    if (compareStrings("date", this.Format, true, false)) {
                        return "rgba(255,255,255, 0.5)";
                    }
                    if (compareStrings("rectangle", this.Type, true, false)) {
                        return "rgba(228, 255, 226, 0.75); border: 1px solid black";
                    }
                    if (this.m_Color == null)
                        this.m_Color = "";
                    return this.m_Color;
                },
                set: function (value) {
                    this.m_Color = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Svg", {
                get: function () {
                    return this.m_Svg;
                },
                enumerable: true,
                configurable: true
            });
            DrawingControl.prototype.RenderFragment = function () {
                throw Error("RenderFragment not implemented...");
            };
            return DrawingControl;
        }());
        UI.DrawingControl = DrawingControl;
        var RectangleFragment = (function (_super) {
            __extends(RectangleFragment, _super);
            function RectangleFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            RectangleFragment.prototype.RenderFragment = function () {
                var html = "\n<div id=\"" + this.PL_UID + "\" data-type=\"" + this.Type + "\" data-format=\"" + this.Format + "\" style=\"display: block; position: absolute;\nleft: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + "cm;\nz-index: " + this.Sort + "; background-color: " + this.Color + "; border: 1px solid black; \" ></div>\n";
                return html;
            };
            return RectangleFragment;
        }(DrawingControl));
        UI.RectangleFragment = RectangleFragment;
        var LegendFragment = (function (_super) {
            __extends(LegendFragment, _super);
            function LegendFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            LegendFragment.prototype.RenderFragment = function () {
                if (this.Legende == null) {
                    if (compareStrings(this.Type, "legend", true, false))
                        this.Legende = "<h3>Legend Placeholder</h3>";
                    else
                        this.Legende = '<h3 style="padding: 0.25cm;">Border-Box</h3>';
                }
                var html = "\n<div id=\"" + this.PL_UID + "\" data-type=\"" + this.Type + "\" data-format=\"" + this.Format + "\" style=\"display: block; position: absolute;\nleft: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + "cm;\nz-index: " + this.Sort + "; background-color: " + this.Color + "; border: 1px solid black; \" >" + this.Legende + "</div>\n";
                return html;
            };
            return LegendFragment;
        }(DrawingControl));
        UI.LegendFragment = LegendFragment;
        var ImageFragment = (function (_super) {
            __extends(ImageFragment, _super);
            function ImageFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            ImageFragment.prototype.RenderFragment = function () {
                if (this.Text != null && this.Text[0] == "~") {
                    console.log("load from FS not implemented", this.Text);
                }
                if (this.Text == null) {
                    this.Text = "<iframe onload=\"forwardMouse(this);\" src= \"plan_forum.svg\" style=\"width: 100%; height: 100%; z-index: -5;\" frameborder= \"0\" ></iframe>";
                }
                if (this.Text != null && this.Text != "") {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(this.Text, "image/svg+xml").documentElement;
                    parser = null;
                    var attrWidth = null;
                    var attrHeight = null;
                    var attrRatio = null;
                    doc.setAttribute("width", "100%");
                    doc.setAttribute("height", "100%");
                    doc.setAttribute("preserveAspectRatio", this.AspectRatio);
                    var serializer = new XMLSerializer();
                    this.Text = serializer.serializeToString(doc);
                    doc = null;
                    serializer = null;
                }
                var html = "\n<div id=\"" + this.PL_UID + "\" data-type=\"image\" style=\"position: absolute; display: block; z-index: " + this.Sort + ";\nleft: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + "cm;\nbackground-color: rgba(245,245,245, 0.75); border: 1px solid #e6e6e6; border: none; \" >" + this.Text + "\n</div>\n";
                return html;
            };
            return ImageFragment;
        }(DrawingControl));
        UI.ImageFragment = ImageFragment;
        var PlainTextFragment = (function (_super) {
            __extends(PlainTextFragment, _super);
            function PlainTextFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            PlainTextFragment.prototype.RenderFragment = function () {
                var strText;
                if (compareStrings("date", this.Format, true, false)) {
                    strText = this.Text;
                }
                else {
                    strText = this.Text;
                }
                if (strText == null || strText == "") {
                    strText = "some Text";
                }
                strText = htmlEncode(strText);
                var html = "\n<div id=\"" + this.PL_UID + "\" data-type=\"text\" data-format=\"" + this.Format + "\" style=\"position: absolute; display: block; z-index: " + this.Sort + ";\nleft: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + "cm;\nbackground-color: " + this.Color + ";\nborder: 1px solid " + this.OutlineColor + "; \" >\n    <div style=\"width: 100%; height: 100%; overflow: hidden;\nfont-family: 'Bodoni MT'; font-size: 1cm; padding: 0.25cm; \" >\n    <span contenteditable=\"true\">" + strText + "</span>\n    </div>\n</div>";
                return html;
            };
            return PlainTextFragment;
        }(DrawingControl));
        UI.PlainTextFragment = PlainTextFragment;
        var HtmlTextFragment = (function (_super) {
            __extends(HtmlTextFragment, _super);
            function HtmlTextFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            return HtmlTextFragment;
        }(DrawingControl));
        UI.HtmlTextFragment = HtmlTextFragment;
    })(UI = PageDesigner.UI || (PageDesigner.UI = {}));
})(PageDesigner || (PageDesigner = {}));
