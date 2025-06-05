// --------------------------------------------------funciones para administrar estudiantes----------------------------------------------------
// Función para crear un estudiante
  function crearEstudiante() {
  // Obtener los valores del formulario
  const cod_e = parseInt(document.getElementById('cod_e').value);
  const nom_e = document.getElementById('nom_e').value;
  const dir_e = document.getElementById('dir_e').value;
  const tel_e = parseInt(document.getElementById('tel_e').value);
  const fech_nac = document.getElementById('fech_nac').value;
  // Armar el objeto estudiante
  const estudiante = {
    cod_e,
    nom_e,
    dir_e,
    tel_e,
    fech_nac
  };

  // Enviar al backend
  fetch('http://127.0.0.1:3000/estudiante', {
    method: 'POST',//le dice al navegador que vamos a enviar informacion al backend
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(estudiante)// el postman hace las veces de esta fetch
  })
     .then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      // Si hay error, lo mostramos
      document.getElementById('resultados').innerText = `Error: ${data.message || 'No se pudo crear el estudiante'}`;
      return
    } else {
      // Si todo está bien, mostramos el éxito
      document.getElementById('resultados').innerText = `Estudiante creado correctamente`;
      return
    }
  })
  .catch(error => {
    document.getElementById('resultados').innerText = `Error de red: ${error.message}`;
  });
}
//funcion para actualizar un estudiante
function actualizarEstudiante() {
  // Obtener los valores del formulario
  const cod_e = parseInt(document.getElementById('cod_e').value);
  const nom_e = document.getElementById('nom_e').value;
  const dir_e = document.getElementById('dir_e').value;
  const tel_e = parseInt(document.getElementById('tel_e').value);
  const fech_nac = document.getElementById('fech_nac').value;

  // Armar el objeto estudiante
  const estudiante = {
    cod_e,
    nom_e,
    dir_e,
    tel_e,
    fech_nac
  };

  // Enviar al backend
  fetch('http://127.0.0.1:3000/estudiante', {
    method: 'PUT', // Seguimos usando PUT porque es una actualización
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(estudiante)
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados').innerText = `Error: ${data.message || 'No se pudo actualizar el estudiante'}`;
    } else {
      document.getElementById('resultados').innerText = 'Estudiante actualizado correctamente';
    }
  })
  .catch(error => {
    document.getElementById('resultados').innerText = `Error de red: ${error.message}`;
  });
}

