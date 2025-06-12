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
if (isNaN(cod_e)) {
    document.getElementById('resultados').innerText = 'Código de estudiante inválido.';
    return;
  }
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
  if (isNaN(id_p)) {
    document.getElementById('resultados_p').innerText = 'Código de profesor inválido.';
    return;
  }
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
    document.getElementById('resultados_p').innerText = 'Código de profesor inválido.';
    return;
  }

  fetch(`http://127.0.0.1:3000/profesor/${id_p}`, {
    method: 'DELETE'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_p').innerText = `Error: ${data.message || 'No se pudo eliminar el profesor'}`;
    } else {
      document.getElementById('resultados_p').innerText = 'profesor eliminado correctamente';
    }
  })
  .catch(error => {
    document.getElementById('resultados_p').innerText = `Error de red: ${error.message}`;
  });
}
function verProfesores() {
  fetch('http://127.0.0.1:3000/profesor/',{
    method: 'GET'
  })
   .then(async response => {
    const data = await response.json();

    if (!response.ok) {
      document.getElementById('resultados_p').innerText = `Error: ${data.message || 'No se pudieron obtener los profesores'}`;
      return;
    }

    const profesores = data.data;

    if (!Array.isArray(profesores)) {
      document.getElementById('resultados_p').innerText = 'Error: La respuesta no contiene una lista de estudiantes.';
      return;
    }

    // Crear tabla
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Profesión</th>
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
function buscarProfesores() {
  const id_p = parseInt(document.getElementById('id_p').value);
  fetch(`http://127.0.0.1:3000/profesor/${id_p}`, {
    method: 'GET'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_p').innerText = `Error: ${data.message || 'No se pudieron obtener los profesores'}`;
      return;
    }

    const profesor = data.data;

    if (!Array.isArray(profesor)) {
      document.getElementById('resultados_p').innerText = 'Error: La respuesta no contiene una lista de estudiantes.';
      return;
    }

    // Crear tabla
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Profesión</th>
          </tr>
        </thead>
        <tbody>
    `;

    profesor.forEach(profesor => {
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
// funciones para administrar asignaturas
function crearAsignatura() {
  // Obtener los valores del formulario
  const cod_a = parseInt(document.getElementById('cod_a').value);
  const nom_a = document.getElementById('nom_a').value;
  const int_h = parseInt(document.getElementById('int_h').value);
  const creditos = parseInt(document.getElementById('creditos').value);
// armar asignatura
  const asignatura = {
    cod_a: cod_a,
    nom_a: nom_a,
    int_h: int_h,
    creditos: creditos
  };
  // Enviar la asignatura al servidor
  
 fetch('http://127.0.0.1:3000/asignatura', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(asignatura)
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_a').innerText = `Error: ${data.message || 'No se pudo crear la asignatura'}`;
      return;
    }
    document.getElementById('resultados_a').innerText = 'asignatura creado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados_a').innerText = `Error de red: ${error.message}`;
  });
}
function actualizarAsignatura() {
  // Obtener los valores del formulario
  const cod_a = parseInt(document.getElementById('cod_a').value);
  const nom_a = document.getElementById('nom_a').value;
  const int_h = parseInt(document.getElementById('int_h').value);
  const creditos = parseInt(document.getElementById('creditos').value);
// armar asignatura
  const asignatura = {
    cod_a: cod_a,
    nom_a: nom_a,
    int_h: int_h,
    creditos: creditos
  };
  if (isNaN(cod_a)) {
    document.getElementById('resultados_a').innerText = 'Código de asignatura inválido.';
    return;
  }
  // Enviar la asignatura al servidor
  fetch('http://127.0.0.1:3000/asignatura', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(asignatura)
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_a').innerText = `Error: ${data.message || 'No se pudo actualizar la asignatura'}`;
      return;
    }
    document.getElementById('resultados_a').innerText = 'asignatura actualizado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados_a').innerText = `Error de red: ${error.message}`;
  })
}
function eliminarAsignatura() {
  // Obtener los valores del formulario
  const cod_a = parseInt(document.getElementById('cod_a').value);

  if (isNaN(cod_a)) {
    document.getElementById('resultados_a').innerText = 'Código de asignatura inválido.';
    return;
  }

  fetch(`http://127.0.0.1:3000/asignatura/${cod_a}`, {
    method: 'DELETE'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_a').innerText = `Error: ${data.message || 'No se pudo eliminar la asignatura'}`;
    } else {
      document.getElementById('resultados_a').innerText = 'asignatura eliminado correctamente';
    }
  })
  .catch(error => {
    document.getElementById('resultados_a').innerText = `Error de red: ${error.message}`;
  });
}
function verAsignaturas() {
  fetch('http://127.0.0.1:3000/asignatura/',{
    method: 'GET'
  })
   .then(async response => {
    const data = await response.json();

    if (!response.ok) {
      document.getElementById('resultados_a').innerText = `Error: ${data.message || 'No se pudieron obtener las asignaturas'}`;
      return;
    }

    const asignaturas = data.data;

    if (!Array.isArray(asignaturas)) {
      document.getElementById('resultados_a').innerText = 'Error: La respuesta no contiene una lista de asignaturas.';
      return;
    }

    // Crear tabla
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Horas</th>
            <th>Créditos</th>
          </tr>
        </thead>
        <tbody>
    `;
    asignaturas.forEach(asignatura => {
      tabla += `
        <tr>
          <td>${asignatura.cod_a}</td>
          <td>${asignatura.nom_a}</td>
          <td>${asignatura.int_h}</td>
          <td>${asignatura.creditos}</td>
        </tr>
      `;
    });
    tabla += `
        </tbody>
      </table>
    `;
    document.getElementById('resultados_a').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados_a').innerText = `Error de red: ${error.message}`;
  });
}
function buscarAsignaturas() {
  const cod_a = parseInt(document.getElementById('cod_a').value);
  fetch(`http://127.0.0.1:3000/asignatura/${cod_a}`,{
    method: 'GET'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_a').innerText = `Error: ${data.message || 'No se pudo obtener el registro en asignatura'}`;
      return;
    }
    const asignatura = data.data;
    if (!arrayBuffer.isArray(asignatura)) {
      document.getElementById('resultados_a').innerText = 'Error: La respuesta no contiene una lista de asignatura.';
      return;
    }
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Horas</th>
            <th>Créditos</th>
          </tr>
        </thead>
        <tbody>
    `;
    tabla += `
        <tr>
          <td>${asignatura.cod_a}</td>
          <td>${asignatura.nom_a}</td>
          <td>${asignatura.int_h}</td>
          <td>${asignatura.creditos}</td>
        </tr>
      `;
    tabla += `
        </tbody>
      </table>
    `;
    document.getElementById('resultados_a').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados_a').innerText = `Error de red: ${error.message}`;
  });
}
// funciones para administrar asignaturas
function crearImparte(){
const id_p = parseInt(document.getElementById('id_p_i').value);
const cod_a = parseInt(document.getElementById('cod_a_i').value);
const grupo = parseInt(document.getElementById('grupo_i').value);
const horario = document.getElementById('horario_i').value;
// armar imparte
const imparte = {
  id_p: id_p,
  cod_a: cod_a,
  grupo: grupo,
  horario: horario
};
if (isNaN(id_p)) {
  document.getElementById('resultados_i').innerText = 'Código de profesor inválido.';
  return;
}
if (isNaN(cod_a)) {
  document.getElementById('resultados_i').innerText = 'Código de asignatura inválido.';
  return;
}
if (isNaN(grupo)) {
  document.getElementById('resultados_i').innerText = 'Grupo inválido.';
  return;
}
if (horario === '') {
  document.getElementById('resultados_i').innerText = 'Horario inválido.';
  return;
}
// Enviar la asignatura al servidor
fetch('http://127.0.0.1:3000/imparte', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(imparte)
})
.then(async response => {
  const data = await response.json();
  if (!response.ok) {
    document.getElementById('resultados_i').innerText = `Error: ${data.message || 'No se pudo crear el registro en imparte'}`;
    return;
  }
  document.getElementById('resultados_i').innerText = 'Registro en imparte creado exitosamente';
})
.catch(error => {
  document.getElementById('resultados_i').innerText = `Error de red: ${error.message}`;
});
}
function verImparte() {
  fetch('http://127.0.0.1:3000/imparte/',{
    method: 'GET'
  })
   .then(async response => {
    const data = await response.json();

    if (!response.ok) {
      document.getElementById('resultados_i').innerText = `Error: ${data.message || 'No se pudieron obtener los registros en imparte'}`;
      return;
    }

    const imparte = data.data;

    if (!Array.isArray(imparte)) {
      document.getElementById('resultados_i').innerText = 'Error: La respuesta no contiene una lista de imparte.';
      return;
    }

    // Crear tabla
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Código Profesor</th>
            <th>Código Asignatura</th>
            <th>Grupo</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
    `;
    imparte.forEach(imparte => {
      tabla += `
        <tr>
          <td>${imparte.id_p}</td>
          <td>${imparte.cod_a}</td>
          <td>${imparte.grupo}</td>
          <td>${imparte.horario}</td>
        </tr>
      `;
    });
    tabla += `
        </tbody>
      </table>
    `;
    document.getElementById('resultados_i').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados_i').innerText = `Error de red: ${error.message}`;
  });
}
function buscarImparte() {
  fetch('http://127.0.0.1:3000/estudiante/',{
    method: 'GET'
  })
   .then(async response => {
    const data = await response.json();

    if (!response.ok) {
      document.getElementById('resultados_i').innerText = `Error: ${data.message || 'No se pudieron obtener los registros en imparte'}`;
      return;
    }

    const imparte = data.data;

    if (!Array.isArray(imparte)) {
      document.getElementById('resultados_i').innerText = 'Error: La respuesta no contiene una lista de imparte.';
      return;
    }

    // Crear tabla
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Código Profesor</th>
            <th>Código Asignatura</th>
            <th>Grupo</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
    `;
    imparte.forEach(imparte => {
      tabla += `
        <tr>
          <td>${imparte.id_p}</td>
          <td>${imparte.cod_a}</td>
          <td>${imparte.grupo}</td>
          <td>${imparte.horario}</td>
        </tr>
      `;
    });
    tabla += `
        </tbody>
      </table>
    `;
    document.getElementById('resultados_i').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados_i').innerText = `Error de red: ${error.message}`;
  })
} 
function actualizarImparte() {
  const cod_a = parseInt(document.getElementById('cod_a_i').value);
  const id_p = parseInt(document.getElementById('id_p_i').value);
  const grupo = parseInt(document.getElementById('grupo_i').value);
  const horario = document.getElementById('horario_i').value;
  const imparte = {
    id_p: id_p,
    cod_a: cod_a,
    grupo: grupo,
    horario: horario
  };
  fetch(`http://127.0.0.1:3000/imparte/${cod_a}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(imparte)
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_i').innerText = `Error: ${data.message || 'No se pudo actualizar el registro en imparte'}`;
      return;
    }
    document.getElementById('resultados_i').innerText = 'Registro en imparte actualizado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados_i').innerText = `Error de red: ${error.message}`;
  });
}
function eliminarImparte() {
  const cod_a = parseInt(document.getElementById('cod_a_i').value);
  fetch(`http://127.0.0.1:3000/imparte/${cod_a}`, {
    method: 'DELETE'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_i').innerText = `Error: ${data.message || 'No se pudo eliminar el registro en imparte'}`;
      return;
    }
    document.getElementById('resultados_i').innerText = 'Registro en imparte eliminado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados_i').innerText = `Error de red: ${error.message}`;
  });
}
// Funciones para la tabla de inscribe
function crearInscribe() {
  const cod_a = parseInt(document.getElementById('cod_a_in').value);
  const cod_e = parseInt(document.getElementById('cod_e_in').value);
  const id_p = parseInt(document.getElementById('id_p_in').value);
  const grupo = parseInt(document.getElementById('grupo_in').value);
  const n1 = parseInt(document.getElementById('n1').value);
  const n2 = parseInt(document.getElementById('n2').value);
  const n3 = parseInt(document.getElementById('n3').value);
  const inscribe = {
    cod_a: cod_a,
    cod_e: cod_e,
    id_p: id_p,
    grupo: grupo,
    n1: n1,
    n2: n2,
    n3: n3
  };
  fetch('http://127.0.0.1:3000/inscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inscribe)
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados').innerText = `Error: ${data.message || 'No se pudo crear el registro en inscribe'}`;
      return;
    }
    document.getElementById('resultados').innerText = 'Registro en inscribe creado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados').innerText = `Error de red: ${error.message}`;
  });
}
function actualizarInscribe() {
  const cod_a = parseInt(document.getElementById('cod_a_in').value);
  const cod_e = parseInt(document.getElementById('cod_e_in').value);
  const id_p = parseInt(document.getElementById('id_p_in').value);
  const grupo = parseInt(document.getElementById('grupo_in').value);
  const n1 = parseInt(document.getElementById('n1').value);
  const n2 = parseInt(document.getElementById('n2').value);
  const n3 = parseInt(document.getElementById('n3').value);
  const inscribe = {
    cod_a: cod_a,
    cod_e: cod_e,
    id_p: id_p,
    grupo: grupo,
    n1: n1,
    n2: n2,
    n3: n3
  };
  fetch(`http://127.0.0.1:3000/inscribe/${cod_a}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inscribe)
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados').innerText = `Error: ${data.message || 'No se pudo actualizar el registro en inscribe'}`;
      return;
    }
    document.getElementById('resultados').innerText = 'Registro en inscribe actualizado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados').innerText = `Error de red: ${error.message}`;
  });
}
function eliminarInscribe() {
  const cod_e = parseInt(document.getElementById('cod_e_in').value);
  fetch(`http://127.0.0.1:3000/inscribe/${cod_e}`, {
    method: 'DELETE'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_in').innerText = `Error: ${data.message || 'No se pudo eliminar el registro en inscribe'}`;
      return;
    }
    document.getElementById('resultados_in').innerText = 'Registro en inscribe eliminado exitosamente';
  })
  .catch(error => {
    document.getElementById('resultados_in').innerText = `Error de red: ${error.message}`;
  });
}
function verInscribe() {
  fetch('http://127.0.0.1:3000/inscribe',{
    method: 'GET'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_in').innerText = `Error: ${data.message || 'No se pudo obtener los registros en inscribe'}`;
      return;
    }
    const inscribe = data.data;
    if (!Array.isArray(inscribe)) {
      document.getElementById('resultados_in').innerText = 'Error: La respuesta no contiene una lista de inscribe.';
      return;
    }
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Código Asignatura</th>
            <th>Código Estudiante</th>
            <th>Id Profesor</th>
            <th>Grupo</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
          </tr>
        `;
 
  inscribe.forEach(inscribe => {
    tabla += `
      <tr>
        <td>${inscribe.cod_a}</td>
        <td>${inscribe.cod_e}</td>
        <td>${inscribe.id_p}</td>
        <td>${inscribe.grupo}</td>
        <td>${inscribe.n1}</td>
        <td>${inscribe.n2}</td>
        <td>${inscribe.n3}</td>
      </tr>
    `;
  })
  tabla += `
      </tbody>
      </table>
    `;
    document.getElementById('resultados_in').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados_in').innerText = `Error de red: ${error.message}`;
  });     
}
function buscarInscribe() {
  const cod_a = parseInt(document.getElementById('cod_a_in').value);
  fetch(`http://127.0.0.1:3000/inscribe/${cod_a}`,{
    method: 'GET'
  })
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      document.getElementById('resultados_in').innerText = `Error: ${data.message || 'No se pudo obtener los registros en inscribe'}`;
      return;
    }
    const inscribe = data.data;
    if (!arrayBuffer.isArray(inscribe)) {
      document.getElementById('resultados_in').innerText = 'Error: La respuesta no contiene una lista de inscribe.';
      return;
    }
    let tabla = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Código Asignatura</th>
            <th>Código Estudiante</th>
            <th>Id Profesor</th>
            <th>Grupo</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
          </tr>
        `;
 
  imparte.forEach(imparte => {
    tabla += `
      <tr>
        <td>${imparte.cod_a}</td>
        <td>${imparte.cod_e}</td>
        <td>${imparte.id_p}</td>
        <td>${imparte.grupo}</td>
        <td>${imparte.n1}</td>
        <td>${imparte.n2}</td>
        <td>${imparte.n3}</td>
      </tr>
    `;
  })
  tabla += `
      </tbody>
      </table>
    `;
    document.getElementById('resultados_in').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('resultados_in').innerText = `Error de red: ${error.message}`;
  });
}

function goBack() {
 window.location.href = '/';
}
window.scrollTo(0, 100); // hace scroll hacia abajo automáticamente