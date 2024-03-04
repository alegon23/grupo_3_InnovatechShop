//* COMPORTAMIENTO
const formCaract = document.querySelector("form.form_caracteristica");
const formMarca = document.querySelector("form.form_marca");
const formCateg = document.querySelector("form.form_categoria");

const buttonCaract = document.querySelector("button.btnCaracteristica");
const buttonMarca = document.querySelector("button.btnMarca");
const buttonCateg = document.querySelector("button.btnCategoria");

buttonCaract.addEventListener("click", function (e) {
  e.preventDefault();
  formCaract.classList.toggle("form_caracteristica_mostrar");
  formMarca.classList.remove("form_marca_mostrar");
  formCateg.classList.remove("form_categoria_mostrar");
  buttonMarca.classList.toggle("oculto")
  buttonCateg.classList.toggle("oculto")
});

buttonMarca.addEventListener("click", function (e) {
  e.preventDefault();
  formMarca.classList.toggle("form_marca_mostrar");
  formCaract.classList.remove("form_caracteristica_mostrar");
  formCateg.classList.remove("form_categoria_mostrar");
  buttonCaract.classList.toggle("oculto")
  buttonCateg.classList.toggle("oculto")
});


buttonCateg.addEventListener("click", function (e) {
  e.preventDefault();
  formCateg.classList.toggle("form_categoria_mostrar");
  formMarca.classList.remove("form_marca_mostrar");
  formCaract.classList.remove("form_caracteristica_mostrar");
  buttonCaract.classList.toggle("oculto")
  buttonMarca.classList.toggle("oculto")
});


//* FALTAN VALIDACIONES
