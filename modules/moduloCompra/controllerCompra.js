
// Declara arreglo de sucursales
var compras = [];
var productos = [];

// Declarar varable de indece seleccionado
var indiceCompraSeleccionada;

// Funcion de inicio
export function añadirCampos(){
    // Cargar datos desde el archivo JSON
    fetch("modules/moduloCompra/dataCompra.json")
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            if (compras.length === 0){
                compras = jsondata;
            }
            // Cargar tabla
            loadTable();
        }
    );
}

// Funcion para cargar la tabla
function loadTable(){
    // variable donde almacenare el codigo html
    let html = "";
    // Recorrer todas las compras
    compras.forEach(function(compra){
        // Crear la variable registro
        let registro = 
        "<tr class='row-data' onclick='controller.selectCompra(" + compras.indexOf(compra) + ")'>" + 
        "<td>" + compra.id_compra +
        "</td><td>" + compra.empleado.nombre + ' ' + compra.empleado.a_paterno + ' ' + compra.empleado.a_materno +
        "</td><td>" + compra.fecha_y_hora +
        "</td></tr>";
        // Sumar la variable registro al codigo html
        html += registro;
    });
    // Insertar el codigo html dentro de la tabla Sucursal
    document.getElementById("tblCompra").innerHTML = html;
}