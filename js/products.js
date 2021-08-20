const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProdArray = [];
var prodArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;



function showProdList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let prod = array[i];

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

 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
   
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProdList(prodArray);
        }
    });


});

