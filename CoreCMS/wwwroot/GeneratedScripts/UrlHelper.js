var Http;
(function (Http) {
    var URL = (function () {
        function URL() {
        }
        URL.removeStyle = function (styleDict, key) {
            var index = styleDict.indexOf(key);
            if (index > -1) {
                styleDict.splice(index, 1);
            }
        };
        URL.addStyle = function (styleDict, key, value) {
            styleDict.push(key);
            styleDict[key] = value;
        };
        URL.styleToDict = function () {
            var style = "";
            var styleDict = [], kvp, key, kvps = style.split(";");
            for (var i = 0; i < kvps.length; i++) {
                kvp = kvps[i].split(':');
                key = kvp[0].toLowerCase().trim();
                if (key === "")
                    continue;
                styleDict.push(key);
                styleDict[key] = kvp[1].trim();
            }
            return styleDict;
        };
        URL.dictToStyle = function (styleDict) {
            var style = "";
            for (var i = 0; i < styleDict.length; ++i) {
                style = style + styleDict[i] + ": " + styleDict[styleDict[i]] + "; ";
            }
            return style;
        };
        Object.defineProperty(URL, "Parameters", {
            get: function () {
                var vars = [], hash, key, hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split('=');
                    key = hash[0].toLowerCase();
                    vars.push(key);
                    vars[key] = hash[1];
                }
                return vars;
            },
            enumerable: true,
            configurable: true
        });
        URL.contains = function (key) {
            if (key == null)
                return false;
            key = key.toLowerCase();
            var params = this.Parameters, i = params.length;
            while (i--) {
                if (params[i] === key)
                    return true;
            }
            return false;
        };
        URL.encode = function (pd) {
            if (typeof pd == 'string' || pd instanceof String)
                return encodeURIComponent(pd);
            var k, sb = [];
            for (k in pd)
                sb.push(encodeURIComponent(k) + "=" + encodeURIComponent(pd[k]));
            return ("&" + sb.join("&"));
        };
        return URL;
    }());
    Http.URL = URL;
})(Http || (Http = {}));
