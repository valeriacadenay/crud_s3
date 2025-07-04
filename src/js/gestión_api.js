import { alertError, alertSuccess, confirmarEliminacion } from "./alert.js";

const API_URL = "http://localhost:3000/product";

// Form input elements
const $nombre = document.getElementById("nombre");
const $marca = document.getElementById("marca");
const $modelo = document.getElementById("modelo");
const $vencimiento = document.getElementById("vencimiento");
const $fabricante = document.getElementById("fabricante");
const $garantia = document.getElementById("garantia");
const $origen = document.getElementById("origen");

// DOM elements
const form = document.getElementById("form");
const productosLista = document.getElementById("productos-lista");
const btnGuardar = document.getElementById("button"); // Placed here to avoid reference before declaration

// Fetch products from the server and display them
async function cargarProductos() {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error("Error fetching products");
    const productos = await respuesta.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error(error);
    alertError("Could not load products");
  }
}

// Render products as a table in the DOM
function mostrarProductos(productos) {
  if (!productos || productos.length === 0) {
    productosLista.innerHTML = "<p>No products yet.</p>";
    return;
  }

  let tableHTML = `
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Expiration</th>
            <th>Manufacturer</th>
            <th>Warranty (months)</th>
            <th>Origin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  `;

  productos.forEach((producto) => {
    tableHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.marca}</td>
        <td>${producto.modelo}</td>
        <td>${producto.vencimiento}</td>
        <td>${producto.fabricante}</td>
        <td>${producto.garantia}</td>
        <td>${producto.origen}</td>
        <td class="table-actions">
          <button class="btn-editar" data-id="${producto.id}">Edit</button>
          <button class="btn-eliminar" data-id="${producto.id}">Delete</button>
        </td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
    </div>
  `;

  productosLista.innerHTML = tableHTML;
}

// Reset the form inputs and editing state
function limpiarFormulario() {
  form.reset();
  // Also remove editing id and restore button text if needed
  delete form.dataset.editingId;
  btnGuardar.textContent = "Guardar";
}

// Create a new product from form data
async function crearProducto() {
  const nuevoProducto = {
    nombre: $nombre.value.trim(),
    marca: $marca.value.trim(),
    modelo: $modelo.value.trim(),
    vencimiento: $vencimiento.value,
    fabricante: $fabricante.value.trim(),
    garantia: Number($garantia.value),
    origen: $origen.value.trim(),
  };

  // Validate that all fields are filled
  if (
    !nuevoProducto.nombre ||
    !nuevoProducto.marca ||
    !nuevoProducto.modelo ||
    !nuevoProducto.vencimiento ||
    !nuevoProducto.fabricante ||
    !nuevoProducto.garantia ||
    !nuevoProducto.origen
  ) {
    alertError("Please complete all fields.");
    return;
  }

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    });

    if (!respuesta.ok) throw new Error();

    alertSuccess("Product saved successfully");
    limpiarFormulario();
    cargarProductos();
  } catch {
    alertError("Error saving product");
  }
}

// Delete a product by id
async function eliminarProducto(id) {
  try {
    const confirmado = await confirmarEliminacion();

    if (confirmado) {
      const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!respuesta.ok) throw new Error();

      alertSuccess("Product deleted successfully");
      cargarProductos();
    }
  } catch {
    alertError("Could not delete product");
  }
}

// Load product data into the form for editing
async function editarProducto(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    if (!respuesta.ok) throw new Error();
    const producto = await respuesta.json();

    // Fill form with current product data for editing
    $nombre.value = producto.nombre;
    $marca.value = producto.marca;
    $modelo.value = producto.modelo;
    $vencimiento.value = producto.vencimiento;
    $fabricante.value = producto.fabricante;
    $garantia.value = producto.garantia;
    $origen.value = producto.origen;

    // Change button to indicate edit mode
    btnGuardar.textContent = "Actualizar";

    // Store id in the form for later use
    form.dataset.editingId = id;
  } catch {
    alertError("Could not load product for editing");
  }
}

// Update a product with form data
async function actualizarProducto(id) {
  const productoActualizado = {
    nombre: $nombre.value.trim(),
    marca: $marca.value.trim(),
    modelo: $modelo.value.trim(),
    vencimiento: $vencimiento.value,
    fabricante: $fabricante.value.trim(),
    garantia: Number($garantia.value),
    origen: $origen.value.trim(),
  };

  // Validate that all fields are filled
  if (
    !productoActualizado.nombre ||
    !productoActualizado.marca ||
    !productoActualizado.modelo ||
    !productoActualizado.vencimiento ||
    !productoActualizado.fabricante ||
    !productoActualizado.garantia ||
    !productoActualizado.origen
  ) {
    alertError("Please complete all fields.");
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoActualizado),
    });

    if (!respuesta.ok) throw new Error();

    alertSuccess("Product updated successfully");
    limpiarFormulario();
    cargarProductos();
  } catch {
    alertError("Could not update product");
  }
}

// Handle form submit event for create or update
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const idEditing = form.dataset.editingId;

  if (idEditing) {
    actualizarProducto(idEditing);
  } else {
    crearProducto();
  }
});

// Event delegation for edit and delete buttons
productosLista.addEventListener("click", (e) => {
  const boton = e.target;
  const id = boton.dataset.id;

  if (boton.classList.contains("btn-eliminar")) {
    eliminarProducto(id);
  }

  if (boton.classList.contains("btn-editar")) {
    editarProducto(id);
  }
});

// Load products on page load
window.addEventListener("DOMContentLoaded", cargarProductos);