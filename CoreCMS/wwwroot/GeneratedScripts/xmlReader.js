function getXmlDocument(txt) {
    var parser, xmlDoc;
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
    }
    else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    }
    return xmlDoc;
}
function getExports(xml) {
    var ls = [];
    var xmlDoc = getXmlDocument(xml);
    var tables = xmlDoc.getElementsByTagName("table");
    for (var i = 0; i < tables.length; ++i) {
        ls.push(tables[i].innerText || tables[i].textContent);
    }
    return ls;
}
var xml = "<tables><table>T_AP_Ref_Mandant</table><table>T_SYS_ApertureColorToHex</table></tables>";
var exports2 = getExports(xml);
console.log(exports2);
