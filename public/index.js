function irA(pagina) {
  window.location.href = pagina;
}

function goBack() {
  window.location.href = '/';
}

function validarContraseña(event) {
  event.preventDefault(); // Evita que el formulario se envíe directamente

  const contraseñaIngresada = document.getElementById("contraseña").value;
  const contraseñaCorrecta = "A123456789*"; // Aquí defines la contraseña válida

  if (contraseñaIngresada === contraseñaCorrecta) {
    irA("admin.html");
  } else {
    alert("Contraseña incorrecta. Inténtalo de nuevo.");
  }

  return false;
}