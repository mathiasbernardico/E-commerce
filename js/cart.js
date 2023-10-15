// cart.js

document.addEventListener("DOMContentLoaded", function () {
  console.log(localStorage.getItem('items'));
let recargo = localStorage.getItem('recargada');
  // Condicional para recargar la página una única vez y cargar el primer elemento del carrito
  if (!recargo) {
      // La página no se ha recargado todavía, recárgala
      localStorage.setItem('recargada', 'true');
      window.location.reload();
  }
  
  const IDinicial = "25801";
  const url = `https://japceibal.github.io/emercado-api/user_cart/${IDinicial}.json`;

  var arrayItems = JSON.parse(localStorage.getItem('items')) || [];
  // Objeto para almacenar la cantidad de veces que se repite cada ID
  const idContador = {};

  //Funcion para actualizar los subtotales en tiempo real
  function actualizarPrecioTotal(idProducto, valor) {
      const caputandoTD = document.getElementById("costo" + idProducto);
      const producto = arrayItems.find(item => item.id === idProducto);
      if (producto) {
          const multiplicando = valor * producto.cost;
          caputandoTD.textContent = multiplicando;
          producto.cantidad = valor;
          localStorage.setItem('items', JSON.stringify(arrayItems));
      }
  }

  function restaurarValoresDesdeLocalStorage() {
      filtrados.forEach(producto => {
          const idProducto = producto.id;
          const valor = parseFloat(producto.cantidad);
          const input = document.getElementById(idProducto);
          input.value = valor;
          const precioTotal = valor * producto.cost;
          const caputandoTD = document.getElementById("costo" + idProducto);
          caputandoTD.textContent = precioTotal;
      });
  }

  function agregandoItems() {
      const contenedor = document.getElementById("tbody");
      filtrados.forEach(producto => {
          const idProducto = producto.id;
          const valor = idContador[idProducto];
          const precioTotal = valor * producto.cost;

          const tr = document.createElement('tr');
          tr.innerHTML = `
              <tr>
                  <td><img src="${producto.img}" alt=""></td>
                  <td>${producto.name}</td>
                  <td>${producto.cost}</td>
                  <td><input type="number" name="inputQuantity" id="${idProducto}" value="${valor}"></td>
                  <td id="costo${producto.id}">${precioTotal}</td>
              </tr>
          `;
          contenedor.appendChild(tr);
          // Agregar evento 'input' a los inputs
          const input = tr.querySelector('input[type="number"]');
          input.addEventListener('input', function () {
              const idProducto = this.id;
              const valor = parseFloat(this.value);
              actualizarPrecioTotal(idProducto, valor);
          });
      });
  }

  // Filtra y cuenta los elementos
  let filtrados = arrayItems.filter(item => {
      const id = item.id;
      if (!idContador[id]) {
          idContador[id] = 1;
          return true;
      } else {
          idContador[id]++;
          return false;
      }
  });

  // Fetch de datos iniciales
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Condicional para que solo agregue una vez el artículo de la consigna
          if (arrayItems.length === 0) {
              // Cargándolo como un objeto
              const item = data.articles[0];
              const img = item.image;
              const name = item.name;
              const cost = item.unitCost;
              var cant = 1;
              const agregandoItem = {
                  "id": IDinicial,
                  "name": name,
                  "img": img,
                  "cost": cost,
                  "cantidad": cant
              }
              // Actualizando array items
              arrayItems.push(agregandoItem);
              localStorage.setItem('items', JSON.stringify(arrayItems));
          } else {
              agregandoItems();
              restaurarValoresDesdeLocalStorage(); // Restaurar valores al cargar la página
          }

  console.log(filtrados);
      })
      
      .catch(error => {
          console.error('Error', error);
      });
});

  