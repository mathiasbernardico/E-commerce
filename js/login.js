function datos_requeridos(){
   let valores = [...document.getElementsByClassName("form_login_requerido").value];
   for(i=0;i<=valores.length;i++){
    if(valores[i]==""){
        alert("Campos obligatorios sin completar");
    }else{
        window.location.replace('https://mathiasbernardico.github.io/workspace-inicial');
    }
   }
}