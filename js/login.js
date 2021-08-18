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


function redirigir(){
    var usuario = document.getElementById('user');
    var contra = document.getElementById('password');
    if(usuario.value == ''||contra.value == '' ){
        var e = document.getElementById('err');
        e.style.display = "block";
    }else{
        e.style.display = "none";
        location.replace("file:///C:/Users/Ailen/OneDrive/Desktop/Obligatorio/Workspace%20inicial/index.html");
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }