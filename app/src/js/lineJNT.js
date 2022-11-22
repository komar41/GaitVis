var marginJNT = { top: 0, right: 30, bottom: 30, left: 30 },
    widthJNT = 400 - marginJNT.left - marginJNT.right,
    heightJNT = 200 - marginJNT.top - marginJNT.bottom;

var svgJNTLeft = d3.select("#lineJnt1")
    .append("svg")
    .attr("width", widthJNT + marginJNT.left + marginJNT.right)
    .attr("height", heightJNT + marginJNT.top + marginJNT.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginJNT.left + "," + marginJNT.top + ")");

var svgJNTRight = d3.select("#lineJnt2")
    .append("svg")
    .attr("width", widthJNT + marginJNT.left + marginJNT.right)
    .attr("height", heightJNT + marginJNT.top + marginJNT.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginJNT.left + "," + marginJNT.top + ")");

d3.csv("data/012518cm/012518cm_22_jnt.csv").then(
    function (data) {
        var x = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.time; })])
            .range([0, widthJNT]);
        svgJNTLeft.append("g")
            .attr("transform", "translate(0," + heightJNT + ")")
            .call(d3.axisBottom(x));
        svgJNTRight.append("g")
            .attr("transform", "translate(0," + heightJNT + ")")
            .call(d3.axisBottom(x));

        var yleft = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return Math.min(d.Lfoot, d.Lshank, d.Lthigh, d.trunk); }), d3.max(data, function (d) { return Math.max(d.Lfoot, d.Lshank, d.Lthigh, d.trunk); })])
            .range([heightJNT, 0]);
        svgJNTLeft.append("g")
            .call(d3.axisLeft(yleft));

        var yright = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return Math.min(d.Rfoot, d.Rshank, d.Rthigh, d.trunk); }), d3.max(data, function (d) { return Math.max(d.Rfoot, d.Rshank, d.Rthigh, d.trunk); })])
            .range([heightJNT, 0]);
        svgJNTRight.append("g")
            .call(d3.axisLeft(yright));

        svgJNTLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-widthJNT", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d.Lfoot) })
            )

        svgJNTLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-widthJNT", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d.Lshank) })
            )

        svgJNTLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-widthJNT", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d.Lthigh) })
            )

        svgJNTLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "plum")
            .attr("stroke-widthJNT", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d.trunk) })
            )

        svgJNTRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-widthJNT", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d.Rfoot) })
            )

        svgJNTRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-widthJNT", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d.Rshank) })
            )

        svgJNTRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-widthJNT", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d.Rthigh) })
            )

        svgJNTRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "plum")
            .attr("stroke-widthJNT", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d.trunk) })
            )

        var div = d3.select("#div6").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        svgJNTLeft.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yleft(d.Lfoot); })
            .style("fill", "steelblue")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-Foot: " + Lfoot)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgJNTLeft.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yleft(d.Lshank); })
            .style("fill", "red")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-Shank: " + d.Lshank)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgJNTLeft.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yleft(d.Lthigh); })
            .style("fill", "green")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-Thigh: " + d.Lthigh)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgJNTLeft.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yleft(d.trunk); })
            .style("fill", "plum")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>Trunk: " + d.trunk)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        var div = d3.select("#div7").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        svgJNTRight.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yright(d.Rfoot); })
            .style("fill", "steelblue")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-Foot: " + d.Rfoot)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgJNTRight.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yright(d.Rshank); })
            .style("fill", "red")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-Shank: " + d.Rshank)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgJNTRight.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yright(d.Rthigh); })
            .style("fill", "green")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-Thigh: " + d.Rthigh)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svgJNTRight.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yright(d.trunk); })
            .style("fill", "plum")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>Trunk: " + d.trunk)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        var keysLeft = ["L-foot", "L-shank", "L-thigh", "trunk"]
        var keysRight = ["R-foot", "R-shank", "R-thigh", "trunk"]
        var color = ["steelblue", "red", "green", "plum"]

        svgJNTLeft.selectAll("mydots")
            .data(keysLeft)
            .enter()
            .append("circle")
            .attr("cx", 310)
            .attr("cy", function (d, i) { return 45 + i * 25 })
            .attr("r", 7)
            .style("fill", function (d, i) { return color[i] })

        svgJNTLeft.selectAll("mylabels")
            .data(keysLeft)
            .enter()
            .append("text")
            .attr("x", 320)
            .attr("y", function (d, i) { return 45 + i * 25 })
            .style("fill", function (d, i) { return color[i] })
            .text(function (d, i) { return keysLeft[i] })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        svgJNTRight.selectAll("mydots")
            .data(keysRight)
            .enter()
            .append("circle")
            .attr("cx", 310)
            .attr("cy", function (d, i) { return 45 + i * 25 })
            .attr("r", 7)
            .style("fill", function (d, i) { return color[i] })

        svgJNTRight.selectAll("mylabels")
            .data(keysRight)
            .enter()
            .append("text")
            .attr("x", 320)
            .attr("y", function (d, i) { return 45 + i * 25 })
            .style("fill", function (d, i) { return color[i] })
            .text(function (d, i) { return keysRight[i] })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
    });