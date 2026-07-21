let data = null;
let selectedUnit = null;
let compareList = [];


const floorSelect = document.getElementById("floorSelect");
const areaSelect = document.getElementById("areaSelect");


// Load JSON

fetch("units.json")
.then(res => res.json())
.then(result => {

    data = result[0];

    loadFloors();
    loadProjectInfo();

});



// Floors

function loadFloors(){

    floorSelect.innerHTML =
    `<option>Select Floor</option>`;

    data.floors.forEach(floor=>{

        floorSelect.innerHTML +=
        `
        <option value="${floor.name}">
        ${floor.name}
        </option>
        `;

    });

}




// Floor Selected

floorSelect.addEventListener("change",()=>{


    areaSelect.innerHTML =
    `<option>Select Area</option>`;


    let floor =
    data.floors.find(
        x=>x.name===floorSelect.value
    );


    if(!floor)return;


    floor.units.forEach(unit=>{


        areaSelect.innerHTML +=

        `
        <option value="${unit.id}">
        ${unit.area}
        </option>
        `;


    });


});





// Area Selected

areaSelect.addEventListener("change",()=>{


let floor =
data.floors.find(
x=>x.name===floorSelect.value
);


selectedUnit =
floor.units.find(
x=>x.id===areaSelect.value
);


showUnit();


});






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



document.getElementById("payment").innerHTML =
selectedUnit.paymentPlan;



// Image

document.getElementById("unitImage").src =
selectedUnit.gallery[0];



// Gallery

let gallery =
document.getElementById("gallery");


gallery.innerHTML="";


selectedUnit.gallery.forEach(image=>{


gallery.innerHTML +=

`
<img src="${image}"
onclick="changeImage('${image}')">

`;

});


}




function changeImage(img){

document.getElementById("unitImage").src=img;

}






// Compare

document.getElementById("compareBtn")
.addEventListener("click",()=>{


if(!selectedUnit){

alert("Select Unit First");

return;

}


if(compareList.length>=3){

alert("Maximum 3 Units");

return;

}


compareList.push(selectedUnit);


renderCompare();


});






function renderCompare(){


let box =
document.getElementById("compareBox");


box.innerHTML="";


compareList.forEach(unit=>{


box.innerHTML +=


`
<div class="compare-card">

<h4>${unit.type}</h4>

<p>${unit.area}</p>

<p>${unit.price.toLocaleString()} EGP</p>

<p>${unit.status}</p>

</div>

`;


});


}








// Calculator


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



let paymentType =
Number(
document.getElementById("paymentType").value
);



let years =
10;



let remaining =
selectedUnit.price-down;



let monthly =
remaining/(years*paymentType);



document.getElementById("result").innerHTML=

`
Remaining:
${remaining.toLocaleString()} EGP

<br><br>

Installment:
${Math.round(monthly).toLocaleString()} EGP

`;



});








// Booking


document.getElementById("bookingMethod")
.addEventListener("change",function(){


let msg =
document.getElementById("cashMessage");


if(this.value==="Cash"){


msg.innerHTML =

`
Cash Reservation:
You have 7 days to visit company office
and pay 50,000 EGP reservation fees.
`;

}

else{


msg.innerHTML =
"Visa Payment Selected";

}


});









// Project Information


function loadProjectInfo(){


document.getElementById("companyLocation").innerHTML =
data.companyLocation;


document.getElementById("projectLocation").innerHTML =
data.projectLocation;



data.landmarks.forEach(item=>{


document.getElementById("landmarks").innerHTML +=

`<li>${item}</li>`;


});



data.amenities.forEach(item=>{


document.getElementById("amenities").innerHTML +=

`<li>${item}</li>`;


});


}
