//array de validaciones de los inputs del formulario de editar producto

const inputValidations= [
    {
        inputName: "nombre",
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El nombre es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input,5),
                errorMsg: "El nombre debe tener al menos 5 caracteres"
            }
        ]
    },
    {
        inputName: "precio",
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El precio es obligatorio"
            },
            {
                validator: (input) =>validator.isNumeric(input),
                errorMsg: "Debes ingresar un valor numerico"
            },
            {
                validator:(input) => (input>-1) ? true:false,
                errorMsg: "El precio debe ser mayor o igual que cero"

            },
        ]
    },
    {   
        inputName: "stock",
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El stock es obligatorio"
            },
            {
                validator: (input) =>validator.isNumeric(input),
                errorMsg: "Debes ingresar un valor numerico"
            },
            {   validator: (input) => (input >= 0),
                errorMsg: "El stock debe ser mayor o igual que cero"

            } ]
    },
    {
        inputName: "porcentaje",
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El porcentaje es obligatorio"
            },
            {
                validator: (input) =>validator.isNumeric(input),
                errorMsg: "Debes ingresar un valor numerico"
            },
            {
                validator:(input) => (input>-1) ? true:false,
                errorMsg: "El porcentaje debe ser mayor o igual que cero"

            } ]

    },
    {
        inputName: "descripcion",
        validations: [
        {
            validator: (input) => !validator.isEmpty(input),
            errorMsg: "La descripción es obligatoria"
        },
        {
            validator: (input) => validator.isLength(input, {min: 20}),
            errorMsg: "La descripción debe tener al menos 20 caracteres"
        } 
    ]}

];

//* VALIDACION ON-TIME
window.addEventListener("load", function () {
    //capturamos el form
    const form = document.querySelector("form.producto")
    
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
                //console.log(isValid)
    
                //si es invalido muestra error. Sino, no
                if (!isValid) {
                    inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                    break
                } else {
                    inputContainer.querySelector(".error").innerHTML = "";
                }
            }
        });
    });

    
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
    if (!valid) {
        console.log("error")
        container.querySelector(".error").innerHTML = "Las extensiones permitidas son .jpg, .jpg, .png, .gif";
    }else{
        console.log("muy bien")
        container.querySelector(".error").innerHTML = "";
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

//valido los select
var selectValores=[];
//obtengo todos los select con clase caracteristica
const selects=document.querySelectorAll("select.caracteristica")


    
selects.forEach((select)=>{
     //meto los valores actuales de los select en el array selectValores
    selects.forEach((select)=>{
    selectValores.push(select.value)
});
   
    //obtengo el padre del select actual
    const padreSelect=select.parentElement;
    //agrego un evento change que se dispare cuando cambie el valor de la caracteristica
    select.addEventListener("change", function (e) {
        //determino si el valor al que se cambio la caracteristica ya se encuntra seleccionado
        const valido= selectValores.includes(select.value);
      
        if (valido) {
            
            padreSelect.querySelector(".error").innerHTML ="Las caracteristicas deben ser diferentes";
        } else {
            padreSelect.querySelector(".error").innerHTML = "";
        }

        selectValores=[];
        selects.forEach((select)=>{
            //meto los valores actuales de los select en el array selectValores
           selects.forEach((select)=>{
           selectValores.push(select.value)
       });

        
    });
    
    });

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

    //si no hay errores, envia el form. Si hay errores, muestra mensaje
    if (errores.length == 0) {
        form.submit();
    } else {
        const spanErrorSubmit = document.querySelector("span.errorSubmit");
        spanErrorSubmit.innerHTML = "Completa correctamente todos los campos"
        spanErrorSubmit.classList.add("error-submit")
        document.querySelector("h2").style.marginBottom = "10px"
    }
});

     
   
});
});


 