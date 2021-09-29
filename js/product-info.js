var infoProd = {};

function showImagesGallery(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img  class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function meses(a,b){
    let dateA = new Date(a.dateTime);
    let dateB = new Date(b.dateTime);
    if(dateA.getMonth()+1 > dateB.getMonth()+1){return -1;}
    if(dateA.getMonth()+1 < dateB.getMonth()+1){return 1;}
    return 0;
}
function showComments(comArray){
    comArray = comArray.sort(meses); 
    let inner = "";
    for(let i = 0; i < comArray.length;i++){
        let com = comArray[i];
        let starsOn = `<span class="fa fa-star checked"></span>`;
        let starsOff = `<span class="fa fa-star"></span>`;
        let score = starsOn.repeat(com.score);
        let noScore = starsOff.repeat(5-com.score);

        inner += `<a class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <dt>` + com.user + `</dt>
                <p class="mb-1">` + com.description + `</p>
                <p>` + score + `` + noScore + `</p>
            </div>
            <small class="mb-6 text-muted">` + com.dateTime + `</small>
        </div>
        </div>
    </a>`

    }
    document.getElementById("comments").innerHTML = inner;
}

function comentar() {
    let inner = "";
    var u = document.getElementById("user");
    var c = document.getElementById("comm");
    var e = document.getElementById("error");
    var uScore = document.getElementsByClassName("check").length;
    let starsOn = `<span class="fa fa-star checked"></span>`
    let starsOff = `<span class="fa fa-star"></span>`
    let score = starsOn.repeat(uScore);
    let scoreNo = starsOff.repeat(5 - uScore);
    var fecha = new Date();
    var date = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay() + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();

    if (u.value !== "" && c.value !== "" && uScore !== 0) {
        inner += `
        <a class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <dt>` + u.value + `</dt>
                    <p class="mb-1">` + c.value + `</p>
                    <p>` + score + `` + scoreNo + `</p>
                </div>
                <small class="mb-6 text-muted">` + date + `</small>
            </div>
            </div>
        </a>`
        var esp = document.getElementById("comments");
        esp.innerHTML = inner +  esp.innerHTML;
        u.classList.remove("error");
        c.classList.remove("error");
        e.style = "display: none";
    } else {
        u.classList.add("error");
        c.classList.add("error");
        e.style = "display: block";
    }
}


$(".clasification").find("input").change(function() {
    var valor = $(this).val()
    $(".clasification").find("input").removeClass("check")
    $(".clasification").find("input").each(function(index) {
        if (index + 1 <= valor) {
            $(this).addClass("check")
        }
    })
})

$(".clasification").find("label").mouseover(function() {
    var valor = $(this).prev("input").val()
    $(".clasification").find("input").removeClass("check")
    $(".clasification").find("input").each(function(index) {
        if (index + 1 <= valor) {
            $(this).addClass("check")
        }
    })
})


var prodArray = [];
getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        prodArray = resultObj.data;
    }
});


//Productos relacionados
function showRelProds(array){
    let inner = "";
    for(let i = 0;i < array.length;i++){
        inner += `    
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <a href = "product-info.html">
                    <img  class="img-fluid img-thumbnail" src="` + prodArray[array[i]].imgSrc + `" alt="">
                </a>
                <dt>`+prodArray[array[i]].name+`</dt><br>
            </div>
        </div>
        
        `
    } 
    var prodR = document.getElementById("prodsRel");
    prodR.innerHTML = inner;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoProd = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productPriceHTML = document.getElementById("price");
            let productCategoryHTML = document.getElementById("category");
            let productSoldCountHTML = document.getElementById("productSoldCount");

        
            productNameHTML.innerHTML = infoProd.name;
            productDescriptionHTML.innerHTML = infoProd.description;
            productPriceHTML.innerHTML = infoProd.cost + infoProd.currency;
            productCategoryHTML.innerHTML = `<a href= "category-info.html">` + infoProd.category + `</a>`;
            productSoldCountHTML.innerHTML = infoProd.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(infoProd.images);
            showRelProds(infoProd.relatedProducts);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showComments(resultObj.data);
        }
    });

    
});