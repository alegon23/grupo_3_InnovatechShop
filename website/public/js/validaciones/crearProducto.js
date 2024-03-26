const inputValidations = [
    {
        inputName: "nombre",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El nombre es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input, {min: 5}),
                errorMsg: "El nombre es demasiado corto"
            }
        ]
    },
    {
        inputName: "marca",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "Debes seleccionar la marca del producto"
            }
        ]
    },
    {
        inputName: "categoria",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "Debes seleccionar una categoria"
            }
        ]
    },
    {
        inputName: "precio",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El precio es obligatorio"
            },
            {
                validator: (input) => validator.isNumeric(input),
                errorMsg: "El precio debe ser un numero"
            },
            {
                validator: (input) => (input > 0),
                errorMsg: "El precio debe ser mayor que cero"
            }
        ]
    },
    {
        inputName: "porcentaje",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El porcentaje es obligatorio"
            },
            {
                validator: (input) => validator.isNumeric(input),
                errorMsg: "El porcentaje debe ser un numero"
            },
            {
                validator: (input) => (input >= 0),
                errorMsg: "El porcentaje debe ser mayor que cero"
            }
        ]
    },
    {
        inputName: "esDestacado",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "Debes indicar si el producto es destacado"
            }
        ]
    },
    {
        inputName: "stock",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El stock es obligatorio"
            },
            {
                validator: (input) => validator.isNumeric(input),
                errorMsg: "El stock debe ser mayor o igual a cero"
            },
            {
                validator: (input) => (input >= 0),
                errorMsg: "El stock debe ser mayor que cero"
            }
        ]
    },
    {
        inputName: "imagenPrincipal",
        type: ["submit"],
        validations: [
            {
                validator: (input) => {
                    const fileExtension = input.split(".")[1];
                    if (fileExtension) {
                        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                        return acceptedExtensions.includes(fileExtension)
                    } else{ 
                        return true
                    }
                },
                errorMsg: "Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif"
            },
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "La imagen principal es obligatoria"
            }
        ]
    },
    {
        inputName: "imagenesExtra",
        type: ["submit"],
        validations: [
            {
                validator: (input) => {
                    const fileExtension = input.split(".")[1];
                    if (fileExtension) {
                        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                        return acceptedExtensions.includes(fileExtension)
                    } else{ 
                        return true
                    }
                },
                errorMsg: "Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif"
            },
        ]
    },
    {
        inputName: "descripcion",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "La descripcion es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input, {min: 20}),
                errorMsg: "La descripcion debe tener 20 o mas caracteres"
            }
        ]
    }
]

