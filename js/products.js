let item = localStorage.getItem("catID");

const URLProducts = `https://japceibal.github.io/emercado-api/cats_products/${item}.json`;

const productList = document.getElementById("container-list");
const busqueda = document.getElementById("busqueda"); //Se genera constante busqueda



function productos(listaDeProductos, textobuscado){
  productList.innerHTML = ""; // Vacía el contenido de productList para volver a generarlo
  for(let producto of listaDeProductos){
    if (//Se evalua que el nombre o la descripcion incluya el texto buscado
    producto.name.toLowerCase().includes(textobuscado) ||
    producto.description.toLowerCase().includes(textobuscado)
    ) {
    let divProductContainer = document.createElement("div");
    divProductContainer.classList.add("car-card");
    productList.appendChild(divProductContainer);
    divProductContainer.innerHTML += `<img src="${producto.image}" alt= "imagen del producto" >`;
    divProductContainer.innerHTML += `<p> ${producto.name} - ${producto.currency} ${producto.cost} 
    <span class="product-value"> ${producto.soldCount} vendidos </span> </p>`;
    divProductContainer.innerHTML += `<p> ${producto.description} </p>`;
  }
 }
 
} 
function clasificacion_products(dato){
  if(dato == '0'){
    alert(product.cost);
  }else if(dato == '1'){
    (productos.cost).sort(function(b, a){return b + a});
  }else if(dato == '2'){
    (productos.soldCount).sort(function(a, b){return a - b});
  }
}



function categoria (categoria){
  let categoryParagraph = document.getElementById("category-paragraph");
  categoryParagraph.innerHTML = `Verás aquí todos los productos de la categoría ${categoria} `;
}

fetch (URLProducts)
.then(response => response.json())
.then(data => {
  categoria(data.catName);
  productos(data.products, "");
}) //se incluyen todos los productos

busqueda.addEventListener("input", function () { //si se utiliza el input
  const textobuscado = busqueda.value.toLowerCase();
  fetch(URLProducts)
  .then ((response) => response.json())
  .then((data)=> {
    categoria(data.catName);
    productos(data.products, textobuscado); //Llama a productos con el termino de busqueda nuevo
  });
});