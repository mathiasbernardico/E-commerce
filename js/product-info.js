let isContentLoaded = false; // declaro la variable isContetLoaded en falso
document.addEventListener("DOMContentLoaded", function () {
  if (!isContentLoaded) { //compruevo si esta en falso para que no se cargue el contenido
    const idProducto = localStorage.getItem("id_producto") || "";
    const URLProduct = `https://japceibal.github.io/emercado-api/products/${idProducto}.json`;
    const containerInfo = document.getElementById("container-info");

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
      })
      //Retornamos el error por consola
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  isContentLoaded = true;
});
