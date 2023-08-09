var main = document.getElementById("miMain");
var active = "home";
var controller;

function home() {
    let html = `
    <div class="contenedor">
        <div class="inferior">
            <img src="./img/logo.png" alt="">
        </div>
        <div class="superior">
            Bienvenido a Sicefa Central
        </div>
    </div>`;
    changeActive("home");
    main.innerHTML = html;
}

function sucursal() {
    fetch("../modules/moduloSucursal/vistaSucursal.html")
    .then( 
        function (response) {return response.text()}
    )
    .then(
        function (html) {
            changeActive("sucursal");
            main.innerHTML = html;
            import("../modules/moduloSucursal/controllerSucursal.js").then((module) => {
                controller = module
                controller.añadirCampos();
            });
        }
    );
}

function producto() {
    let html = "";
    changeActive("producto");
    main.innerHTML = html;
}

function pedido() {
    let html = "";
    changeActive("pedido");
    main.innerHTML = html;
}
function changeActive(element) {
    let icon;
    icon = document.getElementById(active);
    icon.classList.remove("active");
    icon = document.getElementById(element);
    icon.classList.add("active");
    active = element;
}
