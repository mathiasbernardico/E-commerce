document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
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
});