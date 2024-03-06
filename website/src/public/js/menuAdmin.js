//* COMPORTAMIENTO
const formCaract = document.querySelector("form.form_caracteristica");
const formMarca = document.querySelector("form.form_marca");
const formCateg = document.querySelector("form.form_categoria");

const buttonCaract = document.querySelector("button.btnCaracteristica");
const buttonMarca = document.querySelector("button.btnMarca");
const buttonCateg = document.querySelector("button.btnCategoria");

const buttonGuardar = document.querySelector("button.guardar")

buttonCaract.addEventListener("click", function (e) {
  //e.preventDefault();
  formCaract.classList.add("form_caracteristica_mostrar");
  formMarca.classList.remove("form_marca_mostrar");
  formCateg.classList.remove("form_categoria_mostrar");
  buttonMarca.classList.add("oculto")
  buttonCateg.classList.add("oculto")
});

buttonMarca.addEventListener("click", function (e) {
  //e.preventDefault();
  formMarca.classList.add("form_marca_mostrar");
  formCaract.classList.remove("form_caracteristica_mostrar");
  formCateg.classList.remove("form_categoria_mostrar");
  buttonCaract.classList.add("oculto")
  buttonCateg.classList.add("oculto")
});


buttonCateg.addEventListener("click", function (e) {
  //e.preventDefault();
  formCateg.classList.add("form_categoria_mostrar");
  formMarca.classList.remove("form_marca_mostrar");
  formCaract.classList.remove("form_caracteristica_mostrar");
  buttonCaract.classList.add("oculto")
  buttonMarca.classList.add("oculto")
});


//* FALTAN VALIDACIONES
