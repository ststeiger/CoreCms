var VectorGraphics;
(function (VectorGraphics) {
    var Svg = (function () {
        function Svg(id, width, height, viewBox, preserveAspectRatio, style) {
            this.m_log = true;
            this.autoBind(this);
            this.m_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            this.m_mimeType = "image/svg+xml";
            this.m_xmlNamespace = "http://www.w3.org/2000/xmlns/";
            this.m_svgNamespace = "http://www.w3.org/2000/svg";
            this.m_xlinkNamespace = "http://www.w3.org/1999/xlink";
            if (!style)
                style = "border: 1px solid black";
            this.m_svg = document.createElementNS(this.m_svgNamespace, "svg");
            this.m_svg.setAttributeNS(this.m_xmlNamespace, "xmlns", this.m_svgNamespace);
            this.m_svg.setAttributeNS(this.m_xmlNamespace, "xmlns:xlink", this.m_xlinkNamespace);
            this.m_svg.setAttribute("id", id);
            this.m_svg.setAttribute("width", width);
            this.m_svg.setAttribute("height", height);
            this.m_svg.setAttribute("viewBox", viewBox);
            this.m_svg.setAttribute("preserveAspectRatio", preserveAspectRatio);
            this.m_svg.setAttribute("style", style);
        }
        Object.defineProperty(Svg.prototype, "mimeType", {
            get: function () {
                return this.m_mimeType;
            },
            set: function (value) {
                this.m_mimeType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Svg.prototype, "svg", {
            get: function () {
                return this.m_svg;
            },
            set: function (value) {
                this.m_svg = value;
            },
            enumerable: true,
            configurable: true
        });
        Svg.prototype.autoBind = function (self) {
            for (var _i = 0, _a = Object.getOwnPropertyNames(self.constructor.prototype); _i < _a.length; _i++) {
                var key = _a[_i];
                var val = self[key];
                if (key !== 'constructor' && typeof val === 'function') {
                    self[key] = val.bind(self);
                }
            }
            return self;
        };
        Svg.prototype.test = function () {
            alert(this.m_svgNamespace);
        };
        Svg.prototype.setAttributes = function (ele, data) {
            if (ele == null)
                return ele;
            if (data) {
                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        if (data[prop] != null)
                            ele.setAttribute(prop, data[prop]);
                    }
                }
            }
            return ele;
        };
        Svg.prototype.createGroup = function (id) {
            var g = document.createElementNS(this.m_svgNamespace, "g");
            g.setAttribute("id", id);
            g.setAttribute("shape-rendering", 'inherit');
            g.setAttribute("pointer-events", 'all');
            this.m_svg.appendChild(g);
            return this;
        };
        Svg.prototype.createTextInternal = function (text, data) {
            var myText = document.createElementNS(this.m_svgNamespace, "text");
            myText = this.setAttributes(myText, data);
            if (text) {
                text = text.replace(/(?:\r\n|\r|\n)/g, '\n');
                var texts = text.split("\n");
                for (var i = 0; i < texts.length; ++i) {
                    this.appendSpan(myText, texts[i], i == 0 ? null : "15px");
                }
            }
            return myText;
        };
        Svg.prototype.createText = function (text, data) {
            var myText = this.createTextInternal(text, data);
            this.m_svg.appendChild(myText);
            this;
        };
        Svg.prototype.measureText = function (text, data) {
            var width;
            var textStyle = this.clone(data);
            if (textStyle)
                textStyle.visibility = "hidden";
            else
                textStyle = { "visibility": "hidden" };
            var t = this.createTextInternal(text, textStyle);
            var el = this.m_svg.appendChild(t);
            width = el.getComputedTextLength();
            this.m_svg.removeChild(el);
            return width;
        };
        Svg.prototype.appendSpan = function (ele, text, dy) {
            var span1 = document.createElementNS(this.m_svgNamespace, "tspan");
            span1.setAttribute("x", ele.getAttribute("x"));
            if (dy)
                span1.setAttribute("dy", dy);
            span1.textContent = text;
            ele.appendChild(span1);
            return this;
        };
        Svg.prototype.clone = function (obj) {
            if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
                return obj;
            var temp = obj.constructor();
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    obj['isActiveClone'] = null;
                    temp[key] = this.clone(obj[key]);
                    delete obj['isActiveClone'];
                }
            }
            return temp;
        };
        Svg.prototype.createCircle = function (cx, cy, r) {
            var myCircle = document.createElementNS(this.m_svgNamespace, "circle");
            myCircle.setAttributeNS(null, "cx", cx);
            myCircle.setAttributeNS(null, "cy", cy);
            myCircle.setAttributeNS(null, "r", r);
            myCircle.setAttributeNS(null, "fill", "black");
            myCircle.setAttributeNS(null, "stroke", "none");
            this.m_svg.appendChild(myCircle);
            return this;
        };
        Svg.prototype.createRectangle = function (x, y, width, height, color) {
            var rect = document.createElementNS(this.m_svgNamespace, "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", width);
            rect.setAttribute("height", height);
            if (color)
                rect.setAttribute("fill", color);
            else
                rect.setAttribute("fill", "#95B3D7");
            this.m_svg.appendChild(rect);
            return this;
        };
        Svg.prototype.createPolygon = function (attributes) {
            var polygon = document.createElementNS(this.m_svgNamespace, "polygon");
            this.setAttributes(polygon, attributes);
            this.m_svg.appendChild(polygon);
            return this;
        };
        Svg.prototype.createPolyline = function (attributes) {
            var poly = document.createElementNS(this.m_svgNamespace, "polyline");
            this.setAttributes(poly, attributes);
            this.m_svg.appendChild(poly);
            return this;
        };
        Svg.prototype.createPath = function (attributes) {
            var path = document.createElementNS(this.m_svgNamespace, "path");
            this.setAttributes(path, attributes);
            this.m_svg.appendChild(path);
            return path;
        };
        Svg.prototype.createTspan = function (text, attributes) {
            var tspanElement = document.createElementNS(this.m_svgNamespace, "tspan");
            this.setAttributes(tspanElement, attributes);
            var textNode = document.createTextNode(text);
            tspanElement.appendChild(textNode);
            this.m_svg.appendChild(tspanElement);
            return this;
        };
        Svg.prototype.createEllipse = function (attributes) {
            var ellipse = document.createElementNS(this.m_svgNamespace, "ellipse");
            this.setAttributes(ellipse, attributes);
            this.m_svg.appendChild(ellipse);
            return this;
        };
        Svg.prototype.createLine = function (data) {
            var line = document.createElementNS(this.m_svgNamespace, "line");
            line.setAttribute("x1", data.x1);
            line.setAttribute("y1", data.y1);
            line.setAttribute("x2", data.x2);
            line.setAttribute("y2", data.y2);
            line = this.setAttributes(line, data);
            this.m_svg.appendChild(line);
            return this;
        };
        Svg.prototype.utf8_encode = function (string) {
            var utftext = "";
            string = string.replace(/\r\n/g, "\n");
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        Svg.prototype.utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c, c1, c2, c3;
            c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        };
        Svg.prototype.base64Encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = this.utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this.m_keyStr.charAt(enc1) + this.m_keyStr.charAt(enc2) +
                    this.m_keyStr.charAt(enc3) + this.m_keyStr.charAt(enc4);
            }
            return output;
        };
        Svg.prototype.base64Decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this.m_keyStr.indexOf(input.charAt(i++));
                enc2 = this.m_keyStr.indexOf(input.charAt(i++));
                enc3 = this.m_keyStr.indexOf(input.charAt(i++));
                enc4 = this.m_keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = this.utf8_decode(output);
            return output;
        };
        Svg.prototype.prettifyXml = function (sourceXml) {
            var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
            var xsltDoc = new DOMParser().parseFromString([
                '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                '  <xsl:output omit-xml-declaration="yes" indent="yes"/>',
                '    <xsl:template match="node()|@*">',
                '      <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                '    </xsl:template>',
                '</xsl:stylesheet>',
            ].join('\n'), 'application/xml');
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);
            var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
            var resultXml = new XMLSerializer().serializeToString(resultDoc);
            return resultXml;
        };
        Svg.prototype.serialize = function () {
            var markup = (new XMLSerializer()).serializeToString(this.m_svg);
            if (this.m_log)
                console.log(markup);
            return markup;
        };
        Svg.prototype.serializePretty = function () {
            this.m_log = false;
            var markup = this.serialize();
            this.m_log = true;
            markup = this.prettifyXml(markup);
            console.log(markup);
            return markup;
        };
        Svg.prototype.toBase64 = function () {
            this.m_log = false;
            var b64 = this.base64Encode(this.serialize());
            this.m_log = true;
            return b64;
        };
        Svg.prototype.toBase64Url = function () {
            var url = "data:" + this.m_mimeType + ";base64," + this.toBase64();
            return url;
        };
        Svg.prototype.saveFile = function (filename) {
            var text = this.serializePretty();
            var blob = new Blob([text], { type: this.m_mimeType });
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            }
            else {
                var a_1 = document.createElement('a');
                document.body.appendChild(a_1);
                var url_1 = window.URL.createObjectURL(blob);
                a_1.href = url_1;
                a_1.download = filename;
                a_1.click();
                setTimeout(function () {
                    window.URL.revokeObjectURL(url_1);
                    document.body.removeChild(a_1);
                }, 0);
            }
        };
        return Svg;
    }());
    VectorGraphics.Svg = Svg;
})(VectorGraphics || (VectorGraphics = {}));