//funcion para borrar un estudiante
function eliminarEstudiante() {
  // Obtener los valores del formulario
  const cod_e = parseInt(document.getElementById('cod_e').value);

  if (isNaN(cod_e)) {
    document.getElementById('resultados').innerText = 'Código de estudiante inválido.';
    return;
  }

  fetch(`http://127.0.0.1:3000/estudiante/${cod_e}`, {
    method: 'DELETE'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados').innerText = `Error: ${data.message || 'No se pudo eliminar el estudiante'}`;
    } else {
      document.getElementById('resultados').innerText = 'Estudiante eliminado correctamente';
    }
  })
  .catch(error => {
    document.getElementById('resultados').innerText = `Error de red: ${error.message}`;
  });
}
function verEstudiantes() {
  fetch('http://127.0.0.1:3000/estudiante/', {
    method: 'GET'
  })
  .then(async response => {
    const data = await response.json();

    if (!response.ok) {
      document.getElementById('resultados').innerText = `Error: ${data.message || 'No se pudieron obtener los estudiantes'}`;
      return;
    }

    const estudiantes = data.data;

    if (!Array.isArray(estudiantes)) {
      document.getElementById('resultados').innerText = 'Error: La respuesta no contiene una lista de estudiantes.';
      return;
    }

    // Crear tabla
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
    `;

    estudiantes.forEach(est => {
      tabla += `
        <tr>
          <td>${est.cod_e}</td>
          <td>${est.nom_e}</td>
          <td>${est.dir_e}</td>
          <td>${est.tel_e}</td>
          <td>${est.fech_nac}</td>
        </tr>
      `;
    });

    tabla += `</tbody></table>`;
    document.getElementById('resultados').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados').innerText = `Error de red: ${error.message}`;
  });
}

function buscarEstudiante() {
  const cod_e = parseInt(document.getElementById('cod_e').value);
  fetch(`http://127.0.0.1:3000/estudiante/${cod_e}`, {
    method: 'GET'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados').innerText = `Error: ${data.message || 'No se pudieron obtener los estudiantes'}`;
      return;
    }

    const estudiantes = data.data;

    if (!Array.isArray(estudiantes)) {
      document.getElementById('resultados').innerText = 'Error: La respuesta no contiene una lista de estudiantes.';
      return;
    }

    // Crear tabla
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
    `;

    estudiantes.forEach(est => {
      tabla += `
        <tr>
          <td>${est.cod_e}</td>
          <td>${est.nom_e}</td>
          <td>${est.dir_e}</td>
          <td>${est.tel_e}</td>
          <td>${est.fech_nac}</td>
        </tr>
      `;
    });

    tabla += `</tbody></table>`;
    document.getElementById('resultados').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados').innerText = `Error de red: ${error.message}`;
  });
}
// ------------------------------------------------funciones para administrar estudiantes----------------------------------------------------
function crearProfesor() {
  // Obtener los valores del formulario
  const id_p = parseInt(document.getElementById('id_p').value);
  const nom_p = document.getElementById('nom_p').value;
  const dir_p = document.getElementById('dir_p').value;
  const tel_p = parseInt(document.getElementById('tel_p').value);
  const profesion = document.getElementById('profesion').value;

  // Armar el objeto profesor
  const profesor = {
    id_p: id_p,
    nom_p: nom_p,
    dir_p: dir_p,
    tel_p: tel_p,
    profesion: profesion
  };
  fetch('http://127.0.0.1:3000/profesor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profesor)
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_p').innerText = `Error: ${data.message || 'No se pudo crear el profesor'}`;
      return;
    }
    document.getElementById('resultados_p').innerText = 'Profesor creado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados_p').innerText = `Error de red: ${error.message}`;
  });
}
function actualizarProfesor() {
  // Obtener los valores del formulario
  const id_p = parseInt(document.getElementById('id_p').value);
  const nom_p = document.getElementById('nom_p').value;
  const dir_p = document.getElementById('dir_p').value;
  const tel_p = parseInt(document.getElementById('tel_p').value);
  const profesion = document.getElementById('profesion').value;

  // Armar el objeto profesor
  const profesor = {
    id_p: id_p,
    nom_p: nom_p,
    dir_p: dir_p,
    tel_p: tel_p,
    profesion: profesion
  };
  fetch(`http://127.0.0.1:3000/profesor`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profesor)
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_p').innerText = `Error: ${data.message || 'No se pudo actualizar el profesor'}`;
      return;
    }
    document.getElementById('resultados_p').innerText = 'Profesor actualizado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados_p').innerText = `Error de red: ${error.message}`;
  });
}
function eliminarProfesor(){
  // Obtener los valores del formulario
  const id_p = parseInt(document.getElementById('id_p').value);

  if (isNaN(id_p)) {
    document.getElementById('resultados_p').innerText = 'Código de estudiante inválido.';
    return;
  }

  fetch(`http://127.0.0.1:3000/profesor/${id_p}`, {
    method: 'DELETE'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_p').innerText = `Error: ${data.message || 'No se pudo eliminar el estudiante'}`;
    } else {
      document.getElementById('resultados_p').innerText = 'Estudiante eliminado correctamente';
    }
  })
  .catch(error => {
    document.getElementById('resultados_p').innerText = `Error de red: ${error.message}`;
  });
}
function verProfesores() {
  fetch('http://127.0.0.1:3000/profesor',{
    method: 'GET'
  })
  .then(response => response.json())
  .then(profesores => {
    let tabla = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Tel&eacute;fono</th>
            <th>Profesi&oacute;n</th>
          </tr>
        </thead>
        <tbody>
    `;
    profesores.forEach(profesor => {
      tabla += `
        <tr>
          <td>${profesor.id_p}</td>
          <td>${profesor.nom_p}</td>
          <td>${profesor.dir_p}</td>
          <td>${profesor.tel_p}</td>
          <td>${profesor.profesion}</td>
        </tr>
      `;
    });
    tabla += `
        </tbody>
      </table>
    `;
    document.getElementById('resultados_p').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados_p').innerText = `Error de red: ${error.message}`;
  });
}

function goBack() {
 window.location.href = '/';
}
