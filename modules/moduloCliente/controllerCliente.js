var clientes = [];

var fecha_de_registro;
var nombre;
var a_paterno;
var a_materno;
var genero;
var fecha_nacimiento;
var rfc;
var curp;
var domicilio;
var codigo_postal;
var ciudad;
var estado;
var telefono;
var email;
var foto;
var estatus;
var fechar, dia, mes, annio;
var indiceClienteSeleccionado;
var id_cliente;

// Función para obtener los datos de clientes
export function añadirCampos() {
  nombre = document.getElementById("nombre");
  a_paterno = document.getElementById("apellido_Paterno");
  a_materno = document.getElementById("apellido_Materno");
  genero = document.getElementById("genero");
  fecha_nacimiento = document.getElementById("fecha_nacimiento");
  rfc = document.getElementById("rfc");
  curp = document.getElementById("curp");
  foto = document.getElementById("foto");
  domicilio = document.getElementById("domicilio");
  codigo_postal = document.getElementById("codigo-postal");
  ciudad = document.getElementById("ciudad");
  estado = document.getElementById("estado");
  telefono = document.getElementById("telefono");
  fecha_de_registro = document.getElementById("fecha_de_registro");
  email = document.getElementById("email");
  estatus = document.getElementById("estatus");
 
  fetch("modules/moduloCliente/dataCliente.json")
    .then(response =>{
      return response.json();
    }).then(
      function(jsondata){
        if (clientes.length === 0){
          clientes=jsondata;
        }
        loadTable();
      }
    );
}


// Función para cargar la tabla con los datos de clientes
export function loadTable() {
  let formulario = document.getElementById("filtros");
  formulario.addEventListener("submit",function(event){
    event.preventDefault();
  });

  // Obtener la sucursal
  let url = window.location.href;
  let urlObj = new URL(url);
  let sucursalUrl = urlObj.searchParams.get("sucursal");
    
  let textToSeach = document.querySelector("input[type= 'search']").value.toLowerCase();
  
  let html = "";
  clientes.forEach(function(cliente) {
      if(textToSeach == cliente.persona.nombre.nombre.toLowerCase() ||
      textToSeach == cliente.persona.nombre.a_paterno.toLowerCase()||
      textToSeach == cliente.persona.nombre.a_materno.toLowerCase()||
      textToSeach == cliente.persona.nombre.nombre.toLowerCase()||
      textToSeach == cliente.persona.fecha_nacimiento.toLowerCase()||
      textToSeach == cliente.persona.genero.toLowerCase()||
      textToSeach == cliente.persona.rfc.toLowerCase()||
      textToSeach == cliente.persona.curp.toLowerCase()||
      textToSeach == cliente.persona.domicilio.toLowerCase()||
      textToSeach == cliente.persona.codigo_postal.toLowerCase()||
      textToSeach == cliente.persona.ciudad.toLowerCase()||
      textToSeach == cliente.persona.estado.toLowerCase()||
      textToSeach == cliente.persona.telefono.toLowerCase()||
      textToSeach == cliente.persona.email.toLowerCase()||
      textToSeach ==""){
        if(document.getElementById("mostrar-inactivos").checked || cliente.estatus ==1){
          let registro =
          "<tr class='row-data' onclick='controller.selectCliente(" + clientes.indexOf(cliente) + ")'>" + 
          "<td>" + cliente.id_cliente +
          "</td><td>" + cliente.persona.nombre.nombre + " " + cliente.persona.nombre.a_paterno + " " + cliente.persona.nombre.a_materno + 
          "</td><td>" + cliente.persona.email +
          "</td></tr>";
          html += registro;
        }
      }

  });
document.getElementById("tblClientes").innerHTML = html;
    }

export function addCliente(){

  fechar = new Date();
  annio = fechar.getFullYear();
    
    if ((fechar.getMonth() + 1) < 10)
        mes = "0" + (fechar.getMonth() + 1);
    else mes = "" + (fechar.getMonth() + 1);
    
    if (fechar.getDate() < 10)
        dia = "0" + fechar.getDate();
    else dia = "" + fechar.getDate();
    
    let comp = annio + "-" + mes + "-" + dia;

    let cliente = {
      "id_cliente": clientes.length + 1,
      "fecha_de_registro":comp ,
      "estatus":1 ,
      "persona": {
        "nombre": {
          "nombre": nombre.value ,
          "a_paterno": a_paterno.value ,
          "a_materno": a_materno.value 
        },
        "genero": genero.value,
        "fecha_nacimiento": fecha_nacimiento.value,
        "rfc": rfc.value,
        "curp": curp.value,
        "domicilio": domicilio.value,
        "codigo_postal": codigo_postal.value,
        "ciudad": ciudad.value,
        "estado": estado.value,
        "telefono": telefono.value,
        "email": email.value,
        "foto": foto.value
    }
    }
    clientes.push(cliente);
    loadTable();
    cleanInputs();
    indiceClienteSeleccionado = null

}

export function selectCliente(index) {
  let cliente = clientes[index];
  fecha_de_registro.value = cliente.fecha_de_registro;
  nombre.value = cliente.persona.nombre.nombre;
  a_paterno.value = cliente.persona.nombre.a_paterno;
  a_materno.value = cliente.persona.nombre.a_materno; 
  genero.value = cliente.persona.genero;
  fecha_nacimiento.value = cliente.persona.fecha_nacimiento;
  rfc.value = cliente.persona.rfc;
  curp.value = cliente.persona.curp;
  domicilio.value = cliente.persona.domicilio;
  codigo_postal.value = cliente.persona.codigo_postal;
  ciudad.value = cliente.persona.ciudad;
  estado.value = cliente.persona.estado;
  telefono.value = cliente.persona.telefono;
  email.value = cliente.persona.email;
  foto.value = cliente.persona.foto;
  indiceClienteSeleccionado = index;
}

export function editCliente(){

  let cliente = {
    "id_cliente": clientes[indiceClienteSeleccionado].id_cliente,
    "fecha_de_registro": clientes[indiceClienteSeleccionado].fecha_de_registro ,
    "estatus":clientes[indiceClienteSeleccionado].estatus,
    "persona": {
      "nombre": {
        "nombre": nombre.value ,
        "a_paterno": a_paterno.value ,
        "a_materno": a_materno.value
      },
      "genero": genero.value,
      "fecha_nacimiento": fecha_nacimiento.value,
      "rfc": rfc.value,
      "curp": curp.value,
      "domicilio": domicilio.value,
      "codigo_postal": codigo_postal.value,
      "ciudad": ciudad.value,
      "estado": estado.value,
      "telefono": telefono.value,
      "email": email.value,
      "foto": foto.value
    }
    }
    console.log(cliente)
    clientes[indiceClienteSeleccionado] = cliente;
    loadTable();
    cleanInputs();
    indiceClienteSeleccionado = null;
   }

function cleanInputs(){
fecha_de_registro.value="";
nombre.value="";
a_paterno.value="";
a_materno.value="";
genero.value="";
fecha_nacimiento.value="";
rfc.value="";
curp.value="";
domicilio.value="";
codigo_postal.value="";
ciudad.value="";
estado.value="";
telefono.value="";
email.value="";
foto.value="";
}

export function deleteCliente(){
  clientes[indiceClienteSeleccionado].estatus=0;
  indiceClienteSeleccionado = null;
  loadTable();
  cleanInputs();
 }


