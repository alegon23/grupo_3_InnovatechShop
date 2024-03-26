//array de validaciones de los inputs del formulario de editar producto
const inputValidations = [
  {
    inputName: "nombre",
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "El nombre es obligatorio",
      },
      {
        validator: (input) => validator.isLength(input, 5),
        errorMsg: "El nombre debe tener al menos 5 caracteres",
      },
    ],
  },
  {
    inputName: "precio",
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "El precio es obligatorio",
      },
      {
        validator: (input) => validator.isNumeric(input),
        errorMsg: "Debes ingresar un valor numerico",
      },
      {
        validator: (input) => (input > -1 ? true : false),
        errorMsg: "El precio debe ser mayor o igual que cero",
      },
    ],
  },
  {
    inputName: "esDestacado",

    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "Debes indicar si el producto es destacado",
      },
    ],
  },
  {
    inputName: "stock",
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "El stock es obligatorio",
      },
      {
        validator: (input) => validator.isNumeric(input),
        errorMsg: "Debes ingresar un valor numerico",
      },
      {
        validator: (input) => input >= 0,
        errorMsg: "El stock debe ser mayor o igual que cero",
      },
    ],
  },
  {
    inputName: "porcentaje",
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "El porcentaje es obligatorio",
      },
      {
        validator: (input) => validator.isNumeric(input),
        errorMsg: "Debes ingresar un valor numerico",
      },
      {
        validator: (input) => (input > -1 ? true : false),
        errorMsg: "El porcentaje debe ser mayor o igual que cero",
      },
    ],
  },
  {
    inputName: "descripcion",
    validations: [
      {
        validator: (input) => !validator.isEmpty(input),
        errorMsg: "La descripción es obligatoria",
      },
      {
        validator: (input) => validator.isLength(input, { min: 20 }),
        errorMsg: "La descripción debe tener al menos 20 caracteres",
      },
    ],
  },
];

