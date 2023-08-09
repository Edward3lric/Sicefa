var usuarios = [];
var idUsuarioLogueado;

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
  let userFound = false;
  usuarios.forEach(function(usuario){
    if (nombreUsuario == usuario.nombre_de_usuario && contraseña == usuario.contraseña){
      if (usuario.empleado.sucursal.nombre == "Matriz"){
        let url = "../sicefaCentral.html" +
          "?id_usuario=" + encodeURIComponent(usuario.id_usuario);
        window.location.href = url;
        userFound = true;
      } else {
        let url = "../sicefaSucursal.html" + 
          "?id_usuario=" + encodeURIComponent(usuario.id_usuario) +
          "&sucural=" + encodeURIComponent(usuario.empleado.sucursal.nombre);
        window.location.href = url;
        userFound = true;
      }
    }
  });
  if (userFound === false){
    alert("Usuario Incorrecto");
  }
}

export function añadirNombre(){
  // Obtener el id del usuario Logueado
  let url = window.location.href;
  let urlObj = new URL(url);
  idUsuarioLogueado = urlObj.searchParams.get("id_usuario");

  // Cargar datos desde el archivo JSON
  fetch("modules/moduloUsuario/dataUsuario.json")
  .then(response => {
      return response.json();
  }).then(
      function(jsondata){
          if (usuarios.length === 0){
              usuarios = jsondata;
          }
          let usuarioLogueado = usuarios[parseInt(idUsuarioLogueado) - 1];
          document.getElementById("user-name").innerText = usuarioLogueado.empleado.persona.nombre
            + " " + usuarioLogueado.empleado.persona.a_paterno
            + " " + usuarioLogueado.empleado.persona.a_materno;
      }
  );
}

export function cambiarPassword(){
  let confirmacion = window.confirm("¿Estás seguro de que deseas cambiar la contraseña?");
  let newPassword = document.getElementById("password-text").value;

  if (confirmacion) {
    usuarios[idUsuarioLogueado - 1].contraseña = newPassword;
    alert("Contraseña cambiada exitosamente");
    document.getElementById("password-text").value = "";
  } else {
    alert("Cambio de contraseña cancelado");
  }
}