
// Declara arreglo de sucursales
var sucursales = [];

// Declarar varable de indece seleccionado
var indiceSucursalSeleccionada;

// Declara variables globales de los inputs
var nombreSucursal;
var nombreTitular;
var rfcTitular;
var domicilio;
var colonia;
var ciudad;
var estado;
var codigoPostal;
var telefono;
var longitud;
var latitud;
var estatus;

// Funcion de inicio
export function añadirCampos(){

    // Guardar los elementos del DOM que se van a utilizar en varables globales
    nombreSucursal = document.getElementById("nombre-sucursal");
    nombreTitular = document.getElementById("nombre-titular");
    rfcTitular = document.getElementById("rfc-titular");
    domicilio = document.getElementById("domicilio");
    colonia = document.getElementById("colonia");
    ciudad = document.getElementById("ciudad");
    estado = document.getElementById("estado");
    codigoPostal = document.getElementById("codigo-postal");
    telefono = document.getElementById("telefono");
    longitud = document.getElementById("longitud");
    latitud = document.getElementById("latitud");
    estatus = document.getElementById("estatus");

    // Limpiar los inputs, por si tenian algo antes
    cleanInputs();

    // Cargar datos desde el archivo JSON
    fetch("modules/moduloSucursal/dataSucursal.json")
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            if (sucursales.length === 0){
                sucursales = jsondata;
            }
            // Cargar tabla
            loadTable();
        }
    );
}

// Funcion para añadir una sucursal
export function addSucursal(){
    // Codigo para evitar que se ingreseen datos sin valor
    let inputs = document.querySelectorAll(".row input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].value === ""){
            // Finaliza la funcion
            return;
        }
    } 
    // Recuperar datos de los inputs y asignarlos a su valor correspondiente
    let sucursal = {
        "id_sucursal": sucursales.length + 1,
        "telefono": telefono.value,
        "nombre": nombreSucursal.value,
        "nombre_titular": nombreTitular.value,
        "rfc_titular": rfcTitular.value,
        "estatus": 1,
        "latitud": latitud.value,
        "longitud": longitud.value,
        "cp": codigoPostal.value,
        "estado": estado.value,
        "ciudad": ciudad.value,
        "colonia": colonia.value,
        "domicilio": domicilio.value
    };

    // Añadir sucursal al arreglo
    sucursales.push(sucursal);
    // Cargar Tabla
    loadTable();
    // Aplicar filtro de busqueda
    //searchSucursal();
    // Borrar texto del los inputs
    cleanInputs();

    // Estableser el indice seleccionado en nulo,
    // Por si tenia algun valor
    indiceSucursalSeleccionada = null;
}

// Funcion para seleccion una sucursal
export function selectSucursal(index){
    // Recuperar la sucursal seleccionada mediante su indice
    let sucursal = sucursales[index]

    // Asignar los valores de la sucursal a los inputs
    nombreSucursal.value = sucursal.nombre;
    nombreTitular.value = sucursal.nombre_titular;
    rfcTitular.value = sucursal.rfc_titular;
    domicilio.value = sucursal.domicilio;
    colonia.value = sucursal.colonia;
    ciudad.value = sucursal.ciudad;
    estado.value = sucursal.estado;
    codigoPostal.value = sucursal.cp;
    telefono.value = sucursal.telefono;
    longitud.value = sucursal.longitud;
    latitud.value = sucursal.latitud;
    // Operador Ternario, tiene un comportamiento similar a un "IF"
    estatus.value = (sucursal.estatus == 1) ? "Activo" : "Inactivo";

    // Modificar la variable global con el indice
    indiceSucursalSeleccionada = index;

    // Poner Mapa
    createMap(sucursal.latitud, sucursal.longitud);
}

// Funcion para eliminar una sucurssal
export function deleteSucursal(){
    // Cambiar el estatus de la sucursal seleccionada a 0
    sucursales[indiceSucursalSeleccionada].estatus = 0;

    // Establecer el valor del indice seleccionado en nulo
    indiceSucursalSeleccionada = null;

    // Cargar Tabla
    loadTable();
    // Aplicar filtro de busqueda
    //searchSucursal();
    // Borrar texto del los inputs
    cleanInputs();
}

export function editSucursal(){
    // Codigo para evitar que se ingreseen datos sin valor
    let inputs = document.querySelectorAll(".row input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].value === ""){
            // Finaliza la funcion
            return;
        }
    } 
    // Crear un objeto sucursal con los nuevos valores, recuperados de los inputs
    let sucursal = {
        "id_sucursal": sucursales[indiceSucursalSeleccionada].id_sucursal,
        "telefono": telefono.value,
        "nombre": nombreSucursal.value,
        "nombre_titular": nombreTitular.value,
        "rfc_titular": rfcTitular.value,
        "estatus": sucursales[indiceSucursalSeleccionada].estatus,
        "latitud": latitud.value,
        "longitud": longitud.value,
        "cp": codigoPostal.value,
        "estado": estado.value,
        "ciudad": ciudad.value,
        "colonia": colonia.value,
        "domicilio": domicilio.value
    };

    // Asignar el objeto sucursal a la posicion donde estaba el objeto anterior
    sucursales[indiceSucursalSeleccionada] = sucursal;

    // Cargar Tabla
    loadTable();
    // Aplicar filtro de busqueda
    //searchSucursal();
    // Borrar texto del los inputs
    cleanInputs();

    // Establecer el valor del indice seleccionado en nulo
    indiceSucursalSeleccionada = null;
}

