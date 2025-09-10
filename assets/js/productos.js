let sumaTotal = 0;
let listaCarrito, totalCarrito, carritoContainer, subtotalSpan, descuentoSpan;

document.addEventListener('DOMContentLoaded', () => {
  const filtro = document.getElementById('filtro-categoria');
  const productos = document.querySelectorAll('.producto');

  if (filtro) {
    filtro.addEventListener('change', (event) => {
      const categoriaSeleccionada = event.target.value;
      productos.forEach((producto) => {
        const categoriaProducto = producto.getAttribute('data-categoria');
        if (categoriaSeleccionada === 'todos' || categoriaProducto === categoriaSeleccionada) {
          producto.classList.remove('hidden');
        } else {
          producto.classList.add('hidden');
        }
      });
    });
  }

  listaCarrito = document.getElementById('lista-carrito');
  totalCarrito = document.getElementById('total-carrito');
  carritoContainer = document.getElementById('carrito-container');
  subtotalSpan = document.getElementById('subtotal-carrito');
  descuentoSpan = document.getElementById('descuento-valor');
});

window.toggleCarrito = function () {
  if (carritoContainer) carritoContainer.classList.toggle('visible');
};

window.agregarAlCarrito = function (nombre, precio) {
  if (!listaCarrito || !totalCarrito) return;

  const nuevoItem = document.createElement('li');
  nuevoItem.classList.add('item-carrito');
  const itemId = `item-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  nuevoItem.id = itemId;

  nuevoItem.innerHTML = `
    <span class="nombre-item">${nombre}</span>
    <span class="precio-item">$${precio.toLocaleString('es-CL')} CLP</span>
    <button class="btn-quitar" onclick="quitarDeCarrito('${itemId}', ${precio})">Quitar</button>
  `;

  listaCarrito.appendChild(nuevoItem);

  sumaTotal += precio;
  actualizarTotalCarrito();

  if (!carritoContainer.classList.contains('visible')) {
    toggleCarrito();
  }
};

window.quitarDeCarrito = function (itemId, precio) {
  const itemAEliminar = document.getElementById(itemId);
  if (itemAEliminar) {
    itemAEliminar.remove();
    sumaTotal -= precio;
    if (sumaTotal < 0) sumaTotal = 0;
    actualizarTotalCarrito();
  }
};

function actualizarTotalCarrito() {
  const subtotal = sumaTotal;
  const descuento = 0;
  const total = Math.max(subtotal - descuento, 0);

  if (subtotalSpan) subtotalSpan.textContent = `$${subtotal.toLocaleString('es-CL')} CLP`;
  if (descuentoSpan) descuentoSpan.textContent = `$${descuento.toLocaleString('es-CL')} CLP`;
  if (totalCarrito) totalCarrito.textContent = `$${total.toLocaleString('es-CL')} CLP`;
}
