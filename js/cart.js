// cart.js

document.addEventListener("DOMContentLoaded", function () {
    const IDinicial =25801;
    const url = `https://japceibal.github.io/emercado-api/user_cart/${IDinicial}.json`;
  

    function mostrarDetallesCarrito(data) {
      const articles = data.articles;
      const container = document.getElementById("detallesCarrito");
      const table = document.createElement("table");
      table.classList.add("table");
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      const columnHeaders = ["", "Nombre", "Precio Unitario", "Cantidad", "Subtotal"];
    
      columnHeaders.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
    
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      const tbody = document.createElement("tbody");
      articles.forEach((article) => {
        const row = document.createElement("tr");
    
       
        const imageCell = document.createElement("td");
        const image = document.createElement("img");
        image.src = article.image;
        image.alt = article.name;
        imageCell.appendChild(image);
        row.appendChild(imageCell);
    
        
        const nombreCell = document.createElement("td");
        nombreCell.textContent = article.name;
        row.appendChild(nombreCell);
    
        const precioUnitarioCell = document.createElement("td");
        precioUnitarioCell.textContent = `${article.unitCost} ${article.currency}`;
        row.appendChild(precioUnitarioCell);
    
        const cantidadCell = document.createElement("td");
        const inputQuantity = document.createElement("input");
        inputQuantity.type = "number";
        inputQuantity.name = "inputQuantity";
        inputQuantity.id = "inputQuantity";
        inputQuantity.value = article.count;
        inputQuantity.addEventListener("input", function () {
          const newCost = article.unitCost * inputQuantity.value;
          subtotalCell.textContent = `Subtotal: ${newCost} ${article.currency}`;
        });
        cantidadCell.appendChild(inputQuantity);
        row.appendChild(cantidadCell);
    
        const subtotalCell = document.createElement("td");
        const monto = article.unitCost * article.count;
        subtotalCell.textContent = `Subtotal: ${monto} ${article.currency}`;
        row.appendChild(subtotalCell);
    
        tbody.appendChild(row);
      });
    
      table.appendChild(tbody);
      container.appendChild(table);
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
  