async function histdata(){
    let soc = await parseSoc()
    var a = 0;
    var b = 0;
    var c  = 0;
    var d  = 0;
    var e  = 0;
    var f  = 0;
    for(var i = 0 ; i < 1001 ; i++){
        if(soc[i].age<=65){
            a+=1
        }
        if(soc[i].age>65 && soc[i].age<=70){
            b+=1
        }
        if(soc[i].age>65 && soc[i].age<=70){
            b+=1
        }
        if(soc[i].age>70 && soc[i].age<=75){
            c+=1
        }
        if(soc[i].age>75 && soc[i].age<=80){
            d+=1
        }
        if(soc[i].age>80 && soc[i].age<=85){
            e+=1
        }
        if(soc[i].age>85 && soc[i].age<=90){
            f+=1
        }
    }
    let age = [{group: "60-65", var1:a},{group: "65-70", var1:b},{group: "70-75", var1:c},{group: "75-80", var1:d},{group: "80-85", var1:e},{group: "85-90", var1:f}]
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    e = 0;
    f = 0;
    for(var i = 0 ; i < 1001 ; i++){
        if(soc[i].height<=163){
            a+=1
        }
        if(soc[i].height>163 && soc[i].height<=168){
            b+=1
        }
        if(soc[i].heighte>168 && soc[i].height<=174){
            b+=1
        }
        if(soc[i].height>174 && soc[i].height<=180){
            c+=1
        }
        if(soc[i].height>180 && soc[i].height<=185){
            d+=1
        }
        if(soc[i].height>185 && soc[i].height<=190){
            e+=1
        }
        if(soc[i].height>190 && soc[i].height<=195){
            f+=1
        }
    }
    let heightt = [{group: "163-168", var2:a},{group: "168-174", var2:b},{group: "174-180", var2:c},{group: "180-185", var2:d},{group: "185-190", var2:e},{group: "190-195", var2:f}]
    console.log(age)
    console.log(heightt)
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Initialize the X axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .padding(0.2);

    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")

    // Initialize the Y axis
    var y = d3.scaleLinear()
        .range([ height, 0]);

    var yAxis = svg.append("g")
        .attr("class", "myYaxis")

    // A function that create / update the plot for a given variable:
    function update(selectedVar) {
        d3.select("u").remove();
        // Parse the Data
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/barplot_change_data.csv").then( function(data) {
            console.log(data)
            console.log(soc)
            // X axis
            if(selectedVar == 'var1'){
                data = age
            }
            if(selectedVar == 'var2'){
                data = heightt
            }
            x.domain(data.map(function(d) { return d.group; }))
            xAxis.transition().duration(1000).call(d3.axisBottom(x))

            // Add Y axis
            y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
            yAxis.transition().duration(1000).call(d3.axisLeft(y));

            // variable u: map data to existing bars
            var u = svg.selectAll("rect")
                .data(data)

            // update bars
            u
                .enter()
                .append("rect")
                .merge(u)
                .transition()
                .duration(1000)
                .attr("x", function(d) { return x(d.group); })
                .attr("y", function(d) { return y(d[selectedVar]); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d[selectedVar]); })
                .attr("fill", "#69b3a2")
            })
    }

    // Initialize plot
    update('var1')

    const someCheckbox = document.getElementById('someID');
    someCheckbox.addEventListener('change', e => {
        if(e.target.checked === true) {
            console.log("Checkbox is checked - boolean value: ", e.target.checked)
            document.getElementById('someID2').checked = false;
            update('var1');
        }
        if(e.target.checked === false) {
            console.log("Checkbox is not checked - boolean value: ", e.target.checked)
        }
    });
    const someCheckbox2 = document.getElementById('someID2');
    someCheckbox2.addEventListener('change', e => {
        if(e.target.checked === true) {
            console.log("Checkbox is checked - boolean value: ", e.target.checked)
            document.getElementById('someID').checked = false;
            update('var2');
        }
        if(e.target.checked === false) {
            console.log("Checkbox is not checked - boolean value: ", e.target.checked)
        }
    });
}
histdata();


