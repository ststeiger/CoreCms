
namespace PageDesigner.ContextMenu
{
    declare var Jodit: any;
    export let hasDoneSomething: boolean;
    export let inEditMode: boolean;

    let elementToPosition: HTMLElement;
    
    
    export function applyPosition(menuPoint: HTMLElement)
    {
        console.log("ENTER applyPosition");

        let menu = document.getElementById("positionMenu");


        let txtTop = document.getElementById("txtTop");
        let txtLeft = document.getElementById("txtLeft");
        let txtWidth = document.getElementById("txtWidth");
        let txtHeight = document.getElementById("txtHeight");

        let top = txtTop.value;
        let left = txtLeft.value;
        let width = txtWidth.value;
        let height = txtHeight.value;


        elementToPosition.style.top = top + "cm";
        elementToPosition.style.left = left + "cm";
        elementToPosition.style.width = width + "cm";
        elementToPosition.style.height = height + "cm";


        let positionMenu = document.getElementById("positionMenu");
        positionMenu.parentElement.removeChild(positionMenu);
        PageDesigner.UI.dispatchSave();
    }


    export function setPosition(menuPoint: HTMLElement)
    {
        console.log("setPosition");
        let e = event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        PageDesigner.ContextMenu.hasDoneSomething = true;


        let menu: HTMLElement = menuPoint.parentElement.parentElement;
        // console.log(menu);

        let id = menu.getAttribute("data-elementId");

        elementToPosition = document.getElementById(id);


        let tTop = parseFloat(elementToPosition.style.top);
        let tLeft = parseFloat(elementToPosition.style.left);
        let tWidth = parseFloat(elementToPosition.style.width);
        let tHeight = parseFloat(elementToPosition.style.height);
        let t3 = tTop - -tHeight;



        let html = `
            <div id="positionMenu" style="display: block;">
                <label for="txtTop" class="lbl">Top:</label>
                <input id="txtTop" type="text" value="${tTop}" class="pos" />
                <span>cm</span>
                <br />
                <label for="txtLeft" class="lbl">Left:</label>
                <input id="txtLeft" type="text" value="${tLeft}" class="pos" />
                <span>cm</span>
                <br />
                <label for="txtWidth" class="lbl">Width:</label>
                <input id="txtWidth" type="text" value="${tWidth}" class="pos" />
                <span>cm</span>
                <br />
                <label for="txtHeight" class="lbl">Height:</label>
                <input id="txtHeight" type="text" value="${tHeight}" class="pos" />
                <span>cm</span>
                <br />
                <input type="button" onclick="PageDesigner.ContextMenu.applyPosition(this);" value="Apply" />
            </div>
`;

        let page = document.getElementById("page");
        page.insertAdjacentHTML("beforeend", html);


        let positionMenu = document.getElementById("positionMenu");
        positionMenu.style.display = "block";
        positionMenu.style.left = elementToPosition.style.left;

        positionMenu.style.top = t3 + "cm";

        console.log("ele", elementToPosition);

        //menu.removeAttribute("data-elementId");



        menu.style.display = "none";
        menu.removeAttribute("data-elementId");
    }


    // PageDesigner.ContextMenu.killJudy()
    export function killJudy(menuPoint: HTMLElement)
    {
        console.log("killJudy");
        let e = event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        PageDesigner.ContextMenu.hasDoneSomething = true;


        let menu: HTMLElement = menuPoint.parentElement.parentElement;
        // console.log(menu);

        let id = menu.getAttribute("data-elementId");
        let ele = document.getElementById(id);
        console.log("killele", ele);

        Object.keys(Jodit.instances).forEach(function (id: string)
        {
            //Jodit.instances[id].destruct();
            let editor = Jodit.instances[id];

            ele.onmousedown = editor.pageDesigner.onmousedown;
            ele.onmouseup = editor.pageDesigner.onmouseup;
            // ele.oncontextmenu = editor.pageDesigner.oncontextmenu;
            window["prevent_touch_move"] = editor.pageDesigner.window_touch_move;

            editor.destruct();
        });


        PageDesigner.ContextMenu.inEditMode = false;


        (<HTMLElement>ele.lastElementChild).style.display = "block";

        //ele.parentElement.removeChild(ele);
        //menu.style.display = "none";
        //menu.removeAttribute("data-elementId");

        menu.style.display = "none";
        menu.removeAttribute("data-elementId");
    }


