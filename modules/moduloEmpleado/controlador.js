
var empleados = [];

var indiceEmpleadoSeleccionado;

var nombre;
var a_paterno;
var a_materno;
var genero;
var fecha_nacimiento;
var rfc;
var curp;
var foto;
var domicilio;
var codigo_postal;
var ciudad;
var estado;
var telefono;
var fecha_ingreso;
var puesto;
var salario;
var email;
var estatus;
var fechar, dia, mes, annio, folio, usuario, contrasennia;


export function añadirCampos(){
    

    nombre = document.getElementById("nombre");
    a_paterno = document.getElementById("a_paterno");
    a_materno = document.getElementById("a_materno");
    genero = document.getElementById("genero");
    fecha_nacimiento = document.getElementById("fecha_nacimiento");
    rfc = document.getElementById("rfc");
    curp = document.getElementById("curp")
    foto = document.getElementById("foto");
    domicilio = document.getElementById("domicilio");
    codigo_postal = document.getElementById("codigo-postal");
    ciudad = document.getElementById("ciudad");
    estado = document.getElementById("estado");
    telefono = document.getElementById("telefono");
    fecha_ingreso = document.getElementById("fecha_ingreso");
    puesto = document.getElementById("puesto");
    salario = document.getElementById("salario");
    email = document.getElementById("email");
    estatus = document.getElementById("estatus");
    
    fetch("modules/moduloEmpleado/dataEmpleado.json")
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            if (empleados.length === 0){
                empleados = jsondata;
            }
            loadTable();
        }
    );
}

export function addEmpleado(){
    // Codigo para evitar que se ingreseen datos sin valor
    let inputs = document.querySelectorAll(".row input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].value === ""){
            // Finaliza la funcion
            return;
        }
    } 

    let codigo = parseInt(empleados[empleados.length - 1].codigo_empleado.substring(4,9)) + 1;
    let numero = codigo.toString().padStart(4,'0');

    fechar = new Date();
    annio = fechar.getFullYear();
    
    if ((fechar.getMonth() + 1) < 10)
        mes = "0" + (fechar.getMonth() + 1);
    else mes = "" + (fechar.getMonth() + 1);
    
    if (fechar.getDate() < 10)
        dia = "0" + fechar.getDate();
    else dia = "" + fechar.getDate();
    
    let comp = annio + "-" + mes + "-" + dia;

    annio = "" + annio;
    folio = annio.substring(2,4) + mes +  numero ;


    let empleado = {
        "codigo_empleado": folio,
        "fecha_de_ingreso": comp,
        "puesto": puesto.value,
        "salario_bruto_mensual": salario.value,
        "estatus": 1,
        "persona": {
            "nombre": {
                "nombre": nombre.value,
                "a_Paterno": a_paterno.value,
                "a_Materno": a_materno.value
            },
            "genero": genero.value,
            "fecha_de_Nacimiento": fecha_nacimiento.value,
            "rfc": rfc.value,
            "curp": curp.value,
            "telefono": telefono.value,
            "foto": foto.value,
            "estado": estado.value,
            "ciudad": ciudad.value,
            "cp": codigo_postal.value,
            "domicilio": domicilio.value,
            "email": email.value
        },
        "usuario": {
            "usuario": folio,
            "contrasenia": folio
        }
    }

        empleados.push(empleado);

        loadTable();

        cleanInputs();
    
        indiceEmpleadoSeleccionado = null;
}


export function selectEmpleado(index){

    let empleado = empleados[index]
    nombre.value = empleado.persona.nombre.nombre;
    a_paterno.value = empleado.persona.nombre.a_Paterno;
    a_materno.value = empleado.persona.nombre.a_Materno;
    genero.value = empleado.persona.genero;
    fecha_nacimiento.value = empleado.persona.fecha_de_Nacimiento;
    puesto.value = empleado.puesto;
    salario.value = empleado.salario_bruto_mensual;
    rfc.value = empleado.persona.rfc;
    curp.value = empleado.persona.curp;
    telefono.value = empleado.persona.telefono;
    fecha_ingreso.value = empleado.fecha_de_ingreso;
    foto.value = empleado.persona.foto;
    estado.value = empleado.persona.estado;
    ciudad.value = empleado.persona.ciudad;
    codigo_postal.value = empleado.persona.cp;
    domicilio.value = empleado.persona.domicilio;
    email.value = empleado.persona.email;
    indiceEmpleadoSeleccionado = index;
}
export function deleteEmpleado(){

    empleados[indiceEmpleadoSeleccionado].estatus = 0;
    indiceEmpleadoSeleccionado = null;

    // Cargar Tabla
    loadTable();
    cleanInputs();
}

