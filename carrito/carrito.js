
var contplaca,contmicro,conthd,contmem;
contplaca=0;
contmicro=0;
conthd=0;
contmem=0;
var suma = 0.0;

var producto = [{"id":0,"descripcion":"placa","precio":140.00,"cantidad":0,"total":0},
{"id":1,"descripcion":"micro","precio":121.00,"cantidad":0,"total":0},
{"id":2,"descripcion":"hd","precio":51.00,"cantidad":0,"total":0},
{"id":3,"descripcion":"mem","precio":48.00,"cantidad":0,"total":0}
];

//producto = JSON.parse(localStorage.getItem("carrito"));

window.addEventListener('load', function() {RefrescarCarrito()});

function AgregarProducto(id){
    

    switch(id)
    {
        case 0:
            contplaca += 1;
            document.getElementById(id).value=contplaca;
            break;
        case 1:
            contmicro += 1;
            document.getElementById(id).value=contmicro;
            break;
        case 2:
            conthd += 1;
            document.getElementById(id).value=conthd;
            break;
        case 3:
            contmem += 1;
            document.getElementById(id).value=contmem;
            break;
        
    }

}

function QuitarProducto(id){
    

    switch(id)
    {
        case 0:

            contplaca-=1;
            document.getElementById(id).value=contplaca;
            break;

        case 1:

            contmicro-=1;
            document.getElementById(id).value=contmicro;
            break;

        case 2:
            
            conthd-=1;
            document.getElementById(id).value=conthd;
            break;

        case 3:
            
            contmem-=1;
            document.getElementById(id).value=contmem;
            break;
        
    }

}

function LlenaCarrito(id) {
    //let productoaux = JSON.parse(localStorage.getItem("carrito"));

    if(JSON.parse(localStorage.getItem("carrito")))
    {
        producto=JSON.parse(localStorage.getItem("carrito"));
    }

    switch (id)
    {
        case 0:
            
            producto[id].cantidad += contplaca;
            if (producto[id].cantidad<0)
            {
                producto[id].cantidad=0;
            }
            producto[id].descripcion = document.getElementById('descripcion'+id).innerHTML;
            producto[id].precio = parseFloat(document.getElementById("precio"+id).innerHTML);
            producto[id].total = parseFloat(producto[id].precio * producto[id].cantidad);
            producto[id].total = producto[id].total.toFixed(2);
            break;

        case 1:
            
            producto[id].cantidad += contmicro;
            if (producto[id].cantidad<0)
            {
                producto[id].cantidad=0;
            }
            producto[id].descripcion = document.getElementById('descripcion'+id).innerHTML;
            producto[id].precio = parseFloat(document.getElementById("precio"+id).innerHTML);
            producto[id].total = parseFloat(producto[id].precio * producto[id].cantidad);
            producto[id].total = producto[id].total.toFixed(2);
            break;

        case 2:
           
            producto[id].cantidad += conthd;
            if (producto[id].cantidad<0)
            {
                producto[id].cantidad=0;
            }
            producto[id].descripcion = document.getElementById('descripcion'+id).innerHTML;
            producto[id].precio = parseFloat(document.getElementById("precio"+id).innerHTML);
            producto[id].total = parseFloat(producto[id].precio * producto[id].cantidad);
            producto[id].total = producto[id].total.toFixed(2);
            break;

        case 3:
            
            producto[id].cantidad += contmem;
            if (producto[id].cantidad<0)
            {
                producto[id].cantidad=0;
            }
            producto[id].descripcion = document.getElementById('descripcion'+id).innerHTML;
            producto[id].precio = parseFloat(document.getElementById("precio"+id).innerHTML);
            producto[id].total = parseFloat(producto[id].precio * producto[id].cantidad);
            producto[id].total = producto[id].total.toFixed(2);
            break;
    }
    localStorage.setItem('carrito',JSON.stringify(producto));
    document.getElementById(id).value = 0;
    RefrescarCarrito();
}

