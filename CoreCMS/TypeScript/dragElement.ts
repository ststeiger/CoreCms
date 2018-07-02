
namespace PageDesigner.UI 
{

    //let isEdge = false;

    //if (navigator != null && navigator.userAgent != null)
    //{
    //    if (navigator.userAgent.toLowerCase().indexOf("edge/") != -1)
    //        isEdge = true;
    //}


    export function getMaxZindex()
    {
        return Math.max.apply(null,
            Array.prototype.map.call(document.getElementById("page").querySelectorAll("*"),
                function (e, n)
                {
                    let zindex = window.getComputedStyle(e).getPropertyValue("z-index");

                    if ((zindex != 'static') && (zindex != 'auto'))
                        return parseInt(zindex) || 1;

                    return 0;
                }
            )
        );
    } // End Function getMaxZindex 


    export function getMinZindex()
    {
        return Math.min.apply(null,
            Array.prototype.map.call(document.querySelectorAll("#page > div"),
                function (e, n)
                {
                    let zindex = window.getComputedStyle(e).getPropertyValue("z-index");
                    if ((zindex != 'static') && (zindex != 'auto'))
                    {
                        let val = parseInt(zindex);
                        // console.log(val, e);

                        if (val == null || isNaN(val))
                            return 1 / 0;

                        return val;
                    } // End if ((zindex != 'static') && (zindex != 'auto')) 

                    return 0;
                }
            )
        );
    } // End Function getMinZindex 
    
    
    export function translateAll()
    {
        let de = {
            lblComponents: "Komponenten",
            lblBorder: "Rahmen",
            lblLogo: "Logo",
            lblTitle: "Titel",
            lblDate: "Datum",
            lblLegend: "Legende",
            lblDrawing: "Zeichnung",
            lblPaperFormat: "Papierformat",
            lblLayerset:"Darstellung",
            lblCategory: "Kategorie",
            lblSelectLegendToLoad: "Wählen Sie die zu ladende Legende",
            "lblNewCategory": "Neue Kategorie",
            "btnApply": "Anwenden",
            "btnApply2": "Anwenden",
            "lblDelete": "Löschen",
            "lblAlign": "Ausrichten",
            "lblAlign_top_left":"Oben-Links",
            "lblAlign_top_center":"Oben-Mitte",
            "lblAlign_top_right":"Oben-Rechts",
            "lblAlign_middle_left":"Mitte-Links",
            "lblAlign_middle_center":"Mitte-Center",
            "lblAlign_middle_right":"Mitte-Rechts",
            "lblAlign_bottom_left":"Unten-Links",
            "lblAlign_bottom_center":"Unten-Mitte",
            "lblAlign_bottom_right":"Unten-Rechts",
            "lblSendToBack":"in den Hintergrund",
            "lblBringToFront": "in den Vordergrund",
            "lblSendBackward":"eine Ebene nach hinten",
            "lblSendForward": "eine Ebene nach vorn",
            "lblEditData": "Bearbeiten",
            "lblEndEdit":"Bearbeiten beenden",
            "lblSetPosition":"Position/Grösse setzen",
            "lblCut": "Ausschneiden"
            ,"lblTop": "Oben"
            ,"lblLeft": "Links"
            ,"lblWidth": "Breite"
            ,"lblHeight": "Höhe"
        };
        let fr = {
            lblComponents: "Composants",
            lblBorder: "Bordure",
            lblLogo: "Logo",
            lblTitle: "Titre",
            lblDate: "Date",
            lblLegend: "Légende",
            lblDrawing: "Dessin",
            lblPaperFormat: "Format de papier",
            lblLayerset:"Représentation",
            lblCategory:"Catégorie",
            lblSelectLegendToLoad: "Sélectionnez la légende à charger",
            "lblNewCategory": "Neue Kategorie",
            "btnApply": "Appliquer",
            "btnApply2": "Appliquer",
            "lblDelete": "Delete",
            "lblAlign": "Align",
            "lblAlign_top_left":"Top-Left",
            "lblAlign_top_center":"Top-Center",
            "lblAlign_top_right":"Top-Right",
            "lblAlign_middle_left":"Middle-Left",
            "lblAlign_middle_center":"Middle-Center",
            "lblAlign_middle_right":"Middle-Right",
            "lblAlign_bottom_left":"Bottom-Left",
            "lblAlign_bottom_center":"Bottom-Center",
            "lblAlign_bottom_right":"Bottom-Right",
            "lblSendToBack":"Send to Back",
            "lblBringToFront": "Bring to Front",
            "lblSendBackward":"Send Backward",
            "lblSendForward": "Send Forward",
            "lblEditData": "Edit Data",
            "lblEndEdit":"End Edit",
            "lblSetPosition":"Set Position",
            "lblCut": "Cut"

            ,"lblTop": "Oben"
            ,"lblLeft": "Links"
            ,"lblWidth": "Breite"
            ,"lblHeight": "Höhe"
        };
        let it = {
            lblComponents: "Componenti",
            lblBorder: "Bordo",
            lblLogo: "Logo",
            lblTitle: "Titolo",
            lblDate: "Data",
            lblLegend: "Leggenda",
            lblDrawing: "Disegno",
            lblPaperFormat: "Formato cartaceo",
            lblLayerset:"Rappresentazione",
            lblCategory:"Categoria",
            lblSelectLegendToLoad: "Seleziona la legenda da caricare",
            "lblNewCategory": "Neue Kategorie",
            "btnApply": "Applicare",
            "btnApply2": "Applicare",
            "lblDelete": "Delete",
            "lblAlign": "Align",
            "lblAlign_top_left":"Top-Left",
            "lblAlign_top_center":"Top-Center",
            "lblAlign_top_right":"Top-Right",
            "lblAlign_middle_left":"Middle-Left",
            "lblAlign_middle_center":"Middle-Center",
            "lblAlign_middle_right":"Middle-Right",
            "lblAlign_bottom_left":"Bottom-Left",
            "lblAlign_bottom_center":"Bottom-Center",
            "lblAlign_bottom_right":"Bottom-Right",
            "lblSendToBack":"Send to Back",
            "lblBringToFront": "Bring to Front",
            "lblSendBackward":"Send Backward",
            "lblSendForward": "Send Forward",
            "lblEditData": "Edit Data",
            "lblEndEdit":"End Edit",
            "lblSetPosition":"Set Position",
            "lblCut": "Cut"

            ,"lblTop": "Oben"
            ,"lblLeft": "Links"
            ,"lblWidth": "Breite"
            ,"lblHeight": "Höhe"
        };
        let en = {
            lblComponents: "Components",
            lblBorder: "Border",
            lblLogo: "Logo",
            lblTitle: "Title",
            lblDate: "Date",
            lblLegend: "Legend",
            lblDrawing: "Drawing",
            lblPaperFormat: "Paper format",
            lblLayerset: "Representation",
            lblCategory: "Category",
            lblSelectLegendToLoad:"Select legend to load",
            "lblNewCategory": "New Category",
            "btnApply": "Apply",
            "btnApply2": "Apply",
            "lblDelete": "Delete",
            "lblAlign": "Align",
            "lblAlign_top_left":"Top-Left",
            "lblAlign_top_center":"Top-Center",
            "lblAlign_top_right":"Top-Right",
            "lblAlign_middle_left":"Middle-Left",
            "lblAlign_middle_center":"Middle-Center",
            "lblAlign_middle_right":"Middle-Right",
            "lblAlign_bottom_left":"Bottom-Left",
            "lblAlign_bottom_center":"Bottom-Center",
            "lblAlign_bottom_right":"Bottom-Right",
            "lblSendToBack":"Send to Back",
            "lblBringToFront": "Bring to Front",
            "lblSendBackward":"Send Backward",
            "lblSendForward": "Send Forward",
            "lblEditData": "Edit Data",
            "lblEndEdit":"End Edit",
            "lblSetPosition":"Set Position",
            "lblCut": "Cut"
            ,"lblTop": "Top"
            ,"lblLeft": "Left"
            ,"lblWidth": "Width"
            ,"lblHeight": "Height"
        };
        
        let t = { "de" : de, "fr": fr, "it": it, "en":en};

        let sprache = "de";

        for (let k in t[sprache])
        {
            if (t[sprache].hasOwnProperty(k))
            {
                let value = t[sprache][k];
                let ele = document.getElementById(k);
                if (ele == null)
                    continue;
                
                if ( ele.tagName.toUpperCase() === "INPUT")
                {
                    ele.value = value;
                }
                else
                {
                    while(ele.firstChild)
                    {
                        ele.removeChild(ele.firstChild);
                    }
                    
                    let tn = document.createTextNode(value);
                    ele.appendChild(tn);    
                }
                
                
            }
        }
        
    }
    
    
    function dragElement(element)
    {
        // console.log(elmnt)
        if (element == null)
            return;

        // hres: HorizontalResolution
        // vres: VerticalResolution
        let page: HTMLElement = document.getElementById("page")
            , unit: HTMLElement = document.getElementById("measure")
            , recUnit = unit.getBoundingClientRect()
            , hres = recUnit.width //  unit.offsetWidth
            , vres = recUnit.height // unit.offsetHeight
            ;

        // function fX(event) { return (event.touches && event.touches.length) ? event.touches[0].clientX : event.clientX; }
        // function fY(event) { return (event.touches && event.touches.length) ? event.touches[0].clientY : event.clientY; }

        function fX(e: any)
        {
            return (e.touches && e.touches.length) ? e.touches[0].pageX
                : e.pageX || (<MouseEvent>event).pageX || (event.clientX);
        }

        function fY(e: any)
        {
            return (e.touches && e.touches.length) ? e.touches[0].pageY
                : e.pageY || (<MouseEvent>event).pageY || (event.clientY);
        }


        function setRed(left, top, w, h)
        {
            // console.log("ENTER setRed");

            let xaxis1 = document.getElementById("xaxis1");
            let yaxis1 = document.getElementById("yaxis1");

            let xaxis2 = document.getElementById("xaxis2");
            let yaxis2 = document.getElementById("yaxis2");
            
            // console.log(left, top, w, h);
            
            var x = window.scrollX || window.pageXOffset;
            var y = window.scrollY || window.pageYOffset;
            
            // console.log(xaxis, yaxis, left, top);
            // Indicator on y-axis
            xaxis1.style.top = (top - -1).toString() + "cm";
            xaxis1.style.left = x + "px";
            // xaxis1.style["background-color"] = "hotpink";
            
            yaxis1.style.left = (left - -1).toString() + "cm";
            yaxis1.style.top = y + "px";
            // yaxis1.style["background-color"] = "hotpink";
            
            // Indicator on x-axis
            xaxis2.style.top = (top - -1 + h).toString() + "cm";
            xaxis2.style.left = x + "px";
            // xaxis2.style["background-color"] = "hotpink";
            
            yaxis2.style.left = (left - -1 + w).toString() + "cm";
            yaxis2.style.top = y + "px";
            // yaxis2.style["background-color"] = "hotpink";
        }


        let setPos = function (eX, eY)
        {
            // console.log("setPos");

            let ele: HTMLElement = <HTMLElement>page.querySelector(".active")
                , width = ele.offsetWidth
                , height = ele.offsetHeight
                , dragX: any = ele.getAttribute("data-dragoffset-x")
                , dragY: any = ele.getAttribute("data-dragoffset-y")
                , pos = { x: eX - dragX, y: eY - dragY }
                , ow = page.offsetWidth
                , oh = page.offsetHeight
                ;

            if (pos.x < 0)
                pos.x = 0;
            if (pos.y < 0)
                pos.y = 0;

            if (pos.x + width > ow)
                pos.x = ow - width;

            if (pos.y + height > oh)
                pos.y = oh - height;

            // console.log("rest", pos)
            // console.log(ele);

            let le = (pos.x / hres);
            let to = (pos.y / vres);

            ele.style.left = le.toString() + 'cm';
            ele.style.top = to.toString() + 'cm';

            setRed(le, to, width / hres, height / vres);

        }.bind(this);


        function getOffset(el)
        {
            let body = el.ownerDocument.body;

            let _x = 0, _y = 0;
            while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop) && el != body)
            {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;

                el = el.offsetParent;

                // if element = body, then Edge (wrongly?) has a scrollLeft & scrollTop value -
                //if (el === body)
                //{
                //    _x += el.offsetLeft;
                //    _y += el.offsetTop;
                //    break;
                //}
            } // Whend 


