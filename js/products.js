const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_SOLD = "Cant.";
var currentProdArray = [];
var prodArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;



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

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
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
        </div>
        `

        document.getElementById("list").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProds(sortCriteria, prodArray){
    currentSortCriteria = sortCriteria;

    if(prodArray != undefined){
        currentProdArray = prodArray;
    }

    currentProdArray= sortProds(currentSortCriteria, currentProdArray);

    //Muestro las categorías ordenadas
    showProdList();
}

function searching(){
    var busca = document.getElementById('searcher');
    var filtro = busca.value;
    var lista = document.getElementById('list');
    var arreglo = lista.getElementsByClassName("a");

    console.log(filtro);
    for( i = 0;i<arreglo.length;i++ ){
       let prod = arreglo[i].getElementsByClassName('mb-1');
        let n = prod[0].innerHTML;
        let d = prod[1].innerHTML;
        console.log(arreglo[i]);
        if( (n.toUpperCase().indexOf(filtro.toUpperCase())>-1) || (d.toUpperCase().indexOf(filtro.toUpperCase()) > -1)){
            arreglo[i].style.display = "block";
        }else{
            arreglo[i].style.display = "none";
        }

    }

}

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

        minCount = undefined;
        maxCount = undefined;

        showProdList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProdList();
    });
});

