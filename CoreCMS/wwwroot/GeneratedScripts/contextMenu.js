var PageDesigner;
(function (PageDesigner) {
    var ContextMenu;
    (function (ContextMenu) {
        var elementToPosition;
        function applyPosition(menuPoint) {
            console.log("ENTER applyPosition");
            var menu = document.getElementById("positionMenu");
            var txtTop = document.getElementById("txtTop");
            var txtLeft = document.getElementById("txtLeft");
            var txtWidth = document.getElementById("txtWidth");
            var txtHeight = document.getElementById("txtHeight");
            var top = txtTop.value;
            var left = txtLeft.value;
            var width = txtWidth.value;
            var height = txtHeight.value;
            elementToPosition.style.top = top + "cm";
            elementToPosition.style.left = left + "cm";
            elementToPosition.style.width = width + "cm";
            elementToPosition.style.height = height + "cm";
            var positionMenu = document.getElementById("positionMenu");
            positionMenu.parentElement.removeChild(positionMenu);
            PageDesigner.UI.dispatchSave();
        }
        ContextMenu.applyPosition = applyPosition;
        function setPosition(menuPoint, event) {
            console.log("setPosition");
            var e = event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            PageDesigner.ContextMenu.hasDoneSomething = true;
            var menu = menuPoint.parentElement.parentElement;
            var id = menu.getAttribute("data-elementId");
            elementToPosition = document.getElementById(id);
            var tTop = parseFloat(elementToPosition.style.top);
            var tLeft = parseFloat(elementToPosition.style.left);
            var tWidth = parseFloat(elementToPosition.style.width);
            var tHeight = parseFloat(elementToPosition.style.height);
            var t3 = tTop - -tHeight;
            var html = "\n            <div id=\"positionMenu\" style=\"display: block;\">\n                <label for=\"txtTop\" class=\"lbl\">Top:</label>\n                <input id=\"txtTop\" type=\"text\" value=\"" + tTop + "\" class=\"pos\" />\n                <span>cm</span>\n                <br />\n                <label for=\"txtLeft\" class=\"lbl\">Left:</label>\n                <input id=\"txtLeft\" type=\"text\" value=\"" + tLeft + "\" class=\"pos\" />\n                <span>cm</span>\n                <br />\n                <label for=\"txtWidth\" class=\"lbl\">Width:</label>\n                <input id=\"txtWidth\" type=\"text\" value=\"" + tWidth + "\" class=\"pos\" />\n                <span>cm</span>\n                <br />\n                <label for=\"txtHeight\" class=\"lbl\">Height:</label>\n                <input id=\"txtHeight\" type=\"text\" value=\"" + tHeight + "\" class=\"pos\" />\n                <span>cm</span>\n                <br />\n                <input type=\"button\" onclick=\"PageDesigner.ContextMenu.applyPosition(this);\" value=\"Apply\" />\n            </div>\n";
            var page = document.getElementById("page");
            page.insertAdjacentHTML("beforeend", html);
            var positionMenu = document.getElementById("positionMenu");
            positionMenu.style.display = "block";
            positionMenu.style.left = elementToPosition.style.left;
            positionMenu.style.top = t3 + "cm";
            console.log("ele", elementToPosition);
            menu.style.display = "none";
            menu.removeAttribute("data-elementId");
        }
        ContextMenu.setPosition = setPosition;
        function killJudy(menuPoint, event) {
            console.log("killJudy");
            var e = event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            PageDesigner.ContextMenu.hasDoneSomething = true;
            var menu = menuPoint.parentElement.parentElement;
            var id = menu.getAttribute("data-elementId");
            var ele = document.getElementById(id);
            console.log("killele", ele);
            Object.keys(Jodit.instances).forEach(function (id) {
                var editor = Jodit.instances[id];
                ele.onmousedown = editor.pageDesigner.onmousedown;
                ele.onmouseup = editor.pageDesigner.onmouseup;
                window["prevent_touch_move"] = editor.pageDesigner.window_touch_move;
                editor.destruct();
            });
            PageDesigner.ContextMenu.inEditMode = false;
            ele.lastElementChild.style.display = "block";
            menu.style.display = "none";
            menu.removeAttribute("data-elementId");
        }
        ContextMenu.killJudy = killJudy;
        function judy(div) {
            var limitDiv = div.firstElementChild;
            var span = limitDiv.firstElementChild;
            div.lastElementChild.style.display = "none";
            console.log("span", span);
            var editor = new Jodit(span, {
                language: 'de',
                buttons: [
                    'bold',
                    'strikethrough',
                    'underline',
                    'subscript', 'superscript',
                    'italic', '|',
                    'ul',
                    'ol', '|',
                    'outdent', 'indent', '|',
                    'font',
                    'fontsize',
                    'brush',
                    'paragraph', '|',
                    'image',
                    'table',
                    'link', '|',
                    'align', 'undo', 'redo', '|',
                    'hr',
                    'eraser',
                    'copyformat', '|',
                    'symbol',
                    'fullsize'
                ],
                buttonsXS: [
                    'bold',
                    'image', '|',
                    'brush',
                    'paragraph', '|',
                    'align', '|',
                    'undo', 'redo', '|',
                    'eraser',
                    'dots'
                ],
                events: {
                    getIcon: function (name, control, clearName) {
                        switch (clearName) {
                            case 'bold':
                                return '<span style="text-align: center;font-size:14px; font-weight: bold; text-shadow: 2px 2px #f0f0f0;">F</span>';
                                break;
                            case 'italic':
                                return '<span style="text-align: center;font-size:14px; font-weight: bold; font-style: italic; text-shadow: 2px 2px #f0f0f0;">K</span>';
                                break;
                            case 'strikethrough':
                                return '<span style="text-align: center;font-size:14px; font-weight: bold; text-decoration: line-through; " >D</span>';
                                break;
                        }
                        if (Jodit.modules.ToolbarIcon.icons[name] != null)
                            return Jodit.modules.ToolbarIcon.icons[name];
                        return '<i style="font-size:14px" class="fa fa-' + clearName + ' fa-xs"></i>';
                    }
                }
            });
            editor.pageDesigner = {};
            editor.pageDesigner.onmousedown = div.onmousedown;
            editor.pageDesigner.onmouseup = div.onmouseup;
            editor.pageDesigner.window_touch_move = window["prevent_touch_move"];
            window["prevent_touch_move"] = false;
            div.onmousedown = null;
            div.onmouseup = null;
        }
        function edit(menuPoint, event) {
            console.log("edit");
            var e = event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            PageDesigner.ContextMenu.hasDoneSomething = false;
            PageDesigner.ContextMenu.inEditMode = true;
            var menu = menuPoint.parentElement.parentElement;
            var id = menu.getAttribute("data-elementId");
            var ele = document.getElementById(id);
            judy(ele);
            menu.style.display = "none";
            menu.removeAttribute("data-elementId");
        }
        ContextMenu.edit = edit;
        function alignImage(menuPoint, event, vertical, horizontal) {
            var e = event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            PageDesigner.ContextMenu.hasDoneSomething = true;
            vertical--;
            horizontal--;
            var h = ['xMin', 'xMid', 'xMax'], v = ['YMin', 'YMid', 'YMax'], aspect = h[horizontal] + v[vertical] + " meet";
            var menu = menuPoint.parentElement.parentElement.parentElement.parentElement;
            var id = menu.getAttribute("data-elementId");
            var ele = document.getElementById(id);
            var svg = ele.getElementsByTagName("svg")[0];
            var ifrm = ele.getElementsByTagName("iframe")[0];
            if (svg == null && ifrm != null)
                svg = ifrm.contentWindow.document.documentElement;
            if (svg != null) {
                svg.setAttribute('preserveAspectRatio', aspect);
                svg.setAttribute('width', "100%");
                svg.setAttribute('height', "100%");
            }
            else {
                ele = ele.querySelector("div[contentEditable]");
                if (ele != null) {
                    ele.style["text-align"] = ['left', 'center', 'right'][horizontal];
                }
            }
            menu.style.display = "none";
            menu.removeAttribute("data-elementId");
        }
        ContextMenu.alignImage = alignImage;
        function deleteElement(menuPoint, event) {
            console.log("deleteElement");
            console.log(arguments);
            var e = event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            PageDesigner.ContextMenu.hasDoneSomething = true;
            var menu = menuPoint.parentElement.parentElement;
            var id = menu.getAttribute("data-elementId");
            var ele = document.getElementById(id);
            ele.parentElement.removeChild(ele);
            menu.style.display = "none";
            menu.removeAttribute("data-elementId");
            var params = {
                "PL_UID": id
            };
            new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_T_VWS_PdfLegende_Delete.sql", params, function (data) {
                console.log("successfully deleted element " + id + ".");
            }).send();
        }
        ContextMenu.deleteElement = deleteElement;
        function closeContextMenu(menu, event) {
            menu.removeAttribute("data-elementId");
            menu.parentElement.style.display = 'none';
            PageDesigner.UI.dispatchSave();
        }
        ContextMenu.closeContextMenu = closeContextMenu;
        function alterZIndex(menuPoint, event, move) {
            var menu = menuPoint.parentElement.parentElement, ele = document.getElementById(menu.getAttribute("data-elementid")), zindex = window.getComputedStyle(ele).getPropertyValue("z-index");
            if (move == (1 / 0)) {
                zindex = 1 + PageDesigner.UI.getMaxZindex();
            }
            else if (move == (-1 / 0)) {
                zindex = -1 + PageDesigner.UI.getMinZindex();
            }
            else if (move < 0) {
                if ((zindex != 'static') && (zindex != 'auto'))
                    zindex = parseInt(zindex) - 1;
                else
                    zindex = -1;
            }
            else if (move > 0) {
                if ((zindex != 'static') && (zindex != 'auto'))
                    zindex = parseInt(zindex) - -1;
                else
                    zindex = 1;
            }
            else
                console.log("unknown move type", move);
            console.log("set zindex", zindex);
            ele.style["z-index"] = zindex;
            menu.style.display = "none";
        }
        ContextMenu.alterZIndex = alterZIndex;
    })(ContextMenu = PageDesigner.ContextMenu || (PageDesigner.ContextMenu = {}));
})(PageDesigner || (PageDesigner = {}));
