var marginGFR = { top: 10, right: 10, bottom: 50, left: 50 },
    widthGFR = 500 - marginGFR.left - marginGFR.right,
    heightGFR = 300 - marginGFR.top - marginGFR.bottom;

var svgGFR = d3.select("#div4")
    .append("svg")
    .attr("width", widthGFR + marginGFR.left + marginGFR.right)
    .attr("height", heightGFR + marginGFR.top + marginGFR.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginGFR.left + "," + marginGFR.top + ")");

// define the line
var valueline = d3.line()
    .x(function (d) { return x(d.time); })
    .y(function (d) { return y(d.rap); });

// Get the data
d3.csv("data/012518cm/012518cm_22_grf.csv").then(
    function (data) {
        var x = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.time; })])
            .range([0, widthGFR]);
        svgGFR.append("g")
            .attr("transform", "translate(0," + heightGFR + ")")
            .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.rap; }), d3.max(data, function (d) { return +d.rap; })])
            .range([heightGFR, 0]);
        svgGFR.append("g")
            .call(d3.axisLeft(y));

        svgGFR.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return y(d.rap) })
            )
    });