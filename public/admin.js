// Obtener los valores del formulario
  const cod_e = parseInt(document.getElementById('cod_e').value);
  const nom_e = document.getElementById('nom_e').value;
  const dir_e = document.getElementById('dir_e').value;
  const tel_e = parseInt(document.getElementById('tel_e').value);
  const fech_nac = document.getElementById('fech_nac').value;
function crearEstudiante() {
  // Armar el objeto estudiante
  const estudiante = {
    cod_e,
    nom_e,
    dir_e,
    tel_e,
    fech_nac
  };

  // Enviar al backend
  fetch('http://localhost:3000/estudiante', {
    method: 'POST',//le dice al navegador que vamos a enviar informacion al backend
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(estudiante)// el postman hace las veces de esta funcion
  })
     .then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      // ⛔ Si hay error, lo mostramos
      document.getElementById('resultados').innerText = `Error: ${data.message || 'No se pudo crear el estudiante'}`;
    } else {
      // ✅ Si todo está bien, mostramos el éxito
      document.getElementById('resultados').innerText = `Estudiante creado correctamente`;
    }
  })
  .catch(error => {
    document.getElementById('resultados').innerText = `Error de red: ${error.message}`;
  });
}


function goBack() {
 window.location.href = '/';
}
