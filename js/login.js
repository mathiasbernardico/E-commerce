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
});

function datos_requeridos(){
      
    user = document.getElementById("email").value;
    pass  = document.getElementById("contra").value;
    capcha  = document.getElementById("capcha").checked;

  if (user == ''||pass == ''||capcha == false) {
    alert('Email, contraseña y capcha son obligatorios');
    return false;
  }else if (user != ''&&pass != ''&&capcha){
  localStorage.setItem('nav_user', user);
  window.location.replace('https://mathiasbernardico.github.io/workspace-inicial');
  localStorage.setItem('isLoggedIn', 'true');

  }
}

const formulario = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    window.location.href = 'index.html';
});


function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nav_user');
    localStorage.removeItem('items');
    localStorage.setItem('recargada', 'false');
    const login = document.getElementById("login");
    login.textContent = "Login";
  }
  document.addEventListener('click', function(event) {
    if (event.target.id === 'logout') {
      logout();
    }
  });

  const imputs = document.querySelectorAll('#loginForm input');
  const validadFormularios = (e) => {
    switch (e.target.name) {
      case "user":
        if(e.target.value !== ""){
          document.getElementById("email").classList.remove("incorrecto");
        }else{
          document.getElementById("email").classList.add("incorrecto");
        }
      break;
      case "pass":
        if(e.target.value !== ""){
          document.getElementById("contra").classList.remove("incorrecto");
        }else{
          document.getElementById("contra").classList.add("incorrecto");
        }
      break;
      case "capcha":
      break;
    }
  }
  imputs.forEach((imputs) => {
    imputs.addEventListener('keyup', validadFormularios);
    imputs.addEventListener('blur', validadFormularios);
  });