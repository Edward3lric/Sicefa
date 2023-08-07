
var sucursales = [];
var indiceSucursalSeleccionada;

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

export function añadirCampos(){
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

    cleanInputs();

    fetch("modules/moduloSucursal/dataSucursal.json")
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            if (sucursales.length === 0){
                sucursales = jsondata;
            }
            loadTable();
        }
    );
}

export function addSucursal(){
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

    sucursales.push(sucursal);
    loadTable();

    cleanInputs();

    indiceSucursalSeleccionada = null;
}

export function selectSucursal(index){
    let sucursal = sucursales[index]

    nombreSucursal.value = sucursal.nombre;
    nombreTitular.value = sucursal.nombre_titular;
    rfcTitular.value = sucursal.rfc_titular;
    domicilio.value = sucursal.domicilio;
    colonia.value = sucursal.colonia;
    ciudad.value = sucursal.ciudad;
    estado.value = sucursal.estado;
    codigoPostal.value = sucursal.codigo_postal;
    telefono.value = sucursal.telefono;
    longitud.value = sucursal.longitud;
    latitud.value = sucursal.latitud;
    estatus.value = sucursal.estatus;

    indiceSucursalSeleccionada = index;
}

export function deleteSucursal(){
    sucursales[indiceSucursalSeleccionada].estatus = 0;
    indiceSucursalSeleccionada = null;

    cleanInputs();
    loadTable();
}

export function editSucursal(){
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

    sucursales[indiceSucursalSeleccionada] = sucursal;

    loadTable();
    cleanInputs();

    indiceSucursalSeleccionada = null;
}

export function showSucursal(){
    loadTable()
}

function cleanInputs(){
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


function loadTable(){
    let html = "";
    sucursales.forEach(function(sucursal){
        if (sucursal.estatus == 1 || document.getElementById("mostrar-inactivos").checked){
            let registro = 
            "<tr class='row-data' onclick='controller.selectSucursal(" + sucursales.indexOf(sucursal) + ")'>" + 
            "<td>" + sucursal.id_sucursal +
            "</td><td>" + sucursal.nombre +
            "</td><td>" + sucursal.nombre_titular +
            "</td></tr>";
            html += registro;
        }
    });
    document.getElementById("tblSucursal").innerHTML = html;
}