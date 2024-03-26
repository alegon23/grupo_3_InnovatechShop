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
    return !data.existe
  } catch (error) {
    return false
  }
}

window.addEventListener("load", function () {
    //* COMPORTAMIENTO
    const formCaract = document.querySelector("form.form_caracteristica");
    const formMarca = document.querySelector("form.form_marca");
    const formCateg = document.querySelector("form.form_categoria");
  
    const buttonCaract = document.querySelector("button.btnCaracteristica");
    const buttonMarca = document.querySelector("button.btnMarca");
    const buttonCateg = document.querySelector("button.btnCategoria");
  
    buttonCaract.addEventListener("click", function (e) {
      formCaract.classList.add("form_caracteristica_mostrar");
      formMarca.classList.remove("form_marca_mostrar");
      formCateg.classList.remove("form_categoria_mostrar");
      buttonMarca.classList.add("oculto");
      buttonCateg.classList.add("oculto");
    });
  
    buttonMarca.addEventListener("click", function (e) {
      formMarca.classList.add("form_marca_mostrar");
      formCaract.classList.remove("form_caracteristica_mostrar");
      formCateg.classList.remove("form_categoria_mostrar");
      buttonCaract.classList.add("oculto");
      buttonCateg.classList.add("oculto");
    });
  
    buttonCateg.addEventListener("click", function (e) {
      formCateg.classList.add("form_categoria_mostrar");
      formMarca.classList.remove("form_marca_mostrar");
      formCaract.classList.remove("form_caracteristica_mostrar");
      buttonCaract.classList.add("oculto");
      buttonMarca.classList.add("oculto");
    });


  //* VALIDACION DE LA MARCA
  let errorsMarca;
  //* validacion keyup
  inputValidationsMarca.forEach((inputToValidate) => {
    if(inputToValidate.type.includes("onTime")) {
      
      const input = formMarca[inputToValidate.inputName];
      const inputContainer = input.parentElement;
      
      input.addEventListener("keyup", async function (e) {
        for (const validation of inputToValidate.validations) {
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

          //si es invalido -> muestra error + guarda en array
          if (!isValid) {
            errorsMarca = validation.errorMsg
            inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
            break;
          } else {
            errorsMarca = ""
            inputContainer.querySelector(".error").innerHTML = "";
          }
        }
      }
    });

    //si no hay errores, envia el form. Si hay errores, muestra mensaje
    if (errorsMarca == '') {
      formMarca.submit();
    }
  });



//* VALIDACION DE LA CATEGORIA
  let errorsCategoria;
  //* validacion keyup
  inputValidationsCategoria.forEach((inputToValidate) => {
    if(inputToValidate.type.includes("onTime")) {
      
      const input = formCateg[inputToValidate.inputName];
      const inputContainer = input.parentElement;
        
      input.addEventListener("keyup", async function (e) {
        for (const validation of inputToValidate.validations) {
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

          //si es invalido -> muestra error + guarda en array
          if (!isValid) {
            inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
            errorsCategoria = validation.errorMsg
            break;
          } else {
            errorsCategoria = ""
            inputContainer.querySelector(".error").innerHTML = "";
          }
        }

        
      }
    });

    //si no hay errores, envia el form. Si hay errores, muestra mensaje
    if (errorsCategoria == '') {
      formCateg.submit();
    }
  });



  //* VALIDACION DE LAS CARACTERISTICAS
  //* validacion keyup
  let errorsCaracteristicas;
  inputValidationsCaracteristicas.forEach((inputToValidate) => {
    if(inputToValidate.type.includes("onTime")) {
      
      const input = formCaract[inputToValidate.inputName];
      const inputContainer = input.parentElement;
        
      input.addEventListener("keyup", function (e) {
        for (const validation of inputToValidate.validations) {
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

  //* VALIDACION EN SUBMIT
  formCaract.addEventListener("submit", async function (e) {
    //no se envia formulario
    e.preventDefault();

    const inputNombre = formCaract["nombreCaracteristica"]
    const inputDescrip = formCaract["descriptCaracteristica"]

    const inputContainer = inputDescrip.parentElement

    if (inputNombre.value != '' && inputDescrip.value != '') {
      
      const isValid = await validarCaract(`${inputNombre.value}: ${inputDescrip.value}`)

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

    if (errorsCaracteristicas == '') {
      formCaract.submit();
    } 
  });
  
}); 





