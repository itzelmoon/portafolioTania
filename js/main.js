

let btnSubmit = document.getElementById("btnEnviar");
let btnPrint= document.getElementById("btnPrint");

btnSubmit.addEventListener("click", function(e){
    e.preventDefault();

let campoMensaje = document.getElementById("campoMensaje");
let valorcorreo = document.getElementById("correo").value;
let correoe = document.getElementById("correo");


    let nombre = document.getElementById("Nombre");

    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");

    if ( nombre.value.length > 3 && nombre.value.length < 20) {
        nombre.classList.add("is-valid"); 
    }
    else{  
        nombre.classList.add("is-invalid");
    }

    for (let i = 0; i < nombre.value.length; i++) {
        console.log(nombre.value.charAt(i));
    
                console.log(nombre.value.charAt(i));
                console.log(nombre.value.charCodeAt(i));
                if((
                
                    (nombre.value.toUpperCase().charCodeAt(i)<65)
                    || //condición or
                    (nombre.value.toUpperCase().charCodeAt(i)>90)
                ) && ((nombre.value.toUpperCase().charCodeAt(i)!=32)) //espacio
                &&((nombre.value.toUpperCase().charCodeAt(i)!=193)) //Á el to uper fue para comparar tambien con las mayuculas
                &&((nombre.value.toUpperCase().charCodeAt(i)!=201)) //É
                &&((nombre.value.toUpperCase().charCodeAt(i)!=205)) //Í
                &&((nombre.value.toUpperCase().charCodeAt(i)!=211)) //Ó
                &&((nombre.value.toUpperCase().charCodeAt(i)!=218)) //Ú
                &&((nombre.value.toUpperCase().charCodeAt(i)!=209)) //Ñ

                ) {
                        nombre.classList.remove("is-valid");
                        nombre.classList.add("is-invalid");
                        break;
                } //if
            }//for

            if (campoMensaje.value.length >= 10) { //validacion Nombre
                campoMensaje.classList.remove("is-invalid");
                campoMensaje.classList.add("is-valid");
            } else {
                campoMensaje.classList.remove("is-valid");
                campoMensaje.classList.add("is-invalid");
            }


            if ( asunto.value.length > 3 && asunto.value.length < 20) {
                asunto.classList.add("is-valid"); 
            }
            else{  
                asunto.classList.add("is-invalid");

}

function validarCorreo (correo) {
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let verificar = expReg.test(correo);
    console.log(verificar)
    if(verificar){
        correoe.classList.remove("is-invalid");
        correoe.classList.add("is-valid");
    } else {
        correoe.classList.remove("is-valid");
        correoe.classList.add("is-invalid");
    }
}
validarCorreo(valorcorreo);

btnPrint.addEventListener("click",function(e){
    e.preventDefault();
    window.print();
});

});


let rate = parseFloat(document.getElementById("inputRate").value);
let iva = document.getElementById("checkIVA").checked;
let extras = document.getElementById("inputExtras");
let changes= parseFloat(document.getElementById("inputChanges").value);
let email= document.getElementById("inputEmail").value;
let name= document.getElementById("inputName").value;

changes= (isNaN(changes)? 0 :changes);

let fixedCost= parseFloat(document.getElementById("inputFCost").value);
fixedCost = (isNaN(fixedCost)?0:fixedCost);
let cardText = document.getElementById("cardText");
let cardCost = document.getElementById("cardCost");

let flag = true;

if (isNaN(rate)){
    console.log("Rate Not a Number");
    document.getElementById("inputRate").style.borderColor = "#FF0000";
    flag=false; 
}
else{ 
    document.getElementById("inputRate").value = rate;
    document.getElementById("inputRate").style.borderColor = "#00FF00";
}

if(flag){ 

    cardText.innerHTML = `Name: ${name}<br/> Email: ${email}, <br/>
     we can quote a price of requirements: <br/> ${getRequirements(extras)}`;
    cardCost.innerHTML = "<strong>$" + quote(rate, iva, extras, changes,fixedCost).toFixed(2);
}


btnPrint.addEventListener("click",function(e){
    e.preventDefault();
    window.print();
});


const getRequirements = (ex)=>{   
        let str=`<br/><ul class="list-group col-4">` 
        for (let i = 0; i< ex.options.length; i++){
            console.log(ex.options[i].selected);
            if(ex.options[i].selected){
                str += `<li class="list-group-item list-group-item-action">${ex.options[i].text}</li>`;
            } //if
        }//for
        str += `</ul>`;
        return str;

};


function quote(r,vat,ex,p,fc){
p /= 100; 
let result = (r)*(1+p); 
let i=0; 

do {
    console.log(ex.options[i].selected);
    if(ex.options[i].selected){
        result += parseFloat (ex.options[i].value);
    }
    i++; 
} while(i<ex.options.length);

result+= fc;

if (vat){         
        result *= 1.16;
}

    return result;
}