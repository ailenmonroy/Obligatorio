//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});



function cargarErroresLog(id,idmen) {
    var elem = document.getElementById(id);
    var e = document.getElementById(idmen);
   
    if(elem.value == ''){

        if(e.id == 'us'){
            e.innerHTML = "Username required."
            
        }else{
            e.innerHTML = "Password required.";
        }
        e.style.display = "block";
        elem.classList.add("error");    
    
        
    }else{
        e.style.display = "none";
        elem.classList.remove("error");
    }
}





//funcion que al loguearse 
function redirigir(){
    var usuario = document.getElementById('user');
    var contra = document.getElementById('password');
    var e = document.getElementById('err');
    if(usuario.value == ''||contra.value == '' ){
        e.style.display = "block";
    }else{
        sessionStorage.setItem('log',true);
        e.style.display = "none";
        location.replace("index.html");
        
    }
    
}

