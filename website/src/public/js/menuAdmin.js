//* COMPORTAMIENTO
const formCaract = document.querySelector("form.form_caracteristica");
const formMarca = document.querySelector("form.form_marca");
const formCateg = document.querySelector("form.form_categoria");

const buttonCaract = document.querySelector("button.btnCaracteristica");
const buttonMarca = document.querySelector("button.btnMarca");
const buttonCateg = document.querySelector("button.btnCategoria");

const buttonGuardar = document.querySelector("button.guardar");

buttonCaract.addEventListener("click", function (e) {
  //e.preventDefault();
  formCaract.classList.add("form_caracteristica_mostrar");
  formMarca.classList.remove("form_marca_mostrar");
  formCateg.classList.remove("form_categoria_mostrar");
  buttonMarca.classList.add("oculto");
  buttonCateg.classList.add("oculto");
});

buttonMarca.addEventListener("click", function (e) {
  //e.preventDefault();
  formMarca.classList.add("form_marca_mostrar");
  formCaract.classList.remove("form_caracteristica_mostrar");
  formCateg.classList.remove("form_categoria_mostrar");
  buttonCaract.classList.add("oculto");
  buttonCateg.classList.add("oculto");
});

buttonCateg.addEventListener("click", function (e) {
  //e.preventDefault();
  formCateg.classList.add("form_categoria_mostrar");
  formMarca.classList.remove("form_marca_mostrar");
  formCaract.classList.remove("form_caracteristica_mostrar");
  buttonCaract.classList.add("oculto");
  buttonMarca.classList.add("oculto");
});


//* VALIDACIONES
const inputValidationsMarca = [
  {
    inputName: "nombreMarca",
    type: ["onTime", "submit"],
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "La marca es obligatoria",
      },
      {
        validator: async (input) => {
          try {
            const res = await fetch(`/products/validate/brand/${input}`);
            const data = await res.json();
            return !data.existe;
          } catch (error) {
            return false
          }
        },
        errorMsg: "La marca ya esta cargada",
      },
    ],
  }
];

const inputValidationsCategoria = [
  {
    inputName: "nombreCategoria",
    type: ["onTime", "submit"],
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "La categoria es obligatoria"
      },
      {
        validator: async (input) => {
          const res = await fetch(`/products/validate/category/${input}`)
          const data = await res.json()
          return !data.existe
        },
        errorMsg: "La categoria ya esta cargada"
      }
    ]
  },
]

const inputValidationsCaracteristicas = [
  {
    inputName: "nombreCaracteristica",
    type: ["onTime", "submit"],
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "El nombre de la caracteristica es obligatorio"
      }
    ]
  },
  {
    inputName: "descriptCaracteristica",
    type: ["onTime", "submit"],
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "La descripcion de la caracteristica es obligatoria"
      }
    ]
  }
]

const validarCaract = async (caracteristica) => {
  try { 
    const res = await fetch(`/products/validate/feature/${caracteristica}`)
    const data = await res.json()
    console.log(data);
    return !data.existe
  } catch (error) {
    console.log(error);
  }
}

