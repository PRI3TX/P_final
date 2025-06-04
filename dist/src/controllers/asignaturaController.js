"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delite = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (asignatura, callback) => {
    const queryString = 'INSERT INTO asignaturas (id_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [asignatura.id_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos], (err) => {
        if (err)
            return callback(err);
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        return callback(null, {
            statusCode: 201,
            message: 'Asignatura creada exitosamente',
            data: {
                id_a: asignatura.id_a
            }
        });
    });
};
exports.create = create;
const getAll = (callback) => {
    const queryString = 'SELECT * FROM asignaturas';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const asignaturas = result;
        return callback(null, {
            statusCode: 200,
            message: 'Asignaturas obtenidas exitosamente',
            data: asignaturas
        });
    });
};
exports.getAll = getAll;
const getOne = (id_a, callback) => {
    const queryString = 'SELECT * FROM asignaturas WHERE id_a = ?';
    db_1.db.query(queryString, [id_a], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const asignaturas = result;
        if (asignaturas.length === 0) {
            callback(null, {
                statusCode: 404,
                message: 'Asignatura no encontrada',
                data: null
            });
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura obtenida exitosamente',
            data: asignaturas
        });
    });
};
exports.getOne = getOne;
const update = (asignatura, callback) => {
    const queryString = 'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE id_a = ?';
    db_1.db.query(queryString, [asignatura.nom_a, asignatura.int_h, asignatura.creditos, asignatura.id_a], (err) => {
        if (err)
            return callback(err);
        return callback(null, {
            statusCode: 200,
            message: 'Profesor actualizado exitosamente',
            data: {
                id_a: asignatura.id_a
            }
        });
    });
};
exports.update = update;
const delite = (id_a, callback) => {
    const queryString = 'DELETE FROM asignaturas WHERE id_a = ?';
    db_1.db.query(queryString, [id_a], (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura eliminada exitosamente',
            data: {
                id_a: id_a
            }
        });
        return;
    });
};
exports.delite = delite;
