var cartInfoD = [];
var sub = 0;
var total = 0;

function showCartInfo(cartInfo){
    let inner = "";
    for(let i = 0; i < cartInfo.length; i++){
        let art = cartInfo[i];
        inner += `<div class="cart_item_image"><img src="` + art.src + `" alt="` + art.name + `" class="imageCart"></div>
        <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
            <div class="cart_item_name cart_info_col">
            <div class="cart_item_title">Nombre</div>
                <div class="cart_item_text">` + art.name + `</div>
            </div>
            <div class="cart_item_quantity cart_info_col">
                <div class="cart_item_title">Cantidad</div>
                <div class="cart_item_text"> <input  class="inpCant" type="number" id="canti" name="canti" value= ` + art.count + ` onchange= "Calcularsub();"></div>
            </div>
            <div class="cart_item_price cart_info_col">
                <div class="cart_item_title">Precio por unidad</div>
                <div class="cart_item_text">` + art.unitCost +  ` `+ art.currency + `</div>
            </div>
            <div class="cart_item_total cart_info_col">
                <div class="cart_item_title">Total</div>
                <div class="cart_item_text" id="subA">` + art.unitCost * art.count +` `+ art.currency + `</div>
            </div>
        </div>`

        let subArt = art.unitCost*art.count;
        document.getElementById("subtotal").innerHTML = "Subtotal: " + subArt + " "+ art.currency;
        let total = subArt + (subArt*22)/100;
        document.getElementById("total").innerHTML = "Total: " + total +  " "+art.currency;
        }

        document.getElementById("articlesList").innerHTML += inner;
        var cant = document.getElementById("cantArts");
        cant.innerHTML = "(" + cartInfo.length + "" + cant.innerHTML;
    
}

function Calcularsub(){
    var cant = document.getElementById("canti").value;
    let unit = cartInfoD.articles[0].unitCost;
    let subArt = unit*cant;
    document.getElementById("subA").innerHTML = subArt + " "+cartInfoD.articles[0].currency;
    document.getElementById("subtotal").innerHTML = "Subtotal: " + subArt + " "+ cartInfoD.articles[0].currency;
    let total = subArt + (subArt*22)/100;
    document.getElementById("total").innerHTML = "Total: " + total +  cartInfoD.articles[0].currency;
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartInfoD = resultObj.data;
            showCartInfo(cartInfoD.articles);
        }
    });
    
    


});