    function judy(div: HTMLElement)
    {
        // var span = document.querySelector('span[contenteditable="true"]');
        //span = span.parentElement;
        //var span:HTMLElement = document.getElementById("be85cc79-b8c7-65be-3f55-668fadab317e");
        // var zi = div.style["z-index"] = null;
        let limitDiv: Element = div.firstElementChild;
        let span: HTMLElement = <HTMLElement>limitDiv.firstElementChild;
        // span = <HTMLElement>span.firstElementChild;

        (<HTMLElement>div.lastElementChild).style.display = "none";

        console.log("span", span);
        // span.removeAttribute('attribute?')

        // https://github.com/xdan/jodit/blob/master/src/Config.ts
        var editor = new Jodit(span, {
            // preset: 'inline',
            language: 'de',
            buttons: [
                //'source', '|',
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
                //'video',
                'table',
                'link', '|',
                'align', 'undo', 'redo', '|',
                'hr',
                'eraser',
                'copyformat', '|',
                'symbol',
                'fullsize'
                //,'print'
                //,'about'

            ],

            // buttons:   The list of buttons that appear in the editor's toolbar on large places (≥ options.sizeLG). 
            // buttonsMD: The list of buttons that appear in the editor's toolbar on medium places (≥ options.sizeMD).
            // buttonsSM: The list of buttons that appear in the editor's toolbar on small places (≥ options.sizeSM).
            // buttonsXS: The list of buttons that appear in the editor's toolbar on extra small places (< options.sizeSM).
            buttonsXS: [
                'bold',
                'image', '|',
                'brush',
                'paragraph', '|',
                'align', '|',
                'undo', 'redo', '|',
                'eraser',
                'dots'
            ]

            , events: {
                getIcon: function (name, control, clearName)
                {
                    // name: omega, control:{}, clearName: symbol

                    switch (clearName)
                    {
                        case 'bold':
                            return '<span style="text-align: center;font-size:14px; font-weight: bold; text-shadow: 2px 2px #f0f0f0;">F</span>';
                            break;
                        case 'italic':
                            return '<span style="text-align: center;font-size:14px; font-weight: bold; font-style: italic; text-shadow: 2px 2px #f0f0f0;">K</span>';
                            break;
                        case 'strikethrough':
                            return '<span style="text-align: center;font-size:14px; font-weight: bold; text-decoration: line-through; " >D</span>';
                            break;
                        // case 'symbol':
                        //     return '<span style="text-align: center;font-size:14px;">Ω</span>';
                        //     break;
                    }

                    //if (Jodit.modules.ToolbarIcon.icons[clearName] != null) return Jodit.modules.ToolbarIcon.icons[clearName];
                    if (Jodit.modules.ToolbarIcon.icons[name] != null) return Jodit.modules.ToolbarIcon.icons[name];

                    return '<i style="font-size:14px" class="fa fa-' + clearName + ' fa-xs"></i>';
                }
            }

        });

        // Backup the eventhandlers - we need to restore them once we finish editing...
        editor.pageDesigner = {};
        editor.pageDesigner.onmousedown = div.onmousedown;
        editor.pageDesigner.onmouseup = div.onmouseup;
        // editor.pageDesigner.oncontextmenu = div.oncontextmenu;

        editor.pageDesigner.window_touch_move = window["prevent_touch_move"];
        window["prevent_touch_move"] = false;

        // dragElement.ts => dragElement => element.onmousedown/element.onmouseup
        // div.oncontextmenu = null;
        div.onmousedown = null;
        div.onmouseup = null;
    }


    export function edit(menuPoint: HTMLElement)
    {
        console.log("edit");
        let e = event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        PageDesigner.ContextMenu.hasDoneSomething = false;
        PageDesigner.ContextMenu.inEditMode = true;

        let menu: HTMLElement = menuPoint.parentElement.parentElement;
        // console.log(menu);

        let id = menu.getAttribute("data-elementId");
        let ele = document.getElementById(id);
        judy(ele);

        menu.style.display = "none";
        menu.removeAttribute("data-elementId");
    } // End Function edit  