//* VALIDACION ON-TIME
window.addEventListener("load", function () {
    const form = document.querySelector("form.contenedor-producto");

    inputValidations.forEach((inputToValidate) => {
        if(inputToValidate.type.includes("onTime")) {
            const input = form[inputToValidate.inputName];
    
            const inputContainer = input.parentElement;
            
            input.addEventListener("keyup", function (e) {
                for (const validation of inputToValidate.validations) {
    
                    const isValid = validation.validator(e.target.value);
    
                    if (!isValid) {
                        inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                        break
                    } else {
                        inputContainer.querySelector(".error").innerHTML = "";
                    }
                }
            })

            input.addEventListener("change", function(e) {
                for (const validation of inputToValidate.validations) {
    
                    const isValid = validation.validator(e.target.value);
    
                    if (!isValid) {
                        inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                        break
                    } else {
                        inputContainer.querySelector(".error").innerHTML = "";
                    }
                }
            })
        }
    });

    //* valida que las caracteristicas no vengan vacias y sean distintas
    //valido los select
    let selectValores=[];

    let errorSelect = []
    //obtengo todos los select con clase caracteristica
    const selects = document.querySelectorAll("select.caracteristica")

    selects.forEach((select)=>{
        //meto los valores actuales de los select en el array selectValores
        selects.forEach((select)=>{
            selectValores.push(select.value)
        });
    
        //obtengo el padre del select actual
        const padreError = select.parentElement
        //agrego un evento change que se dispare cuando cambie el valor de la caracteristica
        select.addEventListener("change", function (e) {
            //determino si el valor al que se cambio la caracteristica ya se encuntra seleccionado
            const valido= selectValores.includes(select.value);
            selectValores=[];
            if (valido) {
                errorSelect.push("Esta caracteristica debe ser diferente")
                padreError.querySelector(".error").innerHTML ="Esta caracteristica debe ser diferente";
                document.querySelector("div.caracteristicas-del-producto span.error").innerHTML = ""
            } else {
                // errorSelect.pop()
                padreError.querySelector(".error").innerHTML = "";
            }
            //console.log(errorSelect);
            //meto los valores actuales de los select en el array selectValores
            selects.forEach((select)=>{
                selectValores.push(select.value)
            });
        })
    })

    //* valida si el producto es destacado no puede tener descuento
    const porcentaje = form["porcentaje"];
    const selectDestacado = form["esDestacado"]

    selectDestacado.addEventListener("change", function() {
        const selectDestacadoParent = selectDestacado.parentElement;
        const porcentajeParent = porcentaje.parentElement;

        if (selectDestacado.value == 'true' && porcentaje.value != 0) {
            selectDestacadoParent.querySelector('.error').innerHTML = 'Los productos con descuento no pueden ser destacados'
        } else {
            if (selectDestacado.value == '') {
                selectDestacadoParent.querySelector('.error').innerHTML = inputValidations[5].validations[0].errorMsg
            } else {
                porcentajeParent.querySelector('.error').innerHTML = ''
                selectDestacadoParent.querySelector('.error').innerHTML = ''
            }
        }
    })

    porcentaje.addEventListener("change", function(e) {
        const selectDestacadoParent = selectDestacado.parentElement;
        const porcentajeParent = porcentaje.parentElement;
        
        if (selectDestacado.value == 'true' && porcentaje.value != 0) {
            porcentajeParent.querySelector('.error').innerHTML = 'Los productos con descuento no pueden ser destacados'
        } else {
            if (porcentajeParent.value == '') {
                porcentajeParent.querySelector('.error').innerHTML = inputValidations[4].validations[0].errorMsg
            } else {
                selectDestacadoParent.querySelector('.error').innerHTML = ''
                porcentajeParent.querySelector('.error').innerHTML = ''
            }
        }
    })

    //* validacion de imagenes
    //funcion que valida  imagenes
    const extensiones=["jpg","jpeg","png","gif"];
    var isExtension=function(inputValue) {
        const imagen=inputValue;
        const extension=imagen.split(".");
        return (extensiones.includes(extension[1]))
    };

    //capturo la imagen principal
    const inputImagenPrincipal = form["imagenPrincipal"];
    //capturo el padre de la imagen
    const container =inputImagenPrincipal.parentElement;

    //evento change que se dispara cuando se sube una imagen
    inputImagenPrincipal.addEventListener("change", function(e) {

        const valid = isExtension(inputImagenPrincipal.value);
        if (!inputImagenPrincipal.value) {
            container.querySelector('.error').innerHTML = inputValidations[7].validations[1].errorMsg
        } else {
            if (!valid) {
                container.querySelector(".error").innerHTML = "Las extensiones permitidas son .jpg, .jpg, .png, .gif";
            }else{
                container.querySelector(".error").innerHTML = "";
            }
        }
    })

    //capturo las imagenes extras
    const inputImagenesExtra = form["imagenesExtra"];
    const conteiner=inputImagenesExtra.parentElement;
    //evento change que se dispara cuando se sube una imagen extra
    inputImagenesExtra.addEventListener("change", function(e) {
        const archivosSubidos = inputImagenesExtra.files;
        for (const archivo of archivosSubidos){
            const valid = isExtension(archivo.name);
            if (!valid) {
                conteiner.querySelector(".error").innerHTML = "Las extensiones permitidas son .jpg, .jpg, .png, .gif";
                break;
            }else{
                conteiner.querySelector(".error").innerHTML = "";
            }
        }
    })


    //* VALIDACION EN SUBMIT
    form.addEventListener("submit", function (e) {
        //no se envia formulario
        e.preventDefault();

        //array de errores
        const errores = [];

        //por cada objeto de inputValidations
        inputValidations.forEach((inputToValidate) => {
            if(inputToValidate.type.includes("submit")) {
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
            }
        });

        //obtengo todos los select con clase caracteristica
        const selects=document.querySelectorAll("select.caracteristica")
        const errorPadre = document.querySelector('div.caracteristicas-del-producto')

        for (const select of selects) {
            if (select.value === '') {
                errores.push('Todas las caracteristicas son obligatorias')
                errorPadre.querySelector('.error').innerHTML = 'Todas las caracteristicas son obligatorias'
                break
            }
        }

        //validacion del porcentaje y producto destacado
        const porcentaje = form["porcentaje"];
        const destacado = form["esDestacado"]
        const porcentajeParent = porcentaje.parentElement;


        if (porcentaje.value == '') {
            porcentajeParent.querySelector('.error').innerHTML = inputValidations[4].validations[0].errorMsg
        } else {
            if (porcentaje.value != 0 && destacado.value === 'true') {
                porcentajeParent.querySelector('.error').innerHTML = 'Un producto destacado no puede tener descuento'
            } else {
                porcentajeParent.querySelector('.error').innerHTML = ''
            }
        }

        //console.log(errorSelect.length);
        //console.log(errores);
        //si no hay errores, envia el form. Si hay errores, muestra mensaje
        if (errores.length == 0 && errorSelect.length == 0) {
            form.submit();
        } else {
            const spanErrorSubmit = document.querySelector("span.errorSubmit");
            spanErrorSubmit.innerHTML = "Completa correctamente todos los campos"
            spanErrorSubmit.classList.add("error-submit")
            errorSelect = []
        }
    })
});