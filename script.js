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





// PROJECT

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









// AREA


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








// FLOOR


floorSelect.addEventListener("change",()=>{


let project =
projects.find(

x=>x.project===projectSelect.value

);



let area =
project.areas[areaSelect.selectedIndex-1];



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

selectedUnit.price.toLocaleString()+" EGP";



document.getElementById("status").innerHTML =

"Available";



document.getElementById("payment").innerHTML =

"Flexible Payment Plan";



document.getElementById("unitImage").src =

"images/unit1.jpg";



// Calculator Price

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









// CONFIRM


document.getElementById("confirmBooking")
.onclick=function(){


let sales =
document.getElementById("salesSelect").value;


let method =
document.getElementById("paymentMethod").value;



if(sales==="Select Sales"){

alert("Please select Sales");

return;

}



if(method==="Select Payment"){

alert("Please select Payment");

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
${method}

`;



};









// CALCULATOR


document.getElementById("calculateBtn")
.onclick=function(){



if(!selectedUnit){

alert("Please select unit first");

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



let frequency =

Number(

document.getElementById("paymentType").value

);




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


document.getElementById("adminPanel")
.style.display="block";


};




// SALES MODE


document.getElementById("salesMode")
.onclick=function(){


document.getElementById("adminPanel")
.style.display="none";


};
