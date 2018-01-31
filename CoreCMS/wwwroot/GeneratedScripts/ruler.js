var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PageDesigner;
(function (PageDesigner) {
    var Ruler;
    (function (Ruler) {
        function verticalRuler(w) {
            try {
                var vr = document.getElementById("verticalRuler"), myruler = vr.getElementsByClassName("ruler")[0], numCm = Math.ceil(w / 5) * 5;
                for (var i = 0; i < numCm; ++i) {
                    var div = document.createElement("div");
                    div.classList.add("vertical");
                    div.classList.add("cm");
                    var divHalf = document.createElement("div");
                    divHalf.classList.add("vertical");
                    divHalf.classList.add("halfcm");
                    divHalf.classList.add("first");
                    for (var j = 0; j < 4; ++j) {
                        var divmm = document.createElement("div");
                        divmm.classList.add("vertical");
                        divmm.classList.add("mm");
                        var divClear = document.createElement("div");
                        divClear.setAttribute("style", "clear: both; width: 0px; height: 0px;");
                        divHalf.appendChild(divmm);
                        divHalf.appendChild(divClear);
                    }
                    div.appendChild(divHalf);
                    divHalf = document.createElement("div");
                    divHalf.classList.add("vertical");
                    divHalf.classList.add("halfcm");
                    for (var j = 0; j < 4; ++j) {
                        var divmm = document.createElement("div");
                        divmm.classList.add("vertical");
                        divmm.classList.add("mm");
                        var divClear = document.createElement("div");
                        divClear.setAttribute("style", "clear: both; width: 0px; height: 0px;");
                        divHalf.appendChild(divmm);
                        divHalf.appendChild(divClear);
                    }
                    div.appendChild(divHalf);
                    myruler.appendChild(div);
                    div = document.createElement("div");
                    div.setAttribute("style", "clear: both; width: 0px; height: 0px;");
                    myruler.appendChild(div);
                }
                var scale = vr.getElementsByClassName("scale")[0];
                for (var i = 0; i < numCm; ++i) {
                    var div = document.createElement("div");
                    div.classList.add("vertical");
                    div.classList.add("cmlabel");
                    div.appendChild(document.createTextNode((i + 1).toString() + "cm"));
                    scale.appendChild(div);
                }
            }
            catch (e) {
                console.log("vertical");
                console.log(e);
            }
        }
        function horizonalRuler(l) {
            try {
                var hr = document.getElementById("horizontalRuler"), myruler = hr.getElementsByClassName("ruler")[0], numCm = Math.ceil((l + 10) / 10) * 10;
                for (var i = 0; i < numCm; ++i) {
                    var div = document.createElement("div");
                    div.classList.add("horizontal");
                    div.classList.add("cm");
                    var divHalf = document.createElement("div");
                    divHalf.classList.add("horizontal");
                    divHalf.classList.add("halfcm");
                    divHalf.classList.add("first");
                    for (var j = 0; j < 4; ++j) {
                        var divmm = document.createElement("div");
                        divmm.classList.add("horizontal");
                        divmm.classList.add("mm");
                        divHalf.appendChild(divmm);
                    }
                    div.appendChild(divHalf);
                    divHalf = document.createElement("div");
                    divHalf.classList.add("horizontal");
                    divHalf.classList.add("halfcm");
                    for (var j = 0; j < 4; ++j) {
                        var divmm = document.createElement("div");
                        divmm.classList.add("horizontal");
                        divmm.classList.add("mm");
                        divHalf.appendChild(divmm);
                    }
                    div.appendChild(divHalf);
                    myruler.appendChild(div);
                }
                var numRuler = hr.getElementsByClassName("scale")[0];
                for (var i = 0; i < numCm; ++i) {
                    var div = document.createElement("div");
                    div.classList.add("horizontal");
                    div.classList.add("cmlabel");
                    div.appendChild(document.createTextNode((i + 1).toString() + "cm"));
                    numRuler.appendChild(div);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        function drawRuler(w, h) {
            horizonalRuler(w);
            verticalRuler(h);
        }
        Ruler.drawRuler = drawRuler;
    })(Ruler = PageDesigner.Ruler || (PageDesigner.Ruler = {}));
})(PageDesigner || (PageDesigner = {}));
function onDomReady() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2];
        });
    });
}
if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", onDomReady, false);
else
    window.onload = onDomReady;
function onDomLoadFinished(a, b, c) {
    if (document.readyState === "complete") {
        a();
        return 1 / 0;
    }
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            a();
        }
    };
}
onDomLoadFinished(onDomReady);
