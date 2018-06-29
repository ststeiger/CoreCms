
// https://codepen.io/j4n/pen/wBVVVN 

namespace PageDesigner.Ruler
{

    // https://www.homeschoolmath.net/teaching/f/measuring_inches.php

    // 1 inch is split into 16 increments
    // 1 inch = 10, 12, 16, or 40 lines

    // (terrestrial) mile (5'280 ft, 1'609.344 m)
    // yard(3 ft, 0.9144 m)
    // foot(12 inches, 0.3048 m)
    // inch(2.54 cm)

    // 1 line = (1 / 12 of an inch)
    // 1 / 12 inch to mm = 2.1166666666666663 mm
    // 1 / 6 inch = 1 pica

    // thou or mil (1 / 1000 of an inch)
    // 1 / 1000 inch to mm = 0.0254mm

    // Wmax = w+5
    function verticalRuler(w)
    {
        try
        {
            let vr = document.getElementById("verticalRuler")
                , myruler = vr.getElementsByClassName("ruler")[0]
                , numCm = Math.ceil(w / 5) * 5;


            for (let i = 0; i < numCm; ++i)
            {
                let div = document.createElement("div");
                div.classList.add("vertical");
                div.classList.add("cm");



                let divHalf = document.createElement("div");
                divHalf.classList.add("vertical");
                divHalf.classList.add("halfcm");
                divHalf.classList.add("first");


                for (let j = 0; j < 4; ++j)
                {
                    let divmm = document.createElement("div");
                    divmm.classList.add("vertical");
                    divmm.classList.add("mm");

                    let divClear = document.createElement("div");
                    divClear.setAttribute("style", "clear: both; width: 0px; height: 0px;");

                    divHalf.appendChild(divmm);
                    divHalf.appendChild(divClear);
                } // Next j 


                div.appendChild(divHalf);




                divHalf = document.createElement("div");
                divHalf.classList.add("vertical");
                divHalf.classList.add("halfcm");


                for (let j = 0; j < 4; ++j)
                {
                    let divmm = document.createElement("div");
                    divmm.classList.add("vertical");
                    divmm.classList.add("mm");

                    let divClear = document.createElement("div");
                    divClear.setAttribute("style", "clear: both; width: 0px; height: 0px;");

                    divHalf.appendChild(divmm);
                    divHalf.appendChild(divClear);
                } // Next j 

                div.appendChild(divHalf);



                myruler.appendChild(div);

                div = document.createElement("div");
                div.setAttribute("style", "clear: both; width: 0px; height: 0px;");

                myruler.appendChild(div);
            } // Next i 



            let scale = vr.getElementsByClassName("scale")[0];
            for (let i = 0; i < numCm; ++i)
            {
                let div = document.createElement("div");
                div.classList.add("vertical");
                div.classList.add("cmlabel");

                div.appendChild(document.createTextNode((i + 1).toString() + "cm"));
                scale.appendChild(div);
            } // Next i 

        }
        catch (e)
        {
            console.log("vertical");
            console.log(e);
        }

    } // End Function verticalRuler 


    // // Hmax = h+10,round
    function horizonalRuler(l)
    {
        try
        {
            let hr = document.getElementById("horizontalRuler"),
                myruler = hr.getElementsByClassName("ruler")[0],
                numCm = Math.ceil((l + 10) / 10) * 10;

            for (let i = 0; i < numCm; ++i)
            {
                let div = document.createElement("div");
                div.classList.add("horizontal");
                div.classList.add("cm");


                let divHalf = document.createElement("div");
                divHalf.classList.add("horizontal");
                divHalf.classList.add("halfcm");
                divHalf.classList.add("first");

                for (let j = 0; j < 4; ++j)
                {
                    let divmm = document.createElement("div");
                    divmm.classList.add("horizontal");
                    divmm.classList.add("mm");
                    divHalf.appendChild(divmm);
                } // Next j 

                div.appendChild(divHalf);


                divHalf = document.createElement("div");
                divHalf.classList.add("horizontal");
                divHalf.classList.add("halfcm");

                for (let j = 0; j < 4; ++j)
                {
                    let divmm = document.createElement("div");
                    divmm.classList.add("horizontal");
                    divmm.classList.add("mm");
                    divHalf.appendChild(divmm);
                } // Next j 

                div.appendChild(divHalf);


                myruler.appendChild(div);
            } // Next i 


            let numRuler = hr.getElementsByClassName("scale")[0];

            for (let i = 0; i < numCm; ++i)
            {
                let div = document.createElement("div");
                div.classList.add("horizontal");
                div.classList.add("cmlabel");

                div.appendChild(document.createTextNode((i + 1).toString() + "cm"));
                numRuler.appendChild(div);
            } // Next i 
        }
        catch (e)
        {
            console.log(e);
        }

    } // End horizonalRuler 


    export function drawRuler(w, h)
    {
        horizonalRuler(w);
        verticalRuler(h);
    } // End drawRuler  


} // End Namespace PageDesigner.Ruler 


async function onDomReady()
{
    // import oneTwoThree = require("foo");
    // import * as estree from 'foo';
    // PageDesigner.Ruler.drawRuler(29.7, 21);
    // PageDesigner.Ruler.drawRuler(84.1, 118.9);
}
// Doesn't work...
if (document.addEventListener) document.addEventListener("DOMContentLoaded", onDomReady, false);
//else if (document.attachEvent) document.attachEvent("onreadystatechange", onDomReady);
else window.onload = onDomReady;


function onDomLoadFinished(a, b?, c?)
{
    // https://developer.mozilla.org/en/docs/Web/API/Document/readyState
    // alternative to load event
    if (document.readyState === "complete") { a(); return 1 / 0; }

    document.onreadystatechange = function ()
    {
        // console.log("onreadystatechange:", document.readyState);

        if (document.readyState == "complete")
        {
            a(); // initApplication();
        } // End if (document.readyState == "complete") 

    }; // End onreadystatechange 
}

onDomLoadFinished(onDomReady);




/*
function onDomReady()
{
    horizonalRuler();
    verticalRuler();
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", onDomReady, false);
// else if (document.attachEvent) document.attachEvent("onreadystatechange", onDomReady);
else window.onload = onDomReady;
*/

//function onPageLoaded()
//{
//    console.log("page loaded");
//    executeStatement();
//}
//if (window.addEventListener) window.addEventListener("load", onPageLoaded, false);
//else if (window.attachEvent) window.attachEvent("onload", onPageLoaded);
//else window.onload = onPageLoaded;
