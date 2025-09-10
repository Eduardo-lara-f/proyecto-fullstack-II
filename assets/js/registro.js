const form = document.getElementById("registroForm");
const mensajeResultado = document.getElementById("mensajeResultado");

const NAME_REGEX  = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]{2,40}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASS_REGEX  = /^\S{6,}$/;
const PROMO_REGEX = /^[A-Za-z0-9._-]{0,20}$/;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre            = document.getElementById("nombre").value.trim();
  const apellido          = document.getElementById("apellido").value.trim();
  const correo            = document.getElementById("correo").value.trim();
  const contrasena        = document.getElementById("contrasena").value;
  const repetirContrasena = document.getElementById("repetirContrasena").value;
  const fechaNacimiento   = document.getElementById("fechaNacimiento").value;
  const codigoPromocional = document.getElementById("codigoPromocional").value.trim();

  let errores = [];

  if (!NAME_REGEX.test(nombre)) errores.push("Nombre inválido.");
  if (!NAME_REGEX.test(apellido)) errores.push("Apellido inválido.");
  if (!EMAIL_REGEX.test(correo)) errores.push("Correo electrónico inválido.");
  if (!PASS_REGEX.test(contrasena)) errores.push("La contraseña debe tener al menos 6 caracteres y sin espacios.");
  if (contrasena !== repetirContrasena) errores.push("Las contraseñas no coinciden.");
  if (!esFechaNacimientoValida(fechaNacimiento)) errores.push("La fecha de nacimiento debe ser anterior a hoy.");
  if (codigoPromocional && !PROMO_REGEX.test(codigoPromocional)) errores.push("Código promocional inválido.");

  if (errores.length > 0) {
    mensajeResultado.classList.remove("d-none", "alert-success");
    mensajeResultado.classList.add("alert-danger");
    mensajeResultado.innerHTML = "<strong>Error:</strong><br>" + errores.join("<br>");
    return;
  }

  mensajeResultado.classList.remove("d-none", "alert-danger");
  mensajeResultado.classList.add("alert-success");
  mensajeResultado.innerHTML = `<strong>¡Registro exitoso!</strong><br>
    Nombre: ${escapeHTML(nombre)}<br>
    Apellido: ${escapeHTML(apellido)}<br>
    Correo: ${escapeHTML(correo)}<br>
    Fecha de Nacimiento: ${escapeHTML(fechaNacimiento)}<br>
    ${codigoPromocional ? 'Código Promocional: ' + escapeHTML(codigoPromocional) : ''}`;
});

function esFechaNacimientoValida(value) {
  if (!value) return false;
  const hoy = new Date();
  hoy.setHours(0,0,0,0);
  const fecha = new Date(value + "T00:00:00");
  return !Number.isNaN(fecha.getTime()) && fecha < hoy;
}

function limpiarFormulario() {
  form.reset();
  mensajeResultado.classList.add("d-none");
  mensajeResultado.classList.remove("alert-success", "alert-danger");
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