            //// Edge-fix
            //if (isEdge)
            //{
            //    _x += window.scrollX;
            //    _y += window.scrollY;
            //}


            // return { left: _x, top: _y };
            return { x: _x, y: _y };
        } // End Functin getOffset 


        function addStyle(styleDict: string[], key: string, value: string): void
        {
            styleDict.push(key);
            styleDict[key] = value;
        } // End Function addStyle 


        function removeStyle(styleDict: string[], key: string): void
        {
            let index: number = styleDict.indexOf(key);

            if (index > -1)
            {
                styleDict.splice(index, 1);
            }

        } // End Function removeStyle 


        function styleToDict(style: string): string[]
        {
            let styleDict: string[] = [], kvp: string[], key: string, kvps: string[] = style.split(";");
            for (let i = 0; i < kvps.length; i++)
            {
                kvp = kvps[i].split(':');
                key = kvp[0].toLowerCase().trim();
                if (key === "") continue;
                styleDict.push(key);
                styleDict[key] = kvp[1].trim();
            } // Next i 

            return styleDict;
        } // End Function styleToDict 


        function dictToStyle(styleDict: string[]) 
        {
            let style = "";
            for (let i = 0; i < styleDict.length; ++i)
            {
                style = style + styleDict[i] + ": " + styleDict[styleDict[i]] + "; ";
            } // Next i 

            return style;
        } // End Function dictToStyle 


        let setSize = function (eX, eY)
        {
            // console.log("setSize");
            let ele: HTMLElement = <HTMLElement>page.querySelector(".resizing")
                , bcr = getOffset(ele)
                , w = eX - bcr.x
                , h = eY - bcr.y;

            if (w < 0.4 * hres)
                w = 0.4 * hres;
            if (h < 0.4 * vres)
                h = 0.4 * vres;


            // ele.style.width = w + "px";
            // ele.style.height = h + "px";
            // console.log("wnp", w / hres);
            // console.log("hnp", h / hres);

            // ele.style.width = (w / hres) + "cm";
            // ele.style.height = (h / vres) + "cm";

            let styles = styleToDict(ele.getAttribute("style"));
            removeStyle(styles, "width");
            removeStyle(styles, "height");

            // addStyle(styles, "width", (w / 1.0) + "px");
            // addStyle(styles, "height", (h / 1.0) + "px");

            addStyle(styles, "width", (w / hres) + "cm");
            addStyle(styles, "height", (h / vres) + "cm");

            let style = dictToStyle(styles);
            ele.setAttribute("style", style);

            setRed(parseFloat(ele.style.left), parseFloat(ele.style.top), (w / hres), (h / vres));

            // console.log("width", ele.style.width);
            // console.log("height", ele.style.height);

            //let img = ele.getElementsByTagName("img")[0];
            //if (img != null)
            //{
            //    img.style.width = pos.x - bcr.x + "px";
            //    img.style.height = pos.y - bcr.y + "px";
            //}
        }.bind(this);



        // https://stackoverflow.com/questions/4909167/how-to-add-a-custom-right-click-menu-to-a-webpage
        element.oncontextmenu = function (ele, e)
        {
            console.log("ctxdown", e);
            e = e || event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            //ele = e.target;

            //while ((ele.id || "") == "")
            //{
            //    ele = ele.parentElement;
            //}

            let ctx = document.getElementById("contextmenu")
                , ctxParent = getOffset(ele.offsetParent)
                , pos = { x: fX(e) - ctxParent.x, y: fY(e) - ctxParent.y }
                , zindex = getMaxZindex() + 1;

            // console.log("maxz", getMaxZindex());

            PageDesigner.ContextMenu.hasDoneSomething = false;
            
            let ctele = (ele.innerHTML || "").toLowerCase();
            
            if (ctele.indexOf("jodit") != -1)
            {
                document.getElementById("mnuAlign").style.display = "none";
                document.getElementById("lblEditData").style.display = "none";
                document.getElementById("lblEndEdit").style.display = "block";
            }
            else if (ctele.indexOf("svg") != -1  || ctele.indexOf("iframe") != -1 ) 
            {
                document.getElementById("mnuAlign").style.display = "block";
                document.getElementById("lblEditData").style.display = "none";
                document.getElementById("lblEndEdit").style.display = "none";
            }
            else
            {
                document.getElementById("mnuAlign").style.display = "none";
                document.getElementById("lblEditData").style.display = "block";
                document.getElementById("lblEndEdit").style.display = "none";
            }
            
            
            let sx = (window.scrollX | window.pageXOffset);
            let sy = (window.scrollY | window.pageYOffset);

            let px = fX(e);
            let py = fY(e);


            ctx.setAttribute("data-open-x", px);
            ctx.setAttribute("data-open-y", py);

            ctx.setAttribute("data-open-scroll-x", sx.toString());
            ctx.setAttribute("data-open-scroll-y", sy.toString());


            ctx.setAttribute("data-elementId", ele.id);
            ctx.style.left = pos.x + "px";
            ctx.style.top = pos.y + "px";
            ctx.style["z-index"] = zindex;
            ctx.style["z-index"] = 999999999; // apparently must be higher than page's z-index
            ctx.style.display = "block";
            return;

            /*
            console.log("E:", ele);
            console.log("T:", e.target);
            
            // console.log("E:", ele.getBoundingClientRect());
            console.log("Top:", ele.offsetTop);
            console.log("Left:", ele.offsetLeft);
            console.log("W:", ele.offsetWidth);
            console.log("H:", ele.offsetHeight);
            
            for (let j = 0; j < 10; ++j)
            {
                let div = document.createElement("div");
                div.id = "contextmenu"
                div.setAttribute("style", "position:relative; display: block; left: 0px; top: 0px; width: 300px; height: 150px; background-color: hotpink; z-index: 9999999");
                div.appendChild(document.createTextNode("Pos" + ++this.i));
                
                // prepend:
                document.body.insertBefore(div, document.body.firstChild)
                
                // document.body.appendChild(div);
            }
            */
            //alert(e);
        }.bind(this, element);

        this.i = 0;


        element.onmousedown = element.ontouchstart = function (ele, e) 
        {
            console.log("drag mousedown");
            e = e || event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            // 0: touch, 1: left, 3: right 
            if ((e.keyCode || e.which) == 3)
                return;


            let xaxis1 = document.getElementById("xaxis1");
            let yaxis1 = document.getElementById("yaxis1");

            let xaxis2 = document.getElementById("xaxis2");
            let yaxis2 = document.getElementById("yaxis2");


            xaxis1.style.display = "block";
            yaxis1.style.display = "block";
            xaxis2.style.display = "block";
            yaxis2.style.display = "block";


            ele.style["z-index"] = getMaxZindex() + 1;

            ele.setAttribute("data-dragoffset-x", fX(e) - ele.offsetLeft);
            ele.setAttribute("data-dragoffset-y", fY(e) - ele.offsetTop);
            ele.classList.add("active");
        }.bind(this, element);



        element.onmouseup = element.ontouchend = function (ele, e) 
        {
            console.log("onmouseup");
            e = e || event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            if (ele == null)
                return;

            if ((e.keyCode || e.which) == 3)
                return;

            let xaxis1 = document.getElementById("xaxis1");
            let yaxis1 = document.getElementById("yaxis1");

            let xaxis2 = document.getElementById("xaxis2");
            let yaxis2 = document.getElementById("yaxis2");

            xaxis1.style.display = "none";
            yaxis1.style.display = "none";
            xaxis2.style.display = "none";
            yaxis2.style.display = "none";

            ele.classList.remove("active");
            ele.removeAttribute("data-dragoffset-x");
            ele.removeAttribute("data-dragoffset-y");

            ele.classList.remove("resizing");

            PageDesigner.UI.dispatchSave();
        }.bind(this, element);


        element.onmouseenter = function (ele, e)
        {
            return;
            // e = e || event;
            // console.log(e);
            if (PageDesigner.ContextMenu.inEditMode != null && PageDesigner.ContextMenu.inEditMode === true)
            {
                ele.style.cursor = "default";
                return;
            }

            ele.style.cursor = "move";
        }.bind(this, element);


        let d = document.createElement("div");
        // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
        d.setAttribute("style", [
            "display: block; position:absolute; opacity: 0.2; "
            , "width: 0.4cm; height: 0.4cm; background-color: #42cbed; "
            , "bottom: -0.2cm; right: -0.2cm; cursor: nwse-resize;"
        ].join("")
        );

        window["prevent_touch_move"] = false;

        d.onmousedown = d.ontouchstart = function (ele, resizer, e)
        {
            window["prevent_touch_move"] = true;
            ele.style["z-index"] = getMaxZindex() + 1;

            e = e || event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

            console.log("resizing");


            let xaxis1 = document.getElementById("xaxis1");
            let yaxis1 = document.getElementById("yaxis1");

            let xaxis2 = document.getElementById("xaxis2");
            let yaxis2 = document.getElementById("yaxis2");


            xaxis1.style.display = "block";
            yaxis1.style.display = "block";
            xaxis2.style.display = "block";
            yaxis2.style.display = "block";




            // ele.setAttribute("data-dragoffset-x", fX(e) - ele.offsetLeft);
            // ele.setAttribute("data-dragoffset-y", fY(e) - ele.offsetTop);
            // ele.setAttribute("data-dragoffset-x", "0");
            // ele.setAttribute("data-dragoffset-y", "0");

            // console.log("offset", getOffset(ele));

            // ele.setAttribute("data-dragoffset-x", getOffset(ele).x);
            // ele.setAttribute("data-dragoffset-y", getOffset(ele).y + ele.offsetHeight);
            // console.log(ele);

            // ele.setAttribute("data-dragoffset-x", ele.offsetLeft);
            // ele.setAttribute("data-dragoffset-y", ele.offsetTop + ele.offsetHeight);
            ele.classList.add("resizing");
        }.bind(this, element, d);

        /*
        d.onmouseup = d.ontouchend = function (ele, resizer, e)
        {
            window["prevent_touch_move"] = false;
            e = e || event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

            if (ele == null)
                return;


            ele.classList.remove("resizing");
            ele.removeAttribute("data-dragoffset-x");
            ele.removeAttribute("data-dragoffset-y");
        }.bind(this, element, d);
        */

        element.appendChild(d);


        page.onmousemove = page.ontouchmove = function (e)
        {
            // console.log("onmousemove");
            e = e || event;

            // alert(window.prevent_touch_move)
            if (window["prevent_touch_move"])
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

            let x = fX(e);
            let y = fY(e);

            window.setTimeout(
                function ()
                {

                    if (page.querySelector(".active") != null)
                    {
                        setPos(x, y);
                    }

                    if (page.querySelector(".resizing") != null)
                    {
                        setSize(x, y);
                    }

                }.bind(this), 1
            );

        }.bind(this);

    } // End Function dragElement


    // //////////////////////////////////////////


    function askUser()
    {
        return;
        // console.log("askUser");

        //speechSynthesis.onvoiceschanged = function ()
        //{
        //    let voices = this.getVoices();
        //    console.log(voices);
        //};

        // console.log(window.speechSynthesis.getVoices());


        function speak(sentence, lang)
        {
            try 
            {
                // utterance.cancel(); 
                window.speechSynthesis.cancel(); // Cancel the entire queue 

                // Wait with uttering until the cancel-job will have been finished. 
                window.setTimeout(
                    function ()
                    {
                        let utterance = new SpeechSynthesisUtterance(sentence);
                        utterance.lang = lang;
                        // utterance.voice = voices[4]; 
                        window.speechSynthesis.speak(utterance);
                        utterance = null;
                    }, 200
                );

            }
            catch (e)
            {
                console.log(e);
            }

        } // End Function speak 

        // speak("Please specify the desired paper format", "en-GB");
        speak("Please specify the desired paper format", "en-US");
        // speak("Bitte wählen sie das gewünschte Papierformat", "de-DE"); // Exact match on MSFT...
        //speak("Bitte wählen sie das gewünschte Papierformat", "de-CH");
        //speak("Veuillez sélectionner le format de papier désiré s'il vous plaît", "fr-CH");
        //speak("Per favore scegli il formato di pagina desiderato", "it-CH");
        //speak("請選擇所需的頁面格式", "zh-CN");
        //speak("Выберите нужный формат страницы", "ru-RU");
        //speak("Por favor elija el formato de página deseado", "es-ES");
        //speak("Escolha o formato da página desejada", "pt-BR");
        //speak("必要なページフォーマットを選択してください", "ja-JA");
        //speak("Proszę wybrać żądany format strony", "pl-PL");
        //speak("원하는 페이지 형식을 선택하십시오.", "ko-KO");
        // speak("Alegeți formatul paginii dorite", "ro-RO");
        // speak("будь ласка, виберіть потрібний формат сторінки", "uk-UA");
        // speak("будь ласка, виберіть потрібний формат сторінки", "uk-RU");
        // speak("Vui lòng chọn định dạng trang mong muốn", "vi-VN");
        // speak("vänligen välj önskat sidformat", "se-SE");
        // speak("الرجاء اختيار تنسيق الصفحة المطلوبة", "ar-MA");

    }

    export function dispatchSave()
    {
        // PageDesigner.ContextMenu.killJudy()

        let evtName = "saveData";
        let saveEvent = new CustomEvent(evtName,
            {
                detail: {
                    withError: false
                }
            }
        );

        if (document.dispatchEvent)
            window.dispatchEvent(saveEvent);
        else
            //document.documentElement[evtName]++;
            document.documentElement[evtName] = saveEvent;
    }

    function listenSave()
    {

        function saveData()
        {
            let note = document.getElementById("saveNotifier");
            note.style.opacity = "0";
            note.style.display = "block";

            window.setTimeout(
                function ()
                {
                    saveData2();
                }, 100
            );

        } // End Function saveData 

        function saveData2()
        {
            console.log("saving data");
            let note = document.getElementById("saveNotifier");

            note.innerHTML = "";
            note.appendChild(document.createTextNode("Saving"));


            note.style.position = "fixed";
            note.style.top = "50%";
            note.style.left = "50%";
            note.style.transform = "translate(-50%, -50%)";

            note.style.width = "50vw";
            note.style.height = "25vh";
            note.style["line-height"] = "25vh";
            note.style["text-align"] = "center";


            note.style.color = "#F0F0F0";
            note.style["font-family"] = "Arial";
            note.style["font-size"] = "3cm";
            note.style["font-weight"] = "bold";

            note.style["background-color"] = "rgba(160, 160, 160, 0.6)"; // "#A0A0A0A0";
            note.style["border-radius"] = "3mm";
            note.style.padding = "0.5cm";
            note.style["z-index"] = 99999999;
            //note.style.display = "block";
            note.style.opacity = "1";



            function getObjectData(ele: HTMLElement): any
            {
                // console.log("getObjectData")
                let aspect = null;
                let data: any = {
                    "id": ele.getAttribute("id")
                    , "aspect": null
                    , "halign": null
                    , "valign": null
                    , "text": null
                    , "type": ele.getAttribute("data-type")
                    , "format": ele.getAttribute("data-format")
                    , "databind": ele.getAttribute("data-databind")
                };

                let svg = null, ifrm: HTMLElement = null;

                // let svg = ele.getElementsByTagName("svg")[0];
                // let ifrm = ele.getElementsByTagName("iframe")[0];

                if (ele.firstElementChild.tagName.toLowerCase() == 'svg')
                    svg = ele.firstElementChild;

                if (ele.firstElementChild.tagName.toLowerCase() == 'iframe')
                {
                    try
                    {
                        // TODO: Firefox, oh Firefox, Fix Firefox ? 
                        ifrm = (<HTMLIFrameElement>ele.firstElementChild).contentWindow.document.documentElement;
                    }
                    catch (e)
                    {
                        ifrm = null;
                    }

                }

                if (ifrm != null)
                {
                    aspect = ifrm.getAttribute("preserveAspectRatio");
                    data["aspect"] = aspect;
                    return data;
                } // End if (ifrm != null && ifrm.length > 0) 

                if (svg != null)
                {
                    aspect = svg.getAttribute("preserveAspectRatio");
                    data["aspect"] = aspect;

                    let serializer = new XMLSerializer();
                    data["text"] = serializer.serializeToString(svg);
                    serializer = null;

                    // let serializer = new XMLSerializer();
                    // data["svg"] = serializer.serializeToString(svg);

                    return data;
                } // End if (svg != null && svg.length > 0) 


                let div: HTMLDivElement = <HTMLDivElement>ele.querySelector("div[contenteditable]");
                if (div != null)
                {
                    // console.log("div", div);
                    aspect = div.style["text-align"];
                    // console.log("text-aspect", aspect)
                    if (aspect === "") aspect = null;

                    data["halign"] = aspect;
                    return data;
                } // End if (div != null) 

                let span = ele.querySelector("span[contenteditable]");
                if (span != null)
                {
                    console.log("span", span);
                    //data["text"] = span.textContent || span.innerHTML;
                    data["text"] = span.innerHTML;
                }

                //ele.style["text-align"] = ['left', 'center', 'right'][horizontal];

                // console.log(ele);
                return data;
            } // End Function getObjectData 

            let saveData = [], divs: NodeListOf<HTMLDivElement> = <NodeListOf<HTMLDivElement>>document.querySelectorAll("#page > div");
            // debugger;
            for (let i = 0; i < divs.length; ++i)
            {
                if (divs[i].id === "positionMenu")
                    continue;

                // console.log(da[i]);
                // console.log(da[i].style.left);
                // console.log(da[i].style.top);
                // console.log(da[i].style.width);
                // console.log(da[i].style.height);
                // console.log(da[i].style["z-index"]);

                let objectData = getObjectData(divs[i]);
                // console.log("ele", divs[i])
                // console.log(objectData)

                if (objectData.type === "null" || objectData.type === "undefined")
                    objectData.type = null;

                if (objectData.format === "null" || objectData.format === "undefined")
                    objectData.format = null;

                let mes = document.getElementById("measure");

                saveData.push(
                    {
                        // "id": divs[i].id
                        // "PL_PLK_UID": null // UID
                        "PL_UID": objectData.id
                        , "PL_PLK_UID": mes.getAttribute("data-plk_uid")
                        , "PL_Type": objectData.type // varchar(255)
                        , "PL_Format": objectData.format // varchar(255)

                        , "PL_X": parseFloat(divs[i].style.left) // float
                        , "PL_Y": parseFloat(divs[i].style.top) // float
                        , "PL_W": parseFloat(divs[i].style.width) // float
                        , "PL_H": parseFloat(divs[i].style.height) // float
                        , "PL_Angle": 0 // float

                        , "PL_AspectRatio": objectData.aspect // nvarchar(255)
                        , "PL_AlignH": objectData.halign // nvarchar(255)
                        , "PL_AlignV": objectData.valign // nvarchar(255)

                        , "PL_Text_DE": objectData["text"] // nvarchar(255)
                        , "PL_Text_FR": objectData["text"] // nvarchar(255)
                        , "PL_Text_IT": objectData["text"] // nvarchar(255)
                        , "PL_Text_EN": objectData["text"] // nvarchar(255)

                        , "PL_Outline": false // bit
                        , "PL_Style": null // varchar(8000)
                        , "PL_DataBind": objectData["databind"] // nvarchar(255)
                        , "PL_Sort": parseInt(divs[i].style["z-index"])
                    }
                );

            } // Next i
            
            console.log("saveData", JSON.stringify(saveData, null, 2));
            
            new Http.Json("../../ajax/anyInsert.ashx?sql=PL_T_VWS_PdfLegende_Insert.sql", JSON.stringify(saveData))
                .success(
                function (result)
                {

                    function saveSuccess()
                    {
                        note.innerHTML = "";
                        note.appendChild(document.createTextNode("Gespeichert"));
                        note.style["background-color"] = "limegreen";
                        
                        window.setTimeout(
                            function ()
                            {
                                note.style.opacity = "0";

                                window.setTimeout(
                                    function ()
                                    {
                                        note.style.display = "none";
                                        // note.style.top = "60%";
                                        // note.style.left = "70%";
                                        note.style.top = "60vh";
                                        note.style.left = "70vw";
                                    }, 1000
                                );

                            }, 500
                        );

                    } // End Function saveSuccess 

                    console.log("success", result);
                    saveSuccess();
                })
                .failure(function (err: any)
                {
                    console.log("PL_T_VWS_PdfLegende_Insert: failure");
                    console.log(err);

                    function saveFailure()
                    {
                        note.innerHTML = "";
                        note.appendChild(document.createTextNode("Fehler"));
                        note.style["background-color"] = "red";

                        window.setTimeout(
                            function ()
                            {
                                note.style.opacity = "0";

                                window.setTimeout(
                                    function ()
                                    {
                                        note.style.display = "none";
                                        note.style.top = "60%";
                                        note.style.left = "70%";
                                    }, 1000
                                );
                            }, 500
                        );

                    } // End Function saveFailure 

                    saveFailure();


                    // console.clear();
                    if (err.message)
                    {
                        console.log(err.message);
                        console.log(JSON.stringify(err, null, 2));
                    } // End if (err.message) 
                })
                .send();

        } // End Function saveData2

        if (document.addEventListener)
            window.addEventListener("saveData", saveData);
        else if (document.attachEvent)
            document.attachCustomEvent("saveData", saveData);
    } // End Function listenSave


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


    export function toggleCustomCategory(obj)
    {
        // console.log("toggleCustomCategory");
        // console.log("toggleCustomCategory", obj);

        // let custcat = <HTMLSelectElement>document.getElementById("selCathegory");
        // if (obj.selectedIndex == -1) return;
        // obj.options[custcat.selectedIndex].value
        // obj.options[custcat.selectedIndex].value
        if (obj.value === 'custom')
        {
            document.getElementById('customCategory').style.display = 'block';
            askUser();
        }
        else
            document.getElementById('customCategory').style.display = 'none';
    } // End Function toggleCustomCategory 


    function clearPaper()
    {
        // console.log("clearing");

        let horizontalRuler = document.querySelector("div #horizontalRuler");
        let verticalRuler = document.querySelector("div #verticalRuler");
        let page = document.getElementById("page");

        let hruler = horizontalRuler.getElementsByClassName("ruler")[0];
        let hscale = horizontalRuler.getElementsByClassName("scale")[0];

        let vruler = verticalRuler.getElementsByClassName("ruler")[0];
        let vscale = verticalRuler.getElementsByClassName("scale")[0];

        let elements: Element[] = [hruler, hscale, vruler, vscale, page];

        function empty(e: Element)
        {
            while (e.lastChild)
            {
                e.removeChild(e.lastChild);
            } // Whend 
        } // End Function empty 

        for (let i = 0; i < elements.length; ++i)
            empty(elements[i])
    } // End Function clearPaper


    export function mainMenu()
    {
        console.log("mainMenu");
        clearPaper();
        
        PageDesigner.UI.iOsBlocker();

        let pm = document.getElementById("paperMenu");

        pm.style.position = "fixed";
        pm.style.top = "50vh"; // "50%";
        pm.style.left = "50vw"; // "50%";
        pm.style.transform = "translate(-50%, -50%)";
        //pm.style["box-shadow"] = "0px 0px 3mm rgba(172, 172,172, 1)";
        //pm.style["box-shadow"] = "0px 0px 3mm rgba(172, 172,172, 1)";
        pm.style["box-shadow"] = "0px 0px 3mm rgba(111, 111,111, 0.85)";

        pm.style.width = "13cm";
        pm.style.height = "30vh";

        //pm.style.top = "50vw";
        //pm.style.left = "50vh";

        // https://www.rapidtables.com/web/color/pink-color.html
        // pm.style["background-color"] = "rgba(255, 20, 147, 1)"; // DeepPink 	#FF1493
        // pm.style["background-color"] = "rgba(255, 105, 180, 1)"; // HotPink 	#FF69B4
        // pm.style["background-color"] = "rgba(255, 182, 193, 1)"; // lightpink 	#FFB6C1
        // pm.style["background-color"] = "rgba(255, 192, 203, 1)"; // pink 	#FFC0CB

        pm.style["background-color"] = "rgba(240, 240, 240, 0.94)";
        pm.style["border-radius"] = "3mm";
        pm.style.padding = "0.5cm";
        pm.style["z-index"] = 99999999;


        let elePS: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selPaperFormat");
        let eleDAR: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selDarstellung");
        let elePLK: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selCathegory");


        //let getPaperFormats =
        new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_DropDown_PaperSize_List.sql", null, function (data)
        {
            // console.log("success", data);
            HtmlTools.popDrop(elePS, data);

            pm.style.display = "block";
        }).send();


        //let getDarstellungen =
        new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_DropDown_Darstellung_List.sql", null, function (data)
        {
            // console.log("success", data); 
            // data.splice(data, 0, { v: null, t: "All", s: 1 }); 
            data.splice(data, 0, { v: "00000000-0000-0000-0000-000000000000", t: "Alle", s: 1 });
            // console.log("modified", data, typeof (data));

            HtmlTools.popDrop(eleDAR, data);

            pm.style.display = "block";
        }).send();


        function reloadCategory()
        {
            let ps_uid = null, dar_uid = null;

            if (elePS.selectedIndex != -1)
                ps_uid = elePS.options[elePS.selectedIndex].value.split(';')[0];

            if (eleDAR.selectedIndex != -1)
                dar_uid = eleDAR.options[eleDAR.selectedIndex].value;

            if (ps_uid == null || dar_uid == null)
                return false;

            // console.log("reloadCategory: ", "ps_uid", ps_uid, "dar_uid", dar_uid);

            if (ps_uid == null) ps_uid = null;
            if (dar_uid == null) dar_uid = null;

            let parameter = {
                "in_sprache": "EN"
                , "PS_UID": ps_uid
                , "DAR_UID": dar_uid
            };

            // console.log("param", parameter)
            
            
            new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_Load_LegendCategory_List.sql"
                , parameter
                , function (data) 
                {
                    // console.log("success", data); 
                    // data.splice(data, 0, { v: "custom", t: "Custom", s: 1 });
                    data.push({ v: "custom", t: "Custom", s: 0 });
                    // console.log("modified", data, typeof (data)); 

                    HtmlTools.popDrop(elePLK, data);
                    pm.style.display = "block";
                }).send();
        } // End Function reloadCategory 

        elePS.onchange = reloadCategory;
        eleDAR.onchange = reloadCategory;

        PageDesigner.UI.translateAll();
        // https://stackoverflow.com/questions/4386300/javascript-dom-how-to-remove-all-events-of-a-dom-object
        // elePS.removeEventListener("change", reloadCategory, false)
        // eleDAR.removeEventListener("change", reloadCategory, false)
        // HtmlTools.addEvent(elePS, "change", reloadCategory);
        // HtmlTools.addEvent(eleDAR, "change", reloadCategory);
    } // End Function mainMenu 


    export function Init()
    {
        // Make the DIV element draggagle:

        // dragElement(document.getElementById("drawing"));
        // dragElement(document.getElementById("title"));
        // dragElement(document.getElementById("logo"));
        // dragElement(document.getElementById("north_arrow"));
        // dragElement(document.getElementById("legend"));
        // dragElement(document.getElementById("printdate"));
        // dragElement(document.getElementById("legende_footer"));
        // dragElement(document.getElementById("drawing_border"));

        document.getElementById("measure").onclick = mainMenu;

        let items = document.querySelectorAll("#page > div");

        for (let i = 0; i < items.length; ++i)
        {
            // console.log("registering drag for ", items[i]);
            dragElement(items[i]);
        } // Next i 

        listenSave();
    } // End Function Init 


} // End Namespace PageDesigner.UI 
