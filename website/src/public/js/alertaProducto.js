window.addEventListener("load",function(){
    const botonProducto = document.querySelector(".boton-borrar");
    
    botonProducto.addEventListener("click", function(e) {
        const resp = confirm("Deseas eliminar este producto?")
        
        if(!resp) e.preventDefault();
    });

});
   