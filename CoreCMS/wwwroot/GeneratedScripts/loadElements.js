var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PageDesigner;
(function (PageDesigner) {
    var UI;
    (function (UI) {
        function isSwissReInPath() {
            if (window.location.href) {
                var lcURL = window.location.href;
                lcURL = lcURL.toLowerCase();
                var ind = lcURL.lastIndexOf("/");
                if (ind != -1)
                    lcURL = lcURL.substr(0, ind);
                return (lcURL.indexOf("swissre") != -1);
            }
            return false;
        }
        var isSwissRe = isSwissReInPath();
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        function compareStrings(string1, string2, ignoreCase, useLocale) {
            if (string1 == null && string2 == null)
                return true;
            if (string1 == null || string2 == null)
                return false;
            if (ignoreCase) {
                if (useLocale) {
                    string1 = string1.toLocaleLowerCase();
                    string2 = string2.toLocaleLowerCase();
                }
                else {
                    string1 = string1.toLowerCase();
                    string2 = string2.toLowerCase();
                }
            }
            return string1 === string2;
        }
        function fX(e) {
            return (e.touches && e.touches.length) ? e.touches[0].pageX
                : e.pageX || event.pageX || (event.clientX);
        }
        function fY(e) {
            return (e.touches && e.touches.length) ? e.touches[0].pageY
                : e.pageY || event.pageY || (event.clientY);
        }
        function htmlEncode(text) {
            var ret = null, span = document.createElement("span");
            span.appendChild(document.createTextNode(text));
            ret = span.innerHTML;
            span = null;
            return ret;
        }
        function setElementPosition(mes, page, element, event) {
            var ele = null;
            if (typeof element === 'string' || element instanceof String)
                ele = document.getElementById(element);
            else
                ele = element;
            var rect = page.getBoundingClientRect();
            var measure = mes.getBoundingClientRect();
            var onecmW = measure.width;
            var onecmH = measure.height;
            var w = ele.offsetWidth;
            var h = ele.offsetHeight;
            var x = rect.right + (window.scrollX | window.pageXOffset) - onecmW - w;
            var y = fY(event) - rect.top - (window.scrollY | window.pageYOffset);
            ele.style.left = (x / onecmW) + "cm";
            ele.style.top = (y / onecmH) + "cm";
        }
        function getPageSize(w, h) {
            var someFormat = { "w": w, "h": h };
            function querformat(f) {
                var quer = JSON.parse(JSON.stringify(f));
                if (f.h > f.w) {
                    quer.w = f.h;
                    quer.h = f.w;
                }
                return quer;
            }
            function hochformat(f) {
                var hoch = JSON.parse(JSON.stringify(f));
                if (f.h < f.w) {
                    hoch.w = f.h;
                    hoch.h = f.w;
                }
                return hoch;
            }
            return querformat(someFormat);
        }
        function getFirstBrowserLanguage() {
            var nav = window.navigator, browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'], i, language;
            if (Object.prototype.toString.call(nav.languages) === '[object Array]') {
                for (i = 0; i < nav.languages.length; i++) {
                    language = nav.languages[i];
                    if (language && language.length) {
                        return language;
                    }
                }
            }
            for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
                language = nav[browserLanguagePropertyKeys[i]];
                if (language && language.length) {
                    return language;
                }
            }
            return null;
        }
        function getBrowserLanguage(dft) {
            var bl = getFirstBrowserLanguage() || dft, pos = bl.indexOf("-");
            if (pos !== -1)
                bl = bl.substr(0, pos);
            return bl.toLowerCase();
        }
        function getUserLanguage() {
            var def = "de";
            var lang = getBrowserLanguage(def);
            if (lang != "de" && lang != "fr" && lang != "it" && lang != "en")
                lang = "de";
            return lang;
        }
        function iOS() {
            if (!!navigator.platform) {
                var iDevices = [
                    'iPad Simulator',
                    'iPhone Simulator',
                    'iPod Simulator',
                    'iPad',
                    'iPhone',
                    'iPod'
                ];
                while (iDevices.length) {
                    if (navigator.platform === iDevices.pop())
                        return true;
                }
            }
            return false;
        }
        function iOsBlocker() {
            if (iOS()) {
                var language = getUserLanguage();
                var safari_warning = document.getElementById("safari_warning");
                var safari_warning_title = document.getElementById("no_safari_title_" + language);
                var no_safari = document.getElementById("no_safari_" + language);
                safari_warning.style.display = "block";
                safari_warning_title.style.display = "block";
                no_safari.style.display = "block";
            }
        }
        UI.iOsBlocker = iOsBlocker;
        function logoRenderer(plk_uid) {
            var dr = {
                "PL_UID": guid(),
                "PL_PLK_UID": plk_uid,
                "PL_Type": "image",
                "PL_Format": null,
                "PL_X": 2.0,
                "PL_Y": 2.0,
                "PL_W": 4.0,
                "PL_H": 1.0,
                "PL_Angle": 0,
                "PL_AspectRatio": "xMinYMin meet",
                "PL_AlignH": null,
                "PL_AlignV": null,
                "PL_Text": isSwissRe ?
                    "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\" version=\"1.1\" id=\"svg9498\" width=\"100%\" height=\"100%\" viewBox=\"-10.6299372 -10.6299372 1530.5224744 375.5911144\" preserveAspectRatio=\"xMinYMin meet\"><path style=\"fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"m 265.91,124.35875 -177.17175,0 0,-37.30625 177.17175,0 0,37.30625 z m -1.5525,142.97637 -39.48375,0 0,-115.01512 39.48375,0 0,115.01512 z m -67.45125,0 -39.48,0 0,-115.01512 39.48,0 0,115.01512 z m -67.13875,0 -39.477,0 0,-115.01512 39.477,0 0,115.01512 z M 177.1675,0 C 79.32025,0 0,79.3175 0,177.1625 0,275.01 79.32025,354.33125 177.1675,354.33125 c 97.8475,0 177.165,-79.32125 177.165,-177.16875 C 354.3325,79.3175 275.015,0 177.1675,0\" /><path style=\"fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none\" d=\"m 1447.4126,160.865 c 18.75,0 22.3375,15.5525 23.15,30.7175 l -44.2875,0 c 0.3875,-13.5725 4.3875,-30.7175 21.1375,-30.7175 z m 2.4,87.354 c -19.9501,0 -23.5375,-17.15388 -23.5375,-33.89275 l 82.9875,0 c 0,-40.30625 -14.3625,-76.20125 -61.0375,-76.20125 -40.3,0 -60.6375,32.70875 -60.6375,69.81375 0,38.6865 23.125,63.02487 61.8125,63.02487 26.35,0 53.4625,-11.15625 55.4625,-40.6885 l -33.5,0 c -2.4125,11.9575 -9.175,17.94388 -21.55,17.94388 m -153.2001,-83.37775 -27.925,0 0,-49.4575 28.3125,0 c 15.975,0 29.1375,6.76625 29.1375,24.33375 0,17.94375 -13.1625,25.12375 -29.525,25.12375 z M 1327.725,178.01 c 22.35,-6.38 39.1125,-19.94 39.1125,-44.67375 0,-34.7175 -32.325,-46.2775 -62.25,-46.2775 l -74.5925,0 0,180.32137 38.6925,0 0,-73.00637 30.325,0 c 34.7125,0 26.325,48.2675 31.9,73.00637 l 42.3,0 c -19.1625,-33.9175 4,-79.79512 -45.4875,-89.37012 m -176.3275,-3.1925 -33.5137,0 c -0.7975,-9.18 -9.18,-13.9525 -17.9438,-13.9525 -7.9837,0 -19.5537,2.39 -19.1562,12.76 0.4,7.98 9.18,10.37125 15.555,11.95875 l 14.3737,3.60875 c 21.9438,4.78 47.075,13.9525 47.075,40.28525 0,31.90962 -32.7325,41.48587 -59.0587,41.48587 -25.9275,0 -51.4575,-11.5635 -53.45,-39.48975 l 34.71,0 c 1.195,11.16738 9.975,16.74513 20.7475,16.74513 9.5775,0 21.9275,-3.984 21.9275,-15.54788 0,-23.93612 -74.995,-6.78862 -74.995,-55.45737 0,-29.51875 29.53,-39.08875 54.2625,-39.08875 22.7412,0 45.4812,9.17125 49.0675,33.90625 l 0.3987,2.78625 m -123.2662,0 -33.51255,0 c -0.81375,-9.18 -9.18,-13.9525 -17.96,-13.9525 -7.98375,0 -19.55375,2.39 -19.15625,12.76 0.39875,7.98 9.18,10.37125 15.57,11.95875 l 14.35875,3.60875 c 21.94375,4.78 47.07505,13.9525 47.07505,40.28525 0,31.90962 -32.7175,41.48587 -59.04255,41.48587 -25.92875,0 -51.4575,-11.5635 -53.46625,-39.48975 l 34.70875,0 c 1.195,11.16738 9.97625,16.74513 20.74875,16.74513 9.5775,0 21.94375,-3.984 21.94375,-15.54788 0,-23.93612 -75.01125,-6.78862 -75.01125,-55.45737 0,-29.51875 29.53,-39.08875 54.2625,-39.08875 22.7412,0 45.4813,9.17125 49.0675,33.90625 l 0.4138,2.78625 m -165.5763,-56.645 39.90475,0 0,-31.11325 -39.90475,0 0,31.11325 z m 1.195,149.20762 37.499,0 0,-125.67 -37.499,0 0,125.67 z m -105.71875,0 -17.94375,-59.84387 c -4,-13.1625 -6.39,-26.33875 -9.17875,-39.50125 -2.00875,9.58 -3.58625,19.1675 -6.39125,28.33375 l -2.78875,9.97625 -16.74875,61.03512 -44.28625,0 L 619.5975,141.71 l 42.29125,0 17.5625,65.82625 2.39,9.16625 1.99125,8.785 c 0.7975,5.189 1.59375,10.37112 2.39125,15.55375 1.99125,-15.15875 5.59375,-29.51375 9.5775,-43.87625 l 15.5525,-55.455 43.0925,0 16.35,57.84625 c 3.99875,13.565 6.78875,27.12375 8.78125,41.09487 l 1.195,-7.1885 c 1.5925,-11.95887 4.78,-23.52887 8.3825,-35.50012 l 15.5525,-56.2525 40.3025,0 -43.09,125.67012 -43.88875,0 M 605.23,137.72 l -37.1,0 c -0.395,-17.5625 -13.16875,-27.53125 -30.31625,-27.53125 -14.76375,0 -31.91,5.5775 -31.91,23.1475 0,39.8875 104.515,13.5625 104.515,78.9875 0,40.3 -34.70875,58.63987 -71.41,58.63987 -41.89625,0 -76.5975,-14.74462 -76.19625,-60.63362 l 39.49625,0 c 0,19.94512 10.7725,33.50862 31.91,33.50862 15.5625,0 36.31125,-5.57725 36.31125,-24.33612 0,-41.8875 -102.93,-13.55875 -102.93,-80.98 0,-39.90375 37.09875,-55.4575 71.40875,-55.4575 36.3025,0 63.83,17.555 66.22125,54.655\" /></svg>"
                    : "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 2560 1600\" preserveAspectRatio=\"xMaxYMin meet\"><path fill=\"#127CC1\" d=\"M2478.72 454.403C2364.834-100.744 1290.63-135.9 598.194 287.048v46.712C1289.72-23.19 2270.966-20.914 2360.257 490.463c30.088 169.408-64.676 345.6-234.592 446.977v132.67c204.542-75.048 413.622-317.95 353.054-615.707m-1259.152 971.975c-477.868 44.23-975.784-25.388-1045.49-400.268-34.62-184.596 49.655-380.52 160.816-502.078v-65.085C134.45 635.377 25.57 858.54 88.434 1122.035c80.174 338.135 507.482 529.535 1159.837 465.806 258.295-24.936 596.323-108.393 830.915-237.863v-183.94c-213.193 127.67-565.796 233.15-859.617 260.34z\"/><path fill=\"#127CC1\" d=\"M2146.218 417.98c7.19 0 14.212 1.807 21.062 5.42 6.85 3.61 12.187 8.778 16.01 15.5 3.822 6.725 5.733 13.735 5.733 21.033 0 7.223-1.882 14.17-5.648 20.837-3.767 6.668-9.046 11.845-15.84 15.53-6.793 3.686-13.9 5.53-21.317 5.53s-14.525-1.844-21.318-5.53c-6.794-3.685-12.083-8.862-15.867-15.53-3.785-6.668-5.678-13.614-5.678-20.837 0-7.298 1.92-14.308 5.763-21.032 3.84-6.722 9.188-11.89 16.038-15.5 6.85-3.613 13.87-5.42 21.062-5.42zm0 6.947c-6.018 0-11.875 1.51-17.57 4.528-5.697 3.02-10.154 7.335-13.37 12.947-3.217 5.612-4.826 11.456-4.826 17.53 0 6.04 1.58 11.827 4.74 17.365 3.16 5.538 7.58 9.854 13.257 12.947 5.676 3.093 11.6 4.64 17.768 4.64s12.093-1.547 17.77-4.64 10.085-7.41 13.227-12.947c3.14-5.538 4.712-11.326 4.712-17.364 0-6.075-1.6-11.92-4.797-17.53-3.198-5.613-7.656-9.928-13.37-12.948-5.715-3.018-11.563-4.528-17.542-4.528zm-18.79 58.176v-45.12h15.838c5.412 0 9.33.418 11.752 1.252 2.422.833 4.35 2.287 5.79 4.362 1.438 2.074 2.158 4.278 2.158 6.612 0 3.296-1.202 6.167-3.606 8.61s-5.59 3.817-9.565 4.113c1.627.667 2.933 1.464 3.917 2.39 1.854 1.778 4.125 4.76 6.813 8.946l5.62 8.834h-9.083l-4.088-7.113c-3.217-5.592-5.81-9.093-7.778-10.5-1.362-1.037-3.35-1.557-5.96-1.557h-4.372v19.17h-7.437zm7.436-25.393h9.027c4.315 0 7.258-.63 8.83-1.89 1.568-1.258 2.354-2.925 2.354-5 0-1.334-.38-2.528-1.134-3.584-.758-1.056-1.81-1.843-3.152-2.362-1.344-.518-3.832-.777-7.465-.777h-8.46v13.613z\"/><g fill=\"#127CC1\"><path d=\"M571.49 615.61h-37.72c-9.953 0-19.045 5.82-23.747 15.22l-67.795 137.387-67.813-137.42c-4.684-9.368-13.776-15.188-23.729-15.188h-37.72c-14.28 0-25.9 11.618-25.9 25.9v316.484c0 8.344 6.443 14.4 15.32 14.4h46.46c8.056 0 14.86-7.647 14.86-16.7V764.037l34.114 67.172.103.194c3.946 7.235 12.11 11.73 21.305 11.73h46.46c9.195 0 17.36-4.495 21.305-11.73l33.756-67.152v191.442c0 9.053 6.805 16.7 14.86 16.7h46.46c8.877 0 15.32-6.056 15.32-14.4V641.51c0-14.282-11.62-25.9-25.9-25.9zM733.404 694.73c-36.572 0-66.87 12.128-87.617 35.073-19.512 21.58-29.825 51.652-29.825 86.97v37.26c0 35.318 10.313 65.39 29.825 86.97 20.747 22.943 51.044 35.07 87.617 35.07s66.87-12.127 87.617-35.07c19.512-21.58 29.825-51.652 29.825-86.97v-37.26c0-35.318-10.313-65.392-29.824-86.97-20.747-22.945-51.044-35.072-87.616-35.072zm41.72 159.303c0 20.392-5.42 54.6-41.72 54.6s-41.72-34.208-41.72-54.6v-37.26c0-20.392 5.42-54.602 41.72-54.602s41.72 34.21 41.72 54.602v37.26zM1005.26 694.73c-27.39 0-45.34 4.176-67.368 16.528-1.572-7.587-8.308-13.307-16.354-13.307h-40.02c-9.21 0-16.7 7.492-16.7 16.7v240.584c0 9.302 7.647 17.16 16.7 17.16h42.32c9.053 0 16.7-7.858 16.7-17.16V774.89c18.674-9.412 32.515-13.64 44.48-13.64 18.95 0 23.997 3.59 26.628 7.466 4.16 6.127 4.974 18.043 4.974 36.555v149.964c0 9.302 7.647 17.16 16.7 17.16h42.32c9.053 0 16.7-7.858 16.7-17.16V805.27c0-35.362-5.116-59.963-16.102-77.42-14.024-22.287-37.24-33.12-70.98-33.12zM1223.757 694.73c-36.572 0-66.87 12.128-87.617 35.073-19.512 21.578-29.825 51.652-29.825 86.97v37.26c0 35.318 10.313 65.39 29.825 86.97 20.747 22.943 51.044 35.07 87.617 35.07s66.87-12.127 87.616-35.07c19.512-21.58 29.825-51.652 29.825-86.97v-37.26c0-35.318-10.313-65.39-29.825-86.97-20.747-22.945-51.044-35.072-87.616-35.072zm41.72 159.303c0 20.392-5.42 54.6-41.72 54.6s-41.72-34.208-41.72-54.6v-37.26c0-20.392 5.42-54.602 41.72-54.602s41.72 34.21 41.72 54.602v37.26zM1467.553 694.73c-29.473 0-64.74 4.56-94.355 12.204-11.13 2.903-18.027 7.207-18.027 19.677v320.165c0 9.21 7.492 16.7 16.7 16.7h42.32c9.21 0 16.702-7.49 16.702-16.7v-72.94c12.834 1.437 25.826 2.24 36.66 2.24 38.358 0 68.057-11.19 88.274-33.255 19.355-21.125 29.168-51.306 29.168-89.707v-35.42c0-38.4-9.813-68.584-29.168-89.71-20.217-22.064-49.916-33.252-88.273-33.252zm41.72 158.383c0 41.396-12.086 58.28-41.72 58.28-8.628 0-24.12-.907-36.66-2.328V761.5c9.44-1.237 23.796-2.086 36.66-2.086 29.633 0 41.72 16.885 41.72 58.28v35.42zM1707.21 694.73c-36.572 0-66.87 12.128-87.616 35.073-19.512 21.58-29.825 51.652-29.825 86.97v37.26c0 35.318 10.312 65.39 29.824 86.97 20.747 22.943 51.044 35.07 87.616 35.07s66.87-12.127 87.617-35.07c19.512-21.58 29.825-51.652 29.825-86.97v-37.26c0-35.318-10.313-65.392-29.825-86.97-20.747-22.945-51.045-35.072-87.617-35.072zm41.72 159.303c0 20.392-5.42 54.6-41.72 54.6s-41.72-34.208-41.72-54.6v-37.26c0-20.392 5.42-54.602 41.72-54.602s41.72 34.21 41.72 54.602v37.26zM1900.405 607.33h-42.78c-9.21 0-16.7 7.49-16.7 16.7v331.204c0 9.302 7.646 17.16 16.7 17.16h42.78c8.954 0 16.24-7.698 16.24-17.16V624.03c0-9.365-7.133-16.7-16.24-16.7zM2156.16 697.95h-46.92c-7.772 0-14.69 5.704-16.495 13.58l-46.4 184.74L2000.617 712c-1.563-6.83-7.69-14.05-16.038-14.05h-46.462c-9.865 0-16.24 5.834-16.24 14.86 0 1.19 0 2.974.788 5.42l60.23 210.57c10.533 36.392 28.824 42.904 44.376 43.54l-1.174 4.404c-5.46 20.28-12.37 23.89-29.1 23.89-7.435 0-20.025-.828-31.133-1.56-7.852-.516-15.27-1.005-20.58-1.194l-1.186-.005c-9.522 0-16.702 6.784-16.702 15.78v29.44c0 10.827 10.856 13.875 15.085 15.03 11.082 3.344 34.786 6.27 50.836 6.27 32.812 0 54.368-5.888 69.892-19.094 16.814-14.302 24.914-36.604 31.16-58.563l76.68-268.147c.89-2.182.89-4.113.89-5.32 0-8.447-7.08-15.32-15.78-15.32z\"/></g></svg>",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            return new ImageFragment(dr);
        }
        UI.logoRenderer = logoRenderer;
        function drawingRenderer(plk_uid) {
            var dr = {
                "PL_UID": guid(),
                "PL_PLK_UID": plk_uid,
                "PL_Type": "image",
                "PL_Format": null,
                "PL_X": 2.0,
                "PL_Y": 2.0,
                "PL_W": 5.0,
                "PL_H": 5.0,
                "PL_Angle": 0,
                "PL_AspectRatio": "xMinYMin meet",
                "PL_AlignH": null,
                "PL_AlignV": null,
                "PL_Text_DE": null,
                "PL_Text_FR": null,
                "PL_Text_IT": null,
                "PL_Text_EN": null,
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            return new ImageFragment(dr);
        }
        UI.drawingRenderer = drawingRenderer;
        function titleRenderer(plk_uid) {
            var dr = {
                "PL_UID": guid(),
                "PL_PLK_UID": plk_uid,
                "PL_Type": "text",
                "PL_Format": "plain",
                "PL_X": 2.0,
                "PL_Y": 2.0,
                "PL_W": 15.0,
                "PL_H": 2.0,
                "PL_Angle": 0,
                "PL_AspectRatio": null,
                "PL_AlignH": null,
                "PL_AlignV": null,
                "PL_Text": isSwissRe ? "{@LC_Lang_en} - {@PR_Name} - {@FloorDisplayString} - {@Darstellung}" : "{@Heute} - {@SO_Nr} {@SO_Bezeichnung} - {@GB_Nr} {@GB_Bezeichnung} - {@PLZ} - {@Ort} - {@GS_Display_Kurz} - {@GS_Display_Lang} - {@Darstellung} - {@Vorname} - {@Nachname} - {@Benutzer}",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": isSwissRe ? "tfu_VWS_PDF_LegendeTitelDaten_SwissRe" : "tfu_VWS_PDF_LegendeTitelDaten",
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            return new PlainTextFragment(dr);
        }
        UI.titleRenderer = titleRenderer;
        function dateRenderer(plk_uid) {
            var page = document.getElementById("page");
            var mes = document.getElementById("measure");
            var dr = {
                "PL_UID": guid(),
                "PL_PLK_UID": plk_uid,
                "PL_Type": "text",
                "PL_Format": "date",
                "PL_X": 2.0,
                "PL_Y": 2.0,
                "PL_W": 8.0,
                "PL_H": 2.0,
                "PL_Angle": 0,
                "PL_AspectRatio": null,
                "PL_AlignH": null,
                "PL_AlignV": null,
                "PL_Text": "dd'-'MMM'-'yyyy",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            return new PlainTextFragment(dr);
        }
        UI.dateRenderer = dateRenderer;
        function legendRenderer(plk_uid) {
            var dr = {
                "PL_UID": guid(),
                "PL_PLK_UID": plk_uid,
                "PL_Type": "legend",
                "PL_Format": "html",
                "PL_X": 2.0,
                "PL_Y": 2.0,
                "PL_W": 5.0,
                "PL_H": 10.0,
                "PL_Angle": 0,
                "PL_AspectRatio": null,
                "PL_AlignH": null,
                "PL_AlignV": null,
                "PL_Text_DE": "",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            return new LegendFragment(dr);
        }
        UI.legendRenderer = legendRenderer;
        function borderRenderer(plk_uid) {
            var dr = {
                "PL_UID": guid(),
                "PL_PLK_UID": plk_uid,
                "PL_Type": "rectangle",
                "PL_Format": null,
                "PL_X": 2.0,
                "PL_Y": 2.0,
                "PL_W": 5.0,
                "PL_H": 5.0,
                "PL_Angle": 0,
                "PL_AspectRatio": null,
                "PL_AlignH": null,
                "PL_AlignV": null,
                "PL_Text_DE": "",
                "PL_Text_FR": "",
                "PL_Text_IT": "",
                "PL_Text_EN": "",
                "PL_Outline": false,
                "PL_Style": null,
                "PL_DataBind": null,
                "PL_Sort": UI.getMaxZindex(),
                "PL_Status": 1
            };
            return new LegendFragment(dr);
        }
        UI.borderRenderer = borderRenderer;
        function addElement(element, event) {
            var page = document.getElementById("page");
            var mes = document.getElementById("measure");
            var plk_uid = mes.getAttribute("data-plk_uid");
            var renderer = element.getAttribute("data-render-control");
            var fn = window["PageDesigner"]["UI"][renderer + "Renderer"];
            var control = fn(plk_uid);
            var html = control.RenderFragment();
            page.insertAdjacentHTML("beforeend", html);
            setElementPosition(mes, page, control.PL_UID, event);
            PageDesigner.UI.Init();
            PageDesigner.UI.dispatchSave();
        }
        UI.addElement = addElement;
        function mainMenuApply(dialog) {
            console.log("mainMenuApply");
            var mes = document.getElementById("measure");
            var selPaperFormat = document.getElementById("selPaperFormat");
            var selCategory = document.getElementById("selCathegory");
            var ps_uid = null;
            var plk_code = null;
            var paperWidth = 84.1;
            var paperHeight = 118.9;
            var paperFormat = "A0";
            if (selPaperFormat.selectedIndex != -1) {
                plk_code = selPaperFormat.options[selPaperFormat.selectedIndex].text;
                if (plk_code != null)
                    plk_code = plk_code.substr(0, 10);
                var temp = selPaperFormat.value.split(";");
                ps_uid = temp[0];
                paperWidth = parseFloat(temp[1]) / 10.0;
                paperHeight = parseFloat(temp[2]) / 10.0;
                paperFormat = temp[3];
            }
            mes.innerHTML = "";
            mes.appendChild(document.createTextNode(paperFormat));
            if (selCategory.selectedIndex != -1) {
                if (selCategory.value === 'custom') {
                    var newCategoryName = document.getElementById("txtNewCategory").value;
                    var newCategory_1 = {
                        "PLK_UID": guid(),
                        "PLK_Code": plk_code,
                        "PLK_PS_UID": ps_uid,
                        "PLK_DAR_UID": null,
                        "PLK_Name_DE": newCategoryName,
                        "PLK_Name_FR": newCategoryName,
                        "PLK_Name_IT": newCategoryName,
                        "PLK_Name_EN": newCategoryName,
                        "PLK_IsDefault": false,
                        "PLK_Status": 1
                    };
                    new Http.Json("../../ajax/anyInsert.ashx?sql=PL_T_VWS_Ref_PdfLegendenKategorie_Insert.sql", newCategory_1, function (result) {
                        mes.setAttribute("data-plk_uid", newCategory_1.PLK_UID);
                        loadElements(dialog, newCategory_1.PLK_UID, paperWidth, paperHeight);
                    }).send();
                    return;
                }
                mes.setAttribute("data-plk_uid", selCategory.value);
                loadElements(dialog, selCategory.value, paperWidth, paperHeight);
            }
            document.getElementById("paperMenu").style.display = "none";
        }
        UI.mainMenuApply = mainMenuApply;
        function loadElements(dialog, plk_uid, paperWidth, paperHeight) {
            console.log("loadElements");
            dialog.parentElement.parentElement.style.display = 'none';
            var page = document.getElementById("page");
            page.style.width = paperWidth + "cm";
            page.style.height = paperHeight + "cm";
            PageDesigner.Ruler.drawRuler(paperWidth, paperHeight);
            var tools = document.getElementById("tools");
            tools.style.left = (1 + paperWidth) + "cm";
            var params = { "PL_PLK_UID": plk_uid };
            new Http.PostJSON("../../ajax/anyList.ashx?sql=PL_Load_LegendeByCategory_List.sql", params, function (data) {
                for (var i = 0; i < data.length; ++i) {
                    var pl_type = data[i]["PL_Type"];
                    var ctrl = null;
                    if (compareStrings("image", pl_type, true, false)) {
                        ctrl = new ImageFragment(data[i]);
                    }
                    else if (compareStrings("text", pl_type, true, false)) {
                        ctrl = new PlainTextFragment(data[i]);
                    }
                    else if (compareStrings("legend", pl_type, true, false)) {
                        ctrl = new LegendFragment(data[i]);
                    }
                    else if (compareStrings("rectangle", pl_type, true, false)) {
                        ctrl = new RectangleFragment(data[i]);
                    }
                    else {
                        throw Error("type \"" + pl_type + "\" is not supported in legend");
                    }
                    var html = ctrl.RenderFragment();
                    page.insertAdjacentHTML("beforeend", html);
                }
                PageDesigner.UI.Init();
            }).send();
        }
        var DrawingControl = (function () {
            function DrawingControl(dataRow) {
                this.RenderFragment = this.RenderFragment.bind(this);
                this.m_data = dataRow;
                this.m_PL_UID = dataRow["PL_UID"];
                this.m_X = dataRow["PL_X"];
                this.m_Y = dataRow["PL_Y"];
                this.m_Width = dataRow["PL_W"];
                this.m_Height = dataRow["PL_H"];
                this.m_Angle = dataRow["PL_Angle"];
                this.m_Text = dataRow["PL_Text"];
                this.m_Sort = dataRow["PL_Sort"];
                this.m_AspectRatio = dataRow["PL_AspectRatio"];
                this.m_Format = dataRow["PL_Format"];
                this.m_Type = dataRow["PL_Type"];
                this.m_dataBind = dataRow["PL_DataBind"];
                if (this.m_dataBind == null)
                    this.m_dataBind = null;
            }
            Object.defineProperty(DrawingControl.prototype, "PL_UID", {
                get: function () {
                    return this.m_PL_UID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "X", {
                get: function () {
                    return this.m_X;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Y", {
                get: function () {
                    return this.m_Y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Width", {
                get: function () {
                    return this.m_Width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Height", {
                get: function () {
                    return this.m_Height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Angle", {
                get: function () {
                    return this.m_Angle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Text", {
                get: function () {
                    return this.m_Text;
                },
                set: function (value) {
                    this.m_Text = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Sort", {
                get: function () {
                    return this.m_Sort;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Type", {
                get: function () {
                    return this.m_Type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Format", {
                get: function () {
                    return this.m_Format;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "OutlineColor", {
                get: function () {
                    return "hotpink";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "AspectRatio", {
                get: function () {
                    return this.m_AspectRatio;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Color", {
                get: function () {
                    if (compareStrings("legend", this.Type, true, false)) {
                        return "rgb(242,244,246)";
                    }
                    if (compareStrings("date", this.Format, true, false)) {
                        return "rgba(255,255,255, 0.5)";
                    }
                    if (compareStrings("rectangle", this.Type, true, false)) {
                        return "rgba(228, 255, 226, 0.75); border: 1px solid black";
                    }
                    if (this.m_Color == null)
                        this.m_Color = "";
                    return this.m_Color;
                },
                set: function (value) {
                    this.m_Color = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "DataBind", {
                get: function () {
                    return this.m_dataBind;
                },
                set: function (value) {
                    this.m_dataBind = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrawingControl.prototype, "Svg", {
                get: function () {
                    return this.m_Svg;
                },
                enumerable: true,
                configurable: true
            });
            DrawingControl.prototype.RenderFragment = function () {
                throw Error("RenderFragment not implemented...");
            };
            return DrawingControl;
        }());
        UI.DrawingControl = DrawingControl;
        var RectangleFragment = (function (_super) {
            __extends(RectangleFragment, _super);
            function RectangleFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            RectangleFragment.prototype.RenderFragment = function () {
                var abc = isSwissRe ? "<h3>Border-Box</h3>" : "<h3>Blattrand</h3 >";
                var html = "\n<div id=\"" + this.PL_UID + "\" data-type=\"" + this.Type + "\" data-format=\"" + this.Format + "\" style=\"display: block; position: absolute;\nleft: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + "cm;\nz-index: " + this.Sort + "; background-color: " + this.Color + "; border: 1px solid black; \" >" + abc + "</div>\n";
                return html;
            };
            return RectangleFragment;
        }(DrawingControl));
        UI.RectangleFragment = RectangleFragment;
        var LegendFragment = (function (_super) {
            __extends(LegendFragment, _super);
            function LegendFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            LegendFragment.prototype.RenderFragment = function () {
                if (this.Legende == null) {
                    if (compareStrings(this.Type, "legend", true, false))
                        this.Legende = isSwissRe ? "<h3>Legend Placeholder</h3>" : "<h3>Platzhalter f\u00FCr Legende</h3 >";
                    else
                        this.Legende = isSwissRe ? "<h3 style=\"padding: 0.25cm;\">Border-Box</h3>" : "<h3 style=\"padding: 0.25cm;\">Rahmen</h3 >";
                }
                var html = "\n<div id=\"" + this.PL_UID + "\" data-type=\"" + this.Type + "\" data-format=\"" + this.Format + "\" style=\"display: block; position: absolute;\nleft: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + "cm;\nz-index: " + this.Sort + "; background-color: " + this.Color + "; border: 1px solid black; \" >" + this.Legende + "</div>\n";
                return html;
            };
            return LegendFragment;
        }(DrawingControl));
        UI.LegendFragment = LegendFragment;
        var ImageFragment = (function (_super) {
            __extends(ImageFragment, _super);
            function ImageFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            ImageFragment.prototype.RenderFragment = function () {
                if (this.Text != null && this.Text[0] == "~") {
                    console.log("load from FS not implemented", this.Text);
                }
                if (this.Text == null) {
                    this.Text = "<iframe onload=\"forwardMouse(this);\" src= \"plan_forum.svg\" style=\"width: 100%; height: 100%; z-index: -5;\" frameborder= \"0\" ></iframe>";
                }
                if (this.Text != null && this.Text != "") {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(this.Text, "image/svg+xml").documentElement;
                    parser = null;
                    var attrWidth = null;
                    var attrHeight = null;
                    var attrRatio = null;
                    doc.setAttribute("width", "100%");
                    doc.setAttribute("height", "100%");
                    doc.setAttribute("preserveAspectRatio", this.AspectRatio);
                    var serializer = new XMLSerializer();
                    this.Text = serializer.serializeToString(doc);
                    doc = null;
                    serializer = null;
                }
                var html = "\n<div id=\"" + this.PL_UID + "\" data-type=\"image\" style=\"position: absolute; display: block; z-index: " + this.Sort + ";\nleft: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + "cm;\nbackground-color: rgba(245,245,245, 0.75); border: 1px solid #e6e6e6; border: none; \" >" + this.Text + "\n</div>\n";
                return html;
            };
            return ImageFragment;
        }(DrawingControl));
        UI.ImageFragment = ImageFragment;
        var PlainTextFragment = (function (_super) {
            __extends(PlainTextFragment, _super);
            function PlainTextFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            PlainTextFragment.prototype.RenderFragment = function () {
                var strText;
                if (compareStrings("date", this.Format, true, false)) {
                    strText = this.Text;
                }
                else {
                    strText = this.Text;
                }
                if (strText == null || strText == "") {
                    strText = "some Text";
                }
                console.log("loadedText");
                var html = "\n<div id=\"" + this.PL_UID + "\" data-databind=\"" + this.DataBind + "\" data-type=\"text\" data-format=\"" + this.Format + "\" style=\"position: absolute; display: block; z-index: " + this.Sort + ";\nleft: " + this.X + "cm; top: " + this.Y + "cm; width: " + this.Width + "cm; height: " + this.Height + "cm;\nbackground-color: " + this.Color + ";\nborder: 1px solid " + this.OutlineColor + "; \" >\n    <div style=\"width: 100%; height: 100%; overflow: hidden;\nfont-family: 'Bodoni MT'; font-size: 1cm; padding: 0.25cm; \" >\n    <span contenteditable=\"true\">" + strText + "</span>\n    </div>\n</div>";
                console.log(html);
                return html;
            };
            return PlainTextFragment;
        }(DrawingControl));
        UI.PlainTextFragment = PlainTextFragment;
        var HtmlTextFragment = (function (_super) {
            __extends(HtmlTextFragment, _super);
            function HtmlTextFragment(dataRow) {
                var _this = _super.call(this, dataRow) || this;
                _this.RenderFragment = _this.RenderFragment.bind(_this);
                _this.m_data = dataRow;
                return _this;
            }
            return HtmlTextFragment;
        }(DrawingControl));
        UI.HtmlTextFragment = HtmlTextFragment;
    })(UI = PageDesigner.UI || (PageDesigner.UI = {}));
})(PageDesigner || (PageDesigner = {}));
