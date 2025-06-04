import { Asignatura } from '../models/asignaturaModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
import e from 'express';

export const create = (asignatura: Asignatura, callback: Function) => {
    const queryString = 'INSERT INTO asignaturas (id_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';

    db.query(
        queryString,
        [asignatura.id_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos],
        (err) => {
            if (err)return  callback(err);

            //const insertId = (<OkPacket>result).insertId;
            //callback(null, insertId);

            return callback(null, {
                statusCode: 201,
                message: 'Asignatura creada exitosamente',
                data: {
                    id_a: asignatura.id_a
                }
            });
        }
    );
}

export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas';    

    db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }

        const asignaturas = result as Asignatura[];

        return callback(null, {
            statusCode: 200,
            message: 'Asignaturas obtenidas exitosamente',
            data: asignaturas
        });
    });
}

export const getOne = (id_a: number, callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas WHERE id_a = ?';    

    db.query(
        queryString,
        [id_a],
        (err, result) => {
            if (err) {
                callback(err);
                return;
            }

            const asignaturas = result as Asignatura[];
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
        }        
    );
}

export const update = (asignatura: Asignatura, callback: Function) => {
    const queryString = 'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE id_a = ?';
 
    db.query(
        queryString,
        [asignatura.nom_a, asignatura.int_h, asignatura.creditos, asignatura.id_a],
        (err) => {
            if (err) return callback(err); 
 
            return callback(null, {
                statusCode: 200,
                message: 'Profesor actualizado exitosamente',
                data: {
                    id_a: asignatura.id_a
                }
            });
            
        }
    );
}


export const delite = (id_a: number, callback: Function) => {
    const queryString = 'DELETE FROM asignaturas WHERE id_a = ?';

    db.query(
        queryString,
        [id_a],
        (err) => {
            if (err) { callback(err); return; }

            callback(null, {
                statusCode: 200,
                message: 'Asignatura eliminada exitosamente',
                data: {
                    id_a: id_a
                }
                
            });
            return;
        }
    );
}