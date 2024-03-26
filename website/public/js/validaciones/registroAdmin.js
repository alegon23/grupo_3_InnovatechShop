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

//array de errores
let errores = [];

window.addEventListener("load", function () {
    const form = document.querySelector("form.contenedor-registro");

    //* validacion keyup
    inputValidations.forEach((inputToValidate) => {
        if(inputToValidate.type.includes("keyup")) {
            const input = form[inputToValidate.inputName];
    
            const inputContainer = input.parentElement;
            
            input.addEventListener("keyup", async function (e) {
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

    //* validacion submit
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        inputValidations.forEach(async (inputToValidate) => {
            if(inputToValidate.type.includes("submit")) {

                const input = form[inputToValidate.inputName];
    
                const inputContainer = input.parentElement;
    
                for (const validation of inputToValidate.validations) {

                    const isValid = await validation.validator(input.value);
    
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
            
            if (input.value == '' && input.type != 'password') {
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
        }
    })
});
