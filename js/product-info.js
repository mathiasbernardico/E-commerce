document.addEventListener('DOMContentLoaded', function() {

//Variables locales
const idProducto = localStorage.getItem('id_producto');
const ID = localStorage.getItem("catID");
const URLProducts = `https://japceibal.github.io/emercado-api/cats_products/${ID}.json`;
const productList = document.getElementById("container-list");

//Hacemos el fetch para acceder a los productos segun su ID
fetch(URLProducts)
.then((response) => response.json())
.then((data) => {
  const listaDeProductos = [...data.products]; //Creamos una constante la cual contiene un array con todos los datos obtenidos (productos)
  for (let i=0; listaDeProductos.length > i; i++ ) { //Recorremos el array con un for
    if (listaDeProductos[i].id==idProducto){ //Buscamos la coincidencia en el array con la id del producto anteriormente almacenada en localStorage
  const miProducto = listaDeProductos[i]; //Guardamos ese producto 
  
  //Creamos toda la estructura con los datos obtenidos para mostrarlos en el html
  const divProductContainer = ` 
  <div class="car-card">
  <img src="${miProducto.image}" alt= "imagen del producto" >
  <p> ${miProducto.name} - ${miProducto.currency} ${miProducto.cost} <span class="product-value"> ${miProducto.soldCount} vendidos </span> </p>
  <p> ${miProducto.description} </p>
  </div>
  `; 
  //Añadimos la estructura y el contenido al contenedor de lista de productos en el html
  productList.innerHTML = divProductContainer;
}}})

//Retornamos el error por consola
.catch(error => {
  console.error('Error:', error);
});
});