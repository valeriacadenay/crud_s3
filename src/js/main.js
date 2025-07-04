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

$form.addEventListener("submit", function (event){
    event.preventDefault()
    createProducts();
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
           throw new Error("No se pudo guardar el producto");
        } else {
            alertSuccess("Producto guardado");
        }

    }catch (error){
        console.log(error.message)
    }
}


//RENDENDERIZAS PRODUCTOS
function renderProductos(productos) {
  $productsList.innerHTML = productos.map(p => `
    <div class="producto" data-id="${p.id}">
      <h3>${p.nombre}</h3>
      <p>Marca: ${p.marca}</p>
      <p>Modelo: ${p.modelo}</p>
      <p>Vence: ${p.vencimiento}</p>
      <p>Fabricante: ${p.fabricante}</p>
      <p>Garantía: ${p.garantia} meses</p>
      <p>Origen: ${p.origen}</p>
      <button class="editar-btn">Editar</button>
      <button class="eliminar-btn">Eliminar</button>
    </div>
  `).join('');

  // Agrega los listeners después de renderizar
  document.querySelectorAll(".editar-btn").forEach(btn =>
    btn.addEventListener("click", handleEditar)
  );
  document.querySelectorAll(".eliminar-btn").forEach(btn =>
    btn.addEventListener("click", handleEliminar)
  );
}


//GET
async function getProductos(){
    let response = await fetch(endpointProduct)
    let data = await response.json()
    console.table(data)
}

getProductos()

//PUT
async function productos() {
    
fetch("http://localhost:3000/product/4fd2", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
     "nombre": "silla",
      "marca": "rimax",
      "modelo": "000009",
      "vencimiento": "2025-07-15",
      "fabricante": "rimax",
      "garantia": "4",
      "origen": "colombia"
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));

}

//ELIMINAR
async function handleEliminar(event) {
  const id = event.target.closest(".producto").dataset.id;

  const confirm = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  });

  if (confirm.isConfirmed) {
    try {
      const res = await fetch(`${endpointProduct}/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Error al eliminar");
      alertSuccess("Producto eliminado");
      getProductos(); // Recarga la lista
    } catch (error) {
      alertError("No se pudo eliminar el producto");
    }
  }
}

//EDITAR
let productoEditando = null;

function handleEditar(event) {
  const id = event.target.closest(".producto").dataset.id;
  fetch(`${endpointProduct}/${id}`)
    .then(res => res.json())
    .then(data => {
      // Rellena el formulario con los datos del producto
      $nombre.value = data.nombre;
      $marca.value = data.marca;
      $modelo.value = data.modelo;
      $vencimiento.value = data.vencimiento;
      $fabricante.value = data.fabricante;
      $garantia.value = data.garantia;
      $origen.value = data.origen;
      productoEditando = id;
    });
}
