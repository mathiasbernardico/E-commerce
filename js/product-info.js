document.addEventListener("DOMContentLoaded", function () {
  const idProducto = localStorage.getItem("id_producto") || "";
  const URLProduct = `https://japceibal.github.io/emercado-api/products/${idProducto}.json`;
  const URLComentarios = `https://japceibal.github.io/emercado-api/products_comments/${idProducto}.json`;
  const containerInfo = document.getElementById("container-info");
  const divParaComentarios = document.getElementById("comentarios");
  // Funcion para renderizar la info seleccionada en pantalla
  function mostrarInfoProducto(obj) {
    containerInfo.innerHTML += `<h1>${obj.name} </h1>`;
    containerInfo.innerHTML += `<img src="${obj.images[1]}" alt="imagen auto">`;
    const divTexto = document.createElement("div");
    divTexto.classList.add("div-texto");
    divTexto.innerHTML += `<p>Precio ${obj.currency} ${obj.cost}</p>`;
    divTexto.innerHTML += `<p>Categoria ${obj.category}</p>`;
    divTexto.innerHTML += `<p>Vendidos ${obj.soldCount}</p>`;
    containerInfo.appendChild(divTexto);
    containerInfo.innerHTML += `<p>${obj.description}</p>`;
    const divImagenes = document.createElement("div");
    divImagenes.classList.add("div-imagenes");
    divImagenes.innerHTML += `<img src="${obj.images[0]}" alt="imagen auto">`;
    divImagenes.innerHTML += `<img src="${obj.images[2]}" alt="imagen auto">`;
    divImagenes.innerHTML += `<img src="${obj.images[3]}" alt="imagen auto">`;
    containerInfo.appendChild(divImagenes);
  }
  //Hacemos el fetch para acceder a la info del producto segun su ID
  fetch(URLProduct)
    .then((response) => response.json())
    .then((data) => {
      mostrarInfoProducto(data);
      fetch(URLComentarios) //Segundo fetch en el .then del primero para asegurarnos de que siempre haga las solicitudes en este orden
        .then((response) => response.json())
        .then((data) => {
          mostrarComentarios(data);
        });
    })
    //Retornamos el error por consola
    .catch((error) => {
      console.error("Error:", error);
    });

  //Empieza codigo para renderizado de comentarios
  const estrellas = [
    '<span class="fa fa-star"></span>',
    '<span class="fa fa-star"></span>',
    '<span class="fa fa-star"></span>',
    '<span class="fa fa-star"></span>',
    '<span class="fa fa-star"></span>',
  ];
  function rellenarEstrellas(estrellas, calificacion) {
    for (let i = 0; i < estrellas.length; i++) {
      if (i >= calificacion) {
        estrellas[i] = '<span class="fa fa-star"></span>';
      } else {
        estrellas[i] = '<span class="fa fa-star checked"></span>';
      }
    }
    estrellas = estrellas.join(""); //usamos el metodo join para convertir el array en una sola cadena de texto
    return estrellas;
  }
  function mostrarComentarios(lista) {
    const divContenedorComentarios = document.createElement("div");
    divContenedorComentarios.classList.add("contenedor-comentarios");
    const tituloComentarios = document.createElement("h2");
    tituloComentarios.innerText = "Comentarios";
    divContenedorComentarios.appendChild(tituloComentarios);
    for (let comentario of lista) {
      const divComentario = document.createElement("div");
      divComentario.classList.add("div-comentario");
      const usuario = comentario.user;
      const fecha = comentario.dateTime;
      const description = comentario.description;
      const calificacion = rellenarEstrellas(estrellas, comentario.score);
      divComentario.innerHTML += `<p>${usuario} - ${fecha} - ${calificacion}</p>`;
      divComentario.innerHTML += `<p>${description}</p>`;
      divContenedorComentarios.appendChild(divComentario);
    }
    containerInfo.appendChild(divContenedorComentarios);
  }
});
