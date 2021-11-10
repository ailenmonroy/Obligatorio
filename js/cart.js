var cartInfoD = [];
var sub = 0;
var total = 0;


function costEnvTot(){
    var costo = document.getElementById("costoEn");
    var cost = document.getElementById("costoT");
    var c = document.getElementById("canti").value;
    let sub = cartInfoD.articles[0].unitCost*c;
    let total = sub + (sub*22)/100;
    let envio = 0;
    let ct = 0;
    var tipo = document.getElementById("tipoEnv").value;
    var costoE = document.getElementById("costoEnv");
    var costoT = document.getElementById("costoTotal");
    if(tipo == ""){
        costoE.style.display = "none";
        costoT.style.display = "none";
        costo.style.display = "none";
        cost.style.display = "none";
    }else{
        if(tipo == "prem"){
            envio = (sub*15)/100; 
        }else{
            if(tipo == "exp"){
                envio = (sub*7)/100;
            }else{
                if(tipo == "est")
                    envio = (sub*5)/100;
            }
        }
        ct = total + envio;
        costoE.innerHTML = envio + " " + cartInfoD.articles[0].currency;
        costoT.innerHTML = ct + " " + cartInfoD.articles[0].currency;
        costoE.style.display = "block";
        costoT.style.display = "block";
        costo.style.display = "block";
        cost.style.display = "block";
    }

    
}
    
    


function showCartInfo(cartInfo){
    let inner = "";
    for(let i = 0; i < cartInfo.length; i++){
        let art = cartInfo[i];
        inner += `<li class="cart_item clearfix">
        <div class="cart_item_image"><img src="` + art.src + `" alt="` + art.name + `" class="imageCart"></div>
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
            </div>
            </li>`

        let subArt = art.unitCost*art.count;
        document.getElementById("subtotal").innerHTML = "Subtotal: " + subArt + " "+ art.currency;
        let total = subArt + (subArt*22)/100;
        document.getElementById("total").innerHTML = "Total: " + total +  " "+art.currency;
    }

        document.getElementById("articlesList").innerHTML += inner;
        var cant = document.getElementById("cantArts");
        cant.innerHTML = "(" + cartInfo.length + "" + cant.innerHTML;
        costEnvTot(); 
}

function Calcularsub(){
    var cant = document.getElementById("canti").value;
    let unit = cartInfoD.articles[0].unitCost;
    let subArt = unit*cant;
    let total = subArt + (subArt*22)/100;

    document.getElementById("subA").innerHTML = subArt + " "+cartInfoD.articles[0].currency;
    document.getElementById("subtotal").innerHTML = "Subtotal: " + subArt + " "+ cartInfoD.articles[0].currency;
    
    document.getElementById("total").innerHTML = "Total: " + total +  cartInfoD.articles[0].currency;
    costEnvTot();
}

function error(id,idMen){
    var campo = document.getElementById(id);
    var error = document.getElementById(idMen);

    if(campo.value == ""){
        campo.classList.add("error");
        error.style.display = "block";
    }else{
        campo.classList.remove("error");
        error.style.display = "none";    
    }
}


function errorPago(mod){
    if(mod == 'credito'){
        var nombre = document.getElementById("nomC");
        var dni = document.getElementById("dni");
        var numt = document.getElementById("numT");
        var nums = document.getElementById("numS");
        var fe = document.getElementById("fec");
        var er = document.getElementById("e1");
        if(((((nombre.value==""||dni.value=="")||numt.value=="")||nums.value=="")||fe.value=="")){
            nombre.classList.add("error");
            dni.classList.add("error");
            numt.classList.add("error");
            nums.classList.add("error");
            fe.classList.add("error");
            er.style.display = "block";
        }else{
            nombre.classList.remove("error");
            dni.classList.remove("error");
            numt.classList.remove("error");
            nums.classList.remove("error");
            fe.classList.remove("error");
            er.style.display = "none";
        }





    }else if(mod == 'banco'){//banco
        var nomb = document.getElementById("nomB");
        var dn = document.getElementById("dnib");
        var numc = document.getElementById("numC");
        var co = document.getElementById("cont");
        var err = document.getElementById("e2");
        if(((((nomb.value==""||dn.value=="")||numt.value=="")||nums.value=="")||fe.value=="")){
            nomb.classList.add("error");
            dn.classList.add("error");
            numc.classList.add("error");
            co.classList.add("error");
            err.style.display = "block";
        }else{
            nomb.classList.remove("error");
            dn.classList.remove("error");
            numc.classList.add("error");
            co.classList.add("error");
            err.style.display = "none";
        }


    }
}

function abrirModal(){
    var v = document.getElementById("metodo");
    if(v.value == "cred"){
        $("#credito").modal();
    }else if(v.value == "transf"){
        $("#banco").modal();
    }
}

var ex = false;
var mensaje = "";

getJSONData(CART_BUY_URL).then(function(result){
    if (result.status === "ok"){
        mensaje = result.data.msg;
    }
}); 


function mostrarExito(){
    var d = document.getElementById("exito");

    if(ex){
        d.innerHTML = mensaje;
        $("#exitoModal").modal();
    }else{
        d.innerHTML = "";
    }
}


function errorCompra(){
    var nom = document.getElementById("nom");
    var pais = document.getElementById("pais");
    var dir = document.getElementById("direccion");
    var tel = document.getElementById("contact");
    var env = document.getElementById("tipoEnv");
    var pago = document.getElementById("metodo");
    var e = document.getElementById("errorG");
    if(((((nom.value==""||pais.value=="")||dir.value=="")||tel.value=="")||env.value=="")||pago.value ==""){
        nom.classList.add("error");
        pais.classList.add("error");
        dir.classList.add("error");
        tel.classList.add("error");
        env.classList.add("error");
        pago.classList.add("error");
        e.style.display = "block";
        ex = false;
    }else{
        nom.classList.remove("error");
        pais.classList.remove("error");
        dir.classList.remove("error");
        tel.classList.remove("error");
        env.classList.remove("error");
        pago.classList.remove("error");
        e.style.display = "none";
        ex = true;
    }
    mostrarExito();
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