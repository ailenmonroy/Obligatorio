
const obj = {name:"",age:"",em:"",tel:""};
const info = JSON.stringify(obj);
perfil = window.localStorage;

if(!perfil.getItem('datos')){
    perfil.setItem('datos',info);
}


function modificar(){
    var bM = document.getElementById("modPerf");
    var bG = document.getElementById("guPerf");
    var nombre = document.getElementById("nom");
    var edad = document.getElementById("edad");
    var ema = document.getElementById("ema");
    var tel = document.getElementById("tel");

    bG.style.display = "block";
    bM.style.display = "none";

    nombre.removeAttribute("disabled");
    edad.removeAttribute("disabled");
    ema.removeAttribute("disabled");
    tel.removeAttribute("disabled");

}



function guardar(){
    var bM = document.getElementById("modPerf");
    var bG = document.getElementById("guPerf");
    var nombre = document.getElementById("nom");
    var edad = document.getElementById("edad");
    var ema = document.getElementById("ema");
    var tel = document.getElementById("tel");

    bG.style.display = "none";
    bM.style.display = "block";


    var da = perfil.getItem('datos');
    var datitos = JSON.parse(da);
    datitos.name = nombre.value;
    datitos.age = edad.value;
    datitos.em = ema.value;
    datitos.tel = tel.value;
    var d = JSON.stringify(datitos);
    perfil.setItem('datos',d);

    nombre.setAttribute("disabled",true);
    edad.setAttribute("disabled",true);
    ema.setAttribute("disabled",true);
    tel.setAttribute("disabled",true);
    
    errorDatos('nom','nome');
    errorDatos('edad','edade');
    errorDatos('ema','emae');
    errorDatos('tel','tele');
    
}

function errorDatos(id,mensaje){
    var i = document.getElementById(id);
    var men = document.getElementById(mensaje);
    if(i.value == ""){
        i.classList.add("error");
        men.style.display = "block";
    }else{
        i.classList.remove("error");
        men.style.display = "none";     
    }
}

document.getElementById("guPerf").addEventListener("click",guardar);
document.getElementById("modPerf").addEventListener("click",modificar);

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var l = perfil.getItem('datos');
    var d = JSON.parse(l);
    document.getElementById("nom").value = d.name;
    document.getElementById("edad").value = d.age;
    document.getElementById("ema").value = d.em;
    document.getElementById("tel").value = d.tel;
    
});