function RefrescarCarrito()
{  
    document.getElementById("carrito").innerHTML = " ";
    //let productoaux = JSON.parse(localStorage.getItem("carrito"));

    if (JSON.parse(localStorage.getItem("carrito")))
    {
        producto=JSON.parse(localStorage.getItem("carrito"));;
    }
    
    let carro,addlinea;
    let fin = producto.length;
    suma=0;
    
    carro = document.createElement("div");
    carro.className="lincarrito";

        for (let i=0;i<fin;i++)
        {
            if (producto[i].cantidad > 0)
            {
                addlinea = document.createElement("p");
                    addlinea.innerHTML = producto[i].descripcion+" cantidad: "+producto[i].cantidad+ " valor: "+producto[i].total+" €.";
                carro.append(addlinea);
                
            }
            
            suma += parseFloat (producto[i].total);
            console.log(producto[i].total,suma);
        }
        suma = parseFloat(suma);
        suma = suma.toFixed(2);
        addlinea = document.createElement("p");
            addlinea.innerHTML = "Precio total del carro: "+suma+" €";
        carro.append(addlinea);

    document.getElementById("carrito").append(carro);
    let base,iva;
    base = suma /1.21;
    base = base.toFixed(2);

    iva = base *21/100;
    iva = iva.toFixed(2);

    document.getElementById("total").innerHTML = "Precio Base: "+base+" €.  Iva 21%: "+iva+" €. Total: "+suma+" €";
    
    
}

function ValidarPago()
{
    document.getElementById("resultado").innerHTML ="";
    
    let entradas = [];    
    let correctodni = 1;
    let correcto = 1;
    let correctomail = 1;
    let i,id,longitud;
    
    
    for (i=0;i<5; i++)
    {
        document.getElementById("error"+i).innerHTML = "";

    }

    for (i=0; i<5; i++)
    {
        //cargo en el array todos los datos introducidos por el usuario
        entradas.push(document.getElementById("dato"+i).value);
    }

    longitud = entradas.length;
    
    for (i=0; i<longitud; i++)
    {
            
        if (entradas[i]== "")
        {
            id = "error"+i;
            document.getElementById(id).innerHTML = "Este campo es obligatorio";
            correcto = 0; 

        }else if (i==2)
        {
            correctomail = VerificarMail(entradas[i],i);

        } else if (i==3)
        {
            correctodni = VerificarDni (entradas[i],i);
            
        }else if (i==4)
        {
            correctotarjeta = ValidarTarjeta (entradas[i],i);
        }   
    }
    if (correcto && correctomail && correctodni && correctotarjeta)
    {
        document.getElementById("resultado").innerHTML = "Formulario correcto";
    }

}

function VerificarDni(dni,i)
{
    let longitud = dni.length;
    let valores = /^[0-9a-zA-Z]+$/;
    let correcto = 1;
    let letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    let letra,letracalc, item;
    item = "error"+i;

    document.getElementById(item).innerHTML ="";

    if (longitud!=9)
    {
        correcto = 0;
        document.getElementById(item).innerHTML = "El DNI introducido no es válido";

    }else
    {
        letracalc = letras [parseInt(dni)%23];
        letra = dni[8];
        letra = letra.toUpperCase();
        if(letra != letracalc)
        {
            correcto = 0;
            document.getElementById(item).innerHTML = "El DNI introducido no es válido";
        }
    }
    return(correcto);
}

function VerificarMail(entrada,i)
{
    let correo = /^[0-9a-zA-Z]+@+[a-zA-z]+[.]+[a-zA-Z]+$/;
    let correcto = 1;
    if (!correo.test(entrada))
    {
        correcto = 0;
        document.getElementById("error"+i).innerHTML = "El mail no es correcto" 
    }
    return (correcto);
}

function ValidarTarjeta(numero,i){

    let correcto=0;
    let VISA = /^4[0-9]{3}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/;
    let MASTERCARD = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;  //Mastercard
    // /^5[1-5][0-9]{2}-?[0-9]{4}-?[0-9]{4}-?[0-9]   {4}$/;
    
    document.getElementById("error"+i).innerHTML="";

    if (!numero.match(VISA))
    {
        visa_error = "No es un número de Visa correcto";
        document.getElementById("error"+i).innerHTML=visa_error;
        

    }else if (!numero.match(MASTERCARD))
    {
        mastercard_error = "No es un número de Visa correcto";
        document.getElementById("error"+i).innerHTML=mastercard_error;

    }else{
        correcto=1;
    }
  
    return(correcto);
    
}

