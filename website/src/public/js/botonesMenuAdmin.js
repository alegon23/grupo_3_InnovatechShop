window.addEventListener("load",function(){
    const formBorrarCaracteristica = document.querySelector("form.form_borrar_caracteristica");
    const formBorrarMarca = document.querySelector("form.form_borrar_marca");
    const formBorrarCategoria = document.querySelector("form.form_borrar_categoria");
    
    const borrarCaracteristica = document.querySelector("button.btnBorrarCaracteristica");
    const borrarMarca = document.querySelector("button.btnBorrarMarca");
    const borrarCategoria = document.querySelector("button.btnBorrarCategoria");

    borrarMarca.addEventListener("click", function(e) {
        formBorrarMarca.classList.add("form_marca_mostrar");
        borrarCaracteristica.classList.add("oculto");
        borrarCategoria.classList.add("oculto");
    })

    borrarCategoria.addEventListener("click", function(e) {
        formBorrarCategoria.classList.add("form_categoria_mostrar");
        borrarCaracteristica.classList.add("oculto");
        borrarMarca.classList.add("oculto");
    })

    borrarCaracteristica.addEventListener("click", function(e) {
        formBorrarCaracteristica.classList.add("form_categoria_mostrar");
        borrarCategoria.classList.add("oculto");
        borrarMarca.classList.add("oculto");
    })
})
