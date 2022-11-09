var marginGFR = { top: 10, right: 10, bottom: 50, left: 30 },
    widthGFR = 500 - marginGFR.left - marginGFR.right,
    heightGFR = 300 - marginGFR.top - marginGFR.bottom;

var svgGFRLeft = d3.select("#div4")
    .append("svg")
    .attr("width", widthGFR + marginGFR.left + marginGFR.right)
    .attr("height", heightGFR + marginGFR.top + marginGFR.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginGFR.left + "," + marginGFR.top + ")");

var svgGFRRight = d3.select("#div5")
    .append("svg")
    .attr("width", widthGFR + marginGFR.left + marginGFR.right)
    .attr("height", heightGFR + marginGFR.top + marginGFR.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginGFR.left + "," + marginGFR.top + ")");

d3.csv("data/012518cm/012518cm_22_grf.csv").then(
    function (data) {
        var x = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.time; })])
            .range([0, widthGFR]);
        svgGFRLeft.append("g")
            .attr("transform", "translate(0," + heightGFR + ")")
            .call(d3.axisBottom(x));
        svgGFRRight.append("g")
            .attr("transform", "translate(0," + heightGFR + ")")
            .call(d3.axisBottom(x));

        var yleft = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return Math.min(d.lap, d.lml, d.lvt); }), d3.max(data, function (d) { return Math.max(d.lap, d.lml, d.lvt); })])
            .range([heightGFR, 0]);
        svgGFRLeft.append("g")
            .call(d3.axisLeft(yleft));

        var yright = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return Math.min(d.rap, d.rml, d.rvt); }), d3.max(data, function (d) { return Math.max(d.rap, d.rml, d.rvt); })])
            .range([heightGFR, 0]);
        svgGFRRight.append("g")
            .call(d3.axisLeft(yright));

        svgGFRLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d.lap) })
            )

        svgGFRLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d.lml) })
            )

        svgGFRLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d.lvt) })
            )

        svgGFRRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d.rap) })
            )

        svgGFRRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d.rml) })
            )

        svgGFRRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d.rvt) })
            )
    });