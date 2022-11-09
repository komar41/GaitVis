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

        var div = d3.select("#div4").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        svgGFRLeft.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yleft(d.lap); })
            .style("fill", "steelblue")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-AP: " + d.lap)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgGFRLeft.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yleft(d.lml); })
            .style("fill", "red")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-ML: " + d.lml)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgGFRLeft.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yleft(d.lvt); })
            .style("fill", "green")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-VT: " + d.lvt)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        /////////////

        var div = d3.select("#div5").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        svgGFRRight.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yright(d.rap); })
            .style("fill", "steelblue")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-AP: " + d.rap)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgGFRRight.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yright(d.rml); })
            .style("fill", "red")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-ML: " + d.rml)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgGFRRight.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yright(d.rvt); })
            .style("fill", "green")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-VT: " + d.rvt)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        var keysLeft = ["L-AP", "L-ML", "L-VT"]
        var keysRight = ["R-AP", "R-ML", "R-VT"]
        var color = ["steelblue", "red", "green"]

        svgGFRLeft.selectAll("mydots")
            .data(keysLeft)
            .enter()
            .append("circle")
            .attr("cx", 360)
            .attr("cy", function (d, i) { return 100 + i * 25 })
            .attr("r", 7)
            .style("fill", function (d, i) { return color[i] })

        svgGFRLeft.selectAll("mylabels")
            .data(keysLeft)
            .enter()
            .append("text")
            .attr("x", 380)
            .attr("y", function (d, i) { return 100 + i * 25 })
            .style("fill", function (d, i) { return color[i] })
            .text(function (d, i) { return keysLeft[i] })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        svgGFRRight.selectAll("mydots")
            .data(keysRight)
            .enter()
            .append("circle")
            .attr("cx", 100)
            .attr("cy", function (d, i) { return 100 + i * 25 })
            .attr("r", 7)
            .style("fill", function (d, i) { return color[i] })

        svgGFRRight.selectAll("mylabels")
            .data(keysRight)
            .enter()
            .append("text")
            .attr("x", 120)
            .attr("y", function (d, i) { return 100 + i * 25 })
            .style("fill", function (d, i) { return color[i] })
            .text(function (d, i) { return keysRight[i] })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

    });
