document.addEventListener("DOMContentLoaded", function(){
  const modeBtn = document.getElementById("mode-btn");
  const content = document.getElementById("content");


  // Verifica si el usuario ya ha establecido una preferencia de modo
  const currentMode = localStorage.getItem("mode");
  
  // Si no hay una preferencia previa, usa el "Modo Día" por defecto
  if (!currentMode || currentMode === "day-mode") {
    content.classList.add("day-mode");
  } else {
      // Si hay una preferencia previa, aplica el modo correspondiente
      content.classList.add("night-mode");
  }
  
  // Agrega un evento de clic al botón para cambiar el modo
  modeBtn.addEventListener("click", function () {
      if (content.classList.contains("day-mode")) {
        content.classList.remove("day-mode");
        content.classList.add("night-mode");
          localStorage.setItem("mode", "night-mode");
      } else {
        content.classList.remove("night-mode");
        content.classList.add("day-mode");
          localStorage.setItem("mode", "day-mode");
      }
  });
});

function required_data(){
      
    user = document.getElementById("email").value;
    pass  = document.getElementById("password").value;
    captcha  = document.getElementById("captcha").checked;

  if (user == ''||pass == ''||captcha == false) {
    alert('Email, contraseña y captcha son obligatorios');
    return false;
  }else if (user != ''&&pass != ''&&captcha){
  localStorage.setItem('nav_user', user);
  window.location.replace('https://mathiasbernardico.github.io/workspace-inicial');
  localStorage.setItem('isLoggedIn', 'true');

  }
}

const form = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    window.location.href = 'index.html';
});


function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nav_user');
    localStorage.removeItem('items');
    localStorage.setItem('reloaded', 'false');
    const login = document.getElementById("login");
    login.textContent = "Login";
  }
  document.addEventListener('click', function(event) {
    if (event.target.id === 'logout') {
      logout();
    }
  });

  const imputs = document.querySelectorAll('#loginForm input');
  const formValidation = (e) => {
    switch (e.target.name) {
      case "user":
        if(e.target.value !== ""){
          document.getElementById("email").classList.remove("incorrect");
        }else{
          document.getElementById("email").classList.add("incorrect");
        }
      break;
      case "pass":
        if(e.target.value !== ""){
          document.getElementById("password").classList.remove("incorrect");
        }else{
          document.getElementById("password").classList.add("incorrect");
        }
      break;
      case "captcha":
      break;
    }
  }
  imputs.forEach((imputs) => {
    imputs.addEventListener('keyup', formValidation);
    imputs.addEventListener('blur', formValidation);
  });