/*
export function searchSucursal(){
    // Traer texto a buscar en minusculas para que la busqueda se indistinta de mayusculas o minuculas
    let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();
    // Encontrar todas las filas que se encuentran en el tbody "tblSucursal"
    let tbody = document.getElementById("tblSucursal");
    let rows = tbody.getElementsByTagName("tr");

    // Codigo para evitar que el input search funcione mo "submit" en el formulario
    let formulario = document.getElementById("filtros");
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    // Recorrer cada una de las filas
    for (let i = 0; i < rows.length; i++) {
        // Ocultar la fila con una propiedad CSS
        rows[i].style.display = "none"
        // Obtener todos los td dentro de esa fila
        let celdas = rows[i].getElementsByTagName("td");

        // Recorrer cada tb de la fila
        for (let j = 0; j < celdas.length; j++){

            // Obtener el texto del td en minusculas para que la busqueda se indistinta de mayusculas o minuculas
            let text = celdas[j].textContent.toLowerCase();

            // Verificar si la palabra buscada esta dentro del texto
            if (text.indexOf(textToSeach) > -1){
                // Mostrar la fila
                rows[i].style.display = "table-row"
                // Romper el ciclo
                break;
            }
        }   
    }
}*/

// Funcion para limpiar los inputs
function cleanInputs(){
    // Poner en todos los inputs cadenas vacias
    nombreSucursal.value = "";
    nombreTitular.value = "";
    rfcTitular.value = "";
    domicilio.value = "";
    colonia.value = "";
    ciudad.value = "";
    estado.value = "";
    codigoPostal.value = "";
    telefono.value = "";
    longitud.value = "";
    latitud.value = "";
    estatus.value = "";
}

// Funcion para cargar la tabla
export function loadTable(){
    // Codigo para evitar que el input search funcione como "submit" en el formulario
    let formulario = document.getElementById("filtros");
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
    });
    // Obtener valor de busqueda
    let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();
    // variable donde almacenare el codigo html
    let html = "";
    // Recorrer todas las sucursales
    sucursales.forEach(function(sucursal){
        
        if (textToSeach == sucursal.telefono.toLowerCase() ||
            textToSeach == sucursal.nombre.toLowerCase() ||
            textToSeach == sucursal.nombre_titular.toLowerCase() ||
            textToSeach == sucursal.rfc_titular.toLowerCase() ||
            textToSeach == sucursal.latitud.toLowerCase() ||
            textToSeach == sucursal.longitud.toLowerCase() ||
            textToSeach == sucursal.cp.toLowerCase() ||
            textToSeach == sucursal.estado.toLowerCase() ||
            textToSeach == sucursal.ciudad.toLowerCase() ||
            textToSeach == sucursal.colonia.toLowerCase() ||
            textToSeach == sucursal.domicilio.toLowerCase() ||
            textToSeach == ""){

            // Añadir la sucursal al codigo unicamente si se cumplen por lo menos una de estas dos condiciones
            // 1- Que el checkbox tenga un valor "True"
            // 2- Que el estatus de la sucursal sea 1 o activo
            if (document.getElementById("mostrar-inactivos").checked || sucursal.estatus == 1){
                // Crear la variable registro
                let registro = 
                "<tr class='row-data' onclick='controller.selectSucursal(" + sucursales.indexOf(sucursal) + ")'>" + 
                "<td>" + sucursal.id_sucursal +
                "</td><td>" + sucursal.nombre +
                "</td><td>" + sucursal.nombre_titular +
                "</td></tr>";
                // Sumar la variable registro al codigo html
                html += registro;
            }
        }
    });
    // Insertar el codigo html dentro de la tabla Sucursal
    document.getElementById("tblSucursal").innerHTML = html;
}

// Funcion poara poner el mapa en las coordenadas especificas
function createMap(latitud, longitud){
    // Borrar mapa anterior
    document.getElementById('mapContainer').innerHTML = "";

    // Codigo para insertar el MAPA con mi API key
    var platform = new H.service.Platform({
    apikey: 'p1T_AgFa5bwmfRkSPH1VXSfnp8yqUQBnkIPESySTZGg' 
    });

    var defaultLayers = platform.createDefaultLayers();
    var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        center: { lat: latitud, lng: longitud },
        zoom: 18 
    }
    );

    // Habilitar el comportamiento de arrastrar y mover el mapa con el mouse
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Agrega un marcador en las coordenadas dadas
    var marker = new H.map.Marker({ lat: latitud, lng: longitud });
    map.addObject(marker);
  
}