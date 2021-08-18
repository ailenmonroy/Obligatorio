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
    var e = document.getElementById('err');
    if(usuario.value == ''||contra.value == '' ){
        e.style.display = "block";
    }else{
        e.style.display = "none";
        location.replace("file:///C:/Users/Ailen/OneDrive/Desktop/Obligatorio/Workspace%20inicial/index.html");
    }
}



function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
 
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        location.replace("file:///C:/Users/Ailen/OneDrive/Desktop/Obligatorio/Workspace%20inicial/index.html");
      };

