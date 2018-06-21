var PageDesigner;
(function (PageDesigner) {
    var ContextMenu;
    (function (ContextMenu) {
        function killJudy(menuPoint) {
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
        function edit(menuPoint) {
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
        function alignImage(menuPoint, vertical, horizontal) {
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
        function deleteElement(menuPoint) {
            console.log("deleteElement");
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
        function closeContextMenu(menu) {
            menu.removeAttribute("data-elementId");
            menu.parentElement.style.display = 'none';
            PageDesigner.UI.dispatchSave();
        }
        ContextMenu.closeContextMenu = closeContextMenu;
        function alterZIndex(menuPoint, move) {
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
