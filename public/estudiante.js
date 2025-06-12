// Mostrar materias disponibles
fetch('/api/inscripcion/materias')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('materias');
    contenedor.innerHTML = data.map(m =>
      `<p>
        <strong>${m.cod_a} - ${m.nom_a}</strong><br>
        Profesor: ${m.nom_p} - Grupo: ${m.grupo} - Horario: ${m.horario}
      </p>`
    ).join('');
  });

// Inscribir materia
document.getElementById('formInscribir').addEventListener('submit', e => {
  e.preventDefault();
  const cod_e = parseInt(document.getElementById('cod_e').value);
  const cod_a = document.getElementById('cod_a').value;
  const id_p = parseInt(document.getElementById('id_p').value);
  const grupo = document.getElementById('grupo').value;

  fetch('/api/inscripcion/inscribir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cod_e, cod_a, id_p, grupo })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
});

// Ver materias inscritas
function consultarInscritas() {
  const cod_e = parseInt(document.getElementById('cod_e_consulta').value);
  fetch(`/api/inscripcion/inscritas/${cod_e}`)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('inscritas');
      contenedor.innerHTML = data.map(m =>
        `<p>${m.nom_a} - Profesor: ${m.nom_p} - Grupo: ${m.grupo} - Notas: ${m.n1}, ${m.n2}, ${m.n3}</p>`
      ).join('');
    });
}

function goBack() {
  window.location.href = '/';
}
