
var contplaca,contmicro,conthd,contmem;
contplaca=contmicro=conthd=contmem=0;

var producto = [{"id":0,"descripcion":"placa","precio":140.00,"cantidad":0,"total":0},
{"id":1,"descripcion":"micro","precio":121.00,"cantidad":0,"total":0},
{"id":2,"descripcion":"hd","precio":51.00,"cantidad":0,"total":0},
{"id":3,"descripcion":"mem","precio":48.00,"cantidad":0,"total":0},
];

    
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
            conthd+=1;
            document.getElementById(id).value=conthd;
            break;
        case 3:
            contmem+=1;
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
    

    switch (id)
    {
        case 0:
            if (contplaca < 0 && contplaca > producto[id].cantidad)
            {
                contplaca = 0;
            }
            producto[id].cantidad += contplaca;
            producto[id].descripcion = document.getElementById('descripcion'+id).innerHTML;
            producto[id].precio = parseFloat(document.getElementById("precio"+id).innerHTML);
            producto[id].total = producto[id].precio * producto[id].cantidad;
            producto[id].total = producto[id].total.toFixed(2);
            break;

        case 1:
            if (contmicro < 0 && contmicro > producto[id].cantidad)
            {
                contmicro = 0;
            }
            producto[id].cantidad += contmicro;
            producto[id].descripcion = document.getElementById('descripcion'+id).innerHTML;
            producto[id].precio = parseFloat(document.getElementById("precio"+id).innerHTML);
            producto[id].total = producto[id].precio * producto[id].cantidad;
            producto[id].total = producto[id].total.toFixed(2);
            break;

        case 2:
            if (conthd < 0 && conthd > producto[id].cantidad)
            {
                conthd = 0;
            }
            producto[id].cantidad += conthd;
            producto[id].descripcion = document.getElementById('descripcion'+id).innerHTML;
            producto[id].precio = parseFloat(document.getElementById("precio"+id).innerHTML);
            producto[id].total = producto[id].precio * producto[id].cantidad;
            producto[id].total = producto[id].total.toFixed(2);
            break;

        case 3:
            if (contmem < 0 && contmem > producto[id].cantidad)
            {
                contmem = 0;
            }
            producto[id].cantidad += contmem;
            producto[id].descripcion = document.getElementById('descripcion'+id).innerHTML;
            producto[id].precio = parseFloat(document.getElementById("precio"+id).innerHTML);
            producto[id].total = producto[id].precio * producto[id].cantidad;
            producto[id].total = producto[id].total.toFixed(2);
            break;
        }
        localStorage.setItem('carrito',JSON.stringify(producto));

    RefrescarCarrito(id);
}

function RefrescarCarrito(id)
{  
    document.getElementById("carrito").innerHTML = " ";
    document.getElementById(id).value = 0;

    let carro,addlinea;
    let suma = 0;
    let fin = producto.length;
    carro = document.createElement("div");

        for (let i=0;i<fin;i++)
        {
            if (producto[i].cantidad > 0)
            {
                addlinea = document.createElement("p");
                    addlinea.innerHTML = producto[i].descripcion+" cantidad: "+producto[i].cantidad+ " valor: "+producto[i].total+" €.";
                carro.append(addlinea);
            
            }
            suma += producto[i].total;
        }
    document.getElementById("carrito").append(carro);
    suma = suma.toFixed(2);
    document.getElementById("total").innerHTML = "Precio total de carro: "+suma+" €";
    
}