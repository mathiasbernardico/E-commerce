document.addEventListener("DOMContentLoaded", function () {
  const idProducto = localStorage.getItem("id_producto") || "";
  const URLProduct = `https://japceibal.github.io/emercado-api/products/${idProducto}.json`;
  const URLComentarios = `https://japceibal.github.io/emercado-api/products_comments/${idProducto}.json`;
  const containerInfo = document.getElementById("container-info");
  const btn_enviar_comentario = document.getElementById("enviar_comentario");
  let selectedRating = 1;
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

  //Evento click para agregar el comentario de manera ficticia junto a los otros comentarios



document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-rating'));
        highlightStars(selectedRating);
    });
});

function highlightStars(rating) {
    document.querySelectorAll('.star').forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.style.color = 'gold';
        } else {
            star.style.color = 'black';
        }
    });
}
//Creamos el comentario y lo incertamos localmente
btn_enviar_comentario.addEventListener('click', function() {
    const user = localStorage.getItem('nav_user');
    const description = document.getElementById('comentario').value;
    const f = new Date();
    const fecha = f.toLocaleString();
    const comentarioDiv = `
          <div class="div-comentario nuevo">
          <p>${user} - ${fecha} - ${rellenarEstrellas(estrellas, selectedRating)}</p>
          <p>${description}</p>
          </div>
    `;
    containerInfo.innerHTML += comentarioDiv;
    // Limpiar los campos del formulario después de publicar el comentario
    document.getElementById('comentario').value = '';
    selectedRating = 1;
    highlightStars(selectedRating);

  });
});
