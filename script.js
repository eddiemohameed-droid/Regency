let project = null;
let selectedUnit = null;
let compareList = [];

const floorSelect = document.getElementById("floorSelect");
const areaSelect = document.getElementById("areaSelect");



// LOAD DATA

fetch("units.json")

.then(res => res.json())

.then(data => {

project = data[0];

loadFloors();

loadInfo();

});





// LOAD FLOORS

function loadFloors(){

floorSelect.innerHTML =
`
<option>Select Floor</option>
`;

project.floors.forEach(floor=>{


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
`
<option>Select Area</option>
`;



let floor =
project.floors.find(
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







// AREA CHANGE


areaSelect.addEventListener("change",()=>{


let floor =
project.floors.find(
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
selectedUnit.price.toLocaleString()
+" EGP";



document.getElementById("status").innerHTML =
selectedUnit.status;



document.getElementById("payment").innerHTML =
selectedUnit.paymentPlan;




document.getElementById("unitImage").src =
selectedUnit.gallery[0];





let gallery =
document.getElementById("gallery");

gallery.innerHTML="";



selectedUnit.gallery.forEach(img=>{


gallery.innerHTML +=

`

<img src="${img}"
onclick="changeImage('${img}')">

`;

});


}






function changeImage(img){

document.getElementById("unitImage").src=img;

}









// COMPARE


document.getElementById("compareBtn")
.onclick=function(){



if(!selectedUnit){

alert("Select Unit First");

return;

}



if(compareList.length>=3){

alert("Maximum 3 Units");

return;

}



compareList.push(selectedUnit);



showCompare();


};






function showCompare(){


let box =
document.getElementById("compareBox");


box.innerHTML="";



compareList.forEach(unit=>{


box.innerHTML +=

`

<div class="compare-card">

<h4>
${unit.type}
</h4>

<p>
${unit.area}
</p>


<p>
${unit.price.toLocaleString()} EGP
</p>


<p>
${unit.status}
</p>


</div>

`;

});


}









// CALCULATOR


document.getElementById("calculateBtn")
.onclick=function(){



if(!selectedUnit){

alert("Select Unit");

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




document.getElementById("result").innerHTML=

`

Remaining:
${remaining.toLocaleString()} EGP

<br><br>

Installment:
${Math.round(installment).toLocaleString()} EGP

`;



};









// BOOK NOW


document.getElementById("bookBtn")
.onclick=function(){


let box =
document.getElementById("bookingBox");


if(box.style.display==="none"){

box.style.display="block";

}

else{

box.style.display="none";

}


};







// VISA / CASH


document.getElementById("bookingMethod")
.onchange=function(){


let msg =
document.getElementById("bookingMessage");



if(this.value==="Cash"){


msg.innerHTML=

`
⚠️ Cash Reservation

You have 7 days to visit Regency office
and pay 50,000 EGP reservation fees.

`;

}


else{


msg.innerHTML=

`
Visa Payment Selected

`;

}



};








// CONFIRM


document.getElementById("confirmBooking")
.onclick=function(){


let sales =
document.getElementById("salesSelect").value;



let method =
document.getElementById("bookingMethod").value;



if(sales==="Select Sales Representative"){


alert("Select Sales Representative");

return;


}



document.getElementById("bookingMessage").innerHTML=

`

<h4 style="color:#d4af37">

✅ Reservation Completed

</h4>


Sales:
${sales}

<br>

Payment:
${method}

`;



};








// INFO


function loadInfo(){



document.getElementById("companyLocation").innerHTML =
project.companyLocation;



document.getElementById("projectLocation").innerHTML =
project.projectLocation;





project.landmarks.forEach(item=>{


document.getElementById("landmarks").innerHTML +=

`
<li>${item}</li>
`;

});





project.amenities.forEach(item=>{


document.getElementById("amenities").innerHTML +=

`
<li>${item}</li>
`;

});



}
