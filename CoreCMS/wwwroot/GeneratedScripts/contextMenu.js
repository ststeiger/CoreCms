var PageDesigner;
(function (PageDesigner) {
    var ContextMenu;
    (function (ContextMenu) {
        function edit(menuPoint) {
            var menu = menuPoint.parentElement.parentElement;
            console.log(menu);
            PageDesigner.ContextMenu.hasDoneSomething = true;
            alert("COR: TODO LIST");
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
