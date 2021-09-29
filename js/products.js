const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_SOLD = "Cant.";
var currentProdArray = [];
var prodArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;



function sortProds(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.soldCount);
            let bCost = parseInt(b.soldCount);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }

    return result;
}



function showProdList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProdArray.length; i++){
        let prod = currentProdArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(prod.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(prod.cost) <= maxCost))){
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action" >
                <div class="row">
                    <div class="col-3">
                        <img src="` + prod.imgSrc + `" alt="` + prod.name + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ prod.name +`</h4>
                            <small class="text-muted">` + prod.soldCount + ` artículos</small>
                            
                        </div>
                        <p class="text-muted">` + prod.description + ` </p>
                        <p class="text-muted">` + prod.cost +  prod.currency +` </p>
                    
                        

                    </div>
                </div>
            </a>
            `
        }
        
    }
    document.getElementById("list").innerHTML = htmlContentToAppend;
}


function sortAndShowProds(sortCriteria, prodArray){
    currentSortCriteria = sortCriteria;

    if(prodArray != undefined){
        currentProdArray = prodArray;
    }

    currentProdArray= sortProds(currentSortCriteria, currentProdArray);

    showProdList();
}

//Buscador
var prod = [];

getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        prod = resultObj.data;
    }
});


var bus = document.getElementById("searcher");
var lista = document.getElementById("list");
var busqueda = document.getElementById("busqueda");
const searching = ()=>{//función de felcha: pinta en consola lo que el usuario escribe
    
    var texto = bus.value.toLowerCase();
    if(texto !== ''){
        lista.style.display = "none";
        for(let p of prod){
            let n = p.name.toLowerCase();

            if(n.indexOf(texto) !== -1){//indexOf
                busqueda.innerHTML += `
                <div class="list-group-item list-group-item-action">
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + p.imgSrc + `" alt="` + p.name + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ p.name +`</h4>
                                <small class="text-muted">` + p.soldCount + ` artículos</small>
                                
                            </div>
                            <p class="text-muted">` + p.description + ` </p>
                            <p class="text-muted">` + p.cost +  p.currency +` </p>
                        
                            

                        </div>
                    </div>
                </div>
                `
            
            }

        }
        busqueda.style.display = "block";
    }else{
        busqueda.innerHTML = ' ';
        lista.style.display = "block";
    }    
}

bus.addEventListener("keyup",searching);


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
   
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProds(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    
    document.getElementById("sortAs").addEventListener("click", function(){
        sortAndShowProds(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDes").addEventListener("click", function(){
        sortAndShowProds(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowProds(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProdList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por el precio
        //de cada producto.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProdList();
    });
});

