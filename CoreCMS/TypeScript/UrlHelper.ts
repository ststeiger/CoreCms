
namespace Http
{
    
    declare var ActiveXObject: (type: string) => void;


    export class URL
    {


        //public static TestHttpFactories(key: string): void
        //{
        //    let XMLHttpFactories = [
        //        function () { return new XMLHttpRequest() },
        //        function () { return new ActiveXObject("Msxml2.XMLHTTP") },
        //        function () { return new ActiveXObject("Msxml3.XMLHTTP") },
        //        function () { return new ActiveXObject("Microsoft.XMLHTTP") }
        //    ];


        //    function createXMLHTTPObject(): XMLHttpRequest
        //    {
        //        var xmlhttp = false;
        //        for (var i = 0; i < this.XMLHttpFactories.length; i++)
        //        {
        //            try
        //            {
        //                xmlhttp = this.XMLHttpFactories[i]();
        //            }
        //            catch (e)
        //            {
        //                continue;
        //            }
        //            break;
        //        } // Next i

        //        return <XMLHttpRequest><any>xmlhttp;
        //    } // End Function createXMLHTTPObject


        //} // End Sub TestHttpFactories 


        public static removeStyle(styleDict: string[], key: string): void
        {
            let index = styleDict.indexOf(key);

            if (index > -1)
            {
                styleDict.splice(index, 1);
            }

        }

        public static addStyle(styleDict: string[], key: string, value:string): void
        {
            styleDict.push(key);
            styleDict[key] = value;
        }


        public static styleToDict(): string[]
        {

            let style: string = "";

            let styleDict: string[] = [], kvp: string[], key: string
                , kvps = style.split(";");

            for (var i = 0; i < kvps.length; i++)
            {
                kvp = kvps[i].split(':');
                key = kvp[0].toLowerCase().trim();
                if (key === "") continue;

                styleDict.push(key);
                styleDict[key] = kvp[1].trim();
            }

            return styleDict;
        }


        public static dictToStyle(styleDict: string[]): string
        {
            let style="";

            for (let i = 0; i < styleDict.length; ++i)
            {
                style = style + styleDict[i] + ": " + styleDict[styleDict[i]] + "; ";
            }

            return style;
        }


        public static get Parameters(): string[]
        {
            let vars: string[] = [], hash: string[], key: string,
                hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for (var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                key = hash[0].toLowerCase();
                vars.push(key);
                vars[key] = hash[1];
            }

            return vars;
        }


        public static contains(key: string): boolean
        {
            if (key == null)
                return false;

            key = key.toLowerCase();
            let params: string[] = this.Parameters, i: number = params.length;
            while (i--)
            {
                if (params[i] === key)
                    return true;
            }
            
            return false;
        }
        
        
        protected static encode(pd:object | string):string
        {
            if (typeof pd == 'string' || pd instanceof String)
                return encodeURIComponent(<string>pd);
            
            let k, sb = [];
            for (k in pd)
                sb.push(encodeURIComponent(k) + "=" + encodeURIComponent(pd[k]));

            return ("&" + sb.join("&"));
        }
        
        
    } // End static class URL
	
    
} // End Namespace Http 
