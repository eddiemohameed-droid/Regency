let projects = [];
let selectedUnit = null;


const projectSelect = document.getElementById("projectSelect");
const areaSelect = document.getElementById("areaSelect");
const floorSelect = document.getElementById("floorSelect");



// LOAD DATA

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


let project =
projects.find(
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







// AREA SELECT


areaSelect.addEventListener("change",()=>{


let project =
projects.find(
x=>x.project===projectSelect.value
);



let area =
project.areas[areaSelect.value];



floorSelect.innerHTML =

`
<option value="${area.name}">
${area.floor}
</option>
`;



});









// FLOOR SELECT


floorSelect.addEventListener("change",()=>{


let project =
projects.find(
x=>x.project===projectSelect.value
);



let area =
project.areas.find(
x=>x.name===areaSelect.options[areaSelect.selectedIndex].text
);



selectedUnit = area;



showUnit();


});








function showUnit(){


document.getElementById("detailsSection")
.style.display="block";



document.getElementById("unitName").innerHTML =

selectedUnit.name;



document.getElementById("area").innerHTML =

selectedUnit.name;



document.getElementById("price").innerHTML =

selectedUnit.price.toLocaleString()
+" EGP";



document.getElementById("status").innerHTML =

"Available";



document.getElementById("payment").innerHTML =

"10% Down Payment - 10 Years";



document.getElementById("unitImage").src =

"images/unit1.jpg";



}








// BOOK NOW


document.getElementById("bookBtn")
.onclick=function(){


if(!selectedUnit){

alert("Please select Area first");

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

alert("Select Sales");

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

alert("Select Unit First");

return;

}



let down =
Number(document.getElementById("downPayment").value);



let paymentType =
Number(document.getElementById("paymentType").value);



let years =
10;



let remaining =
selectedUnit.price - down;



let installment =
remaining/(years*paymentType);



document.getElementById("calculatorResult").innerHTML =

`
Remaining Amount:
<br>
${remaining.toLocaleString()} EGP

<hr>

Installment:
<br>
${Math.round(installment).toLocaleString()} EGP

`;



};









// ADMIN MODE


document.getElementById("adminMode")
.onclick=function(){

alert("Admin Mode Enabled");

};




// SALES MODE


document.getElementById("salesMode")
.onclick=function(){

alert("Sales Mode Enabled");

};
