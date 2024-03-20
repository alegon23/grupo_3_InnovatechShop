window.addEventListener("load",function(){
    const botonUsuario = document.querySelector(".boton-borrarPerfil");
    
    botonUsuario.addEventListener("click", function(e) {
        const resp = confirm("Deseas eliminar tu cuenta?")
        
        if(!resp) e.preventDefault();
    });
});