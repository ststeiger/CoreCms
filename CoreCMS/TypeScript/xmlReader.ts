
declare var ActiveXObject: (type: string) => void;

declare interface Window
{
    DOMParser: any
}


declare interface Document
{
    async: boolean,
    loadXML(s: string): Document
}


function getXmlDocument(txt):Document
{
    let parser: DOMParser
        , xmlDoc:Document;

    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    }

    return xmlDoc;
}

function getExports(xml:string) : string[]
{
    let ls: string[] = [];
    let xmlDoc: Document = getXmlDocument(xml);
    let tables: NodeListOf<HTMLTableElement> = xmlDoc.getElementsByTagName("table")
    
    for (let i = 0; i < tables.length; ++i)
    {
        ls.push(tables[i].innerText || tables[i].textContent);
    }

    return ls;
}

let xml:string = "<tables><table>T_AP_Ref_Mandant</table><table>T_SYS_ApertureColorToHex</table></tables>";
let exports2: string[] = getExports(xml);
console.log(exports2);