//* VALIDACION ON-TIME
window.addEventListener("load", function () {
  //capturamos el form
  const form = document.querySelector("form.producto");

  //por cada objeto de inputValidations
  inputValidations.forEach((inputToValidate) => {
    //obtenemos input html
    const input = form[inputToValidate.inputName];

    //obtenemos padre de input - en este caso seria el div
    const inputContainer = input.parentElement;

    //se le agrega un evento "keyup" que detecta cuando el usuario deja de presionar la tecla
    input.addEventListener("keyup", function (e) {
      //por cada objeto de inputValidations, se cicla sobre el array de validaciones
      for (const validation of inputToValidate.validations) {
        //se aplica el validador sobre el valor actual del input
        const isValid = validation.validator(e.target.value);

        //si es invalido muestra error. Sino, no
        if (!isValid) {
          inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
          break;
        } else {
          inputContainer.querySelector(".error").innerHTML = "";
        }
      }
    });
  });

  //* valida si el producto es destacado no puede tener descuento
  const porcentaje = form["porcentaje"];
  const selectDestacado = form["esDestacado"];

  selectDestacado.addEventListener("change", function () {
    const selectDestacadoParent = selectDestacado.parentElement;
    const porcentajeParent = porcentaje.parentElement;

    if (selectDestacado.value == "true" && porcentaje.value != 0) {
      selectDestacadoParent.querySelector(".error").innerHTML = "Los productos con descuento no pueden ser destacados";
    } else {
      if (selectDestacado.value == "") {
        selectDestacadoParent.querySelector(".error").innerHTML = inputValidations[2].validations[0].errorMsg;
      } else {
        porcentajeParent.querySelector(".error").innerHTML = "";
        selectDestacadoParent.querySelector(".error").innerHTML = "";
      }
    }
  });

  porcentaje.addEventListener("change", function (e) {
    const selectDestacadoParent = selectDestacado.parentElement;
    const porcentajeParent = porcentaje.parentElement;

    if (selectDestacado.value == "true" && porcentaje.value != 0) {
      porcentajeParent.querySelector(".error").innerHTML = "Los productos con descuento no pueden ser destacados";
    } else {
      if (porcentajeParent.value == "") {
        porcentajeParent.querySelector(".error").innerHTML = inputValidations[4].validations[0].errorMsg;
      } else {
        selectDestacadoParent.querySelector(".error").innerHTML = "";
        porcentajeParent.querySelector(".error").innerHTML = "";
      }
    }
  });

  //funcion que valida  imagenes
  const extensiones = ["jpg", "jpeg", "png", "gif"];
  var isExtension = function (inputValue) {
    const imagen = inputValue;
    const extension = imagen.split(".");
    return extensiones.includes(extension[1]);
  };

  //capturo la imagen principal
  const inputImagenPrincipal = form["imagenPrincipal"];
  //capturo el padre de la imagen
  const container = inputImagenPrincipal.parentElement;

  //evento change que se dispara cuando se sube una imagen
  inputImagenPrincipal.addEventListener("change", function (e) {
    const valid = isExtension(inputImagenPrincipal.value);
    if (!valid) {
      container.querySelector(".error").innerHTML = "Las extensiones permitidas son .jpg, .jpg, .png, .gif";
    } else {
      container.querySelector(".error").innerHTML = "";
    }
  });

  //capturo las imagenes extras
  var inputImagenesExtra = form["imagenesExtra"];
  var conteiner = inputImagenesExtra.parentElement;
  //evento change que se dispara cuando se sube una imagen extra
  inputImagenesExtra.addEventListener("change", function (e) {
    const archivosSubidos = inputImagenesExtra.files;
    for (const archivo of archivosSubidos) {
      const valid = isExtension(archivo.name);
      if (!valid) {
        conteiner.querySelector(".error").innerHTML = "Las extensiones permitidas son .jpg, .jpg, .png, .gif";
        break;
      } else {
        conteiner.querySelector(".error").innerHTML = "";
      }
    }
  });

  //valido los select
  var selectValores = [];
  //obtengo todos los select con clase caracteristica
  var selects = document.querySelectorAll("select.caracteristica");
  selects.forEach((select) => {
    //meto los valores actuales de los select en el array selectValores
    selects.forEach((select) => {
      selectValores.push(select.value);
    });
    //obtengo el padre del select actual
    const padreSelect = select.parentElement;
    //agrego un evento change que se dispare cuando cambie el valor de la caracteristica
    select.addEventListener("change", function (e) {
      //determino si el valor al que se cambio la caracteristica ya se encuntra seleccionado
      const valido = selectValores.includes(select.value);
      if (valido) {
        padreSelect.querySelector(".error").innerHTML = "Las caracteristicas deben ser diferentes";
      } else {
        padreSelect.querySelector(".error").innerHTML = "";
      }

      selectValores = [];
      selects.forEach((select) => {
        //meto los valores actuales de los select en el array selectValores
        selects.forEach((select) => {
          selectValores.push(select.value);
        });
      });
    });
  });

  //funcion que compara la cantidad de elementos distintos en el conjunto y en el array
  function tiene_repetidos(array) {
    return new Set(array).size !== array.length;
  }

  //* VALIDACION EN SUBMIT
  form.addEventListener("submit", function (e) {
    //no se envia formulario
    e.preventDefault();

    //array de errores
    const errores = [];

    //por cada objeto de inputValidations
    inputValidations.forEach((inputToValidate) => {
      //se obtiene input html
      const input = form[inputToValidate.inputName];

      //se obtiene padre de input - en este caso seria el div
      const inputContainer = input.parentElement;

      //por cada objeto de inputValidations, se cicla sobre el array de validaciones
      for (const validation of inputToValidate.validations) {
        //se aplica el validador sobre el valor actual del input
        const isValid = validation.validator(input.value);

        //si es invalido -> muestra error + guarda en array
        if (!isValid) {
          errores.push(validation.errorMsg);
          inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
          return;
        }
      }

      inputContainer.querySelector(".error").innerHTML = "";
    });

    //valido las imagenes
    //capturo la imagen principal
    const inputImagenPrincipal = form["imagenPrincipal"];
    //capturo el padre de la imagen
    const container = inputImagenPrincipal.parentElement;
    if (!inputImagenPrincipal.value == "") {
      const valid = isExtension(inputImagenPrincipal.value);
      if (!valid) {
        errores.push("Las extensiones permitidas son .jpg, .jpg, .png, .gif");
        container.querySelector(".error").innerHTML = "Las extensiones permitidas son .jpg, .jpg, .png, .gif";
      } else {
        container.querySelector(".error").innerHTML = "";
      }
    }

    //valido las imagenes extras
    const archivosSubidos = inputImagenesExtra.files;
    for (const archivo of archivosSubidos) {
      const valid = isExtension(archivo.name);
      if (!valid) {
        errores.push("Las extensiones permitidas son .jpg, .jpeg, .png, .gif");
        conteiner.querySelector(".error").innerHTML = "Las extensiones permitidas son .jpg, .jpeg, .png, .gif";
        break;
      } else {
        conteiner.querySelector(".error").innerHTML = "";
      }
    }

    //valido los select en el submit
    var selectValores = [];
    //obtengo todos los select con clase caracteristica
    var selects = document.querySelectorAll("select.caracteristica");
    const padreSelect = document.querySelector("div.caracteristicas-del-producto");
    selects.forEach((select) => {
      //meto los valores actuales de los select en el array selectValores
      selects.forEach((select) => {
        selectValores.push(select.value);
      });
      //determino si el valor al que se cambio la caracteristica ya se encuentra seleccionado
      const valido = tiene_repetidos(selectValores);

      if (valido) {
        errores.push(1);
        padreSelect.querySelector(".error").innerHTML = "Las caracteristicas no se pueden repetir";
      } else {
        padreSelect.querySelector(".error").innerHTML = "";
        selectValores = [];
      }
    });

    //validacion porcentaje
    const porcentaje = form["porcentaje"];
    const destacado = form["esDestacado"];
    const porcentajeParent = porcentaje.parentElement;

    if (porcentaje.value == "") {
      porcentajeParent.querySelector(".error").innerHTML = inputValidations[4].validations[0].errorMsg;
    } else {
      if (porcentaje.value != 0 && destacado.value === "true") {
        porcentajeParent.querySelector(".error").innerHTML = "Un producto destacado no puede tener descuento";
      } else {
        porcentajeParent.querySelector(".error").innerHTML = "";
      }
    }

    //si no hay errores, envia el form. Si hay errores, muestra mensaje
    if (errores.length == 0) {
      form.submit();
    } else {
      const spanErrorSubmit = document.querySelector("span.errorSubmit");
      spanErrorSubmit.innerHTML = "Completa correctamente todos los campos";
      spanErrorSubmit.classList.add("error-submit");
    }
  });
});
