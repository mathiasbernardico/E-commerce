// cart.js

document.addEventListener("DOMContentLoaded", function () {
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
      const capturandoTD = document.getElementById("costo" + idProducto);
      const producto = arrayItems.find(item => item.id === idProducto);
      const dolar = `<b> $USD</b>`;
      if (producto) {
          const multiplicando = valor * producto.cost;
          const ObteniendoSumaTotal = JSON.parse(localStorage.getItem('SumasTotales')) + multiplicando;
          localStorage.setItem('SumasTotales', JSON.stringify(ObteniendoSumaTotal));
          capturandoTD.textContent = multiplicando;
          capturandoTD.innerHTML += dolar;
          producto.cantidad = valor;
          localStorage.setItem('items', JSON.stringify(arrayItems));
      }
  }

  function restaurarValoresDesdeLocalStorage() {
      filtrados.forEach(producto => {
          const idProducto = producto.id;
          const valor = parseFloat(producto.cantidad);
          const input = document.getElementById(idProducto);
          const dolar = `<b> $USD</b>`;
          input.value = valor;
          const precioTotal = valor * producto.cost;
          const capturandoTD = document.getElementById("costo" + idProducto);
          capturandoTD.textContent = precioTotal;
          capturandoTD.innerHTML += dolar;
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
                  <td>${producto.cost} <b>$USD</b></td>
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
              CalculosGenerales()
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

  function CalculosGenerales(){
    const contenedorTotal = document.getElementById("calculosGenerales");
    const imputs = document.querySelectorAll('#contenedorDeEnvios form input');
    const SumaTotal = JSON.parse(localStorage.getItem('SumasTotales'));
    
    const OpcionSeleccionada = (e) => {
        switch (e.target.value) {
        case "1":
            if(e.target.checked){
                const premium = SumaTotal *(15/100);
                const sumaOpt1 = SumaTotal+premium;
                const divPremium = `
                <h2>Subtotal: $USD ${SumaTotal}</h2>
                <h2>Costo de envio: $USD ${premium}</h2>
                <h2>Total: $USD ${sumaOpt1}</h2>
                `;
                contenedorTotal.innerHTML = divPremium;
                premium = 0;
                sumaOpt1 = 0;
            }
        break;
        case "2":
            if(e.target.checked){
                const express = SumaTotal *(7/100);
                const sumaOpt2 = SumaTotal+express;
                const divExpress = `
                <h2>Subtotal: $USD ${SumaTotal}</h2>
                <h2>Costo de envio: $USD ${express}</h2>
                <h2>Total: $USD ${sumaOpt2}</h2>
                `;
                contenedorTotal.innerHTML = divExpress;
                express = 0;
                sumaOpt2 = 0;
            }
        break;
        case "3":
            if(e.target.checked){
                const standard = SumaTotal * 0.5;
                const sumaOpt3 = SumaTotal+standard;
                const divStandard = `
                <h2>Subtotal: $USD ${SumaTotal}</h2>
                <h2>Costo de envio: $USD ${standard}</h2>
                <h2>Total: $USD ${sumaOpt3}</h2>
                `;
                contenedorTotal.innerHTML = divStandard;
                standard = 0;
                sumaOpt3 = 0;
            }
        break;
        }
    }
    imputs.forEach((imputs) => {
        imputs.addEventListener('keyup', OpcionSeleccionada);
        imputs.addEventListener('blur', OpcionSeleccionada);
    });
  }
  const idcredito = document.getElementById("credito");
  idcredito.addEventListener('click', function(){
    let numCuenta = document.getElementById("numero-cuenta");
    let codigo = document.getElementById("codigo");
    let numTarjeta = document.getElementById("numero-tarjeta");
    let vencimiento = document.getElementById("vencimiento");
    numCuenta.disabled = true;
    codigo.disabled = false; 
    numTarjeta.disabled = false;
    vencimiento.disabled = false;
  });
  const tranferenciaBancaria = document.getElementById("transferencia");
  tranferenciaBancaria.addEventListener('click', function(){
    let numCuenta = document.getElementById("numero-cuenta");
    let codigo = document.getElementById("codigo");
    let numTarjeta = document.getElementById("numero-tarjeta");
    let vencimiento = document.getElementById("vencimiento");
    numCuenta.disabled = false; 
    codigo.disabled = true;
    numTarjeta.disabled = true;
    vencimiento.disabled = true;
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
              CalculosGenerales();
          }

      })
      
      .catch(error => {
          console.error('Error', error);
      });
});

  