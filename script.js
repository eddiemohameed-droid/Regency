let data = null;
let selectedUnit = null;



const areaSelect = document.getElementById("areaSelect");
const floorSelect = document.getElementById("floorSelect");



// LOAD JSON

fetch("units.json")

.then(res=>res.json())

.then(result=>{

data=result[0];

loadAreas();

loadInfo();

});





// LOAD AREAS

function loadAreas(){


areaSelect.innerHTML=
`
<option>Select Area</option>
`;


data.areas.forEach(area=>{


areaSelect.innerHTML +=

`
<option value="${area.name}">
${area.name}
</option>

`;

});


}






// AREA SELECT


areaSelect.addEventListener("change",()=>{


floorSelect.innerHTML=
`
<option>Select Floor</option>
`;


let area =
data.areas.find(
x=>x.name===areaSelect.value
);



if(!area)return;



area.units.forEach(unit=>{


floorSelect.innerHTML +=

`
<option value="${unit.id}">
${unit.floor}
</option>

`;


});


});







// FLOOR SELECT


floorSelect.addEventListener("change",()=>{


let area =
data.areas.find(
x=>x.name===areaSelect.value
);



selectedUnit =
area.units.find(
x=>x.id===floorSelect.value
);



showDetails();


});







function showDetails(){


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









// BOOK NOW


document.getElementById("bookBtn")
.onclick=function(){


if(!selectedUnit){

alert("Please select area and floor first");

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




document.getElementById("bookingResult").innerHTML=


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









// CALCULATOR BUTTON


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



let type =
Number(
document.getElementById("paymentType").value
);



let remaining =
selectedUnit.price-down;



let installment =
remaining/(10*type);




document.getElementById("calculatorResult").innerHTML=

`

Remaining:
${remaining.toLocaleString()} EGP

<br><br>

Installment:
${Math.round(installment).toLocaleString()} EGP

`;



};








// PROJECT INFO


function loadInfo(){


document.getElementById("companyLocation").innerHTML =
data.companyLocation;


document.getElementById("projectLocation").innerHTML =
data.projectLocation;




data.landmarks.forEach(x=>{


document.getElementById("landmarks").innerHTML +=

`
<li>${x}</li>
`;

});




data.amenities.forEach(x=>{


document.getElementById("amenities").innerHTML +=

`
<li>${x}</li>
`;

});


}
