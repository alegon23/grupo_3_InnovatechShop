// creamos una funcion para validar las extensiones de las imagenes
const validacionExtension = (input) => {
    // cortamos el nombre para obtener solo la extension
    const fileExtension = input.split(".")[1];
    //preguntamos si viene ya que es opcional
    if (fileExtension) {
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        return acceptedExtensions.includes(fileExtension)
    } else { 
        return true
    }
}

// creamos un array de validaciones(tal cual como en clase), que contiene el nombre del imput, el tipo de evento que utilizara y sus validaciones (libreria validator)
const inputValidations = [
    {
        inputName: "nombre",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El nombre es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input, {min: 2}),
                errorMsg: "El nombre es muy corto"
            }
        ]
    },
    {
        inputName: "apellido",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El apellido es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input, {min: 2}),
                errorMsg: "El apellido es muy corto"
            }
        ]
    },
    {
        inputName: "email",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El email es obligatorio"
            },
            {
                validator: (input) => validator.isEmail(input),
                errorMsg: "El email tiene un formato incorrecto"
            },
            {
                // creamos una func asincronica para busca en la base de datos
                validator: async (input) => {
                    // luego creamos un endpoint que lo llamamos utulizando el metodo fetch
                    const res = await fetch(`/users/validate/${input}`)
                    const data = await res.json()
                    return !data.existe
                },
                errorMsg: "El email ya existe"
            }
        ]
    },
    {
        inputName: "contrasenia",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "La contraseña es obligatoria"
            },
            {
                validator: (input) => validator.isLength(input, {min: 8}),
                errorMsg: "La contraseña debe tener al menos 8 caracteres"
            },
            {
                validator: (input) => validator.isStrongPassword(input, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false }),
                errorMsg: "La contraseña debe al menos 1 mayúscula, 1 minúscula y 1 número"
            }
        ]
    },
    {
        inputName: "fecha",
        type: ["keyup", "submit"],
        validations: [
            {
                //por ejemplo poner 31/02
                validator: (input) => validator.isISO8601(input),
                errorMsg: "La fecha no tiene formato valido"
            },
            {
                //controla que no se pongan fechas mayores a las de hoy
                validator: (input) => !validator.isAfter(input),
                errorMsg: "La fecha no es valida"
            },
        ]
    },
    {
        inputName: "confirmarContrasenia",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "Debes confirmar la contraseña"
            },
        ]
    },
    {
        inputName: "avatar",
        type: ["submit"],
        validations: [
            {
                validator: (input) => validacionExtension(input),
                errorMsg: "Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif"
            },
        ]
    }
]


//! VALIDACIONES

//* validacion keyup 
//array de errores
let errores = [];

window.addEventListener("load", function () {
    
    // capturamos el formulario 
    const form = document.querySelector("form.contenedor-registro");

    // hacemos un forEach por cada objeto de inputValidations
    inputValidations.forEach((inputToValidate) => {
        if(inputToValidate.type.includes("keyup")) {
            const input = form[inputToValidate.inputName];
    
            const inputContainer = input.parentElement;
            
            // Es una func asincronica porque al utilizar el fetch tmb espera una promesa y se resulven mediante un async await
            input.addEventListener("keyup", async function (e) {
                // por cada objeto de inputValidations, se cicla sobre el array de validaciones
                for (const validation of inputToValidate.validations) {
    
                    const isValid = await validation.validator(e.target.value);
    
                    if (!isValid) {
                        errores.push(validation.errorMsg);
                        inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                        break
                    } else {
                        errores.pop()
                        inputContainer.querySelector(".error").innerHTML = "";
                    }
                }
            })
        }
    });

    //* valida que confirmar contraseña es igual a la contraseña
    const inputConfirm = form["confirmarContrasenia"];
    const inputConfirmContainer = inputConfirm.parentElement;
    const inputPass = form["contrasenia"];

    inputConfirm.addEventListener("keyup", function(e) {
        if (inputPass.value != inputConfirm.value) {
            inputConfirmContainer.querySelector(".error").innerHTML = "No coincide con la contraseña";
            errores.push("No coincide con la contraseña");
        } else {
            errores.pop()
            inputConfirmContainer.querySelector(".error").innerHTML = "";
        }
    })

    //* validacion de archivo onchange
    const inputAvatar = form["avatar"];
    const inputAvatarContainer = inputAvatar.parentElement;

    inputAvatar.addEventListener("change", function(e) {
        if (!validacionExtension(inputAvatar.value)) {
            inputAvatarContainer.querySelector(".error").innerHTML = "Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif";
            errores.push("Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif");
        } else {
            errores.pop()
            inputAvatarContainer.querySelector(".error").innerHTML = "";
        }
    })

    //* validacion de fecha onchange
    const inputFecha = form["fecha"];
    const inputFechaContainer = inputFecha.parentElement;

    inputFecha.addEventListener("change", function(e) {
        
        if (!validator.isISO8601(inputFecha.value) || validator.isAfter(inputFecha.value)) {
            errores.push("Fecha inválida");
            inputFechaContainer.querySelector(".error").innerHTML = "Fecha inválida";
        }else{
            errores.pop();
            inputFechaContainer.querySelector(".error").innerHTML = "";
        }
    })


    //* VALIDACION EN SUBMIT
    form.addEventListener("submit", function (e) {
        //no se envia formulario
        e.preventDefault();

        //hacemos un forEach por cada objeto de inputValidations
        inputValidations.forEach( async (inputToValidate) => {
            if(inputToValidate.type.includes("submit")) {
                //se obtiene input html
                const input = form[inputToValidate.inputName];
    
                //se obtiene padre de input - en este caso seria el div
                const inputContainer = input.parentElement;
    
                //por cada objeto de inputValidations, se cicla sobre el array de validaciones
                for (const validation of inputToValidate.validations) {
                    //se aplica el validador sobre el valor actual del input
                    const isValid = await validation.validator(input.value);
    
                    //si es invalido -> muestra error + guarda en array
                    if (!isValid) {
                        errores.push(validation.errorMsg);
                        inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                        break;
                    } else {
                        errores.pop();
                        inputContainer.querySelector(".error").innerHTML = ''
                    }
                }
            }
        });
        
        //valida si se envia el formulario vacio
        inputValidations.forEach((inputToValidate) => {
            const input = form[inputToValidate.inputName];
            const inputContainer = input.parentElement;
            
            if (input.value == '' && input.type != 'file') {
                inputContainer.querySelector('.error').innerHTML = 'Los campos son obligatorios'
                errores.push('Los campos son obligatorios')
            } else {
                errores.pop()
                inputContainer.querySelector('.error').innerHTML = ''
            }
        });

        //si no hay errores, envia el form. Si hay errores, muestra mensaje
        if (errores.length == 0) {
            form.submit();
        } else {
            const spanErrorSubmit = document.querySelector("span.errorSubmit");
            spanErrorSubmit.innerHTML = "Completa correctamente todos los campos"
            spanErrorSubmit.classList.add("error-submit")
            errores = []
        }
    })
});