// const forms = [formCaract, formMarca, formCateg]
//* VALIDACION DE LA MARCA
window.addEventListener("load", function () {
  let errorsMarca;
  //* validacion keyup
  inputValidationsMarca.forEach((inputToValidate) => {
    if(inputToValidate.type.includes("onTime")) {
      
      const input = formMarca[inputToValidate.inputName];
      console.log(input);
      const inputContainer = input.parentElement;
      
      input.addEventListener("keyup", async function (e) {
        for (const validation of inputToValidate.validations) {
          console.log(e.target.value);
          const isValid = await validation.validator(e.target.value);

          if (!isValid) {
            inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
            errorsMarca = validation.errorMsg
            break
          } else {
            errorsMarca = ''
            inputContainer.querySelector(".error").innerHTML = "";
          }
        }
      })
    }
  });
  //* VALIDACION EN SUBMIT
  formMarca.addEventListener("submit", function (e) {
    //no se envia formulario
    e.preventDefault();

    //por cada objeto de inputValidationsMarca
    inputValidationsMarca.forEach( async (inputToValidate) => {
      if (inputToValidate.type.includes("submit")) {
        //se obtiene input html
        const input = formMarca[inputToValidate.inputName];

        //se obtiene padre de input - en este caso seria el div
        const inputContainer = input.parentElement;

        //por cada objeto de inputValidationsMarca, se cicla sobre el array de validaciones
        for (const validation of inputToValidate.validations) {
          //se aplica el validador sobre el valor actual del input
          const isValid = await validation.validator(input.value);
          console.log(isValid);

          //si es invalido -> muestra error + guarda en array
          if (!isValid) {
            errorsMarca = validation.errorMsg
            inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
            return;
          } else {
            inputContainer.querySelector(".error").innerHTML = "";
          }
        }

        inputContainer.querySelector(".error").innerHTML = "";
      }
    });

    //si no hay errores, envia el form. Si hay errores, muestra mensaje
    console.log(errorsMarca); 
    if (errorsMarca == '') {
      formMarca.submit();
    } 
    // else {
    //   const spanErrorSubmit = document.querySelector("span.errorSubmit");
    //   spanErrorSubmit.innerHTML = "Completa correctamente todos los campos";
    //   spanErrorSubmit.classList.add("error-submit");
    // }
  });



//* VALIDACION DE LA CATEGORIA
  let errorsCategoria;
  //* validacion keyup
  inputValidationsCategoria.forEach((inputToValidate) => {
    if(inputToValidate.type.includes("onTime")) {
      
      const input = formCateg[inputToValidate.inputName];
      console.log(input);
      const inputContainer = input.parentElement;
        
      input.addEventListener("keyup", async function (e) {
        for (const validation of inputToValidate.validations) {
          console.log(e.target.value);
          const isValid = await validation.validator(e.target.value);

          if (!isValid) {
            inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
            errorsCategoria = validation.errorMsg
            break
          } else {
            errorsCategoria = ''
            inputContainer.querySelector(".error").innerHTML = "";
          }
        }
      })
    }
  });
  //* VALIDACION EN SUBMIT
  formCateg.addEventListener("submit", function (e) {
    //no se envia formulario
    e.preventDefault();

    //por cada objeto de inputValidations
    inputValidationsCategoria.forEach( async (inputToValidate) => {
      if (inputToValidate.type.includes("submit")) {
        //se obtiene input html
        const input = formCateg[inputToValidate.inputName];

        //se obtiene padre de input - en este caso seria el div
        const inputContainer = input.parentElement;

        //por cada objeto de inputValidations, se cicla sobre el array de validaciones
        for (const validation of inputToValidate.validations) {
          //se aplica el validador sobre el valor actual del input
          const isValid = await validation.validator(input.value);
          console.log(isValid);

          //si es invalido -> muestra error + guarda en array
          if (!isValid) {
            inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
            errorsCategoria = validation.errorMsg
            return;
          }
        }

        inputContainer.querySelector(".error").innerHTML = "";
      }
    });

    //si no hay errores, envia el form. Si hay errores, muestra mensaje
    if (errorsCategoria == '') {
      formCateg.submit();
    } 
    // else {
    //   const spanErrorSubmit = document.querySelector("span.errorSubmit");
    //   spanErrorSubmit.innerHTML = "Completa correctamente todos los campos";
    //   spanErrorSubmit.classList.add("error-submit");
    // }
  });



  //* VALIDACION DE LAS CARACTERISTICAS
  //* validacion keyup
  let errorsCaracteristicas;
  inputValidationsCaracteristicas.forEach((inputToValidate) => {
    if(inputToValidate.type.includes("onTime")) {
      
      const input = formCaract[inputToValidate.inputName];
      console.log(input);
      const inputContainer = input.parentElement;
        
      input.addEventListener("keyup", function (e) {
        for (const validation of inputToValidate.validations) {
          // console.log(e.target.value);
          const isValid =  validation.validator(e.target.value);

          if (!isValid) {
            inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
            errorsCaracteristicas = validation.errorMsg
            break
          } else {
            inputContainer.querySelector(".error").innerHTML = "";
          }
        }
      })
    }
  });

  // //* VALIDACION EN SUBMIT
  formCaract.addEventListener("submit", async function (e) {
    //no se envia formulario
    e.preventDefault();

    const inputNombre = formCaract["nombreCaracteristica"]
    const inputDescrip = formCaract["descriptCaracteristica"]
    // console.log(inputNombre.value );
    // console.log(inputDescrip.value );

    const inputContainer = inputDescrip.parentElement

    if (inputNombre.value != '' && inputDescrip.value != '') {
      
      const isValid = await validarCaract(`${inputNombre.value}: ${inputDescrip.value}`)
      console.log('entro al if ' + isValid);

      if (!isValid) {
        inputContainer.querySelector(".error").innerHTML = 'Esta caracteristica ya existe';
        errorsCaracteristicas = 'Esta caracteristica ya existe'
      } else {
        inputContainer.querySelector(".error").innerHTML = '';
        errorsCaracteristicas = ''
      }
    } else {
      inputContainer.querySelector(".error").innerHTML = 'Ambos campos son obligatorios';
      errorsCaracteristicas = 'Ambos campos son obligatorios'
    }

    console.log(errorsCaracteristicas);
    if (errorsCaracteristicas == '') {
      formCaract.submit();
    } 
  });
});






