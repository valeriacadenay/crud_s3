import { alertError, alertSuccess } from "./alert";

// Get DOM elements for inputs and buttons
const endpointProduct ="http://localhost:3000/product"
const $nombre = document.getElementById("nombre");
const $marca = document.getElementById("marca");
const $modelo = document.getElementById("modelo");
const $vencimiento = document.getElementById("vencimiento");
const $fabricante = document.getElementById("fabricante");
const $garantia = document.getElementById("garantia");
const $origen = document.getElementById("origen");
const $form = document.getElementById("form");
const $productsList = document.getElementById("productos-lista")

$form.addEventListener("submit", function (event){
    event.preventDefault()
    createProducts();
    mostrarProductos();
})

//POST

async function createProducts(){
    const newProduct ={
        nombre:$nombre.value,
        marca: $marca.value,
        modelo:$modelo.value,
        vencimiento:$vencimiento.value,
        fabricante:$fabricante.value,
        garantia:$garantia.value,
        origen:$origen.value
    }

    try{
        let response = await fetch(endpointProduct,{
        method:"POST",
        headers:{
            "content-type" : "application/json"
        },
        body: JSON.stringify(newProduct)
        }) 
        if(!response.ok){
            alertError("No se pudo guardar el producto, intenta mas tarde")
        } else{
            alertSuccess("Producto guardado")
            throw new Error(response.statusText);
        }
    }catch (error){
        console.log(error.message)
    }

    let response = await fetch(endpointProduct,{
        method:"POST",
        headers:{
            "content-type" : "application/json"
        },
        body: JSON.stringify(newProduct)
    }) 

}

//GET
async function mostrarProductos(){
    let response = await fetch(endpointProduct,{
        method:"POST",
        headers:{
            "content-type" : "application/json"
         },
})
}

