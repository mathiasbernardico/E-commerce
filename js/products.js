
const catID = localStorage.getItem("catID");

// busca el json componiendo el nombre con catID (updateado cuando hacemos click en el codigo que nos dan)
const jsonURL = `${catID}.json`;

fetch(jsonURL)
  .then(response => response.json())
  .then(data => {
    displayProducts(data.products);
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

function displayProducts(products) {
  const productContainer = document.getElementById('product-list-container');

  // buscar los productos
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    // se añaden en el html dentro del div creado con la función anterior
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3 id= nombreproducto>${product.name}</h3>
      <p id= descripcionproducto>${product.description}</p>
      <p id= precio>Precio: ${product.cost} ${product.currency}</p>
      <p id= vendidos>Vendidos: ${product.soldCount}</p>
    `;

    productContainer.appendChild(productItem);
  });
}
