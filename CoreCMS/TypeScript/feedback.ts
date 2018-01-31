
/*
.feedback
{
    position: fixed;
    display: block;
    right: 0;
    top: 50%;
    -ms-writing-mode: tb-lr;
    writing-mode: vertical-lr;
    transform-origin: center;
    transform: rotate(180deg) translateY(+50%);
    #border-bottom-right-radius: 3mm;
    #border: 3px solid #73AD21;
    border-top-right-radius: 3mm;
    border-bottom-left-radius: 3mm;
    cursor: pointer;
    background-color: blue;
    color: white;
    font-weight: bold;
    padding: 2mm;
    padding-top: 0.5cm;
    padding-bottom: 0.5cm;
    text-align: center;
    text-wrap: avoid;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
}
<div class="feedback" onclick="createFeedback();">Feedback</div>
 */


function findElementsWithArributePrefix(selector, prefix)
{
    return [].slice.call(document.querySelectorAll(selector)).filter(function (e)
    {
        return [].slice.call(e.attributes).filter(
            function (attr)
            {
                return attr.name.startsWith(prefix);
            }
        ).length;
    });
}

// console.log("prfx", findElementsWithArributePrefix("script", "data"));


function createFeedback()
{
    let div = document.createElement("div");
    div.setAttribute("style", [
        "position: fixed; top: 50%; left: 50%; "
        , "display: block; width: 50%; height: 50%; "
        , "-webkit - transform: translate(-50%, -50%); transform: translate(-50%, -50%);"
        , "z-index: 999999999; background-color: rgba(255,255,255, 0.75); "
    ].join(""));


    let h1 = document.createElement("h1");
    h1.setAttribute("style", "padding-left: 0.5cm;");
    h1.appendChild(document.createTextNode("Feedback"));
    div.appendChild(h1);



    let span = document.createElement("span");
    span.setAttribute("style", "padding-left: 0.5cm;");
    span.appendChild(document.createTextNode("Fragen ? Kommentare ? Fehler ? "));
    div.appendChild(span);

    div.appendChild(document.createElement("br"));


    let a = document.createElement("a");
    a.setAttribute("style", "padding-left: 0.5cm; unicode-bidi: bidi-override; direction: rtl;");
    // "servicedesk@cor-management.ch".split('').reverse().join("")
    // https://stackoverflow.com/questions/21421948/protect-e-mail-address-with-css-only
    a.appendChild(document.createTextNode("hc.tnemeganam-roc@ksedecivres"));
    a.href = "mailto: servicedesk[at]cor-management.ch";
    div.appendChild(a);


    let close = document.createElement("span");
    close.setAttribute("style", "position: absolute; top: 0.25cm; right: 0.25cm;");
    close.appendChild(document.createTextNode("X"));
    close.onclick = function (ele)
    {
        ele.parentElement.removeChild(ele);
    }.bind(this, div);
    div.appendChild(close);

    document.body.appendChild(div);
}


// ("0000" + charCodeAt(0).toHex().toString(16)).slice(-4)
// https://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex
// https://buildingonmud.blogspot.ch/2009/06/convert-string-to-unicode-in-javascript.html

function toUnicode(theString)
{
    let unicodeString = '';
    for (let i = 0; i < theString.length; i++)
    {
        unicodeString += "\\u" + ("0000" + theString.charCodeAt(i).toString(16).toUpperCase()).slice(-4);
    }

    return unicodeString;
}

function toHex(theString)
{
    let unicodeString = '';
    for (let i = 0; i < theString.length; i++)
    {
        unicodeString += "\\" + ("0000" + theString.charCodeAt(i).toString(16).toLowerCase()).slice(-4);
    }

    return unicodeString;
}

function toHtml(theString)
{
    let unicodeString = '';
    for (let i = 0; i < theString.length; i++)
    {
        unicodeString += "&#" + theString.charCodeAt(i).toString(10).toLowerCase();
    }

    return unicodeString;
}

function toHtmlReverse(theString)
{
    theString = theString.split('').reverse().join('');

    let unicodeString = '';
    for (let i = 0; i < theString.length; i++)
    {
        unicodeString += "&#" + theString.charCodeAt(i).toString(10).toLowerCase();
    }
    return unicodeString;
}



/*
<style>
    .gmail:before
    {
        content: "\006a\006f\0068\006e\0040\0067\006d\0061\0069\006c\002e\0063\006f\006d";
    }

    .e-mail:before
    {
        #content: "\006d\006f\0063\002e\006c\0069\0061\006d\0067";
        content: attr(data-before);
        #actually-after: gmail.com;
    }

    .e-mail:after
    {
        #content: "\006e\0068\006f\006a";
        content: attr(data-after);
        #actually-before: john;
    }

    .e-mail
    {
        unicode-bidi: bidi-override;
        direction: rtl;
    }

    .nicepos
    {
        top: 100px;
        left: 300px;
        position: absolute;
        z-index: 9999999999999999;
        #\0040;
        display: none;
    }

</style>

<div class="nicepos">
    <!--<span class="gmail"></span>-->
    <span class="e-mail" data-before="&#109&#111&#99&#46&#114&#97&#98" data-after="&#111&#111&#102">@</span>
</div>
*/
