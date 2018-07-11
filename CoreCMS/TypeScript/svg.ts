
namespace VectorGraphics 
{

    export class Svg
    {
        protected m_xmlNamespace: string;
        protected m_svgNamespace: string;
        protected m_xlinkNamespace: string;

        protected m_svg: SVGElement;
        protected m_keyStr: string;
        protected m_mimeType: string;


        get mimeType()
        {
            return this.m_mimeType;
        }

        set mimeType(value)
        {
            this.m_mimeType = value;
        }


        get svg()
        {
            return this.m_svg;
        }

        set svg(value)
        {
            this.m_svg = value;
        }


        constructor(id, width, height, viewBox, preserveAspectRatio, style)
        {
            this.autoBind(this);
            this.m_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; 
            this.m_mimeType = "image/svg+xml";
            this.m_xmlNamespace = "http://www.w3.org/2000/xmlns/";
            this.m_svgNamespace = "http://www.w3.org/2000/svg";
            this.m_xlinkNamespace = "http://www.w3.org/1999/xlink";
            

            if (!style)
                style = "border: 1px solid black";

            this.m_svg = <SVGElement>document.createElementNS(this.m_svgNamespace, "svg");
            this.m_svg.setAttributeNS(this.m_xmlNamespace, "xmlns", this.m_svgNamespace);
            this.m_svg.setAttributeNS(this.m_xmlNamespace, "xmlns:xlink", this.m_xlinkNamespace);
            

            this.m_svg.setAttribute("id", id);
            this.m_svg.setAttribute("width", width);
            this.m_svg.setAttribute("height", height);
            this.m_svg.setAttribute("viewBox", viewBox);
            this.m_svg.setAttribute("preserveAspectRatio", preserveAspectRatio);
            this.m_svg.setAttribute("style", style);
        }


        protected autoBind(self: any)
        {
            for (const key of Object.getOwnPropertyNames(self.constructor.prototype))
            {
                let val = self[key];

                if (key !== 'constructor' && typeof val === 'function')
                {
                    // console.log(key);
                    self[key] = val.bind(self);
                } // End if (key !== 'constructor' && typeof val === 'function') 

            } // Next key 

            return self;
        } // End Function autoBind


        public test()
        {
            alert(this.m_svgNamespace);
        }

        protected setAttributes(ele, data)
        {
            if (ele == null)
                return ele;

            if (data)
            {
                for (let prop in data) 
                {
                    if (data.hasOwnProperty(prop)) 
                    {
                        // console.log(name);
                        // console.log(textStyle[name]);
                        if (data[prop] != null)
                            ele.setAttribute(prop, data[prop]);
                    } // End if (textStyle.hasOwnProperty(style)) 

                } // Next style 

            } // End if(textStyle)

            return ele;
        }


        public createGroup(id)
        {
            let g = document.createElementNS(this.m_svgNamespace, "g");
            g.setAttribute("id", id);
            g.setAttribute("shape-rendering", 'inherit');
            g.setAttribute("pointer-events", 'all');

            this.m_svg.appendChild(g);
            return this;
        }

        protected createTextInternal(text, data)
        {
            let myText = document.createElementNS(this.m_svgNamespace, "text");
            // myText.setAttributeNS(null,"id", "mycircle");
            // myText.setAttributeNS(null, "x", x);
            // myText.setAttributeNS(null, "y", y);

            // if (!textStyle.fill) myText.setAttributeNS(null, "fill", "hotpink");

            // myText.setAttributeNS(null,"stroke", "none");
            // myText.setAttributeNS(null,"stroke-width", "2px");

            // myText.setAttribute("font-family", "Verdana");
            // myText.setAttribute("font-size", "12px");
            // // myText.setAttribute("text-anchor", "middle");
            // myText.setAttribute("text-anchor", "end");
            // myText.setAttribute("dy", "-0.4em");

            myText = this.setAttributes(myText, data);


            // text ="allo monde\nhello world\nhallo welt\nprivet mir";
            // text = "allo monde hello world privet mir";
            // text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');

            // myText.textContent = text;

            if (text)
            {
                text = text.replace(/(?:\r\n|\r|\n)/g, '\n');
                let texts = text.split("\n");
                for (let i = 0; i < texts.length; ++i)
                {
                    this.appendSpan(myText, texts[i], i == 0 ? null : "15px");
                } // Next i

            } // End if(text)

            // myText.insertAdjacentHTML("beforeend", "hhh");

            return myText;
        }


