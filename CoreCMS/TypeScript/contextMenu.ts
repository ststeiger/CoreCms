
namespace PageDesigner.ContextMenu
{

    export let hasDoneSomething: boolean;


    export function edit(menuPoint: HTMLElement)
    {
        let menu: HTMLElement = menuPoint.parentElement.parentElement;
        console.log(menu);
        PageDesigner.ContextMenu.hasDoneSomething = true;
        
        alert("COR: TODO LIST");

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
        let   menu = menuPoint.parentElement.parentElement
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
