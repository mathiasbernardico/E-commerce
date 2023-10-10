// cart.js

document.addEventListener("DOMContentLoaded", function () {
  const IDinicial = 25801;
  const url = `https://japceibal.github.io/emercado-api/user_cart/${IDinicial}.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      mostrarDetallesCarrito(data);
    })
    .catch((error) => {
      console.error("Error", error);
    });

  function mostrarDetallesCarrito(data) {
    const articles = data.articles;
    const container = document.getElementById("detallesCarrito");
    articles.forEach((article) => {
      const articleDiv = document.createElement("div");
      articleDiv.classList.add("article");
      const name = document.createElement("h2");
      name.innerHTML = article.name;
      articleDiv.appendChild(name);
      const cost = document.createElement("p");
      cost.innerHTML = `Precio unitario: ${article.unitCost} ${article.currency}`;
      articleDiv.appendChild(cost);
      const quantity = document.createElement("p");
      quantity.innerHTML = `Cantidad:`;
      articleDiv.appendChild(quantity);
      const inputQuantity = document.createElement("input");
      inputQuantity.type = "number";
      inputQuantity.name = "inputQuantity";
      inputQuantity.id = "inputQuantity";
      inputQuantity.value = `${article.count}`
      articleDiv.appendChild(inputQuantity)
      inputQuantity.addEventListener("input", function () {
        const newCost = article.unitCost * inputQuantity.value;
        subtotal.innerHTML = `Subtotal: ${newCost} ${article.currency}`;
      });
      const subtotal = document.createElement("p");
      const monto = article.unitCost * inputQuantity.value;
      subtotal.innerHTML = `Subtotal: ${monto} ${article.currency}`;
      articleDiv.appendChild(subtotal);
      const image = document.createElement("img");
      image.src = article.image;
      image.alt = article.name;
      articleDiv.appendChild(image);
      container.appendChild(articleDiv);
    });
  }
});
