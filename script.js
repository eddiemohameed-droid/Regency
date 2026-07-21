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



document.getElementById("mapFrame").src =

"https://www.google.com/maps?q="
+ encodeURIComponent(project.location)
+ "&output=embed";


}







// AREA

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







// FLOOR

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
areaSelect.options[areaSelect.selectedIndex].text;



document.getElementById("price").innerHTML =
selectedUnit.price.toLocaleString()+" EGP";



document.getElementById("status").innerHTML =
selectedUnit.status;



document.getElementById("payment").innerHTML =
selectedUnit.paymentPlan;



document.getElementById("unitImage").src =
selectedUnit.gallery[0];



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




if(payment==="Cash"){


document.getElementById("bookingResult").innerHTML =


`

<h4 style="color:green">
✅ Reservation Completed
</h4>


Sales:
${sales}

<br>

Payment:
Cash


<hr>


<h5>
Cash Reservation Instructions
</h5>


<p>
You have <b>3 days</b> to visit the company and complete the reservation payment.
</p>


<h3 style="color:#C9A227">
50,000 EGP
</h3>


<hr>


<h5>
📍 Company Location
</h5>


<p>
Mall 220 Second Sector, First Floor, North 90th, Cairo Governorate 11865
</p>

`;



}

else{


document.getElementById("bookingResult").innerHTML =


`

<h4 style="color:green">
✅ Reservation Completed
</h4>


Sales:
${sales}

<br>

Payment:
Visa


<hr>


<p>
Visa payment reservation completed successfully.
</p>


<hr>


<h5>
📍 Company Location
</h5>


<p>
Mall 220 Second Sector, First Floor, North 90th, Cairo Governorate 11865
</p>

`;



}



};









// CALCULATOR


document.getElementById("calculateBtn")
.onclick=function(){


if(!selectedUnit){

alert("Select unit first");

return;

}



let down =
Number(document.getElementById("downPayment").value) || 0;


let years =
Number(document.getElementById("years").value);



let frequency =
Number(document.getElementById("paymentType").value);



let remaining =
selectedUnit.price - down;



let installment =
remaining / (years * frequency);




document.getElementById("calculatorResult").innerHTML =


`

<h5>
Remaining Amount
</h5>

<h4>
${remaining.toLocaleString()} EGP
</h4>


<hr>


<h5>
Installment
</h5>


<h4>
${Math.round(installment).toLocaleString()} EGP
</h4>

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
