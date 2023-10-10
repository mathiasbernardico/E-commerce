// cart.js

document.addEventListener("DOMContentLoaded", function () {
    const IDinicial =25801;
    const url = `https://japceibal.github.io/emercado-api/user_cart/${IDinicial}.json`;

    function mostrarDetallesCarrito(data) {
        const articles = data.articles;
        const container = document.getElementById('detallesCarrito');
        articles.forEach(article => {
          const articleDiv = document.createElement('div');
          articleDiv.classList.add('article');
          const name = document.createElement('h2');
          name.innerHTML = article.name;
          articleDiv.appendChild(name);
          const quantity = document.createElement('p');
          quantity.innerHTML = `Cantidad: ${article.count}`;
          articleDiv.appendChild(quantity);
          const cost = document.createElement('p');
          cost.innerHTML = `Precio unitario: ${article.unitCost} ${article.currency}`;
          articleDiv.appendChild(cost);
          const image = document.createElement('img');
          image.src = article.image;
          image.alt = article.name;
          articleDiv.appendChild(image);
          const subtotal = document.createElement('p');
          const monto = article.unitCost * article.count;
          subtotal.innerHTML = `Subtotal: ${monto} ${article.currency}`;
          articleDiv.appendChild(subtotal);
          container.appendChild(articleDiv);
        });
      }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        mostrarDetallesCarrito(data);
      })
      .catch(error => {
        console.error('Error', error);
      });
  });