document.addEventListener("DOMContentLoaded", function(){
    const modoBtn = document.getElementById("modo-btn");
    const contenido = document.getElementById("contenido");
    
    // Verifica si el usuario ya ha establecido una preferencia de modo
    const modoActual = localStorage.getItem("modo");
    
    // Si no hay una preferencia previa, usa el "Modo Día" por defecto
    if (!modoActual || modoActual === "modo-dia") {
        contenido.classList.add("modo-dia");
    } else {
        // Si hay una preferencia previa, aplica el modo correspondiente
        contenido.classList.add("modo-noche");
    }
    
    // Agrega un evento de clic al botón para cambiar el modo
    modoBtn.addEventListener("click", function () {
        if (contenido.classList.contains("modo-dia")) {
            contenido.classList.remove("modo-dia");
            contenido.classList.add("modo-noche");
            localStorage.setItem("modo", "modo-noche");
        } else {
            contenido.classList.remove("modo-noche");
            contenido.classList.add("modo-dia");
            localStorage.setItem("modo", "modo-dia");
        }
    });

    const emailInput = document.getElementById("email-myprofile")
    const loggedEmail = localStorage.getItem("nav_user")
    emailInput.value = loggedEmail
    //Agregar foto de perfil
    const fotoDefault = localStorage.getItem("imagenSubida") ||
    "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg";
    const img = document.getElementById("img");
    const foto = document.getElementById("foto");
    img.src = fotoDefault
    foto.addEventListener("change", e => {
        if(e.target.files[0]){
            const lector = new FileReader();
            lector.onload = function( e ){
            img.src = e.target.result;
            localStorage.setItem("imagenSubida", e.target.result);
            }
            lector.readAsDataURL(e.target.files[0])
        }else{
            img.src = fotoDefault;
        }
    });
});


