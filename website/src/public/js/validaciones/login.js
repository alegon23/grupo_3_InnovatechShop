const inputValidations = [
    {
        inputName: "email",
        type: ["onTime", "submit"],
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
                    try { 
                        const res = await fetch(`/users/validate/${input}`)
                        const data = await res.json()
                        return data.existe
                    } catch (error) {
                        return false
                    }
                },
                errorMsg: "El email no esta registrado"
            }
        ]
    },
    {
        inputName: "contrasenia",
        type: ["onTime", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "La contraseña es obligatoria"
            }
        ]
    }
    
    
]

const errores = []

//* VALIDACIONES 
window.addEventListener("load", function () {
    //capturamos el form
    const form = document.querySelector("form.login")

    //* validacion keyup
    //por cada objeto de inputValidations
    inputValidations.forEach((inputToValidate) => {
        if (inputToValidate.type.includes("onTime")) {
            const input = form[inputToValidate.inputName];

            //obtenemos padre de input - en este caso seria el div
            const inputContainer = input.parentElement;
            
            //se le agrega un evento "keyup" que detecta cuando el usuario deja de presionar la tecla
            input.addEventListener("keyup", async function (e) {
                //por cada objeto de inputValidations, se cicla sobre el array de validaciones
                for (const validation of inputToValidate.validations) {

                    //se aplica el validador sobre el valor actual del input
                    const isValid = await validation.validator(e.target.value);
                    //si es invalido muestra error. Sino, no
                    if (!isValid) {
                        errores.push(validation.errorMsg);
                        inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                        break;
                    } else {
                        errores.pop();
                        inputContainer.querySelector(".error").innerHTML = "";
                    }
                    
                }
            })
        }
    });


    //* validacion submit
    form.addEventListener("submit", function (e) {
        //no se envia formulario
        e.preventDefault();

        inputValidations.forEach( async (inputToValidate) => {
            
            const input = form[inputToValidate.inputName];

            //obtenemos padre de input - en este caso seria el div
            const inputContainer = input.parentElement;
            
            for (const validation of inputToValidate.validations) {
                
                //se aplica el validador sobre el valor actual del input
                const isValid = await validation.validator(input.value)
    
                //si es invalido -> muestra error + guarda en array
                if (!isValid) {
                    errores.push(validation.errorMsg);
                    inputContainer.querySelector(".error").innerHTML = validation.errorMsg
                    break;
                } else {
                    errores.pop();
                    inputContainer.querySelector(".error").innerHTML = "";
                }
    
                inputContainer.querySelector(".error").innerHTML = "";
            }
        })
        
        const inputEmail = form["email"];
        const inputPassword = form["contrasenia"];
        
        if (inputEmail.value == '' || inputPassword.value == '') {
            errores.push('Ambos campos son obligatorios')
        }  
        
        //si no hay errores, envia el form. Si hay errores, muestra mensaje
        if (errores.length == 0) {
            form.submit();
        } else {
            const spanErrorSubmit = document.querySelector("span.errorSubmit");
            spanErrorSubmit.innerHTML = "Completa correctamente todos los campos"
            spanErrorSubmit.classList.add("error-submit")
            document.querySelector("h2").style.marginBottom = "10px"
        }
    })
})