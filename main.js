import Factura from "./factura.js"
import { clientes } from "./factura.js";

//Primero, selecciono los elementos de HTML que voy a utilizar
const formMensaje = document.getElementById('formMensajes');
const facturasContainer = document.getElementById('facturasContainer'); 
//meses
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

//creo la clase factura que va tener los atributos y metodos
formMensaje.addEventListener('submit', (event) => { 

  event.preventDefault();

  if (mes.value < 12 && mes.value > 0 && clientes.some(e => e.nombre.toLowerCase() === cliente.value.toLowerCase())){
    
    //creo una instancia de la clase Factura
    const miFactura = new Factura(
      cliente.value,
      mes.value
    )
    //defino los consumo a partir de la instancia
    const consumo = {
      basico: 100,
      local: miFactura.getConsumoLocal(),
      nacional: miFactura.getConsumoNacional(),
      internacional: miFactura.getConsumoInternacional(),
    }
    consumo.total = (consumo.local + consumo.nacional + consumo.internacional + consumo.basico)
 

    let direccion = '';
    
    clientes.forEach(elemento => {
      if(miFactura.cliente.toLowerCase() == elemento.nombre.toLowerCase()){
        direccion = elemento.direccion;
      }
    });

    let p = document.createElement('p');
    //Elemento que va a contener toda la info
    p.innerHTML = `
      <div>
        <div>
          <h1>${miFactura.cliente}</h1>
          <p>Factura mes numero: ${meses[Number.parseInt(miFactura.mes) - 1]}</p>
          <p>${direccion}</p>
         
        </div>
      </div>
      <hr />
      <div>
        <table>
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Consumo Basico</td>
              
              <td>${consumo.basico}</td>
            </tr>
            <tr>
              <td>Consumo Local</td>
              <td>${consumo.local}$</td>
            </tr>
            <tr>
              <td>Consumo Nacional</td>
              <td>${consumo.nacional}$</td>
            </tr>
            <tr>
              <td>Consumo Internacional</td>
              <td>${consumo.internacional}$</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Total Factura</th>
              <th>${consumo.total}$</th>
            </tr>
          </tfoot>
        </table>
      </div>`
    facturasContainer.innerHTML = "";
    facturasContainer.appendChild(p);
  }else{
    let p = document.createElement('p');
    
    p.innerHTML = `<h2>Intente con un cliente y mes valido</h2>`
    facturasContainer.innerHTML = "";
    facturasContainer.appendChild(p);
  }

});
