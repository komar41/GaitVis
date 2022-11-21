//AP colors -> (178,226,226), (102,194,164), (35,139,69)
//ML colors -> (203,201,226), (158,154,200), (106,81,163)
//VT colors -> (252,174,145), (251,106,74), (203,24,29)

//Percentile ranges ( 33 & 67)


//L-AP -> -0.86, -0.08
//R-AP -> -0.13, 0.94

//L-ML -> -3.38, 0.39
//R-ML ->  -0.30, 8.56


//L-VT -> 0.03, 75.18
//R-VT -> 1.80, 10.31



var grf22; 
let getGRFData = () => {
    
  return d3.csv("data/012518cm/012518cm_22_grf.csv", data => {
      return {
          time: +data.time,
          rAP: +data["R-AP"],
          lAP: +data["L-AP"],
          rML: +data["R-ML"],
          lML: +data["L-ML"],
          rVT: +data["R-VT"],
          lVT: +data["L-VT"]
      }
  }).then(data => { return data });
}

async function fetchData() {
  grf22 = await getGRFData();
}
fetchData();

//Base svgs

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

//Circle svgs

svg_left.append("circle")
            .attr("cx", 140)
            .attr("cy", 30)
            .attr("r", 14)
            .attr("fill",'black');

svg_left.append("circle")
            .attr("cx", 112)
            .attr("cy", 35)
            .attr("r", 12)
            .attr("fill",'black');

svg_left.append("circle")
            .attr("cx", 95)
            .attr("cy", 52)
            .attr("r", 10)
            .attr("fill",'black');
            
svg_left.append("circle")
            .attr("cx", 88)
            .attr("cy", 70)
            .attr("r", 8)
            .attr("fill",'black');  

svg_left.append("circle")
            .attr("cx", 86)
            .attr("cy", 86)
            .attr("r", 6)
            .attr("fill",'black');  

svg_right.append("circle")
            .attr("cx", 80)
            .attr("cy", 30)
            .attr("r", 14)
            .attr("fill",'black');

svg_right.append("circle")
            .attr("cx", 108)
            .attr("cy", 35)
            .attr("r", 12)
            .attr("fill",'black');

svg_right.append("circle")
            .attr("cx", 123)
            .attr("cy", 55)
            .attr("r", 10)
            .attr("fill",'black');
            
svg_right.append("circle")
            .attr("cx", 130)
            .attr("cy", 75)
            .attr("r", 8)
            .attr("fill",'black');           

svg_right.append("circle")
            .attr("cx", 133)
            .attr("cy", 90)
            .attr("r", 6)
            .attr("fill",'black');

//Feet SVG (Semi circle + 3 rectangles for every side)

const arcGenerator = d3.arc()
            .outerRadius(40)
            .innerRadius(0)
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2);

//Left feet

//Arc 1
svg_left.append("path")
            .attr('id', 'temp1')
            .attr("transform", "translate(140,90)")
            .attr("d", arcGenerator())
            .attr("fill", 'rgb(178,226,226)');

//Rectangle 1
svg_left.append("rect")
              .attr('id', 'temp2')
              .attr("x",100)
              .attr("y", 90)
              .attr("width", 26)
              .attr("height", 70)
              .attr("fill", 'rgb(203,201,226)');

//Rectangle 2
svg_left.append("rect")
              .attr('id', 'temp3')
              .attr("x",126)
              .attr("y", 90)
              .attr("width", 28)
              .attr("height", 70)
              .attr("fill", 'rgb(252,174,145)');

//Rectangle 3
svg_left.append("rect")
              .attr('id', 'temp4')
              .attr("x",154)
              .attr("y", 90)
              .attr("width", 26)
              .attr("height", 70)
              .attr("fill", 'rgb(203,201,226)');
//Arc 2
svg_left.append("path")
                .attr('id', 'temp5')
                .attr("transform", "translate(140,160) rotate(180)")
                .attr("d", arcGenerator())
                .attr("fill", 'rgb(178,226,226)');
//Right feet

//Arc 1
svg_right.append("path")
            .attr('id', 'temp6')
            .attr("transform", "translate(80,90)")
            .attr("d", arcGenerator())
            .attr("fill", 'rgb(178,226,226)');

//Rectangle 1
svg_right.append("rect")
                .attr('id', 'temp7')
                .attr("x",40)
                .attr("y", 90)
                .attr("width", 26)
                .attr("height", 70)
                .attr("fill", 'rgb(203,201,226)');
      
