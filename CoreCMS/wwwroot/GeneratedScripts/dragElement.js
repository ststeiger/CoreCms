var PageDesigner;
(function (PageDesigner) {
    var UI;
    (function (UI) {
        function getMaxZindex() {
            return Math.max.apply(null, Array.prototype.map.call(document.getElementById("page").querySelectorAll("*"), function (e, n) {
                var zindex = window.getComputedStyle(e).getPropertyValue("z-index");
                if ((zindex != 'static') && (zindex != 'auto'))
                    return parseInt(zindex) || 1;
                return 0;
            }));
        }
        UI.getMaxZindex = getMaxZindex;
        function getMinZindex() {
            return Math.min.apply(null, Array.prototype.map.call(document.querySelectorAll("#page > div"), function (e, n) {
                var zindex = window.getComputedStyle(e).getPropertyValue("z-index");
                if ((zindex != 'static') && (zindex != 'auto')) {
                    var val = parseInt(zindex);
                    if (val == null || isNaN(val))
                        return 1 / 0;
                    return val;
                }
                return 0;
            }));
        }
        UI.getMinZindex = getMinZindex;
        function translateAll() {
            var de = {
                lblComponents: "Komponenten",
                lblBorder: "Rahmen",
                lblLogo: "Logo",
                lblTitle: "Titel",
                lblDate: "Datum",
                lblLegend: "Legende",
                lblDrawing: "Zeichnung",
                lblPaperFormat: "Papierformat",
                lblLayerset: "Darstellung",
                lblCategory: "Kategorie",
                lblSelectLegendToLoad: "Wählen Sie die zu ladende Legende",
                "lblNewCategory": "Neue Kategorie",
                "btnApply": "Anwenden",
                "btnApply2": "Anwenden",
                "lblDelete": "Löschen",
                "lblAlign": "Ausrichten",
                "lblAlign_top_left": "Oben-Links",
                "lblAlign_top_center": "Oben-Mitte",
                "lblAlign_top_right": "Oben-Rechts",
                "lblAlign_middle_left": "Mitte-Links",
                "lblAlign_middle_center": "Mitte-Center",
                "lblAlign_middle_right": "Mitte-Rechts",
                "lblAlign_bottom_left": "Unten-Links",
                "lblAlign_bottom_center": "Unten-Mitte",
                "lblAlign_bottom_right": "Unten-Rechts",
                "lblSendToBack": "in den Hintergrund",
                "lblBringToFront": "in den Vordergrund",
                "lblSendBackward": "eine Ebene nach hinten",
                "lblSendForward": "eine Ebene nach vorn",
                "lblEditData": "Bearbeiten",
                "lblEndEdit": "Bearbeiten beenden",
                "lblSetPosition": "Position/Grösse setzen",
                "lblCut": "Ausschneiden",
                "lblTop": "Oben",
                "lblLeft": "Links",
                "lblWidth": "Breite",
                "lblHeight": "Höhe"
            };
            var fr = {
                lblComponents: "Composants",
                lblBorder: "Bordure",
                lblLogo: "Logo",
                lblTitle: "Titre",
                lblDate: "Date",
                lblLegend: "Légende",
                lblDrawing: "Dessin",
                lblPaperFormat: "Format de papier",
                lblLayerset: "Représentation",
                lblCategory: "Catégorie",
                lblSelectLegendToLoad: "Sélectionnez la légende à charger",
                "lblNewCategory": "Neue Kategorie",
                "btnApply": "Appliquer",
                "btnApply2": "Appliquer",
                "lblDelete": "Delete",
                "lblAlign": "Align",
                "lblAlign_top_left": "Top-Left",
                "lblAlign_top_center": "Top-Center",
                "lblAlign_top_right": "Top-Right",
                "lblAlign_middle_left": "Middle-Left",
                "lblAlign_middle_center": "Middle-Center",
                "lblAlign_middle_right": "Middle-Right",
                "lblAlign_bottom_left": "Bottom-Left",
                "lblAlign_bottom_center": "Bottom-Center",
                "lblAlign_bottom_right": "Bottom-Right",
                "lblSendToBack": "Send to Back",
                "lblBringToFront": "Bring to Front",
                "lblSendBackward": "Send Backward",
                "lblSendForward": "Send Forward",
                "lblEditData": "Edit Data",
                "lblEndEdit": "End Edit",
                "lblSetPosition": "Set Position",
                "lblCut": "Cut",
                "lblTop": "Oben",
                "lblLeft": "Links",
                "lblWidth": "Breite",
                "lblHeight": "Höhe"
            };
            var it = {
                lblComponents: "Componenti",
                lblBorder: "Bordo",
                lblLogo: "Logo",
                lblTitle: "Titolo",
                lblDate: "Data",
                lblLegend: "Leggenda",
                lblDrawing: "Disegno",
                lblPaperFormat: "Formato cartaceo",
                lblLayerset: "Rappresentazione",
                lblCategory: "Categoria",
                lblSelectLegendToLoad: "Seleziona la legenda da caricare",
                "lblNewCategory": "Neue Kategorie",
                "btnApply": "Applicare",
                "btnApply2": "Applicare",
                "lblDelete": "Delete",
                "lblAlign": "Align",
                "lblAlign_top_left": "Top-Left",
                "lblAlign_top_center": "Top-Center",
                "lblAlign_top_right": "Top-Right",
                "lblAlign_middle_left": "Middle-Left",
                "lblAlign_middle_center": "Middle-Center",
                "lblAlign_middle_right": "Middle-Right",
                "lblAlign_bottom_left": "Bottom-Left",
                "lblAlign_bottom_center": "Bottom-Center",
                "lblAlign_bottom_right": "Bottom-Right",
                "lblSendToBack": "Send to Back",
                "lblBringToFront": "Bring to Front",
                "lblSendBackward": "Send Backward",
                "lblSendForward": "Send Forward",
                "lblEditData": "Edit Data",
                "lblEndEdit": "End Edit",
                "lblSetPosition": "Set Position",
                "lblCut": "Cut",
                "lblTop": "Oben",
                "lblLeft": "Links",
                "lblWidth": "Breite",
                "lblHeight": "Höhe"
            };
            var en = {
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
                lblSelectLegendToLoad: "Select legend to load",
                "lblNewCategory": "New Category",
                "btnApply": "Apply",
                "btnApply2": "Apply",
                "lblDelete": "Delete",
                "lblAlign": "Align",
                "lblAlign_top_left": "Top-Left",
                "lblAlign_top_center": "Top-Center",
                "lblAlign_top_right": "Top-Right",
                "lblAlign_middle_left": "Middle-Left",
                "lblAlign_middle_center": "Middle-Center",
                "lblAlign_middle_right": "Middle-Right",
                "lblAlign_bottom_left": "Bottom-Left",
                "lblAlign_bottom_center": "Bottom-Center",
                "lblAlign_bottom_right": "Bottom-Right",
                "lblSendToBack": "Send to Back",
                "lblBringToFront": "Bring to Front",
                "lblSendBackward": "Send Backward",
                "lblSendForward": "Send Forward",
                "lblEditData": "Edit Data",
                "lblEndEdit": "End Edit",
                "lblSetPosition": "Set Position",
                "lblCut": "Cut",
                "lblTop": "Top",
                "lblLeft": "Left",
                "lblWidth": "Width",
                "lblHeight": "Height"
            };
            var t = { "de": de, "fr": fr, "it": it, "en": en };
            var sprache = "de";
            for (var k in t[sprache]) {
                if (t[sprache].hasOwnProperty(k)) {
                    var value = t[sprache][k];
                    var ele = document.getElementById(k);
                    if (ele == null)
                        continue;
                    if (ele.tagName.toUpperCase() === "INPUT") {
                        ele.value = value;
                    }
                    else {
                        while (ele.firstChild) {
                            ele.removeChild(ele.firstChild);
                        }
                        var tn = document.createTextNode(value);
                        ele.appendChild(tn);
                    }
                }
            }
        }
        UI.translateAll = translateAll;
        function dragElement(element) {
            if (element == null)
                return;
            var page = document.getElementById("page"), unit = document.getElementById("measure"), recUnit = unit.getBoundingClientRect(), hres = recUnit.width, vres = recUnit.height;
            function fX(e) {
                return (e.touches && e.touches.length) ? e.touches[0].pageX
                    : e.pageX || event.pageX || (event.clientX);
            }
            function fY(e) {
                return (e.touches && e.touches.length) ? e.touches[0].pageY
                    : e.pageY || event.pageY || (event.clientY);
            }
            function setRed(left, top, w, h) {
                var xaxis1 = document.getElementById("xaxis1");
                var yaxis1 = document.getElementById("yaxis1");
                var xaxis2 = document.getElementById("xaxis2");
                var yaxis2 = document.getElementById("yaxis2");
                var x = window.scrollX || window.pageXOffset;
                var y = window.scrollY || window.pageYOffset;
                xaxis1.style.top = (top - -1).toString() + "cm";
                xaxis1.style.left = x + "px";
                yaxis1.style.left = (left - -1).toString() + "cm";
                yaxis1.style.top = y + "px";
                xaxis2.style.top = (top - -1 + h).toString() + "cm";
                xaxis2.style.left = x + "px";
                yaxis2.style.left = (left - -1 + w).toString() + "cm";
                yaxis2.style.top = y + "px";
            }
            var setPos = function (eX, eY) {
                var ele = page.querySelector(".active"), width = ele.offsetWidth, height = ele.offsetHeight, dragX = ele.getAttribute("data-dragoffset-x"), dragY = ele.getAttribute("data-dragoffset-y"), pos = { x: eX - dragX, y: eY - dragY }, ow = page.offsetWidth, oh = page.offsetHeight;
                if (pos.x < 0)
                    pos.x = 0;
                if (pos.y < 0)
                    pos.y = 0;
                if (pos.x + width > ow)
                    pos.x = ow - width;
                if (pos.y + height > oh)
                    pos.y = oh - height;
                var le = (pos.x / hres);
                var to = (pos.y / vres);
                ele.style.left = le.toString() + 'cm';
                ele.style.top = to.toString() + 'cm';
                setRed(le, to, width / hres, height / vres);
            }.bind(this);
            function getOffset(el) {
                var body = el.ownerDocument.body;
                var _x = 0, _y = 0;
                while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop) && el != body) {
                    _x += el.offsetLeft - el.scrollLeft;
                    _y += el.offsetTop - el.scrollTop;
                    el = el.offsetParent;
                }
                return { x: _x, y: _y };
            }
            function addStyle(styleDict, key, value) {
                styleDict.push(key);
                styleDict[key] = value;
            }
            function removeStyle(styleDict, key) {
                var index = styleDict.indexOf(key);
                if (index > -1) {
                    styleDict.splice(index, 1);
                }
            }
            function styleToDict(style) {
                var styleDict = [], kvp, key, kvps = style.split(";");
                for (var i = 0; i < kvps.length; i++) {
                    kvp = kvps[i].split(':');
                    key = kvp[0].toLowerCase().trim();
                    if (key === "")
                        continue;
                    styleDict.push(key);
                    styleDict[key] = kvp[1].trim();
                }
                return styleDict;
            }
            function dictToStyle(styleDict) {
                var style = "";
                for (var i = 0; i < styleDict.length; ++i) {
                    style = style + styleDict[i] + ": " + styleDict[styleDict[i]] + "; ";
                }
                return style;
            }
            var setSize = function (eX, eY) {
                var ele = page.querySelector(".resizing"), bcr = getOffset(ele), w = eX - bcr.x, h = eY - bcr.y;
                if (w < 0.4 * hres)
                    w = 0.4 * hres;
                if (h < 0.4 * vres)
                    h = 0.4 * vres;
                var styles = styleToDict(ele.getAttribute("style"));
                removeStyle(styles, "width");
                removeStyle(styles, "height");
                addStyle(styles, "width", (w / hres) + "cm");
                addStyle(styles, "height", (h / vres) + "cm");
                var style = dictToStyle(styles);
                ele.setAttribute("style", style);
                setRed(parseFloat(ele.style.left), parseFloat(ele.style.top), (w / hres), (h / vres));
            }.bind(this);
            element.oncontextmenu = function (ele, e) {
                console.log("ctxdown", e);
                e = e || event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                var ctx = document.getElementById("contextmenu"), ctxParent = getOffset(ele.offsetParent), pos = { x: fX(e) - ctxParent.x, y: fY(e) - ctxParent.y }, zindex = getMaxZindex() + 1;
                PageDesigner.ContextMenu.hasDoneSomething = false;
                var ctele = (ele.innerHTML || "").toLowerCase();
                if (ctele.indexOf("jodit") != -1) {
                    document.getElementById("mnuAlign").style.display = "none";
                    document.getElementById("lblEditData").style.display = "none";
                    document.getElementById("lblEndEdit").style.display = "block";
                }
                else if (ctele.indexOf("svg") != -1 || ctele.indexOf("iframe") != -1) {
                    document.getElementById("mnuAlign").style.display = "block";
                    document.getElementById("lblEditData").style.display = "none";
                    document.getElementById("lblEndEdit").style.display = "none";
                }
                else {
                    document.getElementById("mnuAlign").style.display = "none";
                    document.getElementById("lblEditData").style.display = "block";
                    document.getElementById("lblEndEdit").style.display = "none";
                }
                var sx = (window.scrollX | window.pageXOffset);
                var sy = (window.scrollY | window.pageYOffset);
                var px = fX(e);
                var py = fY(e);
                ctx.setAttribute("data-open-x", px);
                ctx.setAttribute("data-open-y", py);
                ctx.setAttribute("data-open-scroll-x", sx.toString());
                ctx.setAttribute("data-open-scroll-y", sy.toString());
                ctx.setAttribute("data-elementId", ele.id);
                ctx.style.left = pos.x + "px";
                ctx.style.top = pos.y + "px";
                ctx.style["z-index"] = zindex;
                ctx.style["z-index"] = 999999999;
                ctx.style.display = "block";
                return;
            }.bind(this, element);
            this.i = 0;
            element.onmousedown = element.ontouchstart = function (ele, e) {
                console.log("drag mousedown");
                e = e || event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                if ((e.keyCode || e.which) == 3)
                    return;
                var xaxis1 = document.getElementById("xaxis1");
                var yaxis1 = document.getElementById("yaxis1");
                var xaxis2 = document.getElementById("xaxis2");
                var yaxis2 = document.getElementById("yaxis2");
                xaxis1.style.display = "block";
                yaxis1.style.display = "block";
                xaxis2.style.display = "block";
                yaxis2.style.display = "block";
                ele.style["z-index"] = getMaxZindex() + 1;
                ele.setAttribute("data-dragoffset-x", fX(e) - ele.offsetLeft);
                ele.setAttribute("data-dragoffset-y", fY(e) - ele.offsetTop);
                ele.classList.add("active");
            }.bind(this, element);
            element.onmouseup = element.ontouchend = function (ele, e) {
                console.log("onmouseup");
                e = e || event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                if (ele == null)
                    return;
                if ((e.keyCode || e.which) == 3)
                    return;
                var xaxis1 = document.getElementById("xaxis1");
                var yaxis1 = document.getElementById("yaxis1");
                var xaxis2 = document.getElementById("xaxis2");
                var yaxis2 = document.getElementById("yaxis2");
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
            element.onmouseenter = function (ele, e) {
                return;
                if (PageDesigner.ContextMenu.inEditMode != null && PageDesigner.ContextMenu.inEditMode === true) {
                    ele.style.cursor = "default";
                    return;
                }
                ele.style.cursor = "move";
            }.bind(this, element);
            var d = document.createElement("div");
            d.setAttribute("style", [
                "display: block; position:absolute; opacity: 0.2; ",
                "width: 0.4cm; height: 0.4cm; background-color: #42cbed; ",
                "bottom: -0.2cm; right: -0.2cm; cursor: nwse-resize;"
            ].join(""));
            window["prevent_touch_move"] = false;
            d.onmousedown = d.ontouchstart = function (ele, resizer, e) {
                window["prevent_touch_move"] = true;
                ele.style["z-index"] = getMaxZindex() + 1;
                e = e || event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                console.log("resizing");
                var xaxis1 = document.getElementById("xaxis1");
                var yaxis1 = document.getElementById("yaxis1");
                var xaxis2 = document.getElementById("xaxis2");
                var yaxis2 = document.getElementById("yaxis2");
                xaxis1.style.display = "block";
                yaxis1.style.display = "block";
                xaxis2.style.display = "block";
                yaxis2.style.display = "block";
                ele.classList.add("resizing");
            }.bind(this, element, d);
            element.appendChild(d);
            page.onmousemove = page.ontouchmove = function (e) {
                e = e || event;
                if (window["prevent_touch_move"])
                    e.preventDefault ? e.preventDefault() : e.returnValue = false;
                var x = fX(e);
                var y = fY(e);
                window.setTimeout(function () {
                    if (page.querySelector(".active") != null) {
                        setPos(x, y);
                    }
                    if (page.querySelector(".resizing") != null) {
                        setSize(x, y);
                    }
                }.bind(this), 1);
            }.bind(this);
        }
        function askUser() {
            return;
            function speak(sentence, lang) {
                try {
                    window.speechSynthesis.cancel();
                    window.setTimeout(function () {
                        var utterance = new SpeechSynthesisUtterance(sentence);
                        utterance.lang = lang;
                        window.speechSynthesis.speak(utterance);
                        utterance = null;
                    }, 200);
                }
                catch (e) {
                    console.log(e);
                }
            }
            speak("Please specify the desired paper format", "en-US");
        }
        function dispatchSave() {
            var evtName = "saveData";
            var saveEvent = new CustomEvent(evtName, {
                detail: {
                    withError: false
                }
            });
            if (document.dispatchEvent)
                window.dispatchEvent(saveEvent);
            else
                document.documentElement[evtName] = saveEvent;
        }
        UI.dispatchSave = dispatchSave;
        function listenSave() {
            function saveData() {
                var note = document.getElementById("saveNotifier");
                note.style.opacity = "0";
                note.style.display = "block";
                window.setTimeout(function () {
                    saveData2();
                }, 100);
            }
            function saveData2() {
                console.log("saving data");
                var note = document.getElementById("saveNotifier");
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
                note.style["background-color"] = "rgba(160, 160, 160, 0.6)";
                note.style["border-radius"] = "3mm";
                note.style.padding = "0.5cm";
                note.style["z-index"] = 99999999;
                note.style.opacity = "1";
                function getObjectData(ele) {
                    var aspect = null;
                    var data = {
                        "id": ele.getAttribute("id"),
                        "aspect": null,
                        "halign": null,
                        "valign": null,
                        "text": null,
                        "type": ele.getAttribute("data-type"),
                        "format": ele.getAttribute("data-format"),
                        "databind": ele.getAttribute("data-databind")
                    };
                    var svg = null, ifrm = null;
                    if (ele.firstElementChild.tagName.toLowerCase() == 'svg')
                        svg = ele.firstElementChild;
                    if (ele.firstElementChild.tagName.toLowerCase() == 'iframe') {
                        try {
                            ifrm = ele.firstElementChild.contentWindow.document.documentElement;
                        }
                        catch (e) {
                            ifrm = null;
                        }
                    }
                    if (ifrm != null) {
                        aspect = ifrm.getAttribute("preserveAspectRatio");
                        data["aspect"] = aspect;
                        return data;
                    }
                    if (svg != null) {
                        aspect = svg.getAttribute("preserveAspectRatio");
                        data["aspect"] = aspect;
                        var serializer = new XMLSerializer();
                        data["text"] = serializer.serializeToString(svg);
                        serializer = null;
                        return data;
                    }
                    var div = ele.querySelector("div[contenteditable]");
                    if (div != null) {
                        aspect = div.style["text-align"];
                        if (aspect === "")
                            aspect = null;
                        data["halign"] = aspect;
                        return data;
                    }
                    var span = ele.querySelector("span[contenteditable]");
                    if (span != null) {
                        console.log("span", span);
                        data["text"] = span.innerHTML;
                    }
                    return data;
                }
                var saveData = [], divs = document.querySelectorAll("#page > div");
                for (var i = 0; i < divs.length; ++i) {
                    if (divs[i].id === "positionMenu")
                        continue;
                    var objectData = getObjectData(divs[i]);
                    if (objectData.type === "null" || objectData.type === "undefined")
                        objectData.type = null;
                    if (objectData.format === "null" || objectData.format === "undefined")
                        objectData.format = null;
                    var mes = document.getElementById("measure");
                    saveData.push({
                        "PL_UID": objectData.id,
                        "PL_PLK_UID": mes.getAttribute("data-plk_uid"),
                        "PL_Type": objectData.type,
                        "PL_Format": objectData.format,
                        "PL_X": parseFloat(divs[i].style.left),
                        "PL_Y": parseFloat(divs[i].style.top),
                        "PL_W": parseFloat(divs[i].style.width),
                        "PL_H": parseFloat(divs[i].style.height),
                        "PL_Angle": 0,
                        "PL_AspectRatio": objectData.aspect,
                        "PL_AlignH": objectData.halign,
                        "PL_AlignV": objectData.valign,
                        "PL_Text_DE": objectData["text"],
                        "PL_Text_FR": objectData["text"],
                        "PL_Text_IT": objectData["text"],
                        "PL_Text_EN": objectData["text"],
                        "PL_Outline": false,
                        "PL_Style": null,
                        "PL_DataBind": objectData["databind"],
                        "PL_Sort": parseInt(divs[i].style["z-index"])
                    });
                }
                console.log("saveData", JSON.stringify(saveData, null, 2));
                new Http.Json("../../ajax/anyInsert.ashx?sql=PL_T_VWS_PdfLegende_Insert.sql", JSON.stringify(saveData))
                    .success(function (result) {
                    function saveSuccess() {
                        note.innerHTML = "";
                        note.appendChild(document.createTextNode("Gespeichert"));
                        note.style["background-color"] = "limegreen";
                        window.setTimeout(function () {
                            note.style.opacity = "0";
                            window.setTimeout(function () {
                                note.style.display = "none";
                                note.style.top = "60vh";
                                note.style.left = "70vw";
                            }, 1000);
                        }, 500);
                    }
                    console.log("success", result);
                    saveSuccess();
                })
                    .failure(function (err) {
                    console.log("PL_T_VWS_PdfLegende_Insert: failure");
                    console.log(err);
                    function saveFailure() {
                        note.innerHTML = "";
                        note.appendChild(document.createTextNode("Fehler"));
                        note.style["background-color"] = "red";
                        window.setTimeout(function () {
                            note.style.opacity = "0";
                            window.setTimeout(function () {
                                note.style.display = "none";
                                note.style.top = "60%";
                                note.style.left = "70%";
                            }, 1000);
                        }, 500);
                    }
                    saveFailure();
                    if (err.message) {
                        console.log(err.message);
                        console.log(JSON.stringify(err, null, 2));
                    }
                })
                    .send();
            }
            if (document.addEventListener)
                window.addEventListener("saveData", saveData);
            else if (document.attachEvent)
                document.attachCustomEvent("saveData", saveData);
        }
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        function toggleCustomCategory(obj) {
            if (obj.value === 'custom') {
                document.getElementById('customCategory').style.display = 'block';
                askUser();
            }
            else
                document.getElementById('customCategory').style.display = 'none';
        }
        UI.toggleCustomCategory = toggleCustomCategory;
        function clearPaper() {
            var horizontalRuler = document.querySelector("div #horizontalRuler");
            var verticalRuler = document.querySelector("div #verticalRuler");
            var page = document.getElementById("page");
            var hruler = horizontalRuler.getElementsByClassName("ruler")[0];
            var hscale = horizontalRuler.getElementsByClassName("scale")[0];
            var vruler = verticalRuler.getElementsByClassName("ruler")[0];
            var vscale = verticalRuler.getElementsByClassName("scale")[0];
            var elements = [hruler, hscale, vruler, vscale, page];
            function empty(e) {
                while (e.lastChild) {
                    e.removeChild(e.lastChild);
                }
            }
            for (var i = 0; i < elements.length; ++i)
                empty(elements[i]);
        }
        function mainMenu() {
            console.log("mainMenu");
            clearPaper();
            PageDesigner.UI.iOsBlocker();
            var pm = document.getElementById("paperMenu");
            pm.style.position = "fixed";
            pm.style.top = "50vh";
            pm.style.left = "50vw";
            pm.style.transform = "translate(-50%, -50%)";
            pm.style["box-shadow"] = "0px 0px 3mm rgba(111, 111,111, 0.85)";
            pm.style.width = "13cm";
            pm.style.height = "30vh";
            pm.style["background-color"] = "rgba(240, 240, 240, 0.94)";
            pm.style["border-radius"] = "3mm";
            pm.style.padding = "0.5cm";
            pm.style["z-index"] = 99999999;
            var elePS = document.getElementById("selPaperFormat");
            var eleDAR = document.getElementById("selDarstellung");
            var elePLK = document.getElementById("selCathegory");
            new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_DropDown_PaperSize_List.sql", null, function (data) {
                HtmlTools.popDrop(elePS, data);
                pm.style.display = "block";
            }).send();
            new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_DropDown_Darstellung_List.sql", null, function (data) {
                data.splice(data, 0, { v: "00000000-0000-0000-0000-000000000000", t: "Alle", s: 1 });
                HtmlTools.popDrop(eleDAR, data);
                pm.style.display = "block";
            }).send();
            function reloadCategory() {
                var ps_uid = null, dar_uid = null;
                if (elePS.selectedIndex != -1)
                    ps_uid = elePS.options[elePS.selectedIndex].value.split(';')[0];
                if (eleDAR.selectedIndex != -1)
                    dar_uid = eleDAR.options[eleDAR.selectedIndex].value;
                if (ps_uid == null || dar_uid == null)
                    return false;
                if (ps_uid == null)
                    ps_uid = null;
                if (dar_uid == null)
                    dar_uid = null;
                var parameter = {
                    "in_sprache": "EN",
                    "PS_UID": ps_uid,
                    "DAR_UID": dar_uid
                };
                new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_Load_LegendCategory_List.sql", parameter, function (data) {
                    data.push({ v: "custom", t: "Custom", s: 0 });
                    HtmlTools.popDrop(elePLK, data);
                    pm.style.display = "block";
                }).send();
            }
            elePS.onchange = reloadCategory;
            eleDAR.onchange = reloadCategory;
            PageDesigner.UI.translateAll();
        }
        UI.mainMenu = mainMenu;
        function Init() {
            document.getElementById("measure").onclick = mainMenu;
            var items = document.querySelectorAll("#page > div");
            for (var i = 0; i < items.length; ++i) {
                dragElement(items[i]);
            }
            listenSave();
        }
        UI.Init = Init;
    })(UI = PageDesigner.UI || (PageDesigner.UI = {}));
})(PageDesigner || (PageDesigner = {}));
