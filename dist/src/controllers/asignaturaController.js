"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delite = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (asignatura, callback) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos], (err) => {
        if (err)
            return callback(err);
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        return callback(null, {
            statusCode: 201,
            message: 'Asignatura creada exitosamente',
            data: {
                cod_a: asignatura.cod_a
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
const getOne = (cod_a, callback) => {
    const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, [cod_a], (err, result) => {
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
    const queryString = 'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?';
    db_1.db.query(queryString, [asignatura.nom_a, asignatura.int_h, asignatura.creditos, asignatura.cod_a], (err) => {
        if (err)
            return callback(err);
        return callback(null, {
            statusCode: 200,
            message: 'Profesor actualizado exitosamente',
            data: {
                cod_a: asignatura.cod_a
            }
        });
    });
};
exports.update = update;
const delite = (cod_a, callback) => {
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, [cod_a], (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura eliminada exitosamente',
            data: {
                cod_a: cod_a
            }
        });
        return;
    });
};
exports.delite = delite;
