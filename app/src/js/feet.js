//  var svg_left =  d3.select("#leftFoot").append("img")
//      .attr("src","/Desktop/GaitVis/app/left_foot.svg")
//      .attr("width", 210)
//      .attr("height", 210)

// var svg_right =  d3.select("#rightFoot").append("img")
//     .attr("src","/Desktop/GaitVis/app/right_foot.svg")
//     .attr("width", 230)
//     .attr("height", 230)

// d3.select('#rightFoot')
//     .append('circle')
//         .attr('cx', 10)
//         .attr('cy', 10)
//         .attr('r', 20)
//         .style('fill','blue')
var colorss = [ 'rgb(44,162,95)','rgb(153,216,201)','rgb(229,245,249)','rgb(224,236,244)', 'rgb(158,188,218)','rgb(136,86,167)','rgb(158,188,218)','rgb(224,236,244)','rgb(255,237,160)', 'rgb(254,178,76)','rgb(240,59,32)' ];

var grad = svg.append('defs')
  .append('linearGradient')
  .attr('id', 'grad')
  .attr('x1', '100%')
  .attr('x2', '0%');

grad.selectAll('stop')
  .data(colorss)
  .enter()
  .append('stop')
  .style('stop-color', function(d){ return d; })
  .attr('offset', function(d,i){
    return 100 * (i / (colorss.length - 1)) + '%';
  })

var svg_left = d3.select("#leftFoot")
             .append("svg")
             .attr("width", 210)
             .attr("height", 210)
             .style('background-color', 'white')

var svg_right = d3.select("#rightFoot")
             .append("svg")
             .attr("width", 210)
             .attr("height", 210)
             .style('background-color', 'white')



var circle = svg_left.append("circle")
            .attr("cx", 140)
            .attr("cy", 30)
            .attr("r", 14)
            .attr("fill",'black');

var circle = svg_left.append("circle")
            .attr("cx", 112)
            .attr("cy", 35)
            .attr("r", 12)
            .attr("fill",'black');

var circle = svg_left.append("circle")
            .attr("cx", 95)
            .attr("cy", 52)
            .attr("r", 10)
            .attr("fill",'black');
            
var circle = svg_left.append("circle")
            .attr("cx", 88)
            .attr("cy", 70)
            .attr("r", 8)
            .attr("fill",'black');           

var circle = svg_left.append("circle")
            .attr("cx", 86)
            .attr("cy", 86)
            .attr("r", 6)
            .attr("fill",'black');   

var ellipse = svg_left.append("ellipse")
            .attr("cx", 103)
            .attr("cy", 110)
            .attr("rx", 78)
            .attr("ry", 38)
            .attr("transform", `translate(240,20) rotate(90)`);

var circle = svg_right.append("circle")
            .attr("cx", 80)
            .attr("cy", 30)
            .attr("r", 14)
            .attr("fill",'black');

var circle = svg_right.append("circle")
            .attr("cx", 108)
            .attr("cy", 35)
            .attr("r", 12)
            .attr("fill",'black');

var circle = svg_right.append("circle")
            .attr("cx", 123)
            .attr("cy", 55)
            .attr("r", 10)
            .attr("fill",'black');
            
var circle = svg_right.append("circle")
            .attr("cx", 130)
            .attr("cy", 75)
            .attr("r", 8)
            .attr("fill",'black');           

var circle = svg_right.append("circle")
            .attr("cx", 133)
            .attr("cy", 90)
            .attr("r", 6)
            .attr("fill",'black');   



var ellipse2 = svg_right.append("ellipse")
            .attr("id","temp")
            .attr("cx", 103)
            .attr("cy", 150)
            .attr("rx", 78)
            .attr("ry", 38)
            .attr("fill", 'url(#grad)')
            .attr("transform", `translate(240,20) rotate(90)`);
var a = 0;
function updateSlice(val){
  
    for(var i =  0; i < data.length ; i++){
            a+=1
            if(a%2 == 0){
              d3.select("#temp").remove();
              colorss[0] = 'rgb(153,216,201)';
              var grad = svg.append('defs')
                .append('linearGradient')
                .attr('id', 'grad')
                .attr('x1', '100%')
                .attr('x2', '0%');

              grad.selectAll('stop')
                .data(colorss)
                .enter()
                .append('stop')
                .style('stop-color', function(d){ return d; })
                .attr('offset', function(d,i){
                  return 100 * (i / (colorss.length - 1)) + '%';
              })
              
              var ellipse3 = svg_right.append("ellipse")
                .attr("id","234")
                .attr("cx", 103)
                .attr("cy", 150)
                .attr("rx", 78)
                .attr("ry", 38)
                .attr("fill", 'url(#grad)')
                .attr("transform", `translate(240,20) rotate(90)`);
              console.log(val);
              console.log(colorss);
            }
            else{
              d3.select("#temp").remove();
              colorss[0] = 'rgb(44,162,95)';
              var grad = svg.append('defs')
                .append('linearGradient')
                .attr('id', 'grad')
                .attr('x1', '100%')
                .attr('x2', '0%');

              grad.selectAll('stop')
                .data(colorss)
                .enter()
                .append('stop')
                .style('stop-color', function(d){ return d; })
                .attr('offset', function(d,i){
                  return 100 * (i / (colorss.length - 1)) + '%';
               })
              var ellipse4 = svg_right.append("ellipse")
                .attr("id","234")
                .attr("cx", 103)
                .attr("cy", 150)
                .attr("rx", 78)
                .attr("ry", 38)
                .attr("fill", 'url(#grad)')
                .attr("transform", `translate(240,20) rotate(90)`);
                console.log(val);
                console.log(colorss);
            }
        }
}

