import { db } from '../../db';
import { Imparte } from '../models/imparteModel';
import { Inscribe } from '../models/inscribeModel';

export const registrarMateria = (data: Imparte, callback: Function) => {
    const query = `INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)`;
    db.query(query, [data.id_p, data.cod_a, data.grupo, data.horario], (err) => {
        if (err) return callback(err);
        callback(null, { statusCode: 200, message: 'Materia registrada exitosamente' });
    });
};

export const getEstudiantesPorProfesor = (id_p: number, callback: Function) => {
    const query = `
        SELECT e.cod_e, e.nom_e, i.cod_a, a.nom_a, i.grupo, i.n1, i.n2, i.n3
        FROM inscribe i
        INNER JOIN estudiantes e ON i.cod_e = e.cod_e
        INNER JOIN asignaturas a ON i.cod_a = a.cod_a
        WHERE i.id_p = ?
    `;
    db.query(query, [id_p], (err, results) => {
        if (err) return callback(err);
        callback(null, { statusCode: 200, data: results });
    });
};

export const editarNotas = (datos: Inscribe, callback: Function) => {
    const query = `
        UPDATE inscribe
        SET n1 = ?, n2 = ?, n3 = ?
        WHERE cod_e = ? AND cod_a = ? AND id_p = ? AND grupo = ?
    `;
    db.query(query, [datos.n1, datos.n2, datos.n3, datos.cod_e, datos.cod_a, datos.id_p, datos.grupo], (err) => {
        if (err) return callback(err);
        callback(null, { statusCode: 200, message: 'Notas actualizadas correctamente' });
    });
};
