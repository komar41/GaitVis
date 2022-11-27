var marginGFR = { top: 0, right: 30, bottom: 30, left: 50 },
    widthGFR = 500 - marginGFR.left - marginGFR.right,
    heightGFR = 250 - marginGFR.top - marginGFR.bottom;

var svgGFRLeft = d3.select("#lineGrf1")
    .append("svg")
    .attr("width", widthGFR + marginGFR.left + marginGFR.right)
    .attr("height", heightGFR + marginGFR.top + marginGFR.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginGFR.left + "," + marginGFR.top + ")");

var svgGFRRight = d3.select("#lineGrf2")
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
            .range([0, widthGFR - 100]);

        svgGFRLeft.append("g")
            .attr("transform", "translate(0," + heightGFR + ")")
            .call(d3.axisBottom(x));

        svgGFRRight.append("g")
            .attr("transform", "translate(0," + heightGFR + ")")
            .call(d3.axisBottom(x));

        var yleft = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return Math.min(d["L-AP"], d["L-ML"], d["L-VT"]); }), d3.max(data, function (d) { return Math.max(d["L-AP"], d["L-ML"], d["L-VT"]); })])
            .range([heightGFR, 0]);

        svgGFRLeft.append("g")
            .call(d3.axisLeft(yleft));

        var yright = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return Math.min(d["R-AP"], d["R-ML"], d["R-VT"]); }), d3.max(data, function (d) { return Math.max(d["R-AP"], d["R-ML"], d["R-VT"]); })])
            .range([heightGFR, 0]);

        svgGFRRight.append("g")
            .call(d3.axisLeft(yright));

        svgGFRLeft.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", widthGFR - 200)
            .attr("y", heightGFR + marginGFR.top + marginGFR.bottom)
            .text("time (seconds)");

        svgGFRLeft.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -marginGFR.bottom)
            .attr("x", -marginGFR.left)
            .attr("transform", "rotate(-90)")
            .text("Ground Reaction Forces (Newtons)");

        svgGFRRight.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", widthGFR - 200)
            .attr("y", heightGFR + marginGFR.top + marginGFR.bottom)
            .text("time (seconds)");

        svgGFRRight.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -marginGFR.bottom)
            .attr("x", -marginGFR.left)
            .attr("transform", "rotate(-90)")
            .text("Ground Reaction Forces (Newtons)");

        svgGFRLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d["L-AP"]) })
            )

        svgGFRLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d["L-ML"]) })
            )

        svgGFRLeft.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yleft(d["L-VT"]) })
            )

        svgGFRRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d["R-AP"]) })
            )

        svgGFRRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d["R-ML"]) })
            )

        svgGFRRight.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-widthGFR", 2)
            .attr("d", d3.line()
                .x(function (d) { return x(d.time) })
                .y(function (d) { return yright(d["R-VT"]) })
            )

        var div = d3.select("#div4").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        svgGFRLeft.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yleft(d["L-AP"]); })
            .style("fill", "steelblue")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(0)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-AP: " + d["L-AP"])
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
            .attr("cy", function (d) { return yleft(d["L-ML"]); })
            .style("fill", "red")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-ML: " + d["L-ML"])
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
            .attr("cy", function (d) { return yleft(d["L-VT"]); })
            .style("fill", "green")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>L-VT: " + d["L-VT"])
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        var div = d3.select("#div5").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        svgGFRRight.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 1)
            .attr("cx", function (d) { return x(d.time); })
            .attr("cy", function (d) { return yright(d["R-AP"]); })
            .style("fill", "steelblue")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-AP: " + d["R-AP"])
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
            .attr("cy", function (d) { return yright(d["R-ML"]); })
            .style("fill", "red")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-ML: " + d["R-ML"])
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
            .attr("cy", function (d) { return yright(d["R-VT"]); })
            .style("fill", "green")
            .on("mouseover", function (event, d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Time: " + d.time + "<br/>R-VT: " + d["R-VT"])
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        var keysLeft = ["L-AP", "L-ML", "L-VT", "Toe Lift", "Touch Down"]
        var keysRight = ["R-AP", "R-ML", "R-VT", "Toe Lift", "Touch Down"]
        var color = ["steelblue", "red", "green", "orange", "black"]

        svgGFRLeft.selectAll("mydots")
            .data(keysLeft)
            .enter()
            .append("circle")
            .attr("cx", 340)
            .attr("cy", function (d, i) { return 25 + i * 25 })
            .attr("r", 7)
            .style("fill", function (d, i) { return color[i] })

        svgGFRLeft.selectAll("mylabels")
            .data(keysLeft)
            .enter()
            .append("text")
            .attr("x", 360)
            .attr("y", function (d, i) { return 25 + i * 25 })
            .style("fill", function (d, i) { return "black" })
            .text(function (d, i) { return keysLeft[i] })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        svgGFRRight.selectAll("mydots")
            .data(keysRight)
            .enter()
            .append("circle")
            .attr("cx", 340)
            .attr("cy", function (d, i) { return 25 + i * 25 })
            .attr("r", 7)
            .style("fill", function (d, i) { return color[i] })

        svgGFRRight.selectAll("mylabels")
            .data(keysRight)
            .enter()
            .append("text")
            .attr("x", 360)
            .attr("y", function (d, i) { return 25 + i * 25 })
            .style("fill", function (d, i) { return "black" })
            .text(function (d, i) { return keysRight[i] })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        d3.csv("data/012518cm/012518cmstep.csv").then(
            function (data1) {
                svgGFRLeft.append("g")
                    .call(d3.axisLeft(yleft));

                svgGFRRight.append("g")
                    .attr("transform", "translate(0," + heightGFR + ")");
                // .call(d3.axisBottom(x));

                svgGFRLeft.selectAll("dot")
                    .data(data1)
                    .enter().append("line")
                    .attr("x1", function (d) { return x(d["touch down L"]); })
                    .attr("y1", 0)
                    .attr("x2", function (d) { return x(d["touch down L"]); })
                    .attr("y2", heightGFR)
                    .style("stroke-width", 2)
                    .style("stroke", "black")
                    .style("fill", "none")
                    .style("opacity", 0.7)

                svgGFRRight.selectAll("dot")
                    .data(data1)
                    .enter().append("line")
                    .attr("x1", function (d) { return x(d["touch down R"]); })
                    .attr("y1", 0)
                    .attr("x2", function (d) { return x(d["touch down R"]); })
                    .attr("y2", heightGFR)
                    .style("stroke-width", 2)
                    .style("stroke", "black")
                    .style("fill", "none")
                    .style("opacity", 0.7)

                svgGFRLeft.selectAll("dot")
                    .data(data1)
                    .enter().append("line")
                    .attr("x1", function (d) { return x(d["toe off L"]); })
                    .attr("y1", 0)
                    .attr("x2", function (d) { return x(d["toe off L"]); })
                    .attr("y2", heightGFR)
                    .style("stroke-width", 2)
                    .style("stroke", "orange")
                    .style("fill", "none")
                    .style("opacity", 0.7)

                svgGFRRight.selectAll("dot")
                    .data(data1)
                    .enter().append("line")
                    .attr("x1", function (d) { return x(d["toe off R"]); })
                    .attr("y1", 0)
                    .attr("x2", function (d) { return x(d["toe off R"]); })
                    .attr("y2", heightGFR)
                    .style("stroke-width", 2)
                    .style("stroke", "orange")
                    .style("fill", "none")
                    .style("opacity", 0.7)
            }
        )
    });
