/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* global fetch */


var productos = [];

var indiceProductoSeleccionado;

var nombreProducto;
var nombreGen;
var formaFarmaceutica;
var unidadMedida;
var presentacion;
var contraInd;
var prin_indicacion;
var consentracion;
var unidadEnvase;
var precioUnitario;
var foto;
var estatus;

// Funcion para añadir un campo 
export function añadirCampos(){

    nombreProducto = document.getElementById("nombre_producto");
    formaFarmaceutica = document.getElementById("forma_farmaceutica");
    unidadMedida = document.getElementById("unidad_medida");
    presentacion = document.getElementById("presentacion");
    prin_indicacion = document.getElementById("principal_indicacion");
    consentracion = document.getElementById("concentracion");
    unidadEnvase = document.getElementById("unidades_envase");
    precioUnitario = document.getElementById("precio_unitario");
    estatus = document.getElementById("estatus");
    foto = document.getElementById("foto");
    nombreGen = document.getElementById("nombre_generico");
    contraInd = document.getElementById("contraindicaciones");

   
    fetch("modules/moduloProducto/dataProducto.json")
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            if (productos.length === 0){
                productos = jsondata;
            }
            // Cargar tabla
            loadTable();
        }
    );
}

// Funcion para añadir un producto
export function addProducto(){
    let producto = {
        "id_producto": productos.length + 1,
        "nombre": nombreProducto.value,
        "nombre_generico": nombreGen.value,
        "forma_farmaceutica": formaFarmaceutica.value,
        "unidad_de_medida": unidadMedida.value,
        "presentacion": presentacion.value,
        "principal_indicacion": prin_indicacion.value,
        "contraindicaciones": contraInd.value,
        "concentración": consentracion.value,
        "unidades_en_envase": unidadEnvase.value,
        "precio_unitario": precioUnitario.value,
        "foto": foto.value,
        "estatus": 1
    };

    // Añadir producto al arreglo
    productos.push(producto);

    loadTable();

    cleanInputs();

    indiceProductoSeleccionado = null;
}

export function selectProducto(index){
    let producto = productos[index]

    nombreProducto.value = producto.nombre;
    nombreGen.value = producto.nombre_generico;
    formaFarmaceutica.value=producto.forma_farmaceutica;
    unidadMedida.value=producto.unidad_de_medida;
    presentacion.value=producto.presentacion;
    prin_indicacion.value=producto.principal_indicacion;
    contraInd.value=producto.contraindicaciones;
    consentracion.value=producto.concentracion;
    unidadEnvase.value=producto.unidades_en_envase;
    precioUnitario.value=producto.precio_unitario;
    foto.value=producto.foto;
    estatus.value = producto.estatus;
    
    indiceProductoSeleccionado = index;
}

export function deleteProducto(){
    productos[indiceProductoSeleccionado].estatus = 0;
    indiceProductoSeleccionado = null;

    loadTable();
    cleanInputs();
}

export function editProducto(){
    let producto = {
        "id_producto": productos[indiceProductoSeleccionado].id_producto,
        "nombre": nombreProducto.value,
        "nombre_generico": nombreGen.value,
        "forma_farmaceutica": formaFarmaceutica.value,
        "unidad_de_medida": unidadMedida.value,
        "presentacion": presentacion.value,
        "principal_indicacion": prin_indicacion.value,
        "contraindicaciones": contraInd.value,
        "concentración": consentracion.value,
        "unidades_en_envase": unidadEnvase.value,
        "precio_unitario": precioUnitario.value,
        "foto": foto.value,
        "estatus": productos[indiceProductoSeleccionado].estatus
    };

    productos[indiceProductoSeleccionado] = producto;

    loadTable();
    cleanInputs();

    indiceProductoSeleccionado = null;
}


function cleanInputs(){
   
    nombreProducto.value = "";
    nombreGen.value="";
    formaFarmaceutica.value= "";
    unidadMedida.value= "";
    presentacion.value= "";
    contraInd.value="";
    prin_indicacion.value= "";
    consentracion.value= "";
    unidadEnvase.value= "";
    precioUnitario.value= "";
    foto.value= "";
}

export function loadTable(){
  let formulario = document.getElementById("filtros");
    formulario.addEventListener("submit", function(event){
        event.preventDefault();
    });

    let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();

    let html = "";
    productos.forEach(function(producto){
        console.log(producto.nombre)
        if(textToSeach == producto.nombre.toLowerCase() ||
            textToSeach==producto.nombre_generico.toLowerCase() ||
            textToSeach==producto.forma_farmaceutica.toLowerCase() ||
            textToSeach==producto.unidad_de_medida.toLowerCase() ||
            textToSeach==producto.presentacion.toLowerCase() ||
            textToSeach==producto.principal_indicacion.toLowerCase() ||
            textToSeach==producto.contraindicaciones.toLowerCase() ||
            textToSeach==producto.concentración.toLowerCase() ||
            textToSeach==producto.unidades_en_envase.toLowerCase() ||
            textToSeach==producto.precio_unitario.toLowerCase() ||
            textToSeach==producto.foto.toLowerCase() ||
            textToSeach==""){
        if (document.getElementById("mostrar_inactivos").checked || producto.estatus == 1){
                    // Crear la variable registro
                    let registro = 
                    "<tr class='row-data' onclick='controller.selectProducto(" + productos.indexOf(producto) + ")'>" + 
                    "<td>" + producto.id_producto +
                    "</td><td>" + producto.nombre +
                    "</td><td>" + producto.nombre_generico +
                    "</td></tr>";
                    // Sumar la variable registro al codigo html
                    html += registro;
        }
                }
    });
        document.getElementById("tblProducto").innerHTML = html;
    }

    
        
    
    

