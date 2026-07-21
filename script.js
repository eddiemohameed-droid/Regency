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

x => x.project === projectSelect.value

);



areaSelect.innerHTML =
`
<option>Select Area</option>
`;

floorSelect.innerHTML =
`
<option>Select Floor</option>
`;



project.areas.forEach((area,index)=>{


areaSelect.innerHTML +=

`
<option value="${index}">
${area.name}
</option>

`;

});



document.getElementById("projectLocation").innerHTML =

`
<b>${project.type}</b>
<br>
${project.location}
`;



}









// AREA CHANGE

areaSelect.addEventListener("change",()=>{


let project = projects.find(

x=>x.project===projectSelect.value

);



let area = project.areas[areaSelect.value];



floorSelect.innerHTML =
`
<option>Select Floor</option>
`;



area.units.forEach((unit,index)=>{


floorSelect.innerHTML +=

`
<option value="${index}">
${unit.floor}
</option>

`;

});


});









// FLOOR CHANGE

floorSelect.addEventListener("change",()=>{


let project = projects.find(

x=>x.project===projectSelect.value

);



let area = project.areas[areaSelect.value];



selectedUnit = area.units[floorSelect.value];



showUnit();


});









function showUnit(){


document.getElementById("detailsSection")
.style.display="block";



document.getElementById("unitName").innerHTML =

selectedUnit.type;



document.getElementById("area").innerHTML =

selectedUnit.area || areaSelect.options[areaSelect.selectedIndex].text;



document.getElementById("price").innerHTML =

selectedUnit.price.toLocaleString()+" EGP";



document.getElementById("status").innerHTML =

selectedUnit.status;



document.getElementById("payment").innerHTML =

selectedUnit.paymentPlan;





document.getElementById("unitImage").src =

selectedUnit.gallery[0];





// calculator price

document.getElementById("unitPrice").value =

selectedUnit.price.toLocaleString()+" EGP";



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









// CONFIRM BOOKING


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




let downPayment =

Number(

document.getElementById("downPayment").value

) || 0;




let years =

Number(

document.getElementById("years").value

);



let paymentType =

Number(

document.getElementById("paymentType").value

);





let remaining =

selectedUnit.price - downPayment;





let installment =

remaining / (years * paymentType);





document.getElementById("calculatorResult").innerHTML =

`

<div>

<h5>Remaining Amount</h5>

<h4>
${remaining.toLocaleString()} EGP
</h4>


<hr>


<h5>Installment</h5>

<h4>
${Math.round(installment).toLocaleString()} EGP
</h4>

</div>

`;



};








// ADMIN MODE


document.getElementById("adminMode")
.onclick=function(){

document.getElementById("adminPanel").style.display="block";

};




// SALES MODE


document.getElementById("salesMode")
.onclick=function(){

document.getElementById("adminPanel").style.display="none";

};
