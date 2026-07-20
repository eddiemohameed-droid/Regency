let inventory = [];
let selectedProperty = null;

const floorSelect = document.getElementById("floorSelect");
const areaSelect = document.getElementById("areaSelect");

fetch("units.json")
.then(res => res.json())
.then(data => {

    inventory = data;

    loadFloors();

});

function loadFloors(){

    floorSelect.innerHTML =
    '<option value="">Select Floor</option>';

    inventory.forEach(item=>{

        floorSelect.innerHTML +=
        `<option value="${item.floor}">
            ${item.floor}
        </option>`;

    });

}



floorSelect.addEventListener("change",()=>{

    areaSelect.innerHTML =
    '<option value="">Select Area</option>';

    clearData();

    let floor =
    inventory.find(x=>x.floor===floorSelect.value);

    if(!floor) return;

    floor.areas.forEach(area=>{

        areaSelect.innerHTML +=
        `<option value="${area.area}">
            ${area.area}
        </option>`;

    });

});





areaSelect.addEventListener("change",()=>{

    let floor =
    inventory.find(x=>x.floor===floorSelect.value);

    if(!floor) return;

    selectedProperty =
    floor.areas.find(x=>x.area===areaSelect.value);

    if(!selectedProperty) return;

    document.getElementById("unitName").innerHTML =
    selectedProperty.type;

    document.getElementById("area").innerHTML =
    selectedProperty.area;

    document.getElementById("price").innerHTML =
    selectedProperty.price.toLocaleString()+" EGP";

    document.getElementById("status").innerHTML =
    selectedProperty.status;

    document.getElementById("payment").innerHTML =
    selectedProperty.payment;

    document.getElementById("unitImage").src =
    selectedProperty.image;

});





document.getElementById("calculateBtn")
.addEventListener("click",()=>{

    if(selectedProperty==null){

        alert("Please Select Area");

        return;

    }

    let down =
    Number(document.getElementById("downPayment").value);

    let years =
    Number(document.getElementById("years").value);

    let paymentType =
    Number(document.getElementById("paymentType").value);

    let remaining =
    selectedProperty.price-down;

    let installments =
    years*paymentType;

    let amount =
    remaining/installments;

    let title="";

    if(paymentType==12){

        title="Monthly";

    }

    else if(paymentType==4){

        title="Quarterly";

    }

    else{

        title="Yearly";

    }

    document.getElementById("result").innerHTML=

    `
    Remaining :
    ${remaining.toLocaleString()} EGP
    <br><br>

    ${title} Installment :

    <span style="color:#198754">

    ${Math.round(amount).toLocaleString()} EGP

    </span>
    `;

});





function clearData(){

document.getElementById("unitName").innerHTML="Select Area";

document.getElementById("area").innerHTML="";

document.getElementById("price").innerHTML="";

document.getElementById("status").innerHTML="";

document.getElementById("payment").innerHTML="";

document.getElementById("unitImage").src="";

document.getElementById("result").innerHTML="";

}
