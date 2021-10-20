//Primero, selecciono los elementos de HTML que voy a utilizar
const formMensaje = document.getElementById('formMensajes');
const facturasContainer = document.getElementById('facturasContainer'); 

//Datos en memoria
const llamadas = [
  {cliente: "Pepsi", tipo: "internacional", horario: 900, mes:10, destino: "Peru", duracion: 50},
  {cliente: "Coca-cola", tipo: "internacional", horario: 2100,mes:10, destino: "Paris", duracion: 10},
  {cliente: "Pepsi", tipo: "nacional", horario: 900,mes:10, destino: "Pergamino", duracion: 30},
  {cliente: "Coca-cola", tipo: "nacional", horario: 100,mes:10, destino: "Mendoza", duracion: 10},
  {cliente: "Pepsi", tipo: "local", horario: 900,mes:10, duracion: 20},
  {cliente: "Coca-cola", tipo: "local", horario: 2100,mes:10, duracion: 10},
  {cliente: "Pepsi", tipo: "local", horario: 2000,mes:11, duracion: 20}
]
const clientes = [
  {nombre: "Pepsi", direccion: "Cazadores de Coquimbo 2860, Munro Buenos Aires"},
  {nombre: "Coca-cola", direccion: "Av. Amancio Alcorta 3570, CABA"}
]

const ciudades = [
  {nombre:"Pergamino", tarifa: 0.4},
  {nombre:"Mendoza", tarifa: 0.6},
  {nombre:"Chubut", tarifa: 1}
];
const paises = [
  {nombre:"Peru", tarifa: 3},
  {nombre:"Uruguay", tarifa: 1.5},
  {nombre:"Paris", tarifa: 5}
];


//creo la clase factura que va tener los atributos y metodos
class factura{
  constructor(cliente, mes){
      this.mes = mes;
      this.cliente = cliente;
  }
  
  getConsumoLocal(){
    const llamadasLocales = []
    let consumoLocal = 0;
    
    llamadas.forEach(element => {       //loop de las llamadas
      
      //Encuentro aquellas locales, del mes y el cliente solicitado 
      if(element.tipo == "local" && element.mes == this.mes && element.cliente.toLowerCase() == this.cliente.toLowerCase()){

        llamadasLocales.push(element) //guardo las llamadas en un array en caso de querer usarlas
        if(element.horario > 800 && element.horario < 2000){
          consumoLocal = consumoLocal + (0.20 * element.duracion) //el consumo va a estar dado por la duracion de llamada y la tarifa
        }else{
          consumoLocal = consumoLocal + (0.10 * element.duracion)
        }
      }
    });
    return consumoLocal;
  }

  getConsumoNacional(){
    const llamadasNacionales = []
    let consumoNacional = 0;

    llamadas.forEach(element => {
      if(element.tipo == "nacional" && element.mes == this.mes && element.cliente.toLowerCase() == this.cliente.toLowerCase()){

        llamadasNacionales.push(element)

        ciudades.forEach(ciudad => {
          if(ciudad.nombre == element.destino){

            consumoNacional = consumoNacional + (ciudad.tarifa * element.duracion) //en este caso habria que agregar la tarifa de cada lugar al array de ciudades
          }
        });
  
      }
    });
    return consumoNacional;
  }

  getConsumoInternacional(){
    const llamadasInternacionales = []
    let consumoInternacional = 0;

    llamadas.forEach(element => {
      if(element.tipo == "internacional" && element.mes == this.mes && element.cliente.toLowerCase() == this.cliente.toLowerCase()){

        llamadasInternacionales.push(element)
        paises.forEach(pais => {
          if(pais.nombre == element.destino){
              consumoInternacional = consumoInternacional + (pais.tarifa * element.duracion)
          }
        });
      }
    });
    return consumoInternacional;
  }

}

formMensaje.addEventListener('submit', (event) => { //evento submit

  event.preventDefault();

  if (mes.value < 12 && mes.value > 0 && clientes.some(e => e.nombre.toLowerCase() === cliente.value.toLowerCase())){
    //creo un objeto factura
    
    const miFactura = new factura(
      cliente.value,
      mes.value
    )
    //Elemento que va a contener toda la info
    const consumoLocal = miFactura.getConsumoLocal()
    const consumoNacional = miFactura.getConsumoNacional()
    const consumoInternacional = miFactura.getConsumoInternacional()
    const consumoTotal = (100 + consumoLocal + consumoNacional + consumoInternacional)

    let direccion = '';
    clientes.forEach(elemento => {
      if(miFactura.cliente.toLowerCase() == elemento.nombre.toLowerCase()){
        direccion = elemento.direccion;
      }
    });

    let p = document.createElement('p');
    
    p.innerHTML = `
      <div>
        <div>
          <h1>${miFactura.cliente}</h1>
          <p>Factura mes numero: ${miFactura.mes}</p>
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
              
              <td>100$</td>
            </tr>
            <tr>
              <td>Consumo Local</td>
              <td>${consumoLocal}$</td>
            </tr>
            <tr>
              <td>Consumo Nacional</td>
              <td>${consumoNacional}$</td>
            </tr>
            <tr>
              <td>Consumo Internacional</td>
              <td>${consumoInternacional}$</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Total Factura</th>
              <th>${consumoTotal}</th>
            </tr>
          </tfoot>
        </table>
      </div>`
    facturasContainer.innerHTML = "";
    facturasContainer.appendChild(p);
  }else{
    let p = document.createElement('p');
    
    p.innerHTML = `<h1>Intente con un cliente y mes valido</h1>`
    facturasContainer.innerHTML = "";
    facturasContainer.appendChild(p);
  }

});
