window.addEventListener("load",function(){
    const cajaBusqueda = document.querySelector("#formBusqueda")
    const botonBusqueda = document.querySelector("#icono-busqueda")

    botonBusqueda.addEventListener("click", function(e) {
        cajaBusqueda.classList.toggle("caja-busqueda")
        cajaBusqueda.classList.toggle("mostrar-busqueda")
    })

    cajaBusqueda.addEventListener("mouseout", function(e) {
        cajaBusqueda.classList.remove("mostrar-busqueda")
        cajaBusqueda.classList.add("caja-busqueda")
    })

    const botonMenuHamburguesa = document.querySelector("#menu-hamburguesa");
    const contenidoHamburguesa = document.querySelector("#contenidoHamburguesa");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    botonMenuHamburguesa.addEventListener("click", function(e) {
        if (botonMenuHamburguesa.innerHTML == '<i class="bi bi-list"></i>') {
            botonMenuHamburguesa.innerHTML = '<i class="bi bi-x-lg"></i>'
        } else {
            botonMenuHamburguesa.innerHTML = '<i class="bi bi-list"></i>'
        }
        contenidoHamburguesa.classList.toggle("ocultar-menu-hamburguesa")
        contenidoHamburguesa.classList.toggle("mostrar-menu-hamburguesa")
        main.classList.toggle("position-fixed")
        footer.classList.toggle("ocultar-footer")
    });
});