export function editEmpleado(){
    // Codigo para evitar que se ingreseen datos sin valor
    let inputs = document.querySelectorAll(".row input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].value === ""){
            // Finaliza la funcion
            return;
        }
    } 
    let empleado = {
        "codigo_empleado": empleados[indiceEmpleadoSeleccionado].codigo_empleado,
        "puesto": puesto.value,
        "salario_bruto_mensual": salario.value,
        "estatus": empleados[indiceEmpleadoSeleccionado].estatus,
        "persona": {
            "nombre": {
                "nombre": nombre.value,
                "a_Paterno": a_paterno.value,
                "a_Materno": a_materno.value
            },
            "genero": genero.value,
            "fecha_de_Nacimiento": fecha_nacimiento.value,
            "rfc": rfc.value,
            "curp": curp.value,
            "telefono": telefono.value,
            "foto": foto.value,
            "estado": estado.value,
            "ciudad": ciudad.value,
            "cp": codigo_postal.value,
            "domicilio": domicilio.value,
            "email": email.value
        },
        "usuario": {
            "usuario": empleados[indiceEmpleadoSeleccionado].usuario.usuario,
            "contrasenia": empleados[indiceEmpleadoSeleccionado].usuario.contrasenia
        }
    }
    empleados[indiceEmpleadoSeleccionado] = empleado;
        loadTable();
        cleanInputs();
        indiceEmpleadoSeleccionado = null;
}

function cleanInputs(){
    nombre.value = "";
    a_paterno.value = "";
    a_materno.value = "";
    genero.value = "";
    fecha_nacimiento.value = "";
    rfc.value = "";
    curp.value = "";
    telefono.value = "";
    foto.value = "";
    estado.value = "";
    ciudad.value = "";
    codigo_postal.value = "";
    domicilio.value = "";
    fecha_ingreso.value = "";
    puesto.value = "";
    salario.value = "";
    email.value = "";
}


export function loadTable(){
    let formulario = document.getElementById("filtros");
    formulario.addEventListener("submit", function(event){
        event.preventDefault();
    });

    let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();
    let html = "";
    empleados.forEach(function(empleado){

        if (textToSeach == empleado.persona.nombre.nombre.toLowerCase() ||
            textToSeach == empleado.persona.nombre.a_Paterno.toLowerCase() ||
            textToSeach == empleado.persona.nombre.a_Materno.toLowerCase() ||
            textToSeach == empleado.persona.genero.toLowerCase() ||
            textToSeach == empleado.persona.fecha_de_Nacimiento.toLowerCase() ||
            textToSeach == empleado.persona.rfc.toLowerCase() ||
            textToSeach == empleado.persona.curp.toLowerCase() ||
            textToSeach == empleado.persona.telefono.toLowerCase() ||
            textToSeach == empleado.persona.foto.toLowerCase() ||
            textToSeach == empleado.persona.estado.toLowerCase() ||
            textToSeach == empleado.persona.ciudad.toLowerCase() ||
            textToSeach == empleado.persona.cp.toLowerCase() ||
            textToSeach == empleado.persona.domicilio.toLowerCase() ||
            textToSeach == empleado.persona.email.toLowerCase() ||
            textToSeach == empleado.codigo_empleado.toLowerCase() ||
            textToSeach == empleado.puesto.toLowerCase() ||
            textToSeach == ("" + empleado.salario_bruto_mensual).toLowerCase() ||
            textToSeach == "") {
                    if (document.getElementById("mostrar-inactivos").checked || empleado.estatus == 1){
            let registro = 
            "<tr class='row-data' onclick='controller.selectEmpleado(" + empleados.indexOf(empleado) + ")'>" + 
            "<td>" + empleado.usuario.usuario +
            "</td><td>" + empleado.persona.nombre.nombre + " " + empleado.persona.nombre.a_Paterno + " " + empleado.persona.nombre.a_Materno + 
            "</td><td>" + empleado.puesto +
            "</td></tr>";
            html += registro;
        }
        }
    });
    document.getElementById("tblEmpleado").innerHTML = html;
}