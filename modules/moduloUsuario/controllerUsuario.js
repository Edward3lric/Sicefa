var usuarios = [];

var nombreUsuario;
var contraseña;

export function login(){
  nombreUsuario = document.getElementById("usuario").value;
  contraseña = document.getElementById("contraseña").value;

  // Cargar datos desde el archivo JSON
  fetch("../modules/moduloUsuario/dataUsuario.json")
  .then(response => {
      return response.json();
  }).then(
      function(jsondata){
          if (usuarios.length == 0){
              usuarios = jsondata;
          }
          checkUser();
      }
  );
}

function checkUser() {
  usuarios.forEach(function(usuario){
    if (nombreUsuario == usuario.nombre_de_usuario && contraseña == usuario.contraseña){
      if (usuario.empleado.sucursal.nombre == "Matriz"){
        window.location.href = "../sicefaCentral.html";
      } else {
        let url = "../sicefaSucursal.html" + 
          "?nombre=" + encodeURIComponent(usuario.empleado.persona.nombre) +
          "&a_paterno=" +  encodeURIComponent(usuario.empleado.persona.a_paterno) +
          "&a_materno=" + encodeURIComponent(usuario.empleado.persona.a_materno) +
          "&sucursal=" + encodeURIComponent(usuario.empleado.sucursal.nombre);
        window.location.href = url;
      }
    }
  });
}