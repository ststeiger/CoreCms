function findElementsWithArributePrefix(selector, prefix) {
    return [].slice.call(document.querySelectorAll(selector)).filter(function (e) {
        return [].slice.call(e.attributes).filter(function (attr) {
            return attr.name.startsWith(prefix);
        }).length;
    });
}
function createFeedback() {
    var div = document.createElement("div");
    div.setAttribute("style", [
        "position: fixed; top: 50%; left: 50%; ",
        "display: block; width: 50%; height: 50%; ",
        "-webkit - transform: translate(-50%, -50%); transform: translate(-50%, -50%);",
        "z-index: 999999999; background-color: rgba(255,255,255, 0.75); "
    ].join(""));
    var h1 = document.createElement("h1");
    h1.setAttribute("style", "padding-left: 0.5cm;");
    h1.appendChild(document.createTextNode("Feedback"));
    div.appendChild(h1);
    var span = document.createElement("span");
    span.setAttribute("style", "padding-left: 0.5cm;");
    span.appendChild(document.createTextNode("Fragen ? Kommentare ? Fehler ? "));
    div.appendChild(span);
    div.appendChild(document.createElement("br"));
    var a = document.createElement("a");
    a.setAttribute("style", "padding-left: 0.5cm; unicode-bidi: bidi-override; direction: rtl;");
    a.appendChild(document.createTextNode("hc.tnemeganam-roc@ksedecivres"));
    a.href = "mailto: servicedesk[at]cor-management.ch";
    div.appendChild(a);
    var close = document.createElement("span");
    close.setAttribute("style", "position: absolute; top: 0.25cm; right: 0.25cm;");
    close.appendChild(document.createTextNode("X"));
    close.onclick = function (ele) {
        ele.parentElement.removeChild(ele);
    }.bind(this, div);
    div.appendChild(close);
    document.body.appendChild(div);
}
function toUnicode(theString) {
    var unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        unicodeString += "\\u" + ("0000" + theString.charCodeAt(i).toString(16).toUpperCase()).slice(-4);
    }
    return unicodeString;
}
function toHex(theString) {
    var unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        unicodeString += "\\" + ("0000" + theString.charCodeAt(i).toString(16).toLowerCase()).slice(-4);
    }
    return unicodeString;
}
function toHtml(theString) {
    var unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        unicodeString += "&#" + theString.charCodeAt(i).toString(10).toLowerCase();
    }
    return unicodeString;
}
function toHtmlReverse(theString) {
    theString = theString.split('').reverse().join('');
    var unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        unicodeString += "&#" + theString.charCodeAt(i).toString(10).toLowerCase();
    }
    return unicodeString;
}
