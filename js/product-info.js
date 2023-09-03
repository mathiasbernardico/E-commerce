document.addEventListener('DOMContentLoaded', function() {

const idProducto = localStorage.getItem('id_producto');
const ID = localStorage.getItem("catID");
const URLProducts = `https://japceibal.github.io/emercado-api/cats_products/${ID}.json`;
const productList = document.getElementById("container-list");

fetch(URLProducts)
.then((response) => response.json())
.then((data) => {
  const listaDeProductos = [...data.products];
  for (let i=0; listaDeProductos.length > i; i++ ) {
    if (listaDeProductos[i].id==idProducto){
      console.log("entro");
  const miProducto = listaDeProductos[i];
  const divProductContainer = `
  <div class="car-card">
  <img src="${miProducto.image}" alt= "imagen del producto" >
  <p> ${miProducto.name} - ${miProducto.currency} ${miProducto.cost} <span class="product-value"> ${miProducto.soldCount} vendidos </span> </p>
  <p> ${miProducto.description} </p>
  </div>
  `;
  productList.innerHTML = divProductContainer;
}else {
  console.log("se fue");
}
}
});
});