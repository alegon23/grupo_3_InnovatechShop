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
                validator: async (input) => {
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
                validator: (input) => input.length > 0 ? validator.isLength(input, {min: 8}) : true,
                errorMsg: "La contraseña debe tener al menos 8 caracteres"
            },
            {
                validator: (input) => input.length > 0 ? validator.isStrongPassword(input, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false }) : true,
                errorMsg: "La contraseña debe al menos 1 mayúscula, 1 minúscula y 1 número"
            }
        ]
    },
]

//* validacion keyup
window.addEventListener("load", function () {
    const form = document.querySelector("form.contenedor-registro");

    inputValidations.forEach((inputToValidate) => {
        if(inputToValidate.type.includes("keyup")) {
            const input = form[inputToValidate.inputName];
    
            const inputContainer = input.parentElement;
            
            input.addEventListener("keyup", async function (e) {
                for (const validation of inputToValidate.validations) {
                    console.log(e.target.value)
    
                    const isValid = await validation.validator(e.target.value);
    
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

        //si no hay errores, envia el form. Si hay errores, muestra mensaje
        if (errores.length == 0) {
            form.submit();
        } else {
            const spanErrorSubmit = document.querySelector("span.errorSubmit");
            spanErrorSubmit.innerHTML = "Completa correctamente todos los campos"
            spanErrorSubmit.classList.add("error-submit")
        }
    })
});
