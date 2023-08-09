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
            Bienvenido a Sicefa Sucursal
        </div>
    </div>`;
    changeActive("home");
    main.innerHTML = html;
}

function pedido() {
    fetch("./modules/moduloCompra/vistaCompra.html")
    .then( 
        function (response) {return response.text()}
    )
    .then(
        function (html) {
            changeActive("pedido");
            main.innerHTML = html;
            import("../modules/moduloCompra/controllerCompra.js").then((module) => {
                controller = module;
                controller.añadirCampos();
            });
        }
    );
}

function producto() {
    let html = "";
    changeActive("producto")
    main.innerHTML = html;
}

function empleado() {
    let html = "";
    changeActive("empleado")
    main.innerHTML = html;
}
function cliente() {
    let html = "";
    changeActive("cliente")
    main.innerHTML = html;
}
function venta() {
    let html = "";
    changeActive("venta")
    main.innerHTML = html;
}
function changeActive(element) {
    let icon;
    icon = document.getElementById(active);
    icon.classList.remove("active");
    icon = document.getElementById(element);
    icon.classList.add("active")
    active = element;
}