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

    // Funcion que guarda los datos del perfil ingresados
    function saveProfileData(){
        const nameProfile = document.getElementById("nombre-myprofile").value
        const secondNameProfile = document.getElementById("segundoNombre-myprofile").value
        const surnameProfile = document.getElementById("apellido-myprofile").value
        const secondSurnameProfile = document.getElementById("segundoApellido-myprofile").value
        const phoneProfile = document.getElementById("telefono-myprofile").value
        const emailProfile = document.getElementById("email-myprofile").value
        const infoProfile = {
            name: nameProfile,
            secondName: secondNameProfile,
            surname: surnameProfile,
            secondSurname:secondSurnameProfile,
            phone: phoneProfile
        }
        if(nameProfile && surnameProfile && emailProfile){
            localStorage.setItem("infoProfile", JSON.stringify(infoProfile))
            alert("Su informacion se guardo correctamente, usted Sabpe")
        }else {
            alert("Por favor completa los campos requeridos")
        }
    }
    const userProfileForm = document.getElementById("userProfileForm")
        // Aca hacemos uso de la funcion saveProfileData cuando se envia el formulario
    userProfileForm.addEventListener("submit", function (e){
        e.preventDefault()
        saveProfileData()
    })
    // Aca se rellenamos el input email con el email que se loggeo el usuario previamente
    const emailInput = document.getElementById("email-myprofile")
    const loggedEmail = localStorage.getItem("nav_user")
    emailInput.value = loggedEmail
    // Creamos funcion para rellenar los campos en caso que exista la data en el localStorage
    function rellenarInfoFromLocalStorage() {
        const nameProfile = document.getElementById("nombre-myprofile")
        const secondNameProfile = document.getElementById("segundoNombre-myprofile")
        const surnameProfile = document.getElementById("apellido-myprofile")
        const secondSurnameProfile = document.getElementById("segundoApellido-myprofile")
        const phoneProfile = document.getElementById("telefono-myprofile")
        // obtengo la info en formato json
        const infoFromLocalStorageJson = localStorage.getItem("infoProfile")
        // la convierto usando JSON.parse a un objeto nuevamente
        const infoFromLocalStorage = JSON.parse(infoFromLocalStorageJson)
        console.log(infoFromLocalStorage)
        if(infoFromLocalStorage){
            nameProfile.value = infoFromLocalStorage.name
            secondNameProfile.value = infoFromLocalStorage.secondName
            surnameProfile.value = infoFromLocalStorage.surname
            secondSurnameProfile.value = infoFromLocalStorage.secondSurname
            phoneProfile.value = infoFromLocalStorage.phone
        }
    }
    // Llamamos la funcion 
    rellenarInfoFromLocalStorage()

    //Agregar foto de perfil
    const fotoDefault = localStorage.getItem("imagenSubida") ||
    "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg";
    const img = document.getElementById("img-profile");
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


