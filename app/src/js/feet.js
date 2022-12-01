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
let getFeetGrf = (data) => {
  var dataGrf = data.map(function (d) {
    return {
      time: +d.time,
      rAP: +d["R-AP"],
      lAP: +d["L-AP"],
      rML: +d["R-ML"],
      lML: +d["L-ML"],
      rVT: +d["R-VT"],
      lVT: +d["L-VT"],
    };
  });

  // console.log(dataGrf)
  return dataGrf;
};

async function fetchDataT(data, patient_id) {
  const range_s = document.getElementById("myRange");
  range_s.value = 0;

  const range = document.querySelector("#range-slider");
  range.value = "0 sec";

  const selectedTrial = document.querySelector(".descTrial");
  selectedTrial.innerHTML = "Selected Trial: ".concat(patient_id);
  // console.log(selectedTrial)
  grf22 = await getFeetGrf(data);
}
// fetchDataT();

//Base svgs

var svg_left = d3
  .select("#leftFoot")
  .append("svg")
  .attr("width", 210)
  .attr("height", 210)
  .style("background-color", "white");

var svg_right = d3
  .select("#rightFoot")
  .append("svg")
  .attr("width", 210)
  .attr("height", 210)
  .style("background-color", "white");

//Circle svgs

svg_left
  .append("circle")
  .attr("cx", 140)
  .attr("cy", 30)
  .attr("r", 14)
  .attr("fill", "black");

svg_left
  .append("circle")
  .attr("cx", 112)
  .attr("cy", 35)
  .attr("r", 12)
  .attr("fill", "black");

svg_left
  .append("circle")
  .attr("cx", 95)
  .attr("cy", 52)
  .attr("r", 10)
  .attr("fill", "black");

svg_left
  .append("circle")
  .attr("cx", 88)
  .attr("cy", 70)
  .attr("r", 8)
  .attr("fill", "black");

svg_left
  .append("circle")
  .attr("cx", 86)
  .attr("cy", 86)
  .attr("r", 6)
  .attr("fill", "black");

svg_right
  .append("circle")
  .attr("cx", 40)
  .attr("cy", 30)
  .attr("r", 14)
  .attr("fill", "black");

svg_right
  .append("circle")
  .attr("cx", 68)
  .attr("cy", 35)
  .attr("r", 12)
  .attr("fill", "black");

svg_right
  .append("circle")
  .attr("cx", 83)
  .attr("cy", 55)
  .attr("r", 10)
  .attr("fill", "black");

svg_right
  .append("circle")
  .attr("cx", 90)
  .attr("cy", 75)
  .attr("r", 8)
  .attr("fill", "black");

svg_right
  .append("circle")
  .attr("cx", 93)
  .attr("cy", 90)
  .attr("r", 6)
  .attr("fill", "black");

//Feet SVG (Semi circle + 3 rectangles for every side)

const arcGenerator = d3
  .arc()
  .outerRadius(40)
  .innerRadius(0)
  .startAngle(-Math.PI / 2)
  .endAngle(Math.PI / 2);

//Left feet

//Arc 1
svg_left
  .append("path")
  .attr("id", "temp1")
  .attr("transform", "translate(140,90)")
  .attr("d", arcGenerator())
  .attr("fill", "rgb(178,226,226)");

//Rectangle 1
svg_left
  .append("rect")
  .attr("id", "temp2")
  .attr("x", 100)
  .attr("y", 90)
  .attr("width", 26)
  .attr("height", 70)
  .attr("fill", "rgb(203,201,226)");

//Rectangle 2
svg_left
  .append("rect")
  .attr("id", "temp3")
  .attr("x", 126)
  .attr("y", 90)
  .attr("width", 28)
  .attr("height", 70)
  .attr("fill", "rgb(252,174,145)");

//Rectangle 3
svg_left
  .append("rect")
  .attr("id", "temp4")
  .attr("x", 154)
  .attr("y", 90)
  .attr("width", 26)
  .attr("height", 70)
  .attr("fill", "rgb(203,201,226)");
