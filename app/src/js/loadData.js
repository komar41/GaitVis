// d3.csv("data/".concat(patient_id, "/", patient_id, "step.csv")).then(data =>{

//     // Patient step data. Have to process to extract step time, swing time, ... and so on

// })
let parseSoc = () => {

    return d3.csv("data/demographics.csv", data => {
        // Converted some of the variables to integer type and changed the column names
        return {
            height: +data["Height (cm)"],
            id: data.ID,
            maxFootWidth: +data["Max foot width"],
            weight: +data["Weight (Kg)"],
            age: +data.age,
            ankleWidth: +data["ankle width"],
            asis: +data.asis,
            footLength: +data["foot length"],
            gender: +data["gender (0:F; 1:M)"],
            heelWidth: +data["heel width"],
            kneeWidth: +data["knee width"]
        };
    }).then(data => { return data })
}


let parseGRF = (patient_id, fileName) => {
    return d3.csv("data/".concat(patient_id, "/", patient_id, fileName))
    .then(data => { return data });
}

let parseJNT = (patient_id, fileName) => {
    return d3.csv("data/".concat(patient_id, "/", patient_id, fileName))
            .then(data => { return data });
}

async function fetchData(patient_id) {
    console.log(patient_id)
    // patient_id = "012518cm"
    

    let grf22 = await parseGRF(patient_id, "_22_grf.csv");
    // let grf23 = await parseGRF(patient_id, "_23_grf.csv");
    // let grf24 = await parseGRF(patient_id, "_24_grf.csv");

    let jnt22 = await parseJNT(patient_id, "_22_jnt.csv");
    // let jnt23 = await parseJNT(patient_id, "_23_jnt.csv");
    // let jnt24 = await parseJNT(patient_id, "_23_jnt.csv");

    genLineJnt(jnt22, patient_id)
    getLineGrf(grf22, patient_id)
    fetchDataT(grf22, patient_id)
}
fetchData("012518cm")

async function fetchSocioDem(){
    let soc = await parseSoc()
    plotHist(soc)
}
fetchSocioDem()

let selectTrialP = (object) =>{
    let val = object.value
    if(object.value!="Select a Trial"){
        // console.log(selectObject.value)
        const $select = document.querySelector('#trialSelectGRF');
        $select.value = 'Select a Trial'
    }
    console.log(val)
    fetchData(val)
}