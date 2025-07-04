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
const $btnEliminar = document.getElementById("eliminar-btn");
const $btnEditar = document.getElementById("editar-btn");
const $btnGuardar = document.getElementById("button");
const $form = document.getElementById("form");
const $productsList = document.getElementById("productos-lista")
const container = document.querySelector(".blogs");

$form.addEventListener("submit", function (event){
    event.preventDefault()
    createProducts();
})
//GET
async function getProductos(){
    let response = await fetch(endpointProduct)
    let data = await response.json()
    console.table(data)
    return data;
}

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
           throw new Error("No se pudo guardar el producto");
        } else {
            alertSuccess("Producto guardado");
        }

    }catch (error){
        console.log(error.message)
    }
}



const renderPosts = async () =>{
    const posts = await getProductos();
    
    let template = "";
    posts.forEach(post => {
        template += `
        <div class = "post">
            <h2>${post.nombre}</h2>
            <p>Marca: ${post.marca}</p>
            <p>Modelo: ${post.modelo}</p>
            <p>Vencimiento: ${post.vencimiento}</p>
            <p>Fabricante: ${post.fabricante}</p>
            <p>Garantía: ${post.garantia}</p>
            <p>Origen: ${post.origen}</p> 
        `
    })

    container.innerHTML = template;

}
window.addEventListener('DOMContentLoaded', () => renderPosts())