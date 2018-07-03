
// https://blog.oio.de/2014/01/31/an-introduction-to-typescript-module-system/
// https://auth0.com/blog/javascript-module-systems-showdown/
// https://www.tutorialspoint.com/typescript/typescript_modules.htm
// https://stackoverflow.com/a/38662828/155077
// https://www.stevefenton.co.uk/2015/05/stop-mixing-typescript-internal-and-external-modules/
// https://stackoverflow.com/questions/30357634/how-do-i-use-namespaces-with-typescript-external-modules
// https://fizzylogic.nl/2016/02/07/typescript-internal-vs-external-modules/

// Actually the module keyword has been replaced with the namespace keyword.
// A better statement is thus Modules are what used to be called external modules,
// namespace is what used to be called internal modules.
// Stop mixing TypeScript internal and external modules.
// They aren't designed to work together.They are mutually exclusive.
// If you are using NodeJS, you don't even have to choose.
// You must use external modules so your code shouldn't have the 'module' keyword anywhere.
// The file is the module, so you don't need to write the word 'module'. Ever.


// For our server-side code we use CommonJS- style Node.js modules.
// For certain client-side code we prefer AMD.

// https://dotnetthoughts.net/using-node-services-in-aspnet-core/
// https://weblogs.asp.net/ricardoperes/asp-net-5-node-services
// http://fiyazhasan.me/execute-javascript-code-from-asp-net-core-using-inodeservices/
// https://weblogs.asp.net/jongalloway/using-node-js-in-an-asp-net-mvc-application-with-iisnode
// https://www.wintellect.com/five-reasons-asp-net-developers-should-care-about-node-js/


// https://stackoverflow.com/questions/45956045/can-an-asp-net-core-2-0-project-be-created-without-a-microsoft-aspnetcore-all-pa
// https://github.com/dotnet/standard/blob/release/2.0.0/Microsoft.Packaging.Tools.Trimming/docs/trimming.md
// https://andrewlock.net/the-microsoft-aspnetcore-all-metapackage-is-huge-and-thats-awesome-thanks-to-the-net-core-runtime-store-2/



console.log("started executing test.ts");


import { MySalute } from "./Salute";
import { MySalute as kung } from "./Salute";


MySalute.foo();
kung.foo();


let greeter = new MySalute.Greeter("world");

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function ()
{
    alert(greeter.greet());
}

// document.body.appendChild(button);

async function onDomReady()
{
    console.log("test.ts dom ready");
    document.body.appendChild(button);
}
// Doesn't work...
if (document.addEventListener) document.addEventListener("DOMContentLoaded", onDomReady, false);
//else if (document.attachEvent) document.attachEvent("onreadystatechange", onDomReady);
else window.onload = onDomReady;


function onDomLoadFinished(a, b?, c?)
{
    // https://developer.mozilla.org/en/docs/Web/API/Document/readyState
    // b = document, c = 'addEventListener';
    // b[c] ? b[c]('DOMContentLoaded', d) : window.attachEvent('onload', d);

    // alternative to DOMContentLoaded 
    // if (document.readyState === "interactive") { a(); return;}

    // alternative to load event
    if (document.readyState === "complete") { a(); return 1 / 0; }


    document.onreadystatechange = function ()
    {
        console.log("onreadystatechange:", document.readyState);

        // alternative to DOMContentLoaded 
        //if (document.readyState === "interactive")
        //{
        //    a(); // initApplication();
        //}

        // alternative to load event
        if (document.readyState == "complete")
        {
            a(); // initApplication();
        }

    }
}

onDomLoadFinished(onDomReady);


declare var require:(args:any) => any;


export const foo = "foo";
export const bar = "bar";


// const someModule = require('./someModule');
console.log("finished executing test.ts");
