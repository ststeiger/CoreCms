// Include all modules we need
const svg2png = require("svg2png");
const { JSDOM } = require("jsdom");
const d3 = require('d3');

// Define module
// callback - function to return data to caller
// options - chart options defined in controller
// data - chart data coming from controller
module.exports = function (callback, options, data)
{

    // Create disconnected HTML DOM and attach it to D3
    var dom = new JSDOM('<!DOCTYPE html><html><head><meta charset="utf-8" /></head><body><div id="chart"></div></body></html>');
    dom.window.d3 = d3.select(dom.window.document);

    // Build D3 chart
    var width = options.width || 360;
    var height = options.height || 360;
    var radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal(d3.schemeCategory20b);

    var svg = dom.window.d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
    
    
    
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var pie = d3.pie()
        .value(function (d) { return d.count; })
        .sort(null);
    

    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d)
        {
            return color(d.data.label);
        });
    
    var svgText = dom.window.d3.select('#chart').html();
    
    // Convert SVG to PNG and return it to controller
    // var svgText = dom.window.d3.select('#chart').html();
    // callback(null, svgText);
    
    svg2png(Buffer.from(svgText), { width: width, height: height })
        .then(buffer => 'data:image/png;base64,' + buffer.toString('base64'))
        .then(buffer => callback(null, buffer));
    
};
