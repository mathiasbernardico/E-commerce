function datos_requeridos(){
      
    usuario = document.getElementById("usuario").value;
    contra  = document.getElementById("contra").value;
    capcha  = document.getElementById("capcha").checked;

  if (usuario == ''||contra == ''||capcha == false) {
    alert('Usuario, contraseña y capcha son obligatorios');
    return false;
  }else if (usuario != ''&&contra != ''&&capcha){
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
  }
  document.addEventListener('click', function(event) {
    if (event.target.id === 'logout') {
      logout();
    }
  });