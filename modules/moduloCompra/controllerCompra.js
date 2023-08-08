
// Declara arreglo de sucursales
var compras = [];
var productos = [];

// Declarar varable de indece seleccionado
var indiceCompraSeleccionada;

// Declara variables globales de los inputs
var nombreSucursal;
var nombreEmpleado;
var fechaHora;
var estatus;

var nombreUsuarioLog;
var aPaternoUsuarioLog;
var aMaternoUsuarioLog;
var sucursalUsuarioLog;

// Funcion de inicio
export function añadirCampos(){

    // Obtenr los datos del usuario Logueado
    const urlParams = new URLSearchParams(window.location.search);
    nombreUsuarioLog = urlParams.get("nombre");
    aPaternoUsuarioLog = urlParams.get("a_paterno");
    aMaternoUsuarioLog = urlParams.get("a_materno")
    sucursalUsuarioLog = urlParams.get("sucursal");

    // Guardar los elementos del DOM que se van a utilizar en varables globales
    nombreSucursal = document.getElementById("nombre-sucursal");
    nombreEmpleado = document.getElementById("nombre-empleado");
    fechaHora = document.getElementById("fecha-hora");
    estatus = document.getElementById("estatus");


    // Limpiar los inputs, por si tenian algo antes
    cleanInputs();

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

export function addProduct(event){
    if (event.key === "Enter") {
        let productoText = document.getElementById("nombre-producto").value;
        let indiceGuion = productoText.indexOf("-");

        let productoNombre = productoText.substring(0, indiceGuion);
        let productoCantidad = productoText.substring(indiceGuion + 1);

        let producto = {
            nombre: productoNombre,
            cantidad: productoCantidad,
            precio_unitario: 1
        };
        productos.push(producto);
        loadTableProducts();
    }
}

export function addCompra(){
    // Obtener la fecha y hora actual
    let fecha = new Date();

    // Obtener los componentes de la fecha y hora
    let año = fecha.getFullYear();
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let dia = fecha.getDate().toString().padStart(2, '0');
    let horas = fecha.getHours().toString().padStart(2, '0');
    let minutos = fecha.getMinutes().toString().padStart(2, '0');
    let segundos = fecha.getSeconds().toString().padStart(2, '0');

    // Formatear la hora en el formato deseado
    let horaFormateada = `${año}-${mes}-${dia} ${horas}-${minutos}-${segundos}`;


    let compra = {
        "id_compra": compras.length + 1,
        "sucursal": {
            "nombre": sucursalUsuarioLog
        },
        "empleado":{
            "nombre": nombreUsuarioLog,
            "a_paterno": aPaternoUsuarioLog,
            "a_materno": aMaternoUsuarioLog                  
        },
        "fecha_y_hora": horaFormateada,
        "estatus": "Pendiente",
        "productos": productos
    };

    productos = [];
    compras.push(compra);
    loadTable();
}

export function selectCompra(index){
    indiceCompraSeleccionada = index;
}

function cleanInputs() {
    nombreSucursal.value = "";
    nombreEmpleado.value = "";
    fechaHora.value = "";
    estatus.value = "";
}

// Funcion para cargar la tabla
function loadTable(){
    // variable donde almacenare el codigo html
    let html = "";
    // Recorrer todas las compras
    compras.forEach(function(compra){

        if (compra.sucursal.nombre == sucursalUsuarioLog){
            // Añadir la compra al codigo unicamente si se cumplen por lo menos una de estas dos condiciones
            // 1- Que el checkbox tenga un valor "True"
            // 2- Que el estatus de la compra sea "Pendiente"
            if (document.getElementById("mostrar-inactivos").checked || compra.estatus == "Pendiente"){
                // Crear la variable registro
                let registro = 
                "<tr class='row-data' onclick='controller.selectCompra(" + compras.indexOf(compra) + ")'>" + 
                "<td>" + compra.id_compra +
                "</td><td>" + compra.empleado.nombre + ' ' + compra.empleado.a_paterno + ' ' + compra.empleado.a_materno +
                "</td><td>" + compra.fecha_y_hora +
                "</td></tr>";
                // Sumar la variable registro al codigo html
                html += registro;
            }
        }
    });
    // Insertar el codigo html dentro de la tabla Sucursal
    document.getElementById("tblCompra").innerHTML = html;
}

function loadTableProducts(){
    let html = "";
    productos.forEach(function(producto){
        let registro =
        "<tr><td class='row-data-2'>" + producto.nombre + 
        "</td><td>" + producto.cantidad + 
        "</td></tr>";
        html += registro;
    });
    // Insertar el codigo html dentro de la tabla Producto
    document.getElementById("tblProducto").innerHTML = html;
}