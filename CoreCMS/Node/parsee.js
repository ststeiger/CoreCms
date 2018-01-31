
var poid = require('parsoid');
var CircularJSON = require('circular-json');

module.exports = function (callback, host, page)
{
    //callback(null, '{ "abc":"def", "ghi":123}'); // error - object returned is not a json-object
    // callback(null, { "abc": "def", "ghi": 1234 });

    var mediaWiki = "== Getting started ==\n<code>maps.wikimedia.org</code>\u00A0serves standard\u00A0[[:en:Web Mercator|Web Mercator]]\u00A0raster tiles so it should be a drop-in replacement for other tileservers serving\u00A0[https://www.openstreetmap.org/ OpenStreetMap-based]\u00A0imagery. To point a tool to our mapserver, use the following URL schema:\n* '''<nowiki>https://maps.wikimedia.org/{style}/{z}/{x}/{y}.{format}</nowiki>'''\n* '''<nowiki>https://maps.wikimedia.org/{style}/{z}/{x}/{y}@{scale}x.</nowiki>''{format}'''''\u00A0- with the optional scaling factor\n{| class=\"wikitable\"\n|+URL parameters\n|'''style'''\n|Map style to use. Use\u00A0'''\"osm-intl\"'''\u00A0for map with labels,\u00A0'''\"osm\"'''\u00A0for map without labels.\n|-\n|'''z'''\n|zoom level, 0-18\n|-\n|'''x, y'''\n|Web Mercator grid coordinates\n|-\n|'''scale'''\n|Optional scale for the high-resolution screens such as\u00A0[[:en:Retina Display|Retina]]. Supported scales are 1.3, 1.5, 2, 2.6, 3\n|-\n|'''format'''\n|Use\u00A0'''\"png\"'''\u00A0for now, but you can also use\u00A0'''\"pbf\"'''\u00A0from the\u00A0'''/osm'''\u00A0style to get the raw vector tiles.\n|}\nAdding a maps within\u00A0[http://leafletjs.com/ Leaflet]\u00A0is as easy as<syntaxhighlight lang=\"javascript\">\nvar style = 'osm-intl';\nvar server = 'https://maps.wikimedia.org/';\n\n// Create a map\nvar map = L.map('map').setView([40.75, -73.96], 4);\n\n// Add a map layer\nL.tileLayer(server + style + '/{z}/{x}/{y}.png', {\n    maxZoom: 18,\n    id: 'wikipedia-map-01',\n    attribution: 'Wikimedia maps beta | Map data &copy; <a href=\"http://openstreetmap.org/copyright\">OpenStreetMap contributors</a>'\n}).addTo(map);\n</syntaxhighlight>An example of a map that uses our tiles is at\u00A0\u00A0[http://maps.beta.wmflabs.org/ maps.beta.wmflabs.org],\u00A0[https://github.com/MaxSem/maps-demo source].\n\n=== Static map images ===\nMaps are also capable of serving static images, such as\u00A0https://maps.wikimedia.org/img/osm-intl,7,43.66,4.719,800x600.png\n\nURL:\u00A0\u00A0'''<nowiki>https://maps.wikimedia.org/img/{style},{z},{lat},{lon},{width}x{height}@{scale}x.png</nowiki>'''\n{| class=\"wikitable\"\n|+URL parameters\n|'''style'''\n|Map style to use. Use\u00A0'''\"osm-intl\"'''\u00A0for map with labels,\u00A0'''\"osm\"'''\u00A0for map without labels.\n|-\n|'''z'''\n|Zoom level, 0\u201318\n|-\n|'''lat, lon'''\n|Latitude and longitude of the map center\n|-\n|'''width, height'''\n|Image size in pixels without scalling\n|-\n|'''scale'''\n|Optional scale for the high-resolution screens such as\u00A0[[:en:Retina Display|Retina]]. Supported scales are 1.3, 1.5, 2, 2.6, 3\n|}\n\n== See Also ==\n* [[Maps/Tile server implementation|Tile server implementation]] - technical details on how the server presenting and storing the map tiles is implemented\n";
    // callback(null, mediaWiki);

    function censor(censor) {
        var i = 0;

        return function(key, value) {
            if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
                return '[Circular]';

            if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
                return '[Unknown]';
            
            ++i; // so we know we aren't using the original object anymore

            return value;
        }
    } // End Function censor



    function dumpObject(obj, level, cache)
    {
        if(level == null)
            level = 0;

        if(cache == null)
            cache = [];

        var output ="";
        for (var property in obj)
        {
            // console.log("prop:", property);

            var value = obj[property];
            var valueType = typeof(value);
            var objType = typeof(obj);

            // console.log("valuetype:", valueType);
            if(obj != null && objType === "object" && obj.hasOwnProperty && obj.hasOwnProperty(property))
            {

                if(value != null && valueType === "object")
                {

                    if (cache.indexOf(value) !== -1)
                        output += "  ".repeat(level) + property + ': ' + "[Circular],\n";
                    else
                    {
                        cache.push(value);
                        if(level > 1)
                            output += "  ".repeat(level) + property + ': "[Object]"\n'
                        else
                            output += "  ".repeat(level) + property + ': {\n' + dumpObject(value, level+1, cache)
                                + "  ".repeat(level) + "},\n";
                    }

                }
                else if(valueType !== "function")
                    output += "  ".repeat(level) + property + ': ' + obj[property] + ",\n";
            }
        } // End Function dumpObject
        
        return output;
    }



    async function parseWiki()
    {
        try 
        {
            var abc = await poid.parse(mediaWiki);
            //console.log(abc.out);
            abc.out = null;
            abc.env.page.src = null;

            // console.log(abc);
            // console.log(dumpObject(abc));
            callback(null, dumpObject(abc));
            // callback(null, dumpObject(data));
        }
        catch (ex)
        {
            callback(ex, null);
        }
        
    }
    
    parseWiki();
    
    /*
    poid.parse(mediaWiki)
        //.then(data => callback(null, data.out ) )
        //.then(data => callback(null, JSON.stringify(data)     ) )
        //.then(data => callback(null, JSON.stringify(data, censor(data), 2 )     ) )
        //.then(data => callback(null, CircularJSON.stringify(data, null,  2)     ) )
        .then(data => callback(null, dumpObject(data)  ) )
        .catch (err => callback(err, null) );
    // callback(null, JSON.stringify(abc) );
    */
    
    // callback(err, null);
};