        public createText(text, data)
        {
            let myText = this.createTextInternal(text, data);
            this.m_svg.appendChild(myText);
            this;
        }


        public measureText(text, data)
        {
            let width;
            let textStyle = this.clone(data);

            if (textStyle)
                textStyle.visibility = "hidden"; //textStyle.display = "none";
            else
                textStyle = { "visibility": "hidden" };


            // let t = this.createTextInternal(100, 100, strText, textStyle);
            let t = this.createTextInternal(text, textStyle);

            // console.log(" Width before appendChild: "+  t.getComputedTextLength());      
            let el: SVGTextElement = <SVGTextElement>this.m_svg.appendChild(t);
            width = el.getComputedTextLength();
            this.m_svg.removeChild(el);

            // console.log(" Width after appendChild: "+  width);
            return width;
        }


        public appendSpan(ele, text, dy)
        {
            // SVG.appendSpan(elementToAppendTo, "another line");
            let span1 = document.createElementNS(this.m_svgNamespace, "tspan");

            span1.setAttribute("x", ele.getAttribute("x"));
            if (dy)
                span1.setAttribute("dy", dy);

            span1.textContent = text;
            ele.appendChild(span1);

            return this;
        }

        private clone(obj)
        {
            if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
                return obj;

            let temp = obj.constructor(); // changed

            for (let key in obj) 
            {
                if (Object.prototype.hasOwnProperty.call(obj, key)) 
                {
                    obj['isActiveClone'] = null;
                    temp[key] = this.clone(obj[key]);
                    delete obj['isActiveClone'];
                }
            }

            return temp;
        }


        public createCircle(cx, cy, r)
        {
            let myCircle = document.createElementNS(this.m_svgNamespace, "circle");
            // myCircle.setAttributeNS(null,"id", "mycircle");
            myCircle.setAttributeNS(null, "cx", cx);
            myCircle.setAttributeNS(null, "cy", cy);
            myCircle.setAttributeNS(null, "r", r);
            myCircle.setAttributeNS(null, "fill", "black");
            myCircle.setAttributeNS(null, "stroke", "none");

            this.m_svg.appendChild(myCircle);
            return this;
        }


        public createRectangle(x, y, width, height, color)
        {
            let rect = document.createElementNS(this.m_svgNamespace, "rect");
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
        }
        
        public createPolygon(attributes)
        {
            let polygon = document.createElementNS(this.m_svgNamespace, "polygon");
            this.setAttributes(polygon, attributes);

            this.m_svg.appendChild(polygon);
            return this;
        }


        public createPolyline(attributes)
        {
            let poly = document.createElementNS(this.m_svgNamespace, "polyline");
            this.setAttributes(poly, attributes);
            
            this.m_svg.appendChild(poly);
            return this;
        }

        public createPath(attributes)
        {
            let path = document.createElementNS(this.m_svgNamespace, "path");
            this.setAttributes(path, attributes);

            this.m_svg.appendChild(path);
            return path;
        }

        public createTspan(text, attributes)
        {
            var tspanElement = document.createElementNS(this.m_svgNamespace, "tspan");
            // tspanElement.setAttributeNS(null, "x", x);
            // tspanElement.setAttributeNS(null, "y", y);
            // tspanElement.setAttributeNS(null, "font-size", fontSize);
            this.setAttributes(tspanElement, attributes);
            var textNode = document.createTextNode(text);
            tspanElement.appendChild(textNode);

            this.m_svg.appendChild(tspanElement);
            return this;
        }

        public createEllipse(attributes)
        {
            let ellipse = document.createElementNS(this.m_svgNamespace, "ellipse");
            this.setAttributes(ellipse, attributes);

            this.m_svg.appendChild(ellipse);
            return this;
        }

