// Registrar materia a dictar
document.getElementById('formRegistrarMateria').addEventListener('submit', e => {
  e.preventDefault();
  const id_p = parseInt(document.getElementById('id_p').value);
  const cod_a = document.getElementById('cod_a').value;
  const grupo = document.getElementById('grupo').value;
  const horario = document.getElementById('horario').value;

  fetch('http://127.0.0.1:3000/api/profesor/registrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_p, cod_a, grupo, horario })
  })
    .then(res => res.json())
    .then(data => alert(data.message));
});

// Consultar estudiantes inscritos a materias del profesor
function consultarEstudiantes() {
  const id_p = parseInt(document.getElementById('id_p_consulta').value);
  fetch(`/http://127.0.0.1:3000api/profesor/estudiantes/${id_p}`)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('estudiantes');
      contenedor.innerHTML = data.data.map(e =>
        `<p>
          <strong>${e.nom_e}</strong> - ${e.nom_a} (Grupo: ${e.grupo})<br>
          Notas: ${e.n1 ?? '-'}, ${e.n2 ?? '-'}, ${e.n3 ?? '-'}
        </p>`
      ).join('');
    });
}

// Editar notas
document.getElementById('formEditarNotas').addEventListener('submit', e => {
  e.preventDefault();
  const cod_e = parseInt(document.getElementById('cod_e').value);
  const cod_a = document.getElementById('cod_a_nota').value;
  const id_p = parseInt(document.getElementById('id_p_nota').value);
  const grupo = document.getElementById('grupo_nota').value;
  const n1 = parseFloat(document.getElementById('n1').value);
  const n2 = parseFloat(document.getElementById('n2').value);
  const n3 = parseFloat(document.getElementById('n3').value);

  fetch('/api/profesor/notas', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cod_e, cod_a, id_p, grupo, n1, n2, n3 })
  })
    .then(res => res.json())
    .then(data => alert(data.message));
});

fetch('http://127.0.0.1:3000/asignatura/',{
    method: 'GET'
  })
   .then(async response => {
    const data = await response.json();

    if (!response.ok) {
      document.getElementById('ver_materias').innerText = `Error: ${data.message || 'No se pudieron obtener las asignaturas'}`;
      return;
    }

    const asignaturas = data.data;

    if (!Array.isArray(asignaturas)) {
      document.getElementById('ver_materias').innerText = 'Error: La respuesta no contiene una lista de asignaturas.';
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
    document.getElementById('ver_materias').innerHTML = tabla;
  })
  .catch(error => {
    document.getElementById('ver_materias').innerText = `Error de red: ${error.message}`;
  });
function goBack() {
  window.location.href = '/';
}
