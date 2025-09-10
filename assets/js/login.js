const loginForm = document.getElementById("loginForm");
const loginMensaje = document.getElementById("loginMensaje");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const correo = document.getElementById("loginCorreo").value.trim();
  const contrasena = document.getElementById("loginContrasena").value;

  let errores = [];

  if (!EMAIL_REGEX.test(correo)) errores.push("Correo electrónico inválido.");
  if (contrasena.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");
  if (/\s/.test(contrasena)) errores.push("La contraseña no debe contener espacios.");

  if (errores.length > 0) {
    loginMensaje.classList.remove("d-none", "alert-success");
    loginMensaje.classList.add("alert-danger");
    loginMensaje.innerHTML = "<strong>Error:</strong><br>" + errores.join("<br>");
    return;
  }

  loginMensaje.classList.remove("d-none", "alert-danger");
  loginMensaje.classList.add("alert-success");
  loginMensaje.innerHTML = "<strong>¡Login exitoso!</strong>";
});