//Arc 2
svg_left
  .append("path")
  .attr("id", "temp5")
  .attr("transform", "translate(140,160) rotate(180)")
  .attr("d", arcGenerator())
  .attr("fill", "rgb(178,226,226)");
//Right feet

//Arc 1
svg_right
  .append("path")
  .attr("id", "temp6")
  .attr("transform", "translate(40,90)")
  .attr("d", arcGenerator())
  .attr("fill", "rgb(178,226,226)");

//Rectangle 1
svg_right
  .append("rect")
  .attr("id", "temp7")
  .attr("x", 0)
  .attr("y", 90)
  .attr("width", 26)
  .attr("height", 70)
  .attr("fill", "rgb(203,201,226)");

//Rectangle 2
svg_right
  .append("rect")
  .attr("id", "temp8")
  .attr("x", 26)
  .attr("y", 90)
  .attr("width", 28)
  .attr("height", 70)
  .attr("fill", "rgb(252,174,145)");

//Rectangle 3
svg_right
  .append("rect")
  .attr("id", "temp9")
  .attr("x", 54)
  .attr("y", 90)
  .attr("width", 26)
  .attr("height", 70)
  .attr("fill", "rgb(203,201,226)");

//Arc 2
svg_right
  .append("path")
  .attr("id", "temp10")
  .attr("transform", "translate(40,160) rotate(180)")
  .attr("d", arcGenerator())
  .attr("fill", "rgb(178,226,226)");

//Legends
svg_right
  .append("text")
  .attr("fill", "black")
  .attr("x", 108)
  .attr("y", 40)
  .text("AP");

svg_right
  .append("text")
  .attr("fill", "black")
  .attr("x", 108)
  .attr("y", 70)
  .text("ML");

svg_right
  .append("text")
  .attr("fill", "black")
  .attr("x", 108)
  .attr("y", 100)
  .text("VT");

svg_right
  .append("text")
  .attr("fill", "black")
  .attr("x", 128)
  .attr("y", 20)
  .text("Low");

svg_right
  .append("text")
  .attr("fill", "black")
  .attr("x", 158)
  .attr("y", 20)
  .text("Mid");

svg_right
  .append("text")
  .attr("fill", "black")
  .attr("x", 188)
  .attr("y", 20)
  .text("High");

//Rectangles

svg_right
  .append("rect")
  .attr("x", 135)
  .attr("y", 30)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(178,226,226)");

svg_right
  .append("rect")
  .attr("x", 135)
  .attr("y", 60)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(203,201,226)");

svg_right
  .append("rect")
  .attr("x", 135)
  .attr("y", 90)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(252,174,145)");

svg_right
  .append("rect")
  .attr("x", 163)
  .attr("y", 30)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(102,194,164)");

svg_right
  .append("rect")
  .attr("x", 163)
  .attr("y", 60)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(158,154,200)");

svg_right
  .append("rect")
  .attr("id", "temp9")
  .attr("x", 163)
  .attr("y", 90)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(251,106,74)");

svg_right
  .append("rect")
  .attr("x", 190)
  .attr("y", 30)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(35,139,69)");

svg_right
  .append("rect")
  .attr("x", 190)
  .attr("y", 60)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(106,81,163)");

svg_right
  .append("rect")
  .attr("x", 190)
  .attr("y", 90)
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", "rgb(203,24,29)");