        // , x1, y1, x2, y2, width, color
        public createLine(data)
        {
            let line = document.createElementNS(this.m_svgNamespace, "line");
            line.setAttribute("x1", data.x1);
            line.setAttribute("y1", data.y1);
            line.setAttribute("x2", data.x2);
            line.setAttribute("y2", data.y2);

            line = this.setAttributes(line, data);
            // line.setAttribute("stroke", "#FF00FF");

            // line.setAttribute("stroke-width", "1px");
            // line.setAttribute("shape-rendering", "crispEdges");

            this.m_svg.appendChild(line);
            return this;
        }


        // private method for UTF-8 encoding
        private utf8_encode(string: string)
        {
            let utftext = "";
            string = string.replace(/\r\n/g, "\n");

            for (let n = 0; n < string.length; n++)
            {
                let c = string.charCodeAt(n);

                if (c < 128)
                {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048))
                {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else
                {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            } // Next n 

            return utftext;
        } // End Function _utf8_encode 


        // private method for UTF-8 decoding
        private utf8_decode(utftext)
        {
            let string = "";
            let i = 0;
            let c, c1, c2, c3;
            c = c1 = c2 = 0;

            while (i < utftext.length)
            {
                c = utftext.charCodeAt(i);

                if (c < 128)
                {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224))
                {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else
                {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            } // Whend 

            return string;
        } // End Function utf8_decode 


        protected base64Encode(input)
        {
            let output = "";
            let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            let i = 0;

            input = this.utf8_encode(input);

            while (i < input.length)
            {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2))
                {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3))
                {
                    enc4 = 64;
                }

                output = output +
                    this.m_keyStr.charAt(enc1) + this.m_keyStr.charAt(enc2) +
                    this.m_keyStr.charAt(enc3) + this.m_keyStr.charAt(enc4);
            } // Whend 

            return output;
        } // End Function encode 


        protected base64Decode(input)
        {
            let output = "";
            let chr1, chr2, chr3;
            let enc1, enc2, enc3, enc4;
            let i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length)
            {
                enc1 = this.m_keyStr.indexOf(input.charAt(i++));
                enc2 = this.m_keyStr.indexOf(input.charAt(i++));
                enc3 = this.m_keyStr.indexOf(input.charAt(i++));
                enc4 = this.m_keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64)
                {
                    output = output + String.fromCharCode(chr2);
                }

                if (enc4 != 64)
                {
                    output = output + String.fromCharCode(chr3);
                }

            } // Whend 

            output = this.utf8_decode(output);
            return output;
        } // End Function decode 


        protected prettifyXml(sourceXml)
        {
            let xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
            let xsltDoc = new DOMParser().parseFromString([
                // describes how we want to modify the XML - indent everything
                '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                '  <xsl:output omit-xml-declaration="yes" indent="yes"/>',
                '    <xsl:template match="node()|@*">',
                '      <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                '    </xsl:template>',
                '</xsl:stylesheet>',
            ].join('\n'), 'application/xml');

            let xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);
            let resultDoc = xsltProcessor.transformToDocument(xmlDoc);
            let resultXml = new XMLSerializer().serializeToString(resultDoc);
            return resultXml;
        }

        protected m_log = true;

        public serialize()
        {
            let markup = (new XMLSerializer()).serializeToString(this.m_svg);
            if (this.m_log)
                console.log(markup);
            return markup;
        }

        public serializePretty()
        {
            this.m_log = false;
            let markup = this.serialize();
            this.m_log = true;
            markup = this.prettifyXml(markup);
            console.log(markup);
            return markup;
        }


        public toBase64()
        {
            this.m_log = false;
            let b64 = this.base64Encode(this.serialize());
            this.m_log = true;
            return b64;
        }


        public toBase64Url()
        {
            let url = "data:" + this.m_mimeType + ";base64," + this.toBase64();
            return url;
        }


        public saveFile(filename)
        {
            let text = this.serializePretty();
            let blob = new Blob([ text ], { type: this.m_mimeType });

            if (window.navigator.msSaveOrOpenBlob)
            {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            }
            else
            {
                let a = document.createElement('a');
                document.body.appendChild(a);
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = filename;
                a.click();
                setTimeout(() =>
                {
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }, 0)
            }
        }


    }


} 
