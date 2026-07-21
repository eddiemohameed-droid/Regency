let projectData = null;
let selectedUnit = null;


const floorSelect = document.getElementById("floorSelect");
const areaSelect = document.getElementById("areaSelect");


// Load Data

fetch("units.json")

.then(response => response.json())

.then(data => {

    projectData = data[0];

    loadFloors();

});



// Load Floors

function loadFloors(){

    floorSelect.innerHTML =
    `<option value="">Select Floor</option>`;


    projectData.floors.forEach(floor=>{


        floorSelect.innerHTML +=

        `
        <option value="${floor.name}">
        ${floor.name}
        </option>
        `;


    });


}




// Floor Change

floorSelect.addEventListener("change",()=>{


    areaSelect.innerHTML =
    `<option value="">Select Area</option>`;


    clearDetails();



    let floor =
    projectData.floors.find(
        x=>x.name===floorSelect.value
    );


    if(!floor) return;



    floor.units.forEach(unit=>{


        areaSelect.innerHTML +=

        `
        <option value="${unit.id}">
        ${unit.area}
        </option>
        `;


    });



});




// Area Change

areaSelect.addEventListener("change",()=>{


    let floor =
    projectData.floors.find(
        x=>x.name===floorSelect.value
    );


    selectedUnit =
    floor.units.find(
        x=>x.id===areaSelect.value
    );



    showDetails();


});





function showDetails(){


document.getElementById("unitName").innerHTML =

selectedUnit.type;



document.getElementById("area").innerHTML =

selectedUnit.area;



document.getElementById("price").innerHTML =

selectedUnit.price.toLocaleString()+" EGP";



let status =
document.getElementById("status");


status.innerHTML =
selectedUnit.status;



status.className =
selectedUnit.status.toLowerCase();



document.getElementById("payment").innerHTML =

selectedUnit.paymentPlan;



if(selectedUnit.gallery.length){

document.getElementById("unitImage").src =
selectedUnit.gallery[0];

}



}





// Calculator


document.getElementById("calculateBtn")

.addEventListener("click",()=>{


if(!selectedUnit){

alert("Select Unit First");

return;

}



let down =

Number(
document.getElementById("downPayment").value
);



let years =

Number(
document.getElementById("years").value
);



let type =

Number(
document.getElementById("paymentType").value
);



let remaining =

selectedUnit.price - down;



let installment =

remaining/(years*type);



document.getElementById("result").innerHTML =

`
Remaining:
${remaining.toLocaleString()} EGP

<br><br>

Installment:

${Math.round(installment).toLocaleString()} EGP

`;



});





function clearDetails(){


selectedUnit=null;


document.getElementById("unitName").innerHTML =
"Select Area";


document.getElementById("area").innerHTML="";


document.getElementById("price").innerHTML="";


document.getElementById("status").innerHTML="";


document.getElementById("payment").innerHTML="";


document.getElementById("unitImage").src="";


}