    export function alignImage(menuPoint: HTMLElement, vertical: number, horizontal: number)
    {
        let e: Event = event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        PageDesigner.ContextMenu.hasDoneSomething = true;

        vertical--;
        horizontal--;

        //let matrix = [
        //      ['xMinYMin', 'xMidYMin', 'xMaxYMin']
        //    , ['xMinYMid', 'xMidYMid', 'xMaxYMid']
        //    , ['xMinYMax', 'xMidYMax', 'xMaxYMax']
        //];
        // let aspect = matrix[vertical][horizontal]

        let h: string[] = ['xMin', 'xMid', 'xMax'], v: string[] = ['YMin', 'YMid', 'YMax'],
            aspect = h[horizontal] + v[vertical] + " meet";
        // console.log(aspect);


        // top-left:
        // preserveAspectRatio = "xMinYMin meet"

        // top-middle:
        // preserveAspectRatio = "xMidYMin meet"

        // top-right:
        // preserveAspectRatio = "xMaxYMin meet"

        // bottom-left
        // preserveAspectRatio = "xMinYMax meet"

        // bottom-middle
        // preserveAspectRatio = "xMidYMax meet"

        // bottom-right
        // preserveAspectRatio = "xMaxYMax meet"

        // vertical: 1= top, 2= middle, 3= bottom
        // horizontal: 1=left, 2=middle, 3=right

        // console.log(menuPoint)
        let menu: HTMLElement = menuPoint.parentElement.parentElement.parentElement.parentElement;
        // console.log(menu)

        let id: string = menu.getAttribute("data-elementId");
        let ele: HTMLElement = document.getElementById(id);

        let svg: SVGElement = ele.getElementsByTagName("svg")[0];
        let ifrm: HTMLIFrameElement = ele.getElementsByTagName("iframe")[0];

        if (svg == null && ifrm != null)
            svg = <SVGElement><any>ifrm.contentWindow.document.documentElement;

        // console.log("svg", svg);
        if (svg != null)
        {
            svg.setAttribute('preserveAspectRatio', aspect);
            svg.setAttribute('width', "100%");
            svg.setAttribute('height', "100%");
        }
        else
        {
            ele = <HTMLElement>ele.querySelector("div[contentEditable]");

            if (ele != null)
            {
                ele.style["text-align"] = ['left', 'center', 'right'][horizontal];
            }
        }

        // console.log("svg:", svg);

        // console.log(menu);
        menu.style.display = "none";
        menu.removeAttribute("data-elementId");
    } // End Function alignImage


    export function deleteElement(menuPoint)
    {
        console.log("deleteElement");

        let e = event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        PageDesigner.ContextMenu.hasDoneSomething = true;


        let menu = menuPoint.parentElement.parentElement;

        let id = menu.getAttribute("data-elementId");
        let ele = document.getElementById(id);
        ele.parentElement.removeChild(ele);
        menu.style.display = "none";
        menu.removeAttribute("data-elementId");

        let params = {
            "PL_UID": id
        };

        new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_T_VWS_PdfLegende_Delete.sql", params
            , function (data)
            {
                console.log("successfully deleted element " + id + ".");
            }
        ).send();

    } // End Function deleteElement


    export function closeContextMenu(menu)
    {
        menu.removeAttribute("data-elementId");
        menu.parentElement.style.display = 'none';
        PageDesigner.UI.dispatchSave();
    } // End Function closeContextMenu 


    export function alterZIndex(menuPoint, move)
    {
        let menu = menuPoint.parentElement.parentElement
            , ele = document.getElementById(menu.getAttribute("data-elementid"))
            , zindex: any = window.getComputedStyle(ele).getPropertyValue("z-index")
            ;

        if (move == (1 / 0)) // +infinitiy
        {
            zindex = 1 + PageDesigner.UI.getMaxZindex();
        }
        else if (move == (-1 / 0)) // -infinitiy
        {
            zindex = -1 + PageDesigner.UI.getMinZindex();
        }
        else if (move < 0)
        {
            if ((zindex != 'static') && (zindex != 'auto'))
                zindex = parseInt(zindex) - 1;
            else zindex = -1;
        }
        else if (move > 0)
        {
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
    } // End Function alterZIndex 


}