async function updateSlice(val) {
  if (val == 0) {
    d3.select("#temp1").attr("fill", "rgb(178,226,226)");
    d3.select("#temp5").attr("fill", "rgb(178,226,226)");
    d3.select("#temp6").attr("fill", "rgb(178,226,226)");
    d3.select("#temp10").attr("fill", "rgb(178,226,226)");
    d3.select("#temp2").attr("fill", "rgb(203,201,226)");
    d3.select("#temp4").attr("fill", "rgb(203,201,226)");
    d3.select("#temp7").attr("fill", "rgb(203,201,226)");
    d3.select("#temp9").attr("fill", "rgb(203,201,226)");
    d3.select("#temp3").attr("fill", "rgb(252,174,145)");
  } else {
    var a;
    //Get specific data
    for (var i = 0; i < data.length; i++) {
      //Left AP
      for (var j = 0; j < 6000; j++) {
        var temp = grf22[j].time;
        if (Math.abs(temp - val) < 0.001) {
          // console.log(temp)
          a = j;
          break;
        }
      }
      console.log(val, "*", grf22[a].rAP);
      // console.log(grf22[a].rAP);
      // console.log(grf22[a].lAP);
      if (grf22[a].lAP < -0.86) {
        d3.select("#temp1").attr("fill", "rgb(178,226,226)");
        d3.select("#temp5").attr("fill", "rgb(178,226,226)");
      }
      if (grf22[a].lAP > -0.86 && grf22[a].lAP < -0.08) {
        d3.select("#temp1").attr("fill", "rgb(102,194,164)");
        d3.select("#temp5").attr("fill", "rgb(102,194,164)");
      }
      if (grf22[a].lAP > -0.08) {
        d3.select("#temp1").attr("fill", "rgb(35,139,69)");
        d3.select("#temp5").attr("fill", "rgb(35,139,69)");
      }

      //Right AP
      if (grf22[a].rAP < -0.13) {
        d3.select("#temp6").attr("fill", "rgb(178,226,226)");
        d3.select("#temp10").attr("fill", "rgb(178,226,226)");
      }
      if (grf22[a].rAP > -0.13 && grf22[a].rAP < 0.94) {
        d3.select("#temp6").attr("fill", "rgb(102,194,164)");
        d3.select("#temp10").attr("fill", "rgb(102,194,164)");
      }
      if (grf22[a].rAP > 0.94) {
        d3.select("#temp6").attr("fill", "rgb(35,139,69)");
        d3.select("#temp10").attr("fill", "rgb(35,139,69)");
      }

      //Left ML
      if (val < -3.38) {
        d3.select("#temp2").attr("fill", "rgb(203,201,226)");
        d3.select("#temp4").attr("fill", "rgb(203,201,226)");
      }
      if (val > -3.38 && val < 0.39) {
        d3.select("#temp2").attr("fill", "rgb(158,154,200)");
        d3.select("#temp4").attr("fill", "rgb(158,154,200)");
      }
      if (val > 0.39) {
        d3.select("#temp2").attr("fill", "rgb(106,81,163)");
        d3.select("#temp4").attr("fill", "rgb(106,81,163)");
      }

      //Right ML
      if (val < -0.3) {
        d3.select("#temp7").attr("fill", "rgb(203,201,226)");
        d3.select("#temp9").attr("fill", "rgb(203,201,226)");
      }
      if (val > -0.3 && val < 8.56) {
        d3.select("#temp7").attr("fill", "rgb(158,154,200)");
        d3.select("#temp9").attr("fill", "rgb(158,154,200)");
      }
      if (val > 8.56) {
        d3.select("#temp7").attr("fill", "rgb(106,81,163)");
        d3.select("#temp9").attr("fill", "rgb(106,81,163)");
      }

      //Left VT
      if (val < 0.03) {
        d3.select("#temp3").attr("fill", "rgb(252,174,145)");
      }
      if (val > 0.03 && val < 75.18) {
        d3.select("#temp3").attr("fill", "rgb(251,106,74)");
      }
      if (val > 75.18) {
        d3.select("#temp3").attr("fill", "rgb(203,24,29)");
      }
      //Right VT
      if (val < 1.8) {
        d3.select("#temp8").attr("fill", "rgb(252,174,145)");
      }
      if (val > 1.8 && val < 10.31) {
        d3.select("#temp8").attr("fill", "rgb(251,106,74)");
      }
      if (val > 10.31) {
        d3.select("#temp8").attr("fill", "rgb(203,24,29)");
      }
    }
  }
}

let updateRangeVal = (val) => {
  const range = document.querySelector("#range-slider");
  range.value = val.toString().concat(" sec");
};
