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
    }else{//me loguea
        sessionStorage.setItem('log',true);
        e.style.display = "none";
        location.replace("index.html");
        
    }
    
}

function onSignIn(googleUser) {     
    var profile = googleUser.getBasicProfile();     
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.     
    console.log('Name: ' + profile.getName());     
    console.log('Image URL: ' + profile.getImageUrl());     
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.     
    var id_token = googleUser.getAuthResponse().id_token;     
    console.log(id_token);     
    localStorage.setItem("usuario", profile.getEmail()); //setItem almacena el dato en la posición "usuario"     
    sessionStorage.setItem("usuario", profile.getEmail()); 
    sessionStorage.setItem('log',true);
};  

    function signOut() {     
        var auth2 = gapi.auth2.getAuthInstance();     
        localStorage.clear();     
        sessionStorage.clear();     
        auth2.signOut().then(function() {         
            console.log('User signed out.');         
            location.href = "login.html";      
        }); 
    };




