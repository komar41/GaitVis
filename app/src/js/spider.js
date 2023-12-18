let patientNum = 0;
let data = [];
let features = ["Step Time (L)", "Swing Time (L)", "Stride Time (L)",
    "Step Time (R)", "Swing Time (R)", "Stride Time (R)"];
//generate the data
for (var i = 0; i < 3; i++) {
    var point = {}
    //each feature will be a random number from 1-9
    features.forEach(f => point[f] = 1 + Math.random() * 8);
    data.push(point);
}
// console.log(data);

let svgSpider = d3.select("#spiderViz").append("svg")
    .attr("width", 300)
    .attr("height", 300);

let radialScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 100]);
let ticks = [2, 4, 6, 8, 10];

ticks.forEach(t => {
    svgSpider.append("circle")
        .attr("cx", 160)
        .attr("cy", 120)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t))
    // console.log(radialScale(t))
}
);

ticks.forEach(t =>
    svgSpider.append("text")
        .attr("x", 170)
        .attr("y", 130 - radialScale(t))
        .text(t.toString())
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .style("font-weight", "bold")
);

function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return { "x": 160 + x, "y": 120 - y };
}

for (var i = 0; i < features.length; i++) {
    let ft_name = features[i];
    let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    let line_coordinate = angleToCoordinate(angle, 10);
    let label_coordinate = angleToCoordinate(angle, 10.5);

    //draw axis line
    svgSpider.append("line")
        .attr("x1", 160)
        .attr("y1", 120)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke", "black");

    //draw axis label
    svgSpider.append("text")
        .attr("x", label_coordinate.x)
        .attr("y", label_coordinate.y + 3)
        .text(ft_name)
        .style("text-anchor", "middle")
        .style("font-size", 10)
        .style("font-weight", "bold")
}

let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);
let colors = ["#66c2a5", "#fc8d62", "#8da0cb"];

function getPathCoordinates(data_point) {
    let coordinates = [];
    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
}

let addPatient = (selectObject) => {
    if(selectObject.value!="Add Trials"){
        // console.log(selectObject.value)
        const $select = document.querySelector('#trialSelect');
        $select.value = 'Add Trials'
    }
    //draw the path element
    addPatientSVG(patientNum)
    patientNum += 1;
    if(patientNum>=3){
        document.getElementById('trialSelect').style.visibility = "hidden"
    }
}

let addPatientSVG = (i) => {
    
    if (i < data.length) {
        let d = data[i];
        let color = colors[i];
        let coordinates = getPathCoordinates(d);

        svgSpider.append("path")
            .attr("id", "spd".concat(i))
            .datum(coordinates)
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", color)
            .attr("fill", color)
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5)
            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '0.8');
            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '0.5');
            })
    }
}

let remPatient = () => {
    for (var i = 0; i < patientNum; i++) {
        svgSpider.select("#spd".concat(i)).remove();
    }
    patientNum = 0
    document.getElementById('trialSelect').style.visibility = "visible";
}