//Rectangle 2
svg_right.append("rect")
                .attr('id', 'temp8')
                .attr("x",66)
                .attr("y", 90)
                .attr("width", 28)
                .attr("height", 70)
                .attr("fill", 'rgb(252,174,145)');

//Rectangle 3
svg_right.append("rect")
                .attr('id', 'temp9')
                .attr("x",94)
                .attr("y", 90)
                .attr("width", 26)
                .attr("height", 70)
                .attr("fill", 'rgb(203,201,226)');

//Arc 2
svg_right.append("path")
                .attr('id', 'temp10')
                .attr("transform", "translate(80,160) rotate(180)")
                .attr("d", arcGenerator())
                .attr("fill", 'rgb(178,226,226)');


async function updateSlice(val){
    var a;
    //Get specific data
    for(var i =  0; i < data.length ; i++){
      //Left AP
      for(var j = 0 ; j < 6000 ; j++){
        var temp = grf22[j].time;
        if(Math.abs(temp - val) < 0.001){
          a = j;
          break;      
        }
      }
      console.log(grf22[a].rAP);
      if(grf22[a].lAP < -0.86){
        d3.select("#temp1").attr("fill",'rgb(178,226,226)');
        d3.select("#temp5").attr("fill",'rgb(178,226,226)');
      }
      if(grf22[a].lAP  > -0.86 && grf22[a].lAP  < -0.08){
        d3.select("#temp1").attr("fill",'rgb(102,194,164)');
        d3.select("#temp5").attr("fill",'rgb(102,194,164)');
      }
      if(grf22[a].lAP  > -0.08){
        d3.select("#temp1").attr("fill",'rgb(35,139,69)');
        d3.select("#temp5").attr("fill",'rgb(35,139,69)');
      }

      //Right AP
      if(grf22[a].rAP < -0.13){
        d3.select("#temp6").attr("fill",'rgb(178,226,226)');
        d3.select("#temp10").attr("fill",'rgb(178,226,226)');
      }
      if(grf22[a].rAP > -0.13 && grf22[a].rAP < 0.94){
        d3.select("#temp6").attr("fill",'rgb(102,194,164)');
        d3.select("#temp10").attr("fill",'rgb(102,194,164)');
      }
      if(grf22[a].rAP > 0.94){
        d3.select("#temp6").attr("fill",'rgb(35,139,69)');
        d3.select("#temp10").attr("fill",'rgb(35,139,69)');
      }

      //Left ML
      if(val < -3.38){
        d3.select("#temp2").attr("fill",'rgb(203,201,226)');
        d3.select("#temp4").attr("fill",'rgb(203,201,226)');
      }
      if(val > -3.38 && val < 0.39){
        d3.select("#temp2").attr("fill",'rgb(158,154,200)');
        d3.select("#temp4").attr("fill",'rgb(158,154,200)');
      }
      if(val > 0.39){
        d3.select("#temp2").attr("fill",'rgb(106,81,163)');
        d3.select("#temp4").attr("fill",'rgb(106,81,163)');
      }
      
      //Right ML
      if(val < -0.30){
        d3.select("#temp7").attr("fill",'rgb(203,201,226)');
        d3.select("#temp9").attr("fill",'rgb(203,201,226)');
      }
      if(val > -0.30 && val < 8.56){
        d3.select("#temp7").attr("fill",'rgb(158,154,200)');
        d3.select("#temp9").attr("fill",'rgb(158,154,200)');
      }
      if(val > 8.56){
        d3.select("#temp7").attr("fill",'rgb(106,81,163)');
        d3.select("#temp9").attr("fill",'rgb(106,81,163)');
      }

      //Left VT
      if(val < 0.03){
        d3.select("#temp3").attr("fill",'rgb(252,174,145)');
      }
      if(val > 0.03 && val < 75.18){
        d3.select("#temp3").attr("fill",'rgb(251,106,74)');
      }
      if(val > 75.18){
        d3.select("#temp3").attr("fill",'rgb(203,24,29)');
      }
      //Right VT
      if(val < 1.80){
        d3.select("#temp8").attr("fill",'rgb(252,174,145)');
      }
      if(val > 1.80 && val < 10.31){
        d3.select("#temp8").attr("fill",'rgb(251,106,74)');
      }
      if(val > 10.31){
        d3.select("#temp8").attr("fill",'rgb(203,24,29)');
      }
    }
}