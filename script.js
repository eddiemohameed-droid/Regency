let projectData = null;
let selectedUnit = null;
let compareUnits = [];

const floorSelect = document.getElementById("floorSelect");
const areaSelect = document.getElementById("areaSelect");
const areaSearch = document.getElementById("areaSearch");


// LOAD JSON

fetch("units.json")

.then(res => res.json())

.then(data => {

    projectData = data[0];

    loadFloors();

    loadProjectInfo();

});



// FLOORS

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




// FLOOR CHANGE

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




// AREA CHANGE

areaSelect.addEventListener("change",()=>{


let floor =
projectData.floors.find(
x=>x.name===floorSelect.value
);


selectedUnit =
floor.units.find(
x=>x.id===areaSelect.value
);



showUnit();


});





// SHOW UNIT

function showUnit(){


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
selectedUnit.status;



document.getElementById("payment").innerHTML =

selectedUnit.paymentPlan;



// MAIN IMAGE

document.getElementById("unitImage").src =

selectedUnit.gallery[0];



// GALLERY

let gallery =
document.getElementById("gallery");


gallery.innerHTML="";



selectedUnit.gallery.forEach(img=>{


gallery.innerHTML +=

`
<img src="${img}"

width="80"

height="60"

style="object-fit:cover;cursor:pointer;border-radius:8px"

onclick="changeImage('${img}')">

`;

});


}





function changeImage(img){

document.getElementById("unitImage").src=img;

}





// COMPARE

document.querySelector(".btn-success")

.addEventListener("click",()=>{


if(!selectedUnit) return;



if(compareUnits.length>=3){

alert("Maximum 3 Units");

return;

}



compareUnits.push(selectedUnit);


showCompare();


});





function showCompare(){


let box =
document.getElementById("compareBox");


box.innerHTML="";



compareUnits.forEach(unit=>{


box.innerHTML +=

`
<div class="card p-3 mb-2">


<h5>${unit.type}</h5>

Area: ${unit.area}

<br>

Price:
${unit.price.toLocaleString()}

<br>

Status:
${unit.status}


</div>
`;

});


}





// CALCULATOR


document.getElementById("calculateBtn")

.addEventListener("click",()=>{


if(!selectedUnit){

alert("Select Unit");

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
selectedUnit.price-down;



let installment =
remaining/(years*type);



document.getElementById("result").innerHTML=

`

Remaining:

${remaining.toLocaleString()} EGP

<br><br>

Installment:

${Math.round(installment).toLocaleString()} EGP

`;



});






// PROJECT INFO


function loadProjectInfo(){


document.getElementById("companyLocation").innerHTML =

projectData.companyLocation;



document.getElementById("projectLocation").innerHTML =

projectData.projectLocation;



let landmarks =
document.getElementById("landmarks");


projectData.landmarks.forEach(item=>{


landmarks.innerHTML +=

`<li>${item}</li>`;


});



let amenities =
document.getElementById("amenities");


projectData.amenities.forEach(item=>{


amenities.innerHTML +=

`<li>${item}</li>`;


});


}







function clearDetails(){


selectedUnit=null;


document.getElementById("unitName").innerHTML="Select Unit";

document.getElementById("area").innerHTML="";

document.getElementById("price").innerHTML="";

document.getElementById("status").innerHTML="";

document.getElementById("payment").innerHTML="";

document.getElementById("unitImage").src="";

document.getElementById("gallery").innerHTML="";


}
