import { db } from '../../db';

export const getMateriasDisponibles = (callback: Function) => {
    const query = `
        SELECT imparte.id_p, profesores.nom_p, imparte.cod_a, asignaturas.nom_a, imparte.grupo, imparte.horario
        FROM imparte
        INNER JOIN profesores ON imparte.id_p = profesores.id_p
        INNER JOIN asignaturas ON imparte.cod_a = asignaturas.cod_a
    `;
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

export const inscribirMateria = (cod_e: number, cod_a: string, id_p: number, grupo: string, callback: Function) => {
    const query = `
        INSERT INTO inscribe (cod_e, cod_a, id_p, grupo, n1, n2, n3)
        VALUES (?, ?, ?, ?, 0, 0, 0)
    `;
    db.query(query, [cod_e, cod_a, id_p, grupo], (err) => {
        if (err) return callback(err);
        callback(null, { message: 'Materia inscrita exitosamente' });
    });
};

export const getMateriasInscritas = (cod_e: number, callback: Function) => {
    const query = `
        SELECT i.cod_a, a.nom_a, i.id_p, p.nom_p, i.grupo, i.n1, i.n2, i.n3
        FROM inscribe i
        INNER JOIN asignaturas a ON i.cod_a = a.cod_a
        INNER JOIN profesores p ON i.id_p = p.id_p
        WHERE i.cod_e = ?
    `;
    db.query(query, [cod_e], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};