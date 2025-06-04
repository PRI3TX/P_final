import { Profesor } from '../models/profesorModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (profesor: Profesor, callback: Function) => {
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';
 
    db.query(
        queryString,
        [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion],
        (err) => {
            if (err) { callback(err); }
 
            //const insertId = (<OkPacket>result).insertId;
            //callback(null, insertId);

            callback(null, {
                statusCode: 201,
                message: 'Estudiante creado exitosamente',
                data: {
                    id_p: profesor.id_p
                }
            });
        }
    );
}
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM profesores';
 
    db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
 
        const profesores = result as Profesor[];
 
        callback(null, {
            statusCode: 200,
            message: 'Profesores obtenidos exitosamente',
            data: profesores
        });
    });
}
export const getOne = (id_p: number, callback: Function) => {
    const queryString = 'SELECT * FROM profesores WHERE id_p = ?';
 
    db.query(
        queryString,
        [id_p],
        (err, result) => {
            if (err) {
                callback(err);
                return;
            }
 
            const profesores = result as Profesor[];
            if (profesores.length === 0) {
                callback(null, {
                    statusCode: 404,
                    message: 'Profesor no encontrado',
                    data: null
                });
                return;
            }
            callback(null, {
                statusCode: 200,
                message: 'Profesor obtenido exitosamente',
                data: profesores
            });
        }
    );
}
export const update = (profesor: Profesor, callback: Function) => {
    const queryString = 'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';
 
    db.query(
        queryString,
        [profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion, profesor.id_p],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Profesor actualizado exitosamente',
                data: {
                    id_p: profesor.id_p
                }
            });
        }
    );
}
export const delite = (id_p: number, callback: Function) => {
    const queryString = 'DELETE FROM profesores WHERE id_p = ?';
 
    db.query(
        queryString,
        [id_p],
        (err) => {
            if (err) { callback(err); }
 
            callback(null, {
                statusCode: 200,
                message: 'Profesor eliminado exitosamente',
                data: {
                    id_p: id_p
                }
            });
        }
    );
}