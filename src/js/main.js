import { alertError, alertSuccess, confirmarEliminacion } from "./alert.js";

const API_URL = "http://localhost:3000/product";

// Inputs del formulario
const $nombre = document.getElementById("nombre");
const $marca = document.getElementById("marca");
const $modelo = document.getElementById("modelo");
const $vencimiento = document.getElementById("vencimiento");
const $fabricante = document.getElementById("fabricante");
const $garantia = document.getElementById("garantia");
const $origen = document.getElementById("origen");

// Elementos del DOM
const form = document.getElementById("form");
const productosLista = document.getElementById("productos-lista");
const btnGuardar = document.getElementById("button"); // Mover aquí para evitar referencias antes de declararlo

// Función para obtener productos del servidor
async function cargarProductos() {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error("Error al obtener productos");
    const productos = await respuesta.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error(error);
    alertError("No se pudieron cargar los productos");
  }
}

// Función para mostrar productos en el DOM
function mostrarProductos(productos) {
  if (!productos || productos.length === 0) {
    productosLista.innerHTML = "<p>No hay productos aún.</p>";
    return;
  }

  productosLista.innerHTML = productos
    .map(
      (producto) => `
    <div class="producto">
      <h3>${producto.nombre}</h3>
      <p>Marca: ${producto.marca}</p>
      <p>Modelo: ${producto.modelo}</p>
      <p>Vence: ${producto.vencimiento}</p>
      <p>Fabricante: ${producto.fabricante}</p>
      <p>Garantía: ${producto.garantia} meses</p>
      <p>Origen: ${producto.origen}</p>
      <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
      <button class="btn-editar" data-id="${producto.id}">Editar</button>
    </div>
  `
    )
    .join("");
}

// Función para limpiar inputs del formulario
function limpiarFormulario() {
  form.reset();
  // También quitar id de edición y restaurar botón por si queda activo
  delete form.dataset.editingId;
  btnGuardar.textContent = "Guardar";
}

// Función para crear un nuevo producto
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

  // Validar que no haya campos vacíos
  if (
    !nuevoProducto.nombre ||
    !nuevoProducto.marca ||
    !nuevoProducto.modelo ||
    !nuevoProducto.vencimiento ||
    !nuevoProducto.fabricante ||
    !nuevoProducto.garantia ||
    !nuevoProducto.origen
  ) {
    alertError("Por favor, completa todos los campos.");
    return;
  }

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    });

    if (!respuesta.ok) throw new Error();

    alertSuccess("Producto guardado exitosamente");
    limpiarFormulario();
    cargarProductos();
  } catch {
    alertError("Error al guardar el producto");
  }
}

// Función para eliminar producto
async function eliminarProducto(id) {
  try {
    const confirmado = await confirmarEliminacion();

    if (confirmado) {
      const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!respuesta.ok) throw new Error();

      alertSuccess("Producto eliminado exitosamente");
      cargarProductos();
    }
  } catch {
    alertError("No se pudo eliminar el producto");
  }
}

// Función para obtener datos del producto a editar y mostrar en el formulario
async function editarProducto(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    if (!respuesta.ok) throw new Error();
    const producto = await respuesta.json();

    // Llenar formulario con datos actuales para editar
    $nombre.value = producto.nombre;
    $marca.value = producto.marca;
    $modelo.value = producto.modelo;
    $vencimiento.value = producto.vencimiento;
    $fabricante.value = producto.fabricante;
    $garantia.value = producto.garantia;
    $origen.value = producto.origen;

    // Cambiar botón para indicar modo edición
    btnGuardar.textContent = "Actualizar";

    // Guardar id en el formulario para usarlo luego
    form.dataset.editingId = id;
  } catch {
    alertError("No se pudo cargar el producto para editar");
  }
}

// Función para actualizar producto con datos del formulario
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

  if (
    !productoActualizado.nombre ||
    !productoActualizado.marca ||
    !productoActualizado.modelo ||
    !productoActualizado.vencimiento ||
    !productoActualizado.fabricante ||
    !productoActualizado.garantia ||
    !productoActualizado.origen
  ) {
    alertError("Por favor, completa todos los campos.");
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoActualizado),
    });

    if (!respuesta.ok) throw new Error();

    alertSuccess("Producto actualizado exitosamente");
    limpiarFormulario();
    cargarProductos();
  } catch {
    alertError("No se pudo actualizar el producto");
  }
}

// Evento submit del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const idEditing = form.dataset.editingId;

  if (idEditing) {
    actualizarProducto(idEditing);
  } else {
    crearProducto();
  }
});

// Delegación de eventos para botones eliminar y editar
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

// Cargar productos al inicio
window.addEventListener("DOMContentLoaded", cargarProductos);



