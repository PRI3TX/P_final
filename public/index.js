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
function validarContraseñaProfe(event) {
  event.preventDefault(); // Evita el envío automático

  const contraseñaIngresada = parseInt(document.getElementById("contraseña_p").value);

  fetch(`http://127.0.0.1:3000/profesor/${contraseñaIngresada}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Código no válido");
      }
      return res.json();
    })
    .then(data => {
      // Si se encuentra, redirige
      irA("profesor.html");
    })
    .catch(error => {
      alert("Contraseña incorrecta. Intenta nuevamente.");
    });
}
function validarContraseñaAlumno(event) {
  event.preventDefault(); // Evita el envío automático

  const contraseñaIngresada = parseInt(document.getElementById("contraseña_a").value);

  fetch(`http://127.0.0.1:3000/estudiante/${contraseñaIngresada}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Código no válido");
      }
      return res.json();
    })
    .then(data => {
      // Si se encuentra, redirige
      irA("estudiante.html");
    })
    .catch(error => {
      alert("Contraseña incorrecta. Intenta nuevamente.");
    });
}

