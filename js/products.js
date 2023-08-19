
const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

const productList = document.getElementById("container-list");
const busqueda = document.getElementById("busqueda"); //Se genera constante busqueda

function autos(listaDeAutos, textobuscado){
  productList.innerHTML = ""; // Vacía el contenido de productList para volver a generarlo
  for(let auto of listaDeAutos){
    if (//Se evalua que el nombre o la descripcion incluya ek texto buscado
    auto.name.toLowerCase().includes(textobuscado) ||
    auto.description.toLowerCase().includes(textobuscado)
    ) {
    let divProductContainer = document.createElement("div");
    divProductContainer.classList.add("car-card");
    productList.appendChild(divProductContainer);
    divProductContainer.innerHTML += `<img src="${auto.image}" alt= "imagen del producto" >`;
    divProductContainer.innerHTML += `<p> ${auto.name} - ${auto.currency} ${auto.cost} 
    <span class="product-value"> ${auto.soldCount} vendidos </span> </p>`;
    divProductContainer.innerHTML += `<p> ${auto.description} </p>`;
  }
 }
} 



function categoria (categoria){
  let categoryParagraph = document.getElementById("category-paragraph");
  categoryParagraph.innerHTML = `Categoria ${categoria} `;
}

fetch (URL)
.then(response => response.json())
.then(data => {
  categoria(data.catName);
  autos(data.products, "");
}) //se incluyen todos los autos

busqueda.addEventListener("input", function () { //si se utiliza el input
  const textobuscado = busqueda.value.toLowerCase();
  fetch(URL)
  .then ((response) => response.json())
  .then((data)=> {
    categoria(data.catName);
    autos(data.products, textobuscado); //Llama a autos con el termino de busqueda nuevo
  });
});