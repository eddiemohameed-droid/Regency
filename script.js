let inventory = [];
let selectedProperty = null;

const floorSelect = document.getElementById("floorSelect");
const areaSelect = document.getElementById("areaSelect");

fetch("units.json")
.then(response => response.json())
.then(data => {

    inventory = data;

    loadFloors();

});

function loadFloors(){

    floorSelect.innerHTML =
    `<option value="">Select Floor</option>`;

    inventory.forEach(item=>{

        floorSelect.innerHTML +=
        `<option value="${item.floor}">
            ${item.floor}
        </option>`;

    });

}

floorSelect.addEventListener("change",()=>{

    areaSelect.innerHTML =
    `<option value="">Select Area</option>`;

    clearData();

    const floor =
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

    const floor =
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
    selectedProperty.price.toLocaleString() + " EGP";

    const status =
    document.getElementById("status");

    status.innerHTML =
    selectedProperty.status;

    status.className = "";

    if(selectedProperty.status==="Available"){

        status.classList.add("available");

    }

    else if(selectedProperty.status==="Reserved"){

        status.classList.add("reserved");

    }

    else{

        status.classList.add("sold");

    }

    document.getElementById("payment").innerHTML =
    selectedProperty.payment;

    document.getElementById("unitImage").src =
    selectedProperty.image;

});

document.getElementById("calculateBtn")
.addEventListener("click",()=>{

    if(!selectedProperty){

        alert("Please select an area.");

        return;

    }

    const down =
    Number(document.getElementById("downPayment").value);

    if(down > selectedProperty.price){

        alert("Down Payment can't be greater than Property Price.");

        return;

    }

    const years =
    Number(document.getElementById("years").value);

    const paymentType =
    Number(document.getElementById("paymentType").value);

    const remaining =
    selectedProperty.price - down;

    const installment =
    remaining / (years * paymentType);

    let title = "";

    if(paymentType===12){

        title="Monthly";

    }

    else if(paymentType===4){

        title="Quarterly";

    }

    else{

        title="Yearly";

    }

    document.getElementById("result").innerHTML =

    `
    <div class="row text-center">

        <div class="col-md-6">

            <h5>Remaining</h5>

            <h3 style="color:#0d6efd;">
            ${remaining.toLocaleString()} EGP
            </h3>

        </div>

        <div class="col-md-6">

            <h5>${title} Installment</h5>

            <h3 style="color:#198754;">
            ${Math.round(installment).toLocaleString()} EGP
            </h3>

        </div>

    </div>
    `;

});

function clearData(){

    selectedProperty = null;

    document.getElementById("unitName").innerHTML =
    "Select Area";

    document.getElementById("area").innerHTML = "";

    document.getElementById("price").innerHTML = "";

    document.getElementById("status").innerHTML = "";

    document.getElementById("payment").innerHTML = "";

    document.getElementById("unitImage").src = "";

    document.getElementById("result").innerHTML =
    "Select Area First";

}
