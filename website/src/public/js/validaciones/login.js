//let timeOutID;

const inputValidations = [
    {
        inputName: "email",
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
                    //clearTimeout(timeOutID);
                    
                    //timeOutID =
                    //setTimeout(() => {
                    const res = await fetch(`/users/validate/${input}`)
                    const data = await res.json()
                    //console.log(data);
                    return data.existe
                    //}, 1500)
                },
                errorMsg: "El email no existe"
            }
        ]
    },
    {
        inputName: "contrasenia",
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "La contraseña es obligatoria"
            }
        ]
    },

]

//* VALIDACION ON-TIME
window.addEventListener("load", function () {
    //capturamos el form
    const form = document.querySelector("form.login")
    
    //por cada objeto de inputValidations
    inputValidations.forEach((inputToValidate) => {
        //obtenemos input html
        const input = form[inputToValidate.inputName];

        //obtenemos padre de input - en este caso seria el div
        const inputContainer = input.parentElement;
        
        //se le agrega un evento "keyup" que detecta cuando el usuario deja de presionar la tecla
        input.addEventListener("keyup", async function (e) {
            //por cada objeto de inputValidations, se cicla sobre el array de validaciones
            for (const validation of inputToValidate.validations) {

                //se aplica el validador sobre el valor actual del input
                const isValid = await validation.validator(e.target.value);
                //console.log(isValid)
    
                //si es invalido muestra error. Sino, no
                if (!isValid) {
                    inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                    break
                } else {
                    inputContainer.querySelector(".error").innerHTML = "";
                }
            }
        })
    });

    //* VALIDACION EN SUBMIT
    form.addEventListener("submit", function (e) {
        //no se envia formulario
        e.preventDefault();

        //array de errores
        const errores = [];

        //por cada objeto de inputValidations
        inputValidations.forEach( async (inputToValidate) => {
            //se obtiene input html
            const input = form[inputToValidate.inputName];

            //se obtiene padre de input - en este caso seria el div
            const inputContainer = input.parentElement;

            //por cada objeto de inputValidations, se cicla sobre el array de validaciones
            for (const validation of inputToValidate.validations) {
                //se aplica el validador sobre el valor actual del input
                const isValid = await validation.validator(input.value)
                
                console.log(isValid);

                //si es invalido -> muestra error + guarda en array
                if (!isValid) {
                    errores.push(validation.errorMsg);
                    inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                    return;
                }
            }

            inputContainer.querySelector(".error").innerHTML = "";
        });

        //si no hay errores, envia el form. Si hay errores, muestra mensaje
        if (errores.length == 0) {
            // form.submit();
        } else {
            const spanErrorSubmit = document.querySelector("span.errorSubmit");
            spanErrorSubmit.innerHTML = "Completa correctamente todos los campos"
            spanErrorSubmit.classList.add("error-submit")
            document.querySelector("h2").style.marginBottom = "10px"
        }
    })
});
