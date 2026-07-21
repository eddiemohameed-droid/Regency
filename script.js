let projects = [];
let selectedUnit = null;



const projectSelect = document.getElementById("projectSelect");
const areaSelect = document.getElementById("areaSelect");
const floorSelect = document.getElementById("floorSelect");




// LOAD JSON

fetch("units.json")

.then(res => res.json())

.then(data => {

projects = data;

loadProject();

});






// PROJECT CHANGE

projectSelect.addEventListener("change",()=>{

loadProject();

});






function loadProject(){


let project = projects.find(
x=>x.project === projectSelect.value
);



areaSelect.innerHTML =
`
<option>Select Area</option>
`;

floorSelect.innerHTML =
`
<option>Select Floor</option>
`;



project.areas.forEach(area=>{


areaSelect.innerHTML +=

`
<option value="${area.name}">
${area.name}
</option>

`;

});



document.getElementById("projectLocation").innerHTML =
project.location;



}








// AREA CHANGE

areaSelect.addEventListener("change",()=>{


let project =
projects.find(
x=>x.project === projectSelect.value
);



let area =
project.areas.find(
x=>x.name===areaSelect.value
);



floorSelect.innerHTML=
`
<option>Select Floor</option>
`;



area.units.forEach(unit=>{


floorSelect.innerHTML +=

`
<option value="${unit.id}">
${unit.floor}
</option>

`;

});


});









// FLOOR CHANGE


floorSelect.addEventListener("change",()=>{


let project =
projects.find(
x=>x.project===projectSelect.value
);



let area =
project.areas.find(
x=>x.name===areaSelect.value
);



selectedUnit =
area.units.find(
x=>x.id===floorSelect.value
);



showUnit();


});









function showUnit(){


document.getElementById("detailsSection")
.style.display="block";



document.getElementById("unitName").innerHTML =
selectedUnit.type;



document.getElementById("area").innerHTML =
selectedUnit.floor;



document.getElementById("price").innerHTML =
selectedUnit.price.toLocaleString()+" EGP";



document.getElementById("status").innerHTML =
selectedUnit.status;



document.getElementById("payment").innerHTML =
selectedUnit.paymentPlan;




document.getElementById("unitImage").src =
selectedUnit.gallery[0];


}











// BOOK NOW

document.getElementById("bookBtn")
.onclick=function(){



if(!selectedUnit){

alert("Please select unit first");

return;

}



document.getElementById("bookingBox")
.style.display="block";


};









// CONFIRM RESERVATION


document.getElementById("confirmBooking")
.onclick=function(){



let sales =
document.getElementById("salesSelect").value;



let payment =
document.getElementById("paymentMethod").value;




if(sales==="Select Sales"){

alert("Select Sales Representative");

return;

}



if(payment==="Select Payment"){

alert("Select Payment Method");

return;

}



document.getElementById("bookingResult").innerHTML =

`
<h4 style="color:green">

✅ Reservation Completed

</h4>

Sales:
${sales}

<br>

Payment:
${payment}

`;



};











// CALCULATOR


document.getElementById("calculateBtn")
.onclick=function(){



if(!selectedUnit){

alert("Select unit first");

return;

}



let down =
Number(
document.getElementById("downPayment").value
);



let type =
Number(
document.getElementById("paymentType").value
);



let remaining =
selectedUnit.price-down;



let installment =
remaining/(10*type);



document.getElementById("calculatorResult")
.innerHTML=

`

Remaining:
${remaining.toLocaleString()} EGP

<br><br>

Installment:
${Math.round(installment).toLocaleString()} EGP

`;



};









// ADMIN MODE


document.getElementById("adminMode")
.onclick=function(){


document.getElementById("adminPanel")
.style.display="block";


};





// SALES MODE


document.getElementById("salesMode")
.onclick=function(){


document.getElementById("adminPanel")
.style.display="none";


};
