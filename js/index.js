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

    document.getElementById("menuCart").addEventListener("click", function() {
        window.location = "cart.html"
    });

    document.getElementById("menuProfile").addEventListener("click", function() {
        window.location = "my-profile.html"
    });

    document.getElementById("menuLogout").addEventListener("click", function() {
        window.location = "cart.html"
    });
});