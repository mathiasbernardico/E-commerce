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

    //Agregar foto de perfil
    const fotoDefault = "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg";
    const foto = document.getElementById("foto");
    const img = document.getElementById("img");
    foto.addEventListener("change", e => {
        if(e.target.files[0]){
            const lector = new FileReader();
            lector.onload = function( e ){
            img.src = e.target.result;   
            }
            lector.readAsDataURL(e.target.files[0])
        }else{
            img.src = fotoDefault;
        }
    });
});


